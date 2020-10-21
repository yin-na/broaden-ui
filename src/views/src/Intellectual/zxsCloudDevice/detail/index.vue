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
                        <span class="userName">{{this.dataDetail.userName}}</span>
                        <span style="color:#999;display: block;">心理呵护第{{this.dataDetail.days}}天</span>
                        <div class="sexAge">
                            <span>性别：{{this.dataDetail.userSex}}</span>
                            <span>年龄：{{this.dataDetail.userAge}}</span>
                        </div>
                    </div>
                </div>
                <div class="InfoBottom" style="padding-left:32px;margin-top:50px;">
                    <div class="Bottomtext">报告有效性：
                        <span style="display: inline;color:#37C9FF">{{this.dataDetail.effective}}</span>
                    </div>
                    <div class="Bottomtext" style="margin-top:18px">放松设备：
                        <span style="display: inline;color:#333">{{this.dataDetail.source}}</span>
                    </div>
               </div>
            </div>
            <echarts :scatterGraph="this.dataDetail.scatterGraph" :histogramGraph="this.dataDetail.histogramGraph" :balanceGraph="this.dataDetail.balanceGraph"></echarts>
        </div>
        <!-- 右侧 -->
        <div class="rightItem">
            <tableDetail :physiologyData="this.dataDetail.physiologyData"></tableDetail>
            <div class="lefttitle">
               <div style="font-size:18px;font-weight: bold;color: #333333;margin-bottom: 48px;">精神压力</div>
                   <div class="dividing-rule clearfix">
                        <div class='left-title fl w95' style="width:95px;font-size: 16px;color:#666;">疲劳指数
                            <div>
                                <span class="mgr20 levelNum">{{this.dataDetail.gradeTired}}</span>
                                <span class="levelNum">{{this.dataDetail.indexTired}}</span>
                            </div>
                        </div>
                        <div class="scale-pd scale-pdlr">
                            <div class="gradient-box">
                                <img class="zb-img" :style="{left:this.dataDetail.indexTired + '%'}" src="@/assets/user/zb.png" alt="">
                                <span class="scale-line w30 bgcolorff radiusLeft">优秀</span>
                                <span class="scale-line w20 bgcolora5">良好</span>
                                <span class="scale-line w30 bgcolor79">一般</span>
                                <span class="scale-line w10 bgcolor5a">差</span>
                                <span class="scale-line w10 bgcolor21 radiusRight">极差</span>
                            </div>
                        <img width="100%" src="@/assets/user/0-100.png" alt="">
                        </div>
                    </div>

                    <div class="dividing-rule clearfix">
                        <div class='left-title fl w95' style="width:95px;font-size: 16px;color:#666;">压力指数
                            <div>
                                <span class="mgr20 levelNum" >{{this.dataDetail.gradePressure}}</span>
                                <span class="levelNum">{{this.dataDetail.indexPressure}}</span>
                            </div>
                        </div>
                        <div class="scale-pd scale-pdlr">
                            <div class="gradient-box bgpressure">
                                <img class="zb-img" :style="{left:this.dataDetail.indexPressure + '%'}" src="@/assets/user/zb.png" alt="">
                                <span class="scale-line w30 bgcolor79 radiusLeft">倦怠</span>
                                <span class="scale-line w20 bgcolora5">松弛</span>
                                <span class="scale-line w30 bgcolor79">适中</span>
                                <span class="scale-line w10 bgcolor5a">紧张</span>
                                <span class="scale-line w10 bgcolor21 radiusRight">压抑</span>
                            </div>
                        <img width="100%" src="@/assets/user/0-100.png" alt="">
                        </div>
                    </div>

                    <div class="dividing-rule clearfix">
                        <div class='left-title fl w95' style="width:95px;font-size: 16px;color:#666;">情绪指数
                            <div>
                                <span class="mgr20 levelNum" >{{this.dataDetail.gradeRelax}}</span>
                                <span class="levelNum">{{this.dataDetail.indexRelax}}</span>
                            </div>
                        </div>
                        <div class="scale-pd scale-pdlr">
                            <div class="gradient-box bgpressure">
                                <img class="zb-img" :style="{left:this.dataDetail.indexRelax*10 + '%'}" src="@/assets/user/zb.png" alt="">
                                <span class="scale-line w30 bgcolor21 radiusLeft">抑制</span>
                                <span class="scale-line w40 bgcolora5">平衡</span>
                                <span class="scale-line w30 bgcolor21 radiusRight">兴奋</span>
                            </div>
                        <img width="100%" src="@/assets/user/0-10.png" alt="">
                        </div>
                    </div>

                    <div class="dividing-rule clearfix">
                        <div class='left-title fl w95' style="width:95px;font-size: 16px;color:#666;">稳定指数
                            <div>
                                <span class="mgr20 levelNum" >{{this.dataDetail.gradeStabilization}}</span>
                                <span class="levelNum">{{this.dataDetail.indexStabilization}}</span>
                            </div>
                        </div>
                        <div class="scale-pd scale-pdlr">
                            <div class="gradient-box bgRelax">
                                <img class="zb-img" :style="{left:this.dataDetail.indexStabilization + '%'}" src="@/assets/user/zb.png" alt="">
                                <span class="scale-line w60 bgcolor5a radiusLeft">较差</span>
                                <span class="scale-line w20 bgcolor79">一般</span>
                                <span class="scale-line w20 bgcolora5 radiusRight">良好</span>
                            </div>
                        <img width="100%" src="@/assets/user/0-100.png" alt="">
                        </div>
                    </div>
               </div>
           <!-- </div>  -->
           <div class="suggestion">
                <div style="font-size:18px;font-weight: bold;color: #333333;margin-bottom: 30px;">分析建议:</div>
                <div style="width:715px;">
                    <div class="suggesOne">
                        {{this.dataDetail.tiredEvaluation}}
                    </div>
                    <div class="suggesOne" style="margin:23px 0">
                        {{this.dataDetail.pressureEvaluation}}
                    </div>
                    <div class="suggesOne" style="margin-bottom:23px">
                        {{this.dataDetail.relaxEvaluation}}
                    </div>
                    <div class="suggesOne">
                        {{this.dataDetail.stableEvaluation}}
                    </div>
                </div>
                <div style="color:#eb6100;margin-top: 39px;">
                    推荐调养项目：{{this.dataDetail.recommend}}
                </div>
           </div>

           <div class="Encyclopedias">
                <div style="font-size:18px;font-weight: bold;color: #333333;margin-bottom: 30px;">心率百科:</div>
                <table class="bottomtable">
                    <tr>
                        <th  rowspan="2" style="width:124px;line-height: 20px;">心率<br>(次/分)</th>
                        <th>心动过缓</th>
                        <th>正常心率</th>
                        <th>心动过速</th>
                    </tr>
                    <tr>
                        <th>&lt;60 </th>
                        <th>60-100</th>
                        <th>>100</th>
                    </tr>
                </table>
                <div class="encycontent" style="width:725px">
                    {{encycontent}}
                    <br<br><br>
                    参考文献：《诊断学》
                </div>
           </div>
        </div>
    </div>
