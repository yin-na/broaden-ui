/*
 * @Author: 李素素 
 * @Date: 2019-08-20 09:18:43 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-11-12 10:02:18
 */
// 中心新闻
<template>
    <div class="inner">
        <Card dis-hover :bordered="false">
            <Row>
                <Col span="14">
                    <!-- 头部 -->
                    <header-top :list="listNews"></header-top>
                    <Row>
                        <!-- 左侧banner -->
                        <Col span="13" class="demo-carousel">
                            <div class="hide">
                                <div class="inner-main">
                                    <Carousel @on-change="changeCarousel" dots="none" arrow="never" v-model="value" loop 
                                            :autoplay="autoplay" :autoplay-speed="5000" ref="banner" class="list">
                                        <CarouselItem v-for="(item, index) in carouselList" :key="index"  class="cursor-p"
                                                @click.native="goToUrl(item)">
                                            <div class="list">
                                                <img :src="item.coverImage">
                                            </div>
                                        </CarouselItem>
                                    </Carousel>
                                </div>
                            </div>
                            <div class="title-t">
                                <p class="overflow-hidden cursor-p" @click="goToUrl(carouselNow)">{{ carouselNow.title }}</p>
                                <!-- 左右 -->
                                <div class="arrow">
                                    <Icon type="ios-arrow-back" @click="arrowEvent(-1)"/>
                                    <Icon type="ios-arrow-forward"  @click="arrowEvent(1)"/>
                                </div>
                            </div>
                        </Col>
                        <!-- 右侧列表 -->
                        <Col span="10"  offset="1">
                            <ul>
                                <li v-for="(item, index) in carouselList" :key="index"
                                    :class="index > 0 ? 'mgt20' : ''"
                                    class="cursor-p base-content-list hover"
                                    @click="goToUrl(item)">
                                    <p class="title overflow-hidden" style="margin:0">{{ item.title }}</p>
                                    <p class="info overflow-hidden lh25 hideImg h25">
                                        {{ item.briefing }}
                                    </p>
                                    <p class="info date">{{ item.createTime }}</p>
                                </li>
                            </ul>
                            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
                        </Col>
                    </Row>
                </Col>
                <Col span="9"  offset="1" class="base-right-card">
                    <!-- 头部 -->
                    <header-top :list="listUser"></header-top>
                    <!-- 滚动 -->
                    <div class="hide" style="height: 288px">
                        <p class="text-center mgt20 mgb20" v-if="rightList.length < 1">暂无数据</p>
                        <scroll-seam :data="rightList" :max="9" :singleHeight="32">
                            <li class="overflow-hidden c-default fs16 h32" style='cursor: pointer' v-for="(item,index) in rightList" :key="index"  @click="goToUrl(item)">
                                <Icon class="color-base" size='20' type="md-arrow-dropright" />
                                {{item.briefing}}
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
import scrollSeam from '@/components/scrollSeam'
import { resOk } from '@/settings'
import { newsList } from '@/api/news'
export default {
    name: 'HomeNew',
    mixins: [],
    components: { headerTop, scrollSeam },

    data() {
        return {
            autoplay: true,
            listNews: { title: '中心新闻', en: 'NEW', to: '/news' },
            listUser: { title: '通知公告', en: 'ANNOUNCEMENT',to: '/news' },
            value: 0,
            carouselList: [], // 轮播的列表
            carouselNow: {}, // 当前的轮播
            rightList:[],
            listQuery:{  // 新闻中心参数
                newsBulletinType:'0',
                current: 1,
                size: 3
            },
            listQueryS:{  //通知公告
                newsBulletinType:'1',
                current: 1,
                size: 5
            },

        }
    },
    computed: {
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 中心新闻
            newsList(this.listQuery).then((res)=>{
                if(res.code == resOk){
                    this.carouselList = res.data.records
                    this.carouselNow = this.carouselList.length > 0 ? this.carouselList[0] : {}
                }
            })
            // 学校成员名单
            newsList(this.listQueryS).then((res) => {
                if(res.code == resOk){
                    this.rightList = res.data.records
                } 
            })
        },
        arrowEvent(flag) {
            this.$refs.banner.arrowEvent(flag);
        },
        changeCarousel(oldValue, value) {
            this.carouselNow = this.carouselList[value]
        },
        goToUrl(item) {
            this.$router.push('/news/' + item.id)
        }
    }
}
</script>

<style lang="less">
    .demo-carousel {
        position: relative;
        .list {
            height: 260px;
        }
        img {
            width: 100%;
            min-height: 100%;
        }
        .title-t {
            height: 40px;
            line-height: 40px;
            background: rgba(0, 0, 0, .56);
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 0 10px;
            color: #ffffff;
            padding-right: 80px;
            .arrow {
                position: absolute;
                right: 10px;
                top: 0;
                .ivu-icon {
                    height: 22px;
                    line-height: 22px;
                    width: 18px;
                    margin: 0 2px;
                    background: rgba(0, 0, 0, .5);
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }
</style>