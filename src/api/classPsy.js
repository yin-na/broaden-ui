
import request from '@/utils/request'

//心理讲堂页面列表 热门推荐
export function getForumList() {
    return request({
        url: '/PsyForumSkill/getForumList',
        method: 'get'
      })
}
//电话咨询
export function queryForumList(params) {
    return request({
        url: '/PsyForumSkill/queryForumList',
        method: 'get',
        params
      })
}
//详情
export function getForumDetail(params) {
    return request({
        url: '/PsyForumSkill/getForumDetail',
        method: 'get',
        params
      })
}