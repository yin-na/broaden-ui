import request from '@/utils/request'

export function count () {
  return request({
    url: 'api/core/visit/create',
    method: 'post'
  })
}

export function get () {
  return request({
    url: 'api/core/visit/get',
    method: 'get'
  })
}

export function getChartData () {
  return request({
    url: 'api/core/visit/chartData',
    method: 'get'
  })
}
