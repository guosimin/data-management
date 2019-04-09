/**
 * 处理请求数据
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/4/8      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

/**
 * 处理分页
 * @param pagingQuery
 */
function handlePage(pagingQuery){
	let query;
	if(pagingQuery){
		let pageIndex = Number(pagingQuery.pageIndex)>1?Number(pagingQuery.pageIndex):1;
		let pageSize = Number(pagingQuery.pageSize)>0?Number(pagingQuery.pageSize):10;
		query = {
			pageIndex:pageIndex-1||0,
			pageSize:pagingQuery.pageSize||10
		}

	}else{
		query = {
			pageIndex:0,
			pageSize:10
		}
	}
	return query;
}

module.exports = async function(app) {
	app.use(async (ctx, next) => {
		ctx.response.type = 'application/json';
		ctx.response.body = {
			success:true,
			valid:true
		}
		try {
			// 处理分页
			if(ctx.request.body&&ctx.request.body.pagingQuery){
				ctx.request.body.pagingQuery = handlePage(ctx.request.body.pagingQuery)
			}
		} catch (err) {
		}
		await next()
	});
}