</template>

<script>
    import {CapsuleDetails} from '@/api/user/psyExamintion'
    import tableDetail from '../components/tableDetail'
    import { mapGetters } from 'vuex'
    import echarts from '../components/echarts'
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
                dataDetail:{
                    physiologyData:[]
                },
                suggesOne:'',
                suggestwo:'',
                suggesthree:' ',
                encycontent:' 心率是指每分钟心搏次数，正常人在安静、清醒的情况下心率范围为60-100次/分。心动过缓可见于健康青年人、运动员及睡眠状态。其他原因心动过缓包括颅内疾患、严重缺氧、低温、甲状腺功能减退以及某些减低心率的药物等。心动过速也可分为生理性、病理性两种。生理性的心动过速可见于健康人吸烟、饮茶、饮酒，体力劳动及情绪激动时。病理性心动过速可见发热、甲状腺功能亢进、贫血、疼痛、心衰、休克、某些药物应用等。无症状的心动过速或心动过缓一般无需治疗，但若有心慌、胸闷、气短等不适症状者，建议及时就诊。'
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
            CapsuleDetails(id).then(res=>{
                this.dataDetail=res.data
                if( res.data.userSex == 0){
                    this.dataDetail.userSex='男'
                }else{
                    this.dataDetail.userSex='女'
                }
                if( res.data.source== 0){
                    this.dataDetail.source='心理减压太空舱'
                }else if(res.data.source== 1){
                    this.dataDetail.source='心理减压调养舱'
                }else{
                    this.dataDetail.source='生物生理反馈平台'
                }
            })

        }
        }
    }
