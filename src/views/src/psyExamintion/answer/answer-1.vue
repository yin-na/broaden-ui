
<template>
  <div class="wrapexam-1" :style="{minHeight: clientHeight  + 'px'}">
      <!-- 测评 -->
      <el-row :gutter="10">
        <el-col :span="24" class="base-table-msg">
          <el-card shadow="never" class="table-card position-r">
            <!-- tit -->
            <div class="tit-ans1">
              <span style="z-index: 999;">舒格特方格训练</span>
              <span class="border-btm"></span>
            </div>

            <!-- 答题 -->
            <div class="problem">
              <div v-show="index===curId" v-for="(item, index) in scaleList" :key="index">

                <!-- 方格 -->
                <div v-for='(item, index) in randpermList' :key='index' >
                  <div class="list-btn fl" :class="{colorChange:item == dynamic}" @click="sortList(item)">
                    <span class="num-list">{{item}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 计时 -->
            <el-row class="progress">
              <el-col :span="24" class="title-dt">
                <div class="pos-right" v-show="index===curId" v-for="(item, index) in scaleList" :key="index">
                  <span style="color:gray">
                    计时：
                  </span>
                  <count-up @countUpEnd="countUpEnd" :remainTime="remainTime"></count-up>
                </div>
              </el-col>
            </el-row>

<!--       修改成点击最后一个自动提交     -->
<!--            <div class="submit" v-if="curId == scaleList.length -1 || percentage == 100 || allTiShow">-->
<!--              <el-button type="warning" @click="taskSubmit" :loading="isSubmit">提交</el-button>-->
<!--            </div>-->
          </el-card>
        </el-col>
      </el-row>
      <!-- 结束 -->
  </div>
</template>

<script>
import { answerList, saveSubmit } from '@/api/user/psyExamintion'
import countUp from '../components/countUp'
// const time = 2 // 答题间隔
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
      randpermList: [],
      thisClikNum: 1,
      dynamic: -1,
      List: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
      allTiShow: allTiShow, // 是不是直接完成答题
      allTiNum: allTiNum, // 选择第几道题目
      isSubmit: false, // 是不是正在提交
      useTime: "",
      resourceList: {},
      isAnswer: true,
      timer: null,
      second: time,
      taskType: "",
      percentage: 0,
      remainTime: 60,
      curId: 0,
      items: [],
      resultStr: [],
      scoreStr: [],
      taskParam: {
        scaleid: '',
        testtime: ''
      },
      contents: [],
      scaleList: [],
      isLoad: false
    }
  },
  async created () {
    this.getParams()
    this.random()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.taskParam.scaleid = this.id
    }

    await this.getTopicList()
    if (this.scaleList.length != 0) {
      this.scaleList.forEach(item => {
        item.ownOption = item.ownoption.split("#")
        item.ownValue = item.ownvalue.split("#")
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
    getTopicList () {
      let that = this
      return new Promise(function (resolve, rej) {
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

    // 获取屏幕高度
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

    setTime () {
      let _this = this;
      if (_this.second > 0) {
        this.timer = setInterval(function() {
          _this.second--;
          if (_this.second == 0) {
            clearInterval(_this.timer);
          }
        }, 1000);
      }
    },
    // 测试提交
    taskSubmit () {
      if ((this.thisClikNum-1) === this.randpermList.length) {
        let _this = this
        this.isSubmit = true
        this.taskParam.testtime = this.useTime
        saveSubmit(this.taskParam)
          .then(res => {
            if (res.code == 0) {
              this.$message.success('提交成功，可在报告中查看!')
              this.$router.push({
                path: '/psyExamintion/reportDetail-1',
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
      } else {
        this.$message('未做完，请继续完成闯关！')
      }
    },

    // 倒计时
    countDowmEnd (val) {
      this.useTime = val
    },
    countUpEnd (val) {
      this.useTime = val
    },
    getParams () {
      const id = this.$route.query.id
      this.id = id
    },
    // 生成1-25随机数组
    random () {
      var length = this.List.length
      for (var i=0; i<length; i++) {
        var random = Math.random() * this.List.length
        this.randpermList.push(this.List.splice(random, 1)[0])
      }
    },
    // 点击顺序排列
    sortList (item) {
      if (item === this.thisClikNum) {
        this.thisClikNum = item + 1
        this.dynamic = item
        if ((this.thisClikNum - 1) === this.randpermList.length) {
          // 点击最后一个提交
          this.taskSubmit()
        }
      } else {
        this.$message('点错了，请继续选择！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapexam-1 {
  width: 64%;
  margin: 0 auto;
  padding: 1% 0;
}
.font-size{
  color: #ffa256;
}
.el-progress-bar__inner{
  background: #ffa256 !important;
}
.mechanism-msg{
    padding-top: 20px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.problem {
  box-sizing: border-box;
  width: 446px;
  height: 446px;
  cursor: pointer;
  /* IE5 */
  cursor: hand;
  text-align: center;
  margin: 0 auto;
  .options {
    display: block;
    line-height: 40px;
  }

  .quession-title {
    font-size: 18px;
    margin-bottom: 10px;
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
  padding: 2% 0;
  text-align: center;
  color: gray;
  font-size: 20px;
}

.submit {
  text-align: center;
}
.last {
  position: absolute;
  bottom: 60px;
  right: 70%;
  margin-right: -10px;
}

.tab {
  text-align: left;
  line-height: 37px;
  font-size: 17px;
}

.answerBox {
  min-height: 200px;
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
  margin: 4px 10px;
}
.serial-btn .el-button--small.is-round {
  margin: 6px;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 1% 3%;
  font-size: 16px;
  background: linear-gradient(90deg, #FFA256 0%, #EB6000 100%);
  border-radius: 20px;
  border: none;
  outline: none;
}
.tit-ans1{
  text-align: center;
  position: relative;
  padding: 1% 0 4% 0;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  display: flex;
  flex-direction: column;
}
.border-btm{
  border: 4px solid #ffd2ae;
  width: 15%;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 36%;
  left: 42.5%;
}

// 方格样式
.list-btn{
  width: 80px;
  height: 80px;
  margin: 1%;
  text-align: center;
  background: #ffd2ae;
  color: #fff;
}
.colorChange {
    background-color: #F36321;
    color: #fff;
  }
.el-card{
  background: none !important;
  border: none !important;
}
.num-list{
  line-height: 80px;
  font-size: 38px;
}
</style>
