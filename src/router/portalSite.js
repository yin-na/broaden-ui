import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
Vue.use(Router)

// hot是不是展示推荐
import layout_2 from '../views/layout-2/index.vue'
export const constantRoutes = {
    path: '/web',
    component: layout_2,
    name: 'web',
    hidden: true,
    children:[
        {
            path: '/home',
            name: 'Home',
            meta: {
              title: '首页',
              flag: '/Home',
              show: true
            },
            component: () => import('@/views/srcs/home/index')
          },
        {
            path: '/news',
            name: 'New',
            meta: {
                title: '中心新闻',
                flag:'/news',
                id: 4,
            },
            component:() => import('@/views/srcs/news/index')
        },
        {
            path: '/news/:id',
            name: 'NewDetial',
            meta: {
                title: '中心新闻详情',
                flag:'/news',
                id: 4,
            },
            hidden:true,
            component:() => import('@/views/srcs/news/index')
        },
        {
            path: '/announcement',
            name: 'announcement',
            meta: {
                title: '通知公告',
                flag:'/announcement',
                id: 5,
            },
            component:() => import('@/views/srcs/announcement/index'),
    
        },
        {
            path: '/announcement/:id',
            name: 'announcementDetial',
            meta: {
                title: '通知公告',
                flag:'/announcement',
                id: 5,
            },
            hidden:true,
            component:() => import('@/views/srcs/announcement/index'),
        },
        {
            path: '/PsyClass',
            name: 'PsyClass',
            meta: {
                title: '心理讲堂',
                flag:'/PsyClass',
                id: 6,
            },
            component:() => import('@/views/srcs/PsyClass/index'),
        },
        {
            path: '/PsyClass/detial/:id',
            name: 'detial',
            meta: {
                title: '心理讲堂视频',
                flag:'/PsyClass',
                id: 6,
            },
            component:() => import('@/views/srcs/PsyClass/videoDetial/index'),
            hidden:true,
        },
        {
            path: '/PsyClass/classList/:kind/:type',
            name: 'classList',
            meta: {
                title: '心理讲堂列表',
                flag:'/PsyClass',
                id: 6,
            },
            component:() => import('@/views/srcs/PsyClass/classList/index'),
            hidden:true,
        },
        {
            path: '/psychological/:id',
            name: 'Psychological',
            meta: {
                title: '心理科普',
                flag:'/psychological'
            },
            component:() => import('@/views/srcs/psychological/index'),
            redirect: '/psychological/0',
            children: [
                {
                    path: '/psychological/0',
                    name: 'Psychological0',
                    meta: {
                        title: '心理文章',
                        flag:'/psychological/0',
                        id: 7,
                    },
                    component:() => import('@/views/srcs/psychological/detial'),
                },
                {
                    path: '/psychological/1',
                    name: 'Psychological1',
                    meta: {
                        title: '音乐放松',
                        flag:'/psychological/1',
                        id: 8,
                    },
                    component:() => import('@/views/srcs/psychological/detial'),
                },
                {
                    path: '/psychological/2',
                    name: 'Psychological2',
                    meta: {
                        title: '心理视频',
                        flag:'/psychological/2',
                        id: 9,
                    },
                    component:() => import('@/views/srcs/psychological/detial'),
                },
                {
                    path: '/psychological/3',
                    name: 'Psychological3',
                    meta: {
                        title: '心理图片',
                        flag:'/psychological/3',
                        id: 10,
                    },
                    component:() => import('@/views/srcs/psychological/detial'),
                }
            ]
        },
        // 心理科普详情页
        {
            path: '/psychological/detial/:typeNum/:id?',
            name: 'PsychologicalDetial',
            meta: {
                title: '心理科普',
                flag:'/psychological',
                id: 7,
            },
            component:() => import('@/views/srcs/psychological/detial/index'),
            hidden: true
        },
        {
            path: '/family',
            name: 'family',
            meta: {
                title: '家庭指南',
                flag:'/family',
                id: 11,
            },
            component:() => import('@/views/srcs/family/index'),
        },
        {
            path: '/family/:id',
            name: 'familyDetial',
            meta: {
                title: '家庭指南详情',
                flag:'/family',
                id: 11
            },
            component:() => import('@/views/srcs/family/detial'),
            hidden:true,
        },
        {
            path: '/tasteTest',
            name: 'TasteTest',
            meta: {
                title: '趣味测试',
                flag:'/tasteTest',
                id: 12
            },
            component:() => import('@/views/srcs/tasteTest/index'),
        },
        // {
        //     path: '/tasteTest/:id/:type',
        //     name: 'TestStart',
        //     meta: {
        //         title: '开始测试',
        //         flag:'/tasteTest',
        //         id: 12
        //     },
        //     hidden:true,
        //     component:() => import('@/src/tasteTest/startTest'),
        // },
        // 趣味测试测试详情
        {
            path: '/tasteTest/:id',
            name: 'TestDetial',
            meta: {
                title: '测试详情',
                flag:'/tasteTest',
                id: 12
            },
            component:() => import('@/views/srcs/tasteTest/testDetial'),
            hidden:true,
        },
        {
            path: '/majorCeshi',
            name: 'MajorCeshi',
            meta: {
                title: '热线援助',
                flag:'/majorCeshi',
               
            },
            isPhone:true
        },
        {
            path: '/mentalTraining',
            name: 'MentalTraining',
            meta: {
                title: '心智训练',
                flag:'/mentalTraining',
                id: 13
            },
            component:() => import('@/views/srcs/mentalTraining/index'),
        },
        // 心智训练详情页
        {
            path: '/mentalTraining/detial/:id',
            name: 'MentalTrainingDet',
            meta: {
                title: '心智训练',
                flag:'/mentalTraining',
                id: 13
            },
            component:() => import('@/views/srcs/mentalTraining/detial'),
            hidden:true,
        },
        {
            path: '/phone',
            name: 'Phone',
            meta: {
                title: '手机端',
                flag:'/phone',
                id: 3
            },
            isLook: true,
        },
        {
            path: '/question',
            name: 'Question',
            meta: {
                title: '远程协助',
                flag:'/question'
            },
            isHref: true,
            href: ''
        },
    ],
    
    
}

// const createRouter = () => new Router({
//     mode: 'history', // require service support
//     routes: constantRoutes,
//     scrollBehavior: () => ({ y: 0 }),
// })

// const router = createRouter()

export default constantRoutes
