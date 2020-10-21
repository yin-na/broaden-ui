import request from '@/utils/request'


export function getAllReform (data) {
  return request({
    url: '/reform/getAllReform',
    method: 'post',
    data
  })
}

