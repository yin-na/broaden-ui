import request from '@/utils/request'

export function page (url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
