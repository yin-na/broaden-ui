import request from '@/utils/request'
let string = '/warningSet'
//  添加
export function save (data) {
  return request({
    url: string + '/saveWarningSet',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: string + '/getWarningSetByScaleId',
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
    url: string + '/delWarningSet?' + s,
    method: 'delete'
  })
}
