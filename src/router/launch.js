import layout2 from "../views/layoutBig-2/Layout.vue";

export const launch = {
    path: '/launch',
    component: layout2,
    name: 'launch',
    hidden: true,
    redirect: "/launch/Receiver",
    children: [
        {
            path: '/launch/Receiver',
            name: '/launch/Receiver',
            hidden: false,
            meta: {
                title: '接收方',
                flag: '/launch/Receiver',
                hidden: false,
                icon: "edit"
            },
            component: () => import('@/views/launch/Receiver/index')
        },
        {
            path: '/Receiver/detail',
            name: '/Receiver/detail',
            hidden: true,
            meta: {
                title: '接收方详情',
                flag: '/Receiver/detail',
                hidden: true,
            },
            component: () => import('@/views/launch/Receiver/receiveDetail')
        },
        {
            path: '/Receiver/edit',
            name: '/Receiver/edit',
            hidden: true,
            meta: {
                title: '接收方提交',
                flag: '/Receiver/edit',
                hidden: true,
            },
            component: () => import('@/views/launch/Receiver/editreceive')
        },
        {
            path: '/launch/Sponsor',
            name: '/launch/Sponsor',
            hidden: false,
            meta: {
                title: '发起方',
                flag: '/launch/Sponsor',
                hidden: false,
                icon: "edit"
            },
            component: () => import('@/views/launch/Sponsor/index')
        },
        {
            path: '/launch/detail',
            name: '/launch/detail',
            hidden: true,
            meta: {
                title: '发起方详情',
                flag: '/launch/detail',
                hidden: true,
                icon: "edit"
            },
            component: () => import('@/views/launch/Sponsor/datail')
        },
        {
            path: '/launch/taskDetail',
            name: '/launch/taskDetail',
            hidden: true,
            meta: {
                title: '查看详情',
                flag: '/launch/taskDetail',
                hidden: true,
                icon: "edit"
            },
            component: () => import('@/views/launch/Sponsor/taskDetail')
        },
        {
            path: '/launch/newActivity',
            name: '/launch/newActivity',
            hidden: true,
            meta: {
                title: '发起',
                flag: '/launch/newActivity',
                hidden: true,
                icon: "edit"
            },
            component: () => import('@/views/launch/Sponsor/newActivity')
        },
    ]
}




// export const launch = {
//     path: "/launch",
//     component: layout2,
//     name: "launch",
//     hidden: false,
//     meta: {
//         title: "发起方",
//         icon: "edit",
//     },
//     redirect: "/launch/Receiver",
//     children: [
//                 {
//                     path: '/launch/Receiver',
//                     name: '/launch/Receiver',
//                     meta: {
//                         title: '接收方',
//                         flag: '/launch/Receiver',
//                         hidden: false,
//                         icon: "edit"
//                     },
//                     component: () => import('@/views/launch/Receiver/index')
//                 },
//                 {
//                     path: '/launch/Sponsor',
//                     name: '/launch/Sponsor',
//                     meta: {
//                         title: '发起方',
//                         flag: '/launch/Sponsor',
//                         hidden: false,
//                         icon: "edit"
//                     },
//                     component: () => import('@/views/launch/Sponsor/index')
//                 },
//             ]
// }

export default launch

