<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="titleMap[operate]" width="500px" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="量表编码" prop="typevalue">
        <el-input v-model="form.typevalue" :disabled="operate!=='create'" placeholder="请勿输入汉字" style="width:370px;"/>
      </el-form-item>
      <el-form-item label="量表名称" prop="name">
        <el-input v-model="form.name" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="量表介绍" prop="introduce">
        <el-input v-model="form.introduce" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="指导语" prop="instruction">
        <el-input v-model="form.instruction" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="最小年龄" prop="minage">
        <el-input v-model="form.minage" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="最大" prop="maxage">
        <el-input v-model="form.maxage" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" v-if="operate !=='view'" type="success" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getById } from '@/api/base/demo'
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
        id: undefined,
        typevalue: undefined,
        name: undefined,
        remark: undefined,
        instruction: undefined,
        introduce: undefined,
        maxage: undefined,
        minage: undefined
      },
      rules: {
        name: [
          { required: true, message: '请输入量表名称', trigger: 'blur' }
        ],
        instruction: [{ required: true, message: '请输入指导语', trigger: 'blur' }],
        minage: [{ required: true, message: '请输入最小年龄', trigger: 'blur' }],
        maxage: [{ required: true, message: '请输入最大年龄', trigger: 'blur' }]
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
        console.log(response.data[0])
        this.form = response.data[0]
      })
    },
    doSubmit () {
      this.$refs.form.validate((valid) => {
        console.log(valid)
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
        console.log(this.form)
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
        console.log(err.response)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        id: undefined,
        typevalue: undefined,
        name: undefined,
        instruction: undefined,
        introduce: undefined,
        minage: undefined,
        maxage: undefined
      }
    }
  }

}
</script>

<style scoped>

</style>
