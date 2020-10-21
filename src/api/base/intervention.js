import request from '@/utils/request'
/**
 * 干预介绍
 * @param 
 */
export function getIntervention () {
    return request({
      url: 'intervention/intervene/getIntervene',
      method: 'get'
    })
}

/**
 * 心理困惑
 * @param 
 */
export function getLaber () {
  return request({
    url: 'intervention/label/getLabel',
    method: 'get'
  })
}
/**
 * 查询咨询团队
 */
export function counselorList (data) {
  return request({
    url: 'intervention/counselor/counselorList',
    method: 'post',
    data
  })
}

/**
 * 查询文章列表
 */
export function articleList (data) {
  return request({
    url: 'intervention/article/getAllArticleByType',
    method: 'post',
    data
  })
}


/**
 * 查询活动列表
 */
export function getAllActivityList () {
  return request({
    url: 'intervention/activity/getAllActivity',
    method: 'get'
  })
}

/**
 * 留言 和 留电
 */
export function leavePhoneOrMessage(data) {
  return request({
    url: 'intervention/appointment/addAppointment',
    method: 'post',
    data
  })
}





