import {request, METHOD} from '@/utils/request'


  export function getMenuTree(param) {
    return request('system/menu/all/', METHOD.GET, param)
  }

  export function add(data) {
    return request('system/menu/', METHOD.POST, data)
  }
  
  export function del(id) {
    return request('system/menu/', METHOD.DELETE, id)
  }
  
  export function edit(data) {
    return request('system/menu/'+data.menu_id+'/', METHOD.PUT, data)
  }

  
export default {
    getMenuTree,
    add, 
    edit, 
    del
  }
  