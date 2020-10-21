import request from '@/utils/request'


// 查询学生列表
export function getStudentList (data) {
  return request({
    url: 'student/getStudentList',
    method: 'post',
    data
  })
}

// 添加学生
export function saveStudent (data) {
    return request({
      url: 'student/saveStudent',
      method: 'post',
      data
    })
}

// 获取班级列表
export function getClass (gid) {
    return request({
      url: 'sysClass/getClassListByGrade/' + gid,
      method: 'post',
    })
}

// 获取年级列表
export function getSchool (type) {
  return request({
    url: '/grade/getReformList?type='+type,
    method: 'post',
  })
}

// 获取班级列表
export function getStudentDetail (id) {
  return request({
    url: 'student/getStudentDetail/'+id,
    method: 'post',
  })
}


// 下载模板
export function downloadTemplate () {
  return request({
    url: 'student/downloadTemplate',
    method: 'post',
    responseType:'arraybuffer'
  })
}


// 上传
export function upload (data) {
  return request({
    url: 'student/uploadAnswer',
    method: 'post',
    data
  })
}

// 上传
export function download () {
  return request({
    url: 'student/download',
    method: 'post',
  })
}

export function del (id) {
  return request({
    url: 'student/delStudent?ids=' + id,
    method: 'delete'
  })
}
