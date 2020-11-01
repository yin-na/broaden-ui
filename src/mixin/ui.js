/*
 * @Author: 李素素 
 * @Date: 2019-07-11 13:49:51 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-12-17 10:06:15
 */
/** 
 * table是不是的展示边框等ui问题
 * */ 
import { noBorder, stripe, shadow, fixed} from '@/settings'

const ui = {
    data() {
        return {
            noBorder: noBorder,  // 边框
            stripe: stripe, //斑马纹
            shadow: shadow, // 阴影
            fixed: fixed // table定位
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 0 && row && this.stripe) {
                return 'warning-row'
            }
            return ''
        }
    }
}

export default ui 