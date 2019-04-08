/**
 * charts控制器
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/3/27      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";


module.exports = {
	query:async function (ctx) {
		let models = [];
		 function loadData(){
			return new Promise((resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					dbo.collection("page"). find({}).sort({"create_time":-1,'spider_data.last_update_time':1}).toArray(function(err, result) { // 返回集合中所有数据
						models = result;
						resolve();
					});
				});
			})
		}
		ctx.response.type = 'application/json';
		await loadData()
		
		//-- =======================================数据处理===========================================
		var newModels = [],dateKey = [];
		var count = {
			readNum:0,
			commentNum:0
		}

		//获取输出的models数据
		for(var i = 0;i<models.length;i++){
			for(key in models[i]['spider_data']){
				var item = models[i]['spider_data'];
				if(dateKey.indexOf(key)==-1){
					dateKey.push(key);
				}
			}
			newModels.push({
				title:models[i].title,
				spiderData:models[i]['spider_data'],
				pageNum:models[i].pagenum
			})
		}

		// 日期排序
		dateKey.sort();

		//获取统计数据， 获取增长数据
		var countData = {},growData={};
		for(var i = 0;i<models.length;i++){
			var item = models[i]['spider_data'];
			for(var j = 0;j<dateKey.length;j++){
				var key = dateKey[j]
				if(!countData[key]){
					countData[key] = {
						readNum:0,
						commentNum:0
					};
				}
				if(!growData[key]){
					growData[key] = {
						readNum:0,
						commentNum:0
					};
				}
				if(item[key]){
					countData[key].readNum += Number(item[key].read_num);
					countData[key].commentNum += Number(item[key].comment_num);
					if(countData[dateKey[j-1]]){
						growData[key].readNum = countData[key].readNum - Number(countData[dateKey[j-1]].readNum);
						growData[key].commentNum = countData[key].commentNum - Number(countData[dateKey[j-1]].commentNum);
					}else{
						growData[key].readNum = 0;
						growData[key].commentNum = 0;
					}

				}else{
					key =  dateKey[j-1]
					if(item[key]){
						countData[key].readNum += Number(item[key].read_num||0);
						countData[key].commentNum += Number(item[key].comment_num||0);
					}
					growData[dateKey[j]].readNum = 0;
					growData[dateKey[j]].commentNum = 0;
				}
			}
		}

		ctx.response.body = {
			model:{
				count:count,
				// dateKey:dateKey,
				countData:countData,
				growData:growData
			},
			models:newModels,
			success:true,
			valid:true
		};
	}
}
