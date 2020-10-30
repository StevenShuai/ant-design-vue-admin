import {request, METHOD, removeAuthorization} from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(username, password) {
  return request(
    'system/login/', 
    METHOD.POST, 
    {
      user_name: username,
      password: password
    })
}

export async function getRoutesConfig(param) {
  return request('system/menu/build/', METHOD.GET, param)
}

/**
 * 退出登录
 */
export function logout(username) {
  removeAuthorization()
  return request(
    'system/logout/', 
    METHOD.POST,
    {
      user_name: username
    }
  )
}

export function add(data) {
  return request('system/user/', METHOD.POST, data)
}

export function del(id) {
  return request('system/user/', METHOD.DELETE, id)
}

export function edit(data) {
  return request('system/user/'+data.id+'/', METHOD.PUT, data)
}

export function updatePassword (data) {
  return request('system/user/change_password/', METHOD.PUT, data)
 }

 export function resetPassword (data) {
  return request('system/user/'+ data.id + '/reset_password/', METHOD.PUT)
 }

export default {
  add, 
  edit, 
  del,
  login,
  logout,
  getRoutesConfig,
  resetPassword
}
