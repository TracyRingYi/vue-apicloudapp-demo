import LoginModule from '@/store/modules/LoginModule'
const mutations = LoginModule.mutations

describe('test login vuex', () => {
	it('当登录成功，用戶登錄對象和有效期，message，isLogin合併', () => {
		const state = {
			isLogin: false,
			userId: '',
			username: '',
			token: '',
			phone: '',
			validity: null,
			message: null
		}
		const payload = {
			username: 'admin',
			userId: '123456',
			token: 'asdffgjfg',
			phone: '1315424',
			validity: 1576488752442
		}
		const expected = {
			isLogin: true,
			username: 'admin',
			userId: '123456',
			token: 'asdffgjfg',
			phone: '1315424',
			validity: 1576488752442,
			message: 0
		}
		mutations.LOGIN_SUCCESS(state, payload)
		expect(state).toEqual(expected)
	})
})
