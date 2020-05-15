import store from '@/store/index.js'
export default (router) => {
	router.beforeEach((to, from, next) => {
		const token = store.state.user.token
		if (token) {
			next()
		} else {
			if (to.path == '/login') {
				next()
			} else {
				next('/login')
			}
		}
	})
}
