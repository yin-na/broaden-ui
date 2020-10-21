// eslint-disable-next-line camelcase
import layout_5 from '../views/layout-5/index.vue'
export const InteRoutes = {
  path: '/wjInter',
  component: layout_5,
  name: 'wjInter',
  hidden: true,
  children: [
    {
      path: '/wjIntervention/guidance',
      name: 'guidance',
      meta: {
        title: '干预指导中心',
        flag: '/wjIntervention/guidance',
        show: false,
        exhibit: true
      },
      component: () => import('@/views/wjIntervention/guidance/index')
    },
    {
      path: '/wjIntervention/Hotline',
      name: 'Hotline',
      meta: {
        title: '危机干预热线',
        flag: '/wjIntervention/Hotline',
        show: false,
        exhibit: true
      },
      component: () => import('@/views/wjIntervention/Hotline/index')
    },
    {
      path: '/wjIntervention/programme',
      name: 'programme',
      meta: {
        title: '危机干预方案',
        flag: '/wjIntervention/programme',
        show: false,
        exhibit: true
      },
      component: () => import('@/views/wjIntervention/programme/index')
    },    
    {
      path: '/wjIntervention/programme/detail/:id',
      name: 'programdetail',
      meta: {
        title: '干预方案详情',
        flag: '/wjIntervention/programme',
        show: false,
        exhibit: false
      },
      component: () => import('@/views/wjIntervention/programme/detail/index')
    },
    {
      path: '/wjIntervention/IntVideo',
      name: 'IntVideo',
      meta: {
        title: '危机干预视频',
        flag: '/wjIntervention/IntVideo',
        show: false,
        exhibit: true
      },
      component: () => import('@/views/wjIntervention/IntVideo/index')
    }
  ]
}

export default InteRoutes
