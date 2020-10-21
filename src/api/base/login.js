/* eslint-disable space-before-function-paren */
import request from '@/utils/request'

export function login(loginName, password,code) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      loginName,
      password,
      code
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCode (phone) {
  return request({
    url: '/auth/mobile/' + phone,
    method: 'get'
  })
}

export function changePassword(mobile, messageCode, newpassword) {
  return request({
    url: '/auth/forgetPassword?mobile=' + mobile + '&messageCode=' + messageCode + '&newpassword=' + newpassword,
    method: 'get'
  })
}

export function loginIn (mobile, messageCode) {
  return request({
    url: '/auth/codeLogin?mobile=' + mobile + '&messageCode=' + messageCode,
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
// 生成二维码
export function getQRImg() {
  return request({
    url: '/wx/base/getJsapiTicket',
    method: 'get'
  })
}
// 二维码查询
export function getQRInfo (id) {
  return request({
    url: '/wx/base/getQrCodeState/' + id,
    method: 'get'
  })
}

// 立即綁定
export function getBind (phone, birthday, messageCode, userId) {
  return request({
    url: '/auth/savePhone?mobile=' + phone + '&birthday=' + birthday + '&messageCode=' + messageCode + '&userId=' + userId,
    method: 'get'
  })
}

// 跳转首页
export function gotoPage (id, userId) {
  return request({
    url: '/auth/scanLogin?id=' + id + '&userId=' + userId,
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
