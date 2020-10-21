
<template>
  <div class="wrapexam" :style="{minHeight: clientHeight  + 'px'}">
      <!-- 测评 -->
      <el-row :gutter="10">
        <el-col :span="24" class="base-table-msg">
          <el-card shadow="never" class="table-card position-r">
            <!-- 量表 name -->
            <div class="tit-ans1">
              <span style="z-index: 999;">{{name}}</span>
              <span class="border-btm">{{name}}</span>
            </div>
            <!-- 答题 -->
            <div class="problem">
              <div v-show="index===curId" v-for="(item, index) in scaleList" :key="index">
                <div class="quession-title">
                  <span>{{item.questionnumber + '&nbsp;.&nbsp;&nbsp;'}}</span>
                  <span v-html="item.content">{{item.content}}</span>
                </div>
                <el-radio-group v-model="scoreStr[index]">
                  <el-radio
                    @change="getVal(items,index)"
                    v-for="(items,optionIndex) in item.ownOption"
                    class="options"
                    :label="optionIndex"
                    :key="optionIndex"
                  >
                    <i class="radio-i" style="background: #fc994a"></i>
                    {{items}}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <!-- 按钮 -->
            <div class="last" v-if="curId != 0">
              <el-button @click="lastBtn"
              style="color:#fff;padding: 8px 25px;border-radius: 20px;background: linear-gradient(90deg, #FFA256 0%, #EB6000 100%);border: none;outline: none;">上一题</el-button>
            </div>
            <div class="submit"
              v-if="curId == scaleList.length -1 || percentage == 100 || allTiShow">
              <el-button @click="taskSubmit" :loading="isSubmit"
              style="color:#fff;padding: 8px 31px;border-radius: 20px;background: linear-gradient(90deg, #FFA256 0%, #EB6000 100%);border: none;outline: none;">提交</el-button>
            </div>
            <!-- tit -->
            <el-row class="progress">
              <el-col :span="24" class="title-dt">
                <span class="pos-left" style="color:gray">答题进度</span>
                <el-progress :percentage="percentage" :stroke-width="16" status="warning" :text-inside="true"></el-progress>
                <div class="pos-right" v-show="index===curId" v-for="(item, index) in scaleList" :key="index">
                  <span style="color:gray;padding-right:5%">第{{item.questionnumber}}题/共{{scaleList.length}}题</span>
                  <span style="color:gray">
                    测评时长：
                  </span>
                  <count-up @countUpEnd="countUpEnd" :remainTime="remainTime" style="color:gray"></count-up>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <!-- 答题卡 -->
      <el-row class="mechanism-msg">
        <el-col :span="24" class="base-table-msg">
          <el-card shadow="never" class="table-card" style="padding: 1.8% 4% !important;">
            <div class="tab font-size"><i class=" tab el-icon-document-copy" style="color:#aeaeae;padding-right:10px"></i>答题选项卡</div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
              <div class="answerBox">
                <div class="serial-btn">
                  <el-button
                    :disabled="scoreStr.length < index"
                    v-for="(item,index) in items"
                    :key="index"
                    round
                    class="my-round"
                    :style="{opacity: item.islook && scoreStr[index].length == 0 && index != curId? '.65' : '1'}"
                    :type="scoreStr[index].length != 0 ? 'warning' : !item.islook && scoreStr[index].length != 0 ? 'info' : ''"
                    @click="tab(index, item)">{{index + 1}}</el-button>
                </div>
              </div>
            </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { answerList, saveSubmit } from '@/api/user/psyExamintion'
import countUp from '../components/countUp'
const time = 0 // 答题间隔
const allTiShow = false // 是不是直接完成答题
const allTiNum = 1 // allTiShow为true时，选择第几道题目 从0开始 0为第一道题

