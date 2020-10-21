<template>
    <div class="capsule">
        <div style="display: flex;">
            <div class="infomation">
                <div class="infoTop">
                    <div class="userProfile">
                        <img :src="userData.avatar" alt="">
                    </div>
                    <div class="userInfo">
                        <span class="userName">{{userData.userName}}</span>
                        <span style="color:#999;display: block;">心理呵护第{{userData.days}}天</span>
                        <div class="sexAge">
                            <span>性别：{{userData.sex}}</span>
                            <span>年龄：{{userData.age}}</span>
                        </div>
                    </div>
                </div>
                <div class="resultNum" style="display: flex;justify-content: space-evenly;margin-top:79px">
                    <div class="monthTry">{{month}}月共检测调养<span
                            style="color: #333; font-weight: bold;font-size: 18px; margin: 0 5px;">{{userData.relaxNum}}</span>次
                    </div>
                    <div class="numLeft">
                        <div class='tryTimes'>
                            <span style="color:#0FD1DD">{{userData.normalNum}}</span>
                            <span style="font-size: 15px;line-height:48px;margin-left: 0;">次</span>
                        </div>
                        <span>正常</span>
                    </div>
                    <div class='numright'>
                        <div class='tryTimes' style="">
                            <span style="color:#eb6100">{{userData.abnormalNum}}</span>
                            <span style="font-size: 15px;line-height:48px;margin-left: 0;">次</span>
                        </div>
                        <span>异常</span>
                    </div>
                </div>
            </div>
            <userInfo :xdays="this.lineData.xdays" :shoutNums="this.lineData.shoutNums"></userInfo>

        </div>
        <div style="display:flex">
            <div class="itemLeft">
                <img src="@/assets/user/picture.png" alt="">
            </div>
            <div class="itemRight">
                <!-- 选择日期 -->
                <el-date-picker v-model="value" type="month" format="选择：yyyy 年 MM 月 "  placeholder="请选择日期" @change="getDate" :picker-options="pickerOptions">
                </el-date-picker>
                <el-table :data="tableData" style="width: 100%;min-height:246px"  :default-sort="{prop: 'date', order: 'descending'}"
                :header-row-style="{background:'#ecfaff'}"
                >
                    <el-table-column prop="source" label="放松设备">
                        <template slot-scope='scope'>
                            <div v-if="scope.row.source==0">
                                <div>心理减压太空舱</div>
                            </div>
                            <div v-if="scope.row.source==1">
                                <div>心理减压调养舱</div>
                            </div>
                            <div v-if="scope.row.source==2">
                                <div>生物生理反馈平台</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" sortable width="190" label="放松时间" >
                    </el-table-column>
                    <el-table-column prop="averageHeartRate" label="心率(次/分)">
                    </el-table-column>
                    <el-table-column prop="trainDuration" label="放松时长(分钟)">
                    </el-table-column>
                    <el-table-column prop="userId" label="详情">
                        <template slot-scope='scope'>
                            <div class="dialog">
                                <div class='lookdetail' @click="gotodetails(scope.row.detectionId)"><span>查看</span></div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                    <div class="pagination">
                        <el-pagination background layout="prev, pager, next" :page-count='pagecount' :page-size="5" @current-change='currentpage'></el-pagination>
                    </div>

            </div>
        </div>


        <div class="itemBottom">
            <div class="SplitLine">
                <div style="padding: 4.5px 0;">
                    <img src="@/assets/user/line.png" alt="">
                </div>
                <span style='font-size: 20px;color:#eb6100;font-weight:bold;min-width:180px;margin-left: 12px;'>智能身心减压太空舱</span>
                <div
                    style="width: calc(100% - 201px);height: 1px; border-top: 1px dashed #eb6100;margin: 15px 0 0 16px; ">
                </div>
            </div>
            <div class="bottomLeftSS">
                <div style="margin:74px auto 78px;">
                    <div class="capsuleTitle">智能身心减压太空舱功能项目</div>
                  <div style="height:10px;width:342px;margin: -12px auto 38px;background-color:rgba(189,234,242,0.3)"></div>
                </div>
                <img src="@/assets/user/space1.png" alt="" >
                <div class="relaxDetails" style="text-align:left">
                    {{relax}}
                </div>
            </div>
            <div class="bottomRight">
                <div style="margin:74px 0 78px;">
                   <div class="capsuleTitle">智能身心减压太空舱适用领域</div>
                   <div style="height:10px;width:342px;margin: -91px 0 0 389px;background-color:rgba(189,234,242,0.3)"></div>
                </div>
                <div class="Domain">
                    <div v-for="(item,index) in Domaindata" :key="index">
                        <img :src="item.url" alt="">
                        <span class="fs18 color6">{{item.name}}</span>
                    </div>
                </div>
                <div class="Domain">
                    <div v-for="(item,index) in Domaindatatwo" :key="index">
                        <img :src="item.url" alt="">
                        <span class="fs18 color6">{{item.name}}</span>
                    </div>
                </div>
                <div class="relaxDetails">
                    {{relaxs}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userInfo from './components/userInfo'
import { cloudTable, frequency, HeartRateCurve } from '@/api/user/psyExamintion'
import { mapGetters } from 'vuex'
export default {
  components: {
    userInfo
  },
  data() {
    return {
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
        Domaindata:[
            {name:'中小学缓解心理压力',url:require('@/assets/user/pressure.png') },
            {name:'司法机构压力释放',url:require('@/assets/user/judicial.png')},
            {name:'大学生心理训练',url:require('@/assets/user/train.png')}
        ],
         Domaindatatwo:[
            {name:'医疗机构',url:require('@/assets/user/medical.png')},
            {name:'企事业机构',url:require('@/assets/user/mechanism.png')},
            {name:'心理咨询室',url:require('@/assets/user/Consultant.png')}
        ],
      value: '', // 选择的日期
      relaxs: '智能身心减压调养系统，又称为智能身心减压太空舱，是学校、公检法司、企事业单位、政府等系统心理咨询室建设方案、心理健康中心建设方案中心理放松室专用的心理放松设备。它综合香薰、五档位氧疗、负离子净化、足底滚轮按摩、腿部气囊按摩、腰部红外加热多种调养干预手段，多路径全维度干预方法（主动训练与物理干预可同步进行）HRV+SCL复合型生物反馈疗法、身心能静疗、多维体感音乐疗法、全息脑波音乐疗法、“零重力”体位放松、红外热疗、配方式疗法、渐进式肌肉松弛疗法，充分满足不同放松对象的训练需要。',
      relax: '应用静修调息(生物反馈)技术、自主进行情绪调控、压力调试、应激能力训练;结合全息脑克疗法(包括懈民冥想等方法)及通过音乐能量共振疗法,降低大脑噪声抑制亢奋,减少负性激素分泌,促进自主神经平衡。舒缓心血管紧型,深层放松调理身心。对慢性疲劳、慢病康复、心身疾病、失眠，焦虑。抑郁等有显著效果。',
      userData: {
        userName: '',
        relaxNum: '',
        days: '',
        sex: '',
        age: '',
        normalNum: '',
        abnormalNum: '',
        avatar: ''
      },
      lineData: {
        shoutNums: '',
        xdays: ''
      },
      month: '',
      query: {
        current: 1,
        date: '2020-03-01',
        size: '5',
        userId:'',
        source:0,
      },
      source:0,
      pagecount: 0, // 总页数
      tableData: []
    }
  },
  created () {
    this.getData()
    var date = new Date()
    this.getDate(date)
    this.getfrequency()
    this.getHeartRate()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    getHeartRate () {
      HeartRateCurve(this.source).then(res => {
        this.lineData = res.data
      })
    },
    getDate (val) {             // 转换时间格式
      var dt = new Date(val)
      var year = dt.getFullYear()
      var month = dt.getMonth() + 1
      var day = dt.getDate()
      var days = year + '-' + month + '-' + day
      this.month = month
      this.value = days
      this.query.date = days
      this.getData()
      this.getfrequency()
    },
    currentpage (page) {
        this.query.current=page
        if(this.query.relaxTime!=''){
            this.getData()
        }
    },
    getfrequency () {
      frequency(this.value,this.source).then(res => {
        this.userData = res.data
         this.userData.sex=this.userData.sex==0 ?'男':'女'
        })
    },
    gotodetails (id) {
      this.$router.push({
        path: '/psyEquip/module/toCapsuleDetails',
        query: { id: id }
      })
    },
    getData () {           // 表格数据
   this.query.userId=this.user.userId
      cloudTable(this.query).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
        this.pagecount = res.data.pages
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

    .monthTry {
        width: 76px;
        height: 46px;
        font-size: 16px;
        color: rgba(153, 153, 153, 1);
    }

    .sexAge {
        margin-top: 15px;
        color: #999;
        width:140px;
        display: flex;
        justify-content: space-between;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }


    .bottomLeftSS {
        margin-top: 53px;
        text-align: center;
        img{
            margin-bottom: 64px;
            width:100%
        }
        .capsuleTitle{
            font-size: 24px;
            color:#333;
            text-align: center;
        }
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
    .numLeft,
    .numright {
        color: #c3c3c3
    }

    .numLeft span {
        margin-left: 10%;
    }

    .numright span {
        margin-left:10%;
    }

    .userProfile {
        width: 85px;
        height: 85px;
        border-radius: 50%;
        overflow: hidden;
    }

    .userProfile img {
        width: 100%
    }

    .userInfo {
        margin-left: 20px
    }

    .userInfo span {
        /* display: block; */
        margin-bottom: 10px;
    }

    .tryTimes {
        width:100px;
        display: flex;
    }

    .tryTimes span {
        font-size: 32px;
        font-weight: bold;
    }

    .itemLeft {
        margin-top: 30px;
        width: 355px;
        height: 400px;
        background-color: #fff;
        border-radius: 10px;
        padding: 50px 34px;
    }

    .itemRight {
        width: 815px;
        height: 400px;
        padding: 0 46px;
        border-radius: 10px;
        background-color: #fff;
        margin: 30px 0 0 30px;
        ::v-deep .el-input__inner {
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
        ::v-deep  .el-icon-date {
            display: block !important;
            color:#fff;
            margin:16% 0 0 5%;
            font-size: 16px;
            line-height: 65px;
        }

    }
    // .gotop{
    //     position: fixed;
    //     right:5%;
    //     bottom: 15%;
    // }
    .itemRight .cell {
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        background-color:#fff;
        color:#999999;
    }
    .lookdetail{
        cursor: pointer;
    }
    .lookdetail span:hover{
       color:#eb6100
    }
    .itemLeft img {
        text-align: center
    }

    .is-leaf {
        background-color: #eb6100;
    }

    .itemBottom {
        margin-top: 30px;
        background-color: #fff;
        border-radius: 10px;
        max-width: 1200px;
        padding: 55px 45px 40px 40px;
    }

    .SplitLine {
        display: flex;
        vertical-align: middle;
    }

    .SplitLine img {
        width: 21px;
        height: 21px;
    }

    .bottomRight {
        margin: 94px 0 20px 0;
        .capsuleTitle{
            font-size: 24px;
            color:#333;
            margin:74px 0 78px;
            text-align: center;
        }
        .Domain{
            display: flex;
            text-align: center;
            justify-content: space-between;
            padding:0 100px;
            margin-bottom: 80px;
            span{
                display: block;
                margin-top: 21px;
            }
        }
    }
    .relaxDetails {
        width: 975px;
        margin-left: 6%;
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
    }
    .pagination{
        margin:30px 0 0 42%;
    }
    }
    .capsule .el-input__prefix{
        left:15px
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
</style>
