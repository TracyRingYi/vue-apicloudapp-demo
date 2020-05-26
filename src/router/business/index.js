export default [
	{
		path: '/main',
		component: () => import('@/views/business/main'),
		children: [
			{
				path: 'home',
				name: 'home',
				component: () => import('@/views/business/home/index')
			},
			{
				path: 'product',
				name: 'product',
				component: () => import('@/views/business/product/index')
			},
			{
				path: 'order',
				name: 'order',
				component: () => import('@/views/business/order/index')
			},
			{
				path: 'user',
				name: 'user',
				component: () => import('@/views/business/user/index')
			},
			{ path: '', redirect: 'home' }
		]
	}
]
