<template>
  <div class="app-container">
    <div class="head-container">
    <!-- 搜索 -->
      <el-input v-model="params.menuName" clearable placeholder="输入名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="handleQuery"/>
      <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
      <el-button size="mini" type="success" v-permission="['system:menu:add']" icon="el-icon-plus" @click="handleCreate">新增</el-button>
      <el-button size="mini" type="warning" icon="el-icon-more"  @click="handExpand">{{ expand ? '折叠' : '展开' }}</el-button>
      <menu-form ref="menuForm" :operate="operate" :menuTypeOptions="menuTypeOptions"/>
    </div>
    <!--表格渲染-->
    <tree-table v-loading="loading" :data="data" :expand-all="expand" :columns="columns" size="mini" border>
      <el-table-column prop="icon" label="图标" align="center" width="60px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon?scope.row.icon:''" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" width="50px" label="排序">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.sort }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="path" label="链接地址" width="80px" align="center"/>
      <el-table-column show-overflow-tooltip prop="component" label="组件路径" align="center"/>
      <el-table-column prop="menuType" label="菜单类型" align="center" width="80px">
        <template slot-scope="scope">
        <el-tag :type="handleTagType(scope.row.menuType)">{{scope.row.menuType|menuTypeToText}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="permission" label="权限标识" header-align="center" show-overflow-tooltip/>
      <el-table-column prop="iframe" width="70px" label="内部菜单" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.iframe">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="crtTime" label="创建日期" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.crtTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['adminyss'])" label="操作" width="90px" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row.menuId)">
            <i class="el-icon-view" title="查看"/>
          </el-button>
          <el-button slot="reference" type="text" size="mini" v-permission="['system:menu:edit']"  @click="handleUpdate(scope.row.menuId)">
            <i class="el-icon-edit" style="color:green"  title="编辑"/>
          </el-button>
          <el-button slot="reference" class="button-icon" v-permission="['system:menu:remove']"  type="text" size="mini" @click="handleDelete(scope.row.menuId)">
            <i class="el-icon-delete" style="color:red" title="删除"/>
          </el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import treeTable from '@/components/TreeTable'
import { get } from '@/api/base/dictDetail'
import { list, del } from '@/api/base/menu'
import { parseTime } from '@/utils/index'
export default {
  components: {
    treeTable,
    'menu-form': () => import('./module/form')
  },
  data () {
    return {
      columns: [
        {
          text: '菜单名称',
          value: 'menuName'
        }
      ],
      delLoading: false,
      expand: true,
      loading: false,
      data: [],
      params: {
        menuName: undefined
      },
      menuTypeOptions: [],
      operate: ''
    }
  },
  filters: {
    menuTypeToText (val) {
      switch (val) {
        case 'M':return '目录'
        case 'C':return '菜单'
        case 'F':return '按钮'
        default: return ''
      }
    }
  },
  mounted () {
    get('sys_menu_type').then(response => {
      this.menuTypeOptions = response.data.data
    })
  },
  created () {
    this.handleQuery()
  },
  methods: {
    parseTime,
    checkPermission,
    handleQuery () {
      this.loading = true
      list(this.params).then(response => {
        this.data = response.data
        this.loading = false
      })
    },
    handExpand () {
      this.expand = !this.expand
      this.handleQuery()
    },
    handleTagType (val) {
      switch (val) {
        case 'M':return ''
        case 'C':return 'success'
        case 'F':return 'warning'
      }
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.menuForm.dialog = true
    },
    handleView (menuId) {
      this.operate = 'view'
      this.$refs.menuForm.dialog = true
      this.$refs.menuForm.handleInitData(menuId)
    },
    handleUpdate (menuId) {
      this.operate = 'update'
      this.$refs.menuForm.dialog = true
      this.$refs.menuForm.handleInitData(menuId)
    },
    handleDelete (menuId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(menuId).then(res => {
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
