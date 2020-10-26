<template>
  <el-dialog append-to-body :visible.sync="dialog" :title="titleMap[operate]" width="500px" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="form.deptName" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="部门编码" prop="deptCode">
        <el-input v-model="form.deptCode" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-if="form.parentId !== 0" label="状态" prop="enabled">
        <el-radio v-for="item in statusOptions" :key="item.id" v-model="form.status" :disabled="operate==='view'" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="部门排序" prop="sort">
        <el-input-number v-model.number="form.sort" :min="0" :max="999" :disabled="operate==='view'" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-if="form.parentId !== 0" style="margin-bottom: 0px;" label="上级部门">
        <treeselect v-model="form.parentId" :options="depts" style="width: 370px;" :disabled="operate==='view'" placeholder="选择上级部门" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate!=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, tree, getById } from '@/api/base/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    operate: {
      type: String,
      default: ''
    },
    statusOptions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      depts: [],
      form: {
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        parentId: 1,
        status: '0',
        sort: '999'
      },
      rules: {
        deptName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur', type: 'number' }
        ]
      },
      titleMap: {
        create: '新增',
        update: '编辑',
        view: '查看'
      }
    }
  },
  created () {
    this.getDeptTree()
  },
  methods: {
    handleInitData (id) {
      getById(id).then(response => {
        this.form = response.data
      })
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.parentId !== undefined) {
            this.loading = true
            if (this.operate === 'create') {
              this.handleCreate()
            } else this.handleUpdate()
          } else {
            this.$message({
              message: '上级部门不能为空',
              type: 'warning'
            })
          }
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
        this.$parent.handleQuery()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    handleUpdate () {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.handleQuery()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        parentId: 1,
        status: '0',
        sort: '999'
      }
    },
    getDeptTree () {
      tree({ }).then(res => {
        this.depts = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
