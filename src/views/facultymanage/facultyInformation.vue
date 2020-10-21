/*
 * @Author: 王世成
 * @Date: 2020-07-24 09:16:39
 * 教职工信息添加编辑页面
 */
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
              <div class="label-msg" :style="{borderColor: theme}">教职工基本信息</div>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="teacherName">
                    <el-input :disabled="disabled" v-model.trim="data.teacherName" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12"> 
                  <el-form-item label="联系电话：" prop="phone">
                    <el-input :disabled="disabled" v-model.trim="data.phone" placeholder="请输入联系电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-row>
                <el-col :span="12"> 
                  <el-form-item label="身份证号：" prop="idCard">
                    <el-input :disabled="disabled" v-model.trim="data.idCard" placeholder="请输入身份证号" @blur="validateForm"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期：" prop="birthday">
                        <el-date-picker disabled="disabled" :picker-options="pickerOptions0" format="yyyy年MM月dd日" value-format="yyyyMMdd"  v-model="data.birthday" type="date" placeholder="出生日期"></el-date-picker>
                    </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                  <el-col :span="12"> 
                  <el-form-item label="年龄：" prop="age">
                    <el-input :disabled="true" v-model.trim="data.age" placeholder="请输入年龄"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="性别：">
                  <el-select :disabled="dontUpdate" v-model.trim="data.studentSex" placeholder="请输入性别">
                    <el-option
                      v-for="item in sexList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              </el-row>

                <el-row>
                  <el-col :span="12"> 
                  <el-form-item label="民族：">
                    <!-- <el-input :disabled="disabled" v-model.trim="data.nationality" placeholder="请输入民族"></el-input> -->
                     <el-select  v-model.trim="data.nationality" placeholder="请选择民族" :disabled="dontUpdate">
                    <el-option
                      v-for="item in nationalitys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
<!--                <el-form-item label="入职时间：" prop="entryDate">

                  <el-date-picker :disabled="disabled" :picker-options="pickerOptions0" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"  v-model="data.entryDate" type="date" placeholder="入职时间"></el-date-picker>
                </el-form-item>-->
                  <el-form-item label="入职时间：" prop="entryDate">
                    <el-date-picker  :picker-options="pickerOptions0" :disabled="dontUpdate" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"  v-model="data.entryDate" type="date" placeholder="入职时间"></el-date-picker>
                  </el-form-item>
              </el-col>
              </el-row>

              <el-row>
              <el-col :span="12">
                <el-form-item label="邮箱：" prop="mailbox">
                  <el-input :disabled="dontUpdate" v-model.trim="data.mailbox" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </el-col>
              </el-row>

              <el-col :span="24">
                <div class="label-msg" :style="{borderColor: theme}">教务信息</div>  
              </el-col>
              <el-row>
                <el-col :span="12">
                <el-form-item label="所属学校：" prop="schoolName">
                  <el-input disabled="disabled" v-model="data.schoolName" placeholder="请输入学校名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="学校类别：" prop="schoolType">
                  <el-select disabled="disabled" v-model="data.schoolType" placeholder="请输入学校类别">
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
                <el-form-item label="教务类型：" prop="rducationStageType">
                  <el-select :disabled="dontUpdate" v-model.trim="data.rducationStageType" placeholder="请选择内容">
                    <el-option
                      v-for="item in checkList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="data.rducationStageType!='8c6250e0b92422ae612bf3a068ae3f2e'">
                <el-form-item label="年级：" prop="gradeId">
                  <el-select @change="grades" :disabled="dontUpdate" v-model="data.gradeId" placeholder="请选择年级">
                            <el-option
                                    v-for="item in gradesList"
                                    :key="item.id"
                                    :label="item.gradeStage"
                                    :value="item.id">
                            </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              </el-row>

              <el-row>
                <el-col :span="12" v-if="data.rducationStageType!='8c6250e0b92422ae612bf3a068ae3f2e'">
                <el-form-item label="班级：" prop="classId">
                  <el-select :disabled="dontUpdate" v-model="data.classId" placeholder="请选择班级（请先选择年级）">
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
              
              <el-col class="btn-style" :span="24" align="center">
                <el-button type="primary" v-if="opt == 'read'" @click="goback">返回</el-button>
                <el-button v-if="opt != 'read'" @click="cancel">取消</el-button>
                <el-button type="primary" v-if="opt != 'read' && opt != 'update'" @click="creatData" :loading="loading">确定</el-button>
                <el-button type="primary" v-if="opt == 'update'" @click="updateData" :loading="loading">修改</el-button>
              </el-col>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
