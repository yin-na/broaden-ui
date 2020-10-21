<template>
  <div>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="mini" style="width: 100%;" border>
      <el-table-column prop="description" label="操作描述" align="center"/>
      <el-table-column prop="requestIp" label="请求IP" align="center"/>
      <el-table-column prop="responseTime" label="请求耗时" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.responseTime <= 300" size="mini" >{{ scope.row.responseTime }}ms</el-tag>
          <el-tag v-else-if="scope.row.responseTime <= 1000" type="warning" size="mini">{{ scope.row.responseTime }}ms</el-tag>
          <el-tag v-else type="danger" size="mini">{{ scope.row.responseTime }}ms</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="logType" label="日志类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.logType==='F'" type="danger" size="mini" >失败</el-tag>
          <el-tag v-else  size="S">成功</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="crtUserName" label="操作人" width="180px" align="center"/>
      <el-table-column prop="crtTime" label="操作日期" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.crtTime) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import initData from '@/mixins/initData'
import { parseTime } from '@/utils/index'
export default {
  mixins: [initData],
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    beforeInit () {
      this.url = 'api/monitor/log/page'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      return true
    }
  }
}
</script>

<style scoped>
</style>
