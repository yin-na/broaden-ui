import request from '@/utils/request'

// 分页查询新消息通知
export function getNoticePage(data) {
    return request({
        url: '/notice/getNoticePage',
        method: 'post',
        data
    })
}

// 根据id查询消息通知详情 
export function getNoticeById(id) {
    return request({
        url: '/notice/getNoticeById/'+id,
        method: 'get'
    })
}

//查询消息通知的字典
export function getDictType() {
    return request({
        url: '/notice/getDictType',
        method: 'get'
    })
}

//批量标注已读
export function readNotice(data) {
    return request({
        url: '/noticeUser/readNotice',
        method: 'post',
        data
    })
}

//全部标注已读  
export function allReadNotice(data) {
    return request({
        url: '/noticeUser/allReadNotice',
        method: 'post',
        data
    })
}