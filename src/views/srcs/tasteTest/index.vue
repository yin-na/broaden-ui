/*
 * @Author: 孟如月 
 * @Date: 2019-08-21 08:42:25 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-24 14:34:37
 */
<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <list-page class="mgt10 class-room"
                :lspan='18' :rspan='6'
                :hide="false">
            <template>
                <div slot="list-item" class="card-pd0">
                    <div class="clearfix base-top-title " >
                        <span class="fs18 color-base ">趣味测试</span>
                        <span class="taste-des">『趣味测试仅供娱乐，非专业心理指导』</span>
                    </div>
                    <div class="bread-nav clearfix diff-style">
                        <span :class="conditions.labelId == '' ? 'color-base' : ''" @click="changText({id: ''})">全部</span>
                        <span v-for="(item,index) in navData" :key="index"
                            @click="changText(item)"
                            :class="conditions.labelId == item.id ? 'color-base' : ''">
                            {{ item.name }}
                        </span>
                        <!-- <span :class="{'color-base': item.active ? true : false}" v-for="(item,index) in navData" :key="index">
                            {{item.name}}
                        </span> -->
                    </div>
                    <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
                    <div v-else class="taste-list">
                        <Row :gutter="24">
                            <Col span="8" v-for="(item, index) in carouselList" :key="index" class="base-content-list" @click.native="gotoDetial(item)">
                                <list-card :shadow='false' :src="item.image">
                                    <p class="title overflow-hidden normal h25">
                                        {{item.name}}
                                    </p>
                                    <p class="info hide-ellipsis h36">
                                        {{item.introduce}}
                                    </p>
                                    <p class="mgt10 clearfix">
                                        <span class="fl ivu-modal-confirm-head-icon-success" >立即体验</span>
                                        <span class="fr info">{{item.testNum}} 人测试过</span>
                                    </p>
                                </list-card>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div slot="pages">
                    <base-page @change="changeCurrent"
                        :size="conditions.size"
                        :current="conditions.current"
                        :total="total"></base-page>
                </div>
            </template>
            <div slot="right-list">
                <right-list></right-list>
            </div>
        </list-page>
    </div>
</template>
<script>
import { labelList } from '@/api/tasteTest'
import { mapGetters } from 'vuex'
import basePage from '@/components/basePage'
// import { resOk } from '@/settings'
import mixin from './components/mixin'
import rightList from './components/rightList'
import listPage from '@/components/listPage'
import listCard from '@/components/listCard'
import headerBg from '@/components/headerBg'

export default {
    name:'TasteTest',
    mixins:[mixin],
    components:{
        listPage,
        listCard,
        headerBg,
        rightList,
        basePage
    },
    data() {
        return {
            type:'',
            content:{},
            navData:[],
            leftData:[]
        }
    },
    computed: {
        ...mapGetters([
            'dynamicModuleDat'
        ]),
    },
    activated(){
        this.init()
        // this.type = this.$route.params.type ? this.$route.params.type : ''
        // this.guessTestFun()
    },
    methods:{
        async init(){
            this.getList()
            labelList().then((res)=>{
                this.navData = res.data
            })
        },
         changeCurrent(current) {
            this.conditions.current = current
            this.init()
        },
        changText(item) {
            this.conditions.labelId = item.id
            this.conditions.current = 1

            this.getList()
        },
    }
}
</script>
<style lang='less'>
.taste-list{
    padding: 0 20px 43px;
}
.taste-test{
    position: relative;
    .base-list-heng{
        border: 1px solid #eaeaea;
        background: #f8f8f8
    }
    .base-right-card{
        margin-top: 38px;
    }
    .focus-on{
        text-align: center;
        line-height: 36px;
        font-size: 16px;
    }
}
.taste-test .ivu-card .ivu-card-body{
    padding: 0;
}
.taste-des{
    margin-left: 22px;
    color: #80878e;
}
.diff-style{
    z-index: 100;
}
</style>