// eslint-disable-next-line camelcase
import layoutBig from "../views/layoutBig/Layout.vue";
//import Layout from "../views/layout/Layout.vue"
export const chart = {
    path: "/edit",
    component: layoutBig,
    name: "edit",
    hidden: false,
    meta: {
        title: "大屏编辑",
        icon: "edit",
    },
    redirect: "/editDetail/edit",
    children: [
        {
            path: "/editDetail",
            component: () => import("@/components/Editor/Index.vue"),
            name: "editDetail",
            hidden: true,
            redirect: "/editDetail/edit",
            children: [
                {
                    path: "edit",
                    name:"details",
                    hidden: true,
                    component: () => import("@/views/Editor/Canvas.vue"),
                    meta: {
                        title: "大屏编辑",
                        icon: "index"
                    }
                }
            ]
        },
    ]
}

