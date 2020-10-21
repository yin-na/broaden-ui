<template>
  <div class="login">
    <div class="login-warp">
      <img v-if="!showIcon" class="log-banner" :src="src1" alt="">
      <img v-else-if="showIcon" class="log-banner" :src="src0" alt="">
      <div class="log-cont">
        <div class="tabs-tit">
          <span @click="tabsBtn(1)" :class="{fontStyle:!showIcon}">教育云</span>
          <span class="vacal"></span>
          <span @click="tabsBtn(2)" :class="{fontStyle:showIcon}">社会云</span>
        </div>
        <span class="tit-tet">欢迎登录{{maintain.projectName}}</span>
        <div class="logform">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
            <el-form-item prop="loginName" style="margin-bottom:31px" class="input">
              <img class="pic" src="@/assets/login/user-1.png" alt="">
              <el-input v-model="loginForm.loginName" type="text" auto-complete="off" placeholder="用户名">
              </el-input>
            </el-form-item>
            <el-form-item prop="password" class="input">
              <img class="pic" src="@/assets/login/pass-1.png" alt="">
              <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
              </el-input>
            </el-form-item>
              <el-form-item prop="code" class="input" v-if="loginForm.loginName==superloginName">
              <img class="pic" src="@/assets/login/pass-1.png" alt="">
              <el-input v-model="loginForm.code" type="text" auto-complete="off" placeholder="短信验证码" @keyup.enter.native="handleLogin">
              </el-input>
              
            </el-form-item>
             <div class="login-code " style="margin-top:10px" v-if="loginForm.loginName==superloginName">
              <el-button :disabled="disabled" @click="getCode" class="count fs16">{{count}}</el-button>
            </div>
            <el-form-item style="margin-top:22px;margin-bottom:55px">
              <el-checkbox v-model="checked" style="border-color:#e5e5e5;">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item style="width:100%;">
              <el-button :loading="loading" size="medium" type="primary"  @click.native.prevent="handleLogin">
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
              <div class="forget">忘记账号密码？</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCode} from "@/api/base/login"
import Config from "@/config/index"
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      codeUrl: '',
      superloginName:Config.superLoginName,
      checked: false, // 记住密码
      showIcon: true, // 切换展示状态
      src0:'',
      src1:'' ,
      loginForm: {
        loginName: '',
        password: '',
        code:''
      },
      count:"获取验证码",
      disabled:false,
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  created(){
        this.$store.dispatch('setStatemaintain').then(() => {
            this.src1=this.maintain.loginLogoOne
            this.src0=this.maintain.loginLogoTwo
          }).catch((errpr) => {
            console.log(error)
          })
  },
  computed: {
      ...mapGetters([
          'maintain'
      ])
    },
    mounted(){
      console.log(this.maintain,789)
    },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin () {
      let that = this
      that.$refs.loginForm.validate(valid => {
        const user = that.loginForm
        if (valid) {
          that.loading = true
          that.$store.dispatch('Login', user).then(() => {
            that.loading = false
            that.$router.push({ path: '/' })
          }).catch(() => {
            that.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
      getCode() {
      let userPhone = this.loginForm.loginName;
      if (userPhone === "") {
        this.$message.error("手机号不能为空");
        return false;
      } else if (!/^1[3456789]\d{9}$/.test(userPhone)) {
        this.$message.error("手机号输入有误");
        return false;
      } else {
        getCode(userPhone).then(res => {
        });
        const TIME_COUNT = 60;
        if (!this.timer) {
          var counts = TIME_COUNT;
          this.disabled = true;
          this.timer = setInterval(() => {
            if (counts > 0 && counts <= TIME_COUNT) {
              counts--;
              this.count = counts + "秒后重新获取";
            } else {
              this.disabled = false;
              this.count = "获取验证码";
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    // 点击切换
    tabsBtn (index) {
      if (index === '1') {
        this.showIcon = !this.showIcon
      } else {
        this.showIcon = !this.showIcon
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  // background-image: url(../../assets/login/logo-bg.png);
  // background-size: cover;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.colorC5{
  color:#C6C5C5
}
 .login-code {
    width: 32%;
    display: inline-block;
    height: 38px;
  }
  .login-code img {
    cursor: pointer;
    vertical-align: middle;
  }
//  登陆页新改样式
.login-warp{
  width: 1200px;
  height: 590px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  .log-banner{
    width: 759px;
    height: 590px;
  }
  .log-cont{
    width: 441px;
    height: 590px;
    background: #fff;
    padding: 85px 60px 0 60px;
    box-shadow: 2px 0 5px 2px #f2efef;
    .tabs-tit{
      width: 227px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span{
        display: inline-block;
        font-size: 24px;
        color: #999;
        cursor: pointer;
      }
      .vacal{
        border-right: 3px solid #999;
        height: 22px;
        width: 3px;
        margin-top: 5px;
        cursor: none;
      }
    }
    .tit-tet{
      display: inline-block;
      font-size: 16px;
      color: #999;
      margin-top: 25px;
      margin-bottom: 53px;
    }
    .login-form{
      ::v-deep .el-input--mini .el-input__inner{
        height: 40px;
        width:320px;
        border-color:#e5e5e5;
        font-size: 16px;
        padding-left: 45px;
        position: relative;
        color: #C8C8C8;
      }
      .pic{
        position: absolute;
        top: 11px;
        left: 15px;
        z-index: 1;
        width: 18px;
        height: 18px;
      }
      .forget{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        color: #666;
        margin-top: 20px;
      }
      button{
        width:320px;
        height:40px;
        background-color: #fe6630;
        border:none;
        span{
          font-size: 18px;
          color: #fff;
          // font-weight: bold;
        }
      }
    }
  }
}
::v-deep .el-checkbox__inner{
  border:1px solid #e5e5e5;
}
.fontStyle{
  color: #fe6630 !important;
  font-weight: bold;
}
</style>
