import request from '@/utils/request'
let string = '/scaleExpression'
//  添加
export function save (data) {
  return request({
    url: string + '/addScaleExpression',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: string + '/scaleExpressionList',
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
    url: string + '/deletePesScale?' + s,
    method: 'post'
  })
}
