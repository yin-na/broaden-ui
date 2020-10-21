<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar class="mgt10" :navList='navList' :title="title" @getListData='getListData'>
        </nav-bar>
        <div v-if="!isDetial">
            <Card class="card-pd0 hide mgt10" dis-hover :bordered="false">
                <Row :gutter="40" class="card-box">
                    <Col span="8" class="mgb10" v-for="(item,index) in telList" :key="index">
                        <list-card :src='item.coverImage' :height='"180px"'
                                    @click.native="gotoDetial(item.skillId)">
                            <p>{{item.title}}</p>
                        </list-card>
                    </Col>
                </Row>
            </Card>
            <div class="pages">
                <base-page @change="changeCurrent"
                            :size="params.size"
                            :current="params.current"
                            :total="total"></base-page>
            </div>
        </div>
        <list-page v-else :page='false' class="mgt10">
            <div slot="list-item" class="article-box">
                <p class="article-title">{{content.title}}</p>  
                <div class="article-content" v-html="content.content"></div>
            </div>
            <div slot="right-list">
                <div class="right-title bg-base">课时目录</div>
                <div class="pdtb10 pdlr20">
                    <div class="hide" style="max-height: 450px">
                        <scroll-seam :data='telList'>
                            <li class="overflow-hidden" v-for="(item,index) in telList" :key="index"
                                    v-show="item.skillId != skillId"
                                    @click="getContent(item.skillId)">
                                <Icon class="color-base" size='20' type="md-arrow-dropright" />
                                {{item.title}}
                            </li>
                        </scroll-seam>
                    </div>
                </div>
            </div>
        </list-page>
    </div>
</template>
<script>
import { getForumDetail } from '@/api/classPsy'
import basePage from '@/components/basePage'
import { resOk } from '@/settings'
import mixin from '../mixin/mixin'
import listCard from '@/components/listCard'
import listPage from '@/components/listPage'
import navBar from '@/components/navBar'
import scrollSeam from '@/components/scrollSeam'
import headerBg from '@/components/headerBg'

export default {
    name:'PsyClass',
    mixins:[mixin],
    components:{
        headerBg,
        basePage,
        listCard,
        navBar,
        scrollSeam,
        listPage
    },
    data(){
        return{
            kindId:'',
            isDetial:false,
            skillId:'',
            teaList:[],
            title:'',
            navList:[],
            content:{},

        }
    },

    activated() {
        this.isDetial = false
        if(this.$route.params.type){
             this.params.forumTypeId = this.$route.params.type
             this.type = this.$route.params.type
        }
        this.kindId = this.$route.params.kind ? this.$route.params.kind: '0'
        this.init()
    },
    created(){
    },
    methods:{
        async init(){
           this.getTelList()
           if(this.teaList.length <= 0){
               await this.getList()
           }
           
           if(this.kindId == '1'){
                this.navList = this.teaList
                let index = this.teaList.map((item) => item.id).indexOf(parseInt(this.type));
                this.teaList.forEach((item)=>{
                    item.active = false
                })
                this.teaList[index].active = true
                this.title = '小学'
            }else{
                let index = this.telTitList.map((item) => item.id).indexOf(parseInt(this.type));
                this.telTitList.forEach((item)=>{
                    item.active = false
                })
                this.telTitList[index].active = true
                this.navList = this.telTitList
                this.title = this.telTitList[0].name
            }
        },
        gotoDetial(id){
            if(this.kindId == '0'){
                this.$router.push('/PsyClass/detial/' + id)
                this.isDetial = false
            }else{
                this.isDetial = true
                this.skillId = id
                this.getDetial()
            }
        },
        async getListData(val){
            let index = this.navList.map((item) => item.id).indexOf(val);
            if(this.kindId == '0'){
                this.title = this.navList[index].name
            }
            this.navList.forEach((item)=>{
                item.active = false
            })
            this.navList[index].active = true
            this.params.forumTypeId = val
            this.params.firstKind = this.kindId
            this.params.current=1
            await this.getTelList()
            this.skillId = this.telList[0].skillId
            this.getDetial()
        },
        getDetial(){
            getForumDetail({skillId : this.skillId}).then((res)=>{
                if(res.code == resOk){
                    this.content = res.data
                }
            })
        },
        getContent(id){
            this.skillId = id
            this.getDetial()
        },
    }
}
</script>
<style lang='less' scoped>
.card-box{
    padding: 0 60px 30px;
}
.article-box{
    padding: 0 16px 30px;
    .article-title{
        text-align: center;
        font-size: 20px;
        margin: 18px 0 24px;
    }
    .article-content{
        line-height: 24px;
        text-indent: 2em;
    }
}

</style>