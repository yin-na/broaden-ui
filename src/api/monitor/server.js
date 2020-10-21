/* eslint-disable space-before-function-paren */
import request from '@/utils/request'
export function getServer() {
    return request({
        url:'/api/monitor/server/getInfo',
        method: 'get'
    })
}

export function generateLicenseKey() {
    return request({
        url:'/api/monitor/server/generateLicenseKey',
        method: 'get'
    })
}

export function sendMsg(data) {
    return request({
        url:'/api/monitor/server/sendMsg',
        method: 'post',
        data
    })
}

export function sendEmail(data) {
    return request({
        url:'/api/monitor/server/sendEmail',
        method: 'post',
        data
    })
}


