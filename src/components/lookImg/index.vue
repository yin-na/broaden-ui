<template>
     <el-dialog :close-on-click-modal="false"
        :append-to-body='true'
        :visible.sync="centerDialogVisible"
        class="look-img"
        width="600px"
        :title="!isVideo ? '图片查看' : '视频查看'"
        center>
        <div class="text-center">
            <img v-if="!isVideo" class="img" :src="imgSrc" alt="">
            <video class="video" v-else-if="imgSrc" controls name="media">
                <source :src="imgSrc" type="video/mp4">
                您的浏览器不支持播放该视频！
            </video>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: {
        imgSrc: {
            type: String,
            default: ''
        },
        isVideo: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            centerDialogVisible: false
        }
    }
}
</script>

<style>
.look-img .el-dialog{
    max-width: 98%;
}
.look-img .el-dialog__body {
    text-align: center
}
.look-img .img, .look-img .video {
    max-width: 100%;
}
</style>
