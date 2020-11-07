<template>
    <div class="app-container">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="box-card" style="box-shadow: none;border: none">
                    <div class="contain-tit">
                        <span>客户检索</span>
                    </div>
                    <div class="head-container">
                        <el-select v-model="params.sex" class="filter-item" clearable placeholder="性别"
                                   style="width: 150px;" @keyup.enter.native="handleQuery">
                            <el-option label="女" :value="0"></el-option>
                            <el-option label="男" :value="1"></el-option>
                        </el-select>
                        <el-input v-model="params.username" class="filter-item" style="width: 150px;margin-left:10px" clearable
                                  placeholder="用户名" @keyup.enter.native="handleQuery"/>
                        <el-button style="margin-left:10px" size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
                        <el-button v-permission="[]" size="mini"
                                   type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
                        <el-button v-permission="[]" size="mini"
                                   type="danger" icon="el-icon-delete" @click="batchDelete">删除</el-button>
                    </div>
                    <!--表格渲染-->
                    <el-table v-loading="loading" ref="scaleTable" :data="data" size="mini" :height="tableHeight"
                              :header-cell-style="{fontSize:'14px',height:'35px'}"
                              :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
                              highlight-current-row style="width: 100%;" border>
                        <el-table-column type="selection" align="center" v-if="data.length!='0'"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" prop="username"
                                         label="用户名" width="100px"/>
                        <el-table-column show-overflow-tooltip align="center" prop="sex" label="性别" width="90px">
                            <template slot-scope="scope">
                                <div v-if="scope.row.sex=='0'">
                                    女
                                </div>
                                <div v-if="scope.row.sex=='1'">
                                    男
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip align="center" prop="mobilePhone"
                                         label="移动电话"/>
                        <el-table-column show-overflow-tooltip align="center" prop="loginName"
                                         label="登录账号"/>
                        <el-table-column show-overflow-tooltip align="center" prop="email"
                                         label="邮箱"/>
                        <el-table-column show-overflow-tooltip align="center" prop="crtTime"
                                         label="注册时间"/>
                        <el-table-column show-overflow-tooltip align="center" prop="vip"
                                         label="状态">
                            <template slot-scope="scope">
                                {{scope.row.vip=='0'?'会员':'非会员'}}
                            </template>
                        </el-table-column>
                        <el-table-column show-overflow-tooltip align="center" prop="avatar" label="头像">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.avatar" style="width: 30px;height: 30px; margin-top: 2px">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                    <div slot="error" class="image-slot">
                                    </div>
                                </el-image>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="130px" align="center">
                            <template slot-scope="scope">
                                <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row)">
                                    <i class="el-icon-view" title="查看"/>
                                </el-button>
                                <el-button slot="reference" v-permission="[]" type="text" size="mini" @click="handleUpdate(scope.row)">
                                    <i class="el-icon-edit" style="color:green"  title="编辑"/>
                                </el-button>
                                <el-button slot="reference" v-permission="[]" type="text" size="mini" @click="handleDelete(scope.row.id)">
                                    <i class="el-icon-delete" style="color:#ff0000" title="删除"/>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--分页组件-->
                    <el-pagination :total="total" :current-page="page" :page-size="size" style="margin-top: 8px;"
                                   layout="total, prev, pager, next, sizes"
                                   @size-change="sizeChange" @current-change="pageChange"/>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import checkPermission from '@/utils/permission'
    import initData from '@/mixins/initData'
    import {page} from '@/api/ope/client'
    export default {
        mixins: [initData],
        data() {
            return {
                data: [],
                loading: false,
                total: 0,
                delLoading: false,
                sup_this: this,
                operate: undefined,
                importForm: undefined,
                id: '',
                page: 1,
                size: 10,
                userid: '',
                checkList: [],
                tableHeight: document.documentElement.clientHeight * 0.6
            }
        },
        created() {
            this.beforeInit()
        },
        methods: {
            checkPermission,
            beforeInit() {
                this.params.current = this.page
                this.params.size = this.size
                page(this.params
                ).then(res => {
                    this.total = res.data.total
                    this.data = res.data.records
                    this.loading = false
                }).catch(err => {
                    this.loading = false
                })
            },
            // 搜索
            handleQuery() {
                this.loading = true
                this.page = 1
                this.beforeInit()
            },
            // 新增
            handleCreate () {
                this.$router.push("/client/clientOption/-1/create");
            },
            handleView(row) {
                this.$router.push("/client/clientOption/" + row.userId + '/view');
            },
            handleUpdate(row) {
                this.$router.push("/client/clientOption/" + row.userId + '/update');
            },
            handleDelete(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delLoading = true
                    del([id]).then(res => {
                        this.delLoading = false
                        this.handleQuery()
                        if (res.data ===true){
                            this.$notify({
                                title: '删除成功',
                                type: 'success',
                                duration: 2500
                            })
                        }else {
                            this.$notify({
                                title: '删除失败',
                                type: 'success',
                                duration: 2500
                            })
                        }
                    }).catch(err => {
                        this.delLoading = false
                    })
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消删除',
                        duration: 2500
                    })
                })
            },
            batchDelete() {
                let list = this.$refs.scaleTable.selection

                if (list.length<1){
                    this.$notify({
                        title: '请选择需要删除的咨询师',
                        type: 'error',
                        duration: 2500
                    })
                    return;
                }
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delLoading = true
                    let ids = []
                    list.forEach(res => {
                        ids.push(res.id)
                    })
                    del(ids).then(res => {
                        this.delLoading = false
                        this.handleQuery()
                        if (res.data ===true){
                            this.$notify({
                                title: '删除成功',
                                type: 'success',
                                duration: 2500
                            })
                        }
                    }).catch(err => {
                        this.delLoading = false
                    })
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消删除',
                        duration: 2500
                    })
                })
            }
        }
    }
</script>

<style scoped>
    .contain-tit{
        line-height: 59px;
        height: 59px;
        color: #333;
        font-size: 18px;
        border-bottom: 2px solid #D5E1FF;
        font-weight: bold;
    }
</style>
