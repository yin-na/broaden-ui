/*
 * @Author: 李素素 
 * @Date: 2019-08-21 19:26:14 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-29 14:50:46
 */

<template>
    <div class="inner">
        <!-- 视频 -->
        <template v-if="content.fileType == '2'">
            <Card dis-hover :bordered="false" class="video-box">
                <div class="video">
                    <div class="video-title">{{ content.title }}</div>
                    <video ref="video" width="100%" height="486" v-if="content.fileUploadUrl" controls autoplay>
                        <source :src="content.fileUploadUrl" type="video/mp4">
                        您的浏览器不支持播放该视频！
                    </video>
                </div>
            </Card>
        </template>
        <!-- 文章 -->
        <template v-if="content.fileType == '0'">
            <header-bg></header-bg>
            <nav-list></nav-list>
            <list-page>
                <div slot="list-item">
                    <detial-page :content='content' :hideP="true" :showBq="true"></detial-page>
                </div>
                <div slot="right-list">
                    <div class="pd20">
                        <div class="mgb20 right-list-top clearfix">
                            <div class="w80 h80 mgr20 mgl20 fl">
                                <img :src="dynamicModuleDat[3][0]" class="w100b img-detial" alt="">
                            </div>
                            <div class="fl color-base mgt15">
                                <h5 class="fs16">扫码关注公众号</h5>
                                <p class="fs14 mgt5">让更多的人更好的认识自己</p>
                            </div>
                        </div>
                        <div class="clearfix mgb10">
                            <span class="fl fs18">
                                <i class="v-line mgr5 text-vam"></i>
                                <span class="text-vam">相关阅读</span>
                            </span>
                            <router-link to="/psychological/0" class="fr cursor-p mgt5" >更多 ></router-link>
                        </div>
                        <div class="hide" style="max-height: 450px">
                            <scroll-seam :data='rightList'>
                                <li class="overflow-hidden" v-for="(item,index) in rightList" :key="index"
                                    @click="goToUrl(0, item)">
                                    <i class="ivu-badge-status-dot bgGray"></i>
                                    {{item.title}}
                                </li>
                            </scroll-seam>
                        </div>
                        <p class="text-center mgt20 mgb20" v-if="rightList.length < 1">暂无数据</p>
                    </div>
                </div>
            </list-page>
        </template>
    </div>
</template>

<script>
import navList from '@/components/navList'
import listPage from '@/components/listPage'
import scrollSeam from '@/components/scrollSeam'
import detialPage from '@/components/detialPage'
import headerBg from '@/components/headerBg'
import { resOk } from '@/settings'
import { scienceByIdDetail, portalArticle } from '@/api/psychological'
import { mapGetters } from 'vuex'

export default {
    name: 'PsyDetial',
    components:{
        navList,
        listPage,
        scrollSeam,
        detialPage,
        headerBg
    },
    data(){
        return{
            content:{},
            rightList:[]
        }
    },
    computed: {
        ...mapGetters([
            'dynamicModuleDat'
        ]),
    },
    mounted(){
        this.init();
    },

    methods: {
        // 获取内容
        init() {
            let id = this.$route.params.id
            scienceByIdDetail({
                buildingId: id
            }).then((res) => {
                if (res.code == resOk) {
                    let data = res.data
                    data.content = data.resourceContent
                    this.content = data

                    if (data.fileType == '0') {
                        data.featureList = data.featureName ? data.featureName.split(',') : ''
                        this.getRightList()
                    }
                }
            })
        },
        // 获取左侧推荐
        getRightList() {
            portalArticle({
                resourceId: ''
            }).then((res) => {
                if (res.code == resOk) {
                    let data = res.data
                    this.rightList = data
                }
            }) 
        },
        // 跳转
        goToUrl(type, item) {
            this.$router.push('/psychological/detial/' + type + '/' + item.buildingId)
        },
    }
}
</script>

<style lang="less" scoped>
.scroll-content{
        position: relative;
        transition: top 0.5s;
    }
.right-title{
    height: 44px;
    padding-left: 20px;
    line-height: 44px;
    color: #fff;
    font-size: 18px;
}
.right-list-top {
    width: 100%;
    padding: 13px 0 13px 10px;
    background: url('../../../../assets/footer/ewmBg02.png') no-repeat center center;
    background-size: cover;
}
.img-detial {
    margin-top: 50%;
    transform: translateY(-50%);
}
</style>