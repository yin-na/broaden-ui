<!-- 主页内容 -->
<template>
  <div class="app-container">
    <div class="contain-tit">
      <span>角色管理</span>
    </div>
    <div class="head-container">
      <el-input v-model.trim="params.roleCode" placeholder="请输入角色编码" size="mini" style="width: 150px;margin-right:8px" clearable class="filter-item"/>
      <el-input v-model.trim="params.roleName" placeholder="请输入角色名称"  style="width: 150px;margin-right:8px" clearable class="filter-item"/>
      <!-- <el-select v-model="params.status" placeholder="请选择角色状态" clearable style="width: 150px;margin-right:8px"  class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.id" :label="item.label" :value="item.value"/>
      </el-select> -->
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button type="success" icon="el-icon-plus" size="mini"   @click="handleCreate">新增</el-button>
      <el-button type="button" icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      <role-form ref="roleForm" :operate="operate" :menuTrees="menus"/>
      <scope-form ref="scopeForm" :dataScopeOptions="dataScopeOptions"/>
    </div>
    <el-table v-loading="loading" :data="data" size="mini" :height="tableHeight"
              :header-cell-style="{fontSize:'14px',height:'35px'}"
              :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
              highlight-current-row style="width: 100%;" border fit>
      <el-table-column prop="roleCode" label="角色编码" align="center"/>
      <el-table-column prop="roleName" label="角色名称" align="center"/>
      <!-- <el-table-column prop="showType" label="显示位置" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.showType=='0'">机构管理员</span>
          <span v-if="scope.row.showType=='1'">普通用户管理</span>
        </template>
      </el-table-column> -->
         <el-table-column prop="roleType" label="所属系统" align="center">
        <template slot-scope="scope">
          <span>{{filterRoleType(scope.row.roleType)}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="status" label="角色状态" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"/>
        </template>
      </el-table-column> -->
      <el-table-column prop="sort" label="显示顺序" align="center"/>
      <el-table-column prop="crtTime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{parseTime(scope.row.crtTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="operate" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="text"  size="mini" @click="handleView(scope.row.roleId)">
            <i class="el-icon-view" title="查看"/>
          </el-button>
          <el-button slot="reference" type="text" size="mini"   @click="handleUpdate(scope.row.roleId)">
            <i class="el-icon-edit" style="color:green"  title="编辑"/>
          </el-button>
          <el-button slot="reference"  type="text" size="mini" :disabled="scope.row.roleCode==='admin'" @click="handleDelete(scope.row.roleId)">
            <i class="el-icon-delete" style="color:red"  title="删除"/>
          </el-button>
          <el-button slot="reference"  type="text" size="mini" :disabled="scope.row.roleCode==='admin'"  @click="handleDataScope(scope.row.roleId)">
            <i class="el-icon-guide" style="color:orange"  title="数据权限" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <!--分页组件-->
        <el-pagination :total="total" :page-size="10" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { get } from '@/api/base/dictDetail'
import { del, updateRoleStatus } from '@/api/base/role'
import { tree } from '@/api/base/menu'
import { parseTime } from '@/utils/index'
import tableHeight from '@/mixins/tableHeight'
export default {
  components: {
    'role-form': () => import('./module/form'),
    'scope-form': () => import('./module/scope')
  },
  mixins: [initData, tableHeight],
  data () {
    return {
      delLoading: false,
      statusOptions: [],
      roleTypes:[],
      menus: [],
      operate: '',
      dataScopeOptions: [],
      params:{
        roleCode:"",
        roleName:"",
        status:"",
        roleType:""
      }

    }
  },
  created () {
    get('sys_dept_status').then(response => {
      this.statusOptions = response.data.data
    })
    get('sys_data_scope').then(response => {
      this.dataScopeOptions = response.data.data
    })
     get('sys_role_type').then(response => {
      this.roleTypes = response.data.data
    })
    this.$nextTick(() => {
      this.init()
      this.getMenus()
    })
  },
  computed:{
    filterRoleType(){
      return function(val){
        let that=this;
      if (!val){
         return ''
      }else{
      let type= that.roleTypes.filter(a=>a.value==val)
        return type[0].label
      }
      }
    }

  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit () {
      if(this.$route.path=="/edu/role"){
        this.params.roleType="1"
      }
   if(this.$route.path=="/community/role"){
        this.params.roleType="3"
    }
      if(this.$route.path=="/nhc/role"){
        this.params.roleType="4"
    }
      this.url = 'api/core/role/page'
      return true
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleReset () {
      if(this.$route.path=="/edu/role"){
        this.params.roleType="1"
      }
         if(this.$route.path=="/community/role"){
        this.params.roleType="3"
    }
    if(this.$route.path=="/nhc/role"){
        this.params.roleType="4"
    }
      this.params.roleCode = undefined
      this.params.roleName = undefined
      this.params.status = undefined
      this.handleQuery()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.roleForm.dialog = true
    },
    handleView (roleId) {
      this.operate = 'view'
      this.$refs.roleForm.dialog = true
      this.$refs.roleForm.handleInitData(roleId)
    },
    handleUpdate (roleId) {
      this.operate = 'update'
      this.$refs.roleForm.dialog = true
      this.$refs.roleForm.handleInitData(roleId)
    },
    handleDelete (roleId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(roleId).then(res => {
          this.delLoading = false
          this.init()
          if(res.status==200){
          this.$notify({
            title: '删除成功',
            type: 'success',
            duration: 2500
          })
          }
         
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
    },
    handleDataScope (id) {
      this.$refs.scopeForm.dialog = true
      this.$refs.scopeForm.handleInitData(id)
    },
    handleStatusChange (row) {
      let text = row.status === '0' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return updateRoleStatus({ roleId: row.roleId, status: row.status })
      }).then(() => {
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.init()
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
      })
    },
    getMenus () {
      tree().then(res => {
        this.menus = res.data
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
  .contain-tit{
    line-height: 59px;
    height: 59px;
    color: #333;
    font-size: 18px;
    border-bottom: 2px solid #D5E1FF;
    font-weight: bold;
  }
</style>
