/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-07 13:36:11
 撤回按钮
 */
 <template>
    <el-button plain :icon="icon ? 'el-icon-refresh' : ''" @click="deleteMsg" :disabled="disabled">
            <slot></slot>{{ icon ? '批量' : '' }}{{text}}</el-button>
 </template>
 
 <script>
    import mixin from './mixin.js'
    export default {
         mixins: [ mixin ],
         props: {
            text: {
               type: String,
               default: '撤回'
            }
         }
    }
 </script>
 
 <style>
 
 </style>
 
