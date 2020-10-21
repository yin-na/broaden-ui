import request from '@/utils/request'

export function get (dictCode) {
  const params = {
    dictCode,
    page: 0,
    size: 9999
  }
  return request({
    url: 'api/core/dictValue/page',
    method: 'get',
    params
  })
}

export function add (data) {
  return request({
    url: 'api/core/dictValue/create',
    method: 'post',
    data
  })
}

export function del (id) {
  return request({
    url: 'api/core/dictValue/delete/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/dictValue/update',
    method: 'put',
    data
  })
}

export function getById (id) {
  return request({
    url: 'api/core/dictValue/getById/' + id,
    method: 'get'
  })
}

export function getDeptTypeByRoleCode () {
  return request({
    url: 'api/core/dictValue/getDeptTypeByRoleCode',
    method: 'get'
  })
}
