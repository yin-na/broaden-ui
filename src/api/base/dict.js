import request from '@/utils/request'

export function add (data) {
  console.log(data)
  // eslint-disable-next-line no-debugger
  debugger
  return request({
    url: 'api/core/dict/create',
    method: 'post',
    data
  })
}

export function del (id, code) {
  return request({
    url: 'api/core/dict/delete/' + id + '/' + code,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/dict/update',
    method: 'put',
    data
  })
}

export function getById (id) {
  return request({
    url: 'api/core/dict/getById/' + id,
    method: 'get'
  })
}
