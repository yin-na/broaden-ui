<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    class="dialog"
    :title="titleMap[operate]"
    width="800px"
    @close="cancel"
    :close-on-click-modal="false"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="demo-ruleForm"
      style="padding: 10px"
      size="small"
      label-width="100px"
    >
      <el-form-item label="项目名称" prop="projectName" style="width:65%">
        <el-input
          v-model.trim="form.projectName"
          :disabled="operate==='view'"
          clearable
          placeholder="项目名称"
        />
      </el-form-item>
      <el-form-item label="项目版本号" prop="versions" style="width:65%">
        <el-input
          v-model.trim="form.versions"
          :disabled="operate==='view'"
          clearable
          placeholder="个案名称"
        />
      </el-form-item>
      <!-- <el-form-item label="启用状态" prop="state" style="width:65%"  >
        <el-switch
          v-model="form.state"
          active-color="#13ce66"
          inactive-color="gray"
          active-value="0"
          inactive-value="1"
          :disabled="operate==='view'"
        ></el-switch>
      </el-form-item> -->
      <el-form-item label="后台logo" prop="logo">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload1"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage1"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image v-show="form.logo" :src="form.logo" style="width: 100px;height: 100px">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="前台logo" prop="leadLogo">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload2"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage2"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image v-show="form.leadLogo" :src="form.leadLogo" style="width: 100px;height: 100px">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="登录页背景图" prop="loginImage" style="width:65%">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload3"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage3"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image
          v-show="form.loginImage"
          :src="form.loginImage"
          style="width: 100px;height: 100px"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="高校云图片" prop="loginLogoOne" style="width:65%">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload4"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage4"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image
          v-show="form.loginLogoOne"
          :src="form.loginLogoOne"
          style="width: 100px;height: 100px"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="社会云图片" prop="loginLogoTwo" style="width:65%">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload5"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage5"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image
          v-show="form.loginLogoTwo"
          :src="form.loginLogoTwo"
          style="width: 100px;height: 100px"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>

      <el-form-item label="项目二维码" prop="projectQrcode" style="width:65%">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload6"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage6"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image
          v-show="form.projectQrcode"
          :src="form.projectQrcode"
          style="width: 100px;height: 100px"
        >
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="心理干预吉祥物" prop="mascot" style="width:65%">
        <el-upload
          v-show="operate!='view'"
          class="upload-demo"
          ref="upload7"
          action
          :with-credentials="true"
          :file-list="fileList"
          :multiple="false"
          :limit="1"
          :http-request="uploadImage7"
          :list-type="'png/jpg'"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-image v-show="form.mascot" :src="form.mascot" style="width: 100px;height: 100px">
          <div slot="placeholder" class="image-slot">
            加载中
            <span class="dot">...</span>
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" style="width: 100px;height: 100px"></i>
          </div>
        </el-image>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="button" @click="cancel">取消</el-button>
      <el-button :loading="loading" v-if="operate !=='view'" type="success" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { save } from "@/api/base/sysmantaince.js";
