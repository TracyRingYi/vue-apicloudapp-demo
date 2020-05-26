const APIs = require('../../src/survice/API')
const { LoginAPI } = APIs
const loginData = require('../data/login')
const Mock = require('mockjs')
module.exports = (app, mock = true) => {
	if (mock) {
		app.post(LoginAPI.login, (req, res) => {
			res.json(Mock.mock(loginData.login))
		})
	}
}
