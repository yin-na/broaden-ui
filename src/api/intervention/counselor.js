import request from '@/utils/request'
let s = '/intervention/counselor'

export function getAllLabel(data) {
    return request({
        url: '/intervention/label/getLabel',
        method: 'get',
        data
    })
}

export function list(data) {
    return request({
        url: s + '/counselorListPage',
        method: 'post',
        data
    })
}

export function getone(data) {
    return request({
        url: s + '/getCounselorById/' + data,
        method: 'get'
    })
}


export function listHealth(data) {
    return request({
        url: s + '/counselorListPageHealth',
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

export function saveCounselorHealth(data) {
    return request({
        url: s + '/saveCounselorHealth',
        method: 'post',
        data
    })
}

export function getAllCounselorType(data) {
    return request({
        url: s + '/getAllCounselorType',
        method: 'get',
        data
    })
}

export function del(data) {
    return request({
        url: s + '/delCounselor',
        method: 'delete',
        data
    })
}

//获取认证资质
export function getAllCounselorAptitude() {
    return request({
        url: s + '/getAllCounselorAptitude',
        method: 'get'
    })
}

//获取咨询方式
export function getAllCounselorConsultType() {
    return request({
        url: s + '/getAllCounselorConsultType',
        method: 'get'
    })
}
//获取咨询人群
export function getAllCounselorAdvisoryPeople() {
    return request({
        url: s + '/getAllCounselorAdvisoryPeople',
        method: 'get'
    })
}

//获取咨询师擅长领域
export function getAllCounselorSpecializeTerritory(params) {
    return request({
        url: '/intervention/counselor/getAllCounselorSpecializeTerritory',
        method: 'get',
        params
    })
}

//获取省市区
export function getAllCity() {
    return request({
        url: '/city/getCityTree',
        method: 'post'
    })
}




