/*
 * @Author: 孟如月 
 * @Date: 2019-08-21 11:01:19 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-24 09:49:48
 */
<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar class="mgt10" :navList='navList' :title="title"></nav-bar>
        <Card class="card-pd0 hide class-room mgt10" dis-hover :bordered="false">
            <Row :gutter="30">
                <Col span="6" class="mgb10" v-for="(item,index) in cardList" :key="index"
                    @click.native="gotoDetial(item.id)" >
                    <list-card :src='item.coverImage' :height='"180px"'>
                        <div class="card-list">
                            <p class="card-title overflow-hidden h25">{{item.title}}</p>
                            <p class="clearfix number">
                                <span class="fl">{{item.readNumber ? item.readNumber : 0}} 人已预览</span>
                                <span class="fr">{{item.createTime}}</span>
                            </p>
                        </div>
                    </list-card>
                </Col>
            </Row>
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
import listCard from '@/components/listCard'
import basePage from '@/components/basePage'
import mixin from './mixin'

export default {
    name:'Family',
    mixins: [mixin],
    components:{
        basePage,
        listCard
    },
    data(){
        return{
            total: 0,
            param: {
                title: '',
                current: 1,
                size: 12
            },
        }
    },

    methods:{
        // 分页
        changeCurrent(current) {
            this.param.current = current
            this.init()
        }
    }
}
</script>
<style lang='less' scoped>
.class-room{
    padding: 0 30px;
    margin-bottom: 10px;
    padding-bottom: 30px;
}
.card-list{
    .card-title{
        margin-bottom: 5px;
        font-size: 15px;
    }
    .number{
        color: #80878e;
    }
}
</style>