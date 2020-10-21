import request from '@/utils/request'
// 查询省级下拉
export function getProvinceList() {
    return request({
      url: 'sysArea/getProvinceList',
      method: 'get',
    })
  }
 // 查询市级下拉
export function getCityList(params) {
    return request({
      url: 'sysArea/getCityList',
      method: 'get',
      params
    })
  }
 // 查询区级下拉
 export function getAreaList(params) {
    return request({
      url: 'sysArea/getAreaList',
      method: 'get',
      params
    })
  }
 // 查询街道下拉
export function getStreetList(params) {
    return request({
      url: 'sysArea/getStreetList',
      method: 'get',
      params
    })
  }
 