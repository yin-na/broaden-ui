/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 报告详情
 */
<template>
    <div class="exam-warp-5">
        <div class="inner">
            <div class="report_warp">
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

                <!-- 2 -->
                <div class="psy_table">
                  <div class="pst_tit">
                    <i class="el-icon-edit-outline"></i>
                    <h3>答题选项统计</h3>
                  </div>
                  <div class="table-cont">
                    <div class="bg_table">
                      <div class="table-answer fl" v-for="(item, index) in resultstr" :key="index" style="padding-bottom: 20px">
                        <span class="bg_color">{{index + 1}}</span>
                        <span v-if="item == 1">A</span>
                        <span v-if="item == 2">B</span>
                        <span v-if="item == 3">C</span>
                        <span v-if="item == 4">D</span>
                        <span v-if="item == 5">E</span>
                        <span v-if="item == 6">F</span>
                        <span v-if="item == 7">G</span>
                        <span v-if="item == 8">H</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 3 -->
                <div class="psy_table">
                  <div class="pst_tit">
                    <i class="el-icon-document-checked"></i>
                    <h3>测评结果</h3>
                  </div>
                  <div class="table-cont" v-if="scale.typevalue != 5">
                    <!-- 单数据表格 -->
                    <div v-if="scale.recordType == 0">
                      <div class="result_warp fr">
                        <span>原始得分：</span>
                        <span class="blue">{{score0}} 分</span>
                        <!-- <span>原始总分：</span>
                        <span class="blue">26.0 分</span> -->
                        <span>状态: </span>
                        <span class="blue">{{result}}</span>
                      </div>
                      <testEcharts ref='echartsZhu' :dimension = 'dimension' :score = 'score'></testEcharts>
                    </div>
                    <!-- 多数据表格 -->
                    <div v-else>
                      <div class="result_warp fr">
                        <span>温馨提示: </span>
                        <span class="blue">{{result}}</span>
                      </div>
                      <echartsZhu ref='echartsZhu' :dimension = 'dimension' :score = 'score'></echartsZhu>
                    </div>
                  </div>
                  <div class="table-cont" v-else>
                    <p>根据专业兴趣测验，你属于 {{dimension0}} 四种类型的组合，关于维度的具体解释如下：</p>
                    <P>专业兴趣解读表</P>
                    <el-table
                      :data="factor"
                      border
                      :header-cell-style="headClass"
                      style="width: 80%;">
                      <el-table-column
                        prop="tdalign"
                        label="维度"
                        width="250">
                      </el-table-column>
                      <el-table-column
                        prop="align"
                        label="特点">
                      </el-table-column>
                    </el-table>
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
                        <span class="report-tit">{{item.dimension}}</span>
                        <p>{{item.resultanalyse}}</p>
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
                    <h3>健康知识</h3>
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
import testEcharts from './testEcharts'
import echartsZhu from '../module/echartsZhu'

export default {
  components: {
    testEcharts,
    echartsZhu
  },
  data () {
    return {
      eleSelector: '.content-overflow-scroll',
      id: '',
      data: {},
      scale: {},
      factor: {},
      resultstr: '',
      dimension: [],
      dimension0: '',
      score: [],
      score0: '',
      resultxx: [],
      result: '',
      resultanalyse: '',
      testRecordDetails: [],
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
        if (parseInt(res.data.scale.typevalue) == 5) {
          this.scale = res.data.scale
          this.factor = res.data.factor
          this.result = res.data.testRecordDetails[0].result
          this.score0 = res.data.testRecordDetails[0].score
          this.resultanalyse = res.data.testRecordDetails[0].resultanalyse
          this.testRecordDetails = res.data.testRecordDetails
          this.dimension0 = res.data.testRecordDetails[0].dimension
          this.testRecords = res.data.testRecords
          this.resultstr = res.data.testRecords.resultstr.split('#')
          this.$nextTick(() => {
            this.$refs['echartsZhu'].initChart()
          })
          //  测试时间
          if (parseInt(res.data.testRecords.testtime) < 60) {
            this.testRecords.testtime = parseInt(res.data.testRecords.testtime) + '秒'
          } else if (parseInt(res.data.testRecords.testtime) < 3600 && parseInt(res.data.testRecords.testtime) >= 60) {
            this.testRecords.testtime = parseInt(parseInt(res.data.testRecords.testtime) / 60) + '分' + (parseInt(res.data.testRecords.testtime) % 60) + '秒'
          } else {
            this.testRecords.testtime = parseInt(parseInt(res.data.testRecords.testtime) / 60 / 60) + '小时' + parseInt(parseInt(res.data.testRecords.testtime) / 60) + '分' + (parseInt(res.data.testRecords.testtime) % 60) + '秒'
          }
        } else {
          this.scale = res.data.scale
          this.factor = res.data.result
          this.dimension = res.data.result[0].dimension.split(',')
          this.score = res.data.result[0].score.split(',')
          this.result = res.data.testRecordDetails[0].result
          this.score0 = res.data.testRecordDetails[0].score
          this.testRecordDetails = res.data.testRecordDetails
          this.testRecords = res.data.testRecords
          this.$nextTick(() => {
            this.$refs['echartsZhu'].initChart()
          })

          //  测试时间
          if (parseInt(res.data.testRecords.testtime) < 60) {
            this.testRecords.testtime = parseInt(res.data.testRecords.testtime) + '秒'
          } else if(parseInt(res.data.testRecords.testtime) < 3600 && parseInt(res.data.testRecords.testtime) >= 60) {
            this.testRecords.testtime = parseInt(parseInt(res.data.testRecords.testtime) / 60) + '分' + (parseInt(res.data.testRecords.testtime) % 60) + '秒'
          } else {
            this.testRecords.testtime = parseInt(parseInt(res.data.testRecords.testtime) / 60 / 60) + '小时' + parseInt(parseInt(res.data.testRecords.testtime) / 60) + '分' + (parseInt(res.data.testRecords.testtime) % 60) + '秒'
          }

          // 测试题号选项处理
          this.resultstr = res.data.testRecords.resultstr.split('#')
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
    .content-overflow-scroll {
      height:600px;
      overflow: auto;
      li {
        height: 50px;
        line-height: 50px;
        margin-bottom: 10px;
        border: 1px solid #ececec;
        text-align: center;
      }
    }
      .report_warp{
      background: #fff;
      padding: 3% 2%;
      width: 100%;
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
      padding: 2% 0 0 4%;
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

    .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
      border-color: #f4af79;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
      background-color: #f4af79;
    }
    .report-tit{
      background: #f9a968;
      color: #fff;
      padding: 0.7% 1.5%;
      text-align: center;
      border-radius: 20px;
      margin: 2% 0;
      line-height: 40px !important;
    }
  }
</style>
