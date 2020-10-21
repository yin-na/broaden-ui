<template>
    <div class="fisrtWarp"  :style="{minHeight: clientHeight  + 'px'}">
        <!-- 头部 -->
        <div class="fisrtHeader">
           <div style="line-height:56px;height:56px;display: flex;justify-content: space-between;">
                <div style="cursor: default;margin-left:40px">{{this.formatDateTime}}</div>
                <div style="display: flex">
                    <!-- <div class="user">
                        <img src="@/assets/firstPage/user.png" alt="">
                        <span>{{user.roles[0].roleName}}：{{user.username}}</span>
                        <img style="position:absolute;right:4px;top:25px" src="@/assets/firstPage/dropdown.png" alt="">
                    </div> -->

                   <div v-if="token" class="btn_login">
                  <img src="@/assets/firstPage/user.png" alt="" style='margin-right:7px'>
                 <span>{{user.roles[0].roleName}}：{{user.username}}</span>
                  <Dropdown>
                      <a href="javascript:void(0)">
                          <i class="el-icon-arrow-down el-icon--right" style='color:#fff'></i>
                      </a>
                       <Dropdown-menu slot="list">
                        <span style="display:block" @click="gotoPersonCenter">
                          <Dropdown-item>个人中心</Dropdown-item>
                        </span>
                        <span style="display:block" @click="changepassword">
                          <Dropdown-item divided>修改密码</Dropdown-item>
                        </span>
                      </Dropdown-menu>
                  </Dropdown>
              </div>
                    <div class="organ">
                         <img src="@/assets/firstPage/organ.png" alt="">
                        <span>所属机构：{{user.deptName}}</span>
                    </div>
                    <div class="organs" style="padding-top:5px">
                        <div style="display:inline-block;position:relative">
                          <i class='el-icon-bell' style="font-size:24px;margin-right:20px;position:relative" @click="newInfo"></i>
                          <span v-if="dian" style='display:block;width: 10px;height:10px;background-color: #ff0000;margin-left:4px;margin-bottom:8px;border-radius: 50%;position: absolute;left: 9px;top: 11px;'></span>
                          <newsDialog :dialogVisible="dialogVisible" ref='newDialoges' @showinfo="showinfo" @showdia="getDialog" @history="history"></newsDialog>
                        </div>
                         <img class="cursorer" style="padding-right:20px" src="@/assets/firstPage/setup.png" alt="系统维护" v-if="roles.includes('admin')||roles.includes('adminxyl')||roles.includes('counselorxyl')"  @click="godashed('/dashboard')">
                         <img class='cursorer' src="@/assets/firstPage/switch.png" alt="" @click="getOut">
                    </div>
                </div>
           </div>
            <div class="name">{{maintain.projectName}}</div>
        </div>
        <!-- 主体 -->
        <div class="fisrtContent fwb">
            <div class="ulItem">
              <ul class="backone">
                <li :class="[(!show && n == index)?'backone01':'', {'disable':item.disable}]" v-for="(item,index) in dataone" :key="index" @click="godashed(item.url, index)" @mouseenter="enterFun(index)" @mouseleave="leaveFun(index)">
                    {{item.name}}
                    <img :src="item.pic" v-show=" show || n != index">
                    <img :src="item.pic0" v-show="!show && n == index && item.disable == false">
                </li>
              </ul>
              <div class="centerItem">
                  <div class="itemone" @click="psychological">
                      <span>
                          心理体检中心
                      </span>
                  </div>
                   <div class="itemtwo"  @click="appointment">
                      <span>
                          心理咨询中心
                      </span>
                  </div>
                  <div class="itemthr" @click="Intervention">
                      <span>
                          危机干预中心
                      </span>
                  </div>
                   <div class="itemfour" @click="relaxtion">
                      <span>
                          智能减压中心
                      </span>
                  </div>
                   <div class="itemfive" @click="enjoyment">
                      <span>
                          智享物联中心
                      </span>
                  </div>
              </div>
              <ul class="backtwo">
                <li :class="(!riShow && nR0 == '0')?'backtwo01':''" @click='inquiryRoom()' @mouseenter="enterFunR01('0')" @mouseleave="leaveFunR01('0')">
                    <img src="@/assets/firstPage/book.png" alt="" v-show=" riShow || nR0 != '0'">
                    <img :src="datatwo[0].pic0" v-show="!riShow && nR0 == '0'">
                    咨询室管理
                </li>
                <li :class="[(!riShow && nR0 == '1' || bigshow)?'backtwo01':'', {'disable': datatwo[1].disable}]" @mouseenter="enterFunR01('1')" @mouseleave="leaveFunR01('1')">
                    <div v-if="bigshow == false" @click="bigshowBtn()">
                      <img :src="datatwo[1].pic" alt="" v-show=" riShow || nR0 != '1'">
                      <img :src="datatwo[1].pic0" v-show="!riShow && nR0 == '1' && datatwo[1].disable == false">
                       数据指挥中心
                    </div>
                    <div v-else @click="bigshowBtn()">
                      <!-- <img src="@/assets/firstPage/shuju.png" alt="" v-show=" riShow || nR0 != '1'"> -->
                      <img :src="datatwo[1].pic0">
                      <span style="color:#00fdfa;padding-left:6px">数据指挥中心</span>
                    </div>
                    <!-- 悬停点击事件 -->
                    <div class="postion-Data" v-if="bigshow">
                      <!-- 大屏保存查看 -->
                      <div @mouseenter="enterFunBig('0')" @mouseleave="leaveFunBig('0')" @click="seekData()">
                        <!-- 不变色 -->
                        <img v-show=" bigPic || bigN != '0'" class="xt-01" alt="" title='查看' src="@/assets/bigEacharts/icon-01.png">
                        <!-- 变色 -->
                        <img v-show="!bigPic && bigN == '0'" class="xt-01" alt="" title='查看' src="@/assets/bigEacharts/iconAct-01.png">
                      </div>
                      <!-- 大屏编辑 -->
                      <div @mouseenter="enterFunBig('1')" @mouseleave="leaveFunBig('1')" @click="editBig()">
                        <img v-show=" bigPic || bigN != '1'" class="xt-02" alt="" title="编辑" src="@/assets/bigEacharts/icon-02.png">
                        <img v-show="!bigPic && bigN == '1'" class="xt-02" alt="" title="编辑" src="@/assets/bigEacharts/iconAct-02.png">
                      </div>
                      <div @mouseenter="enterFunBig('2')" @mouseleave="leaveFunBig('2')" @click="launch()">
                        <img v-show=" bigPic || bigN != '2'" class="xt-03" alt="" title="收集数据" src="@/assets/bigEacharts/icon-03.png">
                        <img v-show="!bigPic && bigN == '2'" class="xt-03" alt="" title="收集数据" src="@/assets/bigEacharts/iconAct-03.png">
                      </div>
                    </div>
                </li>
                <!-- <li v-if="" @mouseenter="enterFunR01('1')" @mouseleave="leaveFunR01('1')">
                    <div v-if="bigshow == false" @click="bigshowBtn()">
                      <img src="@/assets/firstPage/shuju.png" alt="" v-show=" riShow || nR0 != '1'">
                      <img :src="datatwo[1].pic0" v-show="!riShow && nR0 == '1'">
                       数据指挥中心
                    </div>
                </li> -->
                <li :class="(!riShow && nR0 == '2')?'backtwo01':''" @click="gotoweb()" @mouseenter="enterFunR01('2')" @mouseleave="leaveFunR01('2')">
                    <img src="@/assets/firstPage/Internet.png" alt="" v-show=" riShow || nR0 != '2'">
                    <img :src="datatwo[2].pic0" v-show="!riShow && nR0 == '2'">
                    心理网站平台
                </li>
                <li :class="(!riShow && nR0 == '3')?'backtwo01':''" @click="gotoSever()" @mouseenter="enterFunR01('3')" @mouseleave="leaveFunR01('3')">
                    <img src="@/assets/firstPage/train.png" alt="" v-show=" riShow || nR0 != '3'">
                    <img :src="datatwo[3].pic0" v-show="!riShow && nR0 == '3'">
                    心理培训服务
                </li>
              </ul>

            </div>
        </div>
        <div class='centerDia'>
          <el-dialog title="" :visible.sync="showDialog" width="1136px" :before-close="handleClose" :close-on-click-modal="false">
            <div v-if="status" style='padding:30px 20px;min-height:395px'>   
              <div style='text-align:right;color:#fff;font-size:16px'>
                <i class='el-icon-close cursorer' @click="handleClose"></i>
              </div>
              <div class='items textCet colorf fs14'>
                <div class='fs16 mb15'>{{diaContent.title}}</div>
                <div class='fs16 mb35'>{{diaContent.crtTime}}</div>
                <div>{{diaContent.content}}</div>
              </div>
            </div>
            <div v-else style='padding:30px 20px;'>
              <div class='fs16 colorf disflex spacebetween mb50'>
                <div class='disflex spacebetween' style="min-width:170px">
                  <span class='cursorer' v-for="(item,index) in labelList" :class='{blueLabel:param.type==item.value}' :key="index" @click="getNewtype(item.value)">{{item.label}}</span>
                </div>
                <div class='disflex' >
                  <el-checkbox class='mr20' v-model="checked" @change="getchecked">标记全部为已读</el-checkbox>
                      <div class="titles mr20" style='line-height:24px'>
                        <span class='cursorer fs14'>全部消息</span>
                        <i class='el-icon-arrow-right' v-if="status"></i>
                        <i class='el-icon-arrow-down' v-else></i>
                    </div>
                    <i class='el-icon-close cursorer' @click="handleClose"></i>
                </div>
              </div>
              <div class='newsList' v-if="newsList.length!='0'">
                  <div v-for="(item,index) in newsList" :key="index" class="colorf fs14 mb35 cursorer"  @click="getDialog(item.id)">
                     <div class="disflex spacebetween">
                       <span>{{item.title}}</span>
                       <span>{{item.crtTime}}</span>
                     </div>
                     <div>{{item.content}}</div>
                  </div>
              </div>
              <el-pagination v-if="newsList.length!='0'" background layout="prev, pager, next" :current-page='param.current' :page-size='4' @current-change="pageChange" :total="newsList.length"></el-pagination>
              <div class='newsListes' v-else>
                <div style="text-align:center;font-size:26px">
                    <i class='el-icon-message-solid mb10' style="color:#fff"></i>
                    <div class='fs14' style='color:#ccc'>近6个月未收到消息</div>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNoticeById,getNoticePage,getDictType,allReadNotice} from '@/api/information'
