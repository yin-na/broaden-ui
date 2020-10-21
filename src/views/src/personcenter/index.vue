<template>
  <div class="add-person" :style="{minHeight: clientHeight  + 'px'}">
    <el-row>
      <el-col :span="5">
        <el-card class="infoLeft">
          <div style="color:#333;margin-bottom:36px">
            <span class="fs18">基本信息</span>
          </div>
          <div @click="dealFlag(true)" class="color9" :class="{Infoplay:isActive}">
            <span>基本信息</span>
          </div>
          <div @click="dealFlag(false)" class="color9" :class="{Infoplay:!isActive}" style="margin-top:27px">
            <span>修改密码</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="19" >
        <el-card class="person-info">
          <div v-show="showflag">
            <el-form style="margin-top:57px">
              <div style="display:flex">
                <div class="fs14 color6 UserProfile">用户头像：</div>
                <div>
                  <div class="photo">
                <img :src="userInfo.avatar" />
                <!-- <span v-show="seen" class="img-title">修改头像</span> -->
              </div>
              <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
                </div>

              </div>

            </el-form>
            <el-form class="infoRight" :model="form" :rules="rules" ref="form" label-width="100px">
              <el-form-item label="用户名：" prop="loginName">
                <span>{{form.loginName}}</span>
              </el-form-item>
              <el-form-item label="昵称：" prop="username">
                <el-input v-model="form.username" readonly></el-input>
              </el-form-item>
              <el-form-item label="性别：" prop="sex" align="left">
                <el-radio-group v-model="form.sex">
                  <el-radio :label="0" disabled>
                    <i class="radio-i"></i>男
                  </el-radio>
                  <el-radio :label="1" disabled>
                    <i class="radio-i"></i>女
                  </el-radio>
                  <!-- <el-radio :label="2">
                    <i class="radio-i"></i>保密
                  </el-radio> -->
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮箱：">
                <el-input v-model="form.email" readonly></el-input>
              </el-form-item>
              <el-form-item label="出生日期：" prop="birthday" style="height:65px;border-bottom:1px dashed #ddd">
                <el-date-picker readonly v-model="form.birthday" type="date" default-value="1990-01-01" :picker-options="pickerOptions0" placeholder="选择出生日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
              <!-- <el-button class="fs16 color6" type="primary" @click="uploadImg" :loading="loading">确认</el-button> -->
            </el-form>
          </div>
          <div v-show="!showflag">
            <el-form class="rightWord" :model="pswData" :rules="rules" ref="pswData" label-width="100px" style="width:600px;margin-top:150px;">
              <el-form-item label="原密码" prop="pswd">
                <el-input type="password"  placeholder="请输入原密码" v-model="pswData.pswd"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPswd">
                <el-input type="password"  placeholder="6-16位密码,区分大小写" v-model="pswData.newPswd"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="confirmPswd">
                <el-input type="password"  placeholder="请确认密码" v-model="pswData.confirmPswd"></el-input>
              </el-form-item>
              <div class="changeBtn">
                <el-button type="primary" @click="updataPsw">修改</el-button>
                <el-button @click="resetMsg">重置</el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { updatePassWord, getById, updateUserInfo } from "@/api/base/user";
