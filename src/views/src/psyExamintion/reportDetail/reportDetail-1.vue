/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 报告详情  舒格特方格
 */
<template>
    <div class="exam-warp-5">
        <div class="inner">
            <div class="report_warp">
                <Back-top></Back-top>
              <!--  报告标题 -->
              <div class="rep_tit">
                  <h3>{{scale.name}}</h3>
                  <span class="top-tit">测试来访者：</span>
                  <span class="top-tit-1">{{testRecords.updUserName}}</span>
                  <span class="top-tit">测试时间：</span>
                  <span class="top-tit-1">{{testRecords.testtime}}</span>
                  <span class="top-tit">测试完成时间：</span>
                  <span class="top-tit-1">{{testRecords.crtTime}}</span>
              </div>
              <h3 class="cont_tit">评估与诊断报告</h3>
              <!-- 报告详情 -->
              <div class="report_xq">

                <!-- 1 -->
                <div class="psy_table">
                  <div class="pst_tit">
                    <i class="el-icon-s-data"></i>
                    <h3>{{scale.name}}量表简介：</h3>
                  </div>
                  <div class="table-cont">
                    <span>{{scale.introduce}}</span>
                  </div>
                </div>

                <!-- 3 -->
                <div class="psy_table">
                  <div class="pst_tit">
                    <i class="el-icon-document-checked"></i>
                    <h3>测评结果：</h3>
                  </div>
                  <div class="table-cont">
                    <span>历史最高记录: </span>
                    <span style="color:#e6a23c;font-weight: 500;padding-left:1%;font-size:15px">{{time}}</span>
                  </div>
                </div>

                <!-- 4 -->
                <div class="psy_table">
                  <div class="pst_tit">
                    <i class="el-icon-document"></i>
                    <h3>综合报告</h3>
                  </div>
                  <div style="padding-bottom: 2%">
                    <div v-for="(item,index) in testRecordDetails" :key="index">
                      <div class="table-cont-1" v-if="scale.typevalue != 5">
                        <p>{{item.proposal}}</p>
                      </div>
                      <div v-else>
                        <div v-html="resultanalyse" class="table-cont">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 5 -->
                <div class="psy_table">
                  <div class="pst_tit">
                    <i class="el-icon-copy-document"></i>
                    <h3>温馨提示</h3>
                  </div>
                  <div class="table-cont">
                    <p>{{scale.knowledge}}</p>
                  </div>
                </div>

              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { recordDetail } from '@/api/user/psyExamintion'

export default {
  data () {
    return {
      id: '',
      data: {},
      scale: {},
      testRecordDetails: [],
      result: '',
      time: '',
      resultanalyse: '',
      testRecords: {
        updUserName: '',
        testtime: '',
        crtTime: ''
      },
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },

  computed: {
  },

  created () {
    this.getParams()
    this.postRecordDetail()
  },

  watch: {
    '$route': 'getParams'
  },

  mounted () {

  },
  methods: {
    // 表头样式设置
    headClass () {
      return 'text-align: center;'
    },
    getParams () {
      const id = this.$route.query.id
      this.id = id
    },
    postRecordDetail () {
      recordDetail(this.id).then(res => {
        this.scale = res.data.scale
        this.testRecordDetails = res.data.testRecordDetails
        this.testRecordDetails = res.data.testRecordDetails
        this.testRecords = res.data.testRecords
        this.time = res.data.collen[0].time

        //  当前测试时间
        if (parseInt(res.data.testRecords.testtime) < 60) {
        this.testRecords.testtime = parseInt(res.data.testRecords.testtime) + '秒'
        } else if(parseInt(res.data.testRecords.testtime) < 3600 && parseInt(res.data.testRecords.testtime) >= 60) {
        this.testRecords.testtime = parseInt(parseInt(res.data.testRecords.testtime) / 60) + '分' + (parseInt(res.data.testRecords.testtime) % 60) + '秒'
        } else {
        this.testRecords.testtime = parseInt(parseInt(res.data.testRecords.testtime) / 60 / 60) + '小时' + parseInt(parseInt(res.data.testRecords.testtime) / 60) + '分' + (parseInt(res.data.testRecords.testtime) % 60) + '秒'
        }

        //  历史最高记录
        if (parseInt(res.data.collen[0].time) < 60) {
        this.time = parseInt(res.data.collen[0].time) + '秒'
        } else if(parseInt(res.data.collen[0].time) < 3600 && parseInt(res.data.collen[0].time) >= 60) {
        this.time = parseInt(parseInt(res.data.collen[0].time) / 60) + '分' + (parseInt(res.data.collen[0].time) % 60) + '秒'
        } else {
        this.time = parseInt(parseInt(res.data.collen[0].time) / 60 / 60) + '小时' + parseInt(parseInt(res.data.collen[0].time) / 60) + '分' + (parseInt(res.data.collen[0].time) % 60) + '秒'
        }

      }).catch(e => {
      })
    }

  }
}
</script>

<style lang="less">
    .exam-warp-5{
        width: 100%;
        height: 100%;
        padding: 3% 0;
    }
    .report_warp{
      background: #fff;
      padding: 3% 2%;
      width: 100%;
      height: 100%;
      box-shadow: 2px 2px 10px #E8E8E8;
    }
    .rep_tit{
      background-image: url('../../../../assets/home/report.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 80%;
      margin: 0 auto;
      padding: 4% 2% 3% 2%;
      h3{
        display: inline-block;
        margin: 0 2%;
      }
      .top-tit{
        color: #b8b8b8;
      }
      .top-tit-1{
        color: #f36421;
        margin-right: 2%;
      }
    }
    .cont_tit{
      text-align: center;
      margin: 5% 0 2% 0;
    }
    // 报告
    .report_xq{
      width: 85%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
    }
    .pst_tit{
      width: 100%;
      h3{
        display: inline-block;
        margin-left: 2%;
      }
    }
    .table-cont{
      color: #b0b0b0;
      font-size: 12px;
      padding: 2% 0 4% 4%;
      span{
        line-height: 25px;
      }
      p{
        line-height: 25px;
      }
    }
    .table-cont-1{
      color: #b0b0b0;
      font-size: 12px;
      padding: 2% 0 2% 4%;
      span{
        line-height: 25px;
      }
      p{
        line-height: 25px;
      }
    }
    .help{
      line-height: 25px;
      h4{
        color: #000;
        line-height: 50px;
      }
    }
    .result_warp{
      width: 100%;
      text-align: right;
      .blue{
        color: #37c9ff;
        margin-right: 2%;
      }
    }
    //  答案
    .table-answer{
      width: 6%;
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
    .bg_table{
      width: 100%;
      border-right: 1px solid #ccc;
      span{
        width: 100%;
        line-height: 30px;
        border: 1px solid #ccc;
        border-collapse: collapse;
      }
    }
    .bg_color{
      background: #f8fdff;
      border-bottom: none !important;
    }
    .el-table__row{
      height: 70px;
    }
    .el-table thead {
      color: #000;
      font-size: 16px;
      line-height: 45px;
      border: 1px solid #f4af79;
    }
    .el-table{
      font-size: 15px;
      text-align: left;
    }
    .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
      border-color: #f4af79;
    }
    .el-table::before{
      border-bottom:  1px solid #f4af79;
    }
</style>
