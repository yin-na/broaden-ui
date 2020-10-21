
import layout_7 from '../views/layout-7/index.vue'
export const psychological = {
    path: '/psyc',
    component: layout_7,
    name: 'psyc',
    hidden: true,
    children: [
        {
            path: '/psyhome',
            name: 'psyhome',
            meta: {
                title: '心理体检中心首页',
                flag: '/psyhome',
                show: true
            },
            component: () => import('@/views/psychological/index')
        },
        {
            path: '/screening',
            name: 'screening',
            meta: {
                title: '心理体检筛查活动列表',
                flag: '/screening',
                show: true
            },
            component: () => import('@/views/psychological/Screening/screening')
        },
        {
            path: '/ExamReport',
            name: 'ExamReport',
            meta: {
                title: '查看报告',
                flag: '/ExamReport',
                show: true
            },
            component: () => import('@/views/psychological/reportDetail/index')
        },
        {
            path: '/examDetail',
            name: 'examDetail',
            meta: {
                title: '心理体检阅读指引',
                flag: '/examDetail',
                show: true
            },
            component: () => import('@/views/psychological/examDetail/examDetail')
        },
        {
            path: '/examDetail/ActexamDetail',
            name: '/examDetail/ActexamDetail',
            meta: {
                title: '心理体检活动阅读指引',
                flag: '/examDetail/ActexamDetail',
                show: true
            },
            component: () => import('@/views/psychological/examDetail/ActexamDetail')
        },
        {
            path: '/answer/answer',
            name: 'answer',
            meta: {
                title: '答题页',
                flag: '/answer',
                show: true
            },
            component: () => import('@/views/psychological/answer/answer')
        },
        {
            path: '/answer/answer-1',
            name: 'answer-1',
            meta: {
                title: '答题页-1',
                flag: '/answer-1',
                show: true
            },
            component: () => import('@/views/psychological/answer/answer-1')
        },
        {
            path: '/ProjectionTest',
            name: 'ProjectionTest',
            meta: {
                title: '投射测试',
                flag: '/ProjectionTest',
                show: true
            },
            component: () => import('@/views/psychological/ProjectionTest/projectresult')
        },
        {
            path: '/drawingTest',
            name: 'drawingTest',
            meta: {
                title: '绘画界面',
                flag: '/Projecdrawing/TesttionTest',
                show: true
            },
            component: () => import('@/views/psychological/ProjectionTest/index')
        },
        {
            path: '/activeList',
            name: 'activeList',
            meta: {
                title: '自助测查活动列表',
                flag: '/activeList',
                show: true
            },
            component: () => import('@/views/psychological/activeList/activeList')
        },
        {
            path: '/projectList',
            name: 'projectList',
            meta: {
                title: '投射活动列表（来访者）',
                flag: '/projectList',
                show: true
            },
            component: () => import('@/views/psychological/activeList/projectList')
        },
        {
            path: '/activeList/drawReport',
            name: '/activeList/drawReport',
            meta: {
                title: '投射报告详情页（来访者）',
                flag: '/activeList/drawReport',
                show: true
            },
            component: () => import('@/views/psychological/activeList/drawReport')
        },
        {
            path: '/questList/index',
            name: 'questList',
            meta: {
                title: '问卷调查列表',
                flag: 'questList',
                show: true
            },
            component: () => import('@/views/psychological/questList/index')
        },
        {
            path: '/questList/examDetail',
            name: 'questList/examDetail',
            meta: {
                title: '问卷答题引导页',
                flag: 'questList/examDetail',
                show: true
            },
            component: () => import('@/views/psychological/questList/examDetail')
        },
        {
            path: '/questList/answer',
            name: 'questList/answer',
            meta: {
                title: '问卷答题模块',
                flag: 'questList/answer',
                show: true
            },
            component: () => import('@/views/psychological/questList/answer')
        },
        {
            path: '/examination',
            name: 'examination',
            meta: {
                title: '首页',
                flag: '/examination',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psychological/examination/index')
        },
        {
            path: '/ScreenActivity',
            name: 'ScreenActivity',
            meta: {
                title: '筛查活动',
                flag: '/ScreenActivity',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psychological/examination/ScreenActivity/index')
        },
        {
            path: '/warnmanage',
            name: 'warnmanage',
            meta: {
                title: '预警管理',
                flag: '/warnmanage',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psychological/examination/warnmanage/index')
        },
        {
            path: '/selfTestcenter',
            name: 'selfTestcenter',
            meta: {
                title: '自测中心',
                flag: '/selfTestcenter',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psychological/examination/selfTestcenter/homeIndex')
        },
        {
            path: '/selfTestcenter/reportDetail',
            name: 'reportDetail',
            meta: {
                title: '自测中心报告详情',
                flag: '/reportDetail',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/selfTestcenter/reportDetail/index')
        },
        {
            path: '/reportDetail/drawReport',
            name: '/reportDetail/drawReport',
            meta: {
                title: '投射测验查看报告',
                flag: '/reportDetail/drawReport',
                show: true
            },
            component: () => import('@/views/psychological/examination/selfTestcenter/reportDetail/drawReport')
        },
        {
            path: '/question/index',
            name: 'createquestion',
            meta: {
                title: '问卷问答创建页面',
                flag: '/question',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/Questionnaire/question/home')
        },
        {
            path: '/viewlist',
            name: 'viewlist',
            meta: {
                title: '查看列表',
                flag: '/viewlist',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/Questionnaire/scaleDetail/index')
        },
        {
            path: '/questionlist',
            name: 'questionlist',
            meta: {
                title: '查看问卷',
                flag: '/questionlist',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/Questionnaire/scaleDetail/questionDetail')
        },
        {
            path: '/Questionnaire',
            name: 'Questionnaire',
            meta: {
                title: '问卷中心',
                flag: '/Questionnaire',
                show: true,
                exhibit: true
            },
            component: () => import('@/views/psychological/examination/Questionnaire/index')
        },
        {
            path: '/ScreenActivity/newActive',
            name: 'newActive',
            meta: {
                title: '新建活动',
                flag: '/newActive',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/ScreenActivity/newActive/newActive')
        },
        {
            path: '/ScreenActivity/drafts',
            name: 'drafts',
            meta: {
                title: '草稿箱编辑',
                flag: '/drafts',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/ScreenActivity/drafts/drafts')
        },
        {
            path: '/handling/index',
            name: 'handling',
            meta: {
                title: '预警记录',
                flag: '/handling',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/warnmanage/handling/index')
        },
        {
            path: '/manage/index',
            name: 'manage',
            meta: {
                title: '预警管理',
                flag: '/manage',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/warnmanage/manage/index')
        },
        {
            path: '/order/index',
            name: 'order',
            meta: {
                title: '预约',
                flag: '/manage',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/warnmanage/order/index')
        },
        {
            path: '/ScreenActivity/activeReport',
            name: 'activeReport',
            meta: {
                title: '活动报告首页',
                flag: '/activeReport',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/ScreenActivity/activeReport/activeReport')
        },
        {
            path: '/ScreenActivity/activeReport/detail',
            name: 'activeReportdetail',
            meta: {
                title: '活动报告详情',
                flag: '/activeReportdetail',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/ScreenActivity/activeReport/reportDetail/index')
        },
        
        {
            path: '/ScreenActivity/dataList',
            name: 'dataList',
            meta: {
                title: '草稿箱列表',
                flag: '/dataList',
                show: true,
                exhibit: false
            },
            component: () => import('@/views/psychological/examination/ScreenActivity/drafts/dataList')
        },
        {
            path: '/ScreenActivity/seeList',
            name: 'seeList',
            meta: {
                title: '草稿箱查看',
                flag: '/seeList',
                show: true,
                exhibit: false
            },
        component: () => import('@/views/psychological/examination/ScreenActivity/drafts/seeList')
        },
        {
            path: '/newActive/seeList',
            name: '/newActive/seeList',
            meta: {
                title: '筛查列表查看',
                flag: '//newActive/seeList',
                show: true,
                exhibit: false
            },
        component: () => import('@/views/psychological/examination/ScreenActivity/newActive/components/seeList')
        },
        {
            path: '/selfTestcenter/ScaleLibrary',
            name: 'ScaleLibrary',
            meta: {
                title: '量表库列表',
                flag: '/ScaleLibrary',
                show: true,
                exhibit: false
            },
        component: () => import('@/views/psychological/examination/selfTestcenter/ScaleLibrary')
        },
        {
            path: '/selfTestcenter/ScaleLibrary/detail',
            name: 'ScaleLibraryDetail',
            meta: {
                title: '量表库列表查看',
                flag: '/ScaleLibraryDetail',
                show: true,
                exhibit: false
            },
        component: () => import('@/views/psychological/examination/selfTestcenter/scaleDetail')
        }
    ]
}

export default psychological
