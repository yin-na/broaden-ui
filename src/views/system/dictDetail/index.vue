<template>
  <div>
    <div v-if="dictCode === ''" style="margin-top: 70px">
      <div class="my-code">点击字典查看详情</div>
    </div>
    <div v-else>
      <div class="head-container">
        <el-input v-model="params.label" class="filter-item" style="width: 150px;"  placeholder="字典标签" @keyup.enter.native="handleQuery"/>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button v-permission="['system:dict:add']" size="mini"
          type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      </div>
      <!--表格渲染-->
      <el-table v-loading="loading" :data="data" :height="tableHeight"
                :header-cell-style="{fontSize:'14px',height:'35px',lineHeight:'35px',}"
                :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
                size="mini" style="width: 100%;" border>
        <el-table-column label="所属字典" align="center" show-overflow-tooltip>
          {{ dictCode }}
        </el-table-column>
        <el-table-column prop="label" label="字典标签" align="center" show-overflow-tooltip/>
        <el-table-column prop="value" label="字典值" align="center"/>
        <el-table-column prop="sort" label="排序" align="center"/>
        <el-table-column label="操作" width="90px" align="center">
          <template slot-scope="scope">
            <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row)">
              <i class="el-icon-view" title="查看"/>
            </el-button>
            <el-button slot="reference" v-permission="['system:dict:edit']" type="text" size="mini" @click="handleUpdate(scope.row)">
              <i class="el-icon-edit" style="color:green"  title="编辑"/>
            </el-button>
            <el-button slot="reference" v-permission="['system:dict:remove']" type="text" size="mini" @click="handleDelete(scope.row.id)">
              <i class="el-icon-delete" style="color:red"  title="删除"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination :current-page.sync="currentPage" 
         :total="total" style="margin-top: 8px;" layout="total, prev, pager, next, sizes"
        @size-change="sizeChange" @current-change="pageChange"/>
        <dict-detail-form ref="dictDetailForm" :operate="operate" :dictCode="dictCode"/>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/base/dictDetail'
export default {
  components: {
    'dict-detail-form': () => import('./module/form')
  },
  mixins: [initData],
  props: {
    dictCode: {
      type: String,
      required: true
    }
  },
  watch: {
    // 分页bug
    dictCode(val) {
      this.page=1
      this.currentPage = 1
    }
  },
  data () {
    return {
      currentPage:1,
      delLoading: false,
      sup_this: this,
      operate: '',
      tableHeight: document.documentElement.clientHeight * 0.6
    }
  },
  created () {
    this.loading = false
  },
  methods: {
    checkPermission,
    beforeInit () {
      this.url = 'api/core/dictValue/page'
      this.params.dictCode = this.dictCode
      return true
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.dictDetailForm.dialog = true
    },
    handleView (row) {
      this.operate = 'view'
      this.$refs.dictDetailForm.handleInitData(row.id)
      this.$refs.dictDetailForm.dialog = true
    },
    handleUpdate (row) {
      this.operate = 'update'
      this.$refs.dictDetailForm.handleInitData(row.id)
      this.$refs.dictDetailForm.dialog = true
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
  .my-code{
    padding: 15px;
    line-height: 20px;
    border-left: 3px solid #ddd;
    color: #333;
    font-family: Courier New;
    font-size: 12px
  }
</style>
