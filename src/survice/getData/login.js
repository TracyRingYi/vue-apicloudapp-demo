import { LoginAPI } from '../API'
import BaseFetch from '../fetch'

class LoginFetch extends BaseFetch {
	constructor() {
		super()
	}
	userLogin({ username, password }) {
		return this.post(LoginAPI.login, {
			username,
			password
		})
	}
	autoLogin({ userId }) {
		return this.post(LoginAPI.login, { userId })
	}
	getSms({ phone, type }) {
		return this.get(LoginAPI.getSms, {
			phone,
			type
		})
	}
	findPwd({ phone, sms, password }) {
		return this.post(LoginAPI.findPwd, {
			phone,
			sms,
			password
		})
	}
	signUp({ phone, sms, password, invitphone }) {
		return this.put(LoginAPI.signUp, {
			phone,
			sms,
			password,
			invitphone
		})
	}
}
export default new LoginFetch()
