/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 首页下面模块主页
 */
<template>
    <div class="">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的资料" name="1">
                    <!-- 资料 -->
                    <dataDetail style="margin-top: 2%"></dataDetail>
                </el-tab-pane>
                <el-tab-pane label="心路历程" name="2">
                    <fileDetail style="margin-top: 2%"></fileDetail>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>
import dataDetail from './dataDetail'
import fileDetail from './fileDetail'

export default {
  mixins: [],
  components: {
    dataDetail,
    fileDetail
  },
  data () {
    return {
      activeName: '1'
    }
  },
  computed: {
  },
  methods: {
    handleClick (tab, event) {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
