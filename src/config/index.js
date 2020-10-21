/**
 * @description 系统全局配置
 */
export default {
  webName: '美商拓客',
  /**
   * 是否显示设置的悬浮按钮
   */
  settingBtn: false,
  // 打包时无需配置
  baseUrl: {
    dev: 'http://127.0.0.1:9525',// 开发
  },

  /**
   *
   *  websocketApi
   */
  websocketApi: 'ws://58.56.25.18:955/websocket/',
  /**
   * @description 是否只保持一个子菜单的展开
   */
  uniqueOpened: true,
  /**
   * @description token key
   */
  TokenKey: 'SPUR-ADMIN-TOEKN',

  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 1,
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 1200000,

  /**
   * @description 是否显示 tagsView
   */
  tagsView: true,

  /**
   * @description 固定头部
   */
  fixedHeader: false,

  /**
   * @description 是否显示logo
   */
  sidebarLogo: true
}
