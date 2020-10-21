import { loginIn, getInfo, logout, login } from '@/api/base/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

import * as types from '../types.js'
import { resOk } from '@/settings'
import { dynamicModuleDat } from '@/api/index'
import { getOne } from '@/api/base/sysmantaince'
 

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    permissions: [],
    maintain:{
      leadLogo:require('@/assets/logo/login.png'),
      projectName:'社会心理服务网络云平台1',
      loginImage:require('@/assets/login/logo-bg.png'),
      loginLogoOne:require("@/assets/login/banner-1.png"),
      loginLogoTwo:require("@/assets/login/banner-2.png"),
      logo:require("@/assets/management/public/logo.png")
    },
    // 第一次加载菜单时用到
    loadMenus: false,
    dynamicModuleDat: undefined, // 资源分类查询条件
    gotoUrl: 'http://www.xyloa.cn:8080/',
    qq: 'tencent://message/?uin=508804540&Menu=yes& Service=300&sigT=42a1e5347953b64c5ff3980f8a6e644d4b31456cb0b6ac6b27663a3c4dd0f4aa14a543b1716f9d45'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_MAINTAIN: (state,maintain) =>{
      maintain.leadLogo = maintain.leadLogo ? maintain.leadLogo  : [require('@/assets/logo/login.png')];
      maintain.projectName = maintain.projectName ? maintain.projectName : ['社会心理服务网络云平台'];
      maintain.loginImage = maintain.loginImage ? maintain.loginImage : [require('@/assets/login/logo-bg.png')];
      maintain.loginLogoOne = maintain.loginLogoOne ? maintain.loginLogoOne : [require('@/assets/login/banner-1.png')];
      maintain.loginLogoTwo = maintain.loginLogoTwo ? maintain.loginLogoTwo : [require('@/assets/login/banner-2.png')];
      maintain.logo = maintain.logo ? maintain.logo : [require('@/assets/management/public/logo.png')];
      state.maintain = maintain
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_AVATAR: (state, avatar)=>{
      state.user.avatar=avatar
    },
    SET_USERNAME: (state, username) => {
      state.user.username=username
    },
    [types.SET_DYNAMICMODULEDAT]: (state, param) => {
      console.log(param,654)
      param[0] = param[0] ? param[0] : [require('@/assets/logo/logo-small.png')];
      param[1] = param[1] ? param[1] : ['心理健康融平台生态服务系统 '];
      param[2] = param[2] ? param[2] : ['济南市文明办  济南市未成年人成长指导中心'];
      param[3] = param[3] ? param[3] : [require('@/assets/footer/ewm.png')];
      param[4] = param[4] ? param[4] : [require('@/assets/list/news_top.png')];
      param[5] = param[5] ? param[5] : [require('@/assets/list/news_top.png')];
      param[6] = param[6] ? param[6] : [require('@/assets/list/xinlijiangtang.png')];
      param[7] = param[7] ? param[7] : [require('@/assets/list/kepu.png')];
      param[8] = param[8] ? param[8] : [require('@/assets/list/kepu.png')];
      param[9] = param[9] ? param[9] : [require('@/assets/list/kepu.png')];
      param[10] = param[10] ? param[10] : [require('@/assets/list/kepu.png')];
      param[11] = param[11] ? param[11] : [require('@/assets/list/jiatingzhinan.png')];
      param[12] = param[12] ? param[12] : [require('@/assets/list/quweiceshi.png')];
      param[13] = param[13] ? param[13] : [require('@/assets/list/xinzhixunlian.png')];
      param[14] = param[14] ? param[14] : ['400-998-0708'];
      param[15] = param[15] ? param[15] : ['Copyright©2015-2019 山东心悦灵科贸有限公司', '技术支持：心悦灵 技术支持电话：0531-67878238 鲁ICP备12011523号'];

      state.dynamicModuleDat = param
  }
  },

  actions: {
    // 登录
    Logins ({ commit }, userInfo) {
      const loginName = userInfo.loginName
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        login(loginName, password)
          .then(res => {
            setToken(res.data.token)
            commit('SET_TOKEN', res.data.token)
            getInfo()
              .then(res => {
                setUserInfo(res.data, commit)
                resolve(res)
              })
              .catch(error => {
                reject(error)
              })
            commit('SET_LOAD_MENUS', true)
            // resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //网站维护
    setStatemaintain({ commit }) {
    return new Promise((resolve, reject) => {
      getOne().then((res) => {
          commit("SET_MAINTAIN",res.data)
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
    },
    setDynamicModuleDat({ commit }) {
      return new Promise(function(resolve, rej) {
          dynamicModuleDat().then((res) => {
              let data = res.data;
              if (res.code == resOk) {
                  let list = data
                  commit(types.SET_DYNAMICMODULEDAT, list)
                  resolve(list)
              }
          }).catch((e)=>{
              commit(types.SET_DYNAMICMODULEDAT, {})
              rej(e)
          })
      })
  },
    Login ({ commit }, userInfo) {
      const loginName = userInfo.loginName
      const password = userInfo.password
      const code = userInfo.code
      return new Promise((resolve, reject) => {
        login(loginName, password,code)
          .then(res => {
            setToken(res.data.token)
            commit('SET_TOKEN', res.data.token)
            getInfo()
              .then(res => {
                setUserInfo(res.data, commit)
                resolve(res)
              })
              .catch(error => {
                reject(error)
              })
            // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
            commit('SET_LOAD_MENUS', true)
            // resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    binding ({ commit }, token) {
      return new Promise((resolve, reject) => {
        setToken(token)
        commit('SET_TOKEN', token)
        getInfo()
          .then(res => {
            setUserInfo(res.data, commit)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
        commit('SET_LOAD_MENUS', true)
        // resolve()
      })
    },
    // 更新用户名和密码
    resetAvatarAndUserName({ commit }, data) {
      commit('SET_AVATAR', data.avatar)
      commit('SET_USERNAME', data.username)
    },
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            setUserInfo(res.data, commit)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_PERMISSIONS', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    updateLoadMenus ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    }
  }
}

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', res.roles)
  }
  commit('SET_PERMISSIONS', res.permissions)
  commit('SET_USER', res.user)
}

// export default{
//   namespaced: true,
//   user
// } 

export default user
 