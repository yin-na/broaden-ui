<template>
  <el-dialog
    :visible.sync="dialog"
    :title="titleMap[operate]"
    :close-on-click-modal="false"
    append-to-body
    width="650px"
    @close="resetForm"
  >
    <el-form ref="form" :model="form" :rules="rules" size="mini" label-width="120px">
      <el-form-item label="机构类型名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入机构类型名称"
          :disabled="operate === 'view'"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="机构类型唯一编码" prop="deptType">
        <el-input
          v-model="form.deptType"
          placeholder="请输入机构类型唯一编码"
          :disabled="operate === 'view'||operate === 'update'"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="所属系统" prop="type">
        <el-select
          v-model="form.type"
          placeholder="请选择所属系统"
           :disabled="operate === 'view'"
          clearable
          style="width: 370px;"
          @change="getSysRoles"
        >
          <el-option v-for="r in roleTypes" :key="r.id" :label="r.label" :value="r.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="绑定可创建角色" prop="roleIdArray">
        <el-select
          multiple
          v-model="form.roleIdArray"
           :disabled="operate === 'view'"
          placeholder="请选择该层级可创建的角色"
          clearable
          style="width: 370px;"
        >
          <el-option v-for="r in roleList" :key="r.id" :label="r.roleName" :value="r.roleId" />
        </el-select>
      </el-form-item>

      <el-form-item label="显示顺序" prop="sort">
        <el-input-number
          v-model.number="form.sort"
          :min="0" 
          :max="999"
          :disabled="operate ==='view'"
          controls-position="right"
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          style="width: 370px;"
          :disabled="operate==='view'"
          autosize
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" v-if="operate !=='view'" type="success" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  saveOrUpdateDeptLevel,
  getDeptLevelById,
  getDeptLevels,
} from "@/api/base/dept";
import { get } from "@/api/base/dictDetail";
import { sysRoleList } from "@/api/base/role";
export default {
  props: {
    operate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      menuIds: [],
      roleTypes: [],
      sysTypess: [],
      sysTypes: [],
      roleList: [],
      form: {
        id: undefined,
        name: undefined,
        type: undefined,
        deptType: undefined,
        remark: undefined,
        roleIdArray: [],
        sort: "999",
      },
      rules: {
        name: [
          { required: true, message: "请输入机构类型名称", trigger: "blur" },
        ],
        deptType: [
          {
            required: true,
            message: "请输入机构类型唯一编码",
            trigger: "blur",
          },
        ],
        type: [{ required: true, message: "请选择所属系统", trigger: "blur" }],
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      titleMap: {
        create: "新建",
        update: "更新",
        view: "查看",
      },
    };
  },
  created() {
    this.getSysRoleType();
    this.getSysTypes();
  },
  methods: {
    handleInitData(id) {
      getDeptLevelById(id).then((response) => {
        this.form.id = response.data.id;
        this.form.name = response.data.name;
        this.form.type = response.data.type;
        this.form.remark = response.data.remark;
        this.form.sort = response.data.sort;
        this.form.deptType = response.data.deptType;
        this.form.roleIdArray =
          response.data.roleIds == null ? [] : response.data.roleIds.split("#");
        this.getSysRoles();
      });
    },
    cancel() {
      this.resetForm();
    },
    doSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.operate === "create") {
            this.doAdd();
          } else this.doEdit();
        } else {
          return false;
        }
      });
    },
    doAdd() {
      saveOrUpdateDeptLevel(this.form)
        .then((res) => {
          this.resetForm();
          if (res.code == 0) {
            this.$notify({
              title: "添加成功",
              type: "success",
              duration: 2500,
            });
            this.loading = false;
            this.$parent.init();
          } else {
            this.$notify({
              title: res.message,
              type: "error",
              duration: 2500,
            });
            this.loading = false;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    doEdit() {
      saveOrUpdateDeptLevel(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getSysRoleType() {
      get("sys_role_type").then((res) => {
        this.roleTypes = res.data.data;
      });
    },
    getSysTypes() {
      getDeptLevels({}).then((res) => {
        this.sysTypess = res.data.data;
      });
    },
    getSysRoles() {
      this.roleList = [];
      let role = {
        roleType: this.form.type,
      };
      sysRoleList(role).then((res) => {
        this.roleList = res.data;
      });
    },
    resetForm() {
      this.dialog = false;
      this.$refs.form.resetFields();
      this.form = {
        id: undefined,
        name: undefined,
        type: "",
        deptType: undefined,
        roleIdArray: [],
        remark: undefined,
        sort: "999",
      };
    },
  },
};
</script>
