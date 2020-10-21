<template>
    <div class="Detail_warps">
        <!-- 左侧 -->
        <div class="leftItem">
            <div class="infomation">
                <div class="infoTop">
                    <div class="userProfile">
                        <img :src="user.avatar" alt="">
                    </div>
                    <div class="userInfo">
                        <span class="userName">{{dataDetail.userName}}</span>
                        <span style="color:#999;display: block;">心理呵护第{{dataDetail.days}}天</span>
                        <div class="sexAge">
                            <span>性别：{{dataDetail.userSex}}</span>
                            <span>年龄：{{dataDetail.userAge}}</span>
                        </div>
                    </div>
                </div>
                <div class="InfoBottom" style="padding-left:32px;margin-top:50px;">
                    <div class="Bottomtext">报告有效性：高
                        <span style="display: inline;color:#37C9FF">{{dataDetail.effective}}</span>
                    </div>
                    <div class="Bottomtext" style="margin-top:18px">放松设备：
                        <span style="display: inline;color:#333">{{dataDetail.source}}</span>
                    </div>
               </div>
            </div>
            <echarts :histogramGraph="dataDetail.histogramGraph" :balanceGraph="dataDetail.balanceGraph" :tabledata="dataDetail"></echarts>
        </div>
        <!-- 右侧 -->
        <div class="rightItem">
            <tableDetail :physiologyData="dataDetail.physiologyData"></tableDetail>
            <div class="lefttitle">
               <div style="font-size:18px;font-weight: bold;color: #333333;margin-bottom: 48px;">心理压力与心脏自主分析:</div>
                   <div class="dividing-rule clearfix" v-for="(item,index) in scaleList" :key='index'>
                        <div class='left-title fl w95' style="width:95px;font-size: 13px;color:#666;">{{item.name}}</div>
                        <div class="scale-pd scale-pdlr" v-if="index < scaleList.length - 1">
                            <div class="gradientbox">
                                <img class="zb-img" :style="{left:item.status + '%'}" src="@/assets/user/zb.png" alt="">
                                <span class="scale-line w30 bgcolorff radiusLeft">优</span>
                                <span class="scale-line w20 bgcolora5">好</span>
                                <span class="scale-line w30 bgcolor79">正常</span>
                                <span class="scale-line w10 bgcolor5a">差</span>
                                <span class="scale-line w10 bgcolor21 radiusRight">极差</span>
                            </div>
                        <img width="100%" src="@/assets/user/0-100.png" alt="">
                        </div>
                        <div class="scale-pd scale-pdlr" v-else>
                            <div class="gradientbox bgpressure">
                                <img class="zb-img" :style="{left:item.status + '%'}" src="@/assets/user/zb.png" alt="">
                                 <span class="scale-line w30 bgcolor21 radiusLeft">较差</span>
                                <span class="scale-line w20 bgcolor5a">不平衡</span>
                                <span class="scale-line w50 bgcolora5 radiusRight">平衡</span>
                            </div>
                        <img width="100%" src="@/assets/user/0-100.png" alt="">
                        </div>
                    </div>
                        <!-- 自主神经平衡图 -->
                    <div class="mb30" style="margin-top:50px">
                        <div class="fs16 color21 mb30 fwb">自主神经平衡图</div>
                        <div class="disflex">
                            <div class="circle position-r">
                                <div class="two-circle">
                                    <div class="two-circle three-circle">
                                        <p class="two-circle little-circle"></p>
                                    </div>
                                </div>
                                <div class="action-circle"  :style="{transform:'translate(' +zuobiao.abscissa + 'px,-'+ zuobiao.ordinate + 'px)'}"></div>
                           </div>

                           <div style="padding:10px 0;display: flex;flex-direction: column;justify-content: space-between;">
                               <div >
                                   <span class="color9 fs20 mr50">SNE:<span class="color6">{{dataDetail.sne}}</span></span>
                                   <span class="color9 fs20">VNE:<span class="color6">{{dataDetail.vne}}</span></span>
                                </div>
                                <div class="disflex">
                                    <div class="textCet mr50">
                                        <p class="mb10"><img :src="dataDetail.sne > 60 ? require('@/assets/user/choised.png') : require('@/assets/user/unchoised.png')" alt=""></p>
                                        <p>心交感神经兴奋</p>
                                        </div>
                                    <div class="textCet mr50">
                                        <p class="mb10"><img :src=" dataDetail.vne <= 60 && dataDetail.sne <= 60 ? require('@/assets/user/choised.png') : require('@/assets/user/unchoised.png')" alt=""></p>
                                        <p>心交感迷走均衡</p>
                                    </div>
                                    <div class="textCet mr50">
                                        <p class="mb10"><img :src=" dataDetail.vne > 60 ? require('@/assets/user/choised.png') : require('@/assets/user/unchoised.png')" alt=""></p>
                                        <p>心迷走神经兴奋</p>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>  

                    <!-- 分析建议 -->
                    <div>
                         <div class="mb60">
                             <div class="fs16 color21 mb20 fwb">分析评估</div>
                              <div class="fs16 color9">{{dataDetail.pressureEvalute}}</div>
                         </div>
                         <div>
                             <div class="fs16 color21 mb20 fwb">改善建议</div>
                              <div class="fs16 color9">{{dataDetail.pressureAdvice}}</div>
                         </div>
                    </div>
               </div>
        </div>
    </div>
</template>

<script>
    import { resOk } from '@/settings'
    import {CapsuleDetails,stressDetail} from '@/api/user/psyExamintion'
    import tableDetail from '../components/tableDetail'
    import { mapGetters } from 'vuex'
    import echarts from '../components/stressEcharts'
    export default {
        components: {
            tableDetail,
            echarts
        },
        created () {
          this.detectionId= this.$route.query.id
          this.getCapsuleDetails()
        },
        data() {
            return{
                btnFlag:false,
                content:{},
                detectionId:'',
                scaleList:[],
                zuobiao:{},
                dataDetail:{
                },
                suggesOne:'',
                suggestwo:'',
                suggesthree:' '
                }
        },
         computed: {
          ...mapGetters([
            'user',
           ])
        },
  methods: {
        getCapsuleDetails(){
            let id =this.detectionId
            stressDetail(id).then(res=>{
                if(res.code == resOk){
                    this.dataDetail=res.data
                    if( res.data.userSex == 0){
                        this.dataDetail.userSex='男'
                    }else{
                        this.dataDetail.userSex='女'
                    }
                    if(res.data.source == 5){
                        this.dataDetail.source='心理压力分析仪'
                    }
                    this.scaleList = res.data.physiologyData
                    this.zuobiao=res.data.radarGraph
                }
                
            })
        },
        }
    }
</script>

<style lang="scss">
        @import "../../../../../styles/stressdetail.css";
</style>
