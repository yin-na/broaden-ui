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