import request from '@/utils/request'

export function getAllJob (deptId) {
  const params = {
    deptId,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/core/post/page',
    method: 'get',
    params
  })
}
export function getById (postId) {
  return request({
    url: 'api/core/post/getById/' + postId,
    method: 'get'
  })
}
export function add (data) {
  return request({
    url: 'api/core/post/create',
    method: 'post',
    data
  })
}

export function del (id) {
  return request({
    url: 'api/core/post/delete/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/post/update',
    method: 'put',
    data
  })
}
