/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-01-08 16:20:02
 新增按钮
 */
 <template>
    <el-button type="primary" @click="deleteMsg" :disabled="disabled" :loading="loading">
         <!-- <slot></slot><svg-icon v-if="icon" class="el-icon-add" icon-class="addIcon" /> -->
         <span>{{ text ? text : icon ? '添加' : '新增'}}</span></el-button>
 </template>
 
 <script>
      import mixin from './mixin.js'
      export default {
         name: 'AddBtn',
         mixins: [ mixin ],
         props: {
            text: {
               type: String,
               default: ''
            },
            loading: {
               type: Boolean,
               default: false
            },
         }
      }
 </script>
 
 <style>
 
 </style>
 