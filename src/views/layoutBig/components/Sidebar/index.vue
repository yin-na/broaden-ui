<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :unique-opened="$store.state.settings.uniqueOpened"
      mode="vertical"
      background-color="#182b5c"
      text-color="#fff"
      active-text-color="#2FB7FD"
    >
      <Logo :is-collapse="isCollapse" style="height: 120px"/>
      <sidebar-item v-for="route in list" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Logo from './Logo'
import { chart } from '@/router/bigEcharts'

export default {
  components: { SidebarItem, Logo },
  data () {
    return {
      list: []
    }
  },
  created(){
   this.list.push(chart)
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>
