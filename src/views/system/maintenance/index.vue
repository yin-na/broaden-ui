<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card" style="box-shadow: none;border: none">
          <div class="contain-tit">
            <span>系统维护</span>
          </div>
          <div class="head-container">
            <el-input
              v-model="params.projectName"
              class="filter-item"
              style="width: 150px;"
              clearable
              placeholder="名称"
              @keyup.enter.native="handleQuery"
            />

            <el-button
              style="margin-left:10px"
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="handleQuery"
            >搜索</el-button>
            <el-button size="mini" type="success" icon="el-icon-plus" @click="handleCreate">新增</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
          </div>
          <!--表格渲染-->
          <el-table
            v-loading="loading"
            ref="scaleTable"
            :data="data"
            size="mini"
            :height="tableHeight"
            :header-cell-style="{fontSize:'14px',height:'35px'}"
            :row-style="{height:'35px',lineHeight:'35px',fontSize:'14px'}"
            highlight-current-row
            style="width: 100%;"
            border
          >
            <el-table-column type="selection" align="center" v-if="data.length!='0'"></el-table-column>
            <el-table-column  align="center" prop="projectName" label="项目名称" />
            <el-table-column  align="center" prop="versions" label="项目的版本号" />
            <el-table-column  align="center" prop="logo" label="后台logo">
                <template slot-scope="scope">
                    <el-image :src="scope.row.logo" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="leadLogo" label="前端页面需要的整体logo" >
               <template slot-scope="scope">
                    <el-image :src="scope.row.leadLogo" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="loginImage" label="登录页背景图">
               <template slot-scope="scope">
                    <el-image :src="scope.row.loginImage" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="loginLogoOne" label="高校云图片">
               <template slot-scope="scope">
                    <el-image :src="scope.row.loginLogoOne" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column  align="center" prop="loginLogoTwo" label="社会云图片">
                <template slot-scope="scope">
                    <el-image :src="scope.row.loginLogoTwo" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="projectQrcode" label="二维码">
                <template slot-scope="scope">
                    <el-image :src="scope.row.projectQrcode" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="mascot" label="心里干预的吉祥物">
               <template slot-scope="scope">
                    <el-image :src="scope.row.mascot" style="width: 30px;height: 30px;padding-top: 4px">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        <div slot="error" class="image-slot">
                        </div>
                    </el-image>
                </template>
            </el-table-column> 
            <!-- <el-table-column  align="center" prop="userImage" label="用户名图标" />
            <el-table-column  align="center" prop="mascot" label="密码图标" />  -->
            <el-table-column  align="center" prop="state" label="是否启用"> 
                 <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.state"
                    active-color="#13ce66"
                    inactive-color="gray"
                    active-value="0"
                    inactive-value="1"
                    :disabled="operate==='view'"
                    @change="updateStateById(scope.row.id,scope.row.state)"
                   ></el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button slot="reference" type="text" size="mini" @click="handleView(scope.row)">
                  <i class="el-icon-view" title="查看" />
                </el-button>
                <el-button
                  slot="reference"
                  type="text"
                  size="mini"
                  @click="handleUpdate(scope.row)"
                >
                  <i class="el-icon-edit" style="color:green" title="编辑" />
                </el-button>
                <el-button
                  slot="reference"
                  type="text"
                  size="mini"
                  @click="handleDelete(scope.row.id)"
                >
                  <i class="el-icon-delete" style="color:#ff0000" title="删除" />
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
    <!--  弹窗 -->
    <dict-form ref="dictForm" :operate="operate" />
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import { list, del,updateState } from "@/api/base/sysmantaince.js";
import { get } from '@/api/base/dictDetail'

export default {
  components: {
    "dict-form": () => import("./module/form"),
  },
  mixins: [initData],
  data() {
    return {
      data: [],
      loading: false,
      delLoading: false,
      sup_this: this,
      operate: undefined,
      importForm: undefined,
      dictTypes:[],
      id: "",
      page: 1,
      size: 10,
      userid: "",
      checkList: [],
      labelList: [],
      params: {
        projectName: "",
      },
      tableHeight: document.documentElement.clientHeight * 0.6,
    };
  },
  created() {
    this.beforeInit();
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.params.current = this.page;
      this.params.size = this.size;
      list(this.params)
        .then((res) => {
          this.total = res.data.total;
          this.data = res.data.records;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 搜索
    handleQuery() {
      this.loading = true;
      this.page=1
      this.beforeInit();
    },
    // 新增
    handleCreate() {
      this.operate = "create";
      this.$refs.dictForm.dialog = true;
    },
    handleView(row) {
      this.operate = "view";
      this.$refs.dictForm.dialog = true;
      this.$refs.dictForm.handleInitData(row);
    },
    handleUpdate(row) {
      this.operate = "update";
      this.$refs.dictForm.dialog = true;
      this.$refs.dictForm.handleInitData(row);
    },
    updateStateById(id,val){
        if(val=="0"){
          val=="1"
        }else{
           val=="0"
        }
        let params={
          id:id,
          value:val
        }
       if(val=="0"){
       this.$confirm("启用该项，其他项将被禁用, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          updateState(params)
            .then((res) => {
              this.delLoading = false;
              this.handleQuery();
              if (res.data === true) {
                this.$notify({
                  title: "启用成功",
                  type: "success",
                  duration: 2500,
                });
              } else {
                this.$notify({
                  title: "启用失败",
                  type: "success",
                  duration: 2500,
                });
              }
            })
            .catch((err) => {
              this.delLoading = false;
            });
        })
        .catch((err) => {
          console.log(err)
          this.handleQuery();
          this.$notify({
            type: "info",
            message: "已取消启用",
            duration: 2500,
          });
        });
       }else{
           updateState(params).then((res) => {
              this.delLoading = false;
              this.handleQuery();
              if (res.data === true) {
                this.$notify({
                  title: "取消成功",
                  type: "success",
                  duration: 2500,
                });
              } else {
                this.$notify({
                  title: "取消失败,必须启用一个",
                  type: "error",
                  duration: 2500,
                });
              }
            })
            .catch((err) => {
              this.delLoading = false;
            });
       }
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          del([id])
            .then((res) => {
              this.delLoading = false;
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
                  type: "success",
                  duration: 2500,
                });
              }
            })
            .catch((err) => {
              this.delLoading = false;
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
    viewRecord(id) {
      this.userid = id;
      this.$nextTick(() => {
        this.$refs.consultRecord.dialog = true;
        this.$refs.consultRecord.handleQuery();
      });
    },
    batchDelete() {
      let list = this.$refs.scaleTable.selection;
      if (list.length <= 0) {
        this.$notify({
          type: "info",
          message: "请选择数据",
          duration: 2500,
        });
        return;
      }
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          let ids = [];
          list.forEach((res) => {
            ids.push(res.id);
          });
          del(ids)
            .then((res) => {
              this.delLoading = false;
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
                  type: "success",
                  duration: 2500,
                });
              }
            })
            .catch((err) => {
              this.delLoading = false;
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
  width: 345px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
