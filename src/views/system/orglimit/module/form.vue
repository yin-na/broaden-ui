<template>
  <el-dialog
    append-to-body
    :visible.sync="dialog"
    :close-on-click-modal="false"
    :title="titleMap[operate]"
    width="700px"
    @close="cancel"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
     <el-form-item label="角色" prop="role">
        <el-select
          v-model="form.role"
          placeholder="请选择角色"
          style="width: 370px;"
          :disabled="operate==='view' || operate==='update'"
           @change="setRoleName"
          clearable
        >
          <el-option
            v-for="type in deptTypes"
            :key="type.roleId"
            :label="type.roleName"
            :value="type.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建机构数量" prop="number">
        <el-input-number v-model="form.number" :disabled="operate==='view'" style="width: 370px;" />
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="success" v-if="operate!=='view'" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { saveLimit} from "@/api/base/deptlimit";
import { get } from "@/api/base/dictDetail";
export default {
  props: {
    operate: {
      type: String,
      default: "",
    },
    deptTypes: {
      type: Array,
      required: true,
    },
  },
  data() {
    var addressRule = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择地区"));
      }
      if (this.form.cityCode == "") {
        callback(new Error("请选择市"));
      } else if (this.form.areaCode == "") {
        callback(new Error("请选择区"));
      } else if (this.form.streetCode == "") {
        callback(new Error("请选择街道"));
      } else {
        callback();
      }
    };
    var nameValidator = (rule, value, callback) => {
      var reg2 = new RegExp("[#^$@&￥%《》<>]", "g");
      if (reg2.test(value)) {
        return callback(new Error("不能包含特殊字符"));
      } else {
        return callback();
      }
    };
    return {
      loading: false,
      dialog: false,
      depts: [],
      form: {
        id:undefined,
        role: undefined,
        number: undefined,
        roleName:undefined,
        type:undefined
      },
      rules: {
        role: [
          { required: true, message: "请选择角色", trigger: "change" },
        ],
       
        number: [
          {
            required: true,
            message: "请输入机构数量",
            trigger: "blur",
          },
        ],
      },
      titleMap: {
        create: "新增",
        update: "编辑",
        view: "查看",
      },
    };
  },
  computed: {
    ...mapGetters([["roles"]]),
  },
  created() {
  },
  methods: {
    handleInitData(data) {
      this.form.id=data.id
      this.form.role=data.role
      this.form.number=data.number,
      this.form.roleName=data.roleName,
      this.form.type=data.type
    },
    cancel() {
      this.resetForm();
    },
    setRoleName(id){
        let role=this.deptTypes.filter(r=>r.roleId==id)[0]
        console.log(role,'aa')
        this.form.roleName=role.roleName
        this.form.type=role.roleType
    },
    doSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
            this.loading = true;
            if (this.operate === "create") {
              this.handleCreate();
            } else this.handleUpdate();
        }
      });
    },
    handleCreate() {
      saveLimit(this.form)
        .then((res) => {
         if(res.code==0){
             this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500,
          });
          this.resetForm();
         }else{
            this.$notify({
            title: res.message,
            type: "error",
            duration: 2500,
          });
         }
          this.loading = false;
          this.$parent.handleQuery();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    handleUpdate() {
      saveLimit(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.handleQuery();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs.form.resetFields();
      this.form = {
        id:undefined,
        role: undefined,
        number: undefined,
        roleName:undefined,
        type:undefined
      };
    },
  },
};
</script>

<style scoped>
::v-deep .vue-treeselect__control {
  border-color: lightgreen;
}
::v-deep
  .vue-treeselect:not(.vue-treeselect--disabled):not(.vue-treeselect--focused)
  .vue-treeselect__control:hover {
  border-color: lightgreen;
}
</style>
