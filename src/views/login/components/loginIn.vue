<template>
    <div class="login" :style="{minHeight: clientHeight  + 'px'}">
      <el-tabs v-model="activeName" @tab-click="handleClick" v-if='binding==0'>
      <el-tab-pane label="用户注册" name="first">
         <div class="login-form">
             <div class="QRcode">
             <img :src="QRimg" @click="getQR">
             </div>
             <div style="margin:20px 0 0 27%">微信扫一扫，快速注册</div>
              <div style="position:absolute;right:20px;bottom:16px;font-size:14px">已有账号？<span style="color:#23cbd4;cursor:pointer" @click="activeName='second'">请登录&nbsp;></span></div>
         </div>
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="second">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
        <el-form-item prop="mobile">
        <!-- <div style="height:10px"></div> -->
          <el-input v-model="loginForm.mobile"   maxLength="11"  auto-complete="off" placeholder="手机号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
        </el-form-item>
        <el-form-item prop="messageCode">
          <el-input v-model="loginForm.messageCode" auto-complete="off"  maxLength="4" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
          <div class="login-code" style='margin-left:15px'>
              <el-button  :disabled="disabled"  @click="getCode" class="count">{{count}}</el-button>
          </div>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button class="Btn" :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>
        </el-form-item>
        <div style="position:absolute;right:20px;bottom:16px;font-size:14px">还没有账号？<span style="color:#23cbd4;cursor:pointer" @click="activeName='first'">立即注册&nbsp;></span></div>
      </el-form>
      </el-tab-pane>
      <el-tab-pane label="账号登录" name="third">
        <el-form ref="loginForms" :model="loginForm" :rules="accountRules" label-position="left" label-width="0px" class="login-form">
        <el-form-item prop="loginName">
        <!-- <div style="height:10px"></div> -->
          <el-input v-model="loginForm.loginName"   maxLength="11"  auto-complete="off" placeholder="请输入账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" auto-complete="off"  maxLength="6" placeholder="密码" style="width:100%" @keyup.enter.native="handleLogins">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button class="Btn" :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogins">
            <span v-if="!loading">登录</span>
            <span v-else>登录中...</span>
          </el-button>
        </el-form-item>
        <div style="position:absolute;right:20px;bottom:16px;font-size:14px">忘记密码？<span style="color:#23cbd4;cursor:pointer" @click="binding='2'">立即修改&nbsp;></span></div>
      </el-form>
      </el-tab-pane>
    </el-tabs>
    <div v-else-if="binding==1" class="binging">
        <div style= "text-align:center;margin:15px 0;font-size:16px">信息綁定</div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile"   maxLength="11"  auto-complete="off" placeholder="手机号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
        </el-form-item>
         <el-form-item prop="birthday">
         <el-date-picker v-model="loginForm.birthday" type="date" @change="getSTime"  :picker-options="pickerOptions0" format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item prop="messageCode">
          <el-input v-model="loginForm.messageCode" auto-complete="off"  maxLength="4" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
          <div class="login-code" style='margin-left:15px'>
              <el-button  :disabled="disabled"  @click="getCode" class="count">{{count}}</el-button>
          </div>
        </el-form-item>
        <el-form-item style="width:100%;">
          <!-- <el-button @click='goback'>返回</el-button> -->
          <el-button class="Btn" :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="bindHandler">立即綁定</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else class="binging">
      <div style= "text-align:center;margin:15px 0;font-size:16px">修改密码</div>
      <el-form ref="changeForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <el-form-item prop="mobile">
        <el-input v-model="loginForm.mobile"   maxLength="11"  auto-complete="off" placeholder="手机号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
        </el-input>
      </el-form-item>
      <el-form-item prop="messageCode">
        <el-input v-model="loginForm.messageCode" auto-complete="off"  maxLength="4" placeholder="验证码" style="width: 63%" >
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
        </el-input>
        <div class="login-code" style='margin-left:15px'>
            <el-button  :disabled="disabled"  @click="getCode" class="count">{{count}}</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="newPassword">
          <el-input v-model="loginForm.newPassword" auto-complete="off"  maxLength="6" placeholder="新密码" style="width:100%" >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
        </el-form-item>
        <el-form-item prop="passwordagain">
          <el-input v-model="loginForm.passwordagain" auto-complete="off"  maxLength="6" placeholder="确认密码" style="width:100%" >
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon" style="height: 39px;width: 13px;margin-left: 2px;" />
          </el-input>
        </el-form-item>
      <el-form-item style="width:100%;">
        <el-button class="Btn" :loading="loading" size="medium" type="primary" style="width:100%;margin-top:15px" @click.native.prevent="changeHandler">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
    </div>
  </template>