import { uploadFile } from "@/api/base/common";
import { getToken } from "@/utils/auth";
import Config from "@/config";
import { get } from "@/api/base/dictDetail";
export default {
  props: {
    operate: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    var nameValidator = (rule, value, callback) => {
      var reg2 = new RegExp("[#^$@&￥]", "g");
      if (reg2.test(value)) {
        return callback(new Error("不能包含特殊字符"));
      } else {
        return callback();
      }
    };
    return {
      currentPage: 1,
      isClear: false,
      loading: false,
      dialog: false,
      fileList: [],
      dictTypes: [],
      studentTypes: [],
      gradeList: [],
      labels: [],
      headers: {},
      actionApi: "",
      form: {
        projectName: undefined,
        versions: undefined,
        logo: undefined,
        leadLogo: undefined,
        loginImage: undefined,
        loginLogoOne: undefined,
        projectQrcode: undefined,
        mascot: undefined,
        state:"1"
      },

      rules: {
        projectName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            validator: nameValidator,
            message: "名称不能输入特殊字符",
            trigger: "blur",
          },
        ],
        versions: [
          { required: true, message: "请输入版本号", trigger: "blur" },
        ],
        logo: [
          { required: true, message: "请上传后台logo", trigger: "change" },
        ],
        leadLogo: [
          { required: true, message: "请上传登录页背景图", trigger: "change" },
        ],
        // loginImage: [{ required: true, message: "请上传前台logo", trigger: "change" }],
        // loginLogoOne: [{ required: true, message: "请上传前台logo", trigger: "change" }],
        // loginLogoTwo: [{ required: true, message: "请上传前台logo", trigger: "change" }],
        // projectQrcode: [{ required: true, message: "请上传前台logo", trigger: "change" }],
        // mascot: [{ required: true, message: "请上传前台logo", trigger: "change" }],
      },
      titleMap: {
        create: "创建",
        update: "编辑",
        view: "查看",
      },
    };
  },
  created() {
    this.headers = {
      Authorization: "Bearer " + getToken(),
      "Access-Control-Allow-Credentials": true,
    };
    this.actionApi = Config.baseUrl.prod + "/resource/uploadFile";
  },
  methods: {
    cancel() {
      this.resetForm();
    },
    uploadImage1(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.logo = res.data.url;
        this.$refs.upload1.clearFiles();
        this.fileList = [];
      });
    },
      uploadImage2(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.leadLogo = res.data.url;
        this.$refs.upload2.clearFiles();
        this.fileList = [];
      });
    },
      uploadImage3(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.loginImage = res.data.url;
        this.$refs.upload3.clearFiles();
        this.fileList = [];
      });
    },
      uploadImage4(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.loginLogoOne = res.data.url;
        this.$refs.upload4.clearFiles();
        this.fileList = [];
      });
    },
      uploadImage5(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.loginLogoTwo = res.data.url;
        this.$refs.upload5.clearFiles();
        this.fileList = [];
      });
    },
      uploadImage6(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.projectQrcode = res.data.url;
        this.$refs.upload6.clearFiles();
        this.fileList = [];
      });
    },
      uploadImage7(file) {
      let formData = new FormData(); // formdata格式
      formData.append("file", file.file);
      uploadFile(formData).then((res) => {
        this.form.mascot = res.data.url;
        this.$refs.upload7.clearFiles();
        this.fileList = [];
      });
    },
    handleInitData(row) {
      let data = {};
      for (let i in row) {
        data[i] = row[i];
      }
      this.form = data;
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
      save(data)
        .then((res) => {
          if (res.code === 0) {
            this.resetForm();
            this.$notify({
              title: message + "成功",
              type: "success",
              duration: 2500,
            });
            this.loading = false;
            this.$parent.init();
          } else {
            this.$notify({
              title: res.message,
              type: "error",
              duration: 2500,
            });
            this.loading = false;
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    resetForm() {
      this.$refs.upload1.clearFiles();
       this.$refs.upload2.clearFiles();
      this.$refs.upload3.clearFiles();
      this.$refs.upload4.clearFiles();
      this.$refs.upload5.clearFiles();
      this.$refs.upload6.clearFiles();
      this.$refs.upload7.clearFiles();
      this.$refs.form.clearValidate();
      this.$refs["form"].resetFields();
      this.$parent.beforeInit();
      this.dialog = false;
      this.form = {
        projectName: undefined,
        versions: undefined,
        logo: undefined,
        leadLogo: undefined,
        loginImage: undefined,
        loginLogoOne: undefined,
        projectQrcode: undefined,
        mascot: undefined,
        state:"1"
      };
    },
  },
};
</script>

<style scoped>
.dialog /deep/ .el-dialog__footer {
  background-color: #fff !important;
  margin-top: -1px;
}
</style>
