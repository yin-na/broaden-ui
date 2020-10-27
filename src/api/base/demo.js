import request from '@/utils/request'

//  添加
export function add (data) {
  return request({
    url: '/scale/addScale',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: '/scale/scaleList',
    method: 'post',
    data
  })
}

// 删除
export function del (ids, code) {
  return request({
    url: '/scale/deletePesScale?ids=' + ids,
    method: 'post'
  })
}

// 编辑
export function edit (data) {
  return request({
    url: '/scale/addScale',
    method: 'post',
    data
  })
}

// 查询
export function getById (id) {
  return request({
    url: '/scale/scaleDeil?id=' + id,
    method: 'get'
  })
}
