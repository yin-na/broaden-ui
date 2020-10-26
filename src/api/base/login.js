/* eslint-disable space-before-function-paren */
import request from '@/utils/request'

export function login(loginName, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      loginName,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getConfig() {
  return request({
    url: 'auth/sys/config',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/vCode',
    method: 'get'
  })
}
// 退出方法
export function logout() {
  return request({
    url: 'auth/logout',
    method: 'post'
  })
}
