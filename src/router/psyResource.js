
import layout_9 from '../views/layout-9/index.vue'
export const psyResource = {
    path: '/order',
    component: layout_9,
    name: 'order',
    hidden: true,
    children: [
        {
            path: '/psyResource/home',
            name: '/psyResource/home',
            meta: {
                title: '心理资源库',
                flag: '/psyResource/home',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psyResource/home/index')
        },
        {
            path: '/psyResource/teaching',
            name: '/psyResource/teaching',
            meta: {
                title: '心理教辅',
                flag: '/psyResource/teaching',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psyResource/teaching/index')
        },
        {
            path: '/psyResource/Career',
            name: '/psyResource/Career',
            meta: {
                title: '生涯教育',
                flag: '/psyResource/Career',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psyResource/Career/index')
        },
        {
            path: '/psyResource/sandplay',
            name: '/psyResource/sandplay',
            meta: {
                title: '沙盘游戏',
                flag: '/psyResource/sandplay',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psyResource/sandplay/index')
        },
        {
            path: '/psyResource/groupActivity',
            name: '/psyResource/groupActivity',
            meta: {
                title: '团体活动',
                flag: '/psyResource/groupActivity',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psyResource/groupActivity/index')
        },
        {
            path: '/psyResource/cases',
            name: '/psyResource/cases',
            meta: {
                title: '个体案例',
                flag: '/psyResource/cases',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psyResource/cases/index')
        }
    ]
}

export default psyResource
