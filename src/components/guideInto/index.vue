<template>
    <div class="guide-into">
      <el-button size="mini" type="success" icon="el-icon-upload2"  @click="handleExportIn">导入</el-button>
       <el-dialog :close-on-click-modal="false" :append-to-body='true' width="700px"
                :visible.sync="dialogExVisible" title="导入数据"
                @closed="clearDia">
          <el-form class="import-box" id="upload">
            <div class="title" :style="{color: theme}">1.下载并填入导入模板</div>
            <div class="explain-con">
                <span class="template-title">导入模板</span><span>
                  <el-button :style="{color: theme,borderColor:theme}" @click="importData" :loading="loading" >
                    {{ loading ? '加载中' : '点击下载'}}
                  </el-button>
                </span>
                <div class="instructions">
                  说明：请在下载的模板文档中将对应的字段信息输入或粘贴进去。为保障粘贴信息被有效导入，请使用纯文本或数字。
                </div>
            </div>
            <div class="title" :style="{color: theme}">2.数据导入</div>
            <div class="explain-con"
                :class="fileList.length > 0 ? 'explain-upload' : ''">
              <el-upload class="upload-demo"
                    ref="upload" multiple 
                    accept='.xls'
                    :before-remove="beforeRemove"
                    action=""
                    :headers="headers"
                    :http-request="handlePost"
                    :on-change="fileChangeStatus"
                    :on-success="handleSuccessTemplate"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" type="primary">{{ fileList.length > 0 ? '重新选择' : '选择文件'}}</el-button>
                    <el-button style="margin-left: 10px;" v-if="fileList.length > 0" @click="submitUpload" :loading="loadingIn">
                      {{ loadingIn ? '导入中' : '开始导入'}}
                    </el-button>
                </el-upload>
            </div>
            <div class="title" :style="{color: theme}">3.导入结果</div>
            <div class="explain-con">
                <!-- <div v-if="error"  class="success-data">导入总数量：1500 条  成功：1300条  失败：200条 </div> -->
                <!-- <el-button class="fail-data" type="primary" @click="viewError">导出数据错误</el-button> -->
                <div class="success-data" v-if="result" v-html="result"></div>
                <div v-else>无</div>
            </div>
        </el-form>
      </el-dialog>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
 import { resOk } from '@/settings'
import config from '@/config'
import request from '@/utils/request'
// import { downloadTemplate,upload } from '@/api/student/student'
import { getToken } from '@/utils/auth'

export default {
  props: {
    type: { // 模本名称
        type: String,
        default: ''
    },
    templateUrl: { // 模板下载地址
        type: String,
        default: ''
    },
    importUrl: { // 导入地址
        type:String,
        default: ''
    }
  },
  data(){
    return{
      loading: false, // 导入模板下载
      loadingIn: false, // 开始导入loading状态
      dialogExVisible:false,
      error:false,
      actionURL:'',
      headers:[],
      fileListTemplate:'',
      fileList:[],
      result:''
    }
  },
  computed: {
      ...mapGetters([
          'theme',
      ])
  },
  created(){
    this.actionURL = config.host + '/student/uploadAnswer'  
    this.headers = {
      Authorization: 'Bearer ' + getToken(),
      "Access-Control-Allow-Credentials": true
    }
  },
  methods:{
    viewError(){
      if(this.error){
        this.error = false
      }else{
        this.error = true
      }
    },
    importData(){
      // 下载模版
      this.loading = true
    //   let type = this.type
        return request({
            url: this.templateUrl,
            method: 'post',
            responseType:'arraybuffer'
        }).then(res=>{
            let  fileName = this.type + '.xls'
            //   if(type == 0){
            //       fileName = '直属学校上传模板.xls';
            //   }else if(type == 1){
            //       fileName = '学校上传模板.xls';
            //   }else if(type == 2){
            //       fileName = '教职工上传模板.xls';
            //   }else if(type == 3){
            //       fileName = '学生上传模板.xls';
            //   }else{
            //       fileName = '机构上传模板.xls';
            //   }
            const blob = new Blob([res]);
            const elink = document.createElement('a');
            elink.style.display = 'none';
            elink.setAttribute("download", fileName);
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink); 
            this.loading = false
        }).catch(res=>{
            let msg = res.message ? res.message : "请求失败";
            this.$message.error(msg);
            this.loading = false
        })
    },
    submitUpload(){ 
      this.$refs.upload.submit();
    },
    fileChangeStatus(file){
      this.fileList = [ file ]
      this.fileListTemplate = file
    },
    handlePost(file) {
      this.loadingIn = true
      const fd = new window.FormData()
      fd.append('file', file.file)
      //fd.append('type', this.type)
      fd.append('fileName', this.fileListTemplate.name)
      let data = fd
      return request({
        url: this.importUrl,
        method: 'post',
        data
     }).then(res => {
        if(res.code == resOk){
          if(res.data == true) {
            this.$message.success('导入成功')
          }
          else{
            this.$message.success(res.message)
          }

            this.result = res.data
            this.$emit('success', true)
            // this.$parent.handleQuery()
            this.dialogExVisible = false // 关闭弹窗
            
        }else{
          this.result = '导入失败：' + res.message
        }
        this.loadingIn = false
      }).catch((err,message) => {
          this.result = '导入失败：' + res.message
          this.loadingIn = false
      })
    },

    // 导入成功
    handleSuccessTemplate(res){
      if(res.code == resOk){
          this.$message.success('成功');
      } else{
        let msg = res.message || "上传失败"
        this.$message.error(msg)
      }
    },
    clearDia() {
      this.fileList = []
      this.$refs.upload.clearFiles();
      // 刷新清空状态
      this.$nextTick(()=>{
        this.fileListTemplate = ''
      })
      this.result = ''
    },

    //点击导入展示弹窗
    handleExportIn() {
      this.dialogExVisible = true;
    },
    // 移除
    beforeRemove() {
      this.fileList = []
    },
  }
}
</script>

<style scoped>

.import-box .title{
   font-size: 16px;
}
.import-box .explain-con{
    padding: 5px 14px 15px;
}
.import-box .explain-upload {
  height: 90px;
}
.template-title{
 margin-right:8px;
}
.instructions{
  line-height: 24px;
  margin-top: 10px;
  font-size: 14px 
}
.success-data{
  line-height: 24px;
}
.fail-data{
  margin-top: 10px
}
.guide-into{
  display: inline-block;
  margin-right: 10px;
}
</style>

