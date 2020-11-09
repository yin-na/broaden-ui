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
                            <div class="label-msg" :style="{borderColor: theme}">客户基本信息</div>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="姓名" prop="username">
                                        <el-input
                                                v-model="form.username"
                                                :disabled="operate==='view'"
                                                class="filter-item"
                                                clearable
                                                placeholder="用户名"
                                        />
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="性别" prop="sex">
                                        <el-select
                                                v-model="form.sex"
                                                :disabled="operate==='view'"
                                                class="filter-item"
                                                clearable
                                                placeholder="性别"
                                        >
                                            <el-option label="男" :value="0"></el-option>
                                            <el-option label="女" :value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>


                                <el-col :span="12">
                                    <el-form-item label="移动电话" prop="mobilePhone">
                                        <el-input
                                                v-model="form.mobilePhone"
                                                :disabled="operate==='view'"
                                                class="filter-item"
                                                clearable
                                                placeholder="移动电话"
                                        />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input
                                                v-model="form.email"
                                                :disabled="operate==='view'"
                                                class="filter-item"
                                                clearable
                                                placeholder="邮箱"
                                        />
                                    </el-form-item>
                                </el-col>

                            </el-row>


                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="登录名" prop="loginName">
                                        <el-input
                                                v-model="form.loginName"
                                                :disabled="operate==='view'"
                                                class="filter-item"
                                                clearable
                                                placeholder="登录名"
                                        />
                                    </el-form-item>
                                </el-col>

                                <el-col :span="12">
                                    <el-form-item label="注册时间" prop="aptitudeType">
                                        <el-input
                                                v-model="form.crtTime"
                                                :disabled="true"
                                                maxlength="150"
                                                class="filter-item"
                                                clearable
                                                placeholder="注册时间"
                                        />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="是否是会员" prop="vip">
                                        <el-select
                                                v-model="form.vip"
                                                :disabled="operate==='view'"
                                                class="filter-item"
                                                clearable
                                                placeholder="是否是会员"
                                        >
                                            <el-option label="会员" :value="'0'"></el-option>
                                            <el-option label="非会员" :value="'1'"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="会员结束时间" prop="endTime">
                                        <el-date-picker
                                                :disabled="operate==='view'||form.vip=='1'"
                                                :picker-options="pickerOptions0"
                                                format="yyyy年MM月dd日"
                                                value-format="yyyy-MM-dd"
                                                v-model="form.endTime"
                                                type="date"
                                                placeholder="会员结束时间"
                                        ></el-date-picker>
                                    </el-form-item>
                                </el-col>

                            </el-row>


                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="用户头像" prop="avatar">
                                        <el-upload
                                                v-show="operate!='view'"
                                                :before-upload="beforeUpload"
                                                class="upload-demo"
                                                ref="upload"
                                                action
                                                :with-credentials="true"
                                                :show-file-list="false"
                                                :multiple="false"
                                                :limit="1"
                                                :http-request="uploadImage"
                                                :list-type="'png/jpg'"
                                        >
                                            <el-button size="small" type="primary">点击上传</el-button>
                                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                        </el-upload>
                                        <el-image
                                                v-show="form.avatar"
                                                :src="form.avatar"
                                                style="width: 100px;height: 100px"
                                        >
                                            <div slot="placeholder" class="image-slot">
                                                加载中
                                                <span class="dot">...</span>
                                            </div>
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"
                                                   style="width: 100px;height: 100px"></i>
                                            </div>
                                        </el-image>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-col :span="24">
                                <div class="label-msg fl" :style="{borderColor: theme}">采集历史记录</div>
                                <div class="fr">
                                </div>
                            </el-col>

                            <el-col :span="24" class="base-table-msg">
                                <el-table
                                        :class="noBorder ? 'no-border' : ''"
                                        :border="!noBorder"
                                        stripe
                                        :data="gatherRecordList"
                                        :header-cell-style="{
                        'background-color': '#f6f7f9',
                        'color': '#343d4a',
                        'font-size':'14px',
                    }"
                                        style="width: 100%;"
                                >
                                    <el-table-column label="采集时间" align="center" prop="crtTime"/>
                                    <el-table-column label="采集条数" align="center" prop="count"/>
                                    <el-table-column label="采集类型" align="center">
                                        <template slot-scope="scope">
                                            <span v-for="(item,i) in gatherTypeList">
                                                <span v-if="item.value==scope.row.gatherType">
                                                    {{item.name}}
                                                </span>
                                            </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!--分页组件-->
                                <el-pagination :total="param.total" :current-page="param.current"
                                               :page-size="param.size"
                                               style="margin-top: 8px;"
                                               layout="total, prev, pager, next"
                                               @current-change="pageChange"/>
                            </el-col>


                            <el-col :span="24">
                                <div class="label-msg fl" :style="{borderColor: theme}">订单历史记录</div>
                                <div class="fr">
                                </div>
                            </el-col>

                            <el-col :span="24" class="base-table-msg">
                                <el-table
                                        :class="noBorder ? 'no-border' : ''"
                                        :border="!noBorder"
                                        stripe
                                        :data="userOrderList"
                                        :header-cell-style="{
                        'background-color': '#f6f7f9',
                        'color': '#343d4a',
                        'font-size':'14px',
                    }"
                                        style="width: 100%;"
                                >
                                    <el-table-column label="购买时间" align="center" prop="crtTime"/>
                                    <el-table-column label="购买金额" align="center" prop="price"/>
                                    <el-table-column label="购买时长" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.tine}}个月
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="付款方式" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.type==0?'支付宝':'微信'}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!--分页组件-->
                                <el-pagination :total="param1.total" :current-page="param1.current"
                                               :page-size="param1.size"
                                               style="margin-top: 8px;"
                                               layout="total, prev, pager, next"
                                               @current-change="pageChange1"/>
                            </el-col>


                            <el-col :span="24">
                                <div class="label-msg fl" :style="{borderColor: theme}">跟进历史记录
                                <div class="fr">
                                    <el-button v-if="operate!='view'" type="text" class="fs16" @click="addFollow">跟进</el-button>
                                </div></div>
                            </el-col>

                            <el-col :span="24" class="base-table-msg">
                                <el-table
                                        :class="noBorder ? 'no-border' : ''"
                                        :border="!noBorder"
                                        stripe
                                        :data="followList"
                                        :header-cell-style="{
                        'background-color': '#f6f7f9',
                        'color': '#343d4a',
                        'font-size':'14px',
                    }"
                                        style="width: 100%;"
                                >
                                    <el-table-column label="销售" align="center" prop="crtUserName"/>
                                    <el-table-column label="跟进方法" align="center" prop="type"/>
                                    <el-table-column label="跟进结果" align="center" prop="result"/>
                                    <el-table-column label="跟进过程" align="center" prop="remark"/>
                                    <el-table-column
                                            v-if="operate != 'view'"
                                            align="center"
                                            label="操作"
                                            class-name="small-padding fixed-width"
                                    >
                                        <template slot-scope="scope">
                                            <el-button slot="reference" type="text" size="mini" @click="updateFollow(scope.row.id,'view')">
                                                <i class="el-icon-view" title="查看"/>
                                            </el-button>
                                            <el-button slot="reference" v-permission="[]" type="text" size="mini" @click="updateFollow(scope.row.id,'update')">
                                                <i class="el-icon-edit" style="color:green"  title="编辑"/>
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <!--分页组件-->
                                <el-pagination :total="param2.total" :current-page="param2.current"
                                               :page-size="param2.size"
                                               style="margin-top: 8px;"
                                               layout="total, prev, pager, next"
                                               @current-change="pageChange2"/>
                            </el-col>

                            <el-col class="btn-style" :span="24" align="center">
                                <el-button type="primary" v-if="operate == 'view'" @click="goback">返回</el-button>
                                <el-button v-if="operate != 'view'" @click="cancel">取消</el-button>
                                <el-button
                                        type="primary"
                                        v-if="operate != 'view'"
                                        @click="doSubmit"
                                        :loading="loading"
                                >确定
                                </el-button>
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
                :title="textMap[operate1]"
                :visible.sync="dialogFormVisible"
        >
            <el-form
                    :model="form1"
                    :rules="rules1"
                    ref="formData"
                    label-width="100px"
                    style="width: 420px; margin-left:50px;"
            >
                <el-form-item label="跟进方法" prop="type">
                    <el-input :disabled="operate1=='view'" v-model.trim="form1.type" class="filter-item w320" placeholder="请输入跟进方法"></el-input>
                </el-form-item>
                <el-form-item label="跟进过程" prop="remark">
                    <el-input :disabled="operate1=='view'" v-model.trim="form1.remark" class="filter-item w320" placeholder="请输入跟进过程"></el-input>
                </el-form-item>
                <el-form-item label="跟进结果" prop="remark">
                    <el-input :disabled="operate1=='view'" v-model.trim="form1.result" class="filter-item w320" placeholder="请输入跟进结果"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel1">取 消</el-button>
                <el-button type="primary" @click="saveFollow">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getClientById, saveClient} from '@/api/ope/client'
    import {uploadFile} from "@/api/base/common";
    import {mapGetters, mapActions} from "vuex";
    import ui from "@/mixin/ui";
    import initData from '@/mixins/initData'
    import {gatherRecordPage, getGatherType,userOrderPage,saveFollow,followPage,getFollowById} from '@/api/ope/gatherRecord'

    export default {
        computed: {
            ...mapGetters(["theme", "counselorData"]),
        },
        name: "counselorOption",
        mixins: [ui, initData],
        data() {
            return {
                //选择今天以及以前的日期
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
                    },
                },
                dialogStatus: "",
                dialogFormVisible: false,
                textMap: {
                    create: "添加跟进记录",
                    update: "修改跟进记录",
                    view: "查看跟进记录",
                },
                loading: false,
                operate: "",
                operate1: "",
                gatherRecordList: [],
                userOrderList: [],
                followList: [],
                gatherTypeList: [],
                props: {
                    value: "id",
                    label: "cname",
                },
                param: {
                    current: 1,
                    size: 5,
                    total: 0
                },
                param1: {
                    current: 1,
                    size: 5,
                    total: 0
                },
                param2: {
                    current: 1,
                    size: 5,
                    total: 0
                },
                form: {
                    userId: "",
                    loginName: "",
                    username: "",
                    avatar: "",
                    email: "",
                    sex: "",
                    vip: "",
                    endTime: "",
                    crtTime: "",
                },
                form1: {
                    id: "",
                    userId: "",
                    type: "",
                    result: "",
                    remark: "",
                },
                rules: {
                    username: [
                        {required: true, message: "请输入用户姓名", trigger: "blur"},
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
                    sex: [{required: true, message: "请选择性别", trigger: "change"}],
                    email: [
                        {required: true, message: "请输入邮箱地址", trigger: "blur"},
                        {type: "email", message: "请输入正确的邮箱地址", trigger: "blur"},
                        {
                            min: 3,
                            max: 25,
                            message: '请输入3-25个字符',
                        },
                    ],
                    mobilePhone: [
                        {required: true, message: "请输入手机号", trigger: "blur"},
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: "请输入正确的手机号",
                        },
                    ],
                },
                rules1:{
                    type: [
                        {required: true, message: "请输入跟进方法", trigger: "blur"},
                    ],
                    result: [
                        {required: true, message: "请输入跟进结果", trigger: "blur"},
                    ],
                    remark: [
                        {required: true, message: "请输入跟进过程", trigger: "blur"},
                    ],
                },
                titleMap: {
                    create: "创建",
                    update: "编辑",
                    view: "查看",
                },
                pickerOptionsEnd: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
            };
        },
        created() {
            if (this.$route.params.id && this.$route.params.id != "-1") {
                this.form.id = this.$route.params.id;
                this.handleInitData(this.form.id);
            }
            this.operate = this.$route.params.opt;
        },
        methods: {
            //取消
            cancel() {
                this.$confirm("确认取消吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.goback();
                });
            },
            //取消根据记录
            cancel1() {
                this.$confirm("确认取消吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(() => {
                    this.goback1();
                });
            },
            pageChange(e){
                this.param.current = e
                this.gatherRecordPage();
            },
            pageChange1(e){
                this.param1.current = e
                this.userOrderPage();
                this.followPage();
            },
            pageChange2(e){
                this.param2.current = e
                this.followPage();
            },
            //返回客户列表
            goback() {
                this.form = {
                    userId: "",
                    loginName: "",
                    username: "",
                    avatar: "",
                    email: "",
                    sex: "",
                    vip: "",
                    endTime: "",
                    crtTime: "",
                };
                this.$router.push("/client/client");
            },
            //返回客户详情
            goback1() {
                this.form1 = {
                    id: "",
                    userId: "",
                    type: "",
                    result: "",
                    remark: "",
                };
                this.dialogFormVisible = false
                this.followPage();
            },
            handleInitData(id) {
                getGatherType().then(res => {
                    this.gatherTypeList = res.data
                })
                getClientById(id).then((res) => {
                    let data = res.data;
                    this.form = data
                    this.param.userId = this.form.userId;
                    this.param1.userId = this.form.userId;
                    this.param2.userId = this.form.userId;
                    this.gatherRecordPage();
                    this.userOrderPage();
                    this.followPage();
                });
            },
            gatherRecordPage(){
                gatherRecordPage(this.param).then(res => {
                    this.gatherRecordList = res.data.records
                    this.param.current = res.data.current
                    this.param.total = res.data.total
                })
            },
            userOrderPage(){
                userOrderPage(this.param1).then(res => {
                    this.userOrderList = res.data.records
                    this.param1.current = res.data.current
                    this.param1.total = res.data.total
                })
            },
            followPage(){
                followPage(this.param2).then(res => {
                    this.followList = res.data.records
                    this.param2.current = res.data.current
                    this.param2.total = res.data.total
                })
            },
            doSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.operate === "create") {
                            this.save(this.form, "添加");
                        } else {
                            this.save(this.form, "修改");
                        }
                    } else {
                        return false;
                    }
                });
            },
            save(data, message) {
                if (data.vip == '1') {
                    data.endTime = ''
                }
                saveClient(data).then((res) => {
                    if (res.data === true) {
                        this.$notify({
                            title: message + "成功",
                            type: "success",
                            duration: 2500,
                        });
                        this.goback();
                    }
                });
            },
            beforeUpload(file) {
                console.log(file);
                var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
                const extension = testmsg === "jpg";
                const extension2 = testmsg === "png";
                // const isLt2M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {
                    this.$message({
                        message: "上传文件只能是 jpg、png格式!",
                        type: "warning",
                    });
                }
                // if(!isLt2M) {
                //     this.$message({
                //         message: '上传文件大小不能超过 10MB!',
                //         type: 'warning'
                //     });
                // }
                // return (extension || extension2) && isLt2M
                return extension || extension2;
            },
            uploadImage(file) {
                let formData = new FormData(); // formdata格式
                formData.append("file", file.file);
                uploadFile(formData).then((res) => {
                    this.form.avatar = res.data.url;
                    this.$refs.upload.clearFiles();
                });
            },
            addFollow(){
                this.dialogFormVisible = true;
                this.operate1 = 'create';
            },
            //查看或修改记录
            updateFollow(id,s){
                this.dialogFormVisible = true;
                this.operate1 = s;
                getFollowById(id).then(res=>{
                    this.form1 = res.data
                })
            },
            //提交跟进记录
            saveFollow(){
                this.dialogFormVisible = false;
                this.form1.userId = this.form.userId
                saveFollow(this.form1).then(res=>{
                    if (res.code ===0){
                        this.$notify({
                            title: this.textMap[this.operate1] + "成功",
                            type: "success",
                            duration: 2500,
                        });
                        this.goback1();
                    }
                })
            },
            resetForm() {
                this.dialogFormVisible = false;
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
    .fr {
        float: right!important
    }
</style>
