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
	index:async function (ctx) {
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
					var findObj = Object.assign({},{'user_name':ctx.request.body.userName});
					dbo.collection("csdn_users").aggregate([
						{$match:findObj},
						{$project:{'user_name':1,'avatar':1}},
					]).toArray(function(err, result) { // 返回集合中所有数据
						models = result||[];
						resolve();
					})
				});
			})
		}

		await loadData()

		if(models[0]&&models[0].user_name){
			ctx.response.body  = Object.assign(ctx.response.body||{},{
				model:{
					userName:models[0]&&models[0].user_name
				},
			});
		}else{
			ctx.response.body  = Object.assign(ctx.response.body||{},{
				valid:false,
				message:"你输入的userName错误,请重新输入"
			});
		}

	},
}
