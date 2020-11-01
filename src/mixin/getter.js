/*
 * @Author: 李素素 
 * @Date: 2020-01-09 11:00:42 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-03-13 14:39:28
 */
// 引入getter
import { resOk } from '@/settings'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            resOk: resOk // 接口使用
        }
    },
    computed: {
        ...mapGetters([
            // 'theme', // 主题色 字段太简单，全部引入容易保错
            'permissions',
           // 'isAdmin', //平台端
            //'isProvince', //省教育局
            //'isCity', //市教育局
            //'isCounty', //区县教育局
            //'isInstitution', //校外机构
            //'isConsultant',  //咨询师
            //'isSchool', // 学校
            //'isStudent', //学生
            //'isParent', //家长
            //'isLeader', //班主任
            //'isTeacher', //老师
           // 'isAdministration', //行政
            //'isSupportstaff', //后勤
            //'isDsf',//第三方
        ])
    },
}
