<template>
  <div style="width:100%;position: relative;">
    <template>
      <!-- 头部 -->
      <base-header></base-header>
      <!-- key：区分路由 -->
      <keep-alive>
        <div style="background:#eff8f7">
          <vue-scroll :ops="ops">
            <el-backtop style="right:15%;bottom: 20%;"></el-backtop>
            <router-view :key="key" :style="{minHeight: clientHeight  + 'px'}" />
          </vue-scroll>
        </div>
      </keep-alive>
      <!-- 页脚 -->
      <base-footer></base-footer>
    </template>
  </div>
</template>

<script>
import baseHeader from './components/baseHeader'
import baseFooter from './components/baseFooter'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    baseHeader,
    baseFooter
  },
  data () {
    return {
      clientHeight: 0,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#C0C0C0', // 滚动条颜色
          opacity: 0.8, // 滚动条透明度
          'overflow-x': 'hidden'
        }
      }
    }
  },
  computed: {
    key () {
      return this.$route.fullPath
    },
    ...mapGetters([
    // 'dynamicModuleDat'
    ])
  },
  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 140
  }
}
</script>
<style lang="scss">
  ::-webkit-scrollbar
  {
    width: 8px;
  }
  /* 垂直滚动条的滑动块 */
  ::-webkit-scrollbar-thumb:vertical {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color:#E0E0E0;
  }

  ::-webkit-scrollbar-track {
    border: none;
    border-radius: 10px;
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    border: 1px #E0E0E0 solid;
    border-radius: 10px;
    background: #E0E0E0;
  }
</style>
