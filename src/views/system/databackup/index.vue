<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card" style="box-shadow: none;border: none">
          <div class="contain-tit">
            <span>数据备份</span>
          </div>
          <div class="head-container">
            <el-button size="mini" type="primary"  @click="dataBack()">数据备份</el-button>
             <div style="color:red;font-size:12px">备份前请确认后端程序配置好了 mysqldump，否则会导致备份失败</div>
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
            <el-table-column align="center" prop="filename" label="文件名" />
            <el-table-column align="center" prop="crtTime" label="创建时间" />
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
import { dbBackUp, list } from "@/api/base/dbbackup";
import initData from "@/mixins/initData";

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
      dictTypes: [],
      id: "",
      page: 1,
      size: 10,
      userid: "",
      checkList: [],
      labelList: [],
      params: {},
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
      this.page = 1;
      this.beforeInit();
    },
    pageChange(e) {
      this.page = e;
      this.init();
    },
    dataBack() {
      dbBackUp().then((res) => {
        if (res.code === 0) {
          this.$notify({
            title: "备份成功",
            type: "success",
            duration: 2500,
          });
          this.handleQuery()
        } else {
          this.$notify({
            title: "备份失败",
            type: "error",
            duration: 2500,
          });
        }
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