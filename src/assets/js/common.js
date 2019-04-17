/**
 * 公共js库
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/4/17      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

let self = {
	setCookie(name,value,expiredays){
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=name+ "=" +encodeURIComponent(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	},
	getCookie(name){
		if (document.cookie.length>0){
			start=document.cookie.indexOf(name + "=")
			if (start!=-1){
				start=start + name.length+1
				end=document.cookie.indexOf(";",start)
				if (end==-1) end=document.cookie.length
				return encodeURIComponent(document.cookie.substring(start,end))
			}
		}
		return ""
	},
	delCookie(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=self.getCookie(name);
		if(cval!=null)
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
}

module.exports = self;
