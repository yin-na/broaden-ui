import request from '@/utils/request'

// 查询菜单列表
export function list (params) {
  return request({
    url: 'api/core/menu/list',
    method: 'get',
    params
  })
}
// 构建前台路由
export function buildMenus () {
  return request({
    url: 'api/core/menu/buildMenuRouter',
    method: 'get'
  })
}
// 新增菜单
export function add (data) {
  return request({
    url: 'api/core/menu/create',
    method: 'post',
    data
  })
}
// 删除菜单
export function del (id) {
  return request({
    url: 'api/core/menu/delete/' + id,
    method: 'delete'
  })
}
// 编辑菜单
export function edit (data) {
  return request({
    url: 'api/core/menu/update',
    method: 'put',
    data
  })
}
// 菜单下拉选择列表
export function tree (params) {
  return request({
    url: 'api/core/menu/tree',
    method: 'get',
    params
  })
}
// 获取一个菜单
export function getById (menuId) {
  return request({
    url: 'api/core/menu/getById/' + menuId,
    method: 'get'
  })
}
// 通过角色查询菜单
export function selectMenuByRoleId (roleId) {
  return request({
    url: 'api/core/menu/selectMenuByRoleId/' + roleId,
    method: 'get'
  })
}
