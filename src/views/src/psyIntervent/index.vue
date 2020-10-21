/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * @lastupdate 2020-05-28 duziqiang
 * 心理干预
 */
<template>
<div class="boxWarp"  style="background-color:#fff;" :style="{minHeight: clientHeight  + 'px'}">
    <div class="box">
    <el-card class="box-card" :body-style="body_style">
      <div slot="header" class="clearfix">
        <img class="img_avatar" src="@/assets/logo/logo.png" />
        <span style="font-size:20px;font-weight:bold">心理健康干预指导中心</span>
      </div>
      <!-- 左侧信息导航栏 -->
      <el-col :span="3" style="min-height:690px;text-align:center;padding-top:47px;position:relative;background-color:rgb(239, 248, 247)">
        <div>
          <div
            v-for="item in navList"
            :key="item.key"
            class="text item"
            @click="handleItemClick(item.key)"
            style="cursor:pointer"
          >{{ item.name }}</div>
        </div>
        <div class="interventQR">
          <img style="width:80px;height:80px" src="@/assets/user/QRCode.png" />
          <div>扫码关注公众号</div>
        </div>
      </el-col>
      <!-- 中部对话框 -->
      <el-col :span="14">
        <div class="msgList">
          <el-scrollbar ref="myscroll" class="wrapper">
            <div v-for="item in messageList" :key="item.id">
              <div class="message-item" :class="item.type == 1 ? 'right' : ''">
                <img class="img_avatar" :src="item.type==1 ? user.avatar:userImg"/>
                <!-- 消息体 -->
                <div class="message">
                  <div class="bubble bd4">
                    <!-- 普通消息和干预介绍 -->
                    <div v-if="item.msgType == 0" v-html="item.content" class="wang-editor"></div>
                    <!--  标签消息 -->
                    <div v-if="item.msgType == 1" class="wang-editor">
                      <el-tag
                        class="inv_tag"
                        v-for="itag in item.content"
                        :key="itag.id"
                        type="warning"
                        effect="dark"
                        style="width:80px;height:30px;line-height:30px;text-align:center;border-radius:15px"
                        @click="handleTagClick(itag.id)"
                      >{{ itag.name }}</el-tag>
                    </div>
                    <!--  标签详情 -->
                    <div v-if="item.msgType == 2" class="wang-editor">
                      <div>简介：{{ item.content.symptom }}</div>
                      <div>症状: {{ item.content.synopsis }}</div>
                      <div>病因：{{ item.content.pathogenesis }}</div>
                    </div>
                    <!-- 咨询团队 -->
                    <div v-if="item.msgType == 3" class="wang-editor">
                       <div class="teamTitle color6">心悦灵心理服务中心团队</div>
                     <vue-scroll :ops="ops" style="width:100%;height: 430px;">
                      <div style="height:430px">
                        <div class="askTeam" v-for="counselor in item.content" :key="counselor.id">
                       <div class="teamdetail">
                        <div class="teamContent">
                          <div class="teamContentLeft">
                            <img   :src="counselor.user.avatar" />
                          </div>
                          <div class="teamContentRight">
                            <div style="display:flex;justify-content:space-between">
                              <div>
                                <span class="fs16 color6" style="display:block">{{ counselor.user.username }}</span>
                              <span class="color9">国家级优秀讲师</span>
                              </div>
                              <div class="subscribe" @click="dealConsultantDetail(counselor.id)">
                              <span>立即预约</span>
                            </div>
                            </div>
                            <div class="biaoqian">
                              <span v-for="(item,index) in counselor.labelList" :key="index">{{item.name}}</span>
                            </div>
                            <div>{{counselor.synopsis}}
                            </div>
                          </div>
                        </div>
                       </div>
                      </div>
                    </div>
                     </vue-scroll>
                    </div>
                    <!-- 文章列表 -->
                    <div v-if="item.msgType == 4" class="wang-editor">
                       <el-tabs class="listTabs" v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane  v-for="data in HeartData" :key="data.sort"  :id="data.id" :label="data.label" :name="data.value">
                               <div class="articletent" v-for="(item,index) in articleList " :key="index" @click="dealArticleDetail(item.id)" :id="item.id" style="display:flex;cursor:pointer">
                                  <div class="articleLeft">
                                    <img style="width:115px;height:70px" :src="item.image" alt="">
                                  </div>
                                  <div class="articleRight">
                                    <li>{{item.name}}</li>
                                  </div>
                               </div>
                            </el-tab-pane>
                        </el-tabs>
                      <!-- <div
                        v-for="article in item.content"
                        :key="article.id"
                        @click="dealArticleDetail(article.id)">
                        <el-link type="primary">{{ article.name }}</el-link>
                      </div> -->
                    </div>
                    <!-- 活动列表 -->
                    <div v-if="item.msgType == 5" class="wang-editor">
                      <div class="listStyle" v-for="article in item.content" :key="article.id"  @click="ActivityListDetail(article)">
                        <img style="width:115px;height:70px;margin-right:20px" :src="article.image" alt="">
                        <span>{{ article.name }}</span>
                        </div>
                    </div>
                    <!-- 留言 -->
                    <div v-if="item.msgType == 6" class="wang-editor">
                      <div>感谢您对心悦灵的关注。当前客服人员不在线，请填写一下信息，我们会尽快和您联系。</div>
                      <div class="leaveInfo">
                          <span>您的姓名：</span>
                          <el-input style="width:65%" @keyup.native="inputChanges($event)" v-model="input_name" placeholder="请输入姓名"></el-input>
                      </div>
                      <div class="leaveInfo" >
                        <span>手机号：</span><el-input style="width:65%" @keyup.native="phoneChange" maxlength="11" v-model="input_phone" placeholder="请输入手机号"></el-input>
                      </div>
                      <div class="leaveInfo" style="margin:10px 0">
                        <span>您的留言：</span><el-input style="width:65%" type="textarea" v-model="input_msg" placeholder="请输入留言"></el-input>
                      </div>

                      <el-button style="margin-left:83%" :disabled="input_phone.trim() =='' || input_msg.trim()== '' || input_name.trim()==''||(/^1(3|4|5|6|7|8|9)\d{9}$/.test(input_phone)==false)"  @click="submitMessage()">提交</el-button>
                    </div>
                    <!-- 留电 -->
                    <div v-if="item.msgType == 7" class="wang-editor">
                      <span style="font-size:14px">请输入您的电话号码，稍后将立即给您回电，通话免费。</span>
                      <div class="getphoneNum" style="display:flex">
                        <el-input v-model="input_mobile" placeholder="请输入手机号"></el-input>
                        <el-button @click="submitMobile()" :disabled="input_mobile.trim() == ''">免费回电</el-button>
                      </div>
                    </div>
                    <!-- 评价 -->
                    <div v-if="item.msgType == 8" class="wang-editor">
                      <span class="fs14" style="margin: 15px 0;display: block;">感谢您对心悦灵的关注。请填写您的想法，我们会尽快给您回复。</span>
                      <div class="disflex">
                        <div>评价：</div>
                        <div class="appraise">
                          <el-input style="width:297px;min-height:146px" type="textarea" v-model="evaluateItem" placeholder="请输入评价"></el-input>
                        </div>
                      </div>
                      <el-button  style="margin: 22px 0 0 38px;"  @click="submitevaluate()" :disabled="evaluateItem.trim() == ''">发送评价</el-button>
                    </div>
                    <!-- 预约须知 -->
                    <div v-if="item.msgType == 9" class="wang-editor">
                      <div class="askTeam"  v-html="item.content">
                      </div>
                    </div>
                    <!-- 预约协议 -->
                     <div v-if="item.msgType == 10" class="wang-editor">
                      <div class="askTeam"  style="padding:20px 8px" v-html="item.content">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="tareaBtn">
          <el-input type="textarea" :rows="4" placeholder="请您输入" v-model="message"  @keyup.native.enter="sendMsg"></el-input>
        <el-button
          type="primary"
          style="float:right"
          @click="sendMsg"
          :disabled="message.trim() == ''"
        >发送</el-button>
        </div>
      </el-col>
      <!--  右侧信息栏 -->
      <el-col :span="7">
        <!--  文章详情 -->
        <PopUpDrawer
          :title="article.name"
          :display.sync="article_drawer"
          :inner="true"
          :width="drawerWidth"
          :mask="false"
        >
          <div style="height:550px">
            <el-scrollbar class="wrapper">
              <div v-html="article.text"></div>
            </el-scrollbar>
          </div>
        </PopUpDrawer>
        <!-- 咨询师详情介绍 -->
        <PopUpDrawer
          title="预约详情"
          :display.sync="consultant_rawer"
          :inner="true"
          :width="drawerWidth"
          :mask="false"
        >
        <vue-scroll :ops="ops" style="width:100%;height: 645px;">
          <div>
            <!-- 咨询师介绍 -->
            <div class="teamContent" style="border-bottom:1px solid #ddd;padding-bottom:35px">
              <div class="teamContentLeft">
                  <img :src="consultant.user.avatar">
              </div>
              <div class="teamContentRight" >
                 <div class="fs16 color6" style="margin-bottom:30px">{{consultant.user.username}}</div>
                 <div class="fs14 color9 mb10">国家级优秀咨询师</div>
                 <div class="fs14 color9">已为500位用户提供咨询服务</div>
                 <div class="fs16" @click="toKnow" style="color:#eb6100;margin-top:36px;cursor:pointer">预约须知</div>
              </div>
            </div>
              <div class="fs16 color6 fwb mb30">咨询信息</div>
            <div class="mb10">咨询领域(可多选)</div>
            <div class="citychiose mb30">
              <el-checkbox-group v-model="checkboxGroup1" @change="handleCheckedCitiesChange">
                <el-checkbox-button v-for="(item,index) in consultant.labelList" :label="item.id" :key="index">
                  <span>{{item.name}}</span>
                </el-checkbox-button>
              </el-checkbox-group>
              <div class="mb10 mt20 phoneNumber" style="display:flex;">
               <span style="width:65px"><span style="color:red">*</span>手机号：</span>
               <el-input style="width:60%;border-color:#eb6100;" placeholder="请输入您的手机号" maxlength="11" v-model="consultMobile" />
            </div>
            <div class="mt20 phoneNumber" style="display:flex">
              <span style="width:65px; text-align: center"><span style="color:red">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
              <el-input style="width:60%" placeholder="请填写真实姓名"  @keyup.native="inputChange($event)" @keydown.native="inputChange($event)"  v-model="consultName" />
            </div>
            <div class="phoneNumber" style="display:flex;margin:20px 0;padding-bottom:7px">
              <span style="width:65px; text-align: center"><span style="color:red">*</span>性&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
              <el-radio v-model="consultSex" label="0">男</el-radio>
              <el-radio v-model="consultSex" label="1">女</el-radio>
            </div>
             </div>
             <div class="askInfo">
               <div class="color6 fwb fs16"><span style="color:red">*</span>详情描述</div>
                <el-input  type="textarea" placeholder="请简要描述您要表达的内容，以及期待达到的效果" maxlength="300" show-word-limit v-model="consultContent"></el-input>
             </div>
             <div class="MarkTime">
               <div class="color6 fwb fs16"><span style="color:red">*</span>预约时间</div>
                <el-radio-group v-model="sizeForm" @change="orederTime">
                    <el-radio  v-for="(item,index) in orderTime" :key="index"
                        style=" width: 322px;height: 35px; border-radius: 10px;font-size: 15px;
                        color: #999;margin:0 0 16px 0;text-align:center;line-height:22px"
                        :label="item" border>
                      {{item}}&nbsp;&nbsp;&nbsp;&nbsp;8:00-20:00
                  </el-radio>
                </el-radio-group>
             </div>
             <div class="agreeOrder">
               <div class="agreement">
                   <el-checkbox-group v-model="formtype">
                      <el-checkbox label="确认" name="type">确认预约即视为同意</el-checkbox>
                  </el-checkbox-group>
                  <div style="color:#FE6831;cursor:pointer" @click="getTreaty">
                      《心理咨询预约协议》
                  </div>
               </div>
             </div>
             <div class="bottomBtn">
               <el-button class="color9" style="border-color:#eb6100" @click="consultant_rawer=false">返回咨询</el-button>
               <el-button style="background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);border:none;color:#fff" @click="confirmConsult()">确定预约</el-button>
             </div>
          </div>
        </vue-scroll>
        </PopUpDrawer>
        <el-card  shadow="never" :body-style="body_style">
          <el-row style="border-bottom:1px solid #ddd;padding:15px 8px;position:relative">
            <div class="label-msg">心理困惑</div>
            <div class="lookall fs14" @click="dealMsgCard(1,tags)">查看全部 ></div>
            <el-tag
              class="inv_tag"
              v-for="item in tags.slice(0,3)"
              :key="item.id"
              type="warning"
              effect="dark"
              style="cursor:pointer;width:80px;height:30px;line-height:30px;text-align:center;border-radius:15px"
              @click="handleTagClick(item.id)">
              {{ item.name }}</el-tag>
          </el-row>
          <el-row style="border-bottom:1px solid #ddd;padding:15px 8px;height:160px;overflow:hidden;position:relative">
            <div class="label-msg">相关咨询师</div>
            <div class="lookall fs14" @click="dealMsgCard(3,consultantList);">查看全部 ></div>
            <div style="height:50px" v-for="item in consultantList" :key="item.id">
              <img class="img_avatar" :src="item.user.avatar" />
              <span style="color:#999;cursor:default">{{ item.user.username }}</span>
            </div>
          </el-row>
          <el-row style="padding:15px 8px;height:263px">
            <div class="label-msg">相关文章</div>
            <div style="padding-left:2px">
              <ul>
                <li v-for="item in articleLists" :key="item.id">
                  <span class="booksolt"></span>
                  <el-link type="primary" style="color:#999;height:30px;font-size:16px"  @click="dealArticleDetail(item.id)">{{ item.name }}</el-link>
                </li>
              </ul>
            </div>
          </el-row>
        </el-card>
        <el-row style="padding: 15px 0 0 8px">
          <div class="label-msg">联系我们</div>
          <div class="an" >
            <img class="img_avatar" @click="handleItemClick('5')" src="@/assets/user/evaluate.png" />
            <div>评价</div>
          </div>
          <div class="an">
            <img class="img_avatar" @click="handleItemClick('6')" src="@/assets/user/Leavingmess..png" />
            <div>留言</div>
          </div>
          <div class="an">
            <img class="img_avatar" @click="handleItemClick('7')" src="@/assets/user/leavephone .png" />
            <div>留电</div>
          </div>
          <div class="an" >
            <img class="img_avatar" @click="handleItemClick('8')" src="@/assets/user/phonetalk.png" />
            <div>语音咨询</div>
          </div>
        </el-row>
      </el-col>
    </el-card>
  </div>
    <phoneModel :show="show" @clocePic="clocePic"></phoneModel>
