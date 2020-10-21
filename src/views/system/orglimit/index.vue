<!-- 主页内容 -->
<template>
  <div class="app-container">
    <div class="contain-tit">
      <span>机构数量</span>
    </div>
    <div class="head-container">
      <el-input v-model="params.deptCode" placeholder="角色名称"  style="width: 150px;margin-right:8px" clearable class="filter-item"/>
      <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
      <!-- <el-button type="success" icon="el-icon-plus" size="mini"   @click="handleCreate">新增</el-button> -->
      <el-button type="button" icon="el-icon-refresh" size="mini" @click="handleReset">重置</el-button>
    </div>
    <el-table v-loading="loading" :data="deptList" size="mini" :height="tableHeight"
              :header-cell-style="{fontSize:'14px',height:'35px'}"
              :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
              highlight-current-row style="width: 100%;" border fit>
      <el-table-column prop="type"   label="系统类型" align="center">
        <template slot-scope="scope">
            <span>{{filterDeptType(scope.row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="roleName"   label="角色名称" align="center"/>
      <el-table-column prop="number"  label="可创建机构数量" align="center"/>
      <el-table-column label="操作" prop="operate" align="center">
        <template slot-scope="scope">
          <el-button slot="reference" type="text"  size="mini" @click="handleView(scope.row)">
            <i class="el-icon-view" title="查看"/>
          </el-button>
          <el-button slot="reference" type="text" size="mini"   @click="handleUpdate(scope.row)">
            <i class="el-icon-edit" style="color:green"  title="编辑"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
     <!--分页组件-->
        <el-pagination :total="total" :page-size="10" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
        <dept-form ref="deptForm" :operate="operate" :deptTypes="deptTypes"/>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { get } from '@/api/base/dictDetail'
import { parseTime } from '@/utils/index'
import tableHeight from '@/mixins/tableHeight'
import {listPage,roleList} from "@/api/base/deptlimit"
export default {
  components: {
    'dept-form': () => import('./module/form')
  },
  mixins: [initData, tableHeight],
  data () {
    return {
      delLoading: false,
      statusOptions: [],
      roleTypes:[],
      menus: [],
      type:"",
      operate: '',
      dataScopeOptions: [],
      deptList:[],
      deptTypes:[],
      params:{
        roleName:"",
        current:1,
        size:10,
      }

    }
  },
  created () {
    this.beforeInit()
    roleList().then(res=>{
      this.deptTypes=res.data
    })
    get('sys_role_type').then(res=>{
      this.roleTypes=res.data.data
    })
  },
  computed:{
    filterDeptType(){
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
    beforeInit(){
      this.params.current = this.page;
      this.params.size = this.size;
      this.params.type=this.type
      listPage(this.params).then(res=>{
          this.total = res.data.total;
          this.deptList = res.data.records;
          this.loading = false;
      }).catch(err=>{
         this.loading = false;
      })
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleReset () {
      this.params.deptCode = undefined
      this.params.deptName = undefined
      this.params.deptType=undefined
      this.handleQuery()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.deptForm.dialog = true
    },
    handleView (deptId) {
      this.operate = 'view'
      this.$refs.deptForm.dialog = true
      this.$refs.deptForm.handleInitData(deptId)
    },
    handleUpdate (deptId) {
      this.operate = 'update'
      this.$refs.deptForm.dialog = true
      this.$refs.deptForm.handleInitData(deptId)
    },
    handleDelete (deptId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delLoading = true
        del(deptId).then(res => {
          this.delLoading = false
          console.log(res)
          if(res.status==200){
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
