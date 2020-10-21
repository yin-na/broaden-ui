
import request from '@/utils/request'


//量表分类查询
export function labelList() {
    return request({
        url: '/PortalScaleLabel/queryScaleLabelList',
        method: 'get',
      })
}

//趣味测试 初始化列表
export function queryPesScaleList(params) {
    return request({
        url: '/scaleDetails/queryPesScaleList',
        method: 'get',
        params
      })
}
//详情
export function queryScaleDetails(params) {
    return request({
        url: '/scaleDetails/queryScaleDetails',
        method: 'get',
        params
      })
}

//热门
export function hotTest(params) {
    return request({
        url: '/scaleDetails/hotTest',
        method: 'get',
        params
      })
}
//量表详情题目查询
export function queryScaleSubject(params) {
    return request({
        url: '/PortalScaleSubject/queryScaleSubject',
        method: 'get',
        params
      })
}

//题目返回测试结果

export function subjectToSubmit(params) {
    return request({
        url: '/PortalScaleExpression/subjectToSubmit',
        method: 'get',
        params
      })
}
//猜你想测

export function guessTest(params) {
    return request({
        url: '/scaleDetails/guessTest',
        method: 'get',
        params
      })
}