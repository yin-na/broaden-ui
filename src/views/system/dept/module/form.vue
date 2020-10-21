<template>
  <el-dialog append-to-body :visible.sync="dialog" :close-on-click-modal="false"	 :title="titleMap[operate]" width="500px" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="机构名称" prop="deptName">
        <el-input v-model="form.deptName" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="机构编码" prop="deptCode">
        <el-input v-model="form.deptCode" :disabled="operate==='view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-if="form.parentId !== 0" label="状态" prop="enabled">
        <el-radio v-for="item in statusOptions" :key="item.id" v-model="form.status" :disabled="operate==='view'" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="机构排序" prop="sort">
        <el-input-number v-model.number="form.sort" :min="0" :max="999" :disabled="operate==='view'" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item  label="机构类型" prop="deptType">
        <el-select v-model="form.deptType"   placeholder="请选择机构类型" style="width: 370px;" :disabled="operate==='view'" clearable>
          <el-option v-for="type in deptTypes" :key="type.id" :label="type.name" :value="type.deptType"/>
        </el-select>
      </el-form-item>
       <el-form-item  label="教育学制" v-if="form.deptType==3||form.deptType==4 || form.deptType==5" prop="mechanism">
        <el-select v-model="form.mechanism"   placeholder="请选择教育学制" style="width: 370px;" :disabled="operate==='view'" clearable>
          <el-option v-for="etype in educationalTypes" :key="etype.id" :label="etype.label" :value="etype.value"/>
        </el-select>
      </el-form-item>
      <!-- <el-form-item v-if="roles.includes('admin')" style="margin-bottom: 0px;" label="上级部门">
        <treeselect v-model="form.parentId" :options="depts" style="width: 370px;" :disabled="operate==='view'" placeholder="选择上级部门" />
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate!=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
 import { mapGetters } from 'vuex'

import { add, edit, tree, getById } from '@/api/base/dept'
import { get } from '@/api/base/dictDetail'
import {getDeptTypeByRoleCode} from '@/api/base/dept'
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
      deptTypes:[],
      educationalTypes:[],
      form: {
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        parentId: null,
        deptType:null,
        mechanism:null,
        status: '0',
        sort: '999'
      },
      rules: {
        deptName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur', type: 'number' }
        ],
        deptType:[
           { required: true, message: '请选择部门类型', trigger: 'change' }
        ],
        mechanism:[
           { required: true, message: '请选择教育学制', trigger: 'change' }
        ]
      },
      titleMap: {
        create: '新增',
        update: '编辑',
        view: '查看'
      }
    }
  },
   computed: {
    ...mapGetters([
     ["roles"]
    ]),
  },
  created () {
    this.getDeptTree()
    this.getDeptTypes()
    this.getEnducationalSystem()
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
         this.getDeptTree()
      }).catch(err => {
        this.loading = false
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
         this.getDeptTree()
      }).catch(err => {
        this.loading = false
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        parentId: null,
        status: '0',
        sort: '999'
      }
    },
    // 获取机构树
    getDeptTree () {
      tree({ }).then(res => {
        this.depts = res.data
      })
    },
    // 获取机构类型
    getDeptTypes () {
      getDeptTypeByRoleCode().then(res => {
        this.deptTypes = res.data
      })
    },
    // 获取教育学制
    getEnducationalSystem(){
         get('sys_educational').then(res=>{
        this.educationalTypes=res.data.data
      })
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