</div>
</template>
<script>
import Config from "@/config"
import { mapGetters } from 'vuex'
import PopUpDrawer from "./components/PopUpDrawer"
import phoneModel from "./components/phoneModel"
import {
  getIntervention,
  getLaber,
  counselorList,
  articleList,
  getAllActivityList,
  leavePhoneOrMessage,
} from "@/api/base/intervention"
import {HeartService,getArticleDetail,haveToKnow,KnowTreaty} from '@/api/user/psyExamintion'
import { getToken } from "@/utils/auth"
const MAX = 500;
export default {
  mixins: [],
  components: { PopUpDrawer,phoneModel },
  data () {
    return {
      clientHeight:0,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#FFA356', // 滚动条颜色
          opacity: 0.5, // 滚动条透明度
          'overflow-x': 'hidden'
        }
      },
      HeartData:[],
      id: 1,
      formtype:['确认'],
      sizeForm:[],
      orderTime:[],
      userImg:require('@/assets/logo/logo.png'),
      msgid: 10000,
      show:false,
      consultant_rawer: false,
      article_drawer: false,
      drawerWidth: "395px",
      evaluateItem:'',
      size: "10%",
      input_mobile: "",
      input_phone: "",
      input_msg: "",
      input_name: "",
      consultContent: "",
      consultMobile: "",
      consultSex:'0',
      consultName: "",
      websock: null,
      checkboxGroup1:[],
      succesful:true,
      activeName:'',
      navList: [
        {
          name: "干预介绍",
          key: "0"
        },
        {
          name: "心理困惑",
          key: "1"
        },
        {
          name: "咨询团队",
          key: "2"
        },
        {
          name: "文章列表",
          key: "3"
        },
        {
          name: "活动列表",
          key: "4"
        }
      ],
      tags: [],
      consultantList: [],
      articleList: [],
      articleLists:[],
      article: {
        name: "",
        text: ""
      },
      consultant: {
        labelList:[],
        user: {
          username: "",
          avatar: ""
        }
      },
      activityList: [],
      singleIntervention: null,
      messageList: [
      ],
      message: "",
      body_style: {
        padding: "0px 0px 0px 0px"
      }
    };
  },
   computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    // 监听消息列表，收到新消息后，滚动到底部
    messageList() {
      this.$nextTick(() => {
        this.$refs["myscroll"].wrap.scrollTop = this.$refs[
          "myscroll"
        ].wrap.scrollHeight;
      });
    }
  },
  created(){
    var dt = new Date();
    var hour = dt.getHours();
     var dateObj = {};
    if(hour>=20 && hour<24){
			for(var i = 1; i <= 7; i++) {
				dateObj = this.getDate(i);
        this.orderTime.push(dateObj);
      }
    }else{
      for(var i = 0; i <= 6; i++) {
				dateObj = this.getDate(i);
        this.orderTime.push(dateObj);
      }
    }

  },
  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)

    this.initWebSocket(); // 链接websocket
    this.getAllLaber();
    this.getCounselorList();
    this.getHeart()
    this.firstgetArticleList()
  },

  destroyed: function() {
    this.websocketclose();
  },

  methods: {
    toKnow () { // 预约须知
        haveToKnow().then(res=>{
          this.dealMsgCard(9, res.data.synopsis);
        })
    },
    getTreaty(){                 //心理咨询预约协议
      KnowTreaty().then(res=>{
        this.dealMsgCard(10, res.data.synopsis);
      })
    },
    getDate (n) {
        var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
        var timestamp = new Date().getTime(); //获取当前时间戳
        var date1 = new Date(ss * n + timestamp) //加上n天的国际标准日期
        var newTime = date1.toLocaleString(); //把日期转换成2018/6/4 下午10:45:19 格式
        var arr = newTime.split(" "); //把2018/6/4提取出来
        var arr2 = arr[0].split('/'); //把年月日数字单独提出来
        return arr2[0] + '-' + arr2[1] + '-' + arr2[2]
    },
    orederTime(value){   //预约时间

    },
    inputChange(e){
       const o = e.target;
      o.value = o.value.replace(/[^\u4E00-\u9FA5]/g, ''); // 清除除了中文以外的输入的字符
　　　this.consultName = o.value;
    },
    inputChanges(e){
       const o = e.target;
      o.value = o.value.replace(/[^\u4E00-\u9FA5]/g, ''); // 清除除了中文以外的输入的字符
　　　this.input_name = o.value;
    },
    phoneChange(){
      this.input_phone = this.input_phone.replace(/[^\d]/g, '')
    },
    handleScroll () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
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
    handleClick (e) {
     let index=e.index
     this.getArticleList(this.HeartData[index].id);
    },
    getHeart () {
        HeartService().then(res=>{
            this.HeartData=res.data
            this.getArticleList(res.data[0].id);
            this.activeName=res.data[0].value
        })
    },
    clocePic (val) {
      this.show=val;
    },
    handleCheckedCitiesChange (val) {
    },
    initWebSocket () {
      if ("WebSocket" in window) {
        this.connection = false;
        const url = Config.websocketApi;
        this.websock = new WebSocket(url + getToken());
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
      }
    },
    websocketonopen () {
      console.log("WebSocket连接成功");
    },
    websocketonerror (e) {
      console.log("WebSocket连接发生错误", e);
      // 重新连接
      if (!this.connection) {
        this.reconnection();
      }
    },
    websocketonmessage (e) {
      ///this.getOneParam(data);
      this.dealMsgCard(0, e.data);
    },
    websocketclose (e) {
      console.log("connection closed (" + e + ")");
    },
    reconnection () {
      this.count = this.count + 1;
      console.log("重新连接...【" + this.count + "】");
      let readyState = this.websock.readyState;
      //1与服务器已经建立连接
      if (this.count >= MAX || readyState == 1) {
        this.connection = true;
      } else if (readyState == 3) {
        //2已经关闭了与服务器的连接
        this.initWebSocket();
      }
    },

    /**
     * 生成各类消息
     * msgtype  0 普通消息 0 干预介绍 1 心理困惑 2 标签详情 3 咨询团队 4 文章列表 5 活动列表 6 留言 7 留电
     */
    dealMsgCard (msgtype, data, type = 0) {
      let that = this;
      that.msgid = that.msgid + 1;
      let cardMsg = {
        id: that.msgid,
        content: data,
        msgType: msgtype,
        type: type
      }
      that.messageList.push(cardMsg)
    },

    /**
     * 发送消息
     */
    sendMsg () {
      if(this.message.trim()==""){
        return false
      }
      this.dealMsgCard(0, this.message, 1);
      let that = this;
      let sendMessage = {
        sendtext: this.message,
        msgtype: 0
      };
      that.websock.send(JSON.stringify(sendMessage));
      that.message = "";
    },

    /**
     * 左侧导航点击事件处理
     */
    handleItemClick (key) {
      switch (key) {
        case "0":
          // 请求干预介绍接口
          this.getSingleIntervention();
          break;
        case "1":
          // 心理困惑
          this.dealMsgCard(1, this.tags);
          break;
        case "2":
          // 咨询团队
          this.dealMsgCard(3, this.consultantList);
          break;
        case "3":
          this.dealMsgCard(4, this.articleList);
          // 文章列表
          break;
        case "4":
          // 活动列表
          this.getActivityList();
          break;
        // 评价
        case "5":
          this.dealMsgCard(8, this.evaluateItem);
          break;
        // 留言
        case "6":
          this.dealMsgCard(6, "");
          break;
        // 留电
        case "7":
          this.dealMsgCard(7, "");
          break;
        // 电话咨询
        case "8":
          this.show=!this.show
          break;
      }
    },

    // 获取干预介绍
    getSingleIntervention () {
      getIntervention().then(res => {
        this.singleIntervention = res.data;
        this.dealMsgCard(0, this.singleIntervention.synopsis);
      });
    },

    // 查询心理困惑标签
    getAllLaber () {
      getLaber().then(res => {
        this.tags = res.data;
      });
    },
    // 生成标签详情消息
    handleTagClick (tagId) {
      let t = this.tags.filter(item => item.id === tagId)[0];
      this.dealMsgCard(2, t);
    },
    // 查询咨询师列表
    getCounselorList () {
      counselorList([]).then(res => {
        this.consultantList = res.data
      })
    },
    // 第一次获取文章列表
    firstgetArticleList () {
      articleList([]).then(res => {
        this.articleLists = res.data.slice(0,5)
      });
    },
    // 获取文章列表
    getArticleList (id) {
      articleList([id]).then(res => {
        this.articleList = res.data.slice(0,5)
      });
    },
    // 活动列表
    getActivityList () {
      getAllActivityList().then(res => {
        this.activityList = res.data;
        this.dealMsgCard(5, this.activityList);
      });
    },
    // 留电
    submitMobile () {
      let phoneNumber = this.input_mobile
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber))) {
        this.$message.error({
        message: '手机号码有误，请重填'
      })
      return false
    }
      let data = {
        phoneNumber: phoneNumber,
        way: "0"
      }
      leavePhoneOrMessage(data).then(res => {
        if (res.code == 0) {
          this.dealMsgCard(0, "已经收到您的留电，稍后同您联系");
        }
        this.input_mobile = "";
      })
    },
    //评价
    submitevaluate(){
      let evaluateItem=this.evaluateItem
       let data = {
        evaluate: evaluateItem,
        way: "3"
      }
      leavePhoneOrMessage(data).then(res => {
        if (res.code == 0) {
          this.dealMsgCard(0, "已经收到您的评价，感谢您的配合");
        }
        this.evaluateItem = "";
      })
    },
    // 留言
    submitMessage () {
      let data = {
        phoneNumber: this.input_phone,
        particulars: this.input_msg,
        name: this.input_name,
        way: "1"
      };
      leavePhoneOrMessage(data).then(res => {
        if (res.code == 0) {
          this.dealMsgCard(0, "已经收到您的留言，稍后同您联系");
        }
        this.input_phone = "";
        this.input_msg = "";
        this.input_name = "";
      });
    },
    // 处理文章弹出
    dealArticleDetail (articleId) {
      // let article = this.articleList.filter(item => item.id == articleId)[0];
      getArticleDetail(articleId).then(res=>{
        this.article = res.data
        this.article_drawer = true
      })

    },
    ActivityListDetail(article){
      this.article=article
      this.article_drawer = true
    },
    // 处理咨询师弹出
    dealConsultantDetail (consultantId) {
      let consultant = this.consultantList.filter(
        item => item.id == consultantId
      )[0]
      this.consultant = consultant
      this.consultant_rawer = true
    },
    // 确认预约
    confirmConsult () {
      let data = {
       startTime:this.sizeForm,
        phoneNumber: this.consultMobile,       //手机号
        name: this.consultName,
        gender:this.consultSex,                //性别
        particulars: this.consultContent,      //描述
        counselorid: this.consultant.id,
        way: "2",                               //咨询方式
        labelList:this.checkboxGroup1           //标签
      };
      if(this.checkboxGroup1.length==0){
        this.$message.error('咨询领域不能为空')
        return false
      }else if(this.consultMobile==''){
        this.$message.error('手机号不能为空')
        return false
      }else if(!(/^1[34578]\d{9}$/.test(this.consultMobile))){
        this.$message.error('手机号输入有误')
        return false
      }else if(this.consultName==''){
        this.$message.error('请输入姓名')
        return false
      }else if(this.consultContent==''){
          this.$message.error('请简单描述您的问题')
          return false
      }else if(this.formtype!="确认"){
         this.$message.error('请同意 《心理咨询预约协议》 ')
           return false
      }else if(this.sizeForm.length==0){
         this.$message.error('请选择预约时间')
           return false
      } else{
        leavePhoneOrMessage(data).then(res => {
        if (res.code == 0) {
           this.consultant_rawer = false;
          this.dealMsgCard(0, "已经收到您的预约，稍后同您联系");
        }
        this.checkboxGroup1=[]
        this.consultMobile=""
        this.consultName=""
        this.consultContent=""
        this.sizeForm=[]
      });
      }
    }
  }
}
</script>

