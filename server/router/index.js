/**
 * 服务端路由配置文件
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/3/27      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */
const router = require('koa-router')();
var nodePath = require('path');
var fs = require('fs');

function readDirSync(path, callback) {
	var pa = fs.readdirSync(path);
	pa.forEach(function (ele, index) {
		var info = fs.statSync(path + "/" + ele);
		var isDirectory = info.isDirectory();
		if (isDirectory) {
			callback(ele, isDirectory, nodePath.join(path, ele));
			readDirSync(nodePath.join(path, ele), callback);
		} else {
			callback(ele, isDirectory, nodePath.join(path, ele));
		}
	})
}

//记录所有页面路由请求
var __ctrlRoutesList = [];
function addCtrlRoutes(routesList) {
	__ctrlRoutesList = __ctrlRoutesList.concat(routesList);
}

let index = {
	init(app){
		app.use(router.routes())
			.use(router.allowedMethods());

		//加载所有路由
		readDirSync(__dirname,function(fileName, isDirectory, dirPath){
			var isJsFile = (dirPath.indexOf('.') !== 0) && (dirPath.slice(-3) === '.js');
			var isRouting =  dirPath.slice(-17) === 'routing-config.js';
			if (!isDirectory && isJsFile &&isRouting) {
				var route = require(dirPath);

				if(typeof route[0]!== 'undefined'){
					addCtrlRoutes(route);
				}
			}
		});

		__ctrlRoutesList.forEach(function (item) {
			// 默认 method 为 get
			var method = item.method || 'get';
			if (typeof router[method] === 'function')
				router[method](item.path, item.ctrl);
		});
	}
}

module.exports = index;
