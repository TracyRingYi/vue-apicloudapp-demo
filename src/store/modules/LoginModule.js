import LoginFetch from '@/survice/getData/login'
/*constants*/
const LOGIN = 'LOGIN'
const LOGIN_AUTO = 'LOGIN_AUTO'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

const initialState = {
	isLogin: false,
	userId: '',
	username: '',
	token: '',
	phone: '',
	validity: null,
	message: null
}

/*action*/
const LoginModule = {
	state: initialState,
	mutations: {
		[LOGIN_SUCCESS](state, payload = {}) {
			state.isLogin = true
			for (let i in payload) {
				state[i] = payload[i]
			}
			state.message = 0
		},
		[LOGIN_FAIL](state, payload = {}) {
			state.isLogin = false
			state.validity = null
			state.message = payload.msg
		},
		[LOGOUT_SUCCESS](state) {
			for (let i in initialState) {
				state[i] = initialState[i]
			}
		}
	},
	actions: {
		async [LOGIN]({ state, commit }, payload) {
			let { username } = state
			let password = payload.password
			let resp = await LoginFetch.userLogin({ username, password })
			if (resp.code == 0) {
				commit(LOGIN_SUCCESS, resp.data)
			} else {
				commit(LOGIN_FAIL, { msg: resp.msg })
			}
		},
		async [LOGIN_AUTO]({ state, commit }) {
			let { userId } = state
			let resp = await LoginFetch.autoLogin({ userId })
			if (resp.code == 0) {
				commit(LOGIN_SUCCESS, resp.data)
			} else {
				commit(LOGIN_FAIL, { msg: resp.msg })
			}
		},
		[LOGOUT]({ commit }) {
			commit(LOGOUT_SUCCESS)
			//commit('CLEAR');
			//commit('UPDATE_INCLUDE_PAGE',{flag:false,page:'main'});
		}
	}
}

export default LoginModule
