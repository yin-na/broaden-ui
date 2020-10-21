/*
 * @Author: 李素素 
 * @Date: 2019-07-04 15:02:59 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-07-08 14:10:49
 */
/**
 * 
 */
import { schoolSort } from '@/settings'
export default {
    data() {
        return {
            schoolSort: schoolSort,
            searchSchoolSort: [
                { key: "", value: "全部" },
            ]
        }
    },

    filters: {
        fondSchoolSort:function (value){
            if (!value) {
                return ''
            }
            let index = schoolSort.map(item => item.key).indexOf(value)
            let result = schoolSort[index].value
            
            return result
        }
    },

    created() {
        this.searchSchoolSort = this.searchSchoolSort.concat(this.schoolSort)
    }
}