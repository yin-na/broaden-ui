/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-07 13:36:37
草稿箱
 */
 <template>
    <el-button @click="deleteMsg" plain :disabled="disabled">
         <slot></slot><svg-icon v-if="icon" class="el-icon-add" icon-class="draftBtn" /><span>{{text}}</span></el-button>
 </template>
 
 <script>
    import mixin from './mixin.js'
    export default {
         mixins: [ mixin ],
         props: {
            text: {
               type: String,
               default: '草稿箱'
            }
         }
    }
 </script>
 
 <style>
 
 </style>
 
