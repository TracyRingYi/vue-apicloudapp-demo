import store from '@/store/index.js'
export default (router) => {
	router.beforeEach((to, from, next) => {
		const token = store.state.login.token
		if (token) {
			next()
		} else {
			if (
				to.path == '/login' ||
				to.path == '/forgetpwd' ||
				to.path == '/signup'
			) {
				next()
			} else {
				next('/login')
			}
		}
	})
}
