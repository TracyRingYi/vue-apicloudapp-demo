import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './constant/global'
import '@/utils/rem'
import '@assets/style/index'
import '@/init/index.js'

Vue.config.productionTip = false
Vue.prototype.global = global

const setStatusBarType = () => {
	let systemType = api.systemType
	let systemVersion = api.systemVersion
	let fullScreen = api.fullScreen
	let iOS7StatusBarAppearance = api.iOS7StatusBarAppearance
	if (systemType == 'ios') {
		//fixIos7Bar_API();
		if (
			parseFloat(systemVersion) >= 7 &&
			fullScreen == 'false' &&
			iOS7StatusBarAppearance
		) {
			store.commit('SYSTEMTYPE', true)
		}
	} else if (systemType == 'android') {
		if (parseFloat(systemVersion) >= 4.4) {
			store.commit('SYSTEMTYPE', false)
		}
	}
}

if (global.isApp) {
	window.apiready = function () {
		new Vue({
			router,
			store,
			render: (h) => h(App)
		}).$mount('#app')
		if (store.state.isIOS == null) {
			setStatusBarType()
		}
	}
} else {
	new Vue({
		router,
		store,
		render: (h) => h(App)
	}).$mount('#app')
}
