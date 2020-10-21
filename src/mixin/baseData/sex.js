/*
 * @Author: 李素素 
 * @Date: 2019-07-04 15:02:59 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-12-17 09:48:05
 */
/**
 *  性别过滤
 */
import { sexList } from '@/settings'
export default {
    data() {
        return {
            sexList: sexList
        }
    },
    
    filters: {
        filterList:function (value) {
            //王冬冬 2019/08/23  返回的性别为字符串，setting中value值也改为字符串类型
            let index = sexList.map(item => item.value).indexOf(value)
            let result = index >= 0 ? sexList[index].label : ''

            return result
        }
    }
}