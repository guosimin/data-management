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
	{path: '/charts/query', ctrl: ctrl.query,method:'post'},
	{path: '/page/query', ctrl: ctrl.page,method:'post'},
	{path: '/page/detail', ctrl: ctrl.detail,method:'get'}
]
