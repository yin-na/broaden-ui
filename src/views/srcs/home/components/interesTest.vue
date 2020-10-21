/*
 * @Author: 李素素 
 * @Date: 2019-08-20 11:02:51 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-11-12 10:02:11
 */
// 趣味测试
<template>
    <div class="inner">
        <Card dis-hover :bordered="false">
            <header-line text="趣味测试"></header-line>
            <!-- 列表 -->
            <Row :gutter="24">
                <Col span="6" v-for="(item, index) in carouselList" :key="index" class="base-content-list"
                        @click.native="goToUrl(item)">
                    <list-card :src="item.image">
                        <p class="title overflow-hidden normal h25">
                            {{ item.name }}
                        </p>
                        <p class="info hide-ellipsis h36">
                            {{ item.introduce }}
                        </p>
                        <p class="mgt10 clearfix">
                            <span class="fl ivu-modal-confirm-head-icon-success">立即体验</span>
                            <span class="fr info">{{ item.  testNum }}人测试过</span>
                        </p>
                    </list-card>
                </Col>
            </Row>
            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
            <div class="text-center">
                <router-link to="/tasteTest">
                    <Button class="gray-btn mgt20 mgb20 fs16 gethover" shape="circle" style="color:#eb6100">更多趣味测试 >></Button>
                </router-link>
            </div>
        </Card>
    </div>
</template>

<script>

import listCard from '@/components/listCard'
import headerLine from '@/components/headerLine'
import { resOk } from '@/settings'
import {  queryPesScaleList } from '@/api/tasteTest'

export default {
    components: { listCard, headerLine },

    data() {
        return {
            conditions:{
                current: 1,
                size: 8,
                labelId:''
            },
            carouselList: [], // 轮播的列表
        }
    },

    mounted() {
        this.init()
    },

    methods: {
        init() {
            queryPesScaleList(this.conditions).then((res)=>{
                if(res.code == resOk){
                    this.carouselList = res.data.records
                }
            })
        },
        goToUrl(item) {
            this.$router.push('/tasteTest/' + item.id)
        }
    }
}
</script>
<style>
.gethover:hover{
    background:#f5f5f5
}
</style>