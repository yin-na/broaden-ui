/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-01-13 14:14:13
  按钮
 */
 <template>
    <el-button type="primary" @click="deleteMsg" :disabled="disabled" :loading="loading">
         {{ text }}</el-button>
 </template>
 
 <script>
      import mixin from './mixin.js'
      export default {
         name: 'AddBtn',
         mixins: [ mixin ],
         props: {
            loading: {
               type: Boolean,
               default: false
            },
            text: {
               type: String,
               default: '查看'
            }
         }
      }
 </script>
 
 <style>
 
 </style>
 