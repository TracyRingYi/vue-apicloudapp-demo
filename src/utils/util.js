const formatTime = date => {
  if (date == null) return date;
  if (typeof date == "number") {
    date = new Date(date);
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//格式化日期
const formatDate = (date, joinicon = '-') => {
  if (date == null) return date;
  if (typeof date == "number") {
    date = new Date(date);
  }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join(joinicon);
}

//图片加Host
const imgHandle = imgurl => StaticHost + imgurl;


/**
 * promiseFile 封装
 * @param {string} api
 * @param {object} params 参数data
 * @param {string} file src
 * @param {object} header
 * @param {bool} sendId
 */
/*const PROMISEFILE = (api, params = {}, file, header = {'Content-Type':'multipart/form-data',}, sendId = false) => {
  header=sendId?{...header,"userToken": localStorage.getItem('sessionId')}:header;
  let formData = new FormData();
  formData.append('file', {
    url:file,
    type:'multipart/form-data'
  });
  for(let i in params){
    formData.append(i,params[i]);
  }
  return instance({
    url:api,
    method,
    headers:header,
    data:formData,
  }).then(_checkStatus)
  .then(res=>res.data)
  .catch(res=>{
    failEvent(res);
    return Promise.reject(res + api)
  })
}*/

/**
 * 處理參數
 */
const parseSearch=()=>{
  let querystr=location.search.substr(1);
  let queryArr=querystr.split('&');
  let queryObj={};
  for(let i in queryArr){
    let item=queryArr[i].split('=');
    queryObj[item[0]]=item[1];
  }
  return queryObj;
}

export default {
  formatTime,
  formatDate,
  formatNumber,
  parseSearch
}