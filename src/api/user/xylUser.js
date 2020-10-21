import request from '@/utils/request'


// 查询学生列表
export function getUserByXyl (data) {
    return request({
        url: '/counselorXyl/getUserPageByXyl',
        method: 'post',
        data
    })
}

// 添加学生
export function saveUser (data) {
    return request({
        url: '/counselorXyl/saveUser',
        method: 'post',
        data
    })
}
// 获取用户详情
export function getUserDetail (data) {
    return request({
        url: '/api/core/user/getById/' + data,
        method: 'get'
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
