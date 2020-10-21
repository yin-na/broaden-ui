<template>
    <div class="capsule">
        <div style="display: flex;">
            <!-- 用户信息 -->
            <div class="infomation">
                <div class="fs18 color6 fwb">任务单位:</div>
                <div class="fs18 color21 fwb">{{userData.deptName}}</div>
                <div class="useNum">
                    <div style="text-align:center">
                        <img src="@/assets/user/spaced.png" alt="">
                        <div class="fs16 color9">使用设备</div>
                    </div>
                     <div>
                         <div class="fs16" style="height:50px;padding-top:25px"><span class="fs22">{{userData.relaxNum}}</span>次</div>
                        <div class="fs16 color9" style='margin-top:5px'>使用次数</div>
                    </div>
                </div>
            </div>
            <userInfo :xdays="this.lineData.name" :shoutNums="this.lineData.value"></userInfo>

        </div>
        <div style="display:flex">
            <div class="itemLeft">
                <img src="@/assets/user/picture.png" alt="">
            </div>
            <div class="itemRight">
                <!-- 选择日期 -->
                <el-date-picker v-model="value" type="month" format="选择：yyyy 年 MM 月 "  placeholder="请选择日期" @change="getDate" :picker-options="pickerOptions">
                </el-date-picker>
                <el-table :data="tableData" style="width: 100%;min-height:246px" border :default-sort="{prop: 'date', order: 'descending'}"
                :row-style="{height:'42px',lineHeight:'42px',fontSize:'14px'}" :header-row-style="{background:'#ecfaff',fontSize:'14px'}">
                 <el-table-column prop="username" width="90" label="姓名" >
                    </el-table-column>
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
                    <el-table-column prop="date" sortable width="140" label="放松时间" >
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
            <div class="bottomLeftes">
                <div style="margin:74px 0 78px;">
                    <div class="capsuleTitle">智能身心减压太空舱功能项目</div>
                  <div style="height:10px;width:342px;margin: -12px 0 0 389px;background-color:rgba(189,234,242,0.3)"></div>
                </div>
                <img src="@/assets/user/space1.png" alt="">
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
import { resOk } from "@/settings";
import { cludeusedata ,cludeuseNum,cludeuseTable } from '@/api/Consultant'
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
      userData: {         //使用次数
          deptName:'',
          relaxNum:''
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
      },
      pagecount: 0, // 总页数
      tableData: []
    }
  },
  created () {
    var date = new Date()
    this.getDate(date)
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
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
      this.getusenum(days)
      this.getfrequency()
    },
    currentpage (page) {
        this.query.current=page
        if(this.query.relaxTime!=''){
            this.getData()
        }
    },
    getusenum(date){                             //任务单位
        cludeuseNum(date).then(res=>{
            if(res.code == resOk && res.data!=null){
                   this.userData=res.data
                   this.userData.relaxNum=this.userData.relaxNum==null?'0':this.userData.relaxNum
            }
        })
    },
    getfrequency () {                             //使用数据
     cludeusedata().then(res=>{
         if(res.code== resOk){
              this.lineData = res.data
         }
     })
    },
    gotodetails (id) {
      this.$router.push({
        path: '/zxsCloud/detail',
        query: { id: id }
      })
    },
    getData () {           // 表格数据
//    this.query.userId=this.user.userId
      cludeuseTable(this.query).then(res => {
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

    .userName {
        font-size: 20px;
        color: #333;
        font-weight: bold;
        margin-right: 18px;
    }
    .el-table .success-row {
        background: #f0f9eb;
    }


    .bottomLeftes {
        margin-top: 53px;
        text-align: center;
        img{
            margin-bottom: 64px;
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
        padding: 56px 60px 63px 36px;
        margin-right: 30px;
        border-radius: 10px;
        font-size: 15px;
        .useNum{
            width: 100%;
            display: flex;
            justify-content: space-around;
            margin-top: 70px;
        }
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
        .cell {
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 13px;
            background-color:#fff;
            color:#999999;
       }
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
        margin:5px 0 0 42%;
    }
    }
    ::v-deep .el-input__prefix{
        left:15px
    }
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
    ::v-deep .el-icon-date {
        display: block !important;
        color:#fff;
        margin:16% 0 0 5%;
        font-size: 16px;
        line-height: 65px;
    }
    ::v-deep .el-input__icon {
        display: none;
    }
    ::v-deep .warning-row {
        background: oldlace;
        }
</style>
