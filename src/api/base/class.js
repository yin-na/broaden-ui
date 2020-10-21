import request from '@/utils/request'

export function get (data) {
    return request({
      url: '/sysClass/classList',
      method: 'post',
      data
    })
  }

  export function getGradeStage () {
    return request({
      url: '/sysClass/getClassDict',
      method: 'get'
    })
  }

  export function del (id) {
    return request({
      url: '/sysClass/deletePesClass?ids=' + id,
      method: 'post'
    })
  }

  export function add (data) {
    return request({
      url: '/sysClass/addClassBatch',
      method: 'post',
      data
    })
}
  // 获取最大班级编码
export function getMaxNumberOfClass(id) {
  return request({
    url: '/sysClass/getMaxNumberOfClass?reformId='+id,
    method: 'get'
  })
}