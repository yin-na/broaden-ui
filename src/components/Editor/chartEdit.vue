<template>
    <div class="panel" style="background: #fff">
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
          <div class="title">图表名称</div>
          <el-input v-model="currentElement.componentData.extend.title.text"></el-input>
        </div>
        <div class="config-box">
          <div class="title" style="margin-bottom: 0px !important;">组件位置</div>
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
              <el-input v-model.number="currentElement.w" style="width:75px;margin-left: 10px"></el-input>
            </div>
            <div class="post-type">
              <span>H</span>
              <el-input v-model.number="currentElement.h" style="width:77px;margin-left: 10px"></el-input>
            </div>
          </div>
        </div>
        <div class="config-box">
            <div class="title">数据配置</div>
            <el-select v-model="currentElement.data.datacon.type"
            placeholder="请选择"
            @change="handleChartDataChange"
            style="width: 100%;">
            <el-option label="静态JSON" value="raw"></el-option>
            <el-option label="GET接口" value="get"></el-option>
            </el-select>

            <div v-if="currentElement.data.datacon.type == 'raw'">

              <!-- 图表数据 编辑  -->
              <div @json-save="handleChartDataChange">

                <vue-scroll :ops="ops" style="width:100%;height: 350px;">

                <!-- 仪表盘 / 水球 -->
                <el-table
                  v-if="currentElement.data.settings.type == 'gauge' || currentElement.data.settings.type == 'liquidfill'"
                  :data="currentElement.data.generated.rows"
                  :header-cell-style="{fontSize:'14px',height:'30px'}"
                  :row-style="{height:'30px'}"
                  style="width: 100%;border-color: #999;font-size: 14px;">
                  <el-table-column
                    v-for="(item, index) in currentElement.data.generated.columns"
                    :key="item"
                    :label="item"
                    >
                    <template slot="header" slot-scope='scope'>
                      <input class="input-table" v-model="currentElement.data.generated.columns[index]"
                      @input="handelTableHeadChange(index,currentElement.data.generated.columns[index])"
                      @focus="getCurrentValue(currentElement.data.generated.columns[index])"/>
                    </template>
                    <template slot-scope="scope">
                      <input class="input-table" v-model="scope.row[item]" />
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 金字塔 / 饼图 / 环形 -->
                <el-table
                  v-else-if="currentElement.data.settings.type == 'funnel' || currentElement.data.settings.type == 'pie' || currentElement.data.settings.type == 'ring'"
                  :data="currentElement.data.generated.rows"
                  :header-cell-style="{fontSize:'14px',height:'30px'}"
                  :row-style="{height:'30px'}"
                  style="width: 100%;border-color: #999;font-size: 14px;">
                  <el-table-column
                    v-for="(item, index) in currentElement.data.generated.columns"
                    :key="item"
                    :label="item"
                    >
                    <template slot="header" slot-scope='scope'>
                      <input class="input-table" v-model="currentElement.data.generated.columns[index]"
                      @input="handelTableHeadChange(index,currentElement.data.generated.columns[index])"
                      @focus="getCurrentValue(currentElement.data.generated.columns[index])"/>
                    </template>
                    <template slot-scope="scope">
                      <input class="input-table" v-model="scope.row[item]" />
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span style="color:#2c75ef;font-size: 12px;cursor: pointer;text-align: center;display: block;" @click="(currentElement.data.generated.rows).splice(scope.$index,1)">删除行</span>
                    </template>
                  </el-table-column>
                </el-table>

                <el-table
                  v-else
                  :data="currentElement.data.generated.rows"
                  :header-cell-style="{fontSize:'14px',height:'30px'}"
                  :row-style="{height:'30px'}"
                  style="width: 100%;border-color: #999;font-size: 14px;">
                  <el-table-column
                    v-for="(item, index) in currentElement.data.generated.columns"
                    :key="item"
                    :label="item"
                    >
                    <template slot="header" slot-scope='scope'>
                      <span class="lieDel" @click="(currentElement.data.generated.columns).splice(index,1)">删除列</span>
                      <input class="input-table" v-model="currentElement.data.generated.columns[index]"
                      @input="handelTableHeadChange(index,currentElement.data.generated.columns[index])"
                      @focus="getCurrentValue(currentElement.data.generated.columns[index])"/>
                    </template>
                    <template slot-scope="scope">
                      <input class="input-table" v-model="scope.row[item]" />
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <span style="color:#2c75ef;font-size: 12px;cursor: pointer;text-align: center;display: block;" @click="(currentElement.data.generated.rows).splice(scope.$index,1)">删除行</span>
                    </template>
                  </el-table-column>
                </el-table>

                </vue-scroll>

                <!-- {{currentElement.data.settings.type}} -->
                <!-- 仪表盘 / 水球 -->
                <div class='tab-class' v-if="currentElement.data.settings.type == 'gauge' || currentElement.data.settings.type == 'liquidfill'">
                  <el-button size="small" type="primary" @click="saveTable(currentElement.data.generated)" :disabled="disabled">保存入库</el-button>
                </div>

                <!-- 金字塔 / 饼图 / 环形 -->
                <div class='tab-class' v-else-if="currentElement.data.settings.type == 'funnel' || currentElement.data.settings.type == 'pie' || currentElement.data.settings.type == 'ring'">
                  <el-button size="small" type="primary"  @click="addTableRow(currentElement.data.generated)">新增行</el-button>
                  <el-button size="small" type="primary" @click="saveTable(currentElement.data.generated)" :disabled="disabled">保存入库</el-button>
                </div>

                <div class='tab-class' v-else>
                  <el-button size="small" type="primary"  @click="addTableRow(currentElement.data.generated)">新增行</el-button>
                  <el-button size="small" type="primary"  @click="addTableColum(currentElement.data.generated)">新增列</el-button>
                  <el-button size="small" type="primary"  @click="saveTable(currentElement.data.generated)" :disabled="disabled">保存入库</el-button>
                </div>
              </div>

            </div>
            <el-input v-if="currentElement.data.datacon.type == 'get'"
            v-model="currentElement.data.datacon.getUrl"
            type="textarea"
            :rows="5"
            style="margin-bottom: 10px;">
            </el-input>
            <el-row v-if="currentElement.data.datacon.type == 'get'">
              <el-col :span="8">
                  <p style="margin-top: 8px;">刷新时间</p>
              </el-col>
              <el-col :span="16">
                  <el-input-number v-model="currentElement.data.datacon.interval"
                  :min="1"
                  :max="10"
                  @change="handleChartDataChange"
                  style="width: 80%;">
                  </el-input-number>
                  <span style="padding-left: 10px">秒</span>
              </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import {getConnectsList,addComponentsTables} from '@/api/chart/chart.js'
