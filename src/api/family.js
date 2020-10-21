import request from '@/utils/request'

// 查询列表
export function queryFamilyGuideList(data) {
    return request({
        url: '/familyGuide/queryFamilyGuideList',
        method: 'post',
        data
      })
}

export function queryFamilyGuide(id) {
    return request({
        url:'/familyGuide/queryFamilyGuide/' + id,
        method: 'get',
    })
}