import request from '@/utils/request'

  export function get (data) {
    return request({
      url: '/staff/getStaffList',
      method: 'post',
      data
    })
  }

  export function getType () {
    return request({
      url: '/staff/getStaffRoleList',
      method: 'post'
    })
  }

  export function add (data) {
    return request({
      url: '/staff/saveStaff',
      method: 'post',
      data
    })
  }

// 查询机构信息
export function getDeptInfo () {
    return request({
      url: 'api/core/user/getDeptInfo',
      method: 'get',
    })
  }

  export function getSchoolTypes (dictCode) {
    const params = {
      dictCode,
      page: 0,
      size: 9999
    }
    return request({
      url: 'api/core/dictValue/page',
      method: 'get',
      params
    })
  }

  export function down () {
    return request({
      url: '/staff/downloadTemplate',
      method: 'post',
      responseType: 'blob'
    }).then((res) => {
      let blob = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); // application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
      let downloadElement = document.createElement('a');
      let href = window.URL.createObjectURL(blob); // 创建下载的链接
      downloadElement.href = href;
      downloadElement.download = '教职工管理.xls'; // 下载后文件名
      document.body.appendChild(downloadElement);
      downloadElement.click(); // 点击下载
      document.body.removeChild(downloadElement); // 下载完成移除元素
      window.URL.revokeObjectURL(href); // 释放掉blob对象
    })
  }

  export function del (ids) {
    return request({
      url: 'api/core/user/batchDelete?ids=' + ids,
      method: 'delete'
    })
  }
