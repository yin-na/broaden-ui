/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 首页
 */

<template>
    <div :style="{minHeight: clientHeight  + 'px'}" style="background:#fff;" class="flex-home">
      <!-- top -->
      <div class="inner clearfix">
        <div class="home_warp">
          <div class="banner fl">
              <div class="block">
                <el-carousel :interval="5000" arrow="always" class="d_jump" height="500px">
                  <el-carousel-item v-for="(item,index) in imgUrle" :key="index">
                    <img :src="item.idView" class="banner_img" >
                  </el-carousel-item>
                </el-carousel>
                <!-- postinon -->
                <div class="ban-bottom" >
                  <div class="ban-list" v-for="(item,index) in banList" :key="index" @click="nextWork(index)" @mouseenter="enterFun(index)" @mouseleave="leaveFun(index)">
                    <div>
                      <img :src="item.idView" v-show=" show || n != index">
                      <img :src="item.idView0" v-show="!show && n == index">
                    </div>
                    <div>
                      <span>{{item.name}}</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <!--  右侧列表  -->
          <div class="ri_list fr">
            <div class="ri_pic">
              <img src="@/assets/home/list-ri-1.png" class="image">
              <span>个人成长心理学专业课程</span>
            </div>
            <div class="ri_pic">
              <img src="@/assets/home/list-ri-2.png" class="image">
              <span>生活应用身体症状系列课程</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部介绍 -->
      <div class="bottom_list">
          <div class="inner">
              <div class="width35 fl">
                  <div class="ewm-btn" style="">
                      <img src="@/assets/home/btm-gzh.png" class="wem-hidden">
                      <img src="@/assets/home/btm-gzh-1.png" class="wem-show">
                      <div class="ewm-btn-1">
                          <img src="@/assets/home/ewm.png">
                      </div>
                  </div>
                  <div class="xcx-btn">
                      <img src="@/assets/home/btm-xcx.png" class="xcx-hidden">
                      <img src="@/assets/home/btm-xcx-1.png" class="xcx-show">
                      <div class="xcx-btn-1">
                          <img src="@/assets/home/xcx.png">
                      </div>
                  </div>
              </div>
              <div class="width65 fr">
                  <div class="width33 fl">
                      <p>企业服务</p>
                      <ul>
                          <li><router-link to="/psyArchives"><el-link :underline="false">心理档案</el-link></router-link></li>
                          <li><router-link to="/psyExamintion"><el-link :underline="false">心理体检</el-link></router-link></li>
                          <li><router-link to="/psyRelax"><el-link :underline="false">身心放松</el-link></router-link></li>
                      </ul>
                  </div>
                  <div class="width33 fl">
                      <p>用户帮助</p>
                      <ul>
                          <li><router-link to="/psyEquip"><el-link :underline="false">心理云</el-link></router-link></li>
                          <li><router-link to="/psyIntervent"><el-link :underline="false">心理干预</el-link></router-link></li>
                          <li><router-link to="/psyServe"><el-link :underline="false">心理服务</el-link></router-link></li>
                      </ul>
                  </div>
                  <div class="width33 fl">
                      <p>联系方式</p>
                      <ul>
                          <li>服务热线: 0531-67878238</li>
                          <li>服务邮箱: 12345677@163.com</li>
                          <li>联系我们</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Home',

  components: {},

  data () {
    return {
      clientHeight: 0,
      urlHider: '100',
      n: '',
      show: true,
      imgUrle: [
        { id: 0, idView: require('@/assets/home/banner-1.png') },
        { id: 1, idView: require('@/assets/home/banner-1.png') },
        { id: 2, idView: require('@/assets/home/banner-1.png') },
        { id: 3, idView: require('@/assets/home/banner-1.png') }
      ],
      banList: [
        { id: 0, idView: require('@/assets/home/ban-1.png'), name: '扫码注册', idView0: require('@/assets/home/ban-01.png') },
        { id: 1, idView: require('@/assets/home/ban-2.png'), name: '心理体检', idView0: require('@/assets/home/ban-02.png') },
        { id: 2, idView: require('@/assets/home/ban-3.png'), name: '身心放松', idView0: require('@/assets/home/ban-03.png') },
        { id: 3, idView: require('@/assets/home/ban-4.png'), name: '心理云', idView0: require('@/assets/home/ban-04.png') },
        { id: 4, idView: require('@/assets/home/ban-5.png'), name: '心理干预', idView0: require('@/assets/home/ban-05.png') },
        { id: 5, idView: require('@/assets/home/ban-6.png'), name: '心服务', idView0: require('@/assets/home/ban-06.png') }
      ]
    }
  },

  computed: {
  },

  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    changePlay (flag) {
      this.autoplay = flag
    },
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
    nextWork (id) {
      switch (id) {
        case 0:
          this.$router.push({ path: '/login' })
          break
        case 1:
          this.$router.push({ path: '/psyExamintion' })
          break
        case 2:
          this.$router.push({ path: '/psyRelax' })
          break
        case 3:
          this.$router.push({ path: '/psyEquip' })
          break
        case 4:
          this.$router.push({ path: '/psyIntervent' })
          break
        case 5:
          this.$router.push({ path: '/psyServe' })
          break
      }
    },
    enterFun (index) {
      this.show = false
      this.n = index
    },
    leaveFun (index) {
      this.show = true
      this.n = index
    }
  }
}
</script>

