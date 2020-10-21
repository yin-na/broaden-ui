<template>
  <div class="brainwarp">
    <div class="contenttop">
      <div class="brainLeft">
        <!-- 用户信息 -->
        <div class="userInfo">
          <div class="userLogo">
            <div class="logo">
              <img :src="userInfo.avatar" alt />
            </div>
            <div class="username">
              <div class="fs20 color3">
                {{userInfo.userName}}
                <span class="fs16 color9" style="margin-left:10px">心理呵护第{{userInfo.days}}天</span>
              </div>
              <div class="fs16 color9 disflex spaceevenly">
                <span v-if="userInfo.sex == '0'">性别：男</span>
                <span v-if="userInfo.sex == '1'">性别：女</span>
                <span>年龄：{{userInfo.age}}</span>
              </div>
            </div>
          </div>
          <div class="fs16 color9 disflex spacebetween">
            <div style="padding-top:16px">
              <div>{{month}}月共测试</div>
              <div>
                训练
                <span class="fs20 color6">{{userInfo.relaxNum}}</span>次
              </div>
            </div>
            <div>
              <div>
                <span style="color:#0FD1DD;font-size:32px;font-weight:bold">{{userInfo.finishNum}}</span>次
              </div>
              <div>完成训练</div>
            </div>
            <div>
              <div>
                <span style="color:#eb6100;font-size:32px;font-weight:bold">{{userInfo.courseNum}}</span>节
              </div>
              <div>完成课程</div>
            </div>
          </div>
        </div>
        <div class="comLogo">
          <img src="@/assets/naobo/polygon.png" alt />
        </div>
      </div>
      <div class="brainRight">
        <div class="Statistics">
          <div class="mb35 disflex spacebetween">
            <span class="fs18 color3 fwb">认知能力训练统计:</span>
            <span class="fs14 color6">训练时间：{{trainTime}}</span>
          </div>
          <!-- 进度条 -->
          <div class="progress" v-if='gressItem.length!=0'>
            <div  v-for="(item,index) in gressItem" :key="index" class="gressItem">
              <div
                class="fs14 color9"
                style="margin-right:12px;width:57px;text-align:right"
              >{{item.abilityName}}</div>
              <div style="width:437px;height:16px">
                <el-progress
                  :stroke-width="16"
                  :percentage="item.total"
                  :text-inside="true"
                  :color="item.color"
                ></el-progress>
              </div>
              <div class="fs14 color9" style="line-height:14px;margin-left:16px">
                优于{{item.overThanUsers}}%人群，评价等级：
                <span v-if="item.total > 0 && item.total <= 10">较差</span>
                <span v-else-if="item.total > 10 && item.total <= 45">一般</span>
                <span v-else-if="item.total > 45 && item.total < 70">良好</span>
                <span v-else-if="item.total >= 70 && item.total < 80">一般</span>
                <span v-else-if="item.total >= 80">很好</span>
              </div>
            </div>
          </div>
          <div v-else>
           <div  class='textCet' style="text-align: center;padding-top:30px;font-size: 20px;"> 暂无数据</div>
          </div>
        </div>
        <div class="brainTable">
          <!-- 选择日期 -->
          <el-date-picker
            v-model="value"
            type="month"
            format="选择：yyyy 年 MM 月 "
            placeholder="请选择日期"
            :picker-options="pickerOptions"
            @change="getDate"
          ></el-date-picker>
          <el-table
            :data="tableData"
            style="width: 100%;min-height:272px;border:1px solid #ddd"
            :default-sort="{prop: 'createTime', order: 'brainNum'}"
            :row-style="{height:'45px',fontSize:'14px',color:'#999999'}"
            :header-row-style="{backgroundColor:'#ECFAFF',height:'45px',color:'#666666'}"
          >
            <el-table-column label="体验设备" align="center">
              <div>
                <div>脑波认知训练</div>
              </div>
            </el-table-column>
            <el-table-column
              prop="createTime"
              sortable
              width="190"
              label="训练时间（年/月/日）"
              align="center"
            ></el-table-column>
            <el-table-column prop="brainNum" label="脑力指数" align="center" sortable></el-table-column>
            <el-table-column prop="userId" label="详情" align="center">
              <template slot-scope="scope">
                <div class="dialog">
                  <!-- <div class='lookdetail' @click="gotodetails()" style="color:#F36421;cursor: pointer;"><span>查看</span></div> -->
                  <div
                    class="lookdetail"
                    @click="gotodetails(scope.row.id)"
                    style="color:#F36421;cursor: pointer;"
                  >
                    <span>查看</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="paginfooter">
            <el-pagination background layout="prev, pager, next" :page-size="5" :total="total0"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="contentButtom">
      <div class="SplitLine">
        <div style="padding: 4.5px 0;">
          <img src="@/assets/user/line.png" alt />
        </div>
        <span
          style="font-size: 20px;color:#eb6100;font-weight:bold;min-width:120px;margin-left: 12px;"
        >脑波认知训练</span>
        <div
          style="width: calc(100% - 201px);height: 1px; border-top: 1px dashed #eb6100;margin: 15px 0 0 16px; "
        ></div>
      </div>
      <div class="disflex">
        <div style="width:50%;text-align:center;padding-top:28px">
          <img src="@/assets/naobo/brainWave.png" alt />
        </div>
        <div style="width: 50%;">
          <div class="bntit">脑波认知训练的意义</div>
          <div
            class="fs14 color9"
            style="margin:29px 0 56px"
          >大脑的认知能力是指人脑对事物的构成、性能与他物的关系、发展的动力、发展方向以 及基本规律的把握能力，是人们成功完成活动的最重要心理条件。</div>
          <div>
            <span class="tits">信息加工：</span>
            <span class="infos">高效择取信息并对其处理运算，反应敏捷，思维速度</span>
          </div>
          <div>
            <span class="tits">注意：</span>
            <span class="infos">集中心理能量，提升注意品质，抑制干扰，保证最佳效率</span>
          </div>
          <div>
            <span class="tits">空间认知：</span>
            <span class="infos">有效把握物理空间关系，对位置和空间关系的感知敏锐</span>
          </div>
          <div>
            <span class="tits">记忆：</span>
            <span class="infos">高效编码、存储和提取信息，知识储备丰富雄厚，条理明晰</span>
          </div>
          <div>
            <span class="tits">情绪能力：</span>
            <span class="infos">察觉情绪，对情绪进行有效把控，保持乐观平和的心态</span>
          </div>
          <div>
            <span class="tits">问题解决：</span>
            <span class="infos">思维操作缜密，高效突破问题困境，头脑清晰，有创造力</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chartMain, courseReport, queryCardInfo } from '@/api/user/psyExamintion'
