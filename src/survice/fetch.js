import axios from 'axios'
import Qs from 'qs'
import ApiConfig from './config'

/**
 * 检查接口响应状态
 * @param {Object} response axios返回的响应对象
 * @return {Object} 正常返回response，否则返回reject
 */
const checkStatus=response=>{
    console.log(response.data);
    if(response.status>=200&&response.status<300){
        return response.data;
    }else{
        const message=getErrorMsgByStatusCode(response.status);
        return Promise.reject({message,response})
    }
}

/**
 * 返回状态码对应的提示信息
 * @param {number} code 
 */
const getErrorMsgByStatusCode=code=>{
    let result='未知错误';
    if(code>=400&&code<500){
        switch(code){
            case 401:
            result='您尚未登录,请登录后访问';
            break;
            case 403:
            result='您所请求的资源被禁止访问';
            break;
            case 404:
            result='您所请求的资源不存在';
            break;
            case 405:
            result='';
            break;
            default:
            result='抱歉，程序出了问题(${code})'
        }
    }else if(code>=500&&code<600){
        result='服务器出错啦'
    }
    return result;
}

/**
 * 异常处理
 * @param {Object} err 错误信息
 */
const handleError=err=>{
    console.log(err.message);
    if(!err.response){
        err.message='网络连接不可用';
    }else{
        console.warn(err);
    }
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(err);     
        },2000)
    })
}


axios.defaults.withCredentials=true;
const fetch=(params={})=>{
    let paramsKey=params.method=='GET'?'params':'data';
    return axios({
        url:ApiConfig.host+ApiConfig.apiPrefix+params.url,
        method:params.method||ApiConfig.method,
        headers: params.headers||{'Content-Type':'application/x-www-form-urlencoded'},
        transformRequest: [function (data) {
            if(params.headers&&params.headers['Content-Type']==='multipart/form-data')return data;
            return Qs.stringify(data)
        }],
        [paramsKey]:params.data||{},
        timeout:params.timeout||ApiConfig.timeout
    }).then(checkStatus)
    .catch(handleError)
}

export default fetch