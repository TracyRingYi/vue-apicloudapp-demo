import Vue from 'vue'
import Router from 'vue-router'
import business from './business'
import pages from './pages'
import guards from './guard'
import StartApp from './views/pages/startApp'
Vue.use(Router)

const routes = [
	{
		path: '/startapp',
		name: 'startapp',
		component: StartApp
	},
	...business,
	...pages
]

const router = new Router({
	mode: 'hash',
	routes
})
guards(router)
export default router
