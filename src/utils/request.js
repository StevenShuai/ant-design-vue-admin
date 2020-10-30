import axios from 'axios'
import Cookie from 'js-cookie'
import store from '@/store'

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'

axios.defaults.timeout = 5000
axios.defaults.withCredentials= true
axios.defaults.xsrfHeaderName= xsrfHeaderName
axios.defaults.xsrfCookieName= xsrfHeaderName

// 认证类型
const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2',
}

// http method
const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put'
}

const BASE_URL = process.env.VUE_APP_API_BASE_URL


/**
 * 获取token
 */
export function getToken(){
  return Cookie.get(xsrfHeaderName)
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params) {
  url = BASE_URL + url
  switch (method) {
    case METHOD.GET:
      return axios.get(url, {params})
    case METHOD.POST:
      return axios.post(url, params)
    case METHOD.DELETE:
      return axios.delete(url + params + '/')
    case METHOD.PUT:
      return axios.put(url, params)
    default:
      return axios.get(url, {params})
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      Cookie.set(xsrfHeaderName, auth.token, {expires: auth.expireAt})
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  localStorage.removeItem(process.env.VUE_APP_USER_KEY)
  // 清除获取未读消息数量定时任务
  clearInterval(localStorage.getItem(process.env.VUE_APP_NOTICE_TIMER_KEY))
  localStorage.removeItem(process.env.VUE_APP_NOTICE_TIMER_KEY)

  switch (authType) {
    case AUTH_TYPE.BEARER:
      Cookie.remove(xsrfHeaderName)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      if (getToken()) {
        return true
      }
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
  return false
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(options) {
  var vm = this

  // 加载请求拦截器
  axios.interceptors.request.use(
    config => {
      if (getToken()) {
        config.headers['Authorization'] = getToken()
      }
      config.headers['Content-Type'] = 'application/json'
      return config
    },
    error => {
      const {notification} = options
      notification['error']({
        message: 'System prompt',
        description:error.message,
        duration: 2
      });
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    response => {
        const lang = store.getters['setting/lang']
        const errorTitle = {CN: '系统提示', EN: 'System prompt'}
        const requestFailedErrorMsg = {CN: '接口请求失败', US: 'Interface request failed'}

        const code = response.data.code
        if (code < 200 || code > 300) {
          const {notification} = options
          notification['error']({
            message: errorTitle[lang],
            description:requestFailedErrorMsg[lang]
          });
          return Promise.reject('error')
        } else {
          return response.data
        }
      },
    error => {
        let code = 0
        const {router, notification} = options
        var lang = store.getters['setting/lang']
        const errorTitle = {CN: '系统提示', US: 'System prompt'}
        const expiredErrorMsg = {CN: '登录已失效，请重新登录', US: 'Login has expired, please login again'}
        const requestFailedErrorMsg = {CN: '接口请求失败', US: 'Interface request failed'}

        try {
          code = error.response.data.code
        } catch (e) {
          if (error.toString().indexOf('Error: timeout') !== -1) {
            notification['error']({
              message: errorTitle[lang],
              description: requestFailedErrorMsg[lang]
            });
            return Promise.reject(error)
          }
        }
        if(code === 400){
          var errorMsg = error.response.data.msg
          if(errorMsg != undefined){
            errorMsg.forEach(msg => {
              if (msg != undefined) {
                  notification['error']({
                    message: errorTitle[lang],
                    description: msg[lang]
                });
              }
            })
          }else{
            notification['error']({
              message: errorTitle[lang],
              description: requestFailedErrorMsg[lang]
            });
          }
        }else if(code === 401 || code === 403){
          vm.removeAuthorization()
          location.reload()
          if(errorMsg != undefined){
            errorMsg.forEach(msg => {
              if (msg != undefined) {
                  notification['error']({
                    message: errorTitle[lang],
                    description: expiredErrorMsg[lang]
                });
              }
            })
          }else{
            notification['error']({
              message: errorTitle[lang],
              description: requestFailedErrorMsg[lang]
            });
          }
        }else {
          notification['error']({
            message: errorTitle[lang],
            description: requestFailedErrorMsg[lang]
          });
        }
        
        return Promise.reject(error)
      } 
    )
}

export {
  METHOD,
  AUTH_TYPE,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors
}
