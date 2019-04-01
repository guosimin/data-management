import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import charts from '@/components/charts'
import menu from '@/components/common/menu'

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
		}
	]
})
