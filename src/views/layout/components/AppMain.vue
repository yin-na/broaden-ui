<!-- contain -->
<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
      <!-- <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"/>
      </keep-alive> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
     cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-main {
    z-index: 88;
    /*84 = navbar + tags-view = 65 +65 */
    min-height: calc(100vh - 130px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header+.app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      min-height: calc(100vh - 130px);
    }

    .fixed-header+.app-main {
      padding-top: 85px;
    }
  }
  .el-card .box-card .is-always-shadow{
    border: none !important;
    box-shadow: none !important;
  }
</style>
