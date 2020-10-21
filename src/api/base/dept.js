import request from '@/utils/request'

export function list (params) {
  return request({
    url: 'api/core/dept/list',
    method: 'get',
    params
  })
}
export function tree (params) {
  return request({
    url: 'api/core/dept/tree',
    method: 'get',
    params
  })
}
export function add (data) {
  return request({
    url: 'api/core/dept/create',
    method: 'post',
    data
  })
}

export function del (id) {
  return request({
    url: 'api/core/dept/delete/' + id,
    method: 'delete'
  })
}

export function edit (data) {
  return request({
    url: 'api/core/dept/update',
    method: 'put',
    data
  })
}

export function getById (id) {
  return request({
    url: 'api/core/dept/getById/' + id,
    method: 'get'
  })
}

export function setVisitor (id) {
  return request({
    url: 'api/core/dept/setVisitorFlag/' + id,
    method: 'post'
  })
}


export function getDeptLevels (data) {
  return request({
    url: 'api/core/dept/getDeptLevels/',
    method: 'post',
    data
  })
}

export function getDeptLevelById (id) {
  return request({
    url: 'api/core/dept/getDeptLevelById/'+id,
    method: 'get',
  })
}


export function saveOrUpdateDeptLevel (data) {
  return request({
    url: 'api/core/dept/saveOrUpdateDeptLevel',
    method: 'post',
    data
  })
}

export function deleteDeptLevel (data) {
  return request({
    url: 'api/core/dept/deleteDeptLevel',
    method: 'post',
    data
  })
}

export function getDeptTypeByRoleCode () {
  return request({
    url: 'api/core/dept/getDeptTypeByRoleCode',
    method: 'get'
  })
}

/**  20200824 机构管理   */

// 查询机构列表  
export function getDeptList(data) {
  return request({
    url: 'api/core/dept/getDeptList',
    method: 'post',
    data
  })
}
// 机构类型下拉
export function getDeptLevelsNew(type) {
  return request({
    url: 'api/core/dept/getDeptLevelsNew?type='+type,
    method: 'get',
  })
}
// 添加机构
export function createDept(data) {
  return request({
    url: 'api/core/dept/createDept',
    method: 'post',
    data
  })
}
// 查询医院列表

export function getAreaHospitalList() {
  return request({
    url: 'api/core/dept/getAreaHospitalList',
    method: 'get'
  })
}