<style lang="less">
  .flex-home{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
.ban-bottom{
  position: absolute;
  width: 100%;
  bottom: 37px;
  display: flex;
  flex-direction: row;
  z-index: 9;
  div:hover{
    color: #3cf9e3;
  }
}
.ban-list{
  width: 16.6%;
  text-align: center;
  color: #fff;
  cursor: pointer;
  div:hover{
    color: #3cf9e3;
  }
  img{
    display: inline-block;
  }
}

.block{
  width: 100%;
  height: 100%;
  position: relative;
}
.banner_img{
  width: 100%;
  height: 100%;
}
// TOP
.home_warp{
  width: 100%;
  height: 500px;
  margin-bottom: 5%;
}
.banner{
  width: 67%;
}
.ri_list{
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.image{
  width: 100%;
  height: 100%;
}
.ri_pic{
  height: 47%;
  position: relative;
  span{
    position: absolute;
    bottom: 3%;
    left: 4%;
    color: #fff;
    font-size: 17px;
  }
}

// bottom
.bottom_list{
    width: 100%;
    height: 180px;
    padding-bottom: 1.5%;
    border-bottom: 1px solid #ddd;
    .width35{
      width: 33%;
      padding-top: 2%;
        .ewm-btn{
            position: relative;
            margin-bottom:10px;
            display: inline-block;
            cursor: pointer;
            .wem-show{
                display: none;
            }
        }
        .ewm-btn-1{
            display: none;
            background-repeat: no-repeat;
            background-size: 100%;
            position: absolute;
            left: 120%;
            bottom: -150%;
            z-index: 9999;
        }
        .ewm-btn:hover>.ewm-btn-1{
            display: block;
        }
        .ewm-btn:hover>.wem-show{
            display: block;
        }
        .ewm-btn:hover>.wem-hidden{
            display: none;
        }
        .xcx-btn{
            position: relative;
            display: inline-block;
            cursor: pointer;
            .xcx-show{
                display: none;
            }
        }
        .xcx-btn-1{
            display: none;
            background-repeat: no-repeat;
            background-size: 100%;
            position: absolute;
            left: 120%;
            bottom: -15%;
            z-index: 9999;
        }
        .xcx-btn:hover>.xcx-btn-1{
            display: block;
        }
        .xcx-btn:hover>.xcx-show{
            display: block;
        }
        .xcx-btn:hover>.xcx-hidden{
            display: none;
        }
    }
    .width65{
        width: 63%;
        .width33{
            width: 33%;
            p{
                font-weight: bold;
                line-height: 40px;
                font-size: 18px;
                color: #333;
            }
            li{
                line-height: 30px;
                color: #999;
                font-size: 16px;
                .el-link{
                    font-size: 16px;
                }
            }
        }
    }
  }
</style>
