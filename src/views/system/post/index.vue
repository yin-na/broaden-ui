<template>
  <div class="app-container">
    <div class="contain-tit">
      <span>岗位管理</span>
    </div>
    <div class="head-container">
      <el-input v-model="params.postName" class="filter-item" clearable  placeholder="岗位名称" style="width:150px;margin-right:8px" @keyup.enter.native="handleQuery"/>
      <el-input v-model="params.postCode" class="filter-item" clearable  placeholder="岗位编码" style="width:150px;margin-right:8px" @keyup.enter.native="handleQuery"/>
      <el-select v-model="params.status" class="filter-item" clearable  placeholder="岗位状态" style="width:150px;margin-right:8px" @keyup.enter.native="handleQuery">
        <el-option v-for="item in statusOptions" :key="item.id" :value="item.value" :label="item.label"/>
      </el-select>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button type="success" icon="el-icon-plus" size="mini" v-permission="['system:post:add']"  @click="handleCreate">新增</el-button>
      <el-button type="button" size="mini" icon="el-icon-refresh" @click="handleReset">重置</el-button>
    </div>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="mini"
              :header-cell-style="{fontSize:'14px',height:'35px',lineHeight:'35px',}"
              :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
              :height="tableHeight" style="width: 100%;" border>
      <el-table-column prop="postCode" label="岗位编码" align="center">
        <template slot-scope="scope">
          <router-link :to="'/post/postForm'" class="link-type">
            {{scope.row.postCode}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="postName" label="岗位名称" align="center"/>
      <el-table-column prop="sort" label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.sort }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <div v-for="item in statusOptions" :key="item.id">
            <el-tag v-if="scope.row.status === item.value" :type="scope.row.status==='0' ? '' : 'info'">{{ item.label }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="crtTime" label="创建日期" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.crtTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130px" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row.postId)">
            <i class="el-icon-view" title="查看"/>
          </el-button>
          <el-button slot="reference" v-permission="['system:post:edit']"  type="text" size="mini" @click="handleUpdate(scope.row.postId)">
            <i class="el-icon-edit" style="color:green" title="编辑"/>
          </el-button>
          <el-button slot="reference" v-permission="['system:post:remove']" type="text" size="mini" @click="handleDelete(scope.row.postId)">
            <i class="el-icon-delete" style="color:red" title="删除"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" :page-size="20"
      @size-change="sizeChange" @current-change="pageChange"/>
    <job-form ref="jobForm" :operate="operate" :statusOptions="statusOptions"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import tableHeight from '@/mixins/tableHeight'
import { del } from '@/api/base/post'
import { get } from '@/api/base/dictDetail'
import { parseTime } from '@/utils/index'
export default {
  components: {
    'job-form': () => import('./module/form')
  },
  mixins: [initData, tableHeight],
  data () {
    return {
      delLoading: false,
      sup_this: this,
      operate: '',
      statusOptions: []
    }
  },
  created () {
    get('sys_dept_status').then(response => {
      this.statusOptions = response.data.data
    })
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit () {
      this.url = 'api/core/post/page'
      return true
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.jobForm.dialog = true
    },
    handleReset () {
      this.params.postName = undefined
      this.params.postCode = undefined
      this.params.status = undefined
      this.init()
    },
    handleView (postId) {
      this.operate = 'view'
      this.$refs.jobForm.dialog = true
      this.$refs.jobForm.handleInitData(postId)
    },
    handleUpdate (postId) {
      this.operate = 'update'
      this.$refs.jobForm.dialog = true
      this.$refs.jobForm.handleInitData(postId)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.init()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '已取消删除',
          duration: 2500
        })
      })
    }
  }
}
</script>

<style scoped>
  .contain-tit{
    line-height: 59px;
    height: 59px;
    color: #333;
    font-size: 18px;
    border-bottom: 2px solid #D5E1FF;
    font-weight: bold;
  }
</style>