export default {
  name: 'MeasureDetail',
  components: {
    countUp
  },
  data () {
    return {
      clientHeight: 0,
      id: '',
      name: '',
      allTiShow: allTiShow, // 是不是直接完成答题
      allTiNum: allTiNum, // 选择第几道题目
      isSubmit: false, // 是不是正在提交
      useTime: '',
      resourceList: {},
      isAnswer: true,
      timer: null,
      second: time,
      taskType: '',
      percentage: 0,
      remainTime: '',
      curId: 0,
      items: [],
      resultStr: [],
      scoreStr: [],
      //    taskList:[],
      taskParam: {
        scaleid: '',
        testtime: '',
        resultstr: '',
        scorestr: ''
      },
      contents: [],
      scaleList: [],
      isLoad: false
    }
  },
  async created () {
    this.getParams()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.taskParam.scaleid = this.id
    }

    await this.getTopicList()
    if (this.scaleList.length != 0) {
      this.scaleList.forEach(item => {
        item.ownOption = item.ownoption.split('#')
        item.ownValue = item.ownvalue.split('#')
      })
      this.scaleList.forEach(item => {
        this.items.push({
          islook: false
        })

        if (this.allTiShow) {
          this.scoreStr.push(this.allTiNum)
          this.resultStr.push(parseInt(item.ownValue[this.allTiNum]))
        } else {
          this.scoreStr.push('')
        }
      })
      this.items[0].islook = true
    }
    this.second = time
    this.setTime()
  },
  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取屏幕可视区高度
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        if (!this.familyShow) {
          this.clientHeight = this.clientHeight + 500
        }
        this.familyShow = true
      }
      if (scrollTop > 700) {
        if (!this.testShow) {
          this.clientHeight = this.clientHeight + 500
        }
        this.testShow = true
      }
      if (scrollTop > 1000) {
        if (!this.xlShow) {
          this.clientHeight = this.clientHeight + 500
        }
        this.xlShow = true
      }
      if (scrollTop > 1400) {
        this.xzShow = true
      }
    },
    getTopicList () {
      let that = this
      return new Promise (function(resolve, rej) {
        answerList(that.id)
          .then(res => {
            if (res.code == 0) {
              let data = res.data
              that.scaleList = data
              that.isLoad = true
              resolve(res.data)
            } else {
              rej(res)
            }
          })
          .catch(error => {
            rej(error)
          })
      })
    },
    getVal (value, index) {
      this.resultStr[index] = this.scaleList[index].ownOption.map(item => item).indexOf(value) + 1
      let that = this
      if (this.curId < this.scaleList.length - 1 && this.second == 0) {
        that.$nextTick(() => {
          that.curId++
          that.items[that.curId].islook = true
          that.second = time
          clearInterval(that.timer)
          that.setTime()
        })
      } else {
        this.answerTime()
      }
      let haveVal = 0
      this.scoreStr.forEach(item => {
        if (item.length != 0) {
          haveVal++
        }
      })
      this.percentage = parseInt((haveVal / this.scaleList.length) * 100)
    },

    tab (index, item) {
      if (item.islook == true) {
        this.curId = index
      }
    },
    answerTime () {
      let that = this
      if (that.second > 0) {
        that.$confirm('答题太快了，请认真读题！', '操作提示', {
          showCancelButton: false,
          closeOnClickModal: false,
          customClass: 'my-base-confirm',
          type: 'warning',
          callback: () => {
            that.$set(that.scoreStr, that.curId, '')
          }
        })
      }
    },
    setTime () {
      let _this = this
      if (_this.second > 0) {
        this.timer = setInterval(function() {
          _this.second--
          if (_this.second == 0) {
            clearInterval(_this.timer)
          }
        }, 1000)
      }
    },
    nextBtn () {
      this.curId++;
      this.items[this.curId].islook = true;
    },
    lastBtn () {
      this.curId--
      this.items[this.curId].islook = true
    },
    // 测试提交
    taskSubmit () {
      let _this = this
      let sum = 0
      this.scoreStr.forEach(item => {
        if (item.length == 0) {
          sum++
        }
      })
      if (sum > 0) {
        this.$message({
          message: '您还有' + sum + '道题没有回答，请回答',
          type: 'warning'
        })
      } else {
        if (this.isSubmit) {
          return
        }
        this.isSubmit = true
        let arr = []
        this.taskParam.testtime = this.useTime
        this.taskParam.resultstr = this.resultStr.join("#")
        this.scoreStr.forEach((item, index) => {
          let ownValue = _this.scaleList[index].ownValue
          let val = ownValue[item]
          arr.push(val)
        })
        this.taskParam.scorestr = arr.join("#")
        saveSubmit(this.taskParam)
          .then(res => {
            if (res.code == 0) {
              this.$message.success("提交成功，可在报告中查看!")
              this.$router.push({
              path: '/psyExamintion/reportDetail',
              query: {
                id: res.data
              }
            })
            } else {
              let msg = res.message ? res.message : '提交失败！'
              this.$message.error(msg)
            }
            this.isSubmit = false
          })
          .catch(() => {
            this.isSubmit = false
          })
      }
    },

    // 计时
    countUpEnd (val) {
      this.useTime = val
    },

    getParams () {
      const id = this.$route.query.id
      const name = this.$route.query.name
      this.id = id
      this.name = name
    }
  }
}
</script>

