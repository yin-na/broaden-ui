import request from '@/utils/request'
// 分页查询
export function page (params) {
  return request({
    url: 'api/core/user/page',
    method: 'get',
    params
  })
}
export function add (data) {
  return request({
    url: 'api/core/user/create',
    method: 'post',
    data
  })
}

export function del (id) {
  return request({
    url: 'api/core/user/delete/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/user/update',
    method: 'put',
    data
  })
}

export function validPass (password) {
  const data = {
    password
  }
  return request({
    url: 'api/core/user/validPass',
    method: 'post',
    data
  })
}

export function updatePass (password) {
  const data = {
    password
  }
  return request({
    url: 'api/core/user/updatePass',
    method: 'post',
    data
  })
}

export function updateEmail (code, data) {
  return request({
    url: 'api/core/user/updateEmail/' + code,
    method: 'post',
    data
  })
}

export function getById (id) {
  return request({
    url: 'api/core/user/getById/' + id,
    method: 'get'
  })
}

export function updateUserStatus (data) {
  return request({
    url: 'api/core/user/updateUserStatus',
    method: 'put',
    data
  })
}
