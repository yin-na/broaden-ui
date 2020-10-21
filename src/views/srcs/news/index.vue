/*
 * @Author: 孟如月 
 * @Date: 2019-08-19 03:43:17 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 17:55:29
 *列表页 新闻中心
 */
<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar class="mgt10" :navList='navList' :title="title"></nav-bar>
        <list-page :page='!isDetial' class="mgt10">
            <div slot="list-item">
                <template v-if="!isDetial">
                    <p class="text-center mgt20 mgb20" v-if="data.length < 1">暂无数据</p>
                    <list-item v-else class="cursor-p" v-for="(item,index) in data" :src='item.coverImage' :key='index' style="margin-bottom:14px;"
                        @click.native="gotoDetial(item.id)">
                        <p class="title hide-ellipsis">{{item.title}}</p>
                        <p class="info hide-ellipsis">{{item.briefing }}</p>
                        <p class="time-read"> 
                            <span class="time">{{item.createTime}}</span> 
                            <span class="reading">
                                <Icon type="ios-eye" size="22"/>{{item.readNumber}}</span>
                        </p>
                    </list-item>
                </template>
                <template v-else>
                    <detial-page :content='content'></detial-page>
                </template>
            </div>
            <div slot="pages">
                <base-page @change="getChange"
                        :size="listQuery.size"
                        :current="listQuery.current"
                        :total="total"></base-page>
            </div>
            <div slot="right-list">
                <!-- <div class="right-title bg-base">{{type == 0 ? '新闻动态' : '最新公告'}}</div> -->
                <div class="right-title bg-base">新闻动态</div>
                <div class="pdtb10 pdlr20">
                    <p class="text-center mgt20 mgb20" v-if="data.length < 1">暂无数据</p>
                    <div v-else class="hide" style="max-height: 450px">
                        <scroll-seam :data='data'>
                            <li class="overflow-hidden" v-for="(item,index) in data" v-show="item.id != id" :key="index" @click="gotoDetial(item.id)">
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
import { resOk } from '@/settings'
import basePage from '@/components/basePage'
import detialPage from '@/components/detialPage'
import { newsList, newsDetial } from '@/api/news'
import listPage from '@/components/listPage'
import listItem from '@/components/listItem'
import navBar from '@/components/navBar'
import scrollSeam from '@/components/scrollSeam'
import headerBg from '@/components/headerBg'

export default {
    name: 'New',
    mixins: [],
    components:{
        listPage,
        listItem,
        scrollSeam,
        navBar,
        detialPage,
        headerBg,
        basePage
    },
    props:{
        type:{
            type: Number,
            default:()=> 0
        }
    },
    data(){
        return{
            isDetial:false,
            id:null,
            total:0,
            activeIndex:0,
            title:'中心新闻',
            navList:[{name:'中心新闻',active:true},{path:'/announcement',name:'通知公告'}],
            listQuery:{
                title:'',
                newsBulletinType:'0',
                current: 1,
                size: 10
            },
            content:{},
            data:[],
        }
    },
    computed: {
    },
    activated() {
        if(this.$route.params.id){
            this.id = parseInt(this.$route.params.id)
            this.isDetial = true
            this.getDetial()
        }else{
            this.isDetial = false
        }
        // if(this.type == 0){
        //     this.title = '中心新闻'
        //      this.navList = [{name:'中心新闻',active:true},{path:'./announcement',name:'通知公告'}]
        // }else{
        //     this.title = '通知公告'
        //     this.navList = [{ path:'./news',name:'中心新闻'},{name:'通知公告',active:true}]
        // }
        this.getList()
    },
    methods:{
        getList(){
            // if(this.type != null){
            //     this.listQuery.newsBulletinType = this.type
            // }
            newsList(this.listQuery).then((res)=>{
                if(res.code == resOk){
                    this.data = res.data.records
                    this.total = res.data.total
                }
                
            })
        },
        gotoDetial(id){
            if (id == this.$route.params.id) {
                return
            }
            
            this.$router.push('/news/' + id)
        },
        getDetial(){
            newsDetial(this.id).then((res)=>{
                this.content = res.data
                this.content.author= res.data.publisher
            })
        },
        getChange(val){
            this.listQuery.current = val
            this.getList()
        }
    }
}
</script>

<style lang="less" scoped>
</style>