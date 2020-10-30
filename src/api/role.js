import {request, METHOD} from '@/utils/request'


  export function getRole(param) {
    return request('system/role/', METHOD.GET, param)
  }

  export function add(data) {
    return request('system/role/', METHOD.POST, data)
  }
  
  export function del(id) {
    return request('system/role/', METHOD.DELETE, id)
  }
  
  export function edit(data) {
    return request('system/role/'+data.role_id+'/', METHOD.PUT, data)
  }

  
export default {
    add, 
    edit, 
    del
  }
  