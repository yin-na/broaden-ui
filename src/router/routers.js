import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'
import layout_6 from '../views/layout-6/index.vue' // 未登录模块导航
import LayoutArch from '@/views/layoutarchs/Layout'
// eslint-disable-next-line camelcase
import { constantRoutes } from './portalSite' // 门口网站
import { cloudRoutes } from './cloudrouter' // 咨询师 or 来访者端
import { decomRoutes } from './decompression' // 智能减压 咨询师 or 来访者端
import { psychological } from './psychological' // 心理体检中心 来访者端
import { orderRouterList } from './order' // 心理咨询
import { inquiryRouter } from './CounsellingRoom' // 咨询室
import { InteRoutes } from './wjIntervention' // 危机干预
import { volunteer } from './volunteerInfo' // 志愿者信息库
import { psyResource } from './psyResource' // 心理资源库（Ai心理学院）
import { cultivate } from './cultivate'
import { chart } from './bigEcharts' // 大屏编辑模块
import { launch } from './launch' // 大屏发起接收模块
// import { bigRouterList } from './bigEcharts' // 大屏编辑模块

Vue.use(Router)

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  }, {
    path: '/commandCentre', // 数据统计
    // component: () => import('@/views/commandCentre/homeCharts'),
    component: () => import('@/views/commandCentre/indexChart'), // 新改自适应分辨率
    // component: () => import('@/views/mydata/mydata/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/viewchart',
    component: () => import('@/views/Viewer/Canvas.vue'),
    redirect: 'viewscreen',
    hidden:true,
    children: [
      {
        path: '/viewscreen/:id',
        component: () => import('@/views/Viewer/Canvas.vue'),
        name: '大屏',
        meta: { title: '大屏', icon: 'index', keepAlive: false, affix: false }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/log', // 登陆模块
    component: layout_6,
    name: 'log',
    hidden: true,
    children: [
      {
        path: '/login/Service',
        name: 'Service',
        hidden: false,
        meta: {
          title: '服务中心',
          flag: '/Service',
          keepAlive: false,
          show: true
        },
        component: () => import('@/views/login/Service/index')
      },
      {
        path: '/login/product',
        name: 'product',
        hidden: false,
        meta: {
          title: '产品功能',
          flag: '/product',
          keepAlive: false,
          show: true
        },
        component: () => import('@/views/login/product/index')
      },
      {
        path: '/login/PsyProgramme',
        name: 'PsyProgramme',
        hidden: false,
        meta: {
          title: '心理方案',
          flag: '/PsyProgramme',
          keepAlive: false,
          show: true
        },
        component: () => import('@/views/login/PsyProgramme/index')
      },
      // {
      //   path: '/login/contactUs',
      //   name: 'contactUs',
      //   hidden: false,
      //   meta: {
      //     title: '联系我们',
      //     flag: '/contactUs',
      //     keepAlive: false,
      //     show: true
      //   },
      //   component: () => import('@/views/login/contactUs/index')
      // },
      {
        path: '/login',
        name: 'login',
        hidden: false,
        meta: {
          title: '登录',
          flag: '/Home',
          keepAlive: false,
          show: true
        },
        component: () => import('@/views/login/index')
      }
    ]
  },
  {
    path:'/mobileTerminal',
    name: 'mobileTerminal',
    hidden:true,
    meta: {
      title: '移动服务',
      keepAlive: false,
      show: false
    },
    component: () => import('@/views/mobileTerminal/index')
  },
  {
    path: '/psyServe',
    name: 'psyServe',
    hidden:true,
    meta: {
      title: '心服务',
      flag: '/psyServe',
      show: true
    },
    component: () => import('@/views/src/psyServe/index')
  },{
    path:'/psyServe/detail',
    name: 'detail',
    hidden:true,
    meta:{
      title: '心服务详情',
      flag: '/psyServe',
      show: false
    },
    component:() => import('@/views/src/psyServe/detail')

  },
  {
    path: '/',
    name: 'index',
    hidden:true,
    meta: {
      title: '首页',
      keepAlive: false,
      show: false
    },
    component: () => import('@/views/index/index')
  },
  {
    path: '/enjoyment',
    name: 'enjoyment',
    hidden:true,
    meta: {
      title: '智享物联',
      keepAlive: false,
      show: false
    },
    component: () => import('@/views/enjoyment/index')
  },
  {
    path: '/EnjoyInternet',
    name: 'EnjoyInternet',
    hidden:true,
    meta: {
      title: '智享物联',
      keepAlive: false,
      show: false
    },
    component: () => import('@/views/EnjoyInternet/index')
  },
  {
    path: '/back',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/sysmaintenance/index'),
        name: '首页',
        meta: { title: '首页', icon: 'index-name', keepAlive: false, affix: true }
      }
    ]
  },
  {
    path: '/arch',
    component: LayoutArch,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: '档案中心',
        meta: { title: '档案中心', icon: 'index-name', keepAlive: false,affix: true  }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/system/user/center'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user', keepAlive: false },
        requiredAuth: false
      }
    ]
  }, {
    path: '/post',
    component: Layout,
    hidden: true,
    children: [{
      path: 'postForm',
      component: () => import('@/views/system/post/module/form'),
      name: 'PostForm',
      meta: { title: '岗位', keepAlive: false }
    }]}, {
    path: '/scaleViewDetails',
    component: Layout,
    hidden: true,
    children: [{
      path: '/scaleViewDetails',
      name: 'scaleViewDetails',
      component: () => import('@/views/scale/scale/modul/scaleViewDetails'),
      meta: { title: '量表详情信息', keepAlive: false }
    }]},
  {
    path: '/reportDetail',
    component: Layout,
    hidden: true,
    children: [{
      path: '/reportDetail',
      name: 'reportDetailBack',
      component: () => import('@/views/testRecord/model/reportDetail'),
      meta: { title: '报告详情', keepAlive: false }
    }]},
  {
    path: '/reportDetail1',
    component: Layout,
    hidden: true,
    children: [{
      path: '/reportDetail1',
      name: 'reportDetail1Back',
      component: () => import('@/views/testRecord/model/reportDetail-1'),
      meta: { title: '报告详情', keepAlive: false }
    }]},
    // {
    //   path: '/student',
    //   component: Layout,
    //   hidden: false,
    //   children: [{
    //     path: '/detail',
    //     name: 'detailstudent',
    //     component: () => import('@/views/system/student/index'),
    //     meta: { title: 'yonghu', keepAlive: false,icon: "user"}
    //   }]},
]

constantRouterMap.push(constantRoutes) // 心理网站平台
constantRouterMap.push(cloudRoutes) // 智享物联中心
constantRouterMap.push(decomRoutes) // 智能减压中心
constantRouterMap.push(psychological) // 心理体检中心
constantRouterMap.push(orderRouterList) // 心理咨询中心
constantRouterMap.push(InteRoutes) // 危机干预
constantRouterMap.push(inquiryRouter) // 咨询室管理
constantRouterMap.push(volunteer) // 志愿者信息库
constantRouterMap.push(psyResource) // 心理资源库（Ai心理学院）
constantRouterMap.push(cultivate)      //心理培训
constantRouterMap.push(chart)      //心理培训
constantRouterMap.push(launch)     //大屏发起接收
// constantRouterMap.push(bigRouterList) // 大屏编辑模块
// console.log(constantRouterMap,'jjjj')
export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: constantRouterMap
})
