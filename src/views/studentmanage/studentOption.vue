<template>
  <div class="calendar-list-container">
    <el-row class="mechanism-msg">
      <el-col :span="24" class="base-table-title-msg">
        <div class="filter-container">
          <el-card :shadow="shadow" style="padding-top:20px;">
            <el-form
              class="my-base-form"
              :model="data"
              :rules="rules"
              ref="dataForm"
              label-width="200px"
              style="width: 80%; margin:0 auto;"
            >
              <div class="label-msg" :style="{borderColor: theme}">学生基本信息</div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="username">
                    <el-input :disabled="disabled" v-model.trim="data.username" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：" prop="idCard">
                    <el-input :disabled="disabled" v-model.trim="data.idCard" placeholder="请输入身份证号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="性别：" prop="sex">
                    <el-select :disabled="disabled" v-model.trim="data.sex" placeholder="请输入性别">
                      <el-option
                        v-for="item in sexList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="民族：">
                    <!-- <el-input :disabled="disabled" v-model.trim="data.nationality" placeholder="请输入民族"></el-input> -->
                    <el-select v-model.trim="data.nationality" placeholder="请选择民族">
                      <el-option
                        v-for="item in nationalitys"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="学籍号：" prop="loginName">
                    <el-input
                      :disabled="dontUpdate"
                      v-model.trim="data.loginName"
                      placeholder="请输入学籍号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出生日期：" prop="birthday">
                    <el-date-picker
                      :disabled="disabled"
                      :picker-options="pickerOptions0"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      v-model="data.birthday"
                      type="date"
                      placeholder="出生日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <div
                class="fs14"
                style="color:red;padding-left:100px;padding-bottom:10px;"
              >备注 ：学籍号为学生登录账号！</div>
              <el-col :span="24">
                <div class="label-msg" :style="{borderColor: theme}">学校基本信息</div>
              </el-col>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="学校名称：">
                    <el-input disabled="disabled" v-model="schoolName" placeholder="请输入学校名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学校类别：">
                    <el-select disabled="disabled" v-model="schoolType" placeholder="请输入学校类别">
                      <el-option
                        v-for="item in schoolTypes"
                        :key="item.id"
                        :label="item.name"
                        :value="item.deptType"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="年级：" prop="gradeId">
                    <el-select
                      @change="grades"
                      :disabled="disabled"
                      v-model="data.gradeId"
                      placeholder="请选择年级"
                    >
                      <el-option
                        v-for="item in gradesList"
                        :key="item.id"
                        :label="item.gradeStage"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="班级：" prop="classId">
                    <el-select
                      :disabled="disabled"
                      v-model="data.classId"
                      placeholder="请选择班级（请先选择年级）"
                    >
                      <el-option
                        v-for="item in classIds"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col :span="24">
                <div class="label-msg fl" :style="{borderColor: theme}">监护人基本信息</div>
                <div class="fr">
                  <el-button v-if="opt != 'read'" type="text" class="fs16" @click="addFamily">添加</el-button>
                </div>
              </el-col>
              <el-col :span="24" class="base-table-msg">
                <el-table
                  :class="noBorder ? 'no-border' : ''"
                  :border="!noBorder"
                  stripe
                  :data="data.patriarchList"
                  :header-cell-style="{
                        'background-color': '#f6f7f9',
                        'color': '#343d4a',
                        'font-size':'14px',
                    }"
                  style="width: 100%;"
                >
                  <el-table-column label="姓名" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.username}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="性别" align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.sex==0">男</span>
                      <span v-if="scope.row.sex==1">女</span>
                      <span v-if="scope.row.sex==2">未知</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="关系" align="center">
                    <template slot-scope="scope">
                      <div v-if="data.sex == 0">
                        <span v-if="scope.row.studentRelation == 0">父子</span>
                        <span v-else>母子</span>
                      </div>
                      <div v-else>
                        <span v-if="scope.row.studentRelation == 0">父女</span>
                        <span v-else>母女</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="联系电话" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.mobilePhone}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    v-if="opt != 'read'"
                    align="center"
                    label="操作"
                    class-name="small-padding fixed-width"
                  >
                    <template slot-scope="{row}">
                      <edit-btn @click="handleUpdate(row)" />
                      <delete-btn @click="handleDelete(row)" />
                    </template>
                  </el-table-column>
                </el-table>
                <div v-if="opt != 'create'">
                  <!-- <p class='fs16'>账号状态：{{ data.status | findCompanyType(userStatus) }}</p> -->
                </div>
              </el-col>
              <el-col class="btn-style" :span="24" align="center">
                <el-button type="primary" v-if="opt == 'read'" @click="goback">返回</el-button>
                <el-button v-if="opt != 'read'" @click="cancel1">取消</el-button>
                <el-button
                  type="primary"
                  v-if="opt == 'update'"
                  @click="updateData"
                  :loading="loading"
                >修改</el-button>
                <el-button
                  type="primary"
                  v-if="opt == 'create'"
                  @click="creatData"
                  :loading="loading"
                >确定</el-button>
                <el-button
                  type="primary"
                  v-if="data.status == '1'"
                  plain
                  size="small"
                  @click="examineUser('2', 'data')"
                >拒绝</el-button>
                <el-button
                  type="primary"
                  v-if="data.status == '1'"
                  size="small"
                  @click="examineUser('0', 'data')"
                >通过</el-button>
              </el-col>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :close-on-click-modal="false"
      :append-to-body="true"
      width="560px"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="formData"
        label-width="100px"
        style="width: 420px; margin-left:50px;"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model.trim="form.username" class="filter-item w320" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="关系" prop="studentRelation">
          <el-select
            v-model.trim="form.studentRelation"
            class="filter-item w320"
            placeholder="请选择亲属关系"
            @change="setSex"
          >
            <el-option
              v-for="item in relationships"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            :disabled="true"
            v-model="form.sex"
            class="filter-item w320"
            placeholder="请选择亲属性别"
          >
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobilePhone">
          <el-input v-model.trim="form.mobilePhone" class="filter-item w320" placeholder="请输入联系电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createFamily">确 定</el-button>
        <el-button v-else type="primary" @click="updateFamily">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  saveStudent,
  getClass,
  getStudentDetail,
  getSchool,
} from "@/api/student/student";
import { getDeptLevels } from "@/api/base/dept";
import { get } from "@/api/base/dictDetail";
import nationalitys from "@/mixin/baseData/nationalitys";
import { getDeptInfo } from "@/api/base/user";
import ui from "@/mixin/ui";
export default {
  name: "studentOption",
  mixins: [ui, nationalitys],
  data() {
    return {
      //选择今天以及以前的日期
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        },
      },
      loading: false,
      dontUpdate: false,
      schoolName: "",
      schoolType: "",
      schoolTypes: "",
      data: {
        userId: "",
        username: "",
        gradeId: "",
        loginName: "",
        sex: undefined,
        nationality: "",
        birthday: "",
        idCard: "",
        deptId: "",
        deptName: "",
        classId: "",
        patriarchList: [],
      },
      form: {
        username: "",
        studentRelation: "",
      },
      disabled: false,
      classIds: [],
      gradeIds: [],
      gradesList: [],
      editDisabled: false,
      rules: {
        username: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "请输入2-10个汉字",
          },
          {
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: "请输入汉字",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        loginName: [
          {
            required: true,
            message: "学籍号不能为空",
            trigger: "blur",
          },
            { min: 2, max: 15, message: '长度在 2 到 15 个数字', trigger: 'blur' },
          {
            pattern: /^\d+$|^\d+?\d+$/,
            message: "请输入数字",
          },
        ],
        nationality: [
          {
            required: false,
            message: "请输入民族",
            trigger: "blur",
          },
        ],
        birthday: [
          {
            required: true,
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        schoolStage: [
          {
            required: true,
            message: "请选择教育阶段",
            trigger: "change",
          },
        ],
        gradeId: [
          {
            required: true,
            message: "请选择所在年级",
            trigger: "change",
          },
        ],
        classId: [
          {
            required: true,
            message: "请选择所在班级",
            trigger: "change",
          },
        ],
        admissionTime: [
          {
            required: true,
            message: "请选择入学时间",
            trigger: "change",
          },
        ],
        studentRelation: [
          {
            required: true,
            message: "请选择亲属关系",
            trigger: "change",
          },
        ],
        mobilePhone: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
          },
        ],
      },
      sexList: [
        { label: "男", value: 0 },
        { label: "女", value: 1 }
        // { label: "保密", value: 2 },
      ],
      opt: "",
      dialogStatus: "",
      dialogFormVisible: false,
      textMap: {
        creat: "添加监护人信息",
        update: "修改监护人信息",
      },
      form: {
        studentId: "",
        username: "",
        sex: "",
        studentRelation: "",
        mobilePhone: "",
      },
      workerPart: [],
      relationships: [
        { key: "0", name: "父亲" },
        { key: "1", name: "母亲" },
      ],
      // listQuery:{
      //   current:1,
      //   size:-1,
      //   gradeId:''
      // },
      stuId: "",
    };
  },
  computed: {
    ...mapGetters(["theme", "schoolData"]),
  },

  created() {
    if (this.$route.params.id && this.$route.params.id != "-1") {
      this.data.userId = this.$route.params.id;
    }
    this.opt = this.$route.params.opt;
    this.init();
    this.getId();
    this.getClassList();
  },
  methods: {
    async validID(rule, value, callback) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      //let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      let reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

      if (reg.test(value)) {
        await this.go(value.length);
        callback();
      } else {
        callback(new Error("身份证号码不正确"));
      }
    },

    // 实现自动生成生日，性别，年龄
    go(val) {
      let iden = this.data.idCard;
      let sex = null;
      let birth = null;
      // let myDate = new Date();
      // let month = myDate.getMonth() + 1;
      // let day = myDate.getDate();
      // let age = 0;

      if (val === 18) {
        // age = myDate.getFullYear() - iden.substring(6, 10) - 1;
        sex = iden.substring(16, 17);
        birth =
          iden.substring(6, 10) +
          "-" +
          iden.substring(10, 12) +
          "-" +
          iden.substring(12, 14);
        // if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;
      }
      if (val === 15) {
        // age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
        sex = iden.substring(13, 14);
        birth =
          "19" +
          iden.substring(6, 8) +
          "-" +
          iden.substring(8, 10) +
          "-" +
          iden.substring(10, 12);
        // if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
      }

      if (sex % 2 === 0) sex = 1;
      else sex = 0;
      this.data.sex = sex;
      // this.data.studentAge = age;
      this.data.birthday = birth;
      // this.data.birthplace = this.area[iden.substring(0,2)];
    },
    getId() {
      if (this.opt == "read") {
        this.disabled = true;
        this.dontUpdate = true;
      }
      if (this.opt == "update") {
        this.dontUpdate = true;
      }
      if (this.data.userId != "") {
        getStudentDetail(this.data.userId).then((res) => {
          // console.log( res.data, '编辑')
          this.data.userId = res.data.userId;
          this.data.username = res.data.username;
          this.data.sex = res.data.sex;
          this.data.nationality = res.data.nationality;
          this.data.birthday = res.data.birthday;
          this.data.idCard = res.data.idCard;
          this.data.deptId = res.data.deptId;
          this.data.deptName = res.data.deptName;
          this.data.classId = res.data.classId;
          this.data.gradeId = res.data.gradeId;
          this.data.patriarchList =
            res.data.patriarchList == null ? [] : res.data.patriarchList;
          this.data.loginName = res.data.loginName;
          // this.getClass()
          this.grades();
        });
      }
    },
    //获取年级
    async init() {
      await this.grades();
      this.getSchoolType();
      this.getSchoolInfo();
    },
    //返回
    goback() {
      this.data.patriarchList = [];
      this.$refs["dataForm"].resetFields();
      this.$store.dispatch("delView", this.$route);
      this.$router.push("/education/userManer/studentmanage");
    },
      //取消
      cancel1() {
          this.$confirm('确认取消吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.goback()
          })
      },
    //取消
    cancel() {
      this.dialogFormVisible = false;
      this.resetTemp();
    },
    setSex() {
      if (this.form.studentRelation == "0") {
        this.form.sex = 0;
      }
      if (this.form.studentRelation == "1") {
        this.form.sex = 1;
      }
    },
    resetTemp() {
      this.form = {
        username: "",
        studentId: "",
        sex: "",
        studentRelation: "",
        mobilePhone: "",
      };
    },

    //添加亲属信息
    addFamily() {
      this.resetTemp();
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    //修改亲属信息
    handleUpdate(row) {
      this.form = row;
      this.dialogFormVisible = true;
      this.dialogStatus = "update";
    },
    //确定修改
    updateFamily() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let flag = false;
          this.data.patriarchList.forEach((a) => {
            if (a.mobilePhone == this.form.mobilePhone&&a.username!=this.form.username&&a.sex!=this.form.sex) {
              this.$message.error("联系电话不能重复");
              flag = true;
            }
          });
          if (flag) {
            return;
          }
          const index = this.data.patriarchList.indexOf(this.form);
          this.data.patriarchList.splice(index, 1, this.form);
          this.dialogFormVisible = false;
          this.$notify({
            type: "success",
            message: "修改成功",
            duration: 2500,
          });
        }
      });
    },
    createFamily() {
      this.$refs["formData"].validate((valid) => {
        if (valid) {
          let flag = false;
          this.data.patriarchList.forEach((a) => {
            if (a.mobilePhone == this.form.mobilePhone) {
              // debugger
              this.$message.error("联系电话不能重复");
              flag = true;
            }
          });
          if (flag) {
            return;
          }
          this.form.studentId = this.data.userId;
          this.form.loginName = this.form.mobilePhone;
          let str = this.form;
          this.data.patriarchList.unshift(str);
          this.dialogFormVisible = false;
          this.$notify({
            type: "success",
            message: "添加成功",
            duration: 2500,
          });
        }
      });
    },
    //删除亲属信息
    handleDelete(row) {
      this.$confirm("删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const index = this.data.patriarchList.indexOf(row);
          this.data.patriarchList.splice(index, 1);
          this.$notify({
            type: "success",
            message: "删除成功",
            duration: 2500,
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消删除",
            duration: 2500,
          });
        });
    },
    // 修改学生生信息
    updateData() {
      let that = this;
      this.$refs["dataForm"].validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          delete this.data["gradeId"];
          saveStudent(this.data).then((res) => {
            if (res.code == 0) {
              that.$message.success("修改成功");
              that.goback();
            } else if (res.code == -4) {
              that.$message.error("身份证或学籍号已存在！");
            } else {
              let msg = res.message ? res.message : "失败";
              that.$message.error(msg);
            }
            this.loading = false;
          });
        }
      });
    },

    // 创建学生信息
    creatData() {
      let that = this;
      this.$refs["dataForm"].validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          delete this.data["gradeId"];
          saveStudent(this.data).then((res) => {
            if (res.code == 0) {
              that.$message.success("创建成功");
              this.goback();
            } else {
              let msg = res.message ? res.message : "失败";
              if (res.code == -4) {
                that.$message.error("身份证或学籍号已存在！");
              } else {
                that.$message.error(msg);
              }
            }
            this.loading = false;
          });
        }
      });
    },
    // 查询机构信息
    getSchoolInfo() {
      getDeptInfo().then((res) => {
        // console.log(res.data, 'res.data')
        this.schoolName = res.data.deptName;
        this.schoolType = res.data.deptType;
        this.data.deptId = res.data.deptId;
        this.data.deptName = res.data.deptName;
      });
    },
    // 获取年级
    getClassList() {
      getSchool(0).then((res) => {
        this.gradesList = res.data;
        // console.log(this.gradesList, '年级')
      });
    },
    // 获取班级
    grades() {
      let gid = this.data.gradeId;
      if (gid != "") {
        getClass(gid).then((res) => {
          this.classIds = res.data;
          let flag = true;
          res.data.forEach((res1, index) => {
            console.log(res1);
            if (res1.id == this.data.classId) {
              flag = false;
            }
          });
          if (flag) {
            this.data.classId = "";
          }
          // console.log(this.classIds, '班级')
        });
      }

      // this.dontUpdate = false
    },
    // 查询机构类别
    getSchoolType() {
      getDeptLevels({}).then((res) => {
        this.schoolTypes = res.data;
      });
    },
  },
};
</script>
<style scoped>
.filter-container .el-select {
  width: 100%;
}
.filter-container .el-date-editor {
  width: 100%;
}
.btn-style {
  padding: 80px 0;
}
</style>
  