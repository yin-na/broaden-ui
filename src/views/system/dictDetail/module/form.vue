<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :close-on-click-modal="false" :title="titleMap[operate]" width="500px" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="字典键值" prop="value">
        <el-input v-model="form.value" :disabled="operate==='view'" placeholder="请勿输入汉字" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="字典标签" prop="label">
        <el-input v-model="form.label" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="字典排序" prop="sort">
        <el-input-number v-model.number="form.sort" :min="0" :max="999" :disabled="operate==='view'" controls-position="right" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate!=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getById } from '@/api/base/dictDetail'
export default {
  props: {
    operate: {
      type: String,
      required: true
    },
    dictCode: {
      type: String,
      required: true
    }
  },
  data () {
    var loginNameValidator=(rule, value, callback)=>{
      //  　　var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
      //     var reg2 = new RegExp("[《》~#^$@%&!·?%？！。，<>,()（）‘、'\";；{}￥ =+-./*：:]", 'g');
            var reg=new RegExp("^[a-zA-Z0-9_]{1,}$","g")

       if(!reg.test(value)){
            return callback(new Error("只能输入数字、字母、下划线"))
        }else{
          return  callback()
        }
      };
    return {
      loading: false,
      dialog: false,
      form: {
        id: undefined,
        label: undefined,
        value: undefined,
        sort: 999,
        dictCode: this.dictCode
      },
      rules: {
        label: [
          { required: true, message: '请输入字典标签', trigger: 'blur' }
        ],
        value: [{
          required: true, message: '请输入字典键值', trigger: 'blur'
        },
        {
          validator: loginNameValidator,
          message: '只能输入数字、字母、下划线',
          trigger: 'blur'
        }
        ],
        sort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      },
      titleMap: {
        'create': '创建',
        'update': '更新',
        'view': '查看'
      }
    }
  },
  methods: {
    cancel () {
      this.resetForm()
    },
    handleInitData (id) {
      getById(id).then(res => {
        this.form = res.data
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
      this.form.dictCode=this.dictCode
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
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        id: undefined,
        label: undefined,
        value: undefined,
        sort: '999',
        dictCode: this.dictCode
      }
    }
  }
}
</script>
