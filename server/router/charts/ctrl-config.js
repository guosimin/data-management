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
var ObjectID = require('mongodb').ObjectID;



module.exports = {
	query:async function (ctx) {
		if(!ctx.request.body&&ctx.request.body.userName){
			ctx.response.body  = Object.assign(ctx.response.body||{},{
				vaiid:false,
				message:'请传入用户userName'
			});
			return false;
		}

		let models = [];
		function loadData(){
			return new Promise((resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					var spider_data = function(){
						if(ctx.request.body&&ctx.request.body.start&&ctx.request.body.end){
							return {'spider_date':{'$lte':ctx.request.body.end,'$gte':ctx.request.body.start}}
						}
						return {}
					}
					var findObj = Object.assign({'user_name':ctx.request.body.userName},spider_data());
					console.log(findObj,"findObj");
					dbo.collection("page_spider_data").aggregate([
						{$match:findObj},
						{$project:{'spider_date':1,'read_num':1,"comment_num":1,"page_id":1}},
						{$sort:{'spider_date':-1}},
					]).toArray(function(err, result) { // 返回集合中所有数据
						models = result;
						resolve();
					})
				});
			})
		}

		await loadData()
		
		//-- =======================================数据处理===========================================
		var dateKey = [];

		//获取日期key
		for(var i = 0;i<models.length;i++){
			var item = models[i]['spider_date'];
			if(dateKey.indexOf(item)==-1){
				dateKey.push(item);
			}
		}

		// 日期key排序
		dateKey.sort();

		//获取统计数据， 获取增长数据
		var countData = {},growData={};
		for(var j = 0;j<dateKey.length;j++){
			var key = dateKey[j];
			for(var i=0;i<models.length;i++){
				if(models[i].spider_date == key){
					if(!countData[key]){
						countData[key] = {
							readNum:0,
							commentNum:0
						};
					}

					countData[key].readNum += Number(models[i].read_num);
					countData[key].commentNum += Number(models[i].comment_num);

					if(!growData[key]){
						growData[key] = {
							readNum:0,
							commentNum:0
						};
					}

					if(countData[dateKey[j-1]]){
						growData[key].readNum = countData[key].readNum - Number(countData[dateKey[j-1]].readNum);
						growData[key].commentNum = countData[key].commentNum - Number(countData[dateKey[j-1]].commentNum);
					}
				}
			}
		}






		//获取统计数据， 获取增长数据

		ctx.response.body  = Object.assign(ctx.response.body||{},{
			model:{
				// dateKey:dateKey,
				countData:countData,
				growData:growData
			},
			// models:newModels,
		});
	},
}
