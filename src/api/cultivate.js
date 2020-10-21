import request from '@/utils/request'

// 学院资讯分页查询
export function getCollegeInformationPage (data) {
  return request({
    url: '/collegeInformation/getCollegeInformationPage',
    method: 'post',
    data
  })
}

// 课程中心 课程列表
export function listColl (data) {
  return request({
    url: '/course/listColl',
    method: 'post',
    data
  })
}

// 课程中心 分类字典
export function getMarriage (data) {
  return request({
    url: '/course/getMarriage',
    method: 'post',
    data
  })
}

// 课程中心 预览
export function saveRead (id) {
  return request({
    url: '/course/saveRead/' + id,
    method: 'post'
  })
}

// 课程中心 收藏
export function saveContul (data) {
  return request({
    url: '/courseCollect/saveContul',
    method: 'post',
    data
  })
}

// 课程中心 取消收藏
export function deleteColler (data) {
  return request({
    url: '/courseCollect/deleteColler',
    method: 'post',
    data
  })
}

// 课程中心详情页 课程目录
export function listPage (id) {
  return request({
    url: '/course/courseList/' + id,
    method: 'post'
  })
}

// 课程中心详情页 讲师查询
// export function lecturer (id) {
//   return request({
//     url: '/courseLecturer/list/' + id,
//     method: 'post'
//   })
// }
// 获取单个学院资讯
export function getCollegeInformationById (id) {
  return request({
    url: '/collegeInformation/getCollegeInformationById/'+id,
    method: 'post'
  })
}

// 右上角展示的考试信息
export function getExamList (data) {
  return request({
    url: '/collegeInformation/getExam',
    method: 'post',
    data
  })
}

// 右上角展示的推荐动态
export function getRecommend (data) {
  return request({
    url: '/collegeInformation/getRecommend',
    method: 'post',
    data
  })
}

// 获取上一条或下一条 type为0上一条type为1下一条
export function getUpidtype (id, type) {
  return request({
    url: '/collegeInformation/getUp/'+id+'/'+type,
    method: 'post'
  })
}

// 心里培训课程列表
export function courselistPage (data) {
  return request({
    url: '/course/listPage',
    method: 'post',
    data
  })
}
