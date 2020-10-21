<template>
  <div class="videoTabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in videoData" :key="item.sort" :label="item.label" :name="item.value" class="videoEducation">
                <div class="videoLeft">
                    <img :src="item.remark.split('#')[0]" alt="" style="width: 262px;height: 110px">
                     <vue-scroll :ops="ops" style="width:100%;height: 195px;">
                     <ul>
                        <li class="fs14 color9" v-for="(item,index) in videoitem.slice(0,(0.5*videoitem.length)) " :key="index" @click="videoDetail(item.id,item.dictId)">
                            <img src="@/assets/user/jiao.png" alt="">
                            {{item.name}}
                        </li>
                     </ul>
                     </vue-scroll>
                </div>
                <div class="videoRight">
                    <img :src="item.remark.split('#')[1]" alt="" style="width: 262px;height: 110px">
                    <vue-scroll :ops="ops" style="width:100%;height: 195px;">
                        <ul>
                            <li  class="fs14 color9" v-for="(item,index) in videoitem.slice((0.5*videoitem.length),videoitem.length)" :key="index" @click="videoDetail(item.id,item.dictId)">
                                <img src="@/assets/user/jiao.png" alt="">
                                {{item.name}}
                            </li>
                        </ul>
                    </vue-scroll>
                </div>
            </el-tab-pane>
          </el-tabs>
  </div>
</template>

<script>
import {VideoArticles} from '@/api/user/psyExamintion'
export default {
    props:["videoData"],
    data(){
        return{
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {
                keepShow: true
                },
                bar: {
                hoverStyle: true,
                onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
                background: '#FFA356', // 滚动条颜色
                opacity: 0.5, // 滚动条透明度
                'overflow-x': 'hidden'
                }
            },
            activeName:'',
            videoitem:[]
        }
    },
    watch:{
            videoData:{
                handler(value){
                    this.activeName=value[0].value
                    this.HeartTextData(value[0].id);
                },
                deep: true
            }
        },
    methods:{
        HeartTextData(type){
            VideoArticles(type).then(res=>{
                this.videoitem=res.data
            })
        },
        videoDetail(id,dictId){
                this.$router.push({
                    path:'/psyServe/detail',
                    query:{
                        id:id,
                        type:2,
                        dictId:dictId
                    }
                })
        },
        handleClick(e){
            let videoData = this.videoData
            let index=e.index
            this.HeartTextData(videoData[index].id)
        }
    }

}
</script>

<style lang="scss">
.videoTabs{
    width: 610px;
    border: 1px solid #ddd;
     .el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding-left: 22px !important;
     }
     .el-tabs__header{
        margin:0;
    }
      .el-tabs__item.is-active{
            color:#eb6100 !important
        }
    .el-tabs__active-bar{
        background-color: #eb6100;
    }
    .is-top:hover{
        color: #eb6100;
    }
    .videoEducation{
        padding:25px 26px;
        min-height:367px;
        display: flex;
        justify-content: space-between;
        .videoLeft{
            ul{
                margin-top: 32px;
                 height: 195px;
                li{
                    cursor: pointer;
                }
            }
        }
        .videoRight{
            ul{
                margin-top: 32px;
                height: 195px;
                li{
                    cursor: pointer;
                }
            }
        }
        li{
            height:34px;
            cursor: default;
        }
    }
}
</style>
