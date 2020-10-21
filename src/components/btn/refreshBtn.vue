/*
 * @Author: 李素素 
 * @Date: 2019-07-25 11:03:06 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-24 10:26:42
 刷新按钮
 */
 <template>
    <el-button type="primary" plain icon="el-icon-refresh" @click="deleteMsg" :disabled="disabled">
        <slot></slot>刷新
    </el-button>
 </template>
 
 <script>
    import mixin from './mixin.js'
    export default {
        mixins: [ mixin ]
    }
 </script>
 
 <style>
 
 </style>
 
