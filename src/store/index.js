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
import {setCookie,getCookie,delCookie} from '@/assets/js/common'

Vue.use(Vuex)
let userName = getCookie('userName');
export default new Vuex.Store({
	state:{
		isLogin:userName?true:false,
		userName:userName?userName:'',
	},
	mutations: {
		exit(state){
			state.isLogin = false;
			state.userName = '';
			delCookie('userName')
		},
		goLogin(state, userName) {
			state.isLogin = true;
			state.userName = userName;
			setCookie('userName',userName);
		}
	},
	actions:{
		goLogin(context,userName){
			if(!userName){
				Message ({
					type: 'error',
					message:"请输入用户名"
				})
				return false
			}
			let postData = {
				userName:userName
			}
			$.ajax({
				url:'http://localhost:7777/common/login',
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify(postData),
				dataType: 'json',
				success: function (resp) {
					if(resp.valid){
						setCookie('userName',userName);
						context.commit( 'goLogin', userName );
					}
					Message ({
						type: resp.valid?'success':'warning',
						message:resp.valid?"登录成功":resp.message||''
					})
				},
				error:function () {
					Message ({
						type: 'error',
						message:"网络错误，请稍后重试"
					})
				}
			})
		}
	}
})
