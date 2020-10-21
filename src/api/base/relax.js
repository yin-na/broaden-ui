/* eslint-disable space-before-function-paren */
import request from '@/utils/request'

export function relaxList() {
  return request({
    url: 'relax/list',
    method: 'get'
  })
}

export function getRelaxDetailInfo(id) {
  return request({
    url: 'relax/detail/' + id,
    method: 'get'
  })
}

/**
 * 修改身心放松数据
 * @param {*} data 
 */
export function updateRelax(data) {
  return request({
    url: 'relax/updateRelax',
    method: 'post',
    data
  })
}
