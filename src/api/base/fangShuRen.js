import request from '@/utils/request'

// 查询
  export function getList (data) {
    return request({
      url: '/fsr/picture/list',
      method: 'post',
      data
    })
  }

  // 删除
  export function delectList (id) {
    return request({
      url: '/fsr/picture/delectList?ids=' + id,
      method: 'post'
    })
  }

  // 编辑
  export function savePicture (data) {
    return request({
      url: '/fsr/picture/savePicture?name=' + data.name + '&id=' + data.id,
      method: 'post'
    })
  }