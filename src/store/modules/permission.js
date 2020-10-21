import { constantRouterMap } from '@/router/routers'
import Layout from '@/views/layout/Layout'
import LayoutArchs from '@/views/layoutarchs/Layout'
const permission = {
  state: {
    routers: constantRouterMap,
    archrouters:[],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers).filter(r=>r.component!=LayoutArchs)
      state.archrouters= constantRouterMap.concat(routers).filter(r=>r.component==LayoutArchs)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, asyncRouter) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', asyncRouter)
        resolve(asyncRouter)
      })
    }
  }
}

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.filter(router => {
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else if (router.component === 'LayoutArchs') {
        router.component = LayoutArchs
      }
      else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
  return accessedRouters
}

export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default permission
