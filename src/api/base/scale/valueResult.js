import request from '@/utils/request'
let string = '/valueResult'
//  添加
export function save (data) {
  return request({
    url: string + '/saveValueResult',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: string + '/allPageQuery',
    method: 'post',
    data
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
    url: string + '/delValueResult?' + s,
    method: 'delete'
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
