
import request from '@/utils/request'

//咨询室的功能室管理
export function getcounltIndex(params) {
    return request({
        url: '/functionRoom/counltIndex',
        method: 'get',
        params
      })
}

//咨询室的来访者管理
export function getvisitorIndex(params) {
    return request({
        url: '/functionRoom/visitorIndex',
        method: 'get',
        params
      })
}

//咨询室的设备使用管理
export function getequipment(params) {
    return request({
        url: '/functionRoom/equipment',
        method: 'get',
        params
      })
}

//来访登记记录列表（个体和团体）
export function getVisitorRegisterPage(data) {
    return request({
        url: '/visitorRegister/getVisitorRegisterPage',
        method: 'post',
        data
      })
}

//新增或修改来访登记  
export function saveVisitorRegister(data) {
  return request({
      url: '/visitorRegister/saveVisitorRegister',
      method: 'post',
      data
    })
}

//咨询室的设备使用
export function getAllRoomEquipment() {
  return request({
      url: '/roomEquipment/getAllRoomEquipment',
      method: 'post'
    })
}

// 咨询室的来访事项
export function getConsultOrg() {
  return request({
      url: '/roomFunctionality/getAllRoomFunctionality',
      method: 'post'
    })
}

// 咨询室的来访备注
export function getConsultPeople(params) {
  return request({
      url: '/functionRoom/getConsultPeople',
      method: 'get',
      params
    })
}

//来访登记查看详情  
export function getVisitorRegister(id) {
  return request({
      url: 'visitorRegister/getVisitorRegisterById/'+id,
      method: 'post'
    })
}

//来访登记删除记录  
export function delVisitorRegister(data) {
  return request({
      url: '/visitorRegister/delVisitorRegister',
      method: 'delete',
      data
    })
}

//来访登记批量导出
export function exportAllExport(type,data) {
  return request({
      url: '/visitorRegister/export/'+type,
      method: 'post',
      responseType: 'arraybuffer',
      data
    })
}

//下载来访登记批量导入模板
export function downloadTemplate() {
  return request({
      url: '/visitorRegister/downloadTemplate',
      method: 'post',
      responseType: 'arraybuffer'
    })
}

//功能室的列表
export function getevaluationList(data) {
  return request({
      url: '/functionRoom/evaluationList',
      method: 'post',
      data
    })
}

//添加咨询室机构
export function saveContul(data) {
  return request({
      url: '/functionRoom/saveContul',
      method: 'post',
      data
    })
}

//删除咨询室机构
export function deldctContul(data) {
  return request({
      url: '/functionRoom/deldctContul',
      method: 'post',
      data
    })
}

//功能室的批量导出
export function getallExcel(data) {
  return request({
      url: '/functionRoom/allExcel',
      method: 'post',
      responseType: 'arraybuffer',
      data
    })
}

// 功能室的下载模板
export function downloadRoomTemplate() {
  return request({
      url: '/functionRoom/downloadTemplate',
      method: 'get',
      
    })
}

// 功能室的默认功能配置
export function getRoomConsultOrg() {
  return request({
      url: '/functionRoom/getConsultOrg',
      method: 'get',
      
    })
}

