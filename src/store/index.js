/**
 * vuex store
 *
 * Author:   gsm(qq:2479186745)
 * History:
 * Date         Version Remarks
 * ============ ======= ======================================================
 * 2019/4/16      1.0     First version
 *
 * Copyright 2016, all rights reserved. Essa.cn
 * */

import Vue from 'vue'
import Vuex from 'vuex'
import { Message  } from 'element-ui';
import common from '@/assets/js/common';

Vue.use(Vuex)
let userName = common.getCookie('userName');
export default new Vuex.Store({
	state:{
		isLogin:userName?true:false,
		userName:userName?userName:'',
	},
	mutations: {
		exit(state){
			state.isLogin = false;
			state.userName = '';
			common.delCookie('userName')
		},
		goLogin(state, userName) {
			state.isLogin = true;
			state.userName = userName;
			common.setCookie('userName',userName);
		}
	},
	actions:{
		goLogin(context,params){
			if(!params.userName){
				Message ({
					type: 'error',
					message:"请输入用户名"
				})
				return false
			}

			if(!params.password){
				Message ({
					type: 'error',
					message:"请输入密码"
				})
				return false
			}
			let postData = {
				userName:params.userName,
				password:params.password
			}
			$.ajax({
				url:'http://localhost:7777/common/login',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(postData),
				dataType: 'json',
				success(resp) {
					if(resp.valid){
						common.setCookie('userName',params.userName);
						context.commit( 'goLogin', params.userName );
					}
					Message ({
						type: resp.valid?'success':'warning',
						message:resp.valid?"登录成功":resp.message||''
					})
				},
				error() {
					Message ({
						type: 'error',
						message:"网络错误，请稍后重试"
					})
				}
			})
		}
	}
})
