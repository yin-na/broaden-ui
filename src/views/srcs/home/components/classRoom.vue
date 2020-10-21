/*
 * @Author: 李素素 
 * @Date: 2019-08-20 09:18:43 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-11-12 10:04:00
 */
// 心理讲堂
<template>
    <div class="inner">
        <Card dis-hover :bordered="false">
            <Row>
                <Col span="14"  ref="left">
                    <!-- 头部 -->
                    <header-top :list="listNews"></header-top>
                    <!-- 列表 -->
                    <list-item v-for="(item, index) in carouselList" :key="index"
                                :src='item.coverImage'
                                :height="'126px'"
                                :class="index > 0 ? 'mgt20' : ''">
                            <p class="title overflow-hidden">{{ item.title }}</p>
                            <p class="info hide-ellipsis-f h72 mgt5 hideImg">
                                {{ item.content | replaceHtml }}
                            </p>
                            <p class="info color-base mgt5 cursor-p" @click="goToUrl(item)">查看详情 ></p>
                    </list-item>
                    <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
                </Col>
                <Col span="9"  ref="right" offset="1" class="class-room-r base-right-card" :style="{minHeight: height}">
                    <!-- 头部 -->
                    <div class="clearfix header-top bg-gray pdrl5">
                        <p class="fl top-border fs18">
                            家庭指南
                        </p>
                        <router-link class="fr" to="/family">
                            <Button type="primary" ghost shape="circle" size="small" class="header-btn bgW">
                                更多 >
                            </Button>
                        </router-link>
                    </div>
                    <!-- 更多 -->
                    <div class="hide" style="max-height: 420px">
                        <p class="text-center mgt20 mgb20" v-if="rightList.length < 1">暂无数据</p>
                        <scroll-seam :data="rightList" :singleHeight="28">
                            <li class="overflow-hidden h28" v-for="(item,index) in rightList" :key="index"
                                @click="goToUrlZn(item)">
                                <Icon class="color-base" size='20' type="md-arrow-dropright" />
                                {{item.title}}
                            </li>
                        </scroll-seam>
                    </div>

                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import headerTop from '@/components/headerTop'
import listItem from '@/components/listItem'
import scrollSeam from '@/components/scrollSeam'    
import { resOk } from '@/settings'
import { queryForumList } from '@/api/classPsy'
import { queryFamilyGuideList } from '@/api/family'
import replaceFilter from '@/mixins/replaceFilter'

export default {
    name: 'HomeNew',
    mixins: [replaceFilter],
    components: { headerTop, listItem, scrollSeam },

    data() {
        return {
            height: 0,
            listNews: { title: '心理讲堂', en: 'PSYCHOLOGY', to: '/PsyClass' },
            carouselList: [], // 轮播的列表
            rightList:[],
            listQuery:{
                size: 3
            },
            list:{
                size: 30,
                current: 1
            },
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        init() {
            // 请求中心新闻列表
            queryForumList(this.listQuery).then((res)=>{
                if(res.code == resOk){
                    this.carouselList = res.data.records
                    this.$nextTick(() => {
                        let leftH = this.$refs.left.$el.clientHeight;
                        let rightH = this.$refs.right.$el.clientHeight;
                        this.height = leftH > rightH ? leftH + 'px' : rightH + 'px';
                    })
                }
            })
            // 请求家庭指南列表
            queryFamilyGuideList(this.list).then((res)=>{
                if(res.code == resOk){
                    this.rightList = res.data.records
                }
            })
        },
        goToUrl(item) {
            this.$router.push('/PsyClass/detial/' + item.skillId)
        },
        goToUrlZn(item) {
            this.$router.push('/family/' + item.id)
        },
    }
}
</script>

<style lang="less">
.class-room-r {
    background: #fffbf7;
    padding: 6px 10px;
}
</style>