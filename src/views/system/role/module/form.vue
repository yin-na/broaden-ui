<template>
  <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :title="titleMap[operate]" append-to-body width="650px" @close="resetForm">
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="90px">
      <el-form-item label="角色编码" prop="roleCode">
        <el-input v-model.trim="form.roleCode" placeholder="请勿输入汉字" :disabled="operate !=='create'" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model.trim="form.roleName" placeholder="请输入角色名称" :disabled="operate === 'view'" style="width: 370px;"/>
      </el-form-item>
      <!-- <el-form-item label="显示位置" prop="showType">
        <el-select v-model="form.showType" placeholder="请选择显示位置" clearable  style="width: 370px;">
          <el-option key="0" label="机构管理员" value="0"/>
          <el-option key="1" label="普通用户管理" value="1"/>
        </el-select>
      </el-form-item> -->
        <el-form-item label="所属系统" prop="roleType">
        <el-select v-model="form.roleType" placeholder="请选择所属系统" :disabled="sysdisabled" clearable  @change="changeDeptType" style="width: 370px;">
          <el-option v-for="r in roleTypes" :key="r.id" :label="r.label" :value="r.value"/>
        </el-select>
      </el-form-item>
       <!-- <el-form-item label="直属机构" prop="roleType">
        <el-select multiple v-model="form.deptTypes" placeholder="请选择该角色的直属机构" clearable  style="width: 370px;">
          <el-option v-for="r in deptTypes" :key="r.id" :label="r.name" :value="r.deptType"/>
        </el-select>
      </el-form-item> -->
        <!-- <el-form-item label="创建下级权限" prop="sysTypes">
        <el-select multiple v-model="form.sysTypes" placeholder="请选择创建权限" clearable  style="width: 370px;">
          <el-option v-for="r in sysTypess" :key="r.id" :label="r.name" :value="r.deptType"/>
        </el-select>
      </el-form-item> -->

      <el-form-item label="显示顺序" prop="sort">
        <el-input-number v-model.number="form.sort"  :min="0" :max="999" :disabled="operate ==='view'" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" style="width: 370px;" :disabled="operate==='view'" autosize type="textarea"/>
      </el-form-item>
      <el-form-item label="菜单权限" class="is-required">
        <el-scrollbar wrapClass="scrollbar-wrap"
        :style="{height: scrollHeight}">
        <el-tree  :data="menuTrees" show-checkbox  ref="menu"  node-key="id" empty-text="加载中，请稍后"
          :props="defaultProps" :default-checked-keys="menuIds" />
          </el-scrollbar>
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
import { getDeptLevels } from '@/api/base/dept'
import {get} from '@/api/base/dictDetail'
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
    var roleCodeValidator=(rule, value, callback)=>{
       var reg=new RegExp("^[a-zA-Z0-9_]{1,}$","g")
       if(!reg.test(value)){
            return callback(new Error("只能输入数字、字母、下划线"))
        }else{
          return  callback()
        }
      };
    var roleNameValidator = (rule, value, callback) => {
      var reg2 = new RegExp("[#^$@&￥%《》<>{,，'\"*。|;；}]", "g");
      if (reg2.test(value)) {
        return callback(new Error("不能包含特殊字符"));
      } else {
        return callback();
      }
    };
    return {
      loading: false,
      dialog: false,
      menuIds: [],
      sysdisabled:false,
      roleTypes:[],
      sysTypess:[],
      sysTypes:[],
      deptTypes:[],
      deptTypess:[],
      scrollHeight:"0px",
      form: {
        roleId: undefined,
        roleCode: undefined,
        roleName: undefined,
        remark: undefined,
        showType: undefined,
        roleType:undefined,
        sysTypes:[],
        deptTypes:[],
        sort: '999',
        status: '0',
        menuIds: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
           { min: 2, max: 20, message: '长度在 2 到 15 个字符', trigger: 'blur' },
           {validator:roleNameValidator,message:'角色名称不能包含特殊字符'}
        ],
        roleCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 15 个字符', trigger: 'blur' },
           {validator:roleCodeValidator,message:'角色编码只能为数字、字母、下划线'}
        ],
         roleType: [
          { required: true, message: '请选择角色所属系统', trigger: 'blur' }
        ],
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
  created(){
     this.scrollHeight = window.innerHeight*0.5 + 'px';
      if(this.$route.path=="/edu/role"){
          this.form.roleType="1"
          this.sysdisabled=true
      }
       if(this.$route.path=="/community/role"){
         this.form.roleType="3"
          this.sysdisabled=true
      }
      if(this.$route.path=="/nhc/role"){
         this.form.roleType="4"
          this.sysdisabled=true
    }
      this.getSysRoleType()
      this.getSysTypes()
  },
  methods: {
    handleInitData (roleId) {
      getById(roleId).then(response => {
        this.form = response.data
        if(this.form.roleType!=undefined){
            this.setDeptType(this.form.roleType)
        }
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
    setDeptType(value){
        let types=this.deptTypess.filter((d)=>{
           return d.type==value
        })
        this.deptTypes=types
    },
    changeDeptType(value){
        let types=this.deptTypess.filter((d)=>{
           return d.type==value
        })
        this.deptTypes=types
        this.form.deptType=undefined
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      let menuIds = this.getMenuAllCheckedKeys()
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
    getSysRoleType(){
        get('sys_role_type').then(res=>{
          this.roleTypes=res.data.data
        })
    },
    getSysTypes(){
         getDeptLevels({}).then(res=>{
              this.sysTypess=res.data
              this.deptTypess=res.data
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
       if(this.$route.path=="/edu/role"){
          this.form.roleType="1"
          this.sysdisabled=true
      }
       if(this.$route.path=="/community/role"){
         this.form.roleType="3"
          this.sysdisabled=true
      }
       if(this.$route.path=="/nhc/role"){
          this.form.roleType="4"
          this.sysdisabled=true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-scrollbar{
      height: 60%;
      .scrollbar-wrap{
        overflow-x: hidden;
      }
      .el-scrollbar__bar{
        
      }
    }
</style>