<style lang="scss" >
.boxWarp{
// ::-webkit-scrollbar {
// width:8px;
// height:8px;
// }
// ::-webkit-scrollbar-thumb {
// border-radius:100px;
// -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
// background:#FF9844;
// }
// ::-webkit-scrollbar-track {
// -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
// border-radius:0;
// background:rgba(0,0,0,0.1);
// }
.box {
  width:1199px;
  // min-height:760px;
  height: 100%;
  margin: 0 auto;
  .el-card__header{
    background-color: rgb(239, 248, 247) ;
    padding: 1% 2%;
  }
}
.wrapper {
  height: calc(100% + 1px);
}
.askTeam{
  width:490px;
  cursor: default;
}
.leaveInfo{
  display:flex;
  line-height:55px;
  span{
     min-width: 75px;
  }
}
.askInfo{
   height:118px;
   position: relative;
   margin-bottom: 80px;
   div{
     margin-bottom: 17px;
   }
   .el-textarea{
     height: 100% !important;
    .el-textarea__inner{
      resize: none;
      border-radius: 0px!important;
      border-color: #ddd;
      height: 118px !important;
    }
   }
}
.MarkTime{
   div{
     margin-bottom: 17px;
   }
   .el-radio__input{
     display: none !important;
   }
   .el-radio__label{
     font-size: 15px!important;
   }
}
.agreeOrder{
     .agreement{
     display: flex;
     .el-checkbox__inner{
       border-color:#ddd;
     }
     .el-checkbox__input.is-checked +.el-checkbox__label{
       color:#333 !important;
         .el-checkbox-button__inner span{
             border: none !important;
             outline: none !important;
         }
     }
   }
}
.bottomBtn{
  display:flex;
  justify-content:space-evenly;
  margin:20px 0 30px;
  button{
    width:130px;
    height:35px;
    border-radius: 17px;
    font-size: 16px;
  }
}
.booksolt{
  width: 10px;
    display: inline-block;
    height: 10px;
    border-radius: 50%;
    background-color: #eb6100;
    margin-right: 10px;
}
.tareaBtn{
   height:145px;
   position: relative;
   .el-textarea{
     height: 100% !important;
    .el-textarea__inner{
      resize: none;
      border-radius: 0px!important;
      border-color: #ddd;
      border-bottom:none;
      height: 100% !important;
    }
   }
   button{
     position: absolute;
     bottom: 15px;
     right:50px;
   }
}
.listTabs{
  width:320px;
  min-height:380px;
  .articleRight{
    margin-left:20px
  }
}
.teamTitle{
    font-size:16px;
    font-weight:bold;
    margin-top:20px;
  }
  .appraise{
    .el-textarea__inner{
      min-height:146px!important;
    }
  }
.teamdetail{
  padding:24px;
  border-bottom: 1px solid #ddd;;
  .teamContent{
    display: flex;
    .teamContentLeft{
      width:125px;
      height: 162px;
      background-color: green;
      img{
        width:100%;
        height:100%
      }
    }
    .teamContentRight{
      margin-left:18px;
     position: relative;
    }
  }
.biaoqian{
  display: flex;
  margin:20px 0 35px;
  width: 294px;
  overflow:hidden;
  span{
    width: 88px;
    height: 30px;
    color:#eb6100;
    border: 1px solid #eb6100;
    display: inline-block;
    text-align: center;
    line-height: 30px;
    margin-right: 10px;
    border-radius:15px;
  }
}
     .subscribe{
      width: 88px;
      cursor: pointer;
      span{
        width: 88px;
        height: 30px;
        background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
        color:#fff;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
        border-radius:15px;
       }
    }
}
.lookall{
    position: absolute;
    right: 19px;
    top: 28px;
    color:#c3c3c3;
    cursor:pointer
}
.lookall:hover{
  color:#eb6100
}
  .teamContent{
    display: flex;
    .teamContentLeft{
      width:125px;
      height: 162px;
      background-color: green;
      img{
        width:100%;
        height:100%
      }
    }
    .teamContentRight{
      margin-left:18px;
     position: relative;
    }
  }
   .citychiose{
     .phoneNumber{
        border-bottom: 1px solid #ddd;
        span{
          line-height:28px;
        }
     .el-input__inner{
       border:none;
     }
     }

      .el-checkbox-button__inner{
        width: 76px !important;
        height: 30px !important;
        border:1px solid #ddd !important;
        margin:5px 4px 0 0 !important;
        border-radius: 15px !important;
      }
    }
.msgList {
  height:545px;
  border-left:1px solid #ddd;
  padding-left: 10px;
}
.listStyle{
  cursor:pointer;
  display:flex;
  line-height:70px;
  margin-bottom:10px;
}
.getphoneNum button{
  width:97px;
  height:35px;
  margin-top:10px;
  border-radius: 10px;
  border:1px solid #e7e7e7;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.text {
  font-size: 16px;
  color:#666;
  height:35px;
}
.text:hover{
  color: #eb6100;
}

.item {
  margin-bottom: 8px;
  cursor: default;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 0 auto;
  position: relative;
  width: 100%;
  height:100%;
  background: #fff;;
}
.interventQR{
    position: absolute;
    bottom:5%;
    left:17%;
  }
.img_avatar {
  vertical-align: middle;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 3%;
  transform: rotateY(180deg);
}
.el-card {
  border: 1px solid #ebeef5;
  border-radius: 0px;
}
textarea {
  resize: none;
  // border: none;
}
.an {
  display: inline-block;
  padding-left: 35px;
  text-align: center;
  .img_avatar{
  cursor:pointer
  }

}
.inv_tag {
  margin-left: 3px;
  cursor: default;
}
.el-tag--dark.el-tag--warning{
  border: 1px solid #ddd;
  background-color: #fff;
  color:#999;
  padding:0 10px;
  margin: 8px 10px;
}
.message-item {
  display: flex;
  padding: 10px 0 15px;
  width: 100%;
  text-align: left;

  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }

  .mesage-name {
    font-weight: bold;
  }
  //气泡
  .bubble {
    background: #f8f8f8;
    border-radius: 7px;
    padding: 7px 10px;
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    max-width: 540px;
    min-width: 30px;
    font-size:14px;
    color:#666;
    margin: 0 20px 0 5px;
    .el-input__inner{
      width:225px;
      height:35px;
      margin:10px 0;
      border:none!important;
    }
    .el-textarea__inner{
       border:none!important;
       resize: none;
    }
  }

  .bubble:before {
    content: "";
    border-style: solid;
    border-width: 8px 8px 8px 0;
    border-color: transparent #f1efef transparent transparent;
    position: absolute;
    top: 3px;
    left: -8px;
  }
}
//右侧
.message-item.right {
  flex-direction: row-reverse;

  .avatar {
    margin-left: 6px;
    margin-right: 0;
  }

  .bubble {
    background: #9eea6a;
    color: #000;
    margin: 0 5px 0 20px;
  }

  .bubble:before {
    border-width: 8px 0 8px 8px !important;
    border-color: transparent transparent transparent #9eea6a !important;
    left: 100%;
  }

  .mesage-name {
    text-align: right;
  }
 }
}
.el-checkbox-button.is-checked .el-checkbox-button__inner{
    box-shadow: none !important;
    border: none !important;
    -webkit-box-shadow: none !important;
    line-height: 15px !important;
}

</style>
