<template>
  <div>
    <div v-if="!item.hidden" class="menu-wrapper">
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)">
        <app-link :to="resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
            <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon||item.meta.icon" :title="onlyOneChild.meta.title" />
          </el-menu-item>
        </app-link>
      </template>

      <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
        <template slot="title">
          <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
        </template>

        <template v-for="child in item.children" >
          <sidebar-item
                  v-if="child.children&&child.children.length>0"
                  :is-nest="true"
                  :item="child"
                  :key="child.path"
                  :base-path="resolvePath(child.path)"
                  class="nest-menu" />

          <app-link v-else :to="resolvePath(child.path)" :key="child.id">
            <el-menu-item :index="resolvePath(child.path)" v-if="!child.hidden">
              <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
            </el-menu-item>
          </app-link>
        </template>
      </el-submenu>
    </div>
    <div v-else class="menu-wrapper">

    </div>
    <div v-if="sidebar.opened" style="position: fixed;bottom: 0;height: 56px;text-align: center;background: #274179;width: 245px;padding-top: 13px;">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>
    <div v-else style="position: fixed;bottom: 0;height: 56px;text-align: center;background: #274179;width: 36px;padding-top: 13px;">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink, Hamburger },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onlyOneChild: null,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'device'
    ]),
    show: {
      get () {
        return this.$store.state.settings.showRightPanel
      },
      set (val) {
        this.$store.dispatch('changeSetting', {
          key: 'showRightPanel',
          value: val
        })
      }
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    // logout () {
    //   this.dialogVisible = false
    //   this.$store.dispatch('LogOut').then(() => {
    //     location.reload() // 为了重新实例化vue-router对象 避免bug
    //   })
    // },
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      // // eslint-disable-next-line no-debugger
      // debugger
      //  判断页面路径
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    },
    isExternalLink (routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
