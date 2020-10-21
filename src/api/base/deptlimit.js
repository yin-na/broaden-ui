/**  20200915 角色机构数量限制   */
import request from '@/utils/request'

// 查询机构列表  
export function listPage(data) {
    return request({
      url: '/sysOrg/sys-org-creation/listPage',
      method: 'post',
      data
    })
  }
  // 机构类型下拉
  export function roleList(type) {
    return request({
      url: '/sysOrg/sys-org-creation/roleList',
      method: 'get',
    })
  }
  // 添加机构
  export function saveLimit(data) {
    return request({
      url: '/sysOrg/sys-org-creation/saveStaff',
      method: 'post',
      data
    })
}


// 添加机构
export function getDeptSize() {
  return request({
    url: '/sysOrg/sys-org-creation/roleBoolean',
    method: 'post',
  })
}


  
  
