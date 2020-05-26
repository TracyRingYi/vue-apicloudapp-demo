import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { STARTAPP } from './actions.type'
import { SYSTEMTYPE } from './mutations.type'
import Login from './modules/LoginModule'
Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		login: Login
	},
	state: {
		isIOS: null
	},
	getters: {
		screenTop: (state) => {
			return state.isIOS ? 'screentop-ios' : 'screentop-and'
		},
		naviTop: (state) => {
			return state.isIOS ? 'navi-ios' : 'navi-and'
		}
	},
	mutations: {
		[SYSTEMTYPE](state, payload) {
			state.isIOS = payload
		}
	},
	actions: {
		[STARTAPP]({ state, commit, dispatch }) {
			let user = state.login
			//commit('LOGIN_FAIL');
			if (user) {
				let now = new Date().getTime()
				//三天內自動登錄
				let days = 60 * 60 * 24 * 1000 * 3
				let validityTruly = false
				if (user.validity) {
					let validityDate = new Date(user.validity).getTime()
					validityTruly = validityDate + days > now ? true : false
				}
				setTimeout(() => {
					if (user.isLogin && validityTruly) {
						//auto login
						dispatch('LOGIN_AUTO')
					} else {
						commit('LOGIN_FAIL')
					}
				}, 1000)
			}
		}
	},
	plugins: [
		createPersistedState({
			storage: window.localStorage,
			reducer(val) {
				return {
					isIOS: val.isIOS,
					login: val.login
				}
			}
		})
	]
})
