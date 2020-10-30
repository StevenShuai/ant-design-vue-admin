import {request, METHOD} from '@/utils/request'

  export function getDeptTree(param) {
    return request('system/dept/build/', METHOD.GET, param)
  }

  export function add(data) {
    return request('system/dept/', METHOD.POST, data)
  }
  
  export function del(id) {
    return request('system/dept/', METHOD.DELETE, id)
  }
  
  export function edit(data) {
    return request('system/dept/'+data.dept_id+'/', METHOD.PUT, data)
  }

  
export default {
    getDeptTree,
    add, 
    edit, 
    del
  }
  