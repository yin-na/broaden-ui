<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view/>
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
  }
}
</script>

<style lang="scss" scoped>
  .app-main {
    z-index: 88;
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header+.app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .app-main {
      min-height: calc(100vh - 84px);
    }

    .fixed-header+.app-main {
      padding-top: 85px;
    }
  }
</style>
