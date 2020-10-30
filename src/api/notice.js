import {request, METHOD} from '@/utils/request'

  export function queryNotice(params) {
    return request('notice/list/', METHOD.GET, params)
  }

  export function markRead(notice_id) {
    return request('notice/markRead/'+notice_id+'/', METHOD.PUT)
  }

  export function queryCount() {
    return request('notice/list/count/', METHOD.GET)
  }
  