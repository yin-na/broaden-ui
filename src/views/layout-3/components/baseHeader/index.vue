/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 公共导航
 */
<template>
    <div class="base-nav">
        <div class="inner width100" style="justify-content:space-between">
            <div class="width25">
                <div>
                    <img :src="maintain.leadLogo" alt="">
                </div>
            </div>
            <div class=" width55 fr" >
                <!-- <Menu class="" mode="horizontal" theme="primary" :active-name="activeName" style="background-color:#fff !important">
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
                </Menu> -->
            </div>
            <div class="width20">
              <!-- <div v-if="token" class="btn_login">
                  <img :src="user.avatar">
                   {{user.username}}
                   <div style="margin-left:10px;padding-top:5px">
                     <img class='cursorer' src="@/assets/user/getout.png" alt="" style="width:17px;height:17px" @click="getOut">
                   </div>
              </div> -->
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
                          <span style="display:block;"  @click="open">
                              <Dropdown-item divided >退出系统</Dropdown-item>
                          </span>
                          <span style="display:block;"  @click="changepassword">
                              <Dropdown-item divided >修改密码</Dropdown-item>
                          </span>
                      </Dropdown-menu>
                  </Dropdown>
                  <div style="margin-left: 30px;padding-top: 5px;">
                  <img src="@/assets/user/getout.png" alt="" style="width:17px;height:17px" @click="backFirst">
                  </div>

              </div>
              <div class="organs" style="padding-top:7px">
                <!-- <img src="@/assets/firstPage/switch.png" alt="" @click="getOut"> -->

             </div>
            </div>

        </div>
    </div>
</template>

<script>
// import { decomRoutes } from '@/router/decompression'
// import { psychological } from '@/router/psychological'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      href: '',
      // list: psychological.children.filter(item=>item.meta.exhibit),
      activeName: '/examination',
      target: '',
      login: false
    }
  },

  computed: {
    ...mapGetters([
      'dynamicModuleDat',
      'token',
      'user',
      'qq',
      'maintain'
    ])
  },

  created () {
  },
  activated () {
  },

  // },
  methods: {
    askIn () {
      if(getToken()){
        this.login=true
      }
    },
    changepassword(){
      this.$router.push('/personcenter')
    },
    backFirst(){
      this.$router.push('/')
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
    gotoPersonCenter(){
        this.$router.push('/psyArchives')
    },
    getOut(){
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
    }
    .width55{
        width: 60%;
    }
    .organs{
      margin-right: 40px;
      }
    .width25{
        width: 25%;
    }
    .width20{
        width:20%;
        // padding-left: 10px;
    }
    .btn_login{
        text-align: center;
        display: flex;
        line-height: 33px;
        // width: 100px;
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
        height: 80px;
        &, .inner {
            background: #fff;
        }
        .ivu-menu-horizontal {
            height: 33px;
            line-height: 33px;
            display: flex;
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
</style>
