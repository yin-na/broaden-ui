/*
 * @Author: 孟如月 
 * @Date: 2019-08-21 08:57:17 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 18:00:10
 */

<template>
    <div class="inner">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar class="mgt10" :navList='navList' :title='title'>
        </nav-bar>
        <list-page :page='false' class="mgt10">
            <div slot="list-item">
                <detial-page :content='content'></detial-page>
            </div>
            <div slot="right-list">
                <div class="right-title bg-base">最新公告</div>
                <div class="pdtb10 pdlr20">
                    <p class="text-center mgt20 mgb20" v-if="!data || data.length < 1">暂无数据</p>
                    <div v-else class="hide" style="max-height: 450px">
                        <scroll-seam :data='data'>
                            <template v-for="(item,index) in data">
                                <li class="overflow-hidden" :key="index"
                                    v-if="item.id != id"
                                    @click="gotoDetial(item.id)">
                                    <Icon class="color-base" size='20' type="md-arrow-dropright" />
                                    {{item.title}}
                                </li>
                            </template>
                        </scroll-seam>
                    </div>
                </div>
            </div>
        </list-page>
    </div>
</template>

<script>
import { resOk } from '@/settings'
import { newsList, newsDetial } from '@/api/news'
import listPage from '@/components/listPage'
import navBar from '@/components/navBar'
import scrollSeam from '@/components/scrollSeam'
import detialPage from '@/components/detialPage'
import headerBg from '@/components/headerBg'

export default {
    name: 'New',
    components:{
        listPage,
        scrollSeam,
        navBar,
        detialPage,
        headerBg
    },
    data(){
        return{
            id: '',
            content:{},
            activeIndex:0,
            title:'通知公告',
            navList:[{path:'/news',name:'中心新闻'},{name:'通知公告',active:true}],
            data: null,
            rightList:[],
            listQuery:{
                title:'',
                newsBulletinType:'1',
                current: 1,
                size: 10
            },
        }
    },
    async activated(){
        await this.getList()
        if(this.$route.params.id){
            this.id = parseInt(this.$route.params.id)
            
        }else{
            this.id = this.data[0].id
        }
        this.getDetial()
    },
    computed: {
    },
    methods:{
        getList(){
            let that = this
            if (!that.data) {
                return new Promise(function(resolve) {
                    newsList(that.listQuery).then((res)=>{
                        if(res.code == resOk){
                            that.data = res.data.records ? res.data.records : []
                        }
                        resolve(that.data)
                    })
                }).catch(()=>{})
            }
        },
        getDetial(){
            newsDetial(this.id).then((res)=>{
                if(res.code == resOk){
                    this.content = res.data
                    this.content.author= res.data.publisher
                }
            })
        },
        gotoDetial(id){
            if (id == this.$route.params.id) {
                return
            }
            this.$router.push('/announcement/' + id)
        },
    }
}
</script>

<style lang="less" scoped>
</style>