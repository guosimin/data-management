import Vue from 'vue'
import Router from 'vue-router'
// 公共模块
import menu from '@/components/common/component/menu'


//指令

import highlight from '@/components/common/directive/highlight'
// 模块
import HelloWorld from '@/components/HelloWorld'
import charts from '@/components/charts'
import PageList from '@/components/PageList'
import PageDetail from '@/components/PageDetail'

// 调用
Vue.use(Router)
Vue.component('common-menu',menu)
Vue.directive('highlight',highlight)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/charts',
			name: 'charts',
			component: charts
		},
		{
			path: '/page-list',
			name: 'PageList',
			component: PageList
		},
		{
			path: '/page-detail',
			name: 'PageDetail',
			component: PageDetail
		}
	]
})
