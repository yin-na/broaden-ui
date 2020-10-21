<template>
    <div class="articleCenter bgf">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane  v-for="item in HeartData" :key="item.sort"  :id="item.id" :label="item.label" :name="item.value" class="homeEducation">
                <div class="homeLeft">
                    <img :src="item.remark" alt="" style="width: 260px;height: 175px">
                </div>
                <div class="homeRight">
                  <vue-scroll :ops="ops" style="width:72%;height: 175px;">
                    <ul style="width: 100%" class="ul-li">
                        <li v-for="(item,index) in listData " :key="index" @click="serveDetail(item.id,item.dictId)">
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
import {HeartServicebook} from '@/api/user/psyExamintion'
    export default{
        props:['HeartData'],
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
                activeName: '',
                listData:[],
            }
        },
         watch:{
            HeartData:{
                handler(value){
                    this.activeName=value[0].value
                    this.HeartbookData(value[0].id);
                },
                deep: true
            }
        },
        methods: {
            HeartbookData(type){
                HeartServicebook([type]).then(res=>{
                    this.listData=res.data
                })
            },
            serveDetail(id,dictId){
                this.$router.push({
                    path:'/psyServe/detail',
                    query:{
                        id:id,
                        type:1,
                        dictId:dictId
                    }
                })
            },
            handleClick(e){
                let HeartData = this.HeartData
                let index=e.index
                this.HeartbookData(HeartData[index].id)
            }
        }

    }
</script>

<style  lang="less">
    .articleCenter{
        width:610px;
        margin: 0 15px;
        font-size: 14px;
        border:1px solid #ddd;
        border-top: 3px solid #eb6100;
        .el-tabs--top .el-tabs__item.is-top:nth-child(2){
        padding-left: 22px !important;
    }
    .el-tabs__item.is-active{
            color:#eb6100 !important
        }
    .el-tabs__active-bar{
        background-color: #eb6100 !important;
    }
    .is-top:hover{
        color: #eb6100 !important;
    }
    .el-tabs__header{
        margin:0 !important
    }
    .homeEducation{
        display:flex;
        padding:25px;
    }
    .homeRight{
        margin-left:26px;
        height: 175px;
        .ul-li li{
            height:36px;
            line-height: 36px;
            cursor: pointer;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
        .__view{
            width: 100% !important;
        }
}

</style>
