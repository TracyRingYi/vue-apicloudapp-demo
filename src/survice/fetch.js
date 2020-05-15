import axios from 'axios'
import Qs from 'qs'
import ApiConfig from './config'

/**
 * @desc 公共请求
 * @url {string}
 * @headers {object}
 * @data {object/formdata}
 */
class BaseFetch {
	constructor() {
		this.instance = axios.create({
			baseURL: process.env.VUE_APP_HOST,
			withCredentials: process.env.NODE_ENV === 'production' ? false : true,
			timeout: ApiConfig.timeout
		})
		this.instance.interceptors.response.use(checkStatus, handleError)
		this.dataMethodDefaults = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			transformRequest: [
				function (data) {
					return Qs.stringify(data)
				}
			]
		}
	}
	get(url, params = {}) {
		return this.instance.get(url, params)
	}
	post(url, params = {}) {
		return this.instance.post(url, {
			...this.dataMethodDefaults,
			...params
		})
	}
	put(url, params = {}) {
		return this.instance.put(url, {
			...this.dataMethodDefaults,
			...params
		})
	}
	delete(url, params = {}) {
		return this.instance.delete(url, params)
	}
}

/**
 * 检查接口响应状态
 * @param {Object} response axios返回的响应对象
 * @return {Object} 正常返回response，否则返回reject
 */
const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response.data
	} else {
		const message = getErrorMsgByStatusCode(response.status)
		return Promise.reject({ message, response })
	}
}

/**
 * 返回状态码对应的提示信息
 * @param {number} code
 */
const getErrorMsgByStatusCode = (code) => {
	let result = '未知错误'
	if (code >= 400 && code < 500) {
		switch (code) {
			case 401:
				result = '您尚未登录,请登录后访问'
				break
			case 403:
				result = '您所请求的资源被禁止访问'
				break
			case 404:
				result = '您所请求的资源不存在'
				break
			case 405:
				result = ''
				break
			default:
				result = '抱歉，程序出了问题(${code})'
		}
	} else if (code >= 500 && code < 600) {
		result = '服务器出错啦'
	}
	return result
}

/**
 * 异常处理
 * @param {Object} err 错误信息
 */
const handleError = (err) => {
	console.log(err.message)
	if (!err.response) {
		err.message = '网络连接不可用'
	} else {
		console.warn(err)
	}
	return Promise.reject(err)
}

export default BaseFetch
