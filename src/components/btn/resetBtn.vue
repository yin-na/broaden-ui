/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-12-24 15:24:20
 编辑按钮
 */
 <template>
    <el-button plain :icon="!icon ? 'el-icon-refresh-right' : ''" @click="deleteMsg" :disabled="disabled" :size="size">
            <slot></slot>{{ text }}</el-button>
 </template>
 
 <script>
    import mixin from './mixin.js'
    export default {
        props: {
            text: {
                type: String,
                default: '重置'
            }
        },
        mixins: [ mixin ]
    }
 </script>
 
 <style>
 
 </style>
 
