/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 心服务
 */
<template>
<div style="background: #fff">
            <baseheader></baseheader>

    <div class="service">
        <div class="carousel bgf w100">
            <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="(item,index) in imgUrle" :key="index">
                    <img :src="item.idView" class="banner_img">
                  </el-carousel-item>
            </el-carousel>
        </div>
        <div class="textContent">
            <curriculum :curriy=this.curriy></curriculum>
            <classificative :HeartData=this.HeartData></classificative>
            <liveBroadcast></liveBroadcast>
        </div>
        <div class="EducaNews">
            <div class="newsLeft">
                <div class="textBook fwb fs18">
                     <img  src="@/assets/user/certificate.png" alt="">
                     <span style="margin-left:28px">考试与证书</span>
                </div>
                <div class="ruleText">
                    <img style="width:216px" src="@/assets/user/testpic.png" alt="">
                <vue-scroll :ops="ops" style="width:100%;height: 495px;">
                  <ol>
                    <li class="color9" v-for="(item,index) in ruleList" :key="index" @click="examDetail(item.id,item.dictId)">
                        <!-- <img src="@/assets/user/jiao.png" alt=""> -->
                        {{item.name}}
                        </li>
                  </ol>
                </vue-scroll>
                </div>
            </div>
            <div class="newsRight">
                <div style="margin-bottom:17px">
                    <img src="@/assets/user/bottomBanner.png" alt="">
                </div>
                <div style="height:450px;display: flex;justify-content: space-between;">
                    <div class="tabsBottom">
                        <teachVideo :videoData=this.videoData></teachVideo>
                    </div>
                    <div class="tabsBotRight">
                            <img src="@/assets/user/Psychological test.png" alt="" @click='comingsoon()'>
                            <img src="@/assets/user/Psychological shop.png" alt="" @click='comingsoon()'>
                            <img src="@/assets/user/Psychological book.png" alt="" @click='comingsoon()'>
                    </div>
                </div>

            </div>
        </div>
<!-- 师资大咖 -->
        <div class="teachers">
            <div class="teacherTitle fwb fs18">
                <img  src="@/assets/user/teachericon.png" alt="">
                <span style="margin-left:10px">师资大咖</span>
            </div>
            <div class="teacherPics w100 borderdd">
                  <img v-for="(item,index) in getFaculty" :key='index' :src="item.avatar" alt="">
            </div>
        </div>
    </div>
            <pagefooter></pagefooter>

</div>
</template>

<script>
import curriculum from './components/articleTiltle'
import classificative from './components/classification'
import liveBroadcast from './components/liveBroadcast'
import teachVideo from './components/teachVideo'
import {HeartService,HeartServicetext,LectureVideo,getFaculty,hotClass} from '@/api/user/psyExamintion'
import baseheader from '@/components/pageHeader'
import pagefooter from '@/views/layout-1/components/baseFooter'
export default {
    mixins: [],
    components:{curriculum,classificative,liveBroadcast,teachVideo ,baseheader,pagefooter},
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
            HeartData:[],
            curriy:[],
            videoData:[],
            getFaculty:[],
            url:'@/assets/user/sleep.png',
            imgUrle: [
                { id: 0, idView: require('@/assets/user/banner.png') },
                { id: 1, idView: require('@/assets/user/banner.png') },
                { id: 2, idView: require('@/assets/user/banner.png') }
            ],
            ruleList:[

            ]
        }
    },
    created(){
        this.getHeart()
        this.getText()
        this.getVideo()
        this.getFacultyData()
        this.gethotClass()
    },
    computed: {
    },
    methods:{
        comingsoon(){
             this.$message('敬请期待');
        },
        gethotClass(){
            hotClass().then(res=>{
                this.curriy=res.data
            })
        },
        getFacultyData(){
             var listDatas=[]
            getFaculty([]).then(res=>{
                for(var i=0;i<res.data.length;i++){
                    listDatas.push(res.data[i].user)
                }
                this.getFaculty=listDatas
            })
        },
        getHeart(){
            HeartService().then(res=>{
                this.HeartData=res.data
            })
        },
        getVideo(){
            LectureVideo().then(res=>{
                this.videoData=res.data
            })
        },
        getText(){
            HeartServicetext().then(res=>{
                this.ruleList=res.data
            })
        },
        examDetail(id,dictId){
             this.$router.push({
                path:'/psyServe/detail',
                query:{
                    id:id,
                    type:3,
                    dictId:dictId
                }
                })
        }
    }
}
</script>

<style lang="scss">
.service{
        max-width: 1200px;
        margin: 0 auto;
        background-color: #fff !important;
        font-family:Microsoft YaHei;
         .textContent{
       margin-top: 50px;display: flex;
       height:271px
   }

    .banner_img {
    height: 100%;
    width: 100%;
    }
    .EducaNews{
        margin-top: 30px;
        display:flex;
        background-color: #fff;
    }
    .newsLeft{
        width:258px;
        border-top: 3px solid #eb6100;
        height: 536px;
    }
    .textBook{
        height:44px;
        width:100%;
        line-height: 44px;
        position: relative;
        padding-left:20px;
        border:1px solid #ddd;
        img{
            position: absolute;
            top:10px;
        }
    }

    .ruleText{
        padding:20px 10px;
        width:258px;
        border: 1px solid #ddd;
        border-top:none;
        height: 495px;
        ol{
            height: 365px;
            li{
                list-style-type:decimal;
                list-style-position:inside;
                cursor: pointer;
                margin-bottom: 10px;
            }
        }
          ol li:nth-child(1),ol li:nth-child(2),ol li:nth-child(3){
         color:#eb6100
     }
    }

    .newsRight{
        width: 990px;
        margin-left: 15px;
        min-height: 60px;
    }
    .teachers{
        // margin-top: 30px;
        border-top: 3px solid #eb6100;
        background-color: #fff;
        .teacherTitle{
        height: 40px;
        width: 100%;
        border: 1px solid #ddd;
        border-top: none;
        line-height: 40px;
        padding-left:20px;
        position: relative;
    }
    .borderdd{
        min-height:341px;
        border-top:none;
    }
    .teacherPics{
        padding:59px 0;
        // overflow-y: scroll;
      img{
        width:150px;
        height:196px;
        margin: 30px 0 0 59px;
      }
    }
    }
    .tabsBottom{
        width:610px;
        height:416px;
        border-top:3px solid #eb6100;
        display: flex;
    }
    .tabsBotRight{
        margin-left: 15px;
             img{
                 width: 302px;
                 height:126px;
                 cursor: pointer;
             }
             img:nth-child(2){
                 margin:14px 0;
             }
    }
    }


</style>