export default {
    data(){
        return{
            gressItem: [],
            trainTime: '',
            tableData: [],
            userInfo: [],
            total0: 0,
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
            value:'',
            month: '',
            query:{
                 date:''
            }
        }
    },
    created(){
        var date = new Date()
        this.getDate(date)
        this.initData()
        this.cardList()
    },
    methods:{
        initData () {
            chartMain().then(res => {
                this.gressItem = res.data.deepList==null?[]:res.data.deepList
                this.trainTime = res.data.trainTime
            })
            //  列表
            courseReport(this.query.date).then(res => {
                this.tableData = res.data.data
                this.total0 = res.data.total
            })
        },
        cardList () {
            // 用户信息卡片
            queryCardInfo(this.query.date).then(res => {
                this.userInfo = res.data
            })
        },
        // 时间条件查询
        getDate (val) { // 转换时间格式
            var dt = new Date(val)
            var year = dt.getFullYear()
            var month = dt.getMonth() + 1
            var day = dt.getDate()
            var days = year + '-' + month + '-' + day
            this.month = month
            this.value = days
            this.query.date = days

            //  列表
            courseReport(days).then(res => {
                this.tableData = res.data.data
                this.total0 = res.data.total
            })
            this.cardList()
        },
        gotodetails (id) {
            this.$router.push({
                path: '/BrainWave/detail',
                query: {
                    id: id
                }
            })
        }
    }
}   
</script>

<style lang="less" scoped>
.brainwarp {
  width: 1200px;
  margin: 0 auto;
  padding: 70px 0 150px;
  .contenttop {
    display: flex;
    justify-content: space-between;
    .brainLeft {
      width: 355px;
      .userInfo {
        height: 320px;
        border-radius: 8px;
        padding: 56px 24px 64px 28px;
        background-color: #fff;
        .userLogo {
          display: flex;
          margin-bottom: 60px;
          .logo {
            width: 85px;
            height: 85px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .username {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
          }
        }
      }
      .comLogo {
        height: 400px;
        border-radius: 8px;
        background-color: #fff;
        margin-top: 30px;
        padding-top: 64px;
        text-align: center;
      }
    }
    .brainRight {
      width: 815px;
      .Statistics {
        height: 320px;
        background-color: #fff;
        border-radius: 8px;
        padding: 28px 40px 24px 45px;
        .progress {
          margin-top: 30px;
          .gressItem {
            display: flex;
            margin-bottom: 15px;
          }
        }
      }
      .brainTable {
        height: 400px;
        margin-top: 30px;
        background-color: #fff;
        border-radius: 8px;
        padding: 0 45px;
        ::v-deep.el-input__inner {
          border: none;
          background: linear-gradient(
            90deg,
            #ff9844 0%,
            #fe632f 50%,
            #f1511b 100%
          );
          width: 192x;
          height: 35px;
          cursor: pointer;
          text-align: center;
          color: #fff;
          border-radius: 18px;
          margin: 19px 0 15px;
        }
        // ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner{
        //     margin-left: 504px;
        // }
        ::v-deep .el-icon-date {
          display: block !important;
          color: #fff;
          margin: 16% 0 0 5%;
          font-size: 16px;
          line-height: 65px;
        }
        ::v-deep .el-input__icon {
          display: none;
        }
      }
    }
  }
  .contentButtom {
    height: 677px;
    margin-top: 30px;
    border-radius: 8px;
    padding: 55px 40px;
    background-color: #fff;
    .SplitLine {
      display: flex;
      vertical-align: middle;
      margin-bottom: 90px;
    }
    .SplitLine img {
      width: 21px;
      height: 21px;
    }
    .bntit {
      height: 22px;
      border-left: 6px solid #f36421;
      padding-left: 10px;
      font-size: 22px;
      line-height: 22px;
      font-weight: bold;
      color: #333;
    }
    .tits {
      display: inline-block;
      font-size: 16px;
      color: #5cb0ff;
      width: 80px;
      text-align: right;
      margin-bottom: 28px;
    }
    .infos {
      font-size: 16px;
      color: #999;
    }
  }
}
// 分页
.paginfooter {
  width: 100%;
  margin-top: 15px;
  text-align: end;
}
</style>
