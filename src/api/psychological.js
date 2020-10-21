import request from '@/utils/request'

// 资源分类展示
export function libraryList() {
    return request({
        url: '/science/selectLibraryList',
        method: 'get'
      })
}


// 资源列表查询
export function buildingListTable(params) {
    return request({
        url: '/science/queryScienceBuildingList',
        method: 'get',
        params
      })
}

// 热文推荐
export function recommend(params) {
    return request({
        url: '/science/recommend',
        method: 'get',
        params
    })
}

// 资源详情页
export function scienceByIdDetail(params) {
    return request({
        url: '/science/queryScienceByIdDetail',
        method: 'get',
        params
    })
}

// 相关阅读接口
export function portalArticle(params) {
    return request({
        url: '/science/portalArticle',
        method: 'get',
        params
    })
}


//获取用户的作品列表
export function getFsrReport(data) {
    return request({
        url: '/counselor/psy-drawing/getFsrReport',
        method: 'post',
        data
    })
}

