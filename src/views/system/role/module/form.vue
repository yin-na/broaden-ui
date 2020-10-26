<template>
  <el-dialog :visible.sync="dialog" :title="titleMap[operate]" append-to-body width="500px" @close="resetForm">
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="80px">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请勿输入汉字" :disabled="operate !=='create'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" :disabled="operate === 'view'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="显示顺序" prop="sort">
        <el-input-number v-model.number="form.sort" :min="1" :disabled="operate ==='view'" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" style="width: 370px;" :disabled="operate==='view'" autosize type="textarea"/>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-tree  :data="menuTrees" show-checkbox  ref="menu"  node-key="id" empty-text="加载中，请稍后"
          :props="defaultProps" :default-checked-keys="menuIds" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" v-if="operate !=='view'" type="success" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getById } from '@/api/base/role'
import { selectMenuByRoleId } from '@/api/base/menu'
export default {
  props: {
    operate: {
      type: String,
      required: true
    },
    menuTrees: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      menuIds: [],
      form: {
        roleId: undefined,
        roleCode: undefined,
        roleName: undefined,
        remark: undefined,
        sort: '999',
        status: '0',
        menuIds: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        roleCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      titleMap: {
        'create': '新建',
        'update': '更新',
        'view': '查看'
      }
    }
  },
  methods: {
    handleInitData (roleId) {
      getById(roleId).then(response => {
        this.form = response.data
      })
      selectMenuByRoleId(roleId).then(response => {
        this.menuIds = response.data
      })
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys () {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys()
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys()
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
      return checkedKeys
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      let menuIds = this.getMenuAllCheckedKeys()
      console.log(menuIds)
      if (!menuIds || menuIds.length === 0) {
        this.$alert('请选择菜单权限', '提示', { type: 'warning' })
        return false
      }
      this.form.menuIds = menuIds
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.operate === 'create') {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
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
      this.$refs.menu.setCheckedKeys([])
      this.menuIds = []
      this.dialog = false
      this.$refs.form.resetFields()
      this.form = {
        roleId: undefined,
        roleCode: undefined,
        roleName: undefined,
        remark: undefined,
        sort: '999',
        status: '0',
        menuIds: []
      }
    }
  }
}
</script>
