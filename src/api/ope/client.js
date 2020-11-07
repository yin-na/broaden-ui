import request from '@/utils/request'

var s = '/client'

//  分页查询
export function page (data) {
    return request({
        url: s+'/clientPage',
        method: 'post',
        data
    })
}
//  查询单个
export function getClientById (id) {
    return request({
        url: s+'/getClientById/' + id
    })
}
//  查询单个
export function saveClient (data) {
    return request({
        url: s+'/saveClient',
        method: 'post',
        data
    })
}