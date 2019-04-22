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
	query:async function (ctx){
		let pagingQuery = ctx.request.body.pagingQuery;
		let models = [];
		let count = null;
		function loadData(){
			return new Promise(  (resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, async function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					var findObj = {};
					if(ctx.request.body.userName){
						findObj.user_name = ctx.request.body.userName;
					}
					if(ctx.request.body.status==='1'||ctx.request.body.status==='0'){
						findObj.status = Number(ctx.request.body.status);
					}
					if(ctx.request.body.type==='1'||ctx.request.body.type==='2'){
						findObj.type = Number(ctx.request.body.type);
					}

					var cursor = dbo.collection("csdn_users").find(findObj);
					await new Promise((resolve, reject) => {
						cursor.count(true,findObj,function (error,result) {
							// 返回总条数
							count = result;
							resolve();
						});
					});
					await new Promise((resolve, reject) => {
						cursor.skip(pagingQuery.pageIndex*pagingQuery.pageSize)
							.limit(pagingQuery.pageSize)
							.toArray(function(err, result) { // 返回集合中所有数据
								models = result;
								resolve();
						})
					});
					resolve();
				});
			})
		}

		await loadData();
		ctx.response.body  = Object.assign(ctx.response.body||{},{
			paging:{
				pageIndex:pagingQuery.pageIndex+1,
				pageSize:pagingQuery.pageSize,
				count:count
			},
			models:models,
		});
	},
	update:async function (ctx){
		let models;
		function loadData(){
			return new Promise(  (resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, async function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					dbo.collection("csdn_users")
						.updateOne({
							'user_name':ctx.request.body.userName
						},{
							'$set':{'status':ctx.request.body.status==1?1:0}
						},function (err,results) {
							models = results.result;
							resolve();

						})
				});
			})
		}

		await loadData();
		console.log(models,"models");
		let res = {
			message:'修改成功'
		}
		if(models&&models.nModified!=1){
			res = {
				message:'修改失败',
				valid:false
			}
		}
		ctx.response.body  = Object.assign(ctx.response.body||{},res);
	},
	add:async function (ctx){
		let models;
		function loadData(){
			return new Promise(  (resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, async function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					dbo.collection("csdn_users")
						.updateOne({
							'user_name':ctx.request.body.userName
						},{
							'$set':{
								'user_url':'https://blog.csdn.net/'+ctx.request.body.userName,
								'type':2,
								'status':1
							}
						},{upsert:true},function (err,results) {
							models = results.result;
							resolve();

						})
				});
			})
		}

		await loadData();
		console.log(models,"models");
		console.log(!!models&&models.upserted,"models");
		let res = {
			message:'新增失败',
			valid:false
		}
		if(models&&models.upserted&&models.upserted.length>0){
			res = {
				message:'新增成功'
			}
		}
		ctx.response.body  = Object.assign(ctx.response.body||{},res);
	},
}