</script>

<style lang="scss">
    .Detail_warps{
        max-width: 1200px;
        margin: 0 auto;
        padding: 70px 0 30px;
        font-family:Microsoft YaHei;
        display: flex;

        .leftItem{
        margin-right: 30px;
        }
    .infomation {
            width: 355px;
            height: 320px;
            background-color: #fff;
            padding: 56px 0 0 36px;
            border-radius: 10px;
            margin-bottom: 30px;;
            font-size: 15px;
        }
    .userName{
        font-size: 20px;
    }
    .infoTop {
        display: flex;
    }
    .userProfile {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        overflow: hidden;
    }
    .rightItem .cell{
        height: 45px;
        text-align: center;
        line-height: 45px;
        font-size: 14px;
        color:#999999;
    }
    .userProfile img {
        width: 100%
    }
    .userInfo {
        margin-left: 20px
    }
    .sexAge {
        width: 165px;
        margin-top: 15px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
    .userInfo span {
        /* display: block; */
        margin-bottom: 10px;
    }
    .suggestion{
        margin-top: 30px;
        width:815px;
        /* height:411px; */
        background-color: #fff;
        border-radius: 10px;
        padding:38px 0 20px 45px;
    }
    .gotop{
        position: fixed;
        right: 4%;
        bottom: 167px;
    }
    .w60{
        width:60%
    }
    .w40{
        width:40%
    }
    .w30{
        width:30%
    }
    .w20{
        width:20%
    }
    .w10{
        width:10%
    }
    .gradient-box {
        color:#fff;
    }
    .dividing-rule .gradient-box .scale-line:last-child {
        border: 0;
    }
    .dividing-rule .gradient-box .zb-img {
    width: 16px;
    position: absolute;
    top: -28px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
    .scale-line{
        display: inline-block;
        height: 16px;
        vertical-align: top;
        line-height: 16px;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-right: 1px solid rgba(0, 0, 0, 0.5);
        font-size: 13px;
    }
    .suggesOne{
        font-size: 16px;
        color:#999;
        line-height:30px;
    }
    .levelNum{
        font-size: 14px;
        color:#999;
    }
    .lefttitle{
        width:815px;
       min-height:541px;
       border-radius: 10px;
       background-color: #fff;
       padding:40px 40px 60px 45px;
    }
    .scale-pd.scale-pdlr {
    padding-left: 100px;
    padding-right: 60px;
    }
    .gradient-box {
    position: relative;
    border-radius: 10px;
    width: 100%;
    height:16px;
    margin-bottom: 2px;
    // background: linear-gradient(to right, #01ff00, #fffc00, #ff1313);
}
    .dividing-rule {
        margin-top: 58px;
        position: relative;
    }
    .mgr20 {
    margin-right:10px;
}
.encycontent{
    font-size:14px;
    color:rgba(153,153,153,1);
    line-height:26px;
}
    .w95{width:95px}
    .left-title {
        text-align: center;
        padding-right: 10px;
        position: absolute;
        top: 0;
        left: 0;
        float: left;
    }
    .Encyclopedias{
        width:815px;
        height:452px;
        background-color: #fff;
        border-radius: 10px;
        padding:38px 0 0 45px;
        margin-top: 30px;
    }
    .bottomtable{
          border-collapse:collapse;
          margin-bottom: 41px;
    }

    .bottomtable,.bottomtable td,.bottomtable th
  {
    border:1px solid #999999;
  }
  .bgpressure{
    // background: linear-gradient(to right, #ff1313, #fffc00, #01ff00, #fffc00, #ff1313);
  }
  .bgRelax{
    // background: linear-gradient(to right, #ff1313, #fffc00, #01ff00);
  }
  .bottomtable th{
      width:194px;
      height:46px;
      text-align: center;
      line-height: 46px;
      color:#666;
  }
  .Bottomtext{
      color:#999;
  }
    }


</style>
