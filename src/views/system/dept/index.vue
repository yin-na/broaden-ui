<template>
  <div class="app-container">
    <div class="head-container">
      <el-input v-model="params.deptName" clearable placeholder="输入部门名称搜索" style="width: 150px;" class="filter-item" @keyup.enter.native="handleQuery"/>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
      <el-button v-permission="['system:user:add']" size="mini" type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      <el-button size="mini" type="warning" icon="el-icon-more" @click="expandTable">{{expand ? '折叠' : '展开' }}</el-button>
    </div>
    <!--表格渲染-->
    <tree-table v-loading="loading" :expand-all="expand" :columns="columns" :data="data"  size="mini">
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag  :type="scope.row.status==='0' ? '' : 'info'">{{scope.row.status==='0'?'正常':'停用'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="sort"/>
      <el-table-column prop="crtTime" label="创建日期" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.crtTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="crtUserName" label="创建人" align="center"/>
      <el-table-column  label="操作" width="130px" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleUpdate(scope.row.deptId,'view')">
            <i class="el-icon-view" title="查看"/>
          </el-button>
          <el-button size="mini" type="text" v-permission="['system:user:edit']" @click="handleUpdate(scope.row.deptId,'update')">
            <i class="el-icon-edit" style="color:green"  title="编辑"/>
          </el-button>
          <el-button size="mini" type="text" v-permission="['system:user:remove']" @click="handleDelete(scope.row.deptId)">
            <i class="el-icon-delete" style="color:red" title="删除"/>
          </el-button>
        </template>
      </el-table-column>
    </tree-table>
    <dept-form ref="deptForm" :operate="operate" :statusOptions="statusOptions"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { get } from '@/api/base/dictDetail'
import { list, del } from '@/api/base/dept'
import { parseTime } from '@/utils/index'
export default {
  components: {
    'tree-table': () => import('@/components/TreeTable'),
    'dept-form': () => import('./module/form')
  },
  data () {
    return {
      columns: [
        {
          text: '名称',
          value: 'deptName'
        }
      ],
      delLoading: false,
      expand: true,
      operate: undefined,
      params: {
        deptName: undefined
      },
      data: [],
      loading: false,
      statusOptions: []
    }
  },
  created () {
    this.$nextTick(() => {
      // 加载数据字典
      get('sys_dept_status').then(res => {
        this.statusOptions = res.data.data
      })
      this.handleQuery()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    expandTable () {
      this.expand = !this.expand
      this.handleQuery()
    },
    handleQuery () {
      this.loading = true
      list(this.params).then(response => {
        this.data = response.data
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.deptForm.dialog = true
    },
    handleUpdate (id, operate) {
      this.operate = operate
      this.$refs.deptForm.dialog = true
      this.$refs.deptForm.handleInitData(id)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(id).then(res => {
          this.delLoading = false
          this.handleQuery()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          console.log(err.response.data.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
