<template>
    <div class="capsule">
        <div style="display: flex;">
            <div class="infomation">
                <div class="infoTop">
                    <div class="userProfile">
                        <img :src="userInfo.avatar" alt="">
                    </div>
                    <div class="userInfo">
                        <span class="userName">{{userInfo.userName}}</span>
                        <span style="color:#999;display: block;">心理呵护第{{userInfo.days}}天</span>
                        <div class="sexAge">
                            <span v-if="userInfo.sex == '0'">性别：男</span>
                            <span v-if="userInfo.sex == '1'">性别：女</span>
                            <span>年龄：{{userInfo.age}}</span>
                        </div>
                    </div>
                </div>
                <div class="resultNum">
                  <span>报告类型：<span style="color:#37C9FF">整体报告</span></span>
                  <span>体验设备：<span style="color:#333">脑波认知训练</span></span>
                </div>
            </div>
            <div class='Statistics'>
                <div class='mb35 disflex spacebetween'>
                    <span  class='fs18 color3 fwb'>认知能力训练统计:</span>
                    <span class="fs14 color6">训练时间：{{startDate}}</span>
                </div>
                <div class='progress'>
                    <div v-for="(item,index) in deepLsit" :key="index" class="gressItem">
                        <div class="fs14 color9" style='margin-right:12px;width:57px;text-align:right'>{{item.abilityName}}</div>
                        <div style="width:437px;height:16px">
                            <el-progress  :stroke-width='16' :percentage="item.total" :text-inside="true" :color='item.color'></el-progress>
                        </div>
                        <div class="fs14 color9" style="line-height:14px;margin-left:16px">优于{{item.overThanUsers}}%人群，评价等级：
                            <span v-if="item.total > 0 && item.total <= 10">较差</span>
                            <span v-else-if="item.total > 10 && item.total <= 45">一般</span>
                            <span v-else-if="item.total > 45 && item.total < 70">良好</span>
                            <span v-else-if="item.total >= 70 && item.total < 80">一般</span>
                            <span v-else-if="item.total >= 80">很好</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div style="display:flex">
            <!-- 左侧 -->
            <div class="itemLeft">
              <div class="itemLeft-tit">
                <h3>综合脑力指数:</h3>
                <img src="@/assets/naobo/Memory.png" alt="">
                <span>你的脑力指数打败了 <span style="font-size:24px;color:#333;font-weight: bold;margin: 0 5px;">{{beatUsers}}%</span> 的用户</span>
              </div>
              <div class="itemLeft-tit0">
                <h3>全脑潜能开发带来的用处:</h3>
                <img src="@/assets/naobo/head.png" alt="">
                <span>左右脑功能图</span>
                <div class="tit-btm">
                  <span>胼胝体</span>
                  <span style="color:#5CB0FF">左脑理性</span>
                  <span style="color:#FF9D52">右脑感性</span>
                </div>
              </div>


            </div>
            <!-- 右侧内容 -->
            <div class="itemRight">
              <div class="let-aa">
                <h3 class="mb35">深度认知能力分析:</h3>

                <div class="itemRight-list" v-for="(item,index) in deepLsit" :key='index'>
                  <span class="span-1">能力顺位{{index+1}}:{{item.abilityName}}</span>
                  <div class="pingjia">
                    <div class="ping-le">
                        <span style="margin-bottom: 35px;">优于 <span style="font-size:24px;color:#333;font-weight: bold;">{{item.overThanUsers}}</span> 人群</span>
                        <span>评价等级： <span v-if="item.total > 0 && item.total <= 10">较差</span>
                              <span v-else-if="item.total > 10 && item.total <= 45">一般</span>
                              <span v-else-if="item.total > 45 && item.total < 70">良好</span>
                              <span v-else-if="item.total >= 70 && item.total < 80">一般</span>
                              <span v-else-if="item.total >= 80">很好</span>
                        </span>
                    </div>
                    <img src="@/assets/naobo/triangle.png">
                  </div>
                  <!-- 表格 -->
                  <div class="btm-table">
                    <!-- 表头 -->
                    <div class="nav-top">
                      <span class="nav-sp1">信息加工</span>
                    </div>

                    <div class="warp-type">
                      <!-- 表格数据 -->
                      <div class="nav-cont" style="background: #fff;">
                        <span class="nav-sp1">能力阐述</span>
                        <span class="nav-sp4">{{item.abilityExplan}}</span>
                      </div>

                      <div class="nav-cont" style="background: #fff;">
                        <span class="nav-sp1">你的能力等级意味着你</span>
                        <span class="nav-sp4">{{item.result}}</span>
                      </div>

                      <div class="nav-cont" style="background: #fff;">
                        <span class="nav-sp1">强化建议</span>
                        <span class="nav-sp4">{{item.suggestion}}</span>
                      </div>

                    </div>

                  </div>
                </div>

              </div>

              <div class="let-bb">
                <h3>脑力指数基本情况:</h3>
                <div class="charts-warp">
                  <div id="zhuData" style="width: 100%;height: 330px;" ref="echTask"></div>
                </div>
                <span>你的信息加工、注意、空间认知、记忆、情绪能力、问题解决显著落后于一般人群。不过不要气馁，研究表明，认知能力是可以通过合理的训练得以提升的，记得要及时回来完成你量身定做的训练课程哦！</span>
                <span>值得注意的是，虽然你的认知能力没有十分突出的专长，但也没有特别显著的偏颇。在个体与环境的作用过程中，个体认知的功能系统是不断发展的，并趋于完善。希望你积极参加认知训练，相信你的能力会得到有效的提升。</span>
              </div>

            </div>
        </div>

    </div>
