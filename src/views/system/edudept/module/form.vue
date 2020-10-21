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
      <el-form-item label="机构名称" prop="deptName">
        <el-input v-model="form.deptName" :disabled="operate==='view'" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="机构编码" prop="deptCode">
        <el-input v-model="form.deptCode" :disabled="operate==='view'" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="管理员账号" prop="headUser">
        <el-input
          v-model="form.headUser"
          :disabled="operate==='view' || operate==='update' "
          style="width: 370px;"
        />
      </el-form-item>
      <el-form-item label="机构类型" prop="deptType">
        <el-select
          v-model="form.deptType"
          placeholder="请选择机构类型"
          style="width: 370px;"
          :disabled="operate==='view' || operate==='update'"
          clearable
        >
          <el-option
            v-for="type in deptTypes"
            :key="type.id"
            :label="type.name"
            :value="type.deptType"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="教育学制"
        v-if="form.deptType==3||form.deptType==4 || form.deptType==5"
        prop="mechanism"
      >
        <el-select
          v-model="form.mechanism"
          placeholder="请选择教育学制"
          style="width: 370px;"
          :disabled="operate==='view'"
          clearable
        >
          <el-option
            v-for="etype in educationalTypes"
            :key="etype.id"
            :label="etype.label"
            :value="etype.value"
          />
        </el-select>
      </el-form-item>
        <el-form-item
        label="绑定医院"
        v-if="form.deptType==8"
        prop="bindingHospitals"
      >
        <el-select
          multiple
          v-model="form.bindingHospitals"
          placeholder="请选择要绑定的医院"
          style="width: 370px;"
          :disabled="operate==='view'"
          clearable
        >
          <el-option
            v-for="etype in hospitals"
            :key="etype.deptId"
            :label="etype.deptName"
            :value="etype.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="机构地址" prop="streetCode" class="is-required">
        <div class="linkage">
          <el-select
            :disabled="operate==='view'"
            v-model="form.provinceCode"
            placeholder="省级地区"
            style="width:49%"
            class="mgr8 mgb5"
            @change="choseProvince"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.provinceCode"
              :label="item.provinceName"
              :value="item.provinceCode"
            />
          </el-select>
          <el-select
            :disabled="operate==='view'"
            v-model="form.cityCode"
            placeholder="市级地区"
            style="width:49%"
            class="mgb5"
            @change="choseCity"
          >
            <el-option
              v-for="item in cityList"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode"
            />
          </el-select>
          <el-select
            :disabled="operate==='view'"
            v-model="form.areaCode"
            placeholder="区级地区"
            style="width:49%"
            class="mgr8 mgb5"
            @change="choseBlock"
          >
            <el-option
              v-for="item in areaList"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode"
            />
          </el-select>
          <el-select
            :disabled="operate==='view'"
            v-model="form.streetCode"
            placeholder="街道地区"
            style="width:49%"
            @change="validateArea"
          >
            <el-option
              v-for="item in streetList"
              :key="item.streetCode"
              :label="item.streetName"
              :value="item.streetCode"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item prop="deptAddress" style="marginTop: -15px">
        <el-input
          :disabled="operate==='view'"
          v-model.trim="form.deptAddress"
          placeholder="请输入详细地址"
        />
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
import { createDept, getById, edit,getAreaHospitalList } from "@/api/base/dept";
import { get } from "@/api/base/dictDetail";
import {
  getProvinceList,
  getCityList,
  getAreaList,
  getStreetList,
} from "@/api/base/area";
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
      educationalTypes: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      streetList: [],
      hospitals:[],
      form: {
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        provinceCode: undefined,
        bindingHospital:'',
        bindingHospitals:[],
        cityCode: undefined,
        areaCode: undefined,
        streetCode: undefined,
        parentId: null,
        deptType: null,
        mechanism: null,
        status: "0",
        sort: "999",
      },
      rules: {
        deptName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min:2,
            max:10,
            message: '请输入2-10个汉字',
            },
           {pattern: /^[\u4e00-\u9fa5]+$/, message: "请输入汉字",trigger: "blur"},
        ],
        bindingHospitals:[
          { required: true, message: "请选择医院", trigger: "change" },
        ],
        deptType: [
          { required: true, message: "请选择部门类型", trigger: "change" },
        ],
        mechanism: [
          { required: true, message: "请选择教育学制", trigger: "change" },
        ],
        deptCode:[
            {
            pattern: /^[0-9]{3,10}$/,
            message: "请输入3-10位的数字",
          },
        ],
        deptAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur",
          },
          {
            min: 2,
            message: "地址长度不能少于2",
          },
          {
            max: 50,
            message: "地址长度不能超过50",
          },
        ],
        streetCode: [{ validator: addressRule, trigger: "blur" }],
        headUser: [
          {
            required: true,
            message: "管理员账号不能为空",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9]{3,10}$/,
            message: "请输入3-10位的字母或者数字",
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
    this.getEnducationalSystem();
    this.getProvince();
    this.getAreaHospital();
  },
  methods: {
    handleInitData(id) {
      getById(id).then((response) => {
         this.form = response.data;
         this.form.bindingHospitals=this.form.bindingHospital==null?[]:this.form.bindingHospital.split('#')
        if (this.form.cityCode) {
          this.getCity();
          this.getArea();
          this.getStreet();
        }
      });
    },
    cancel() {
      this.resetForm();
    },
    getProvince() {
      getProvinceList().then((res) => {
        this.provinceList = res.data;
      });
    },
    getAreaHospital(){
        getAreaHospitalList().then(res=>{
          this.hospitals=res.data
        })
    },
    getCity() {
      getCityList({ provinceCode: this.form.provinceCode }).then((res) => {
        this.cityList = res.data;
      });
    },
    getArea() {
      getAreaList({ cityCode: this.form.cityCode }).then((res) => {
        this.areaList = res.data;
      });
    },
    getStreet() {
      getStreetList({ areaCode: this.form.areaCode }).then((res) => {
        this.streetList = res.data;
      });
    },
    choseProvince() {
      this.form.cityCode = undefined;
      this.form.areaCode = undefined;
      this.form.streetCode = undefined;
      this.getCity();
    },
    choseCity() {
      this.form.areaCode = undefined;
      this.form.streetCode = undefined;
      this.getArea();
    },
    choseBlock() {
      this.form.streetCode = undefined;
      this.getStreet();
    },
    validateArea() {
      this.$refs.form.validate((valid) => {});
    },
    doSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.form.deptType==8){
            this.form.bindingHospital=this.form.bindingHospitals.join('#')
          }
          if (this.form.parentId !== undefined) {
            this.loading = true;
            if (this.operate === "create") {
              this.handleCreate();
            } else this.handleUpdate();
          } else {
            this.$message({
              message: "上级部门不能为空",
              type: "warning",
            });
          }
        }
      });
    },
    handleCreate() {
      createDept(this.form)
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
          this.getDeptTree();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    handleUpdate() {
      edit(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.handleQuery();
          this.getDeptTree();
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs.form.resetFields();
      this.form = {
        deptId: undefined,
        deptCode: undefined,
        deptName: undefined,
        provinceCode: undefined,
        cityCode: undefined,
        areaCode: undefined,
        streetCode: undefined,
        parentId: null,
        deptType: null,
        mechanism: null,
        status: "0",
        sort: "999",
      };
    },
    // 获取教育学制
    getEnducationalSystem() {
      get("sys_educational").then((res) => {
        this.educationalTypes = res.data.data;
      });
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
