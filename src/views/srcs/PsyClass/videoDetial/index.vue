<template>
    <div class="inner">
        <Card dis-hover :bordered="false" class="video-box">
            <div class="video">
                <div class="video-title">{{videoData.title}}</div>
                <video ref="video" v-if="videoData.movie" width="100%" height="486" controls name="media">
                    <source :src="videoData.movie" type="video/mp4">
                    您的浏览器不支持播放该视频！
                </video>
            </div>
        </Card>
    </div>
</template>
<script>
import { getForumDetail } from '@/api/classPsy'
import { resOk } from '@/settings'
export default {
    name:'VideoDetial',
    data(){
        return{
            videoData:{}
        }
    },
    created(){
        this.skillId = this.$route.params.id
        this.getDetial()
    },
    methods:{
        getDetial(){
            getForumDetail({skillId : this.skillId}).then((res)=>{
                if(res.code == resOk){
                    this.videoData = res.data
                }
            })
        }
    }
}
</script>

<style lang='less' scoped>
</style>