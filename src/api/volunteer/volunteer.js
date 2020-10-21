// 志愿者信息服务
import request from '@/utils/request'

// 心理机构列表
export function list (data) {
  return request({
    url: '/sand/body/list',
    method: 'post',
    data
  })
}

// 机构新增
export function sava (data) {
  return request({
    url: '/sand/body/sava',
    method: 'post',
    data
  })
}

// 删除机构
export function delectList (id) {
  return request({
    url: '/sand/body/delectList?ids=' + id,
    method: 'get'
  })
}

// 机构查看
export function orgInfo (id) {
  return request({
    url: '/sand/body/orgInfo?id=' + id,
    method: 'get'
  })
}

// 机构批量导出
export function exportOrg (data) {
  return request({
    url: '/sand/body/exportOrg',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 心理咨询师列表
export function ListPage (data) {
  return request({
    url: '/intervention/counselor/counselorListPage',
    method: 'post',
    data
  })
}

// 心理咨询师列表查看
export function getCounselorById (id) {
  return request({
    url: '/intervention/counselor/getCounselorById/' + id,
    method: 'get'
  })
}

// 心理咨询师 咨询对象字典
export function getAllCounselorAdvisoryPeople () {
  return request({
    url: '/intervention/counselor/getAllCounselorAdvisoryPeople',
    method: 'get'
  })
}

// 心理咨询师 隶属机构字典列表
export function listBody (data) {
  return request({
    url: '/sand/body/listBody',
    method: 'post',
    data
  })
}

// 心理咨询师 服务机构字典列表
export function listVo (data) {
  return request({
    url: '/api/core/dept/list',
    method: 'get'
  })
}

// 心理咨询师 新增
export function saveCounselor (data) {
  return request({
    url: '/intervention/counselor/saveCounselor',
    method: 'post',
    data
  })
}

// 心理咨询师批量导出
export function exportCounselor (data) {
  return request({
    url: '/intervention/counselor/exportCounselor',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 心理咨询师删除
export function delCounselor (data) {
  return request({
    url: '/intervention/counselor/delCounselor',
    method: 'delete',
    data
  })
}

// 相关咨询列表
export function getInformationPage (data) {
  return request({
    url: '/information/getInformationPage',
    method: 'post',
    data
  })
}

// 咨询类型字典
export function getInformationType (data) {
  return request({
    url: '/information/getInformationType',
    method: 'get'
  })
}

// 相关咨询删除
export function delInformation (data) {
  return request({
    url: '/information/delInformation',
    method: 'delete',
    data
  })
}

// 相关咨询批量导出
export function exportNews (data) {
  return request({
    url: '/information/export',
    method: 'post',
    responseType: 'arraybuffer',
    data
  })
}

// 相关咨询新增
export function saveInformation (data) {
  return request({
    url: '/information/saveInformation',
    method: 'post',
    data
  })
}

// 相关咨询查看
export function getInformation (id) {
  return request({
    url: '/information/getInformation/' + id,
    method: 'get'
  })
}

// 相关咨询 草稿箱批量发布
export function issue (data) {
  return request({
    url: '/information/issue',
    method: 'post',
    data
  })
}

// 心理机构三级联动 地址
export function getCityTree (data) {
  return request({
    url: '/city/getCityTree',
    method: 'post',
    data
  })
}

// 地址查询
export function getCity (id) {
  return request({
    url: '/city/getPCity/' + id,
    method: 'post'
  })
}
