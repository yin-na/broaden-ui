<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card" style="box-shadow: none;border: none">
          <div class="contain-tit">
            <span>数据清理</span>
          </div>
          <div class="head-container">
            <el-input
              v-model="params.tableName"
              class="filter-item"
              style="width: 150px;"
              clearable
              placeholder="数据表名称"
              @keyup.enter.native="handleQuery"
            />

            <el-button
              style="margin-left:10px"
              size="mini"
              type="primary"
              icon="el-icon-search"
              @click="handleQuery"
            >搜索</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="batchDelete">批量清空数据表</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delAllData">清空全部数据表</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="delAllWithOutUser">清空全部数据表，保留用户机构</el-button>
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
            <el-table-column  align="center" prop="tableName" label="表名" />
            <el-table-column  align="center" prop="tableComment" label="数据库表说明" />
            <el-table-column  align="center" prop="crtTime" label="创建时间" />
            <el-table-column label="操作" width="130px" align="center">
              <template slot-scope="scope">
                <el-button
                  slot="reference"
                   type="danger"
                  size="mini"
                  @click="handleDelete(scope.row.tableName)"
                >
                  删除数据
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
import { list, del,delAll,deleteAllWithOutUser } from "@/api/base/database.js";

export default {
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
        tableName: "",
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
    pageChange (e) {
      this.params.tableName=''
      this.page = e
      this.init()
    },
    // 新增
    handleDelete(id) {
      this.$confirm("此操作将永久删除,删除之前请先备份数据， 是否继续?", "提示", {
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
                  type: "error",
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

    delAllWithOutUser(){
         this.$confirm("此操作将永久删除数据（不包含用户账号数据、机构数据）,删除之前请先备份数据， 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          deleteAllWithOutUser()
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
                  type: "error",
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
    delAllData(){
        this.$confirm("此操作将永久删除包含用户账号数据以及机构信息在内的数据,删除之前请先备份数据， 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          delAll()
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
                  type: "error",
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
      this.$confirm("此操作将永久删除选中的表数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          let ids = [];
          list.forEach((res) => {
            ids.push(res.tableName);
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
                  type: "error",
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
