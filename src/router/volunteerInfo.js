// eslint-disable-next-line camelcase
import layout_8 from '../views/layout-8/index.vue'
export const volunteer = {
    path: '/volunteer',
    component: layout_8,
    name: 'volunteer',
    hidden: true,
    children: [
        {
            path: '/volunteer/mechanism',
            name: 'mechanism',
            meta: {
                title: '心理机构',
                flag: '/volunteer/mechanism',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/volunteer/mechanism/index')
        },
        {
            path: '/volunteer/Consultant',
            name: '/volunteer/Consultant',
            meta: {
                title: '心理咨询师',
                flag: '/volunteer/Consultant',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/volunteer/Consultant/index')
        },
        {
            path: '/volunteer/info',
            name: '/volunteer/info',
            meta: {
                title: '相关资讯',
                flag: '/volunteer/info',
                show: false,
                exhibit: true
            },
            component: () => import('@/views/volunteer/info/index')
        },
        {
            path: '/mechanism/newActive',
            name: '/mechanism/newActive',
            meta: {
                title: '新建机构',
                flag: '/mechanism/newActive',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/volunteer/mechanism/newActive')
        },
        {
            path: '/mechanism/seekActive',
            name: '/mechanism/seekActive',
            meta: {
                title: '机构列表查看',
                flag: '/mechanism/seekActive',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/volunteer/mechanism/seekActive')
        },
        {
            path: '/Consultant/newActive',
            name: '/Consultant/newActive',
            meta: {
                title: '新建心理咨询师',
                flag: '/Consultant/newActive',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/volunteer/Consultant/newActive')
        },
        {
            path: '/Consultant/seekActive',
            name: '/Consultant/seekActive',
            meta: {
                title: '心理咨询师列表查看',
                flag: '/Consultant/seekActive',
                show: false,
                exhibit: false
            },
            component: () => import('@/views/volunteer/Consultant/seekActive')
        },
        {
            path: '/info/newActive',
            name: '/info/newActive',
            meta: {
                title: '相关咨询新建',
                flag: '/info/newActive',
                exhibit: false
            },
            component: () => import('@/views/volunteer/info/newActive/newActive')
        },
        {
            path: '/info/newActive/seekActive',
            name: '/info/newActive/seekActive',
            meta: {
                title: '相关资讯查看',
                flag: '/info/newActive/seekActive',
                exhibit: false
            },
            component: () => import('@/views/volunteer/info/newActive/seekActive')
        },
        {
            path: '/info/drafts/index',
            name: '/info/drafts/index',
            meta: {
                title: '相关咨询草稿箱列表',
                flag: '/info/drafts/index',
                exhibit: false
            },
            component: () => import('@/views/volunteer/info/drafts/index')
        },
        {
            path: '/info/drafts/seekActive',
            name: '/info/drafts/seekActive',
            meta: {
                title: '相关咨询草稿箱查看',
                flag: '/info/drafts/seekActive',
                exhibit: false
            },
            component: () => import('@/views/volunteer/info/drafts/seekActive')
        },
        {
            path: '/info/drafts/newActive',
            name: '/info/drafts/newActive',
            meta: {
                title: '相关咨询草稿箱新建',
                flag: '/info/drafts/newActive',
                exhibit: false
            },
            component: () => import('@/views/volunteer/info/drafts/newActive')
        },
    ]
}

export default volunteer
