// eslint-disable-next-line camelcase
import layout_1 from '../views/layout-1/index.vue'
export const cloudRoutes = {
  path: '/cloud',
  component: layout_1,
  name: 'cloud',
  hidden: true,
  children: [
    {
      path: '/psyRelax/detail',
      name: 'psyRelaxdetail',
      meta: {
        title: '心身放松详情',
        flag: '/psyRelax',
        show: false,
        exhibit:true
      },
      component: () => import('@/views/src/psyRelax/detail/index')
    },
    // component: () => import('@/views/src/psyRelax/detail/index')
    {
      path: '/CloudDevice',
      name: 'CloudDevice',
      meta: {
        title: '太空舱',
        flag: '/CloudDevice',
        show: true,
        exhibit:true
      },
      component: () => import('@/views/src/CloudDevice/index')
    },
    {
      path: '/zxsCloud',
      name: 'zxsCloud',
      meta: {
        title: '太空舱',
        flag: '/zxsCloud',
        service: true,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsCloudDevice/index')
    },

    {
      path: '/zxsCloud/detail',
      name: '/zxsCloudDetail',
      meta: {
        title: '太空舱详情',
        flag: '/zxsCloud',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsCloudDevice/detail')
    },

    {
      path: '/zxsBrain',
      name: 'zxsBrain',
      meta: {
        title: '脑波认知训练',
        flag: '/zxsBrain',
        service: true,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsBrainWave/index')
    },
    {
      path: '/zxsBrainWave/detail',
      name: 'zxsBrainWave',
      meta: {
        title: '脑波认知训练详情',
        flag: '/zxsBrainWave',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsBrainWave/detail')
    },
    
    {
      path: '/zxsstress',
      name: 'zxsstress',
      meta: {
        title: '心理压力分析仪',
        flag: '/zxsstress',
        service: true,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsstressAnalysis/index')
    },

    {
      path: '/zxsstressAnalysis/detail',
      name: 'zxsstressDetail',
      meta: {
        title: '心理压力分析仪详情',
        flag: '/zxsstress',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsstressAnalysis/detail')
    },

    {
      path: '/BrainWave',
      name: 'BrainWave',
      meta: {
        title: '脑波认知训练',
        flag: '/BrainWave',
        show: true,
        exhibit:true
      },
      component: () => import('@/views/src/BrainWave/index')
    },
    {
      path: '/BrainWave/detail',
      name: '/BrainWaveDetail',
      meta: {
        title: '脑波认知训练详情',
        flag: '/BrainWave',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/BrainWave/detail/index')
    },
    {
      path: '/stressAnalysis',
      name: 'stressAnalysis',
      meta: {
        title: '心理压力分析仪',
        flag: '/stressAnalysis',
        show: true,
        exhibit:true
      },
      component: () => import('@/views/src/stressAnalysis')
    },
    // {
    //   path: '/zxshealth',
    //   name: 'zxshealth',
    //   meta: {
    //     title: '心理健康自助仪',
    //     flag: '/zxshealth',
    //     service: true,
    //     exhibit:true
    //   },
    //   component: () => import('@/views/src/Intellectual/zxshealthHelp/index')
    // },
    // {
    //   path: '/healthHelp',
    //   name: 'healthHelp',
    //   meta: {
    //     title: '心理健康自助仪',
    //     flag: '/healthHelp',
    //     show: true,
    //     exhibit:true
    //   },
    //   component: () => import('@/views/src/healthHelp/index')
    // },
    {
      path: '/BigShouting',
      name: 'BigShouting',
      meta: {
        title: '呐喊宣泄',
        flag: '/BigShouting',
        show: true,
        exhibit:true
      },
      component: () => import('@/views/src/BigShouting/index')
    },
    {
      path: '/zxsShouting',
      name: 'zxsShouting',
      meta: {
        title: '呐喊宣泄',
        flag: '/zxsShouting',
        service: true,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsBigShouting/index')
    },

    {
      path: '/zxsBigShouting/detail',
      name: '/zxsShoutingDetail',
      meta: {
        title: '呐喊宣泄详情',
        flag: '/zxsShouting',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/Intellectual/zxsBigShouting/detail')
    },

    {
      path: '/psyEquip/module/BigshoutingDetail',
      name: '/BigshoutingDetail',
      meta: {
        title: '大屏呐喊详情',
        flag: '/psyEquip',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/psyEquip/module/BigshoutingDetail')
    },
    {
      path: '/psyEquip/module/stressdetail',
      name: '/stressdetail',
      meta: {
        title: '压力分析详情',
        flag: '/psyEquip',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/psyEquip/module/stressdetail')
    },
    {
      path: '/psyEquip/module/toCapsuleDetails',
      name: '/toCapsuleDetails',
      meta: {
        title: '太空舱详情',
        flag: '/psyEquip',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/psyEquip/module/toCapsuleDetails')
    },
    {
      path: '/psyEquip/module/screenShouDetail',
      name: '/screenShouDetail',
      meta: {
        title: '大屏呐喊详情',
        flag: '/psyEquip',
        show: false,
        keepAlive: false,
        exhibit:true
      },
      component: () => import('@/views/src/psyEquip/module/screenShouDetail')
    },
  ]
}

export default cloudRoutes
