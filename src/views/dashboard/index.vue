<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
    <div class="appShow" >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import { count } from '@/api/base/visits'

/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
count().then(res => {})

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data () {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  }
}
</script>
<style>
  .appShow{
    width: 100%;
    height: 100%;
     margin: 0;
    padding: 0;
    position: absolute;
    background-image: url("../../assets/img/back.png") ;
    background-repeat:no-repeat;
    background-size: 100% 100%;
  }
</style>