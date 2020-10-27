import request from '@/utils/request'
let string = '/scaleSubject'
//  添加
export function add (data) {
  return request({
    url: string + '/addScaleSubject',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: string + '/scaleSubjectList',
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
    url: string + '/deletePesScaleSubject?' + s,
    method: 'post'
  })
}

// 编辑
export function edit (data) {
  return request({
    url: string + '/addScaleSubject',
    method: 'post',
    data
  })
}
