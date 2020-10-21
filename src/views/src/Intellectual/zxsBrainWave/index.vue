<template>
  <div class="brainwarp">
    <div class="contenttop">
      <div class="brainLeft">
        <!-- 用户信息 -->
        <div class="userInfo">
          <div class="fs18 color6 fwb">任务单位:</div>
          <div class="fs18 color21 fwb">{{userInfo.deptName}}</div>
          <div class="useNum">
            <div style="text-align:center">
              <img src="@/assets/naobo/smalLogo.png" alt />
              <div class="fs16 color9">使用设备</div>
            </div>
            <div>
              <div class="fs16" style="height:50px;padding-top:30px">
                <span class="fs22">{{userInfo.days}}</span>次
              </div>
              <div class="fs16 color9" style='margin-top:13px'>使用次数</div>
            </div>
          </div>
        </div>
        <div class="comLogo">
          <img src="@/assets/naobo/polygon.png" alt />
        </div>
      </div>
      <div class="brainRight">
        <div class="Statistics">
          <userchart :xdays="this.lineData.xdays" :shoutNums="this.lineData.shoutNums"></userchart>
          <div style="position:absolute;top:0;right:45px">
            <el-date-picker
              v-model="curve"
              type="month"
              format="选择：yyyy 年 MM 月 "
              placeholder="请选择日期"
              :picker-options="pickerOptions"
              @change="getLine"
            ></el-date-picker>
          </div>
        </div>
        <div class="brainTable" style=" padding-top:70px;">
          <!-- 选择日期 -->
          <div style="position:absolute;top:0;right:45px">
            <el-date-picker
              v-model="value"
              type="month"
              format="选择：yyyy 年 MM 月 "
              placeholder="请选择日期"
              :picker-options="pickerOptions"
              @change="getDate"
            ></el-date-picker>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%;min-height:272px;border:1px solid #ddd;"
            :default-sort="{prop: 'date', order: 'descending'}"
            :row-style="{height:'45px',cursor:'default', fontSize:'14px',color:'#999999'}"
            :header-row-style="{backgroundColor:'#ECFAFF',height:'45px',color:'#666666'}"
          >
            <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
            <el-table-column label="体验设备" align="center">
              <div>
                <div>脑波认知训练</div>
              </div>
            </el-table-column>
            <el-table-column
              prop="createTime"
              sortable
              width="210"
              label="训练时间（年/月/日）"
              align="center"
            ></el-table-column>
            <el-table-column prop="brainNum" label="脑力指数" align="center" sortable></el-table-column>
            <el-table-column prop="userId" label="详情" align="center">
              <template slot-scope="scope">
                <div class="dialog">
                  <div
                    class="lookdetail cursorer"
                    @click="gotodetails(scope.row.id)"
                    style="color:#F36421;"
                  >
                    <span>查看</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="paginfooter">
            <el-pagination background layout="prev, pager, next" :page-size="5" :total="total"></el-pagination>
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
import userchart from "./components/brainwave";
import {
  getBraveCurve,
  queryCardInfo,
  courseReport,
} from "@/api/user/psyExamintion";
import { resOk } from "@/settings";
export default {
  components: { userchart },
  data() {
    return {
         pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
      gressItem: [
        {
          name: "信息加工",
          color: "#f56c6c",
          progress: 20,
          percentage: 61,
          level: "较好",
          color: "#5CB0FF",
        },
        {
          name: "情绪能力",
          color: "#f56c6c",
          progress: 20,
          percentage: 61,
          level: "较好",
          color: "#DE73F5",
        },
        {
          name: "注意",
          color: "#f56c6c",
          progress: 20,
          percentage: 61,
          level: "较好",
          color: "#41D380",
        },
        {
          name: "空间认知",
          color: "#f56c6c",
          progress: 20,
          percentage: 61,
          level: "较好",
          color: "#6272FD",
        },
        {
          name: "记忆",
          color: "#f56c6c",
          progress: 20,
          percentage: 61,
          level: "较好",
          color: "#FF7271",
        },
        {
          name: "问题解决",
          color: "#f56c6c",
          progress: 20,
          percentage: 61,
          level: "较好",
          color: "#FF9D52",
        },
      ],
      tableData: [],
      value: "",
      curve: "",
      total: 0,
      lineData: {
        shoutNums: "",
        xdays: "",
      },
      query: {
        date: "",
      },
      userInfo: [],
    };
  },
  created() {
    var date = new Date();
    this.getDate(date);
    this.getLine(date);
    this.cardList();
  },
  methods: {
    // 时间条件查询
    getDate(val) {
      // 转换时间格式
      var dt = new Date(val);
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();
      var days = year + "-" + month + "-" + day;
      this.month = month;
      this.value = days;
      this.query.date = days;

      //  列表
      courseReport(days).then((res) => {
        this.tableData = res.data.data;
        this.total0 = res.data.total;
      });
      this.cardList();
    },
    getLine(val) {
      var dt = new Date(val);
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();
      var days = year + "-" + month + "-" + day;
      this.month = month;
      this.curve = days;
      this.query.date = days;
      this.getBraveCurve();
    },
    gotodetails(id) {
      this.$router.push({
        path: "/zxsBrainWave/detail",
        query: {
          id: id,
        },
      });
      console.log(id);
    },
    getBraveCurve() {
      getBraveCurve(this.curve).then((res) => {
        if (res.code == resOk) {
          this.lineData = res.data;
        }
      }),
        //  列表
        courseReport(this.query.date).then((res) => {
          this.tableData = res.data.data;
          this.total0 = res.data.total;
        });
    },
    cardList() {
      // 用户信息卡片
      queryCardInfo(this.query.date).then((res) => {
        this.userInfo = res.data;
        this.userInfo.days=this.userInfo.days==null?'0':this.userInfo.days
      });
    },
  },
};
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
        padding: 56px 33px 64px 36px;
        background-color: #fff;
        .useNum {
          width: 100%;
          display: flex;
          justify-content: space-around;
          margin-top: 70px;
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
        color: #fff !important;
        border-radius: 18px;
        margin: 19px 0 15px;
      }
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
      .Statistics {
        height: 320px;
        background-color: #fff;
        border-radius: 8px;
        position: relative;
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
        position: relative;
        padding: 0 45px;
        .paginfooter {
          width: 100%;
          margin-top: 15px;
          text-align: center;
        }
        .cell {
          cursor: default;
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
</style>