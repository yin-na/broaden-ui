import layout_3 from '../views/layout-3/index.vue'
export const decomRoutes={
    path: '/decom',
    component: layout_3,
    name: 'decom',
    hidden: true,
    children:[
        {
            path: '/homepage',
            name: 'homepage',
            meta: {
              title: '智能减压中心',
              flag: '/homepage',
              show: true
            },
            component: () => import('@/views/RelaxationCenter/counselor/homePage/index')
        },
        {
            path: '/Sleep',
            name: 'Sleep',
            meta: {
              title: '睡眠调整',
              flag: '/Sleep',
              show: true
            },
            component: () => import('@/views/RelaxationCenter/counselor/SleepAdjustment/index')
        },
        {
          path: '/breathing',
          name: 'breathing',
          meta: {
            title: '呼吸训练',
            flag: '/breathing',
            show: true
          },
          component: () => import('@/views/RelaxationCenter/counselor/breathing/index')
        },
        {
          path: '/music',
          name: 'music',
          meta: {
            title: '音乐疗愈',
            flag: '/music',
            show: true
          },
      component: () => import('@/views/RelaxationCenter/counselor/music/index')
        },
        {
          path: '/positive',
          name: 'positive',
          meta: {
            title: '正念冥想',
            flag: '/positive',
            show: true
          },
      component: () => import('@/views/RelaxationCenter/counselor/positive/index')
        },
        {
          path: '/brain',
          name: 'brain',
          meta: {
            title: '大脑按摩',
            flag: '/brain',
            show: true
          },
      component: () => import('@/views/RelaxationCenter/counselor/brain/index')
        },
        {
          path: '/movies',
          name: 'movies',
          meta: {
            title: '影视欣赏',
            flag: '/movies',
            show: true
          },
      component: () => import('@/views/RelaxationCenter/counselor/movies/index')
        },
      //   {
      //     path: '/commandCentre',
      //     name: 'commandCentre',
      //     meta: {
      //       title: '数据指挥中心',
      //       flag: '/commandCentre',
      //       show: true,
      //       exhibit: true
      //     },
      // component: () => import('@/views/commandCentre/index')
      //   },
    ]
} 

export default decomRoutes
