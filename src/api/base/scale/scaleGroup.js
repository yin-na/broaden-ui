import request from '@/utils/request'

//  添加
export function add (data) {
  return request({
    url: '/scale/scaleGroup/saveScaleGroup',
    method: 'post',
    data
  })
}

export function list (data) {
  return request({
    url: '/scale/scaleGroup/findAllGroup',
    method: 'post',
    data
  })
}

// 删除
export function del (data) {
  let s = ''
  data.forEach((res, index) => {
    // eslint-disable-next-line no-constant-condition,no-cond-assign
    if (index === 0) {
      s += 'ids=' + res
    } else {
      s += '&ids=' + res
    }
  })
  return request({
    url: '/scale/scaleGroup/delBatch?' + s,
    method: 'delete'
  })
}

// 编辑
export function edit (data) {
  return request({
    url: '/scale/scaleGroup/saveScaleGroup',
    method: 'post',
    data
  })
}

// 查询
export function getById (id) {
  return request({
    url: '/scale/scaleGroup/findScaleGroupById/' + id,
    method: 'get'
  })
}

// 查询绑定量表
export function getScaleByGroupId (data) {
  return request({
    url: '/scale/scaleGroup/findScaleByScaleGroup',
    method: 'post',
    data
  })
}

// 取消绑定量表
export function bindingScale (data) {
  return request({
    url: '/scale/scaleGroup/bindingScale',
    method: 'post',
    data
  })
}