<style lang="scss">
.wrapexam {
  width: 64%;
  margin: 0 auto;
  padding: 1% 0;
  .font-size{
    color: #ffa256;
  }
  .el-progress-bar__inner{
    background: #ffa256 !important;
  }
  .base-table-msg .table-card{
    padding: 1% 12% !important;
  }
  .mechanism-msg{
      padding-top: 20px;
  }
  .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  .problem {
    height: 340px;
    box-sizing: border-box;
    padding: 4% 10% 0 10%;
    .options {
      display: block;
      line-height: 40px;
    }

    .quession-title {
      font-size: 16px;
      margin-bottom: 10px;
      color: #333;
      img {
        width: 220px;
        vertical-align: top;
      }
    }
    .el-radio__label {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px !important;
      white-space: normal;
      line-height: 26px;
      color: #999;
    }
  }
  .my-round span {
    margin-left: -2px;
  }

  .content-title {
    line-height: 96px;
    height: 96px;
    text-align: center;
    border-bottom: 1px solid #eaedf2;
    box-sizing: border-box;
    font-size: 22px;
  }

  .progress {
    padding: 0 10%;
    text-align: center;
    line-height: 24px;
    .title-dt {
      position: relative;
      padding: 20px 250px 20px 70px;
      .pos-left,
      .pos-right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .pos-left {
        left: 0;
      }
      .pos-right {
        right: 0;
        width: 240px;
      }
    }
  }

  .submit {
    position: absolute;
    bottom: 87px;
    left: 34%;
    margin-right: -10px;
  }
  .last {
    position: absolute;
    bottom: 87px;
    left: 20%;
    margin-right: -10px;
  }

  .tab {
    text-align: left;
    line-height: 37px;
    font-size: 17px;
    padding-left: 5px;
  }

  .answerBox {
    height: 122px;
  }

  .common {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 10px;
    border-radius: 50%;
    cursor: pointer;
  }

  .num {
    background: #eb6100;
    color: #fff;
  }

  .active {
    border: 1px solid #eb6100;
    color: #eb6100;
    background: #fff;
  }

  .gray {
    background: #e1e2e4;
    color: #fff;
  }

  .no-answer {
    background: #f5b07f;
    color: #fff;
  }

  .my-round {
    display: inline-block;
    padding: 9px 0 !important;
    width: 32px !important;
    margin: 4px 6px;
  }
  .serial-btn .el-button--small.is-round {
    margin: 6px;
  }
  // 量表名
  .tit-ans1{
    width: 100%;
    text-align: center;
    font-size: 20px;
    padding-top: 2%;
    color: #000;
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
  .border-btm{
    border-top: 10px solid #ffd2ae;
    padding: 0 2%;
    margin: -1% auto;
    text-align: center;
    color: #fff;
  }
  .el-progress.is-warning .el-progress-bar__inner{
    background: #FFA256 !important;
  }
  .el-button--warning{
    background: #FFA256 !important;
    border: none !important;
    outline: none !important;
  }
  .el-radio__input.is-checked .el-radio__inner{
    background: #FFA256;
    border-color: #FFA256;
  }
  .el-button:focus,.el-button:hover{
    background: #fff;
    border-color: #dcdfe6;
    color: #656e74;
  }
}
</style>
