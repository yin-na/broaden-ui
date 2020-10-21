/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 公共导航
 */
<template>
    <div class="base-nav">
        <div class="inner width100 clearfix">
            <div class="width25 fl">
                <div>
                    <img src="@/assets/logo/login.png">
                </div>
            </div>
            <div class=" width55 fr" v-if="user.roles[0].roleCode=='visitor'||user.roles[0].roleCode=='student'">
                <Menu class="" mode="horizontal" theme="primary" :active-name="activeName" style="background-color:#fff !important">
                    <template v-for="item in list">
                        <template v-if="!item.hidden">
                            <MenuItem v-if="!item.children"
                                        :key="item.path"
                                        :name="item.path"
                                        @click.native="goto(item)">
                                <template v-if="!item.isLook">{{ item.meta.title }}</template>
                            </MenuItem>
                        </template>
                    </template>
                </Menu>
            </div>
            <div class=" width55 fr" v-else-if="user.roles[0].roleCode=='counselor'">
                <Menu class="" mode="horizontal" theme="primary" :active-name="activeName" style="background-color:#fff !important">
                    <template v-for="item in service">
                        <template v-if="!item.hidden">
                            <MenuItem v-if="!item.children"
                                        :key="item.path"
                                        :name="item.path"
                                        @click.native="goto(item)">
                                <template v-if="!item.isLook">{{ item.meta.title }}</template>
                            </MenuItem>
                        </template>
                    </template>
                </Menu>
            </div>
            <!--  头像  -->
            <div class="width20 fl">
              <div v-if="token" class="btn_login">
                  <img :src="user.avatar">
                  <Dropdown>
                      <a href="javascript:void(0)">
                          {{user.username}}
                          <i class="el-icon-arrow-down el-icon--right"></i>
                      </a>
                      <Dropdown-menu slot="list">
                        <span style="display:block" @click="gotoPersonCenter">
                          <Dropdown-item>个人中心</Dropdown-item>
                        </span>
                          <span style="display:block;" @click="open">
                              <Dropdown-item divided >退出系统</Dropdown-item>
                          </span>
                          <span style="display:block" @click="changepassword">
                          <Dropdown-item>修改密码</Dropdown-item>
                        </span>
                      </Dropdown-menu>
                  </Dropdown>
                  <div style="margin-left: 11px;padding-top: 5px;">
                  <img src="@/assets/user/getout.png" alt="" style="width:17px;height:17px" @click="backFirst">  
                  </div>

              </div>
              <div v-else class="btn_login" @click="getin" style="display: flex;margin:9px 0 0 25px;cursor:pointer">
                <span style="padding:5px"><img src="@/assets/background/getIn.png" alt="" style="width:16px;height:16px;margin-right:3px;"></span>
                  <span style="color:#eb6100;font-size: 16px">登录</span>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { cloudRoutes } from '@/router/cloudrouter'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      href: '',
      list: cloudRoutes.children.filter(item=>item.meta.show),
      service:cloudRoutes.children.filter(item=>item.meta.service),
      activeName: '',
      target: '',
      login: false
    }
  },

  computed: {
    ...mapGetters([
      'dynamicModuleDat',
      'token',
      'user',
      'roles',
      'qq'
    ])
  },
  methods: {
    askIn () {
      if(getToken()){
        this.login=true
      }
    },
    changepassword(){
      this.$router.push('/personcenter')
    },
    getin(){
      if(this.$route.path=="/login"){
        return false
      }else{
        this.$router.push('/login')
      }
    },
    goto (item) {
      let path = item.path
      let pathNow = this.$route.path
      if (item.isLook) {
        return
      }
      if (item.isHref || item.isOpenHref) {
        this.target = item.isOpenHref ? '_blank' : ''
        this.href = item.href
        // 在线问答
        if (item.isHref) {
          this.href = this.qq
        }

        this.$nextTick(() => {
          this.$refs.href.click()
        })
        return
      }
      if (pathNow === path) {
        return
      }
      this.$router.push(path)
    },
    open () {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    backFirst(){
      this.$router.push('/')
    },
    gotoPersonCenter(){
        this.$router.push('/psyArchives')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        this.login = false
        this.$router.push('/login')
      })
    }
  },
  watch: {
    $route (val) {
      let route = this.$route
      let typeNum = route.params.typeNum
      let flag = route.meta.flag

      if (typeNum) {
        this.activeName = flag + '/' + typeNum
      } else {
        this.activeName = val.meta.flag
      }
    }

  }
}
</script>

<style lang="less" scoped>
    @import '../../../../styles/variables.less';
    .width100{
        width: 100%;
        display: flex;
        align-items: center;
        padding: 1.1% 0;
    }
    .width55{
        width: 65%;
    }
    .width25{
        width: 25%;
    }
    .width20{
        width: 12%;
        padding-left: 10px;
    }
    .btn_login{
        text-align: center;
        display: flex;
        line-height: 33px;
        img{
            width:33px;
            height: 33px;
            border-radius: 50%;
            margin-right: 3%;
        }
        .ivu-dropdown-rel{
            a{
               margin-bottom: 2%;
               font-size: 14px !important;
            }
        }
    }
     .btn_login a:hover{
       color:black!important
     }
    .base-header {
        .inner {
            padding-top: 28px;
            padding-bottom: 28px;
        }
        span, img {
            vertical-align: middle;
            line-height: 22px;
        }
        .h-right {
            margin-top: 24px;
        }
        .my-icon-user {
            width: 24px;
            img {
                width: 100%;
            }
        }
    }

    .base-nav {
        &, .inner {
            background: #fff;
        }
        .ivu-menu-horizontal {
            height: 33px;
            line-height: 33px;
            display: inline-block;
            .ivu-menu-item {
                font-size: 16px;
                flex: 1;
                text-align: center;
                border-radius: 20px;
                z-index: 5;
                &.ivu-menu-item-active {
                    z-index: 4;
                }
            }
        }
        .ivu-menu-submenu-title > i, .ivu-menu-submenu-title span > i {
            margin: 0;
        }
        .ivu-menu  > .ivu-menu-item-active {
            background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
            color: #fff !important;
            border-radius: 20px;
        }
        .ivu-menu-horizontal li:hover{
            background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
            color: #fff !important;
            border-radius: 20px;
        }
        .ivu-tooltip-light.ivu-tooltip-popper {
            left: auto!important;
            bottom: auto!important;
            left: 50%!important;
            transform: translateX(-50%);
            img {
                max-width: 100%;
            }
        }
        .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item,
        .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu{
            color: #686868;
            padding: 0;
        }
    }
    ::v-deep.ivu-menu-item{
      padding: 0 30px !important;
    }
</style>
