import request from '@/utils/request'

export function get (data) {
    return request({
      url: '/grade/getGradeList',
      method: 'post',
      data
    })
  }

  export function add (data) {
    return request({
      url: '/grade/saveGrade',
      method: 'post',
      data
    })
  }

  export function getType () {
    return request({
      url: '/grade/getReformBySchool',
      method: 'post'
    })
  }

  export function del (id) {
    return request({
      url: '/grade/delGrade?ids=' + id,
      method: 'delete'
    })
  }

  export function getYear () {
    return request({
      url: '/reform/getDept',
      method: 'get',
    })
  }

  export function getGrade (date) {
    return request({
      url: '/grade/getReformBySchool?years=' + date,
      method: 'post',
    })
  }