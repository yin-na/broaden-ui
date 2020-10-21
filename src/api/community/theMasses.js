import request from '@/utils/request'

export function get(params) {
    return request({
        url:  '/api/core/user/getMyDeptUser',
        method: 'get',
        params
  })
}

export function saveMasses(data) {
    return request({
        url:  '/masses/saveMasses',
        method: 'post',
        data
  })
}