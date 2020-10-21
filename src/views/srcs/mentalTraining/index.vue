/*
 * @Author: 李素素 
 * @Date: 2019-08-22 10:18:10 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-24 14:46:59
 */
//  心智训练
<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar :navList='navList' :title="title" class="mgt10"></nav-bar>
        <Card dis-hover :bordered="false" class="mgt10">
            <div class="bread-nav diff-style" v-if="navData.length > 0">
                <span v-for="(item,index) in navData" :key="index"
                    @click="changText(item)"
                    :class="param.gameType == item.id ? 'color-base' : ''">
                    {{ item.label }}
                </span>
            </div>
            <Row :gutter="50">
                <Col span="8" v-for="(item, index) in carouselList" :key="index"
                    class="base-content-list cursor-p"
                    @click.native="goToUrl(item)">
                    <!-- 列表 -->
                    <list-item :src='item.coverImage'
                                width="154px" height="154px"
                                class="mgt20 pdt10">
                        <p class="title overflow-hidden normal h25 color-base">
                            {{ item.title }}
                        </p>
                        <p class="info mgt5 hide-ellipsis maxh52">
                            游戏类型：
                            <template v-if="item.gameTypeName">
                                <Tag class="my-m-tag">
                                    {{ item.gameTypeName }}
                                </Tag>
                            </template>
                        </p>
                        <p class="info color-t mgt10 hide-ellipsis h50 hideImg">{{ item.content | replaceHtml }}</p>
                    </list-item>
                </Col>
            </Row> 
            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
        </Card>
        <div class="text-center mgt20">
            <base-page @change="changeCurrent"
                        :size="param.size"
                        :current="param.current"
                        :total="total"></base-page>
        </div>

    </div>
</template>
<script>
import listItem from '@/components/listItem'
import basePage from '@/components/basePage'
import mixin from './mixin'
import headerBg from '@/components/headerBg'
import replaceFilter from '@/mixins/replaceFilter'
import { resOk } from '@/settings'
import { mentalTypeList } from '@/api/mentalTraining'

export default {
    name:'MentalTraining',
    mixins: [mixin, replaceFilter],
    components:{
        listItem,
        basePage,
        headerBg
    },
    data(){
        return{
            total: 0,
            param: {
                title: '',
                gameType: '', // 当前心智训练类型
                current: 1,
                size: 9
            },
            navData:[], // 心智训练类型
        }
    },

    created() {
        this.init()
    },

    methods: {
        async init() {
            await this.getTypeList()
            this.getList()
        },

        // 获取心智类型列表
        getTypeList() {
            let that = this
            return new Promise(function(resolve) {
                mentalTypeList().then((res) => {
                    if (res.code == resOk) {
                        let data = res.data ? res.data.records : []
                        that.navData = data
                        console.log(that.navData)
                        that.param.gameType = data.length > 0 ? data[0].id : ''
                    }
                    resolve(res)
                })
            }).catch(()=>{})
        },

        // 改变心智列表
        changText(item) {
            this.param.gameType = item.id
            this.param.current = 1

            this.getList()
        },

        // 分页
        changeCurrent(current) {
            this.param.current = current
            this.getList()
        }
    }
}
</script>

<style lang='less' scoped>
</style>