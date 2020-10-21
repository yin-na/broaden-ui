/*
 * @Author: 王世成
 * @Date: 2020-07-24 09:16:39
 * 教职工管理
 */
<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="box-card" style="border: none;box-shadow: none">
          <div class="contain-tit">
            <span>教职工管理</span>
            <div class="fr">
              <guide-into :type='"教职工信息导入模板"' :templateUrl='"/staff/downloadTemplate"' :importUrl='"/staff/uploadAnswer"' @success='successBtn'></guide-into>
              <!-- <el-button size="mini" type="success" icon="el-icon-upload2" @click="imports">导入</el-button> -->
              <!-- <el-button size="mini" type="success" icon="el-icon-download" @click="exportse">导出</el-button> -->
              <el-button size="mini" type="warning" icon="el-icon-plus" @click="handleCreate">新增</el-button>
              <el-button size="mini" type="primary" icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
            </div>
          </div>
          <div class="head-container">
            <el-input v-model="name" placeholder="姓名" style="width: 150px;margin-right:10px"></el-input>
            <el-input v-model="phone" placeholder="手机号" style="width: 150px;margin-right:10px"></el-input>
            <el-select v-model="personnelType" clearable placeholder="人员类型" style="width: 150px;margin-right:10px">
                            <el-option
                                    v-for="item in checkList"
                                    :key="item.roleId"
                                    :label="item.roleName"
                                    :value="item.roleId">
                            </el-option>
            </el-select>
            <el-button size="mini" type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            <el-button size="mini" type="button" icon="el-icon-refresh" @click="handleReset">重置</el-button>
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
            @select="select"
            @select-all="selectAll"
            border
          >
            <el-table-column type="selection" align="center" v-if="data.length!='0'"></el-table-column>
            <el-table-column type="index" align="center" width="80px" show-overflow-tooltip header-align="center" label="序号" />
            <el-table-column  header-align="center" align="center" prop="username" label="姓名" />
            <el-table-column  align="center" prop="sex" label="性别">
              <template slot-scope="scope">
                                <span v-show="scope.row.sex==0">男</span>
                                <span v-show="scope.row.sex==1">女</span>
                                <!-- <span v-show="scope.row.sex==2">保密</span> -->
              </template>
            </el-table-column>
            <el-table-column  align="center" prop="mobilePhone" label="联系电话(登录账号)"/>
            <el-table-column  align="center" prop="deptName" label="所属学校"/>
            <el-table-column  align="center" prop="" label="类型">
              <template slot-scope="scope">
                                <span v-for="item in checkList" :key="item.roleId" >
                                  <span v-if="item.roleId == scope.row.roleIds[0]">{{item.roleName}}</span>
                                </span>   
              </template>
            </el-table-column>
             <el-table-column  align="center"  label="重置密码">
               <template slot-scope="scope">
                <el-button slot="reference" type="info" size="mini" @click="handleResetPass(scope.row)">
                   重置密码
                </el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column  align="center" prop="" label="账号状态"/> -->
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
                  @click="handleDelete(scope.row.userId)"
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
  </div>
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData";
import GuideInto from '@/components/guideInto/index'
import { get, getType, down, del} from "@/api/base/faculty"
import {resetPassword} from '@/api/base/user'

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
      id: "",
      total: 0,
      page: 1,
      size: 10,
      userid: "",
      studentList: [],
      labelList: [],
      selection: '', // 勾选中的数据
      checkList:[],
      personnelType: '', // 教职工
      phone: '', // 手机号
      name: '', // 姓名
      tableHeight: document.documentElement.clientHeight * 0.6,
    };
  },
  components: {
      GuideInto
  },
  created() {
    getType().then((res) => {
      this.checkList = res.data
      // console.log(this.checkList, '教务类型')
    })
    this.handleQuery();
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
    handleReset() {
      this.personnelType = ''
      this.phone = ''
      this.name = ''
      this.handleQuery()
    },
    //lss  2020/01/08  导入成功后重置刷新
    successBtn(val){
        if(val){
              this.handleQuery()
        }
    },
    batchDelete() {
        let list = this.$refs.scaleTable.selection;
        if(list.length>0){
 this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [];
          list.forEach((res) => {
            ids.push(res.userId);
          });
          del(ids)
            .then((res) => {
              this.handleQuery();
              if (res.success === true) {
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
        }else{
           this.$notify({
            type: "info",
            message: "您未选中任何数据",
            duration: 2500,
          });
        }
     
    },
    // 搜索
    handleQuery() {
      // this.loading = true;
      let data = {
        current: this.page,
        size: this.size,
        name: this.name,
        mobilePhone: this.phone,
        roleId: this.personnelType
      }
      this.loading = true
      get(data).then((res) => {
        this.data = res.data.records
        this.total = res.data.total
        // console.log(res ,' 搜索数据')
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 勾选
    select(selection, row) {
      this.selection = selection;
    },
    // 全选
    selectAll(selection) {
      this.selection = selection;
    },
    pageChange (e) {
      this.page = e
      // this.init()
       this.handleQuery()
    },
    sizeChange (e) {
      this.page = 1
      this.size = e
      // this.init()
       this.handleQuery()
    },
    // 新增
    handleCreate() {
      this.$router.push("/education/userManer/facultyInformation/"  + -1 + '/create');
    },
    // 查看
    handleView(row) {
      this.$router.push("/education/userManer/facultyInformation/" + row.mobilePhone + '/read');
    },
    // 修改
    handleUpdate(row) {
      this.$router.push("/education/userManer/facultyInformation/" + row.mobilePhone + '/update');
    },
       // 重置密码
    handleResetPass(row){
        this.$confirm("您确定要重置 "+row.username+" 密码为123456", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         resetPassword(row.userId)
            .then((res) => {
              this.handleQuery();
              if (res.data === true) {
                this.$notify({
                  title: "重置成功",
                  type: "success",
                  duration: 2500,
                });
              } else {
                this.$notify({
                  title: "重置失败",
                  type: "error",
                  duration: 2500,
                });
              }
            })
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: "已取消重置",
            duration: 2500,
          });
        });
    },

    // 删除
    handleDelete(ids) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLoading = true;
          let id = []
          id.push(ids)
          del(id)
            .then((res) => {
              this.delLoading = false;
              if (res.success === true) {
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
              this.handleQuery();
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
