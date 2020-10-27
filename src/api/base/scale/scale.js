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

export function showImage (url) {
  return request({
    url: '/imge/show?url=' + url,
    method: 'get'
  })
}

// 删除
export function del (data) {
  let s = ''
  data.forEach((res, index) => {
    if (index === 0) {
      s += 'ids=' + res
    } else {
      s += '&ids=' + res
    }
  })
  return request({
    url: '/scale/deletePesScale?' + s,
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

// 下载模板
export function downloadTemplate () {
  return request({
    url: '/scale/downloadTemplate',
    method: 'get',
    responseType: 'blob'
  })
}
// 上传模板
export function uploadAnswer (data) {
  return request({
    url: '/scale/uploadAnswer',
    method: 'post',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
