import {request, METHOD} from '@/utils/request'

  export function getPosition(param) {
    return request('system/position/', METHOD.GET, param)
  }

  export function add(data) {
    return request('system/position/', METHOD.POST, data)
  }
  
  export function del(id) {
    return request('system/position/', METHOD.DELETE, id)
  }
  
  export function edit(data) {
    return request('system/position/'+data.position_id+'/', METHOD.PUT, data)
  }

  
export default {
    add, 
    edit, 
    del
  }
  