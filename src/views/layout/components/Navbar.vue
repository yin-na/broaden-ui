<!-- 后台 top -->
<template>
  <div class="navbar">
    <!--  折叠  -->
<!--    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>-->
    <!-- 面包屑 -->
    <!--<breadcrumb class="breadcrumb-container"/>-->
    <div class="nav-tit">
      <span>社会心理服务网络云平台</span>
    </div>

    <div class="right-menu" :include="cachedViews">
      <div class="fresh-top" @click="refreshSelectedTag">
        <i class="el-icon-refresh" style="margin-right: 10px;"/>
        <span>刷新</span>
      </div>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img :src="user.avatar" class="user-avatar">
          <span style="vertical-align: top;font-size: 14px;color:#999">{{ this.$store.getters.user.username }}</span>
          <span style="position: relative; right: -10px; top: -8px"><i class="el-icon-arrow-down"/></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <span style="display:block;" @click="show = true">
            <el-dropdown-item>
              布局设置
            </el-dropdown-item>
          </span>
          <router-link to="/user/center">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <router-link to="/personcenter">
            <el-dropdown-item>
              修改密码
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              返回首页
            </el-dropdown-item>
          </router-link>
          <span style="display:block;" @click="open">
            <el-dropdown-item divided>
              退出登录
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'

export default {
  components: {
  },
  data () {
    return {
      dialogVisible: false,
      selectedTag: {}
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'device'
    ]),
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.path
    },
    show: {
      get () {
        return this.$store.state.settings.showRightPanel
      },
      set (val) {
        this.$store.dispatch('changeSetting', {
          key: 'showRightPanel',
          value: val
        })
      }
    }
  },
  methods: {
    open () {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    // 刷新
    refreshSelectedTag () {
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + this.$route.path
        })
      })
    },
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      this.dialogVisible = false
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 56px;
    line-height: 56px;
    border-radius: 0px !important;
    background-color:#fff;
    .avatar-wrapper span:hover{
      color: #1a7bfd !important;
    }
    .nav-tit{
      font-size: 22px;
      color: #333;
      padding-left: 39px;
      float: left;
    }
    .hamburger-container {
      line-height: 64px;
      height: 56px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      margin-right: 40px;
      display: flex;
      flex-direction: row;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 56px;
        margin-right: 30px;
        .avatar-wrapper {
          line-height: 56px;
          position: relative;
          cursor: pointer;
          .user-avatar {
            margin-top: 13px;
            margin-right: 13px;
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -10px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
      .fresh-top{
        margin-right: 25px;
        color: #999;
        cursor: pointer;
      }
      .fresh-top:hover{
        color: #37a6fe;
      }
    }
  }
</style>
