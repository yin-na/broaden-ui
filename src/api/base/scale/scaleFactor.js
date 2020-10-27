import request from '@/utils/request'
let string = '/scaleFactor'
//  添加
export function add (data) {
  return request({
    url: string + '/addScaleFactor',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: string + '/scaleFactorList',
    method: 'post',
    data
  })
}
export function findAll (data) {
  return request({
    url: string + '/findAll/' + data,
    method: 'post'
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
    url: string + '/deleteScaleFactor?' + s,
    method: 'delete'
  })
}

// 编辑
export function edit (data) {
  return request({
    url: string + '/addScaleFactor',
    method: 'post',
    data
  })
}

// 下载模板
export function downloadTemplate () {
  return request({
    url: string + '/downloadTemplate',
    method: 'post',
    responseType: 'blob'
  })
}
// 上传模板
export function uploadAnswer (data) {
  return request({
    url: string + '/uploadAnswer',
    method: 'post',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
