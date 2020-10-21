import request from '@/utils/request'

export function del (key) {
  const data = {
    key
  }
  return request({
    url: 'api/monitor/redis/delete',
    method: 'delete',
    data
  })
}

export function delAll () {
  return request({
    url: 'api/monitor/redis/deleteAll',
    method: 'delete'
  })
}
