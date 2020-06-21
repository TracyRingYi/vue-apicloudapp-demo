import Main from '@/views/business/main'
import Map from '@/views/business/map'
export default [
	{
		path: '/main',
		name: 'main',
		component: Main,
		children: [
			{
				path: 'home',
				name: 'home',
				component: Map
			}
		]
	}
]