import { uploadFile } from "@/api/base/common";
import { resOk, shadow } from "@/settings";
import { validatenull } from "@/utils/validate";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswData.newPswd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      clientHeight: 0,
      isActive:true,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      shadow: shadow,
      loading: false,
      showflag: true,
      sex: 0,
      seen: false,
      form: {
        avatar: "",
        userId: "",
        loginName: "",
        username: "",
        sex: "",
        email: "",
        birthday: ""
      },
      pswData: {
        pswd: "",
        newPswd: "",
        confirmPswd: ""
      },
      userInfo: {
        avatar: ""
      },
      activeName: "first",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        file: ""
      },
      rules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
            message: "请输入正确的邮箱格式！",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "内容不能为空",
            trigger: "blur"
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号"
          }
        ],
        pswd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            pattern: /^\w+$/,
            message: "请输入以字母、数字、下划线组成的密码"
          },
          {
            min: 6,
            max:16,
            message: "请输入6-16位的密码"
          }
        ],
        newPswd: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            pattern: /^\w+$/,
            message: "请输入以字母、数字、下划线组成的密码"
          },
          {
            min: 6,
            max: 16,
            message: "请输入6-16位的密码"
          }
        ],
        confirmPswd: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      datas: new FormData()
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    var clientHeight =
      window.innerHeight || document.documentElement.clientHeight;
    this.clientHeight = clientHeight - 169;
    window.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.userInfo.avatar = this.user.avatar;
    this.getUser();
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 200) {
        if (!this.familyShow) {
          this.clientHeight = this.clientHeight + 500;
        }
        this.familyShow = true;
      }
      if (scrollTop > 700) {
        if (!this.testShow) {
          this.clientHeight = this.clientHeight + 500;
        }
        this.testShow = true;
      }
      if (scrollTop > 1000) {
        if (!this.xlShow) {
          this.clientHeight = this.clientHeight + 500;
        }
        this.xlShow = true;
      }
      if (scrollTop > 1400) {
        this.xzShow = true;
      }
    },
    getUser() {
      getById(this.user.userId).then(res => {
        this.form = res.data;
        if(res.data.birthday==''){
         this.form.birthday="1990-01-01"
        }
        this.userInfo.avatar = validatenull(res.data.avatar)
          ? this.user.avatar
          : res.data.avatar;
      });
    },
    dealFlag(flag) {
      this.showflag = flag;
      this.isActive=flag
    },
    visible() {
      this.seen = true;
    },
    invisible() {
      this.seen = false;
    },
    resetMsg() {
      this.pswData = {
        pswd: "",
        newPswd: "",
        confirmPswd: ""
      };
      this.$refs.pswData.resetFields();
    },
    uploadHeadImg() {
      // 点击的时候触发input打开图片上传的点击事件
      this.$el.querySelector(".hiddenInput").click();
    },
    // 将头像显示
    handleFile(e) {
      let that = this;
      //获取当前点击事件的target元素对其进行兼容
      let $target = e.target || e.srcElement;
      //   取第一个元素
      let file = $target.files[0];
      if (file) {
        var reader = new FileReader(); // //读取本地文件，以gbk编码方式输出
        reader.onload = data => {
          //成功读取后
          let res = data.target || data.srcElement;
          // //读取完毕后输出结果
          this.userInfo.avatar = res.result;
        };
        reader.readAsDataURL(file);
        that.file = file;
      }
    },
    // 上传图片
    uploadImg() {
      if (this.user.avatar != this.userInfo.avatar) {
        let formData = new FormData();
        formData.append("file", this.file, this.file.name);
        uploadFile(formData).then(res => {
          if (res.code == 0) {
            this.form.avatar = res.data.url;
            this.userInfo.avatar = res.data.url;
            this.updataData()
          } else {
            this.$message.error("图片上传失败");
          }
        });
      }else{
        this.updataData()
      }
    },
    // 更新用户信息
    updataData() {
      //this.uploadImg();
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.userId = this.user.userId;
          updateUserInfo(this.form).then(res => {
            if (res.code == resOk) {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.$store.dispatch("resetAvatarAndUserName", this.form);
            } else {
              this.$message({
                showClose: true,
                message: '上传失败',
                type: 'error'
              });
            }
            this.loading = false;
          });
        }
      });
    },
    updataPsw() {
      this.$refs["pswData"].validate(valid => {
        if (valid) {
          this.loading = true;
          updatePassWord(this.pswData).then(res => {
            if (res.code == 0) {
              this.$message({
                showClose: true,
                message: '密码修改成功，下次登录时请使用新密码',
                type: 'success'
              })
              this.resetMsg();
            } else {
              let msg = res.message ? res.message : "失败";
              this.$message.error(msg);
            }
            this.loading = false;
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.add-person {
  width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  .infoLeft {
    height: 690px;
    text-align: left;
    padding: 30px 0 0 40px;
    width: 210px;
    div {
      cursor: pointer;
    }
  }

  .infoRight{
    width:600px;
    margin-top:10px;
    margin-bottom:50px;
    .el-form-item__label{
      font-size: 14px;
      color:#666;
    }
    .el-input__inner{
      height: 35px;
      border-color: #ddd;
      width:220px !important;
    }
    .el-form-item{
      height:55px;
    }
    button{
      width:132px;
      height:40px;
      color: #fff;
      margin: 34px 0 0 90px;
      border: none;
      outline: none;
      background: linear-gradient(90deg, #FF9644 0%, #FE6530 100%);
    }
  }
  .rightWord{
    margin: 0 auto;
    .el-form-item__label{
      font-size: 14px;
      font-weight: 700;
      color:#666;
    }
    .el-form-item{
      margin-bottom: 30px;
    }
    .el-input__inner{
      height: 35px;
      border-color: #ddd;
      width:320px !important;
    }
    button{
      width:130px;
      height:38px;
      font-size:16px;
    }
    button:nth-child(1){
      border-color: #eb6100;
      background-color:#fff;
      color:#eb6100;
      outline: none;
    }
    button:nth-child(2){
      background: linear-gradient(90deg, #FF9644 0%, #FE6530 100%);
      color:#fff;
      border: none;
      outline: none;
    }
  }
  .Infoplay{
    color: #F36421;
  }
  .changeBtn{
    width: 320px;
    display: flex;
    justify-content: space-between;
    margin:57px 0 0 100px;

  }
  .label-title {
    margin: 10px 0 30px;
    font-size: 18px;
    font-weight: 700;
  }
  .person-info {
    border-bottom: 1px solid rgb(229, 229, 229);
    height: 690px;
    padding-left: 75px;
    .UserProfile{
      line-height:106px;
      width:100px;
      text-align:center;
      font-weight:600
    }
  }
  .photo {
    display: block;
    width: 100px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    position: relative;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .img-title {
      display: block;
      position: absolute;
      top: 10px;
      left: 10px;
      width: 80px;
      height: 80px;
      line-height: 80px;
      border-radius: 50%;
      background-color: rgba(22, 22, 22, 0.6);
      font-size: 14px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
  .hiddenInput {
    display: none;
  }
}
</style>
