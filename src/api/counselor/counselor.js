import request from '@/utils/request'
let s = 'counselorXyl'

export function list(data) {
    return request({
        url: s + '/counselorListPage',
        method: 'post',
        data
    })
}

export function save(data) {
    return request({
        url: s + '/saveCounselor',
        method: 'post',
        data
    })
}