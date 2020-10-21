import request from '@/utils/request'
let s = '/api/database'


export function list(data) {
    return request({
        url: s + '/tableListInfo',
        method: 'post',
        data
    })
}




export function del(data) {
    return request({
        url: s + '/deleteTableData',
        method: 'post',
        data
    })
}


export function delAll() {
    return request({
        url: s + '/deleteAllData',
        method: 'post'
    })
}

export function deleteAllWithOutUser() {
    return request({
        url: s + '/deleteAllWithOutUser',
        method: 'post'
    })
}









