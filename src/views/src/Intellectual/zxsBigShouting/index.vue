<template>
    <div class="capsules fs50">
        <div style="display: flex;">
            <div class="infomation">
             <div class="fs18 color6 fwb">任务单位:</div>
                <div class="fs18 color21 fwb">{{userData.deptName}}</div>
                <div class="useNum">
                    <div style="text-align:center">
                        <img src="@/assets/user/shouted.png" alt="">
                        <div class="fs16 color9">使用设备</div>
                    </div>
                     <div>
                         <div class="fs16" style="height:50px;padding-top:19px"><span class="fs22">{{userData.relaxNum}}</span>次</div>
                        <div class="fs16 color9">使用次数</div>
                    </div>
                </div>
            </div>
            <usershout :xdays="this.lineData.name" :shoutNums="this.lineData.value"></usershout>

        </div>
        <div style="display:flex">
            <div class="itemLeft">
                <img src="@/assets/user/shouts.png" alt="">
            </div>
            <div class="itemRight">
                <!-- 选择日期 -->
                <el-date-picker v-model="value" type="month" format="选择：yyyy 年 MM 月 "  placeholder="请选择日期" @change="getDate" :picker-options="pickerOptions">
                </el-date-picker>
                <el-table :data="tableData" style="width: 100%;min-height:246px" border  :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column prop="username" label="姓名">
                    </el-table-column>
                    <el-table-column prop="source" label="放松宣泄">
                        <template slot-scope='scope'>
                            <div v-if="scope.row.source==3">
                                <div>宣泄</div>
                            </div>
                            <div v-if="scope.row.source==4">
                                <div>测试</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" sortable width="190" label="宣泄时间" >
                    </el-table-column>
                    <el-table-column prop="score" label="得分">
                    </el-table-column>
                    <el-table-column prop="level" label="压力程度">
                    </el-table-column>
                    <el-table-column prop="userId" label="详情">
                        <template  slot-scope='scope'>
                            <div class="dialog">
                                <div class='lookdetail' @click="gotodetail(scope.row.shoutId)"><span>查看</span></div>
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
                    <img src="@/assets/user/line.png" alt="" style='display: inline-block;margin-top: 5px;'>
                <span style='font-size: 20px;color:#eb6100;font-weight:bold;min-width:180px;margin-left: 12px;'>触控智能综合训练</span>
                <div
                    style="width: calc(100% - 201px);height: 1px; border-top: 1px dashed #eb6100;margin: 15px 0 0 16px; ">
                </div>
            </div>
            <div class="bottomLeft">
                <img src="@/assets/user/instrument.png" alt="">
                <div  class="relaxDetails">
                    <div style="font-size:22px;color:#333;margin-bottom:47px;border-left:6px solid #eb6100;padding-left:9px">产品功能</div>
                    <div style="line-height:35px" v-html="relax"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import usershout from './components/usershout'
    import { resOk } from "@/settings";
    import { shoutusedata,shoutuseNum,shoutuseTable } from '@/api/Consultant'
    export default {
        components: {
            usershout
        },
        data() {
            return {
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                }
            },
                btnFlag:false,
                value: '', //选择的日期
                relax: '1.用呐喊的方式，呼出不满情绪、泄出怨气，进行真实有效的情绪宣泄<br> 2.个性化正向引导语，有针对性进行正向性情绪疏导与鼓励<br>3.体会宣泄所带来的舒畅感觉，较大程度的发泄负面情绪，释放自我<br> 4.情绪疏导：发泄心中不满、消除压抑低落心情、 缓解学生考前紧张、赛前焦虑、重大任务前紧张等<br> 5.工作学习：疏导学习压力、释放心理压力、调节工作压力<br> 6.人际社交：缓和人际关系紧张、克服社交恐惧<br> 7.环境适应：调节学校新生、入监新犯、入伍新兵、 初入职场者等环境不适症<br> 8.婚姻情感：疏导紧张婚姻关系、恋爱情感挫折<br>9.自我调节：增强自信心，改善工作、学习、生活中对自我的正确认识。',
                userData:{},
                lineData:{
                    shoutNums:'',
                    xdays:''
                },
                month:'',
                query: {
                    current: 1,
                    date: '',
                    size: '5'
                },
                pagecount:0,            //总页数
                tableData: []
            }
        },
        created() {
            var date=new Date();
            this.getDate(date)
        },
        methods: {
            getDate(val) {              //转换时间格式
                var dt = new Date(val)
                var year = dt.getFullYear()
                var month = dt.getMonth() + 1
                var day = dt.getDate()
                var days = year + '-' + month + '-' + day
                this.month=month
                this.value=days
                this.query.date = days
                 this.getData()
                this.getfrequency()
                this.getNum(days)
            },
            getNum(date){                         //使用次数
                shoutuseNum(date).then(res=>{
                    if(res.code == resOk && res.data!=null){
                        this.userData=res.data
                        this.userData.relaxNum=this.userData.relaxNum==null?'0':this.userData.relaxNum
                    }
                })
            },
            currentpage(page){
                this.query.current=page
                if(this.query.relaxTime!=''){
                    this.getData()
                }
            },
            gotodetail(id){
                this.$router.push({
                    path:'/zxsBigShouting/detail',
                    query:{id:id}
                })
            },
            getfrequency(){
             shoutusedata().then(res=>{
                if(res.code== resOk){
                    this.lineData = res.data
                }
            })
            },
            getData() {           //表格数据
              shoutuseTable(this.query).then(res => {
                this.tableData = res.data.records
                this.total = res.data.total
                this.pagecount = res.data.pages
                })
            }
        }
    }
</script>

<style lang="less">
    .capsules {
        max-width: 1200px;
        margin: 0 auto;
        padding: 70px 0 30px;
        min-width: 1200px;
        background-color: #eff8f7;
        font-family:Microsoft YaHei;
        .el-table .warning-row {
        background: oldlace;
        }

    .userName {
        font-size: 20px;
        color: #333;
        font-weight: bold;
        margin-right: 18px;
    }
    .reply{
        margin-top: 36px;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .bottomLeft {
        margin-top: 53px;
        display: flex;
    }
    .infomation {
        width: 355px;
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
    .gotop{
    position: fixed;
    right: 4%;
    bottom: 167px;
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
    }
    .reply{
        /* width:269px;
        height:213px; */
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:28px;
    }
    .itemRight .cell {
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        background-color: #fff;
        color:#999999;
    }
    .lookdetail{
        cursor: pointer;
    }
    .lookdetail span:hover{
       color:#eb6100
    }
    .itemLeft img {
        text-align: center;
        max-width: 100%;
    }
    .is-leaf {
        background-color: #eb6100;
    }
    .itemBottom {
        margin-top: 30px;
        background-color: #fff;
        border-radius: 10px;
        max-width: 1200px;
        padding: 55px 45px 74px 40px;
    }

    .SplitLine {
        display: flex;
        vertical-align: middle;
    }

    .SplitLine img {
        width: 21px;
        height: 21px;
    }
    .relaxDetails {
        width: 975px;
        margin-left: 3%;
        font-size: 16px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 28px;
    }
    .pagination{
        margin:30px 0 0 42%;
    }
    }
    .capsules  .el-input__inner {
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
     .capsules .el-input__icon {
        display: none;
    }
    .capsules .el-icon-date {
        display: block !important;
        color:#fff;
        margin:16% 0 0 5%;
        font-size: 16px;
        line-height: 65px;
    }
</style>
