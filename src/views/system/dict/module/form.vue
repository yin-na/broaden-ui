<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="titleMap[operate]" width="500px" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="字典编码" prop="dictCode">
        <el-input v-model="form.dictCode" :disabled="operate!=='create'" placeholder="请勿输入汉字" style="width:370px;"/>
      </el-form-item>
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="form.dictName" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" v-if="operate !=='view'" type="success" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getById } from '@/api/base/dict'
export default {
  props: {
    operate: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      form: {
        dictId: undefined,
        dictCode: undefined,
        dictName: undefined,
        remark: undefined
      },
      rules: {
        dictName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        dictCode: [{ required: true, message: '请输入编码', trigger: 'blur' }]
      },
      titleMap: {
        'create': '创建',
        'update': '编辑',
        'view': '查看'
      }
    }
  },
  methods: {
    cancel () {
      this.resetForm()
    },
    handleInitData (id) {
      getById(id).then(response => {
        this.form = response
      })
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
        dictId: undefined,
        dictCode: undefined,
        dictName: undefined,
        remark: undefined

      }
    }
  }

}
</script>

<style scoped>

</style>
