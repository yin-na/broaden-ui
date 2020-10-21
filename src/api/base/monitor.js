import request from '@/utils/request'

export function add (data) {
    return request({
      url: '/chartmonitor/addMonitor',
      method: 'post',
      data
    })
}
export function get () {
    return request({
      url: '/chartmonitor/getMonitorList',
      method: 'get',
    })
  }
  
  // 预警视频表分页查询
  export function allPageQuery () {
    return request({
      url: '/ChartEarlyWarning/allPageQuery',
      method: 'get',
    })
  }
  
  // 查询最新的预警视频列表
  export function getChartEarly () {
    return request({
      url: '/ChartEarlyWarning/getChartEarlyWarningList',
      method: 'get',
    })
  }

  export function setIsRead (data) {
    return request({
      url: '/ChartEarlyWarning/setIsRead',
      method: 'post',
      data
    })
}