</template>

<script>
import { getBravedetail, queryCardInfo } from '@/api/user/psyExamintion'

export default {
  data () {
    return {
      gressItem: [
        { name:'信息加工', color: '#f56c6c', progress: 20, percentage:61, level:'较好',color: '#5CB0FF'},
        { name:'情绪能力', color: '#f56c6c', progress: 20, percentage:61, level:'较好',color: '#DE73F5'},
        { name:'注意', color: '#f56c6c', progress: 20, percentage:61, level:'较好',color: '#41D380'},
        { name:'空间认知', color: '#f56c6c', progress: 20, percentage:61, level:'较好',color: '#6272FD'},
        { name:'记忆', color: '#f56c6c', progress: 20, percentage:61, level:'较好',color: '#FF7271'},
        { name:'问题解决', color: '#f56c6c', progress: 20, percentage:61, level:'较好',color:'#FF9D52'},
      ],
      value: '', // 选择的日期
      userInfo: [],
      startDate: '',
      chartarr: [],
      deepLsit: [],
      date: '',
      beatUsers: ''
    }
  },
  created () {
    this.Itemdetail()
    this.cardList()
    this.$nextTick(function () {
      this.initChart('zhuData')
    })
  },
  methods: {
    Itemdetail () {
      let chartarr = []
      let id = this.$route.query.id
      getBravedetail(id).then(res => {
        this.deepLsit = res.data.deepList
        let dimenarr = res.data.dimensionDtos
        this.startDate = res.data.startDate
        this.beatUsers = res.data.beatUsers
        dimenarr.forEach(element => {
          chartarr.push(element.total)
        })
        this.chartarr = chartarr
        this.initChart()
      })
    },

    cardList () {
      var dt = new Date()
      var year = dt.getFullYear()
      var month = dt.getMonth() + 1
      var day = dt.getDate()
      var days = year + '-' + month + '-' + day
      // this.date = days
      // 用户信息卡片
      queryCardInfo(days).then(res => {
        this.userInfo = res.data
      })
    },

    // 雷达图表
    initChart () {
      this.chart = this.$echarts.init(this.$refs.echTask)
      // 把配置和数据放这里
      this.chart.setOption({
        tooltip: {},
        radar: [
          {
            indicator: [
              { text: '信息加工'},
              { text: '注意力'},
              { text: '空间认知'},
              { text: '记忆力'},
              { text: '情绪能力' },
              { text: '问题解决'}
            ],
            center: ['50%', '45%'],
            radius: 100,
            shape: 'circle'
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [
              {
                value: this.chartarr,
                name: '脑力指数',
                areaStyle: {
                  color: '#add7ff'
                }
              }
            ],
            itemStyle: {
              normal: {
                color: '#add7ff', // 改变折线点的颜色
                lineStyle: {
                  color: '#add7ff' // 改变折线颜色
                }
              }
            }
          }
        ]

      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .capsule {
        max-width: 1200px;
        margin: 0 auto;
        padding: 70px 0 30px;
        font-family:Microsoft YaHei;
        .infoTop {
        display: flex;
        }

    .userName {
        font-size: 20px;
        color: #333;
        font-weight: bold;
        margin-right: 18px;
    }

    .sexAge {
        margin-top: 15px;
        color: #999;
        width:140px;
        display: flex;
        justify-content: space-between;
    }
    .resultNum{
      display: flex;
      flex-direction: column;
      padding-left: 56px;
      margin-top: 63px;
      span{
        font-size: 16px;
        color: #999;
        line-height: 32px;
      }
    }
    .el-table .success-row {
        background: #f0f9eb;
    }
    .infomation {
        min-width: 355px;
        height: 320px;
        background-color: #fff;
        padding: 56px 0 0 36px;
        margin-right: 30px;
        border-radius: 10px;
        font-size: 15px;
    }
    .userProfile {
        img{
          width: 85px;
          height: 85px;
          border-radius: 50%;
        }
    }

    .userInfo {
        margin-left: 20px
    }

    .userInfo span {
        /* display: block; */
        margin-bottom: 10px;
    }

    .itemLeft {
        margin-top: 30px;
        width: 355px;
        height: 971px;
        background-color: #fff;
        border-radius: 10px;
        padding: 32px 26px;

        .itemLeft-tit{
          h3{
            font-size: 18px;
            color: #333;
            margin-bottom: 43px;
          }
          img{
            width: 216px;
            height: 281px;
            margin-left: 47px;
            margin-bottom: 42px;
          }
          span{
            display: flex;
            justify-content: center;
            line-height: 24px;
            font-size: 16px;
            color: #999;
          }
        }
        .itemLeft-tit0{
          margin-top: 90px;
          h3{
            font-size: 18px;
            color: #333;
            margin-bottom: 43px;
          }
          img{
            width: 303px;
            height: 193px;
            margin-bottom: 18px;
          }
          span{
            display: flex;
            justify-content: center;
            line-height: 24px;
            font-size: 16px;
            color: #999;
          }
          .tit-btm{
            display: flex;
            flex-direction: row;
            margin-top: 51px;
            span{
              font-size: 16px;
              margin-right: 31px;
            }
          }
        }
    }
    // 右侧
    .itemRight {
        width: 815px;
        display: flex;
        flex-direction: column;
         margin: 30px 0 0 30px;
        .let-aa{
          padding: 40px 45px;
          border-radius: 10px;
          background-color: #fff;
          .itemRight-list{
            display: flex;
            flex-direction: column;
            h3{
              font-size: 18px;
              color: #333;
              margin-bottom: 31px;
            }
            .span-1{
              display: inline-block;
              width: 170px;
              height: 35px;
              line-height: 35px;
              text-align: center;
              background: #5cb0ff;
              color: #fff;
              font-size: 16px;
            }
            .pingjia{
              display: flex;
              flex-direction: row;
              height: 194px;
              margin-top: 38px;
              .ping-le{
                display: flex;
                flex-direction: column;
                margin-top: 58px;
                margin-left: 148px;
                span{
                  font-size: 16px;
                  color: #999;
                }
              }
              img{
                width: 189px;
                height: 194px;
                margin-left: 63px;
              }
            }
            .btm-table{
              margin-top: 58px;
              margin-bottom: 90px;
              .nav-top{
                width: 100%;
                height: 45px;
                line-height: 45px;
                background: #ECFAFF;
                border: 1px solid #efefef;
                span{
                  width: 100%;
                  display: inline-block;
                  text-align: center;
                  font-size: 16px;
                  color: #333;
                  padding: 0 10px;
                }
              }
              .warp-type{
                .nav-cont{
                  width: 100%;
                  height: 100%;
                  background: #F0FBFF;
                  display: flex;
                  flex-direction: row;
                  border-bottom: 1px solid #efefef;
                  span{
                    display: flex;
                    min-height: 45px;
                    line-height: 24px;
                    font-size: 14px;
                  }
                  .nav-sp1{
                    width: 165px;
                    padding: 0 10px;
                    border-right: 1px solid #efefef;
                    border-left: 1px solid #efefef;
                    justify-content: center;
                    align-items: center;
                    color: #333;
                  }
                  .nav-sp4{
                    flex-direction: column;
                    width: 560px;
                    padding: 26px;
                    border-right: 1px solid #efefef;
                    color: #999;
                  }
                }
              }
              .warp-type:last-child{
                margin: 0;
              }
            }
          }
        }
        .let-bb{
          padding: 40px 45px;
          border-radius: 10px;
          background-color: #fff;
          margin-top: 30px;
          h3{
            margin-bottom: 22px;
            font-size: 18px;
            color: #333;
          }
          span{
            display: flex;
            font-size: 14px;
            color: #999;
            line-height: 24px;
            margin-bottom: 35px;
          }
          .charts-warp{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
    }
    .lookdetail{
        cursor: pointer;
    }
    .lookdetail span:hover{
       color:#eb6100
    }

    .is-leaf {
        background-color: #eb6100;
    }
    .pagination{
        margin:30px 0 0 42%;
    }
    }
    .capsule .el-input__prefix{
        left:15px
    }
    .capsule  .el-input__inner {
        border: none;
         background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
        width: 192x;
        height: 35px;
        cursor: pointer;
        text-align: center;
        color: #fff;
        border-radius: 18px;
        margin:19px 0 15px;
    }
    .capsule .el-icon-date {
        display: block !important;
        color:#fff;
        margin:16% 0 0 5%;
        font-size: 16px;
        line-height: 65px;
    }
    .capsule .el-input__icon {
        display: none;
    }
    .el-table .warning-row {
        background: oldlace;
        }
        .Statistics{
      width: 815px;
      height: 320px;
      background-color: #fff;
      border-radius: 8px;
      padding:28px 40px 24px 35px;
      .progress{
      margin-top:30px;
        .gressItem{
          display: flex;
          margin-bottom:15px;
        }
      }
    }
</style>
