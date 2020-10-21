<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="contain-tit">
        <span>用户管理</span>
      </div>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="head-container">
          <el-input v-model="params.name" placeholder="用户名" style="width: 150px;margin-right:10px" clearable class="filter-item" @keyup.enter.native="handleQuery" />
          <el-input v-model="params.loginName" placeholder="登录名" style="width: 150px;margin-right:10px" clearable class="filter-item" @keyup.enter.native="handleQuery" />
          <el-input v-model="params.email" placeholder="邮箱" style="width: 150px;margin-right:10px" clearable class="filter-item" @keyup.enter.native="handleQuery" />
          <el-button size="mini" type="success" icon="el-icon-plus" v-permission="['system:user:add']" @click="handleCreate">新增</el-button>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
          <el-button size="mini" type="button" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="dataItem" :height="tableHeight"
                  :header-cell-style="{fontSize:'14px',height:'35px'}"
                  :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
                  size="mini" fit border>
          <el-table-column prop="username" label="用户名" align="center" width="150px" show-overflow-tooltip />
          <el-table-column prop="loginName" label="登录名" width="120px" align="center" show-overflow-tooltip />
          <el-table-column prop="mobilePhone" label="电话" align="center" width="150px" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip />
          <el-table-column prop="className" label="班级" align="center" width="150px" show-overflow-tooltip />
          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="crtTime" label="创建日期" align="center" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.crtTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90" align="center">
            <template slot-scope="scope">
              <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row)">
                <i class="el-icon-view" title="查看" />
              </el-button>
              <el-button slot="reference" type="text" size="mini" v-permission="['system:user:edit']" @click="handleUpdate(scope.row)">
                <i class="el-icon-edit" style="color:green" title="编辑" />
              </el-button>
              <el-button slot="reference" class="button-icon" type="text" v-permission="['system:user:remove']" size="mini" @click="handleDelete(scope.row.userId)">
                <i class="el-icon-delete" style="color:red" title="删除" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination :total="total" :page-size="20" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
      </el-col>
    </el-row>
    <user-form ref="userForm" :operate="operate" :dicts="statusOptions"/>
  </div>
</template>
<script>
import checkPermission from '@/utils/permission'
// import initData from '@/mixins/initData'
// import { get } from '@/api/base/dictDetail'
// import tableHeight from '@/mixins/tableHeight'
import { del, updateUserStatus } from '@/api/base/user'
import { getStudentList } from "@/api/gateway/student"
import { parseTime } from '@/utils/index'
export default {
  components: {
    'user-form': () => import('./module/student')
  },
  // mixins: [initData, tableHeight],
  data () {
    return {
      delLoading: false,
      downloadLoading: false,
      loading:false,
      dataItem:[],
      sup_this: this,
      deptName: '',
      total:0,
      depts: [],
      params:{},
      query:{
        size:10,
        current:1
      },
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      operate: undefined,
      statusOptions: [],
      tableHeight: document.documentElement.clientHeight * 0.6
    }
  },
  created () {
     this.getList()
  },
  methods: {
    parseTime,
    checkPermission,
    // beforeInit () {
    //   this.url = '/student/getStudentList'
    //   return true
    // },
    handleQuery () {
      // this.page = 1
      // this.init()
       getStudentList(this.params).then(res=>{
        this.dataItem=res.data.records
      })
    },
    getList(){
      getStudentList(this.query).then(res=>{
        this.dataItem=res.data.records
        this.total=res.data.total
        console.log(res.data,'刷新成功')
      })
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.userForm.dialog = true
    },
    pageChange (e) {
      this.page = e
      // this.init()
       this.getList()
    },
    sizeChange (e) {
      this.page = 1
      this.size = e
      // this.init()
       this.getList()
    },
    handleReset () {
      this.params.name = ''
      this.params.loginName = ''
      this.params.email = ''
      this.getList()
    },
    handleView (id) {
      this.operate = 'view'
      this.$refs.userForm.dialog = true
      this.$refs.userForm.handleInitData(id)
    },
    handleUpdate (id) {
      this.operate = 'update'
      this.$refs.userForm.dialog = true
      this.$refs.userForm.handleInitData(id)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
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
          this.getList()
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
    handleStatusChange (row) {
      let text = row.status === '0' ? '激活' : '锁定'
      this.$confirm('确认要"' + text + '""' + row.username + '"用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return updateUserStatus({ userId: row.userId, status: row.status })
      }).then(() => {
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.getList()
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    // getDeptDatas () {
    //   const params = {}
    //   if (this.deptName) { params.deptName = this.deptName }
    //   list(params).then(res => {
    //     this.depts = res.data
    //   })
    // },
    // handleNodeClick (data) {
    //   if (data.parentId === 0) {
    //     this.params.deptId = null
    //   } else {
    //     this.params.deptId = data.deptId
    //   }
    //   this.init()
    // }
  }
}
</script>

<style lang="scss" scope>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: lightgreen;
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