export default {
  props:["indexEchart"],
  data() {
    return {
      disabled:false,
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user'),
      },
      editorSettings: {
        parentBg: 0, // 0代表背景颜色，1代表背景图片
        parentBgUrl: '',
      },
      thisKey: 'general',
      connectList: [],
      tableTitle1:'',
      tableTitle2:'',
      currentValue:'',
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#C0C0C0', // 滚动条颜色
          opacity: 0.8, // 滚动条透明度
          'overflow-x': 'hidden'
        }
      }
    };
  },
  watch:{
   
  },
  props: {
      parentMsg: Number
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
    currentElement() {
      return this.$parent.currentElement;
    },
    formatedJSON() {
      return JSON.stringify(this.$parent.currentElement, null, 2);
    },
  },
  mounted() {

  },
  methods: {
     constdata: function (data) {  
         var obj={};  
         obj=JSON.parse(JSON.stringify(data)); //this.templateData是父组件传递的对象  
         return obj  
    }  ,
    handleScreenBgUploadSuccess(res, file) {
      this.chartData.bgimage = res.url;
    },
    handleScreenBgDelete() {
      this.chartData.bgimage = '';
    },
    handleChartDataChange() {
      this.$parent.generateData(this.currentElement);
    },
    // 数据绑定切换
    getCurrentValue(currentValue){
      this.currentValue=currentValue
    },
    // 数据编辑
    handelTableHeadChange(index,change){
      if(change===this.currentValue){
          return 
      }
      let tmp=this.currentElement.data.generated.rows
      let newArr = this.constdata(tmp);
      newArr.forEach((row,index1)=>{
        for (var key in row){
          // change 日期的key值
          const tmp_value=row[this.currentValue]
          // change 日期key
          row[change]=tmp_value
        }
      })
      newArr.forEach((row1,index2)=>{
        delete row1[this.currentValue]
      })
      this.currentElement.data.generated.rows=newArr
      this.currentValue=change
    },
    // 新增 
    addTableRow (data) {
      var tempList = {};
      for (var a=0; a < data.columns.length; a++) {
        tempList[data.columns[a]] = ''
      }
      let bbb = this.constdata(tempList)
      data.rows.push(bbb)
    },
    addTableColum() {
      let index = this.currentElement.data.generated.columns.length + 1;
      this.currentElement.data.generated.columns.push("新增列" + index);
    },
    // 组件列表查询
    // initData () {
    //   getComponents({}).then(res => {
    //     this.Listy = res.data
    //   })
    // },
    // 保存
    saveTable(){
      this.disabled=true
      addComponentsTables(this.currentElement).then(res=>{
        if(res.code==0){
          this.currentElement.tableName=res.data.tableName
        this.currentElement.componentId=res.data.componentId
        this.$message.success("保存数据成功")
              this.disabled=false
        // this.initData()
        }else{
        this.$message.error('保存数据失败');
              this.disabled=false
        }
      
      })
    }


  },
};
</script>

<style lang="scss" scoped>
// 滚动条
::-webkit-scrollbar{
  width: 8px;
}
/* 垂直滚动条的滑动块 */
::-webkit-scrollbar-thumb:vertical {
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color:#E0E0E0;
}

::-webkit-scrollbar-track {
  border: none;
  border-radius: 10px;
  background: none;
}
::-webkit-scrollbar-thumb {
  border: 1px #E0E0E0 solid;
  border-radius: 10px;
  background: #E0E0E0;
}


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
// 表格编辑
.tab-class{
  text-align: center;
  margin-top: 20px;
}
.input-table{
  height: 28px;
  width: 100%;
  border: none;
  text-align: center;
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
  padding: 8px 20px;
  // 编辑表格样式 
  ::v-deep.el-table td, .el-table th{
    padding: 5px 0;
  }
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
.disp{
  display: none !important;
  width: 0;
}
.lieDel{
  color:#2c75ef;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  display: block;
}

// 画布大小
::v-deep .el-input-group__prepend{
  padding: 0 10px !important;
}
::v-deep .el-input__inner{
  padding: 0 5px !important;
}
</style>
