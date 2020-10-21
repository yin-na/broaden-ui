<template>
        <div class="panel" v-show="thisKey=='data'">
          <!-- 画布背景色 -->
        <div class="config-box">
          <div class="title">画布背景色</div>
          <el-row :gutter="20" style="margin-top: 12px;">
            <el-col :span="4">
              <el-color-picker v-model="chartData.bgcolor"></el-color-picker>
            </el-col>
            <el-col :span="20">
              <el-input v-model="chartData.bgcolor" readonly></el-input>
            </el-col>
          </el-row>
        </div>
        <!-- 画布大小 -->
        <div class="config-box">
          <div class="title">
            画布大小
          </div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input class="num-input" v-model.number="chartData.w">
                <template slot="prepend">宽度</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input class="num-input" v-model.number="chartData.h">
                <template slot="prepend">高度</template>
              </el-input>
            </el-col>
          </el-row>
        </div>
        <div class="config-box">
          <div class="title">背景颜色</div>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-color-picker v-model="currentElement.bgcolor"></el-color-picker>
            </el-col>
          </el-row>
          <div class="title">阴影颜色</div>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-color-picker v-model="currentElement.shadoeColor"></el-color-picker>
            </el-col>
          </el-row>
          <div class="title">阴影调整:</div>
          <div class="shadoeSize">
            <input v-model="currentElement.shadoeTop" class="shadoeSizeInput" type="text">px
            <input v-model="currentElement.shadoeRight" class="shadoeSizeInput" type="text">px
            <input v-model="currentElement.shadoeBottom" class="shadoeSizeInput" type="text">px
            <input v-model="currentElement.shadoeLeft" class="shadoeSizeInput" type="text">px
          </div>
        </div>
      </div>
</template>

<script>
/* eslint-disable */
import vueJsonEditor from 'vue-json-editor'
import {getConnectsList} from '@/api/chart/chart.js'
export default {
  props:["graphica"],
    components: {
    vueJsonEditor
  },
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user'),
      },
      editorSettings: {
        parentBg: 0, // 0代表背景颜色，1代表背景图片
        parentBgUrl: '',
      },
      thisKey: 'data',
      connectList: [],
    };
  },
  watch:{
      graphica:{
           handler(index){
                this.getItem(index)
           },
             deep: true
      }
  },
  computed: {
    chartData() {
      return this.$parent.$parent.chartData;
    },
    currentElement() {
      return this.$parent.$parent.currentElement;
    },
    formatedJSON() {
      return JSON.stringify(this.$parent.$parent.currentElement, null, 2);
    },
  },
  mounted() {
   getConnectsList(this.user.uid)
      .then(res => {
        const { errno, data } = res;
        if (errno === 0) {
          this.connectList = data.connectList;
        }
      })
      .catch(() => {});
  },
  methods: {
      getItem(index){
          // this.$parent.$parent.setActiveComponentByIndex(index);
      },
    handleScreenBgUploadSuccess(res, file) {
      this.chartData.bgimage = res.url;
    },
    beforeUpload(file) {
      const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isPic) {
        this.$message.error('图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt4M) {
        this.$message.error('图片大小不能超过 4MB!');
      }
      return isPic && isLt4M;
    },
    handleScreenBgDelete() {
      this.chartData.bgimage = '';
    },
    handleChartDataChange() {
      this.$parent.$parent.generateData(this.currentElement);
    },
    handleImageUploadSuccess(res, file) {
      this.currentElement.data.datacon.img = res.url
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
  },
};
</script>

<style lang="scss" scoped>
.config, .component-config {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #ffffffe9;
  color: #515151;
  box-shadow: -4px 0 4px #00000005;
  padding: 0;
  overflow: hidden;
}

.public-config, .component-config .panel {
  flex: 1;
  overflow-y: scroll;
}
.panel{
    background-color: #fff;
}
.panel-selector {
  z-index: 100;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.06);
  .radio-group {
    text-align: center;
    .radio-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10px;
      color: #999999;
      &.active {
        color: #212121;
        border-bottom: 2px solid #212121;
      }
    }
  }
}

.config-box {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0;
  padding: 14px 20px;
  .title {
    font-weight: bold;
    font-size: 0.86rem;
    margin-bottom: 12px;
  }
  .shadoeSize {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    .shadoeSizeInput {
      width: 30px;
      height: 20px;
      margin-left: 10px;
    }
  }
  .btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 5px 5px 5px 0;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #999;
    &:hover {
      cursor: pointer;
      background-color: rgba(64, 160, 255, 0.1);
      color: #666666;
    }
    &.active {
      background-color: rgba(64, 160, 255, 0.1);
      color: #409EFF;
    }
    .iconfont {
      font-size: 22px;
    }
  }
}

.component-config ::v-deep .jsoneditor-menu {
  display: none;
}

.num-input {
  .el-input-group__prepend {
    background-color: #ffffff !important;
  }
}

.code-box {
  width: 260px;
  max-height: 200px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 6px;
  overflow: scroll;
  box-sizing: border-box;
}

// image upload
.bg-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  width: 260px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.bg-uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.bg-preview-wrapper {
  width: 100%;
  height: 150px;
  .bg-preview {
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
// 画布大小
::v-deep .el-input-group__prepend{
  padding: 0 10px !important;
}
::v-deep .el-input__inner{
  padding: 0 5px !important;
}
</style>
