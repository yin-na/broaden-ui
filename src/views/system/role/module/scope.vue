<template>
  <el-dialog :visible.sync="dialog" title="数据权限" append-to-body width="500px" @close="cancel">
    <el-form ref="form" :model="form"  size="mini" label-width="80px" :rules="rules">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请勿输入汉字" disabled style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" disabled style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="权限类型" prop="dataScope">
        <el-select v-model="form.dataScope" placeholder="请选择数据权限" clearable  style="width: 370px;">
          <el-option v-for="item in dataScopeOptions" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="自定义SQL" prop="scopeSql" v-if="form.dataScope==='6'">
        <el-input v-model="form.scopeSql" placeholder="请输入SQL" type="textarea" autosize style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="数据权限" v-if="form.dataScope==='5'">
        <treeselect v-model="form.deptIds" :options="depts" :style="style" multiple placeholder="选择部门" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading"  type="success" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getById, grantDataScope, selectDeptIdByRoleId } from '@/api/base/role'
import { tree } from '@/api/base/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    dataScopeOptions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      depts: [],
      style: 'width: 370px',
      form: {
        roleId: undefined,
        roleCode: undefined,
        roleName: undefined,
        dataScope: undefined,
        deptIds: [],
        scopeSql: undefined
      },
      rules: {
        dataScope: [
          { required: true, message: '请选择权限类型', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getDeptTree()
  },
  methods: {
    handleInitData (roleId) {
      getById(roleId).then(response => {
        this.form = response.data
        selectDeptIdByRoleId(roleId).then(res => {
          this.form.deptIds = res.data
        })
      })
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          grantDataScope(this.form).then(res => {
            this.$notify({
              title: '分配成功',
              type: 'success',
              duration: 2500
            })
            this.$parent.init()
            this.loading = false
            this.dialog = false
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        roleId: undefined,
        roleCode: undefined,
        roleName: undefined,
        deptIds: [],
        scopeSql: undefined
      }
    },
    getDeptTree () {
      tree().then(res => {
        this.depts = res.data
      })
    }
  }
}
</script>
