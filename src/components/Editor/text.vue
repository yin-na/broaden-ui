<template>
    <div class="panel" v-show="thisKey=='data'">
      <div class="text-tit" style="border-bottom: 1px solid #ebebeb;">
          <div class="txt-cont">编辑</div>
      </div>
      <!-- <div class="font-type">
          <div class="pic-type">
            <img src="@/assets/img/icon/left.png">
          </div>
          <div class="pic-type">
            <img src="@/assets/img/icon/center.png">
          </div>
          <div class="pic-type">
            <img src="@/assets/img/icon/right.png">
          </div>
          <div class="pic-type">
            <img src="@/assets/img/icon/to.png">
          </div>
      </div> -->
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
          <div class="title">文本编辑</div>
          <el-input v-model="currentElement.data.datacon.text"
            type="textarea"
            :rows="3"
            style="margin-bottom: 10px;">
          </el-input>
      </div>
      <div class="config-box">
          <div class="title">组件位置</div>
          <div class="font0-type">
            <div class="post-type">
              <span>X</span>
              <el-input v-model.number="currentElement.x" style="width:77px;margin-left: 10px"></el-input>
            </div>
            <div class="post-type">
              <span>Y</span>
              <el-input v-model.number="currentElement.y" style="width:77px;margin-left: 10px"></el-input>
            </div>
          </div>
          <div class="font0-type">
            <div class="post-type">
              <span>W</span>
              <el-input v-model.number="currentElement.w" style="width:77px;margin-left: 10px"></el-input>
            </div>
            <div class="post-type">
              <span>H</span>
              <el-input v-model.number="currentElement.h" style="width:77px;margin-left: 10px"></el-input>
            </div>
          </div>
        </div>
        <div class="config-box">
          <div class="title">字体字号</div>
          <el-select v-model="currentElement.data.datacon.fontFamily"
            placeholder="请选择"
            style="width: 100%; margin-bottom: 10px;">
            <el-option-group label="英文字体">
              <el-option label="Molengo" value="Molengo">
                <span :style="{fontFamily: 'Molengo'}">Molengo</span>
              </el-option>
              <el-option label="Lobster" value="Lobster">
                <span :style="{fontFamily: 'Lobster'}">Lobster</span>
              </el-option>
            </el-option-group>

            <el-option-group label="中文字体">
              <el-option label="思源黑体" value="Noto Sans SC">
                <span :style="{fontFamily: 'Noto Sans SC'}">思源黑体</span>
              </el-option>
              <el-option label="思源宋体" value="Noto Serif SC">
                <span :style="{fontFamily: 'Noto Serif SC'}">思源宋体</span>
              </el-option>
              <el-option label="站酷庆科黄油体" value="ZCOOL QingKe HuangYou">
                <span :style="{fontFamily: 'ZCOOL QingKe HuangYou'}">站酷庆科黄油体</span>
              </el-option>
              <el-option label="站酷小薇体" value="ZCOOL XiaoWei">
                <span :style="{fontFamily: 'ZCOOL XiaoWei'}">站酷小薇体</span>
              </el-option>
            </el-option-group>
          </el-select>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-color-picker v-model="currentElement.data.datacon.color" show-alpha></el-color-picker>
            </el-col>
            <el-col :span="20">
              <el-input v-model="currentElement.data.datacon.fontSize">
                <template slot="append">px</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="btn" :class="{active: currentElement.data.datacon.bold}" @click="currentElement.data.datacon.bold = !currentElement.data.datacon.bold">
                <i class="iconfont icon-bold"></i>
              </div>
              <div class="btn" :class="{active: currentElement.data.datacon.italic}" @click="currentElement.data.datacon.italic = !currentElement.data.datacon.italic">
                <i class="iconfont icon-italic"></i>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="config-box">
          <div class="title">
            描边
            <el-switch v-model="currentElement.data.datacon.stroke" style="float: right;"></el-switch>
          </div>
          <el-row :gutter="20" v-show="currentElement.data.datacon.stroke">
            <el-col :span="4">
              <el-color-picker v-model="currentElement.data.datacon.strokeColor"></el-color-picker>
            </el-col>
            <el-col :span="20">
              <el-input v-model="currentElement.data.datacon.strokeSize">
                <template slot="append">px</template>
              </el-input>
            </el-col>
          </el-row>
        </div>
        <div class="config-box">
          <div class="title">
            阴影
            <el-switch v-model="currentElement.data.datacon.shadow" style="float: right;"></el-switch>
          </div>
          <el-row :gutter="20" v-show="currentElement.data.datacon.shadow">
            <el-col :span="4">
              <el-color-picker v-model="currentElement.data.datacon.shadowColor"></el-color-picker>
            </el-col>
            <el-col :span="20">
              <el-input v-model="currentElement.data.datacon.shadowBlur">
                <template slot="append">px</template>
              </el-input>
            </el-col>
          </el-row>
        </div >
    </div>
</template>

<script>
/* eslint-disable */
import vueJsonEditor from 'vue-json-editor'
import {getConnectsList} from '@/api/chart/chart.js'
export default {
  props:["indexItem"],
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
      indexItem:{
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
      // console.log(res);
      this.currentElement.data.datacon.img = res.url
      // console.log(file);
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
  padding: 10px 20px;
  .title {
    font-weight: bold;
    font-size: 0.86rem;
    margin-bottom: 12px;
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

//  文字样式
.text-tit{
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  color: #332e2e;
  .txt-cont{
    height: 40px;
    line-height: 40px;
    border-bottom: 2px solid #747a7d;
    display: inline-block;
  }
}
.font-type{
  width: 80%;
  margin: 0 auto;
  height: 50px;
}
.pic-type{
  width: 25%;
  text-align: center;
  display: inline-block;
  padding-top: 11px;
  img{
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
}
.font0-type{
  width: 76%;
  margin-left: 24%;
}
.post-type{
  width: 50%;
  text-align: center;
  display: inline-block;
  ::v-deep .el-input__inner, .vue-treeselect__input{
    border-color: #fff;
  }
  ::v-deep .el-input__inner{
    padding: 0 !important;
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
