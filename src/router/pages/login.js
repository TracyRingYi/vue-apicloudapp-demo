import Login from '@/views/pages/login/login'

const login = [
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/forgetpwd',
		name: 'forgetpwd',
		component: () =>
			import(/* webpackChunkName: "user" */ './views/pages/login/forgetPwd')
	},
	{
		path: '/signup',
		name: 'signup',
		component: () =>
			import(/* webpackChunkName: "user" */ './views/pages/login/signUp')
	}
]

export default login
