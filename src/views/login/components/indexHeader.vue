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
          <img src="@/assets/logo/login.png" />
        </div>
      </div>
        <!--  登陆-->
<!--        <div class="login-pic fr">-->
<!--            <router-link to="/login">-->
<!--                <img src="@/assets/logo/logo-btn.png" style="width: 16px;height: 16px;margin-right: 6px">-->
<!--                <span style="font-size: 16px;color: #F1511B;line-height: 40px">登录</span>-->
<!--            </router-link>-->
<!--        </div>-->
      <div class="width55 fr">
        <Menu mode="horizontal" theme="primary" :active-name="activeName">
          <template v-for="(item,index) in list">
              <div :key="index" :name="index" class="tit-btn">
                  <span @click="gotoweb(item.url)">{{item.name}}</span>
              </div>
          </template>
        </Menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      href: "",
      //   list: cloudRoutes.children.filter(item=>item.meta.show),
      list: [{
        url:'http://www.soulhappy.cn/',
        name:'心服务'
      },{
        url:'http://www.xyloa.cn:8899',
        name:'门户网站'
      },{
        url:'http://www.xyloa.cn:8080/command',
        name:'数据指挥中心'
      },{
        url:'http://www.soulhappy.cn/al.html',
        name:'心理服务中心建设'
      },{
        url:'http://www.soulhappy.cn/Helps/xyljs.html',
        name:'关于我们'
      }
      ],
      activeName: "",
      target: "",
      login: false
    };
  },

  computed: {
    ...mapGetters(["dynamicModuleDat", "token", "user", "qq"])
  },

  created() {},
  activated() {},

  // },
  methods: {
    askIn() {
      if (getToken()) {
        this.login = true;
      }
    },
    gotoweb(url){
       window.open(url);
    },
    getin() {
      if (this.$route.path == "/login") {
        return false;
      } else {
        this.$router.push("/login");
      }
    },
    goto(item) {
      let path = item.path;
      let pathNow = this.$route.path;
      if (item.isLook) {
        return;
      }
      if (item.isHref || item.isOpenHref) {
        this.target = item.isOpenHref ? "_blank" : "";
        this.href = item.href;
        // 在线问答
        if (item.isHref) {
          this.href = this.qq;
        }

        this.$nextTick(() => {
          this.$refs.href.click();
        });
        return;
      }
      if (pathNow === path) {
        return;
      }
      this.$router.push(path);
    },
    open() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.logout();
      });
    },
    logout() {
      //   this.dialogVisible = false
      this.$store.dispatch("LogOut").then(() => {
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        this.login = false;
        this.$router.push("/login");
      });
    }
  },
  watch: {
    $route(val) {
      let route = this.$route;
      let typeNum = route.params.typeNum;
      let flag = route.meta.flag;

      if (typeNum) {
        this.activeName = flag + "/" + typeNum;
      } else {
        this.activeName = val.meta.flag;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.width100 {
  width: 100%;
  height: 100%;
  padding: 1% 0;
}
.width55 {
  width: 50%;
    .tit-btn{
        padding: 0 3%;
        text-align: right;
        cursor: pointer;
        font-size: 16px;
    }
    .tit-btn:hover{
        background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
        color: #fff;
        border-radius: 20px;
    }
}
.btn_login {
  text-align: center;
  display: flex;
  line-height: 35px;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 3%;
  }
  Dropdown {
    a {
      margin-bottom: 2%;
    }
  }
}
.btn_login a:hover {
  color: black !important;
}
.base-header {
  .inner {
    padding-top: 28px;
    padding-bottom: 28px;
  }
  span,
  img {
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
  height: 77px;
  &,
  .inner {
    background: #fff;
  }
  .ivu-menu-horizontal {
    height: 35px;
    line-height: 35px;
    display: flex;
    margin-top:5px;
    .ivu-menu-item {
      height:33px;
      flex: 1;
      line-height: 33px;
      border-radius: 16PX;
      text-align: center;
      z-index: 5;
      &.ivu-menu-item-active {
        z-index: 4;
      }
    }
  }
  .ivu-menu-submenu-title > i,
  .ivu-menu-submenu-title span > i {
    margin: 0;
  }
  .ivu-menu > .ivu-menu-item-active {
    background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
    color: #fff !important;
  }
  .ivu-tooltip-light.ivu-tooltip-popper {
    left: auto !important;
    bottom: auto !important;
    left: 50% !important;
    transform: translateX(-50%);
    img {
      max-width: 100%;
    }
  }
  .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item,
  .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu {
    // color: #686868;
    padding: 0;
  }
    .login-pic{
        display: inline-block;
        line-height: 40px;
        height: 40px;
        cursor: pointer !important;
    }
}
</style>
