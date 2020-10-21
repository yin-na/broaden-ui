import request from '@/utils/request'

export function list (data) {
    return request({
        url: '/testRecord/getTestRecordListPage',
        method: 'post',
        data
    })
}
