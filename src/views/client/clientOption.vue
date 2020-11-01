<template>
    <div class="calendar-list-container">
        <el-row class="mechanism-msg">
            <el-col :span="24" class="base-table-title-msg">
                <div class="filter-container">
                    <el-card :shadow="shadow" style="padding-top:20px;">
                        <el-form
                                class="my-base-form"
                                :model="form"
                                :rules="rules"
                                ref="form"
                                label-width="200px"
                                style="width: 80%; margin:0 auto;"
                        >
                            <div class="label-msg" :style="{borderColor: theme}">咨询师基本信息</div>
                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="姓名" prop="user.username">
                                        <el-input v-model="form.user.username" :disabled="operate==='view'"
                                                  class="filter-item"
                                                  clearable placeholder="用户名"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="性别" prop="user.sex">
                                        <el-select v-model="form.user.sex" :disabled="operate==='view'"
                                                   class="filter-item" clearable
                                                   placeholder="性别">
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                            <!-- <el-option label="未知" :value="2"></el-option> -->
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="地址" prop="address">
                                        <el-cascader :disabled="operate==='view'" :options="city" clearable filterable
                                                     v-model="citys" clearable placeholder="地址"
                                                     :show-all-levels="false" :props="props"
                                        >
                                        </el-cascader>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="邮箱" prop="user.email">
                                        <el-input v-model="form.user.email" :disabled="operate==='view'"
                                                  class="filter-item" clearable
                                                  placeholder="邮箱"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="移动电话(登录账号)" prop="user.mobilePhone">
                                        <el-input v-model="form.user.mobilePhone" :disabled="operate==='view'"
                                                  class="filter-item"
                                                  clearable placeholder="移动电话(登录账号)"/>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="固定电话" prop="user.telephone">
                                        <el-input v-model="form.user.telephone" :disabled="operate==='view'"
                                                  class="filter-item"
                                                  clearable
                                                  placeholder="固定电话"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="擅长标签" prop="labelList">
                                        <el-select v-model="form.labelList" :disabled="operate==='view'" multiple
                                                   placeholder="请选择咨询师标签"
                                        >
                                            <el-option
                                                    v-for="item in labels"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="认证资质" prop="aptitudeType">
                                        <el-input v-model="form.aptitudeType" :disabled="operate==='view'"
                                                  class="filter-item"
                                                  clearable placeholder="咨询师认证资质"/>
                                    </el-form-item>
                                </el-col>

                            </el-row>

                            <!-- <el-form-item label="咨询师等级" prop="dictId">
                                 <el-select v-model="form.dictId" :disabled="operate==='view'" class="filter-item" clearable
                                            placeholder="咨询师等级" >
                                     <el-option
                                             :disabled="operate==='view'"
                                             v-for="item in dictValueList"
                                             :key="item.id"
                                             :label="item.label"
                                             :value="item.id">
                                     </el-option>
                                 </el-select>
                             </el-form-item>-->
                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="针对人群" prop="wu">
                                        <el-select v-model="peopleTypes" :disabled="operate==='view'" multiple
                                                   placeholder="针对人群"
                                        >
                                            <el-option
                                                    v-for="item in peopleTypeList"
                                                    :key="item.id"
                                                    :label="item.label"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <!--<el-form-item label="认证资质" prop="wu">
                                        <el-select v-model="aptitudeTypes" :disabled="operate==='view'" multiple
                                                   placeholder="请选择咨询师标签"
                                                   >
                                            <el-option
                                                    v-for="item in aptitudeTypeList"
                                                    :key="item.id"
                                                    :label="item.label"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>-->
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="咨询方式" prop="wu">
                                        <el-select v-model="consultTypes" :disabled="operate==='view'" multiple
                                                   placeholder="请选择咨询师支持的咨询方式"
                                        >
                                            <el-option
                                                    v-for="item in consultTypeList"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="个人简介" prop="synopsis">
                                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
                                                  v-model="form.synopsis"
                                                  class="filter-item" clearable placeholder="个人简介"
                                                  :disabled="operate==='view'"
                                        />
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">


                                    <el-form-item label="咨询师寄语" prop="sendWord">
                                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
                                                  v-model="form.sendWord"
                                                  :disabled="operate==='view'" class="filter-item" clearable
                                                  placeholder="咨询师寄语"
                                        />
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="擅长领域分类" prop="">
                                        <el-select v-model="specializeTerritorys" :disabled="operate==='view'" multiple
                                                   placeholder="请选择咨询师的擅长领域"
                                        >
                                            <el-option
                                                    v-for="item in specializeTerritoryList"
                                                    :key="item.id"
                                                    :label="item.label"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="擅长领域内容" prop="specializeTerritory">
                                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
                                                  v-model="form.specializeTerritoryText"
                                                  :disabled="operate==='view'" class="filter-item" clearable
                                                  placeholder="擅长领域内容"
                                        />
                                    </el-form-item>
                                </el-col>

                            </el-row>

                            <el-row>

                                <el-col :span="12">
                                    <el-form-item label="用户头像" prop="user.avatar">
                                        <el-upload v-show="operate!='view'"
                                                   :before-upload="beforeUpload"
                                                   class="upload-demo"
                                                   ref="upload"
                                                   action=""
                                                   :with-credentials="true"
                                                   :show-file-list="false"
                                                   :multiple="false"
                                                   :limit="1"
                                                   :http-request="uploadImage"
                                                   :list-type="'png/jpg'">
                                            <el-button size="small" type="primary">点击上传</el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                        <el-image v-show="form.user.avatar" :src="form.user.avatar"
                                                  style="width: 100px;height: 100px">
                                            <div slot="placeholder" class="image-slot">
                                                加载中<span class="dot">...</span>
                                            </div>
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"
                                                   style="width: 100px;height: 100px"></i>
                                            </div>
                                        </el-image>
                                    </el-form-item>
                                </el-col>


                            </el-row>
                        </el-form>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <el-dialog :close-on-click-modal="false" :append-to-body='true' width="560px" :title="textMap[dialogStatus]"
                   :visible.sync="dialogFormVisible">
            <el-form
                    :model="form1"
                    :rules="rules1"
                    ref="formData"
                    label-width="100px"
                    style="width: 420px; margin-left:50px;"
            >
                <el-form-item label="起止时间" prop="date">
                    <el-date-picker
                            v-model="form1.date"
                            value-format="yyyy-MM-dd"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            :picker-options="pickerOptionsEnd"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="机构名称" prop="deptName">
                    <el-input v-model.trim="form1.deptName" class="filter-item w320" placeholder="请输入机构名称"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitExperience">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from "vuex";
    import ui from '@/mixin/ui'

    export default {
        computed: {
            ...mapGetters(["theme", "counselorData"])
        },
        name: "counselorOption",
        mixins: [ui],
        data() {

            return {
                dialogStatus: "",
                dialogFormVisible: false,
                loading: false,
                operate: '',
                textMap: {
                    create: "添加客户信息",
                    update: "修改客户信息"
                },
                props: {
                    value: 'id',
                    label: 'cname'
                },
                form: {
                    id: '',
                    dictId: '',
                    userid: '',
                    synopsis: '',
                    years: '',
                    user: {
                        avatar: '',
                        password: '',
                        username: ''
                    },
                    labelList: [],
                    counselorExperiences: [],
                    wu: [],
                    aptitudeType: ''
                },
                form1: {
                    id: '',
                    startdate: undefined,
                    enddate: undefined,
                    date: [],
                    deptName: '',
                    counselorId: ''
                },
                rules: {
                    user: {
                        username: [
                            {required: true, message: '请输入用户姓名', trigger: 'blur'},
                            {min: 2, max: 20, message: '长度在 2 到 20 个英文字符', trigger: 'blur'}
                        ],
                        sex: [
                            {required: true, message: '请选择性别', trigger: 'change'}
                        ],
                        email: [
                            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                        ],
                        mobilePhone: [
                            {required: true, message: '请输入手机号', trigger: 'blur'},
                            {
                                pattern: /^1[3456789]\d{9}$/,
                                message: "请输入正确的手机号"
                            }
                        ]
                    },
                    dictId: [
                        {required: true, message: '请选择咨询师等级', trigger: 'change'}
                    ],
                    labelList: [
                        {required: true, message: '请选择咨询师标签', trigger: 'change'}
                    ],
                    synopsis: [
                        {required: true, message: '请输入个人简介', trigger: 'blur'},
                        {min: 2, max: 255, message: '长度在 2 到 255 个字符', trigger: 'blur'}
                    ]
                },
                titleMap: {
                    'create': '创建',
                    'update': '编辑',
                    'view': '查看'
                },
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                }
            }
        },
        created() {
            if (this.$route.params.id && this.$route.params.id != '-1') {
                this.form.id = this.$route.params.id;
                this.handleInitData(this.form.id);
            }
            this.operate = this.$route.params.opt

            this.getAllCity();
        },
        methods: {
            //选择今天以及以前的日期
            pickerOptions0: {
                /*disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
                }*/
            },
            //取消
            cancel() {
                this.$confirm('确认取消吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.goback()
                })
            },

            beforeUpload(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'png'
                // const isLt2M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 jpg、png格式!',
                        type: 'warning'
                    });
                }
                return extension || extension2
            },
            //返回咨询师列表
            goback() {
                this.peopleTypes = []
                this.aptitudeTypes = []
                this.consultTypes = []
                this.specializeTerritorys = []
                this.form = {
                    id: '',
                    dictId: '',
                    userid: '',
                    synopsis: '',
                    years: '',
                    user: {
                        avatar: '',
                        password: '',
                        username: ''
                    },
                    labelList: [],
                    counselorExperiences: [],
                    wu: [],
                    aptitudeType: ''
                }
                this.$router.push('/counselor/counselor/counselor')
            },
            //添加培训信息
            addCounselorExperience() {
                this.dialogFormVisible = true;
                this.dialogStatus = "create";
                this.form1 = {
                    id: '',
                    startdate: undefined,
                    enddate: undefined,
                    date: [],
                    deptName: '',
                    counselorId: ''
                }
            },
            getAllCity() {
                getAllCity().then(res => {
                    this.city = res.data
                })
            },
            //修改培训信息
            handleUpdate(row) {
                this.form1 = JSON.parse(JSON.stringify(row))
                this.$set(this.form1,"date",[this.form1.startdate,this.form1.enddate])
                this.dialogFormVisible = true;
                this.dialogStatus = "update";
            },
            //删除培训信息
            handleDelete(index) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.form.counselorExperiences.splice(index,1)
                    this.$message.success("删除成功")
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消删除',
                        duration: 2500
                    })
                })

            },
            handleInitData(id) {
                getone(id).then(res => {
                    let data = res.data;
                    let labelList = []
                    data.labelList.forEach(data => {
                        labelList.push(data.id)
                    })
                    data.labelList = labelList
                    this.$nextTick(() => {
                        this.form = data
                        if (data.city){
                            let citys = []
                            citys.push(data.city.id)
                            citys.push(data.city.children[0].id)
                            citys.push(data.city.children[0].children[0].id)
                            this.citys = citys
                        }

                        this.peopleTypes = this.form.peopleType ? this.form.peopleType.split("#") : [];
                        this.specializeTerritorys = this.form.specializeTerritory ? this.form.specializeTerritory.split("#") : [];
                        /*this.aptitudeTypes = this.form.aptitudeType ? this.form.aptitudeType.split("#") : [];*/
                        this.consultTypes = this.form.consultWay ? this.form.consultWay.split("#") : [];
                    })
                })

            },
            doSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.operate === 'create') {
                            this.save(this.form, '添加')
                        } else {
                            this.save(this.form, '修改')
                        }
                    } else {
                        return false
                    }
                })
            },
            save(data, message) {
                delete data['dictValue']
                delete data['aptitudeTypeList']
                delete data['peopleTypeList']
                delete data['goodProbability']
                delete data['sandDeptName']
                delete data['specializeTerritoryList']
                delete data['wu']
                delete data['city']
                delete data['openDeptName']
                data['address'] = this.citys[2]
                data.peopleType = this.peopleTypes.join("#")
                /*data.aptitudeType = this.aptitudeTypes.join("#")*/
                data.consultWay = this.consultTypes.join("#")
                data.specializeTerritory = this.specializeTerritorys.join("#")
                save(data).then(res => {
                    if (res.data === true) {
                        this.$notify({
                            title: message + '成功',
                            type: 'success',
                            duration: 2500
                        })
                        this.goback();
                    } else {
                        this.$notify({
                            title: res.message,
                            type: 'error',
                            duration: 2500
                        })
                    }
                })
            },
            uploadImage(file) {
                let formData = new FormData() // formdata格式
                formData.append('file', file.file)
                uploadFile(formData).then(res => {
                    this.form.user.avatar = res.data.url
                    this.$refs.upload.clearFiles()
                })
            },
            resetForm() {
                this.dialogFormVisible = false;
            },
            submitExperience() {
                this.$refs['formData'].validate((valid) => {
                    if (valid) {
                        let data = this.form1;
                        data.startdate = data.date[0]
                        data.enddate = data.date[1]
                        delete data['date'];
                        if (this.dialogStatus == "create") {
                            this.form.counselorExperiences.push(data)
                        } else {
                            this.form.counselorExperiences.forEach((res, index) => {
                                if (res.id == data.id) {
                                    // this.form.counselorExperiences[index]=JSON.parse(JSON.stringify(data))
                                    this.form.counselorExperiences.splice(index, 1, data);
                                }
                            })
                        }
                        this.$message.success(this.dialogStatus == "create" ? "添加成功" : "修改成功");
                        this.dialogFormVisible = false;
                    }
                })

            }
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
