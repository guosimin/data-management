import Vue from 'vue'
import Router from 'vue-router'
// 模块
import charts from '@/components/charts/index'
import pageList from '@/components/pageList/index'
import pageDetail from '@/components/pageDetail/index'
import user from '@/components/user/index'
import userSet from '@/components/user/set'

// 调用
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'charts',
			component: charts
		},
		//保留charts路由
		{
			path: '/charts',
			name: 'charts',
			component: charts
		},
		{
			path: '/page-list',
			name: 'pageList',
			component: pageList
		},
		{
			path: '/page-detail',
			name: 'pageDetail',
			component: pageDetail
		},
		{
			path: '/user',
			name: 'user',
			component: user
		},
		{
			path: '/user-set',
			name: 'userSet',
			component: userSet
		}
	]
})