import newsDialog from '@/components/newsDialog'
import { page } from '@/api/base/role'
import { getReleaseOne } from '@/api/chart/chart' // 查看大屏发布接口
const black_list = ['visitor', 'student', 'parent', 'faculty', 'mass']
export default {
  components:{newsDialog},
  data () {
    return {
      showDialog:false,
      dian:false,
      bigshow: false,
      labelList:[],
      checked:false,
      status:true,
      dialogVisible:false,
      diaContent:"",
      disableShow: false,
      n: '',
      nR0: '',
      bigN: '', // 大屏悬停按钮变色
      show: true,
      riShow: true,
      bigPic: true, // 大屏悬停按钮变色
      formatDateTime: '',
      clientHeight: 0,
      param:{
        size:4,
        current:1,
        type:0
      },
      newsList:[],
      query: {
        size: 100,
        page: 1
      },
      dataone: [
        { name: '心档案管理', pic: require('@/assets/firstPage/users.png'), url: '/arch/index', pic0: require('@/assets/firstPage/users-01.png'), disable: false, pic1: require('@/assets/firstPage/users-02.png') },
        { name: '心理人才库', pic: require('@/assets/firstPage/books.png'), url: '/volunteer/mechanism', pic0: require('@/assets/firstPage/books-01.png'), disable: false, pic1: require('@/assets/firstPage/books-02.png') },
        { name: '移动终端服务', pic: require('@/assets/firstPage/phone.png'), url: '/mobileTerminal', pic0: require('@/assets/firstPage/phone-01.png'), disable: false, pic1: require('@/assets/firstPage/phone-02.png') },
        { name: 'Ai心理学院', pic: require('@/assets/firstPage/vollter.png'), url: '/psyResource/home', pic0: require('@/assets/firstPage/vollter-01.png'), disable: false, pic1: require('@/assets/firstPage/vollter-02.png') }
      ],
      datatwo: [
        { name: '咨询室管理', pic: require('@/assets/firstPage/book.png'), pic0: require('@/assets/firstPage/book-01.png'), disable: false, isJy: 'b', pic1: require('@/assets/firstPage/book-02.png')},
        { name: '数据指挥中心', pic: require('@/assets/firstPage/shuju.png'), pic0: require('@/assets/firstPage/shuju-01.png'), disable: false, isJy: 'a', pic1: require('@/assets/firstPage/shuju-02.png')}, // isJy 添加初始化是否禁用（a：禁用 b:不禁用）
        { name: '心理网站平台', pic: require('@/assets/firstPage/Internet.png'), pic0: require('@/assets/firstPage/Internet-01.png'), disable: false, isJy: 'b', pic1: require('@/assets/firstPage/Internet-02.png')},
        { name: '心理培训服务', pic: require('@/assets/firstPage/train.png'), pic0: require('@/assets/firstPage/train-01.png'), disable: false, isJy: 'b', pic1: require('@/assets/firstPage/train-02.png')}
      ]
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'user',
      'roles',
      'maintain'
    ])
  },
  created () {
    this.initData()
    this.getDictType()
  },
  mounted () {
    // console.log(this.user,this.maintain,666)
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight
    // 页面加载完后显示当前时间
    this.dealWithTime(new Date())
    // 定时刷新时间
    this.timer = setInterval(() => {
      this.dealWithTime(new Date()) // 修改数据date
    }, 500)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    showinfo(){
      this.dian=true
    },
    getchecked(){
      if(this.checked){
        allReadNotice().then((res)=>{
            if(res.data){
                this.getNoticePage()
            }
        })
      }
    },
    getNewtype(val){
      this.param.current=1
      this.checked=false
      this.param.type=val
      this.getNoticePage()
    },
    getDictType(){
      getDictType().then((res)=>{
        console.log(res.data,999)
        this.labelList=res.data
      })
    },
    getDialog(id){
      this.dialogVisible=false
      this.showDialog=true
      this.status=true
      getNoticeById(id).then((res)=>{
        if(res.code=='0'){
          this.diaContent=res.data
          this.diaContent.crtTime=res.data.crtTime.substring(0,(res.data.crtTime.indexOf(" ")))
        }
      })
    },
    pageChange(val){
      this.param.current=val
      this.getNoticePage()
    },
    history(){
      this.dialogVisible=false
      this.showDialog=true
      this.status=false
      this.getNoticePage()
    },
    getNoticePage(){
      getNoticePage(this.param).then((res)=>{
        if(res.code=='0'){
          this.newsList=res.data.records
            this.newsList.forEach(element => {
                    element.crtTime=element.crtTime.substring(0,(element.crtTime.indexOf(" ")))
            });
        }
      })
    },
    handleClose(){
      this.showDialog=false
    },
    newInfo(){
      if(!this.dialogVisible){
        this.$refs.newDialoges.getNoticePage()
      }
      this.$refs.newDialoges.checked=false
      this.dialogVisible=!this.dialogVisible
    },
    // 初始化禁用状态
    initData () {
      let userCode = this.user.roles[0].roleCode
      this.dataone.forEach((element, index) => {
        if ((element.url == '/dashboard'|| element.url =='/arch/index') && black_list.includes(userCode)) {
          this.dataone[index].disable = true
          this.dataone[index].pic = this.dataone[index].pic1
        } else if (element.url == '/volunteer/mechanism' && (userCode != 'admin' && userCode !='counselorxyl')) { // 志愿者添加只有管理员能进权限
          this.dataone[index].disable = true
          this.dataone[index].pic = this.dataone[index].pic1
        }
        // if(element.url == '/inquiryRoom'&&(userCode=='student'||userCode=='visitor')){
        //   this.dataone[index].disable = true
        //   this.dataone[index].pic = this.dataone[index].pic1
        // }
      })

      // 右侧判断初始化是否禁用
      this.datatwo.forEach((element, index) => {
        if (userCode == 'visitor' || userCode=='student' ) {
          if (element.isJy == 'a') {
            this.datatwo[index].disable = true
            this.datatwo[index].pic = this.datatwo[index].pic1
          }
        } else {
          this.bigshow = !this.bigshow
        }
      })

      // console.log(this.dataone, '状态')
    },
    // 大屏查看按钮
    seekData () {
      getReleaseOne().then(res => {
        if (res.data != null && res.data != '') {
          const url = this.$router.resolve({
            path: `/viewscreen/${res.data}`,
          })
          window.open(url.href, '_blank')
        } else {
          this.$message('无法查看,暂未发布!')
        }
      })
    },
    godashed (url, index) {
      let userCode = this.user.roles[0].roleCode
      if (url == undefined) {
      } else {
        if ((url == '/dashboard'||url=='/arch/index') && black_list.includes(userCode)) {
          this.$message('无权限进入')
        } else if (url == '/volunteer/mechanism' && (userCode != 'admin'&&userCode!='counselorxyl' )) { // 志愿者添加只有管理员能进权限
          this.$message('无权限进入')
        } else {
          this.$router.push(url)
        }
      }
    },
    // 控制大屏悬停点击事件
    bigshowBtn () {
      let userCode = this.user.roles[0].roleCode
      if (userCode == 'visitor' || userCode=='student' ) {
        this.$message('无权限进入')
      } else {
        this.bigshow = !this.bigshow
      }
    },
    launch(){
      const url = this.$router.resolve('/launch')
      window.open(url.href, '_blank')
    },
    gotoPersonCenter(){
        this.$router.push('/psyArchives')
    },
    changepassword(){
      this.$router.push('/personcenter')
    },
    // 大屏数据编辑好的echarts
    dataCenter () {
      // 原来只有这两句
      const url = this.$router.resolve({ path: '/commandCentre' })
      window.open(url.href, '_blank')
    },
    dealWithTime (data) { // 获取当前时间
      var a = new Array('日', '一', '二', '三', '四', '五', '六')
      var week = new Date().getDay()
      var weeks = '周' + a[week]
      // let formatDateTime;
      let Y = data.getFullYear()
      let M = data.getMonth() + 1
      let D = data.getDate()
      let H = data.getHours()
      let Min = data.getMinutes()
      let S = data.getSeconds()
      H = H < 10 ? '0' + H : H
      Min = Min < 10 ? '0' + Min : Min
      S = S < 10 ? '0' + S : S
      this.formatDateTime = Y + '年' + M + '月' + D + '日' + '\xa0\xa0\xa0 \xa0\xa0\xa0' + weeks + '\xa0\xa0\xa0\xa0\xa0\xa0 ' + H + ':' + Min
    },
    gotoweb () {
      const url = this.$router.resolve({ path: '/home' })
      // window.open('http://xyloa.cn:8899/');
      window.open(url.href, '_blank')
    },
    gotoSever () {
      // const url = this.$router.resolve({ path: '/psyServe' })
      // const url = this.$router.resolve({ path: '/cultivate/index' })
      // window.open('http://xyloa.cn:8899/');
      // window.open(url.href, '_blank')
      this.$router.push({ path: '/cultivate/index' })
    },
    enjoyment () {
      let userCode = this.user.roles[0].roleCode
      if (userCode == 'visitor' || userCode == 'student') {
        this.$router.push('/EnjoyInternet')
      } else if (userCode == 'counselor'||userCode=='counselorxyl' ||userCode=='healthcounselor') {
        this.$router.push('/enjoyment')
      } else {
        this.$message('暂无权限进入')
      }
    },
    inquiryRoom () { // 咨询室管理
          let userCode = this.user.roles[0].roleCode
       if (userCode == 'visitor' || userCode == 'student') {
          this.$message('暂无权限进入')
       }else{
          this.$router.push('/inquiryRoom')
       }
    },
    relaxtion () {
      this.$router.push('/homepage')
    },
    psychological () {
      let userCode = this.user.roles[0].roleCode
      if (userCode == 'counselor' ||userCode == 'healthcounselor'||userCode == 'counselorxyl') {
        this.$router.push('/examination')
      } else {
        this.$router.push('/psyhome')
      }
    },
    appointment () {
       let userCode = this.user.roles[0].roleCode
      if (userCode == 'counselor'||userCode=='counselorxyl'||userCode=='healthcounselor') {
        this.$router.push('/askingCenter')
      } else {
        this.$router.push('/orderhome')
      }
    },
    // 危机干预
    Intervention () {
      this.$router.push('/wjIntervention/guidance')
    },
    // 跳转大屏编辑
    editBig () {
      const url = this.$router.resolve('/edit')
      window.open(url.href, '_blank')
    },
    getOut () {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    // 鼠标悬停样式(左边)
    enterFun (index) {
      if (this.dataone[index].disable == false) {
        this.show = false
        this.n = index
      }
    },
    leaveFun (index) {
      this.show = true
      this.n = index
    },
    // 鼠标悬停样式(右边)
    enterFunR01 (index) {
      if (this.datatwo[index].disable == false) {
        this.riShow = false
        this.nR0 = index
      }
    },
    leaveFunR01 (index) {
      this.riShow = true
      this.nR0 = index
    },
    // 大屏悬停按钮
    enterFunBig (index) {
      this.bigPic = false
      this.bigN = index
    },
    leaveFunBig (index) {
      this.bigPic = true
      this.bigN = index
    }
  }
}
</script>

