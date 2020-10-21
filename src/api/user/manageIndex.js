import request from '@/utils/request'

// 基本信息查询
export function studentDetail (userId) {
  return request({
    url: '/archive/queryArchive?userId=' + userId,
    method: 'get'
  })
}

// 心路历程查询
export function getJourneyOfMind (date) {
  return request({
    url: '/archive/getJourneyOfMind?date=' + date,
    method: 'get'
  })
}

// 年度查询
export function yearQuery (date) {
  return request({
    url: 'archive/getMindCount?date=' + date,
    method: 'get'
  })
}

// 修改
export function updateArchive (data) {
  return request({
    url: 'archive/updateArchive',
    method: 'post',
    data
  })
}
