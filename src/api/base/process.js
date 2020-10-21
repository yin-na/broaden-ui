import request from '@/utils/request'
// 启动流程
export function start (data) {
  return request({
    url: '/api/flow/start',
    method: 'post',
    data
  })
}
// 获取流程信息
export function getProcessInfo (data) {
  return request({
    url: '/api/flow/processInfo',
    method: 'post',
    data
  })
}

export function getCurrentTaskNode (params) {
  return request({
    url: '/api/flow/getCurrentTaskNode',
    method: 'get',
    params
  })
}
// 审批：同意
export function pass (data) {
  return request({
    url: '/api/flow/agree',
    method: 'post',
    data
  })
}
// 审批：驳回
export function unPass (data) {
  return request({
    url: '/api/flow/reject',
    method: 'post',
    data
  })
}
// 签收任务
export function claim (taskId, userId) {
  return request({
    url: '/api/flow/claim/' + taskId + '/' + userId,
    method: 'get'
  })
}
// 终止流程
export function stopProcess (obj) {
  return request({
    url: '/api/flow/stop',
    method: 'post',
    data: obj
  })
}
// 获取流程流转信息
export function historyFlow (procDefKey, bizkey) {
  return request({
    url: '/api/flow/historyFlow/' + procDefKey + '/' + bizkey,
    method: 'get'
  })
}
// 获取流程图
export function processImage (procDefKey, bizkey) {
  return request({
    url: '/api/flow/processImage/' + procDefKey + '/' + bizkey,
    method: 'get'
  })
}