<script>
import Config from '@/config'
import Cookies from 'js-cookie'
import { getCode, getQRImg, getQRInfo, gotoPage, getBind, changePassword } from '@/api/base/login'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
var timer = null
export default {
  name: 'Login',
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
    data () {
      return {
        pickerOptions0: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        activeName: 'second',
        binding: '0',
        count: '获取验证码',
        login: '注册账号',
        regist: '账号登录',
        disabled: false,
        clientHeight: 0,
        QRimg: '',
        //  用户ID
        QRId: '',
        //  二维码ID
        ID: '',
        Inquiry: '',
        show: true,
        codeUrl: '',
        loginForm: {
          mobile: '',
          birthdy: '',
          password: '',
          messageCode: '',
          newPassword:'',
          passwordagain:''
        },
        loginRules: {
          mobile: [
            { required: true, trigger: 'blur', message: '手机号不能为空' },
            { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }
          ],
          birthday: [
            { required: true, trigger: 'blur', message: '生日不能为空' }
            // { validator: validateDate, trigger: ['blur', 'change'] }
          ],
          loginName: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
          password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
          newPassword: [{ required: true, trigger: 'blur', message: '新密码不能为空' }],
          passwordagain: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
          messageCode: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
        },
        accountRules:{
          loginName: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
          password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        },
        loading: false,
        redirect: undefined,
        webName: Config.webName
        // login: '账号登录',
        // regist: '账号注册'
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created () {
      // this.getCode()
      // this.getCookie()
      // this.getQR()
    },
    mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 180
    window.addEventListener('scroll', this.handleScroll)
  },
    beforeDestroy () {
      clearInterval(timer)
    },
    methods: {
    //   changePlay (flag) {
    //   this.autoplay = flag
    // },
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
      getSTime (val) {
        var dt = new Date(val)
        var year = dt.getFullYear()
        var month = dt.getMonth() + 1
        var day = dt.getDate()
        var days = year + '-' + month + '-' + day
        this.loginForm.birthday = days
      },
      // goback () {
      //   this.binding = true
      //   this.getQR()
      // },
      // 立即綁定
      changeHandler(){
        let mobile = this.loginForm.mobile
        let newPassword = this.loginForm.newPassword
        var messageCode = this.loginForm.messageCode
        let passwordagain = this.loginForm.passwordagain
        this.$refs.changeForm.validate(valid => {
           if (valid) {
             if(newPassword !=passwordagain){
              this.$message.error('两次输入的密码不一致');
              return false
             }else{
              changePassword(mobile,messageCode,newPassword).then(res => {
                if(res.code==0){
                  this.binding=0
                }

              })
             }

          } else {
            return false
          }
        })
      },
      bindHandler () {
        let phone = this.loginForm.mobile
        let birthday = this.loginForm.birthday
        var messageCode = this.loginForm.messageCode
        var userId = this.ID
        getBind(phone, birthday, messageCode, userId).then(res => {
          this.$store.dispatch('binding', res.data.token).then(() => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
          })
        })
        // const TIME_COUNT = 60
        // if (!this.timer) {
        //   this.count = TIME_COUNT
        //   this.show = false
        //   this.timer = setInterval(() => {
        //     if (this.count > 0 && this.count <= TIME_COUNT) {
        //       this.count--
        //     } else {
        //       this.show = true
        //       clearInterval(this.timer)
        //       this.timer = null
        //     }
        //   }, 1000)
        // }
      },
      getQR () {
        getQRImg().then(res => {
          this.QRimg = res.data.qrCodeUrl
          this.QRId = res.data.id
          this.askInfo()
        })
      },
      askInfo () {
        timer = setInterval(() => {
          setTimeout(() => {
            getQRInfo(this.QRId).then(res => {
              this.ID = res.data.userId
              let status = res.data.status
              switch (status) {
                case 1:
                  break
                case 2:
                  break
                case 0:
                  console.log('二维码失效')
                  this.getQR()
                  break
                case 3:
                  clearInterval(timer)
                  this.binding = 1
                  console.log('跳转信息页')
                  break
                case 4:
                  clearInterval(timer)
                  this.gotoPage()
                  console.log('跳转首页')
                  break
                default:
                  console.log('出错了！！！')
              }
            })
          })
        }, 1000)
      },
      gotoPage () {
        let self = this
        let id = self.QRId
        let userId = self.ID
        gotoPage(id, userId).then(res => {
          if (res.status === 200) {
            this.$store.dispatch('binding', res.data.token).then(() => {
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
            })
          }
        })
      },
      getCode () {
        let userPhone = this.loginForm.mobile
        if (userPhone === '') {
          this.$message.error('手机号不能为空')
          return false
        } else if (!(/^1[3456789]\d{9}$/.test(userPhone))) {
          this.$message.error('手机号输入有误')
          return false
        } else {
          getCode(userPhone).then(res => {
          })
          const TIME_COUNT = 60
          if (!this.timer) {
            var counts = TIME_COUNT
            this.disabled = true
            this.timer = setInterval(() => {
              if (counts > 0 && counts <= TIME_COUNT) {
                counts--
                this.count = counts + '秒后重新获取'
              } else {
                this.disabled = false
                this.count = '获取验证码'
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000)
          }
        }
      },
      checkMobile () {
      },
      handleClick (tab, event) {
        if (this.activeName === 'first') {
          this.getQR()
        } else {
          clearInterval(timer)
        }
      },
      // getCode () {
      //   getCodeImg().then(res => {
      //     this.codeUrl = 'data:image/gif;base64,' + res.img
      //     this.loginForm.uuid = res.uuid
      //   })
      // },
      getCookie () {
        const loginName = Cookies.get('loginName')
        // let password = Cookies.get('password')
        const rememberMe = Cookies.get('rememberMe')
        // password = password === undefined ? this.loginForm.password : password
        this.loginForm = {
          loginName: loginName === undefined ? this.loginForm.loginName : loginName,
          // password: password,
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
          code: ''
        }
      },
      handleLogin () {
        let that = this
        that.$refs.loginForm.validate(valid => {
          const user = that.loginForm
          if (valid) {
            this.$store.dispatch('Login', user).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.loading = false
            })
          }

        })
      },
      handleLogins() {
        this.$refs.loginForms.validate(valid => {
          const user = this.loginForm
           if (valid) {
            this.loading = true
            this.$store.dispatch('Logins', user).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }).catch(() => {
              this.loading = false
              // this.getCode()
            })
          } else {
            return false
        }
      })
    }
  }
}
</script>

  <style rel="stylesheet/scss" lang="scss" >
  .binging{
    width:430px;
    height:469px;
    background-color: #ffffff;
     box-shadow: 0 2px 4px #d8e6e7;
  }

  .el-tabs__header{
    margin:0;
  }
  .el-tabs__item.is-active{
    color:#23cbd4
  }
  .el-tabs__nav-scroll{
    background-color: #ffffff;
  }
  .el-tabs{
    box-shadow: 0 2px 4px #d8e6e7;
  }
  .el-tabs__item{
  font-size: 20px;
  font-weight: 400;
  color:#989898;
  }
  .el-tabs__active-bar{
  width: 98px !important;
  background-color:#23cbd4;
  margin-left: 59px;
  transition:transform .1s cubic-bezier(.645,.045,.355,1),-webkit-transform .1s cubic-bezier(.645,.045,.355,1) ;
  }
  .el-tabs__nav {
  padding-left:75px;
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height:calc(100% - 134px);
    /* background-image: url(../../assets/background/bgBule.png); */
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }
  .count{
    width:102px;
    padding:7px 5px!important;
    font-size:15px;
    background:none !important;
    color:#23cbd4!important;
    border:none;
  }
  #tab-first,#tab-second,#tab-third{
    font-size:16px;
    height: 60px;
    line-height: 60px;
  }
  #tab-first,#tab-second,#tab-third:hover{
    /* color:#23cbd4; */
  }
  .QRcode{
    width:240px;
    height:240px;
    margin:0 auto;
  }
  .QRcode img{
    width:100%;
  }
  .login-form {
    /* border-radius: 6px; */
    background: #ffffff;
    width: 430px;
    height:410px;
    padding: 45px 25px 5px 25px;
  }
  .login-form .el-input {
      height: 39px;
      border-bottom: 1px solid #f2f2f2;
      margin-top:16px;
  }
  .login-form .el-input input{
    height: 38px;
    border:none;
  }
  .Btn{
    height:45px;
    margin-top:75px;
    font-size:16px;
    background:#23cbd4;
  }
  .el-button--primary{
    border:none;
    background: #23cbd4 !important;
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 32%;
    display: inline-block;
    height: 38px;
  }
  .login-code img {
      cursor:pointer;
      vertical-align:middle;
    }
  </style>
