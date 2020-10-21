<!-- 主页内容 -->
<template>
  <div class="app-container">
    <div class="contain-tit">
      <span>机构类型</span>
    </div>
    <div class="head-container">
      <el-select v-model="params.type" placeholder="请选择所属系统" clearable style="width: 150px;margin-right:8px"  class="filter-item">
        <el-option v-for="item in roleTypes" :key="item.id" :label="item.label" :value="item.value"/>
      </el-select>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <el-button type="success" icon="el-icon-plus" size="mini" v-permission="['system:role:add']"  @click="handleCreate">新增</el-button>
      <el-button type="button" icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
      <role-form ref="roleForm" :operate="operate"/>
    </div>
    <el-table v-loading="loading" :data="data" size="mini" :height="tableHeight"
              :header-cell-style="{fontSize:'14px',height:'35px'}"
              :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
              highlight-current-row style="width: 100%;" border fit>
      <el-table-column prop="name" label="机构类型名称" align="center"/>
      <el-table-column prop="deptType" label="机构类型编码唯一" align="center"/>
         <el-table-column prop="type" label="所属系统" align="center">
        <template slot-scope="scope">
          <span>{{filterRoleType(scope.row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="显示顺序" align="center"/>
      <el-table-column label="操作" prop="operate" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="text"  size="mini" @click="handleView(scope.row.id)">
            <i class="el-icon-view" title="查看"/>
          </el-button>
          <el-button slot="reference" type="text" size="mini"  v-permission="['system:dlevel:edit']" @click="handleUpdate(scope.row.id)">
            <i class="el-icon-edit" style="color:green"  title="编辑"/>
          </el-button>
          <el-button slot="reference"  type="text" size="mini"  v-permission="['system:dlevel:remove']" @click="handleDelete(scope.row.id)">
            <i class="el-icon-delete" style="color:red"  title="删除"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import { get } from '@/api/base/dictDetail'
import { deleteDeptLevel, saveOrUpdateDeptLevel,getDeptLevels } from '@/api/base/dept'
import { parseTime } from '@/utils/index'
import tableHeight from '@/mixins/tableHeight'
export default {
  components: {
    'role-form': () => import('./module/form'),
  },
  mixins: [tableHeight],
  data () {
    return {
      delLoading: false,
      loading:false,
      data:[],
      statusOptions: [],
      roleTypes:[],
      menus: [],
      operate: '',
      params:{
         type:''
      },
      dataScopeOptions: []
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
   
   init(){
      getDeptLevels(this.params).then(res=>{
        this.data=res.data
      })
   },
    handleQuery () {
      this.init()
    },
    handleReset () {
      this.params.type = undefined
      this.handleQuery()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.roleForm.dialog = true
    },
    handleView (id) {
      this.operate = 'view'
      this.$refs.roleForm.dialog = true
      this.$refs.roleForm.handleInitData(id)
    },
    handleUpdate (id) {
      this.operate = 'update'
      this.$refs.roleForm.dialog = true
      this.$refs.roleForm.handleInitData(id)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        deleteDeptLevel({id}).then(res => {
          this.delLoading = false
          if(res.code==-1){
            this.$notify({
            title: res.message,
            type: 'error',
            duration: 2500
          })
          }else{
          this.init()
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
