// import request from '@/utils/request'

// export function page (url, params) {
//   return request({
//     url: url,
//     method: 'get',
//     params
//   })
// }

// import request from '@/utils/request'

// export function page (url, params, method) {
//   return request({
//     url: url,
//     method: method,
//     params
//   })
// }

import request from '@/utils/request'

export function page (url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}

//  添加
export function pageStr (url, params) {
  return request({
    // url: 'api/core/dict/create',
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    params
  })
}
