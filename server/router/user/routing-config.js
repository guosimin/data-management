/**
 * charts路由
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/3/27      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

const ctrl = require('./ctrl-config');
/*const poServiceCtrl = require('../../../ctrl/mc/po/po-service');*/

module.exports = [
	// ======= 页面相关路由 =======
	{path: '/user/query', ctrl: ctrl.query,method:'post'},
	{path: '/user/update', ctrl: ctrl.update,method:'post'},
	{path: '/user/add', ctrl: ctrl.add,method:'post'},
]
