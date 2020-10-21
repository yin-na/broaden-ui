/*
 * @Author: 李素素 
 * @Date: 2019-08-21 13:52:15 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 13:50:47
 */
// 文章列表
<template>
    <list-page :hide="false">
        <div slot="list-item">
            <Tabs :animated="false" class="art-list-tab"
                    @on-click="changeTab" ref="tab">
                <TabPane v-for="item in title" :key="item.id" :label="item.name"></TabPane>
            </Tabs>
            <!-- 小标题 -->
            <div class="art-list-popper ivu-poptip-popper" v-if="titleList.length > 0">
                <div class="ivu-poptip-arrow" :style="{left: left}"></div>
                <div class="ivu-poptip-inner">
                    <div class="ivu-poptip-body">
                        <!-- 小标题 -->
                        <ul class="art-title">
                            <li v-for="(item, index) in titleList"
                                class="li fs14" :key="index"
                                :class="param.secondResourceId == item.id ? 'color-base' : ''"
                                @click="setSecondResourceId(item)">
                                {{ item.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <list-item v-for="(item, index) in carouselList" :key="index"
                        :src='item.thumbnail'
                        width="120px" height="120px"
                        class="mgt20 cursor-p"
                        @click.native="goToUrl(0, item)">
                    <p class="pdt5"></p>
                    <p class="title overflow-hidden pos-read">
                        {{ item.title }}
                        <span class="pos-c info">{{ item.readNumber ? item.readNumber : '0' }}阅读</span>
                    </p>
                    <p class="info hide-ellipsis mgt5 hideImg">
                        {{ item.resourceContent | replaceHtml }}
                    </p>
                    <p class="info time-read"><span class="mgr10">{{ item.source }}</span><span>{{ item.fileUploadDate }}</span></p>
            </list-item>
            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
        </div>
        <!-- 分页 -->
        <div slot="pages" class="text-center mgt20">
            <base-page @change="changeCurrent"
                        :size="param.size"
                        :current="param.current"
                        :total="total"></base-page>
        </div>
        <div slot="right-list" class="art-list-right">
            <p class="fs16">
                <span class="v-line mgr5"></span><span>心理科普<i class="ivu-badge-status-dot "></i>热文</span>
            </p>
            <Row>
                <Col span="24" v-for="(item, index) in hotList" :key="index" class="base-content-list"
                        @click.native="goToUrl(0, item)">
                    <list-card :src="item.thumbnail" :shadow="false" :radius="0" :height="'193px'">
                        <p class="title overflow-hidden normal h25">
                            {{ item.title }}
                        </p>
                    </list-card>
                </Col>
            </Row>
            <p class="text-center mgt20 mgb20" v-if="hotList.length < 1">暂无数据</p>
        </div>
    </list-page>
</template>

<script>
import listPage from '@/components/listPage'
import listItem from '@/components/listItem'
import listCard from '@/components/listCard'
import mixin from './mixin'
import setArtTitle from '@/mixins/setArtTitle'
import replaceFilter from '@/mixins/replaceFilter'
import { resOk } from '@/settings'
import { recommend } from '@/api/psychological'
import basePage from '@/components/basePage'

export default {
    name: 'Artlist',
    mixins: [ mixin, setArtTitle, replaceFilter ],

    data() {
        return {
            left: '0',
            titleList: [],
            hotList: [],
        }
    },

    components: {
        listPage,
        listItem,
        listCard,
        basePage
    },

    created() {
        // 指向三角定位
        this.changeTab(0, true);
        // 获取数据
        this.init()
        this.inited()
    },
    
    methods: {
        getRecommend(fileType) {
            recommend({
                resourceId: this.param.firstResourceId,
                fileType: fileType
            }).then((res) => {
                if (res.code == resOk) {
                    let data = res.data ? res.data : []
                    this.hotList = data
                }
            })
        },
        // 切换tab
        changeTab(index, flag) {
            let that = this;
            let item = this.title[index]

            setTimeout(function() {
                let dom = that.$refs.tab.$el.getElementsByClassName('ivu-tabs-ink-bar')[0]
                that.left = dom.offsetLeft + dom.offsetWidth / 2 + 'px'
            }, 100);
            
            that.titleList = item.children;
            that.param.secondResourceId = ''
            that.param.firstResourceId = item.id
            // 热文
            that.getRecommend(0)

            if (flag) {
                return
            }
            that.param.current = 1
            that.inited()
        },

        // 设置2级分类
        setSecondResourceId(item) {
            this.param.current = 1
            this.param.secondResourceId = item.id
            this.inited()
        }
    }
}
</script>

<style lang="less">
.art-list-tab {
    .ivu-tabs-tab {
        padding-left: 0;
        padding-right: 0;
    }
    .ivu-tabs-tab:hover{
        color:rgb(235, 97, 0);
    }
    .ivu-tabs-tab-active{
         color:rgb(235, 97, 0);
    }
}
.pos-read {
    padding-right: 100px;
    position: relative;
    .pos-c {
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        line-height: 25px;
        font-weight: normal
    }
}
// 右侧
.art-list-right{
    padding: 15px 20px;
    .v-line, span {
        vertical-align: middle;
        height: 16px;
    }
    
    .base-list-heng .content-text {
        padding: 0
    }
}
</style>
