import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/components/common/menu'

// 模块
import HelloWorld from '@/components/HelloWorld'
import charts from '@/components/charts'
import PageList from '@/components/PageList'

// 调用
Vue.use(Router)
Vue.component('common-menu',menu)

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
		}
	]
})
