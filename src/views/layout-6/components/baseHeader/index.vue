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
                    <img :src="maintain.leadLogo">
                </div>
            </div>
            <div class=" width55 fr">
                <Menu class="" mode="horizontal" theme="primary" :active-name="activeName" style="background-color:#fff !important">
                    <template v-for="item in list">
                        <MenuItem v-if="!item.children"
                              :key="item.path"
                              :name="item.path"
                              @click.native="goto(item)">
                            <template v-if="!item.isLook">{{ item.meta.title }}</template>
                        </MenuItem>
                    </template>
                    <MenuItem name='http://www.soulhappy.cn/' @click.native='contactus()'>联系我们</MenuItem>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script>
import { constantRouterMap } from '@/router/routers'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      href: '',
      list: [],
      // list: constantRouterMap.children.filter(item => item.meta.show),
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
      'qq',
      'maintain'
    ])
  },
  watch: {
    $route (val) {
      // let route = this.$route
      // let typeNum = route.params.typeNum
      // let flag = route.meta.flag

      // if (typeNum) {
      //   this.activeName = flag + '/' + typeNum
      // } else {
      //   this.activeName = val.meta.flag
      // }
    }

  },
  created () {
    constantRouterMap.forEach(element => {
      if (element.name === 'log') {
        this.list = element
      }
    })
    this.list = this.list.children.filter(item => item.meta.show)
  },
  methods: {
    askIn () {
      if(getToken()){
        this.login=true
      }
    },
    contactus(){
      window.open('http://www.soulhappy.cn/');
      // window.open(url.href, '_blank')
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
        this.$router.push('/personcenter')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        this.login = false
        this.$router.push('/login')
      })
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
      width: 75%;
      display: flex;
      justify-content: flex-end;
    }
    .width25{
        width: 25%;
        z-index: 999;
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
                margin-right:10px;
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
