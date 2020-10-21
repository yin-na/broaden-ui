/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-01-19 09:17:29
 编辑按钮
 */
 <template>
    <el-button type="primary" plain  :icon="iconSrc ? iconSrc : icon ? 'el-icon-edit' : ''" @click="deleteMsg" :disabled="disabled" :loading="loading">
            <slot></slot>{{ text }}</el-button>
 </template>
 
 <script>
      import mixin from './mixin.js'
      export default {
         mixins: [ mixin ],
         props: {
            text: {
               type: String,
               default: '编辑'
            },
            iconSrc: {
               type: String,
               default: ''
            },
            loading: {
               type: Boolean,
               default: false
            }
         }
      }
 </script>
 
 <style>
 
 </style>
 
