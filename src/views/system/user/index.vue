/** 
*  author system 
*  lastupdate  2020/07/30  by  duziqiang   选择机构树节点后，为userForm  设置 默认 deptId
*/
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="contain-tit">
        <span>用户管理</span>
      </div>
      <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="4">
        <div class="head-container">
          <el-input v-model.trim="deptName" clearable placeholder="输入部门名称搜索" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="getDeptDatas" />
        </div>
        <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick" />
      </el-col>
      <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="20">
        <div class="head-container">
          <el-input v-model.trim="params.username" placeholder="用户姓名" style="width: 150px;margin-right:10px" clearable class="filter-item" @keyup.enter.native="handleQuery" />
          <el-input v-model.trim="params.loginName" placeholder="登录名" style="width: 150px;margin-right:10px" clearable class="filter-item" @keyup.enter.native="handleQuery" />
          <el-input v-model.trim="params.email" placeholder="邮箱" style="width: 150px;margin-right:10px" clearable class="filter-item" @keyup.enter.native="handleQuery" />
          <el-button size="mini" type="success" icon="el-icon-plus" v-permission="['system:user:add']" @click="handleCreate">新增</el-button>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
          <el-button size="mini" type="button" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" :height="tableHeight"
                  :header-cell-style="{fontSize:'14px',height:'35px'}"
                  :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
                  size="mini" fit border>
          <el-table-column prop="username" label="用户姓名" align="center" width="150px" show-overflow-tooltip />
          <el-table-column prop="loginName" label="登录名" width="120px" align="center" show-overflow-tooltip />
          <el-table-column prop="mobilePhone" label="电话" align="center" width="150px" show-overflow-tooltip />
          <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip />
          <el-table-column prop="deptName" label="部门" align="center" width="150px" show-overflow-tooltip />
          <el-table-column label="状态" align="center" width="120px">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" :disabled="user.loginName==scope.row.loginName" @change="handleStatusChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="crtTime" label="创建日期" align="center" width="200px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.crtTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="90" align="center">
            <template slot-scope="scope">
              <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row.userId)">
                <i class="el-icon-view" title="查看" />
              </el-button>
              <el-button v-if="user.deptId!=scope.row.deptId" slot="reference" type="text" size="mini" v-permission="['system:user:edit']" @click="handleUpdate(scope.row.userId)">
                <i class="el-icon-edit" style="color:green" title="编辑" />
              </el-button>
              <el-button  v-if="user.deptId!=scope.row.deptId" slot="reference" class="button-icon" type="text" v-permission="['system:user:remove']" size="mini" @click="handleDelete(scope.row.userId)">
                <i class="el-icon-delete" style="color:red" title="删除" />
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination :total="total" :page-size="10" style="margin-top: 8px;" layout="total, prev, pager, next, sizes" @size-change="sizeChange" @current-change="pageChange" />
      </el-col>
    </el-row>
    <user-form ref="userForm" :operate="operate" :dicts="statusOptions" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { get } from '@/api/base/dictDetail'
import tableHeight from '@/mixins/tableHeight'
import { del, updateUserStatus } from '@/api/base/user'
import { list } from '@/api/base/dept'
import { parseTime } from '@/utils/index'
export default {
  components: {
    'user-form': () => import('./module/form')
  },
  mixins: [initData, tableHeight],
  data () {
    return {
      delLoading: false,
      downloadLoading: false,
      sup_this: this,
      deptName: '',
      deptType:'',
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      operate: undefined,
      statusOptions: [],
      tableHeight: document.documentElement.clientHeight * 0.6,
      params:{
        username:undefined,
        loginName:undefined,
        email:undefined,
        deptId:undefined
      }
    }
  },
  computed:{
    ...mapGetters([
     ["user"]
    ]),
  },
  created () {
    this.$nextTick(() => {
      this.getDeptDatas()
      get('sys_user_status').then(response => {
        this.statusOptions = response.data.data
      })
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit () {
      this.url = 'api/core/user/page'
      return true
    },
    handleQuery () {
      this.page = 1
      this.init()
    },
    handleCreate () {
      this.operate = 'create'
      this.$refs.userForm.dialog = true
      if(this.params.deptId !=null){
       this.$refs.userForm.handleInitSetDeptId(this.params.deptId,this.deptType );
      }
    },
    handleReset () {
      this.params.username = undefined
      this.params.loginName = undefined
      this.params.email = undefined
      this.params.deptId = undefined
      this.deptName=undefined
      this.getDeptDatas()
      this.init()
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
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.init()
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    getDeptDatas () {
      const params = {}
      if (this.deptName) { params.deptName = this.deptName }
      list(params).then(res => {
        this.depts = res.data
      })
    },
    handleNodeClick (data) {
      this.deptType=data.deptType
      if (data.parentId === 0) {
        this.params.deptId = null
      } else {
        this.params.deptId = data.deptId
      }
      this.init()
    }
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
