const login = {
	code: 0,
	data: {
		userId: '@id()',
		username: '@name()',
		token: '@string(16)',
		phone: '@string(number,11)',
		validity: '@now()',
		message: 'success'
	},
	msg: 'success'
}

module.exports = {
	login
}
