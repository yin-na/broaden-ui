import request from '@/utils/request'
let s = '/logo/sys-logo'

export function list (data) {
  return request({
    url: s + '/listPage',
    method: 'post',
    data
  })
}

export function save (data) {
  return request({
    url: s + '/saveContul',
    method: 'post',
    data
  })
}

export function del (data) {
  return request({
    url: s + '/deletelist',
    method: 'post',
    data
  })
}

export function updateState (params) {
  return request({
    url: s + '/updateState',
    method: 'get',
    params
  })
}

export function getOne () {
  return request({
    url: s + '/getOne',
    method: 'post'
  })
}
