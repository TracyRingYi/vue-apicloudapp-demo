import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { SYSTEMTYPE } from './store/mutations.type'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {},
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
	actions: {},
	plugins: [
		createPersistedState({
			storage: window.localStorage,
			reducer(val) {
				return {
					isIOS: val.isIOS
				}
			}
		})
	]
})
