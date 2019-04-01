import Vue from 'vue'

//引入ElementUI框架
import ElementUI from 'element-ui'

import App from './App'

//引入路由
import router from './router'

//引入样式（index为ElementUI的样式，main为公共样式）
import '@/assets/css/index.css'
import '@/assets/css/main.css'

//引入chart图标
import Chart from 'chart.js';

import $ from "jquery";

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	Chart,
	$,
	render: h => h(App)
})
