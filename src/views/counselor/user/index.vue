<template>
    <div class="app-container">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="box-card" style="border: none;box-shadow: none">
                    <div class="contain-tit">
                        <span>来访管理</span>
                        <div class="fr">
                            <!-- <el-button size="mini" type="success" icon="el-icon-upload2" @click="openImport">导入</el-button> -->
                            <!-- <guide-into :type='"3"' @success='successBtn'></guide-into> -->
                            <guide-into :type='"学生信息导入模板"' :templateUrl='"student/downloadTemplate"'
                                        :importUrl='"student/uploadAnswer"' @success='successBtn'></guide-into>
                            <!-- <el-button size="mini" type="success" icon="el-icon-download" @click="handleCreate">导出</el-button> -->
                            <el-button size="mini" type="success" icon="el-icon-plus" @click="handleCreate">新增
                            </el-button>
                            <el-button size="mini" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除
                            </el-button>
                        </div>
                    </div>
                    <div class="head-container">
                        <el-input v-model="params.loginName" placeholder="学籍号"
                                  style="width: 150px;margin-right:10px"></el-input>
                        <el-input v-model="params.name" placeholder="姓名"
                                  style="width: 150px;margin-right:10px"></el-input>
                        <el-select @change="grades" placeholder="请选择年级" style="width: 150px;margin-right:10px"
                                   v-model="gradeId">
                            <el-option
                                    v-for="item in gradesList"
                                    :key="item.id"
                                    :label="item.gradeStage"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                        <el-select placeholder="请选择班级（请先选择年级）" style="width: 200px;margin-right:10px"
                                   v-model="params.classId">
                            <el-option
                                    v-for="item in classList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>

                        <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
                        <el-button size="mini" type="button" icon="el-icon-refresh" @click="handleReset">重置</el-button>
                    </div>
                    <!--表格渲染-->
                    <el-table
                            v-loading="loading"
                            ref="scaleTable"
                            :data="studentList"
                            size="mini"
                            :height="tableHeight"
                            :header-cell-style="{fontSize:'14px',height:'35px'}"
                            :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
                            highlight-current-row
                            style="width: 100%;"
                            border
                    >
                        <el-table-column type="selection" align="center" v-if="studentList.length!='0'"></el-table-column>
                        <el-table-column align="center" type="index" width="80" label="序号"></el-table-column>
                        <el-table-column align="center" prop="loginName" label="登录名"/>
                        <el-table-column align="center" prop="username" label="姓名"/>
                        <el-table-column align="center" prop="sex" label="性别">
                            <template slot-scope="scope">
                                <span v-show="scope.row.sex==0">男</span>
                                <span v-show="scope.row.sex==1">女</span>
                                <span v-show="scope.row.sex==2">未知</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="birthday" label="出生日期"/>
                        <el-table-column label="操作" width="130px" align="center">
                            <template slot-scope="scope">
                                <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row)">
                                    <i class="el-icon-view" title="查看"/>
                                </el-button>
                                <el-button
                                        slot="reference"
                                        type="text"
                                        size="mini"
                                        @click="handleUpdate(scope.row)"
                                >
                                    <i class="el-icon-edit" style="color:green" title="编辑"/>
                                </el-button>
                                <el-button
                                        slot="reference"
                                        type="text"
                                        size="mini"
                                        @click="handleDelete(scope.row.userId)"
                                >
                                    <i class="el-icon-delete" style="color:#ff0000" title="删除"/>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--分页组件-->
                    <el-pagination
                            :total="total"
                            :current-page="page"
                            :page-size="size"
                            style="margin-top: 8px;"
                            layout="total, prev, pager, next, sizes"
                            @size-change="sizeChange"
                            @current-change="pageChange"
                    />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import checkPermission from "@/utils/permission";
    import initData from "@/mixins/initData";
    import {getUserByXyl, del} from "@/api/user/xylUser";
    import GuideInto from '@/components/guideInto/index'

    export default {
        mixins: [initData],
        data() {
            return {
                data: [],
                gradeId: '',
                params: {
                    classId: '',
                    name: '',
                    loginName: '',
                    gradeCode: '',
                },
                // dontUpdate: true,
                loading: false,
                delLoading: false,
                sup_this: this,
                operate: undefined,
                importForm: undefined,
                id: "",
                page: 1,
                size: 10,
                total: 0,
                userid: "",
                gradesList: [],
                studentList: [],
                labelList: [],
                classList: [],
                tableHeight: document.documentElement.clientHeight * 0.6,
            };
        },
        components: {
            GuideInto
        },
        created() {
            this.beforeInit();
        },
        filters: {
            htmlfilter: function (val) {
                if (val != null) {
                    return val.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
                }
            },
        },
        methods: {
            checkPermission,
            grades() {
                let gid = this.gradeId
                this.params.gradeCode = this.gradesList.filter(a => (a.id == gid))[0].gradeCode
                getClass(gid).then(res => {
                    this.classList = res.data
                    this.params.classId = ''
                })
                // this.dontUpdate = false
            },
            beforeInit() {
                this.params.current = this.page;
                this.params.size = this.size;
                getUserByXyl(this.params)
                    .then((res) => {
                        this.total = res.data.total;
                        this.studentList = res.data.records;
                    })
                    .catch((err) => {
                        this.loading = false;
                    });
            },
            // 重置
            handleReset() {
                this.params.classId = ''
                this.gradeId = ''
                this.params.loginName = ''
                this.params.name = ''
                this.params.gradeCode = ''
                this.classList = []
                this.page = 1
                getStudentList(this.params)
                    .then((res) => {
                        this.total = res.data.total;
                        this.studentList = res.data.records;
                    })
                    .catch((err) => {
                        this.loading = false;
                    });
                this.handleQuery()
                // this.dontUpdate = true  // 班级下拉框不可选择
            },
            // 搜索
            handleQuery() {
                this.page = 1
                this.beforeInit();
            },
            // 新增
            handleCreate() {
                this.$router.push("/visitor/userOption/" + -1 + '/create');
            },
            handleView(row) {
                this.$router.push("/visitor/userOption/" + row.userId + '/read');
            },
            handleUpdate(row) {
                this.$router.push("/visitor/userOption/" + row.userId + '/update');
            },
            handleDelete(id) {
                this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        let ids = []
                        ids.push(id)
                        del(ids)
                            .then((res) => {
                                this.handleQuery();
                                if (res.data === true) {
                                    this.$notify({
                                        title: "删除成功",
                                        type: "success",
                                        duration: 2500,
                                    });
                                } else {
                                    this.$notify({
                                        title: "删除失败",
                                        type: "error",
                                        duration: 2500,
                                    });
                                }
                            })
                    })
                    .catch(() => {
                        this.$notify({
                            type: "info",
                            message: "已取消删除",
                            duration: 2500,
                        });
                    });
            },
            getClassList() {
                getSchool().then((res) => {
                    this.gradesList = res.data
                })
            },
            viewRecord(id) {
                this.userid = id;
                this.$nextTick(() => {
                    this.$refs.consultRecord.dialog = true;
                    this.$refs.consultRecord.handleQuery();
                });
            },
            //lss  2020/01/08  导入成功后重置刷新
            successBtn(val) {
                if (val) {
                    this.beforeInit()
                }
            },
            batchDelete() {
                let list = this.$refs.scaleTable.selection;
                if (list.length > 0) {
                    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                        .then(() => {
                            let list = this.$refs.scaleTable.selection;
                            let ids = [];
                            list.forEach((res) => {
                                ids.push(res.userId);
                            });
                            del(ids)
                                .then((res) => {
                                    this.handleQuery();
                                    if (res.data === true) {
                                        this.$notify({
                                            title: "删除成功",
                                            type: "success",
                                            duration: 2500,
                                        });
                                    } else {
                                        this.$notify({
                                            title: "删除失败",
                                            type: "error",
                                            duration: 2500,
                                        });
                                    }
                                })
                        })
                        .catch(() => {
                            this.$notify({
                                type: "info",
                                message: "已取消删除",
                                duration: 2500,
                            });
                        });
                } else {
                    this.$notify({
                        type: "info",
                        message: "您未选中任何数据",
                        duration: 2500,
                    });
                }

            },
        },
    };
</script>

<style scoped>
    .contain-tit {
        line-height: 59px;
        height: 59px;
        color: #333;
        font-size: 18px;
        border-bottom: 2px solid #d5e1ff;
        font-weight: bold;
    }

    .textcontent {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
