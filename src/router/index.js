import router from './routers'
import store from '@/store'
import Config from '@/config'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // getToken form cookie
import {
  buildMenus
} from '@/api/base/menu'
import {
  filterAsyncRouter
} from '@/store/modules/permission'
import { cloudRoutes } from './cloudrouter'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// 登陆白名单
const whiteList = ['/login/Service', '/login/product', '/login/PsyProgramme', '/login/contactUs', '/login'] // no redirect whitelist
// 首页路由白名单
// const whiteList = list.concat(cloudRoutes.children.map(item => item.path))

router.beforeEach((to, from, next) => {
  store.dispatch('setStatemaintain')
  const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  if (to.meta.title) {
    if (flag) {
      document.title = to.meta.title
    } else {
      document.title = Config.webName
    }
  }
  NProgress.start() // start progress bar
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
        // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => {})
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res.data)
    asyncRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      // console.log(asyncRouter,'后台路由')
      next({
        ...to,
        replace: true
      }) // hack方法 确保addRoutes已完成
    })
  })
}
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
