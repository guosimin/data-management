import Vue from 'vue'

//引入ElementUI框架
import ElementUI from 'element-ui'

import App from './App'
import store from './store'

//引入路由
import router from './router'

//引入样式（index为ElementUI的样式，main为公共样式）
import '@/assets/css/index.css'
import '@/assets/css/main.css'
import '@/assets/css/csdn.css'

// 公共模块
import menu from '@/components/common/component/menu'
import login from '@/components/common/component/login'

//指令
import highlight from '@/components/common/directive/highlight'

//引入chart图标
import Chart from 'chart.js';

import $ from "jquery";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('common-menu',menu)
Vue.component('common-login',login)
Vue.directive('highlight',highlight)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	Chart,
	$,
	store,
	render: h => h(App)
})
