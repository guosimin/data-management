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
	page:async function (ctx){
		let pagingQuery = ctx.request.body.pagingQuery;
		let models = [];
		let count = null;
		function loadData(){
			return new Promise(  (resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, async function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					var cursor = dbo.collection("page").find({'user_name':ctx.request.body.userName},{projection:{title:1,link:1,create_time:1}});
					await new Promise((resolve, reject) => {
						cursor.count(true,{},function (error,result) {
							// 返回总条数
							count = result;
							resolve();
						});
					});
					await new Promise((resolve, reject) => {
						dbo.collection("page").aggregate([
							{
								$match: {
									'user_name':ctx.request.body.userName
								}
							},
							{
								$sort: {
									'create_time': - 1,
								}
							},
							{$skip:(pagingQuery.pageIndex*pagingQuery.pageSize)},
							{$limit:(pagingQuery.pageSize)},
							{
								$project: {
									title: 1,
									link: 1,
									create_time: 1,
									page_id: 1
								}
							},
							{
								$lookup: {
									from: 'page_spider_data',
									localField: 'page_id',
									foreignField: 'page_id',
									as: 'spider'
								}
							},
							{
								$project: {
									title: 1,
									link: 1,
									create_time: 1,
									page_id: 1,
									read_num: {
										$max: "$spider.read_num"
									},
									comment_num: {
										$max: "$spider.comment_num"
									}
								}
							},

						]).toArray(function(err, result) { // 返回集合中所有数据
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
	detail:async function (ctx){
		let content = '';
		let model = [];
		function HTMLDecode(a) {
			a = "" + a;
			return a.replace(/&lt;/g, "<")
					.replace(/&gt;/g, ">")
					.replace(/&amp;/g, "&")
					.replace(/&quot;/g, '"')
					.replace(/&apos;/g, "'");
		}
		function loadData(){
			return new Promise((resolve,reject)=>{
				MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
					if (err) throw err;
					var dbo = db.db("demo");
					dbo.collection("page").findOne({'_id':ObjectID(ctx.query.id)},{},function (error,result) {
						content = HTMLDecode(result.content);
						resolve();
					})
				});
			})
		}

		await loadData()

		ctx.response.body  = Object.assign(ctx.response.body||{},{
			model:{
				content:content
			},
		});
	}
}
