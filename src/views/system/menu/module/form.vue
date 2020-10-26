<template>
  <el-dialog :visible.sync="dialog" v-if="dialog" :title="titleMap[operate]" append-to-body width="600px" :destroy-on-close="true" :show-close="false" @close="cancel">
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="80px" inline>
      <el-form-item label="菜单名称" prop="menuName">
        <el-input v-model="form.menuName" placeholder="菜单名称" :disabled="operate==='view'" class="form-column-one"/>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <treeselect v-model="form.parentId" :options="menus" :disabled="operate==='view'" placeholder="请选择上级菜单" class="form-column-one" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-select v-model="form.menuType" placeholder="请选择菜单类型" :disabled="operate==='view'" class="form-column-one">
          <el-option v-for="item in menuTypeOptions" :key="item.id" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单图标" v-if="form.menuType !=='F'">
        <el-popover
          placement="bottom-start"
          width="460"
          trigger="click"
          @show="$refs['iconSelect'].reset()">
          <IconSelect ref="iconSelect" @selected="selected" />
          <el-input slot="reference" v-model="form.icon" class="form-column-one" :disabled="operate==='view'" placeholder="点击选择图标" readonly>
            <svg-icon v-if="form.icon" slot="prefix" :icon-class="form.icon" class="el-input__icon" style="height: 32px;width: 16px;" />
            <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
          </el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单排序">
        <el-input-number v-model.number="form.sort" :min="0" :max="999" :disabled="operate==='view'" controls-position="right" class="form-column-one"/>
      </el-form-item>
      <el-form-item label="是否外链" v-if="form.menuType !=='F'">
        <el-radio v-model="form.isFrame" label="0" :disabled="operate==='view'">是</el-radio>
        <el-radio v-model="form.isFrame" label="1" :disabled="operate==='view'">否</el-radio>
      </el-form-item>
      <el-form-item label="链接地址" v-if="form.menuType !=='F'">
        <el-input v-model="form.path" placeholder="链接地址" class="form-column-one" :disabled="operate==='view'"/>
      </el-form-item>
      <el-form-item v-if="form.isFrame === '1'&&form.menuType ==='C'" label="组件路径">
        <el-input v-model="form.component" placeholder="组件路径" class="form-column-one" :disabled="operate==='view'"/>
      </el-form-item>
      <el-form-item label="权限标识" v-if="form.menuType !=='M'">
        <el-input v-model="form.permission" placeholder="权限标识" class="form-column-one" :disabled="operate==='view'"/>
      </el-form-item>
      <el-form-item label="菜单状态" v-if="form.menuType !=='F'">
        <el-radio v-model="form.visible" label="0" :disabled="operate==='view'">显示</el-radio>
        <el-radio v-model="form.visible" label="1" :disabled="operate==='view'">隐藏</el-radio>
      </el-form-item>
      <el-form-item label="是否缓存" v-if="form.menuType !=='F'">
        <el-radio v-model="form.keepAlive" label="true" :disabled="operate==='view'">是</el-radio>
        <el-radio v-model="form.keepAlive" label="false" :disabled="operate==='view'">否</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate !=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, tree, getById } from '@/api/base/menu'
import Treeselect from '@riophae/vue-treeselect'
import IconSelect from '@/components/IconSelect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect, IconSelect },
  props: {
    operate: {
      type: String,
      required: true
    },
    menuTypeOptions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      menus: [],
      form: {
        menuId: undefined,
        menuName: undefined,
        sort: 999,
        parentId: 0,
        path: undefined,
        component: undefined,
        isFrame: '1',
        menuType: undefined,
        visible: '0',
        permission: undefined,
        keepAlive: 'true',
        icon: undefined
      },
      rules: {
        menuName: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' }
        ],
        menuType: [
          { required: true, message: '请选择菜单类型', trigger: 'blue' }
        ]
      },
      titleMap: {
        'create': '新建',
        'update': '更新',
        'view': '查看'
      }
    }
  },
  methods: {
    handleInitData (menuId) {
      getById(menuId).then(response => {
        this.form = response.data
        this.form.keepAlive = response.data.keepAlive.toString()
      })
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      if (this.form.menuType !== 'F' && !this.form.icon) {
        this.$alert('图标必须选择', '提示', { type: 'warning' })
        return false
      }
      if (this.form.menuType === 'M' && !this.form.path) {
        this.$alert('链接地址必须填写', '提示', { type: 'warning' })
        return false
      }
      if (this.form.menuType === 'C' && (!this.form.path || !this.form.component)) {
        this.$alert('链接地址及组件路径必须填写', '提示', { type: 'warning' })
        return false
      }
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
      add(this.form).then(() => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.getMenuTree()
        this.loading = false
        this.$parent.handleQuery()
      }).catch(err => {
        this.loading = false
        console.log(err.response)
      })
    },
    doEdit () {
      edit(this.form).then(() => {
        this.$parent.handleQuery()
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.getMenuTree()
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log(err.response)
      })
    },
    resetForm () {
      this.$refs.form.resetFields()
      this.form = {
        menuId: undefined,
        menuName: undefined,
        sort: 999,
        parentId: 0,
        path: undefined,
        component: undefined,
        isFrame: '1',
        menuType: undefined,
        visible: '0',
        permission: undefined,
        keepAlive: 'true',
        icon: undefined
      }
      this.dialog = false
    },
    selected (name) {
      this.form.icon = name
    },
    getMenuTree () {
      tree({ menuType: 'MC' }).then(res => {
        this.menus = res.data
      })
    }
  },
  created () {
    this.getMenuTree()
  }
}
</script>
<style  lang="less"  scoped>
  /deep/.vue-treeselect{
    &__control{
      height: 20px;
      border-color:lightgreen;
    }
    &__placeholder{
      font-size: 12px;
    }
    &__input{
      font-size: 12px;
    }
  }
  .form-column-one{
    width: 180px;
  }
</style>
