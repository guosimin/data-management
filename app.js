/**
 * 入口文件
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/3/27      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa'),
	  routing = require('./server/router/index.js'),
	  cors = require('koa-cors'),
	  bodyParser = require('koa-bodyparser');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

/**
 * bodyparser
 */
app.use(bodyParser());


app.use(cors({
	origin: function (ctx) {
		if (ctx.url === '/test') {
			return "*"; // 允许来自所有域名请求
		}
		return 'http://localhost:8081';
	},
	methods:['GET','POST'],
	allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 对于任何请求，app将调用该异步函数处理请求：
/*app.use(async (ctx, next) => {
	await next();
	ctx.response.type = 'text/html';
	ctx.response.body = '<h1>Hello, koa2!</h1>';
});*/

routing.init(app);

// 在端口3000监听:
app.listen(7777);
console.log('app started at port 7777...');
