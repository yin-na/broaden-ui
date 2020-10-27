<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix" style="height:10px;">
            <span>量表检索</span>
          </div>
          <div class="head-container">
            <el-input v-model="params.typevalue" class="filter-item" style="width: 150px;" clearable  placeholder="字典编码" @keyup.enter.native="handleQuery"/>
            <el-input v-model="params.name" class="filter-item" style="width: 150px;" clearable placeholder="字典名称" @keyup.enter.native="handleQuery"/>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            <el-button v-permission="['system:dict:add']" size="mini"
              type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
          </div>
          <!--表格渲染-->
          <el-table v-loading="loading" :data="data" size="mini" :height="tableHeight" highlight-current-row style="width: 100%;" border>
            <el-table-column show-overflow-tooltip prop="typevalue" header-align="center" label="量表编码"/>
            <el-table-column show-overflow-tooltip header-align="center"  prop="name" label="量表名称"/>
            <el-table-column show-overflow-tooltip header-align="center"  prop="introduce" label="量表介绍"/>
            <el-table-column show-overflow-tooltip prop="instruction" header-align="center" label="指导语"/>
            <el-table-column show-overflow-tooltip header-align="center"  prop="minage" label="最小年龄"/>
            <el-table-column show-overflow-tooltip header-align="center"  prop="maxage" label="最大年龄"/>
            <el-table-column  label="操作" width="90px" align="center">
              <template slot-scope="scope">
                <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row.id)">
                  <i class="el-icon-view" title="查看"/>
                </el-button>
                <el-button slot="reference" v-permission="['demo:demo:edit']" type="text" size="mini" @click="handleUpdate(scope.row.id)">
                  <i class="el-icon-edit" style="color:green"  title="编辑"/>
                </el-button>
                <el-button slot="reference" v-permission="['demo:demo:remove']" type="text" size="mini" @click="handleDelete(scope.row)">
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
    </el-row>
    <!--  弹窗 -->
    <dict-form ref="dictForm" :operate="operate" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, list } from '@/api/base/demo'

export default {
  components: {
    'dict-form': () => import('./modul/form')
  },
  mixins: [initData],
  data () {
    return {
      data: [],
      loading: false,
      delLoading: false,
      sup_this: this,
      operate: undefined,
      id: '',
      typevalue: '',
      name: '',
      introduce: '',
      instruction: '',
      minage: '',
      maxage: '',
      tableHeight: document.documentElement.clientHeight * 0.6
    }
  },
  created () {
    this.beforeInit()
  },
  methods: {
    checkPermission,
    // beforeInit () {
    //   this.url = '/scale/scaleList'
    //   this.method = 'post'
    //   return true
    // },

    beforeInit () {
      this.loading = true
      list(this.params
      ).then(res => {
        this.total = res.data.total
        this.data = res.data.records
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err.response)
      })
    },

    // 搜索
    handleQuery () {
      this.loading = true
      list(this.params
      ).then(res => {
        this.total = res.data.total
        this.data = res.data.records
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err.response)
      })
    },

    // handleQuery () {
    //   this.loading = true
    //   list(this.params).then(response => {
    //     this.data = response.data
    //     this.loading = false
    //   }).catch(e => {
    //     this.loading = false
    //   })
    // },

    // 新增
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
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(row.id, row.typevalue).then(res => {
          this.delLoading = false
          this.handleQuery()
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
        }).catch(err => {
          this.delLoading = false
          console.log(err.response)
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

</style>
