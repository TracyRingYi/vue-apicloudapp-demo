const loginAction = require('./action/login')
module.exports = function (app) {
	loginAction(app)
}
