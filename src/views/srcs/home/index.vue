/*
 * @Author: 李素素 
 * @Date: 2019-08-20 09:18:39 
 * @Last Modified by: 孟如月
 * @Last Modified time: 2019-11-12 11:12:19
 */
<template>
    <div :style="{minHeight: clientHeight  + 'px'}">
        <div class="inner banner-list hide" @mouseover="changePlay(false)"
                @mouseleave="changePlay(true)">
            <div class="hide">
                <div class="inner-main">
                    <Carousel v-model="banner" :autoplay="autoplay" loop :autoplay-speed="3000" ref="banner">
                        <CarouselItem v-for="(item, index) in bannerList" :key="index">
                            <div class="my-banner-carousel">
                                <img class="w100b" :src="item.src" />
                                <template v-if="item.show">
                                    <div class="icon-pos" :class="item.class">
                                        <div v-if="index == 0">
                                            <router-link to="/PsyClass" class="mgr15">
                                                <img src="@/assets/banner/icon01.png" alt="">
                                            </router-link>
                                            <router-link to="/psychological/0" class="mgr15">
                                                <img src="@/assets/banner/icon02.png" alt="">
                                            </router-link>
                                            <router-link to="/psychological/1" class="mgr15">
                                                <img src="@/assets/banner/icon03.png" alt="">
                                            </router-link>
                                            <router-link to="/tasteTest" class="mgr15">
                                                <img src="@/assets/banner/icon04.png" alt="">
                                            </router-link>
                                            <a :href="qq" class="mgr15">
                                                <img src="@/assets/banner/icon05.png" alt="">
                                            </a>
                                        </div>

                                        <a class="icon fs16 mgt20" :href="gotoUrl" target="_blank">
                                            {{ item.name }}
                                        </a>
                                    </div>
                                </template>
                            </div>
                        </CarouselItem>
                    </Carousel>
                </div>
            </div>
        </div>
        <!-- 中心新闻 -->
        <news class="mgt10"></news>
        <!-- 家庭指南 -->
        <class-room class="mgt10"  v-if="familyShow"></class-room>
        <!-- 趣味测试 -->
        <interes-test class="mgt10" v-if="testShow"></interes-test>
        <!-- 心理文章 -->
        <msg-article class="mgt10" v-if="xlShow"></msg-article>
        <!-- 心智训练 -->
        <mental-xl class="mgt10" v-if="xzShow"></mental-xl>
    </div>
</template>

<script>
import news from './components/news'
import classRoom from './components/classRoom'
import interesTest from './components/interesTest'
import msgArticle from './components/msgArticle'
import mentalXl from './components/mentalXl'
import { mapGetters } from 'vuex'

export default {
    name: 'Home',

    components: {news, classRoom, interesTest, msgArticle, mentalXl},

    data() {
        return {
            autoplay: true,
            bannerList: [
                {src: require('@/assets/banner/banner01.png'), name: '了解更多', show: true, class: ''},
                {src: require('@/assets/banner/banner02.png')},
                {src: require('@/assets/banner/banner03.png'), name: '专业测试', show: true,class: 'icon02'}
            ],
            banner: 0,
            familyShow:false,
            testShow:false,
            xlShow:false,
            xzShow:false,
            clientHeight: 0,
        }
    },

    computed: {
        ...mapGetters([
            'gotoUrl',
            'qq'
        ]),
    },

    created() {
    },
    
    mounted () {
        var clientHeight = window.innerHeight || document.documentElement.clientHeight
        this.clientHeight = clientHeight - 160
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        changePlay(flag) {
            this.autoplay = flag
        },
        handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if(scrollTop  > 200){
                if (!this.familyShow) {
                    this.clientHeight = this.clientHeight + 500
                }
                this.familyShow = true
            }
            if(scrollTop > 700){
                if (!this.testShow) {
                    this.clientHeight = this.clientHeight + 500
                }
                this.testShow = true
            }
            if(scrollTop > 1000){
                if (!this.xlShow) {
                    this.clientHeight = this.clientHeight + 500
                }
                this.xlShow = true
            }
            if(scrollTop > 1400){
                this.xzShow = true
            }
        },
    }
}
</script>

<style lang="less">
    // @import '@/styles/variables.less';
    @base-color: #fff;
    @font-color: #343d4a;
    .banner-list {
        a {
            display: inline-block;
        }
        .ivu-carousel-dots li {
            margin: 0 5px;
            button {
                height: 8px;
                width: 16px;
                background: #fff;
                border-radius: 4px;
                opacity: 1;
            }
            
            &.ivu-carousel-active button{
                background: @base-color;
            }
        }
        .ivu-carousel-dots-inside {
            bottom: 20px;
        }

        .my-banner-carousel {
            position: relative;
            .icon-pos {
                position: absolute;
                top: 50.6%;
                left: 9.3%;
                &.icon02 {
                    top: 56.21%;
                    left: 12.34%;
                }
            }
            .icon {
                width: 168px;
                height: 46px;
                line-height: 42px;
                text-align: center;
                // background: url('../../../../assets/banner/btn01.png') no-repeat center center;
                background-size: contain;
                color: #fff;
            }
        }
    }
</style>