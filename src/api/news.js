import request from '@/utils/request'

//列表
export function newsList(params) {
    return request({
        url: '/newsBulletin/queryNewsBulletin',
        method: 'get',
        params
      })
}
//详情
export function newsDetial(id) {
    return request({
        url: '/newsBulletin/queryNewsBulletinDetail/' + id,
        method: 'get',
      })
}