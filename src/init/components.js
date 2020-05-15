//自动注册全局组件
import Vue from 'vue'
import { upperFirst, camelCase } from 'lodash'
const requireComponent = require.context(
	//组件目录
	'../components',
	//查询子目录
	true,
	//匹配basic-开头的vue文件
	/basic(-\w+)+\.vue$/
)

requireComponent.keys().forEach((fileName) => {
	//获取组件实例配置
	const componentConfig = requireComponent(fileName)
	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		//获取驼峰式命名
		camelCase(
			//剥去文件名开头的 `./` 和结尾的扩展名 eg: ./base/basic-header.vue -> basicHeader
			fileName.replace(/^\.\/(.*\/)?(.*)\.\w+$/, '$2')
		)
	)
	//全局注册组件
	Vue.component(componentName, componentConfig.default || componentConfig)
})
