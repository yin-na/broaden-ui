import request from '@/utils/request'

//  添加
export function add (data) {
  return request({
    url: '/scale/showScale/saveScaleShow',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: '/scale/showScale/findAllShow',
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
    url: '/scale/showScale/delBatch?' + s,
    method: 'delete'
  })
}

// 编辑
export function edit (data) {
  return request({
    url: '/scale/showScale/saveScaleGroup',
    method: 'post',
    data
  })
}

// 查询
export function getById (id) {
  return request({
    url: '/scale/showScale/findShowScaleById/' + id,
    method: 'get'
  })
}

// 查询绑定量表
export function getScaleByShowId (data) {
  return request({
    url: '/scale/showScale/findScaleByShow',
    method: 'post',
    data
  })
}

// 取消绑定量表
export function noBindingScale (data) {
  return request({
    url: '/scale/showScale/bindingScale',
    method: 'post',
    data
  })
}
