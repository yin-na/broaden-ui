/*
 * @Author: 孟如月 
 * @Date: 2019-08-21 08:42:39 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 11:40:38
 */
<template>
<!-- 测试详情页 -->
    <div class="inner">
        <list-page :page='false' 
                class="mgt20 class-room"
                :lspan='18' :rspan='6'
                :hide="false">
            <div slot="list-item" :style="{minHeight: height}">
                <!-- 开始测试 -->
                <div v-if="isStart" class="test-detial">
                    <div class="con-header">
                        <h3>{{content.name}}</h3>
                        <p class="tabs">
                            <span> {{content.testNum}} 人测试过</span>
                        </p>
                    </div>
                    <div class="content">
                        <img :src="content.image ? content.image : ''" alt="">
                        <p class="em2">{{content.introduce}}</p>
                        <div class="instructions">『此测试仅供娱乐，非专业心理指导』</div>
                        <div class="bottom-btn">
                            <Button type="primary" long class="bg-base text-white" style="background-color:#eb6100" @click="handleStart(false)">开始测试</Button>
                        </div>
                    </div>
                </div>
                <!-- 测试题目 -->
                <start-test v-else @setResult="setResult" :content="content" :scaleType="scaleType"></start-test>
            </div>
            <div slot="right-list" ref="right">
                <right-list @setHeight="setHeight"></right-list>
            </div>
        </list-page>
        <!-- 猜你想测 -->
        <Card v-if="isResult" class="hide" dis-hover :bordered="false">
            <div class="result-bottom">
                <header-line class="guess" text="猜你想测"></header-line>
                <Row :gutter="24">
                    <Col span="8" v-for="(item, index) in carouselList" :key="index" class="base-content-list">
                        <list-card :height='"172px"' :shadow='false' :src="item.image ? item.image : ''" @click.native="gotoDetial(item)">
                            <p class="title overflow-hidden normal h25">
                                {{item.name}}
                            </p>
                            <p class="info hide-ellipsis h36">
                                {{item.introduce}}
                            </p>
                            <p class="mgt10 clearfix">
                                <span class="fl ivu-modal-confirm-head-icon-success">立即体验</span>
                                <span class="fr info">{{ item.testNum }} 人测试过</span>
                            </p>
                        </list-card>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>
</template>
<script>
import mixin from './components/mixin'
import listPage from '@/components/listPage'
import rightList from './components/rightList'
import startTest from './components/startTest'
import listCard from '@/components/listCard'
import headerLine from '@/components/headerLine'
import cleanCacheRoute from '@/mixins/cleanCacheRoute'
import { scrollTo } from '@/utils/scroll-to'
import { resOk } from '@/settings'
import { guessTest, queryScaleDetails } from '@/api/tasteTest'

export default {
    name:'TestDetial',
    components:{ listPage, rightList, startTest, listCard, headerLine}, 
    mixins:[mixin, cleanCacheRoute],
    data(){
        return{
            height: '0px', // 右侧列表高度
            isStart: true,
            id:'',
            content:{}, // 详情
            scaleType:'',
            isResult: false
        }
    },
    created(){
        this.id = this.$route.params.id
        this.getDetial()
    },
    methods:{
        // 获取右侧列表详情
        getDetial(){
            queryScaleDetails({scaleId:this.id}).then((res)=>{
                if(res.code == resOk){
                    this.content = res.data
                    this.scaleType = res.data.scaleType
                }
            })
        },
        // 开始测试
        handleStart() {
            this.isStart = false
            scrollTo(0, 100)
            // this.$router.push('/tasteTest/'+ this.id + '/' + this.scaleType)
        },
        // 获取猜你想测
        guessTestFun(){
            guessTest({labelId:''}).then((res)=>{
                if (res.code == resOk) {
                    this.carouselList = res.data
                }
            })
        },
        // 展示猜你想测
        setResult(val) {
            this.isResult = val;
            if (this.carouselList.length < 1 && val) {
                this.guessTestFun()
            }
        },
        // 设置高度
        setHeight(val) {
            this.height = val + 'px'
        }
    }
}
</script>
<style lang='less' scoped>
.test-detial{
    padding:36px;
    box-sizing: border-box;
    // height: 946px;
}
.con-header{
    border-bottom:1px solid #eaeaea;
    h3{
        color: #343d4a;
        font-size: 20px;
        margin-bottom: 16px;
    }
    .tabs{
        margin-bottom: 13px;
        span{
            display: inline-block;
            margin-right: 30px;
            color: #80878e;
            i{
                margin-right:4px;
            }
        }
    }
}
.content{
    width: 600px;
    margin: 30px auto;
    color:#343d4a;
    line-height: 24px;
    .em2 {
        text-indent: 2em;
    }
    img{
        display: block;
        max-width: 100%;
        margin: 0 auto 26px;
        min-width: 416px;
    }
    p{
        margin-top:20px;
    }
    .instructions{
        margin: 40px 0;
        text-align: center;
        color:#b6b9be
    }
    .btn{
        width: 416px;
    }
    .bottom-btn{
        width: 416px;
        margin: 0 auto;
        button {
            font-size: 15px;
            line-height: 15px;
            padding: 12px 10px;
        }
    }
}

</style>