import { get, add, getDeptInfo, getSchoolTypes, getType} from "@/api/base/faculty"
import {getClass, getSchool} from '@/api/student/student'
import {getDeptLevels} from '@/api/base/dept'
import nationalitys from "@/mixin/baseData/nationalitys"

import sex from "@/mixin/baseData/sex";

  import ui from '@/mixin/ui'

export default {
  name: "studentOption",
  mixins: [ ui,sex,nationalitys],
  data() {
    return {
      //选择今天以及以前的日期
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      loading: false,
      dontUpdate:false,
      gradesList: [],
      schoolName:'',
      schoolTypes: [],
      data: {
        userId:"",
        gradeId: '',
        teacherName:"",
        studentSex:'',
        nationality:"",
        birthday:"",
        idCard:"",
        schoolType:"",
        phone: '',
        age: '',
        entryDate: '',
        teachingYears: '',
        mailbox: '',
        qqNumber: '',
        weixin: '',
        schoolName: '',
        rducationStage: '',
        rducationStageType: '',
        grade: '',
        classId: ''
      },
      disabled:false,
      classIds: [],
      isTeacher: false,
      isCounselor: false,
      gradeIds: [],
      checkList: [],
      editDisabled: false,
      rules: {
        teacherName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },{
            min:2,
            max:10,
            message: '请输入2-10个汉字',
        },{
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '请输入汉字',
            trigger: 'blur'
            }
        ],
        studentId: [
          {
            required: true,
            message: "学籍号不能为空",
            trigger: "blur"
          },
          {
            pattern: /^\d+$|^\d+[.]?\d+$/,
            message: '请输入数字'
          }
        ],
        nationality:[
           {
            required: true,
            message: "请输入民族",
            trigger: "blur"
          }
        ],
        age: [
            {
                required: true,
                message: "请输入年龄",
                trigger: "blur"
          }
        ],
        birthday:[
           {
            required: true,
            message: "请选择出生日期",
            trigger: "change"
          }
        ],
        schoolStage:[
          {
            required: true,
            message: "请选择教育阶段",
            trigger: "change"
          }
        ],
        gradeId:[
          {
            required: true,
            message: "请选择所在年级",
            trigger: "change"
          }
        ],
        classId:[
          {
            required: true,
            message: "请选择所在班级",
            trigger: "change"
          }
        ],
        admissionTime:[
          {
            required: true,
            message: "请选择入学时间",
            trigger: "change"
          }
        ],
        userName: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          },{
            min:2,
            max:40,
            message: '请输入2-40个字符',
            },{
            pattern: /^[\u2E80-\u9FFF]+$/,
            message: '请输入汉字',
            trigger: 'blur'
            }
        ],
        mailbox:[
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          {
            min:3,
            max:25,
            message: '请输入3-25个字符',
            },
        ],
        relationship: [
          {
            required: true,
            message: "请选择亲属关系",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号"
          }
        ],
        idCard:[
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { validator: this.validID, trigger: 'blur' }
        ],
        schoolName: [
          {
            required: true,
            message: "学校名称不能为空",
            trigger: "blur"
          }
        ],
        schoolType: [
          {
            required: true,
            message: "学校类别不能为空",
            trigger: "blur"
          }
        ],
        rducationStage: [
          {
            required: true,
            message: "教育阶段不能为空",
            trigger: "blur"
          }
        ],
        rducationStageType: [
            {
            required: true,
            message: "教务类型不能为空",
            trigger: "change"
          }
        ],
        grade: [
          {
            required: true,
            message: "所在年级不能为空",
            trigger: "blur"
          }
        ]
      },
      opt: "",
      dialogStatus: "",
      dialogFormVisible: false,
      textMap: {
        creat: "添加监护人信息",
        update: "修改监护人信息"
      },
      form: {
        familyId: "",
        userName: "",
        userSex: "",
        relationship: "",
        phone: ""
      },
      workerPart: [],
      relationships: [{ key: "0", name: "父亲" }, { key: "1", name: "母亲" }],
      listQuery:{
        current:1,
        size:-1,
        gradeId:''
      },
      stuId:''
    };
  },
  computed: {
    ...mapGetters(["theme","schoolData"])
  },
  
  created(){
      this.getDept()
      this.opt = this.$route.params.opt
      if (this.$route.params.id != '-1') {
        let data = {
            current: '1',
            size: '10',
            name: '',
            mobilePhone: this.$route.params.id,
            roleId: ''
          }
        get(data).then((res) => {
          let parms = res.data.records[0]
          this.data.teacherName = parms.username
          this.data.phone = parms.mobilePhone
          this.data.idCard = parms.idCard
          this.data.studentSex = JSON.stringify(parms.sex)
          this.data.nationality = parms.nationality
          this.data.entryDate = parms.entryDate
          this.data.mailbox = parms.email
          this.data.rducationStageType = parms.roleIds[0]
          this.data.classId = parms.classId
          this.data.userId = parms.userId
          this.data.gradeId = parms.gradeId
          this.grades()
          this.go(parms.idCard.length)
          if (this.$route.params.opt == 'read') {
            // 不可编辑
            this.dontUpdate = true
            this.disabled = true 
          }
        })
        .catch((err) => {
          this.loading = false;
        });
      }
      this.getClassList()
  },
  methods: {
    ...mapActions('schoolInfo', [
        'getSchoolInfo',
    ]),
    async validID(rule,value,callback)
      {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
       //   let reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
       let reg=/^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
        if (reg.test(value)) {
          await this.go(value.length);
          callback()
        } else {
          callback(new Error('身份证号码不正确'))
        }
      },
      
      // 实现自动生成生日，性别，年龄
      go(val) {
        let iden = this.data.idCard;
        let sex = null;
        let birth = null;
        let myDate = new Date();
        let month = myDate.getMonth() + 1;
        let day = myDate.getDate();
        let age = 0;
 
        if(val===18){
          age = myDate.getFullYear() - iden.substring(6, 10) - 1;
          // sex = iden.substring(16,17);
          birth = iden.substring(6,10)+"-"+iden.substring(10,12)+"-"+iden.substring(12,14);
          if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) age++;
 
        }
        if(val===15){
          age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
          // sex = iden.substring(13,14);
          birth = "19"+iden.substring(6,8)+"-"+iden.substring(8,10)+"-"+iden.substring(10,12);
          if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) age++;
        }
        
        // if(sex%2 === 0)
        //   sex = '0';
        // else
        //   sex = '1';
        // this.data.studentSex = sex;
        this.data.age = age;
        this.data.birthday = birth;
        // this.data.birthplace = this.area[iden.substring(0,2)];
      },
      validateForm(){
           this.$refs["dataForm"].validate(valid => {})
      },
      // 获取年级
    getClassList(){
      getSchool(0).then((res) => {
        this.gradesList=res.data
      })
    },
    // 获取班级
    grades() {
      let gid = this.data.gradeId
      if (gid != '') {
        getClass(gid).then(res=>{
          this.classIds=res.data
            let flag = true;
            res.data.forEach((res1,index)=>{
                if (res1.id == this.data.classId){
                    flag = false;
                }
            })
            if (flag){
                this.data.classId = '';
            }
        })
      }
      
      // this.dontUpdate = false
    },
    getDept () {
        getDeptInfo().then((res) => {
            this.data.schoolType = res.data.deptType;
            this.data.schoolName = res.data.deptName;
        })
        getDeptLevels({}).then(res=>{
            this.schoolTypes = res.data
        })
        // 教务类型
        getType().then((res) => {
            this.checkList = res.data
        })
    },
      cancel() {
          this.$confirm('确认取消吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.goback()
          })
      },
    //返回
    goback() {
      this.$refs['dataForm'].resetFields()
      this.$store.dispatch('delView', this.$route)
      this.$router.push("/education/userManer/facultymanage");
      this.resetTemp()
    },
    resetTemp() {
      this.form = {
        familyId: "",
        userName: "",
        userSex: "",
        relationship: "",
        phone: ""
      };
    },
    // 修改教职工信息
    updateData() {
      let that = this
    this.$refs["dataForm"].validate(valid => {
      if (valid && !this.loading) {

        let type = ''
          this.checkList.forEach((res) => {
            if (res.roleId == this.data.rducationStageType) {
              type = res.roleName
              if (res.roleName == '咨询师') {
                  this.isCounselor = true
                  this.isTeacher = false
              }
              else if (res.roleName == '班主任') {
                this.isCounselor = false
                  this.isTeacher = true
              }
              else{
                this.isCounselor = false
                  this.isTeacher = false
              }
            }
          })

        this.loading = true
        let pmars = {
               teacher: this.isTeacher,
                counselor: this.isCounselor,
                userId: this.data.userId,
                loginName: '',
                userCode: '',
                username: this.data.teacherName, // 姓名
                password: '',
                avatar: '',
                mobilePhone: this.data.phone, // 手机号
                email: this.data.mailbox, // 邮箱
                status: '',
                userType: '',
                deptId: '',
                sex: this.data.studentSex,
                birthday: this.data.birthday, // 出生日期
                studentId: '',
                entryDate: this.data.entryDate, // 入职时间
                idCard: this.data.idCard, // 身份证号
                classId: this.data.classId, // 班级
                nationality: this.data.nationality // 民族
            }
      add(pmars).then(res => {
        if (res.code == 0) {
            that.$message.success('修改成功')
            this.loading = false
            that.goback()
          } else{
              let msg = res.message ? res.message : '失败'
              this.loading = false
             // that.$message.error(msg)
          }
      }).catch(error=>{
        this.loading=false
      });
      }
    })
    },
    // 创建教职工信息
    creatData() {
      this.$refs["dataForm"].validate(valid => {
          
      if (valid && !this.loading) {

        let type = ''
        this.checkList.forEach((res) => {
          if (res.roleId == this.data.rducationStageType) {
            type = res.roleName
            if (res.roleName == '咨询师') {
                this.isCounselor = true
                this.isTeacher = false
            }
            else if (res.roleName == '班主任') {
              this.isCounselor = false
                this.isTeacher = true
            }
            else{
              this.isCounselor = false
                this.isTeacher = false
            }
          }
        })
            let pmars = {
              teacher: this.isTeacher,
              counselor: this.isCounselor,
                loginName: '',
                userCode: '',
                userId: this.data.userId,
                username: this.data.teacherName, // 姓名
                password: '',
                avatar: '',
                mobilePhone: this.data.phone, // 手机号
                email: this.data.mailbox, // 邮箱
                status: '',
                userType: '',
                deptId: '',
                sex: this.data.studentSex,
                birthday: this.data.birthday, // 出生日期
                studentId: '',
                entryDate: this.data.entryDate, // 入职时间
                idCard: this.data.idCard, // 身份证号
                classId: this.data.classId, // 班级
                nationality: this.data.nationality // 民族
            }
        this.loading = true
        add(pmars).then(res => {
           if (res.code == 0) {
              this.$message.success('创建成功')
              this.goback()
             this.loading = false
						} else {
              let msg = res.message ? res.message : '失败'
              this.loading = false
              this.$message.error(msg)
            }
          }).catch(error=>{
            this.loading = false
          })
        }
      })
    },
  }
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
  