<template>
  <el-dialog :visible.sync="dialog" :title="titleMap[operate]" append-to-body @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="70px" inline>
      <el-form-item label="用户姓名" prop="username">
        <el-input v-model="form.username" :disabled="operate==='view'" placeholder="请输入用户姓名"/>
      </el-form-item>
      <el-form-item label="登录名" prop="loginName">
        <el-input :disabled="operate!=='create' || operate==='view'" v-model="form.loginName" placeholder="请勿输入汉字"/>
      </el-form-item>
      <el-form-item label="员工编号" prop="userCode">
        <el-input v-model="form.userCode" :disabled="operate==='view'" placeholder="请输入员工编号"/>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="form.password" placeholder="默认123456" type="password" :disabled="operate==='view'"/>
      </el-form-item>
      <el-form-item label="账号状态" prop="status" >
        <el-radio v-for="item in dicts" :key="item.id" v-model="form.status" :label="item.value" :disabled="operate==='view'" style="width:82px">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobilePhone">
        <el-input v-model.number="form.mobilePhone" :disabled="operate==='view'" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email" :disabled="operate==='view'" placeholder="请输入邮箱账号" />
      </el-form-item>
      <el-form-item label="所在班级">
        <!-- <treeselect v-model="form.deptId" :options="depts" :style="style" :disabled="operate==='view'" placeholder="选择班级" /> -->
        <el-select v-model="form.classId" placeholder="选择班级">
            <el-option  v-for="(item,index) in depts" :key='index' :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="岗位">
        <el-select v-model="jobId" :style="style" placeholder="请先选择部门">
          <el-option
            v-for="(item, index) in jobs"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item> -->
      <el-form-item style="margin-bottom: 0px;" label="角色">
        <el-select v-model="form.roleIds" style="width: 450px;" multiple placeholder="请选择" :disabled="operate==='view'" clearable>
          <el-option v-for="item in roles" :key="item.roleId" :label="item.roleName" :value="item.roleId"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" >
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate !=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>

import { add, edit } from '@/api/base/user'
// import { tree } from '@/api/base/dept'
import{ getStudentroleList ,getClassList,addstudent,getStudentList} from "@/api/gateway/student"
import { roleTree, getRolesByUserId } from '@/api/base/role'
import { getAllJob } from '@/api/base/post'
// import Treeselect from '@riophae/vue-treeselect'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  // components: { Treeselect },
  props: {
    operate: {
      type: String,
      default: ''
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        userId: undefined,
        username: undefined,
        loginName: undefined,
        email: '',
        status: '0',
        mobilePhone: null,
        deptId: undefined,
        userCode: undefined,
        password: undefined,
        roleIds: []
      },
      depts: [],
      roles: [],
      jobs: [],
      style: 'width: 184px',
      rules: {
        username: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个英文字符', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入登录账号', trigger: 'blue' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        // phone: [
        //   { required: true, trigger: 'blur', validator: validPhone }
        // ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      },
      titleMap: {
        view: '查看',
        create: '新增',
        update: '编辑'
      }
    }
  },
  created () {
    const explorer = navigator.userAgent
    if (explorer.indexOf('Chrome') >= 0) {
      this.style = 'width: 184px'
    } else {
      this.style = 'width: 172px'
    }
    this.getDeptTree()
    // this.getRoles()
    this.getClassList()
  },
  methods: {
    handleInitData (row) {
         this.form=row
      // getStudentList(id).then(response => {
      //   this.form = response.data
      //   console.log(this.form,12)
      //   getRolesByUserId(id).then(response => {
      //     this.form.roleIds = response.data
      //   })
      // })
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.classId === null || this.form.classId === undefined) {
            this.$message({
              message: '班级不能为空',
              type: 'warning'
            })
          } else if (this.form.roleIds.length === 0) {
            this.$message({
              message: '角色不能为空',
              type: 'warning'
            })
          } else {
            this.loading = true
            if (this.operate === 'create') {
              this.handleCreate()
            } else{
                this.handleUpdate()
            } 
          }
        } else {
          return false
        }
      })
    },
    handleCreate () {
     let{...param}=this.form
      delete param.className
      addstudent(param).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
         this.$parent.getList()
      }).catch(err => {
        this.loading = false
      })
    },
    handleUpdate () {
     let{...param}=this.form
      delete param.className
      addstudent(param).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.getList()
        // location.reload();
      }).catch(err => {
        this.loading = false
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        userId: undefined,
        username: undefined,
        loginName: undefined,
        email: '',
        status: '0',
        mobilePhone: null,
        deptId: undefined,
        userCode: undefined,
        password: undefined,
        roleIds: []
      }
    },
    // getRoles () {
    //   roleTree().then(res => {
    //     this.roles = res.data
    //   }).catch(err => {
    //   })
    // },
    getJobs (id) {
      getAllJob(id).then(res => {
        this.jobs = res.data
      }).catch(err => {
      })
    },
    getDeptTree () {
      getStudentroleList().then(res => {
        this.roles = res.data
      })
    },  
    getClassList(){
      getClassList().then(res=>{
        this.depts = res.data
      })
    },
    isvalidPhone (str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    selectFun (node, instanceId) {
      this.getJobs(node.id)
    }
  }
}
</script>

<style scoped>

</style>
