<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="height:10px;">
            <span>字典列表</span>
          </div>
          <div class="head-container">
            <el-input v-model="params.dictCode" class="filter-item" style="width: 150px;" clearable  placeholder="字典编码" @keyup.enter.native="handleQuery"/>
            <el-input v-model="params.name" class="filter-item" style="width: 150px;" clearable placeholder="字典名称" @keyup.enter.native="handleQuery"/>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            <el-button v-permission="['system:dict:add']" size="mini"
              type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
          </div>
          <!--表格渲染-->
          <el-table v-loading="loading" :data="data" size="mini" :height="tableHeight" highlight-current-row style="width: 100%;" @current-change="handleCurrentChange" border>
            <el-table-column show-overflow-tooltip prop="dictCode" header-align="center" label="字典编码"/>
            <el-table-column show-overflow-tooltip header-align="center"  prop="name" label="字典名称"/>
            <el-table-column show-overflow-tooltip header-align="center"  prop="remark" label="备注"/>
            <el-table-column  label="操作" width="90px" align="center">
              <template slot-scope="scope">
                <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row.dictId)">
                  <i class="el-icon-view" title="查看"/>
                </el-button>
                <el-button slot="reference" v-permission="['system:dict:edit']" type="text" size="mini" @click="handleUpdate(scope.row.dictId)">
                  <i class="el-icon-edit" style="color:green"  title="编辑"/>
                </el-button>
                <el-button slot="reference" v-permission="['system:dict:remove']" type="text" size="mini" @click="handleDelete(scope.row)">
                  <i class="el-icon-delete" style="color:red"  title="删除"/>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes"
            @size-change="sizeChange" @current-change="pageChange"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="height:10px;">
            <span>字典详情</span>
          </div>
          <dict-detail ref="dictDetail" :dictCode="dictCode" />
        </el-card>
      </el-col>
    </el-row>
    <dict-form ref="dictForm" :operate="operate" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/base/dict'
export default {
  components: {
    'dict-form': () => import('./module/form'),
    'dict-detail': () => import('../dictDetail/index')
  },
  mixins: [initData],
  data () {
    return {
      delLoading: false,
      sup_this: this,
      operate: undefined,
      dictCode: '',
      dictId: '',
      tableHeight: document.documentElement.clientHeight * 0.6
    }
  },
  created () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    checkPermission,
    beforeInit () {
      this.url = 'api/core/dict/page'
      return true
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.dictForm.dialog = true
    },
    handleView (id) {
      this.operate = 'view'
      this.$refs.dictForm.dialog = true
      this.$refs.dictForm.handleInitData(id)
    },
    handleUpdate (id) {
      this.operate = 'update'
      this.$refs.dictForm.dialog = true
      this.$refs.dictForm.handleInitData(id)
    },
    handleDelete (row) {
      // eslint-disable-next-line no-debugger
      debugger
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(row.dictId, row.dictCode).then(res => {
          this.delLoading = false
          this.init()
          this.$refs.dictDetail.init()
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
        this.$notify({
          type: 'info',
          message: '已取消删除',
          duration: 2500
        })
      })
    },
    handleCurrentChange (val) {
      if (val) {
        this.dictCode = val.dictCode
        this.$nextTick(() => {
          this.$refs.dictDetail.init()
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
