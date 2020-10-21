import request from '@/utils/request'

// 查询门户网站动态数据
export function dynamicModuleDat(params) {
    return request({
        url: '/dynamicModule/queryDynamicModuleData',
        method: 'get',
        params
    })
}

// 学校成员名单
export function querySchoolList() {
    return request({
        url: '/school/querySchoolList',
        method: 'get',
    })
}