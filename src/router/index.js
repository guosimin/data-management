import Vue from 'vue'
import Router from 'vue-router'


// 模块
import HelloWorld from '@/components/HelloWorld'
import charts from '@/components/charts'
import PageList from '@/components/PageList'
import PageDetail from '@/components/PageDetail'

// 调用
Vue.use(Router)

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
