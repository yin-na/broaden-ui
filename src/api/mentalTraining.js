import request from '@/utils/request'

// 心智训练类型
export function mentalTypeList() {
    return request({
        url: '/MentalDisciplineGame/queryMentalTypeList',
        method: 'get'
      })
}

// 心智训练列表/推荐使用同一接口
export function queryMentalList(params) {
    return request({
        url: '/MentalDisciplineGame/queryMentalList',
        method: 'get',
        params
      })
}

// 心智训练详情
export function queryMentalDetail(params) {
    return request({
        url: '/MentalDisciplineGame/queryMentalDetail',
        method: 'get',
        params
      })
}
