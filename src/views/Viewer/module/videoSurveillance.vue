<template>
    <el-dialog :visible.sync="dialog" width="460px" :append-to-body="true" @close="cancel">
        <el-form ref="form" >
            <el-form-item style="border: 3px solid #000; width: 100%;height: 300px" v-for="item in monitorData" :key="item.id">
                <div><div style="float:left;color:red">预警视频名称：{{item.title}}</div> <div style="float:right">预警时间：{{item.crtTime}}</div> </div> 
                <video style="width: 100%" autoplay muted loop :src="item.videoUrl"></video>
            </el-form-item>
        </el-form>
    </el-dialog>
    
</template>

<script>

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

export default {
   components: {
  },
  name: 'detailsVideo',
  props: {
      monitorData: {
          type: ''
      }
  },
  data () {
    return {
        dialog: false
    }
  },
  created() {
  },
  methods: {
      cancel() {
          
      }
  },
  mounted () {
      
  },
  watch: {
      monitorData: {
          handler: function() {
          deep: true
        }
          
      }
  }
}
</script>
<style scoped>
    .el-dialog__header {

        background: red !important;;

    }
</style>
