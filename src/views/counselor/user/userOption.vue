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
                            <div class="label-msg" :style="{borderColor: theme}">来访者基本信息</div>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="姓名：" prop="username">
                                        <el-input :disabled="disabled" v-model.trim="data.username"
                                                  placeholder="请输入姓名"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="身份证号：" prop="idCard">
                                        <el-input :disabled="disabled" v-model.trim="data.idCard"
                                                  placeholder="请输入身份证号"></el-input>
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
                                        <el-select v-model.trim="data.nationality" placeholder="请选择民族"  :disabled="disabled">
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
                                    <el-form-item label="手机号：" prop="mobilePhone">
                                        <el-input
                                                :disabled="disabled"
                                                v-model.trim="data.mobilePhone"
                                                placeholder="请输入手机号"
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
                            >备注 ：手机号为来访者登录账号！
                            </div>

                            <el-col class="btn-style" :span="24" align="center">
                                <el-button type="primary" v-if="opt == 'read'" @click="goback">返回</el-button>
                                <el-button v-if="opt != 'read'" @click="cancel1">取消</el-button>
                                <el-button
                                        type="primary"
                                        v-if="opt == 'update'"
                                        @click="updateData"
                                        :loading="loading"
                                >修改
                                </el-button>
                                <el-button
                                        type="primary"
                                        v-if="opt == 'create'"
                                        @click="creatData"
                                        :loading="loading"
                                >确定
                                </el-button>
                            </el-col>
                        </el-form>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from "vuex";
    import {
        saveUser,
        getUserDetail
    } from "@/api/user/xylUser";
    import {getDeptLevels} from "@/api/base/dept";
    import {get} from "@/api/base/dictDetail";
    import nationalitys from "@/mixin/baseData/nationalitys";
    import {getDeptInfo} from "@/api/base/user";
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
                    mobilePhone: "",
                    sex: undefined,
                    nationality: "",
                    birthday: "",
                    idCard: "",
                    deptId: "",
                    deptName: "",
                },
                sexList: [
                    { label: "男", value: 0 },
                    { label: "女", value: 1 },
                    // { label: "保密", value: 2 },
                ],
                disabled: false,
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
                            max: 40,
                            message: "请输入2-40个字符",
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
                opt: "",
                dialogStatus: "",
                dialogFormVisible: false,
                workerPart: [],
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
                    getUserDetail(this.data.userId).then((res) => {
                        // console.log( res.data, '编辑')
                        this.data.userId = res.data.userId;
                        this.data.username = res.data.username;
                        this.data.sex = res.data.sex;
                        this.data.nationality = res.data.nationality;
                        this.data.birthday = res.data.birthday;
                        this.data.idCard = res.data.idCard;
                        this.data.deptId = res.data.deptId;
                        this.data.deptName = res.data.deptName;
                        this.data.mobilePhone = res.data.mobilePhone;
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
                this.$router.push("/visitor/user");
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
            resetTemp() {
                this.form = {
                    username: "",
                    studentId: "",
                    sex: "",
                    studentRelation: "",
                    mobilePhone: "",
                };
            },

            // 修改学生生信息
            updateData() {
                let that = this;
                this.$refs["dataForm"].validate((valid) => {
                    if (valid && !this.loading) {
                        this.loading = true;
                        delete this.data["gradeId"];
                        saveUser(this.data).then((res) => {
                            if (res.code == 0) {
                                that.$message.success("修改成功");
                                that.goback();
                            } else if (res.code == -4) {
                                that.$message.error("身份证或学籍号已存在！");
                            } else {
                                let msg = res.message ? res.message : "失败";
                                that.$message.error(msg);
                            }

                        });
                        this.loading = false;
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
                        saveUser(this.data).then((res) => {
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
            }
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
