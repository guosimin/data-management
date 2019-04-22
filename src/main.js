import Vue from 'vue'

//引入ElementUI框架
import ElementUI from 'element-ui'
import {Message} from 'element-ui'
import App from './App'
import store from './store'

//引入路由
import router from './router'

//引入样式（index为ElementUI的样式，main为公共样式）
import '@/assets/css/index.css'
import '@/assets/css/main.css'
import '@/assets/css/csdn.css'


//引入chart图标
import Chart from 'chart.js';

import $ from "jquery";

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	Chart,
	$,
	store,
	render: h => h(App)
})
