import request from '@/utils/request'
let s = '/database'

export function dbBackUp() {
    return request({
        url: s + '/dbBackUp',
        method: 'get',
    })
}

export function list(data) {
    return request({
        url: s + '/findBackups',
        method: 'post',
        data
    })
}









