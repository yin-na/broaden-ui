<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="contain-tit">
        <span>个人中心</span>
      </div>
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
        <el-card class="box-card" style="margin-top: 30px;border: none">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div style="padding: 20px 20px">
            <div style="text-align: center">
              <el-upload :show-file-list="false" :on-success="handleSuccess" :on-error="handleError"
                :headers="headers" :action="updateAvatarApi" class="avatar-uploader">
                <img v-if="user.avatar" :src="user.avatar" title="点击上传头像" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </div>
            <ul class="user-info">
              <li><svg-icon icon-class="user1" /> 用户名称 <div class="user-right">{{ user.username }}</div></li>
              <li><svg-icon icon-class="phone" /> 手机号码 <div class="user-right">{{ user.mobilePhone }}</div></li>
              <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ user.email }}</div></li>
              <li><svg-icon icon-class="dept" /> 所属部门 <div class="user-right"> {{ user.deptName }}</div></li>
              <li><svg-icon icon-class="date" /> 创建日期 <div class="user-right">{{ parseTime(user.crtTime) }}</div></li>
              <li>
                <svg-icon icon-class="anq" /> 安全设置
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">修改密码</a>
                  <a @click="$refs.email.dialog = true">修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card" style="margin-top: 30px;padding: 2% 3%;border: none;">
          <div slot="header" class="clearfix">
            <span>操作日志</span>
            <div style="display:inline-block;float: right;cursor: pointer" @click="refresh"><i :class="ico"/></div>
          </div>
          <log ref="log"/>
        </el-card>
      </el-col>
    </el-row>
    <updateEmail ref="email" :email="user.email"/>
    <updatePass ref="pass"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { regEmail, parseTime } from '@/utils/index'
import {updateAvatar} from '@/api/base/user'
import updatePass from './center/updatePass'
import updateEmail from './center/updateEmail'
import log from './center/log'
import { getToken } from '@/utils/auth'
import store from '@/store'

export default {
  name: 'Center',
  components: { updatePass, updateEmail, log },
  data () {
    return {
      ico: 'el-icon-refresh',
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'updateAvatarApi'
    ])
  },
  created () {
    store.dispatch('GetInfo').then(() => {})
  },
  methods: {
    parseTime,
    formatEmail (mail) {
      return regEmail(mail)
    },
    handleSuccess (response, file, fileList) {
       this.user.avatar=response.data.url
       updateAvatar({url:response.data.url}).then((res)=>{
          if(res.code==0){
            this.$notify({
               title: '头像修改成功',
               type: 'success',
               duration: 2500
            })
          }
          store.dispatch('GetInfo').then(() => {})
       })
    },
    // 监听上传失败
    handleError (e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
    refresh () {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .avatar-uploader-icon {
    font-size: 28px;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%
  }
  .user-info {
    padding-left: 0px;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      border-top: 1px solid #F0F3F4;
      padding: 11px 0px;
      font-size: 13px;
    }
    .user-right {
      float: right;

      a{
        color: #317EF3;
      }
    }
  }
  .contain-tit{
    line-height: 59px;
    height: 59px;
    color: #333;
    font-size: 18px;
    border-bottom: 2px solid #D5E1FF;
    font-weight: bold;
  }
</style>
