<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="titleMap[operate]" width="500px" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="岗位编码" prop="postCode">
        <el-input v-model="form.postCode" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="form.postName" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="显示排序" prop="sort">
        <el-input-number v-model.number="form.sort" :min="0" :max="999" :disabled="operate==='view'" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio v-for="item in statusOptions" :key="item.id" v-model="form.status" :disabled="operate==='view'" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate !=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { tree } from '@/api/base/dept'
import { add, edit, getById } from '@/api/base/post'
export default {
  name: 'PostForm',
  props: {
    operate: {
      type: String
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
      form: {
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        sort: 999,
        status: '0'
      },
      rules: {
        postName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      },
      titleMap: {
        'create': '新建',
        'update': '编辑',
        'view': '查看'
      }
    }
  },
  methods: {
    handleInitData (postId) {
      getById(postId).then(res => {
        this.form = res.data
      })
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.operate === 'create') {
            this.doAdd()
          } else this.doEdit()
        }
      })
    },
    doAdd () {
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
        console.log(err.response.data.message)
      })
    },
    doEdit () {
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
        console.log(err.response.data.message)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        sort: 999,
        status: '0'
      }
    },
    getDepts () {
      tree().then(res => {
        this.depts = res.data
      })
    }
  },
  mounted () {
    this.getDepts()
  }
}
</script>
