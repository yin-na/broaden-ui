import layout_10 from '../views/layout-10/index.vue'
export const cultivate = {
    path: '/cultivate',
    component: layout_10,
    name: 'cultivate',
    hidden: true,
    children:[
        {
            path: '/cultivate/index',
            name: 'cultivate',
            meta: {
                title: '心理培训首页',
                flag: '/cultivate/index',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/cultivate/index')
        },
        {
            path: '/cultivate/courseCenter',
            name: 'cultivate/courseCenter',
            meta: {
                title: '课程中心',
                flag: '/cultivate/courseCenter',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/cultivate/courseCenter/index')
        },
        {
            path: '/cultivate/schoolNews',
            name: 'cultivate/schoolNews',
            meta: {
                title: '学院资讯',
                flag: '/cultivate/schoolNews',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/cultivate/schoolNews/index')
        },
        {
            path: '/schoolNews/articleDetail',
            name: 'schoolNews/articleDetail',
            meta: {
                title: '文章详情',
                flag: '/schoolNews/articleDetail',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/cultivate/schoolNews/articleDetail')
        },
        {
            path: '/cultivate/specialIntroduce',
            name: 'cultivate/specialIntroduce',
            meta: {
                title: '专题介绍',
                flag: '/cultivate/specialIntroduce',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/cultivate/specialIntroduce/index')
        },
        {
            path: '/cultivate/aboutUs',
            name: 'cultivate/aboutUs',
            meta: {
                title: '关于我们',
                flag: '/cultivate/aboutUs',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/cultivate/aboutUs/index')
        },
        {
            path: '/cultivate/classxqing',
            name: 'cultivate/classxqing',
            meta: {
                title: '课程详情',
                flag: '/cultivate/classxqing',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/cultivate/courseCenter/compent/classxqing')
        },
        {
            path: '/cultivate/videoPlay',
            name: 'cultivate/videoPlay',
            meta: {
                title: '视频播放',
                flag: '/cultivate/videoPlay',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/cultivate/courseCenter/compent/videoPlay')
        }
    ]
}