import request from '@/utils/request'

export function getErrDetail (id) {
  return request({
    url: 'api/monitor/log/errorById/' + id,
    method: 'get'
  })
}
