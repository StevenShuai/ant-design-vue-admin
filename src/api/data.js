import {request, METHOD} from '@/utils/request'
import qs from 'qs'

export function initData(url, params) {
  return request(url, METHOD.GET, params)
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}
