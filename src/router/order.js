
import layout_4 from '../views/layout-4/index.vue'
export const orderRouterList = {
  path: '/order',
  component: layout_4,
  name: 'order',
  hidden: true,
  children: [
    {
      path: '/orderhome',
      name: 'orderhome',
      meta: {
        title: '心理咨询中心首页',
        flag: '/orderhome',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/index')
    },
    {
      path: '/askingCenter',
      name: 'askingCenter',
      meta: {
        title: '心理咨询中心',
        flag: '/askingCenter',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/askingCenter/index')
    },
    {
      path: '/teacherInfo',
      name: 'teacherInfo',
      meta: {
        title: '咨询师个人资料',
        flag: '/teacherInfo',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/askingCenter/infoDetail')
    },
    {
      path: '/shapan',
      name: 'shapan',
      meta: {
        title: '沙盘体验',
        flag: '/shapan',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/askingCenter/shapan/index')
    },
    {
      path: '/counseling',
      name: 'shcounselingapan',
      meta: {
        title: '咨询预约',
        flag: '/counseling',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/askingCenter/counseling/index')
    },
    {
      path: '/addRecord',
      name: 'addRecord',
      meta: {
        title: '沙盘记录',
        flag: '/addRecord',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/askingCenter/shapan/addrecord')
    },
    {
      path: '/RecordDetails',
      name: 'RecordDetails',
      meta: {
        title: '咨询记录详情',
        flag: '/RecordDetails',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/askingCenter/counseling/RecordDetails')
    },
    {
      path: '/lineTalk',
      name: 'lineTalk',
      meta: {
        title: '预约咨询',
        flag: '/lineTalk',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/subscribe/lineTalk/index')
    },
    {
      path: '/Booking',
      name: 'Booking',
      meta: {
        title: '咨询申请',
        flag: '/Booking',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/subscribe/Booking/index')
    },
    {
      path: '/consult',
      name: 'consult',
      meta: {
        title: '咨询师介绍',
        flag: '/consult',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/subscribe/consultants/index')
    },
    {
      path: '/PourOut',
      name: 'PourOut',
      meta: {
        title: '心理倾诉',
        flag: '/PourOut',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/PourOut/index')
    },
    {
      path: '/PourList',
      name: 'PourList',
      meta: {
        title: '放飞历史',
        flag: '/PourList',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/PourOut/pourList/index')
    },
    {
      path: '/sandplay',
      name: 'sandplay',
      meta: {
        title: '沙盘游戏首页',
        flag: '/sandplay',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/sandplay/sandplay')
    },
    {
      path: '/psyQuiz',
      name: 'psyQuiz',
      meta: {
        title: '心理问答',
        flag: '/psyQuiz',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/psyQuiz/psyQuiz')
    },
    {
      path: '/Paintingheal',
      name: 'Paintingheal',
      meta: {
        title: '绘画疗愈',
        flag: '/Paintingheal',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/Paintingheal/index')
    },
    {
      path: '/Paintingheal/center',
      name: '/Paintingheal/center',
      meta: {
        title: '作品中心',
        flag: '//Paintingheal/center',
        show: true,
      },
      component: () => import('@/views/Consultation/Paintingheal/worksCenter')
    },
    {
      path: '/problem',
      name: 'problem',
      meta: {
        title: '我的问答',
        flag: '/problem',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/psyQuiz/problem')
    },
    {
      path: '/psyQuiz/question',
      name: 'matterquestion',
      meta: {
        title: '我的提问',
        flag: '/question',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/psyQuiz/question')
    },
    {
      path: '/matterpage',
      name: 'matterpage',
      meta: {
        title: '问题页',
        flag: '/matterpage',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/psyQuiz/matter')
    },
    {
      path: '/introduce',
      name: 'introduce',
      meta: {
        title: '沙盘机构介绍',
        flag: '/introduce',
        show: true,
        exhibit: true
      },
      component: () => import('@/views/Consultation/sandplay/introduce')
    }
  ]
}

export default orderRouterList
