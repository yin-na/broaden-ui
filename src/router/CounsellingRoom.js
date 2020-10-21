import layout_4 from '../views/layout-4/index.vue'
export const inquiryRouter={
    path: '/decoms',
    component: layout_4,
    name: 'decoms',
    hidden: true,
    children:[
        {
            path: '/inquiryRoom',
            name: 'inquiryRoom',
            meta: {
              title: '咨询室管理中心',
              flag: '/inquiryRoom',
              show: true
            },
            component: () => import('@/views/inquiryRoom/index')
        },
        {
            path: '/registration',
            name: 'registration',
            meta: {
              title: '来访登记',
              flag: '/registration',
              show: true
            },
            component: () => import('@/views/inquiryRoom/registration/index')
        },
        {
          path: '/viewExamine',
          name: 'viewExamine',
          meta: {
            title: '来访登记查看',
            flag: '/viewExamine',
            show: true
          },
          component: () => import('@/views/inquiryRoom/viewExamine/index')
      },
        {
          path: '/addnewVisit',
          name: 'addnewVisit',
          meta: {
            title: '新建来访',
            flag: '/addnewVisit',
            show: true
          },
          component: () => import('@/views/inquiryRoom/addnewVisit/index')
      },
      {
        path: '/psyArchives',
        name: 'psyArchives',
        meta: {
          title: '个人中心',
          flag: '/psyArchives',
          show: true
        },
        component: () => import('@/views/src/psyArchives/index')
      },
      {
        path: '/personcenter',
        name: 'personcenter',
        meta: {
          title: '修改密码',
          flag: '/personcenter',
          show: true
        },
        component: () => import('@/views/src/personcenter/index')
      },
      {
        path: '/functionRoom',
        name: 'functionRoom',
        meta: {
          title: '功能室管理',
          flag: '/functionRoom',
          show: true
        },
        component: () => import('@/views/inquiryRoom/functionRoom/index')
    },
    ]
}
export default inquiryRouter