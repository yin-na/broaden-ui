import request from '@/utils/request'

// 查询类型
  export function getAllType () {
    return request({
      url: '/type/getAllType',
      method: 'get',
    })
  }

  // 查询资源
  export function getAllResource (data) {
    return request({
      url: '/resource/getAllResourcePage',
      method: 'post',
      data
    })
  }

  export function getAllTypePage (data) {
    return request({
      url: '/type/getAllTypePage',
      method: 'post',
      data
    })
  }

  // 添加
  export function saveResource (data) {
    return request({
      url: '/resource/saveResource',
      method: 'post',
      data
    })
  }

  // 删除
  export function del (ids) {
    return request({
      url: '/resource/delResource?ids=' + ids,
      method: 'delete'
    })
  }
  