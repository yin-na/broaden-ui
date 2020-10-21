/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-12-18 13:50:29
 删除按钮
 */
 <template>
    <el-button plain :icon="iconSrc ? iconSrc : icon ? 'el-icon-delete' : ''" @click="deleteMsg" :disabled="disabled">
            <slot></slot>{{ icon ? '批量' : '' }}{{text}}</el-button>
 </template>
 
 <script>
    import mixin from './mixin.js'
    export default {
         mixins: [ mixin ],
         props: {
            text: {
               type: String,
               default: '删除'
            },
            iconSrc: {
               type: String,
               default: ''
            }
         }
    }
 </script>
 
 <style>
 
 </style>
 
