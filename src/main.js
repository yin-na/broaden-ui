import Vue from 'vue'
import App from './App.vue'
import router from './router/routers'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueDraggableResizable from 'vue-draggable-resizable';
import VueDragResize from 'vue-drag-resize';
// import 'muse-ui/dist/theme-light.min.css'
import '@/icons' // icon
import './router/index' // permission control
import '@/styles/index.scss' // global css
import '@/styles/baseScss.scss' // global css
import '@/styles/element-variables.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import permission from './components/permission'
import permissions from '@/mixin/permission' // 全局注册按钮权限mixin
import filters from '@/mixin/baseData/filters' // 过滤mixin
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import "@/assets/iconfont/iconfont.css"          //iconfont图标
import '@/styles/iview.less'
import '@/styles/psyEquip.css'
import '@/styles/index.less'
import VueVideoPlayer from 'vue-video-player' // 视频播放插件
import 'video.js/dist/video-js.css'
import 'videojs-flash' // swf播放插件
import dataV from '@jiaminghi/data-view' // 大屏插件
Vue.use(dataV)
Vue.use(VueVideoPlayer)
// 引入echarts
import echarts from 'echarts'
import VCharts from 'v-charts' // 图表组件
import vuescroll from 'vuescroll' // 滚动条
import 'vuescroll/dist/vuescroll.css' // 滚动条样式
import './utils/components' // 全局注册组件
import vueSeamlessScroll from 'vue-seamless-scroll'
import waterfall from 'vue-waterfall2'
import getter from '@/mixin/getter' // 过滤mixin
import '@/styles/index.less'
Vue.use(vuescroll) // 滚动条
Vue.prototype.validForbid = function (value, number = 255) {
  value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
  if (value.length >= number) {
    this.$message({
      type: "warning",
      message: `输入内容不能超过${number}个字符`
    });
  }
  return value;
}
Vue.use(VCharts)
Vue.prototype.$echarts = echarts
require('babel-polyfill')
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Vue.use(permission)
Vue.use(MuseUI)
Vue.use(iview)
Vue.use(vueSeamlessScroll)
Vue.use(waterfall)
Vue.mixin(getter)
Vue.mixin(permissions)
Vue.mixin(filters)
Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.component('vue-drag-resize', VueDragResize);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
