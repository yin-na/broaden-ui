import request from '@/utils/request'

export function list (params) {
  return request({
    url: 'api/core/dept/list',
    method: 'get',
    params
  })
}
export function tree (params) {
  return request({
    url: 'api/core/dept/tree',
    method: 'get',
    params
  })
}
export function add (data) {
  return request({
    url: 'api/core/dept/create',
    method: 'post',
    data
  })
}

export function del (id) {
  return request({
    url: 'api/core/dept/delete/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/dept/update',
    method: 'put',
    data
  })
}

export function getById (id) {
  return request({
    url: 'api/core/dept/getById/' + id,
    method: 'get'
  })
}
