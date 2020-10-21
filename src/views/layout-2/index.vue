<template>
  <div id="app">
    <template >
      <!-- 头部 -->
      <base-header></base-header>
      <!-- key：区分路由 -->
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
      <!-- 页脚 -->
      <base-footer></base-footer>
      <!-- 返回顶部 -->
      <base-go-top></base-go-top>
    </template>
  </div>
</template>

<script>
import baseHeader from './components/baseHeader'
import baseFooter from './components/baseFooter'
import baseGoTop from './components/baseGoTop'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  
  components: {
    baseHeader,
    baseFooter,
    baseGoTop
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    ...mapGetters([
        'dynamicModuleDat'
    ]),
  },
}
</script>