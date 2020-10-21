/** 
*  author system 
*  lastupdate  2020/07/30  by  duziqiang   选择机构树节点后，为userForm  设置 默认 deptId
*/
<template>
  <el-dialog :visible.sync="dialog" :title="titleMap[operate]" append-to-body @close="cancel" :close-on-click-modal="false"	>
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="70px" inline>
      <el-form-item label="用户姓名" prop="username">
        <el-input v-model="form.username" :disabled="operate==='view'" placeholder="请输入用户姓名"/>
      </el-form-item>
      <el-form-item label="登录账号" prop="loginName">
        <el-input :disabled="operate!=='create' || operate==='view'" v-model.trim="form.loginName" placeholder="请勿输入汉字"/>
      </el-form-item>
      <el-form-item label="员工编号" prop="userCode">
        <el-input v-model="form.userCode" :disabled="operate==='view'" placeholder="请输入员工编号"/>
      </el-form-item>
      <el-form-item v-if="operate==='create'" label="登录密码" prop="password">
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
      <el-form-item label="所在部门">
        <treeselect v-model="form.deptId" :options="depts" :style="style" :disabled="operate==='view'" placeholder="选择部门" @select="generateRole"/>
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
        <el-select multiple :multiple-limit="1" v-model="form.roleIds" style="width: 450px;"  placeholder="请先选择部门" :disabled="operate==='view'" clearable>
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

import { add, edit, getById } from '@/api/base/user'
import { tree } from '@/api/base/dept'
import { roleTree, getRolesByUserId } from '@/api/base/role'
import { getAllJob } from '@/api/base/post'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
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
    // const validPhone = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入电话号码'))
    //   } else if (!this.isvalidPhone(value)) {
    //     callback(new Error('请输入正确的11位手机号码'))
    //   } else {
    //     callback()
    //   }
    // }
     var loginNameValidator=(rule, value, callback)=>{
      //  　　var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      //     var reg2 = new RegExp("[《》~#^$@%&!·?%？！。，<>,()（）‘、'\";；{}￥ =+-./*：:]", 'g');
      //   if(reg.test(value)){
      //       return callback(new Error("不能输入汉字"))
      //   }else if(reg2.test(value)){
      //       return callback(new Error("不能包含特殊字符或者空格"))
      //   }else{
      //     return  callback()
      //   }
       var reg=new RegExp("^[a-zA-Z0-9_]{1,}$","g")
      if(!reg.test(value)){
        return callback(new Error("只能输入数字、字母、下划线"))
      }else{
        return callback()
      }
      };
    return {
      dialog: false,
      loading: false,
      sysDeptType:'',
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
      style: 'width: 184px;',
      rules: {
        username: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个英文字符', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
           {
              validator: loginNameValidator,
              message: '只能输入数字、字母、下划线',
              trigger: 'blur'
            }
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
    this.getRoles({})
  },
  methods: {
    handleInitData (id) {
      getById(id).then(response => {
        this.form = response.data
        this.sysDeptType=response.data.deptType
        getRolesByUserId(id).then(response => {
          this.form.roleIds = response.data
        })
        this.getRoles({'sysDeptType':this.sysDeptType})
      })
    },
    handleInitSetDeptId(deptId,deptType){
        this.form.deptId=deptId
        this.sysDeptType=deptType
        this.getRoles({'sysDeptType':this.sysDeptType})
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.deptId === null || this.form.deptId === undefined) {
            this.$message({
              message: '部门不能为空',
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
            } else this.handleUpdate()
          }
        } else {
          return false
        }
      })
    },
    handleCreate () {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
      })
    },
    handleUpdate () {
      this.form.password=null;
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.init()
      }).catch(err => {
        this.loading = false
      })
    },
    generateRole(node,instanceId){
       // console.log(node,'code')
       this.form.roleIds=[]
       this.getRoles({'sysDeptType':node.deptType})
    },
    resetForm () {
      this.roles=[]
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
    getRoles (params) {
      console.log(params)
      roleTree(params).then(res => {
        this.roles = res.data.filter(r=>{
          console.log(r)
           if(r.deptType!=null){
              return r.deptType.split('#').indexOf(params.sysDeptType)!=-1
           }else{
             return false
           }
        })
        console.log(this.roles,'jj')
      }).catch(err => {
      })
    },
    getJobs (id) {
      getAllJob(id).then(res => {
        this.jobs = res.data
      }).catch(err => {
      })
    },
    getDeptTree () {
      tree().then(res => {
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
::v-deep .vue-treeselect__control{
  border-color: lightgreen;
}
::v-deep .vue-treeselect:not(.vue-treeselect--disabled):not(.vue-treeselect--focused) .vue-treeselect__control:hover{
  border-color: lightgreen;
}
</style>
