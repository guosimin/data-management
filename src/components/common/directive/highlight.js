/**
 * 高亮指令
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/4/10      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

export default function (el) {
	let blocks = el.querySelectorAll('pre code');
	blocks.forEach((block)=>{
		hljs.highlightBlock(block)
	})
}
