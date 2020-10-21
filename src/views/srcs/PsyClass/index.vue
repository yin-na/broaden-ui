<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar class="mgt10" :navList='navList' :title="title">
        </nav-bar>
        <Card class="card-pd0 hide class-room mgt10" dis-hover :bordered="false">
            <div class="clearfix base-top-title" >
                <div class="fl fs18">心理咨询技能培训</div>
                <div class="nav-list fr">
                    <ul class="clearfix">
                        <li class="active">热门推荐</li>
                        <li>电话咨询技能培训</li>
                        <li>心理咨询技能培训</li>
                    </ul>
                </div>
            </div>
            <Row :gutter="40" class="clearfix card-box">
                <Col span="8" class="mgb10" v-for="(item,index) in cardList" :key="index">
                    <list-card class="cursor-p" :src='item.coverImage' :height='"180px"'
                        @click.native="gotoList(item)">
                        <div class="card-list">
                            <p class="card-title">{{item.forumTypeName}}</p>
                            <p class="clearfix number">
                                <span class="fl">共 {{item.classHour}} 课时</span>
                                <span class="fr">{{item.readNumber}} 人已预览</span>
                            </p>
                        </div>
                    </list-card>
                </Col>
            </Row>
        </Card>
        <Card class="card-pd0 hide class-room" dis-hover :bordered="false">
            <div class="clearfix base-top-title" >
                <div class="fl fs18">心理老师技能培训</div>
                <div class="nav-list fr">
                    <ul class="clearfix">
                        <li class="active">热门推荐</li>
                        <li>初级</li>
                        <li>中级</li>
                        <li>高级</li>
                    </ul>
                </div>
            </div>
            <Row :gutter="40" class="clearfix card-box">
                <Col span="8" class="mgb10" v-for="(item,index) in teacherList" :key="index">
                    <list-card :src='item.coverImage' :height='"180px"'
                             @click.native="gotoList(item)">
                        <div class="card-list">
                            <p class="card-title">{{item.forumTypeName}}</p>
                            <p class="clearfix number">
                                <span class="fl">共 {{item.classHour}} 课时</span>
                                <span class="fr">{{item.readNumber}} 人已预览</span>
                            </p>
                        </div>
                    </list-card>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
import mixin from './mixin/mixin'
import listCard from '@/components/listCard'
import navBar from '@/components/navBar'
import headerBg from '@/components/headerBg'

export default {
    name:'PsyClass',
    mixins:[ mixin ],
    components:{
        listCard,
        navBar,
        headerBg
    },
    data(){
        return{
            title:'心理讲堂',
            navList:[{path:'/PsyClass/classList/0/2',name:'心理咨询技能培训'},{path:'/PsyClass/classList/1/4',name:'心理老师技能培训'}],
            teaParam:{
                forumTypeId:'',
                title:''
            }
        }
    },
    activated(){
        this.getList()
    },
    methods:{
        gotoList(val){
            this.$router.push('/PsyClass/classList/' + val.firstKind + '/' + val.forumTypeId)
        }
    }
}
</script>
<style lang='less' scoped>
.class-room{
    padding-bottom: 30px;
}
.card-box{
    padding: 0 60px;
}
.card-list{
    .card-title{
        margin-bottom: 10px;
        font-size: 15px;
    }
    .number{
        color: #80878e;
    }
}
</style>