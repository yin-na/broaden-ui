import request from '@/utils/request'

var s = '/gatherRecord'
var s1 = '/follow'

//  分页查询采集记录
export function gatherRecordPage (data) {
    return request({
        url: s+'/gatherRecordPage',
        method: 'post',
        data
    })
}
//  查询所有采集类型
export function getGatherType () {
    return request({
        url: s+'/getGatherType',
        method: 'get'
    })
}

//  分页查询订单记录
export function userOrderPage (data) {
    return request({
        url: '/userOrder/userOrderPage',
        method: 'post',
        data
    })
}
//  分页查询跟进记录
export function followPage (data) {
    return request({
        url: s1 + '/followPage',
        method: 'post',
        data
    })
}

//  添加或修改跟进记录
export function saveFollow (data) {
    return request({
        url: s1 + '/saveFollow',
        method: 'post',
        data
    })
}

//  查询单个跟进记录
export function getFollowById (id) {
    return request({
        url: s1 + '/getFollowById/' + id,
        method: 'post'
    })
}