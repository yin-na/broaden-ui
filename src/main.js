import Vue from 'vue'
import App from './App.vue'
import router from './router/routers'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons' // icon
import './router/index' // permission control
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import permission from './components/permission'
require('babel-polyfill')
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })
Vue.use(permission)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