<style lang="scss" scoped>
.fisrtWarp{
    background: url('~@/assets/firstPage/bj1.png');
    background-position: center;
    background-size: cover;
    // height:100%;
    width: 100%;
    position: relative;
    .centerDia{
      .blueLabel{
        color: #95FFFF!important;
      }
       ::v-deep .el-checkbox__label{
           color: #95FFFF!important;
           line-height: 27px;
       }
       ::v-deep .el-checkbox__inner{
           background-color: #57C2D7!important;
       }
       ::v-deep .el-dialog{
         padding:1px;
        background-color: rgba(255,255,2550,0)
       }
      ::v-deep .el-pagination{
        text-align: center;
      }
      ::v-deep .el-dialog__header{
        display: none;
      }
      ::v-deep .el-dialog__body{
        padding:1px;
        background:url("~@/assets/user/borderMax.png") no-repeat;
        background-size: 100% 100%;
        background-color: rgba(0,10,40);
        padding: 0 !important;
      }
      .newsList{
        width: 878px;
        min-height:263px
      }
      .newsListes{
        width: 100%;
        min-height:263px;
        text-align: center;
        padding-top: 65px;
      }
    }
}
  .fisrtHeader{
      // width: 100%;
      height:150px;
      background: url('~@/assets/firstPage/title1.gif') no-repeat;
      // background-position: -50px 0 0 0;
      background-size: 100% 100%;
      color:#0AB7FF;
      font-size: 14px;
      .user{
          margin-right: 40px;
          position: relative;
          img{
              position: absolute;
              top:16px;
          }
          span{
              margin: 0 25px;
          }
      }
      .organ{
          margin-right: 40px;
          margin-left: 30px;
           position: relative;
           img{
              position: absolute;
              left:0%;
              top:18px;
          }
          span{
              margin-left:25px;
          }
      }
      .organs{
          margin-right: 40px;
      }
      .name{
          color: rgba(10,183,255,1);
          font-size: 28px;
          text-align: center;
          margin-top: -30px;
      }
  }
  .fisrtContent{
      width: 100%;
      height: calc(100% -150px);
      .ulItem{
          display: flex;
          justify-content: space-between;
          .centerItem{
              width:70%;
              height:100%;
              background-size: cover;
              div{
                  height:180px;
                  width:150px;
                  font-size:22px;
                  color:#00FDFA;
                  position: absolute;
                  cursor: pointer;
              }
              span{
                  width: 88px;
                  display: block;
                  text-align: center;
                  margin-left: 31px;
                  margin-top: 82px;
                  font-weight: normal;
                  font-size: 22px;
              }
              span:hover{
                color:#001b55;
              }
              .itemone{
                  background: url('~@/assets/firstPage/medicalCenter.png') no-repeat ;
                  top:40%;
                  left:24.5%;
              }
              .itemtwo{
                 background: url('~@/assets/firstPage/askCenter.png') no-repeat ;
                  bottom:10%;
                  left:44.5%;
              }
              .itemthr{
                  background: url('~@/assets/firstPage/danger.png') no-repeat ;
                  top:40%;
                  right:24.5%;
              }
              .itemfour{
                  background: url('~@/assets/firstPage/decompression.png') no-repeat ;
                  top:63%;
                  left:30%;
              }
              .itemfive{
                  background: url('~@/assets/firstPage/wulian.png') no-repeat ;
                  top:63%;
                  right:30%;
              }
          }
          .backone{
              li{
                  background: url('~@/assets/firstPage/backLeft.png') no-repeat;
                  img{
                      margin-left:15px
                  }
              }
          }
          .backtwo{
              li{
                  background: url('~@/assets/firstPage/backRight.png') no-repeat;
                  img{
                      margin-right:15px
                  }
              }
          }
          .backone01{
              background: url('~@/assets/firstPage/backLeft-01.png') no-repeat !important;
          }
          .backtwo01{
              background: url('~@/assets/firstPage/backRight-01.png') no-repeat !important;
              position: relative; // 新添加
          }
       ul{
           margin-top: 140px;
           
              li{
              height:80px;
              width: 290px;
              text-align: center;
              line-height: 80px;
              color:#59BAF2;
              font-size:24px;
              margin-bottom: 80px;
              position: relative;
              font-weight: normal;
              cursor: pointer;
                img{
                    vertical-align: middle;
                }
              }
              li:hover{
                color:#00fdfa;
              }
        }
      }
  }
  .disable{
    color: #00507f !important;
  }
  // 大屏悬停按钮
  .postion-Data{
    position: absolute;
    left: 0;
    top: 0;
    .xt-01{
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      position: absolute;
      left: -45px;
      top: -35px;
    }
    .xt-02{
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      position: absolute;
      left: -80px;
      top: 23px;
    }
    .xt-03{
      display: inline-block;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      position: absolute;
      left: -45px;
      top: 80px;
    }
  }
</style>
