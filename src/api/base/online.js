import request from '@/utils/request'

// 查询在线用户列表
export function page (params) {
  return request({
    url: 'api/monitor/online/page',
    method: 'get',
    params
  })
}

// 强退用户
export function forceLogout (tokenId) {
  return request({
    url: 'api/monitor/online/delete/' + tokenId,
    method: 'delete'
  })
}
