import request from '@/utils/request'

// 获取所有的Role
export function page () {
  return request({
    url: 'api/core/role/page',
    method: 'get'
  })
}

export function add (data) {
  return request({
    url: 'api/core/role/create',
    method: 'post',
    data
  })
}

export function getById (id) {
  return request({
    url: 'api/core/role/getById/' + id,
    method: 'get'
  })
}

export function del (roleId) {
  return request({
    url: 'api/core/role/delete/' + roleId,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/role/update',
    method: 'put',
    data
  })
}
export function roleTree (params) {
  return request({
    url: 'api/core/role/tree',
    method: 'get',
    params
  })
}

export function updateRoleStatus (data) {
  return request({
    url: 'api/core/role/updateRoleStatus',
    method: 'put',
    data
  })
}

export function getRolesByUserId (userId) {
  return request({
    url: 'api/core/role/getRolesByUserId/' + userId,
    method: 'get'
  })
}

export function grantDataScope (data) {
  return request({
    url: 'api/core/role/grantDataScope',
    method: 'post',
    data
  })
}

export function selectDeptIdByRoleId (roleId) {
  return request({
    url: 'api/core/role/selectDeptIdByRoleId/' + roleId,
    method: 'get'
  })
}
