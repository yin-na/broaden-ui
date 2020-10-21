<template>
  <div class="panel">
    <!-- 标题 -->
    <!-- <div class="title" v-if="panelKey === 'layers'">
      <span>图层</span>
    </div> -->
    <div class="title" v-if="panelKey !== '' && panelKey != 'bigSeek'">
      <span>{{Listy[panelKey].name}}</span>
    </div>
    <div class="title" v-else-if="panelKey == 'text'">
      <span>文字</span>
    </div>
    <div class="title" v-else-if="panelKey == 'bigSeek'">
      <span>自定义模板</span>
    </div>

    <!-- 图表面板 -->
    <div class="layer-list" v-if="panelKey === 'layers'">
      <draggable
        v-model="chartData.elements"
        @start="handleLayerListDragStart"
        @end="handleLayerListDragEnd"
        ghost-class="ghost"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="list-item"
            v-for="(item, index) in chartData.elements"
            :key="item.name"
            @click="$parent.$parent.setActiveComponentByIndex(index)"
            :class="{active: index === $parent.$parent.currentElementIndex}"
            >
            <div class="name">{{item.name}}</div>
            <i class="el-icon-delete icon" @click="handleDeleteComponent(index)"></i>
          </div>
        </transition-group>
      </draggable>
    </div>

    <!--  图表面板  -->
    <div class="component-list" v-else-if="panelKey !== '' && panelKey !== 'bigSeek'">
      <!-- 搜索 -->
      <div class="component-search">
          <el-input placeholder="搜索组件名称" v-model="input"></el-input>
          <el-button icon="el-icon-search" @click="search()"></el-button>
      </div>

      <!--  折叠面板 -->
      <keep-alive>
        <div class="zheDei">
          <template v-for="item in Listy[panelKey].componentList">
            <Collapse active-key="1" accordion :key="item.type">
              <Panel :key="item.type">
                {{item.name}} ({{item.children.length}})
                <!-- 展开内容 -->

                <!--  上传图片  -->
                <div slot="content" v-if="item.type == 'picture'">
                   <div v-if="item.displayType == 'my'">
                    <Upload :action="uploadurl" :headers="headers" :before-upload="handleUploadImage" :on-success="handleSuccess" :show-upload-list="false">
                        <i-button type="primary" icon="ios-cloud-upload-outline">上传图片</i-button>
                    </Upload>
                  </div>
                   <div
                    class="list-item"
                    v-for="items in item.children"
                    :key="items.key"
                    style="position: relative;">
                    <i class="el-icon-delete pic-img" style="color:red;" v-if="item.displayType == 'my'"  @click="deleteComponentById(items.id)"></i>
                    <div class="img-wrapper" @click="handleAddComponent(items)">
                      <img :src="items.img" />
              
                    </div>
                    <div class="name">{{items.name}}</div>
                  </div>
                </div>

                <!--  上传视频  -->
                <div slot="content" v-else-if="item.type == 'video'">
                  <div v-if="item.displayType == 'my'">
                    <Upload :action="uploadurl" :headers="headers" :before-upload="handleUploadVideo" :on-success="handleSuccessVideo" :show-upload-list="false">
                        <i-button type="primary" icon="ios-cloud-upload-outline">上传视频</i-button>
                    </Upload>
                  </div>
                  <div
                    class="list-item"
                    v-for="items in item.children"
                    :key="items.key"
                    style="position: relative;"
                  >
                  <i class="el-icon-delete pic-img" style="color:red;" v-if="item.displayType == 'my'"  @click="deleteComponentById(items.id)"></i>
                    <div class="img-wrapper"   @click="handleAddComponent(items)">
                      <img :src="getImgurl(items.img)" />
                    </div>
                    <div class="name">{{items.name}}</div>
                  </div>
                </div>
               <!--  上传表格  -->
                <div slot="content" v-else-if="item.type == 'table'">
                  <div>
                    <Upload :action="excelUploadUrl" :headers="headers" :before-upload="handleUploadExcel" :on-success="handleSuccessExcel" :show-upload-list="false">
                        <i-button type="primary" icon="ios-cloud-upload-outline">上传表格</i-button>
                    </Upload>
                  </div>
                  <div
                    class="list-item"
                    v-for="items in item.children"
                    :key="items.key"
                    style="position: relative;"
                  >
                    <i class="el-icon-delete pic-img" style="color:red;" v-if="item.displayType == 'my'"  @click="deleteComponentById(items.id)"></i>
                    <div class="img-wrapper"   @click="handleAddComponent(items)">
                      <img :src="getImgurl(items.img)" />
                    </div>
                    <div class="name">{{items.name}}</div>
                  </div>
                </div>
                 <div slot="content" v-else-if="item.type == 'monitor'">
                  <div
                    class="list-item"
                    v-for="items in item.children"
                    :key="items.key"
                    style="position: relative;"
                    >
                  <i class="el-icon-delete pic-img" style="color:red;" v-if="item.displayType == 'my'"  @click="deleteComponentById(items.id)"></i>
                    <div class="img-wrapper" @click="handleAddComponent(items)">
                      <img :src="getImgurl(items.img)" />
                    </div>
                    <div class="name">{{items.name}}</div>
                  </div>
                </div>
                <!-- 其他（不需要上传）  -->
                <div slot="content" v-else>
                  <div
                    class="list-item"
                    v-for="items in item.children"
                    :key="items.key"
                    @click="handleAddComponent(items)">
                    <div class="img-wrapper">
                      <img :src="getImgurl(items.img)" />
                    </div>
                    <div class="name">{{items.name}}</div>
                  </div>
                </div>

              </Panel>
            </Collapse>
          </template>
        </div>
      </keep-alive>

    </div>

    <!-- 自定义大屏模板组件 -->
    <div class="component-list zheDei" v-else-if="panelKey !== '' && panelKey === 'bigSeek'">
      <div v-for="(item, index) in chartList" :key="index" class="tempList" @click="ecartType(item)">
        <span v-if="item.type == '0'">{{item.title}}</span>
        <span v-else @click="editTest(item)">{{item.title}}</span>
        <img class="post" v-if="item.img != null" :src="item.img" style="width:100%;height:100%">
        <img class="post" v-else :src="tempImg" style="width:100%;height:100%">
      </div>
      <div class="add" @click="addTemplate()">
        <img src="@/assets/bigEacharts/add.png">
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getComponents, addComponents,deleteComponent, getList, createChart, copyModelChart, updateName } from '@/api/chart/chart'
import Config from '@/config'
import { getToken } from '@/utils/auth'

export default {
  props: ["panelKey"],
  components: {
    draggable
  },
  data () {
    return {
      drag: false,
      headers:{},
      compentId: '',  // 请求数据的模板id
      input: '',
      tempImg: require("@/assets/bigEacharts/temp-bg.png"), // 模板默认图
      typeList: [],
      chartList: [],
      file: '',
      uploadurl: Config.baseUrl.prod+"/resource/uploadFile",
      excelUploadUrl:Config.baseUrl.prod+"/component/addTableComponents",
      Listy: {
        componentList: {
          type: '',
          name: '',
          children: ''
        }
      },

      layerList: [],
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
    }
  },
  computed: {
    chartData () {
      return this.$parent.chartData
    }
  },
  created () {
    this.initData()
     this.headers = {
      Authorization: "Bearer " + getToken(),
      "Access-Control-Allow-Credentials": true
    };
  },
  methods: {
    // 组件列表查询
    initData () {
      getComponents({}).then(res => {
        this.Listy = res.data
      })
      // 自定义组件列表
      getList().then(res => {
        this.chartList = res.data.chartList
      })
    },
    // 查询
    search () {
      let that = this
      getComponents({
        name: that.input
      }).then(res => {
        that.Listy = res.data
      })
    },
    // 上传成功后
    handleSuccess (response, file, fileList) {
      let url=response.data.url
      this.addComponent('image','图片组件','picture',url,url)
    },

    handleSuccessVideo (response, file, fileList){
      let url=response.data.url
      this.addComponent('video','视频组件','video','image.png',url,url)
    },
    // 编辑模板标题
    editTest (list) {
      this.$prompt('请修改您的模板标题 (必填)', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: list.title,
        inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,10}$/,
        inputErrorMessage: '请输入1-10位字母、数字、汉字（不能为空和特殊符号）'
      }).then(({ value }) => {
        console.log(value, '022')
        updateName(list.id, value).then(res => {
          this.initData()
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });       
      })
    },
    // 新增大屏自定义模板
    ecartType (chartDataList) {
      if (chartDataList.type == '0') {
        // 调用复制模板接口
        this.copyCompent(chartDataList.id)
      } else {
        this.editCompent(chartDataList.id)
      }
    },
    // 复制模板判断type类型为0复制（type：0模板 1自定义可直接点击进去）
    copyCompent (compentId) {
      this.$confirm('模板不可修改，是否确认复制当前模板进行编辑？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        copyModelChart(compentId).then(res => {
          this.compentId = res.data
          this.initData()
          this.$parent.$parent.initData(this.compentId)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 编辑模板
    editCompent (compentId) {
      this.$parent.$parent.initData(compentId)
    },
    // 新增模板
    addTemplate () {
      this.$prompt('请输入模板标题 (必填)', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,10}$/,
        inputErrorMessage: '请输入1-10位字母、数字、汉字（不能为空和特殊符号）'
      }).then(({ value }) => {
        createChart({
          title: value,
          img: ''
        }).then(res => {
          this.initData()
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });       
      })
    },
    handleSuccessExcel(response,file,fileList){
        let that = this
        if(response.data==true){
          that.initData()
           this.$message({
              showClose: true,
              message: '组件添加成功，请在我的组件中使用',
              type: 'success'
            });
       }else{
          this.$message({
              showClose: true,
              message: response.message,
              type: 'error'
            });
       }
    },
    // 添加组件
    addComponent(type,name,componentType,img,data,video){
      let component={
        type:type,
        name:name,
        componentType:componentType,
        img:img,
        data:data,
        video:video
      }
      addComponents(component).then(res=>{
       let that = this
       if(res.code==0){
          that.initData()
       }
      })
    },
    // 删除组件
    deleteComponentById(id){
      let data={
        componentId:id
      }
      deleteComponent(data).then(res=>{
        let that = this
        if(res.code==0){
          that.initData()
       }
      })
    },
    // 文件上传 ，校验格式
    handleUploadImage (file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isAudio = file.type === "audio/mp3";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      if (!isPNG && !isJPG) {
        this.$message.error("请上传格式是PNG或JPG的文件!");
        return false;
      }
    },

     // 视频上传 ，校验格式
    handleUploadVideo(file){
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isAudio = file.type === "audio/mp3";
      const isLt2M = file.size / 1024 / 1024 < 500;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 500MB!");
        return false;
      }
      // if (!isPNG && !isJPG) {
      //   this.$message.error("请上传格式是PNG或JPG的文件!");
      //   return false;
      // }
    },
    handleUploadExcel(file){
       const isLt2M = file.size / 1024 / 1024 < 3;
       const isExcel = file.type==="application/vnd.ms-excel"
      //  if(!isExcel){
      //   this.$message.error("请上传excel 文件!");
      //   return false;
      //  }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 3MB!");
        return false;
      }

    },
    getImgurl (src) {
      return require('@/assets/img/charts/' + src)
    },
    handleLayerListDragStart (e) {
      this.drag = true
      this.$parent.$parent.setActiveComponentByIndex(e.oldIndex);
    },
    handleLayerListDragEnd (e) {
      this.drag = false
      this.$parent.$parent.setActiveComponentByIndex(e.newIndex);
    },
    handleAddComponent (item) {
      let initData = {}
      if (item.type == "text") {
        initData = {
          type: "text",
          datacon: {
            text: "请输入文字",
            color: "#fff",
            fontSize: 48,
            fontFamily: "ZCOOL QingKe HuangYou",
            bold: false,
            italic: false,
            stroke: false,
            strokeColor: "#ffffff",
            strokeSize: 2,
            shadow: false,
            shadowColor: "#ff0000",
            shadowBlur: 10
          }
        };
      } else if (item.type == "image") {
        initData = {
          type: "image",
          datacon: {
            img: item.img,
            imgSize: "cover",
            opacity: 1
          }
        };
      } else if (item.type == "video") {
        initData = {
          type: "video",
          datacon: {
            video: item.video,
            imgSize: "cover",
            opacity: 1
          }
        };
      } else if (item.componentType == "border") {
        initData = {
          type: "border",
          datacon: {
            type: item.type,
            connectId: "",
            data: 1
          }
        }
      } else if (item.type == 'table') {
        initData = {
          type: 'table',
          datacon: {
            id: '',
            data: JSON.parse(item.data)
          }
        }
        // 图表初始化数据（仪表盘
      } else if (item.type == 'gauge' &&item.source=="0") {
        initData = {
          type: "chart",
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {
              columns: ['type', 'value'],
              rows: [
                { type: '预警值', value: 80 }
              ]
            },
            getUrl: "",
            interval: 2
          },
          generated: {
            columns: ['type', 'value'],
            rows: [
              { type: '预警值', value: 80 }
            ]
          }
        }
        // 水球
      } else if (item.type == 'liquidfill' && item.source=="0") {
        initData = {
          type: "chart",
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {
              columns: ['type', 'value'],
              rows: [
                { type: '占比', value: 0.5 }
              ]
            },
            getUrl: "",
            interval: 2
          },
          generated: {
            columns: ['type', 'value'],
            rows: [
              { type: '占比', value: 0.5 }
            ]
          }
        }
        // 地图
      } else if (item.type == 'map' && item.source=="0") {
        initData = {
          type: "chart",
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {
              columns: ['位置', '收入', '人口'],
              rows: [
                { '位置': '山东', '收入': 1235, '人口': 1233 },
                { '位置': '北京', '收入': 1223, '人口': 2123 },
                { '位置': '上海', '收入': 2123, '人口': 1243 },
                { '位置': '广州', '收入': 4123, '人口': 5123 }
              ]
            },
            getUrl: "",
            interval: 2
          },
          generated: {
             columns: ['位置', '收入', '人口'],
              rows: [
                { '位置': '山东', '收入': 1235, '人口': 1233 },
                { '位置': '北京', '收入': 1223, '人口': 2123 },
                { '位置': '上海', '收入': 2123, '人口': 1243 },
                { '位置': '广州', '收入': 4123, '人口': 5123 }
              ]
          }
        }
        // 雷达
      } else if (item.type == 'radar' &&item.source=="0") {
        initData = {
          type: "chart",
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {
              columns: ['日期', '访问用户', '下单用户', '下单率'],
              rows: [
                { '日期': '7月1日', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                { '日期': '7月2日', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                { '日期': '7月3日', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 }
              ]
            },
            getUrl: "",
            interval: 2
          },
          generated: {
            columns: ['日期', '访问用户', '下单用户', '下单率'],
            rows: [
              { '日期': '7月1日', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
              { '日期': '7月2日', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
              { '日期': '7月3日', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 }
            ]
          }
        }
      } else if (item.type=="active_ring"||item.type=="capsule_chart"||item.type=="scroll_chart"){
          initData = {
          type: "chart",
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {
             data: [
                {
                  name: '济南',
                  value: 55
                },
                {
                  name: '德州',
                  value: 120
                },
                {
                  name: '青岛',
                  value: 78
                },
                {
                  name: '烟台',
                  value: 66
                },
                {
                  name: '临沂',
                  value: 80
                }
              ]
            },
            getUrl: "",
            interval: 2
          },
          generated: {
           data: [
            {
              name: '济南',
              value: 55
            },
            {
              name: '德州',
              value: 120
            },
            {
              name: '青岛',
              value: 78
            },
            {
              name: '烟台',
              value: 66
            },
            {
              name: '临沂',
              value: 80
            }
          ]
          }
        }
      } else if(item.type=="water_level"){
          initData = {
          type: "chart",
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {
             data: [66]
            },
            getUrl: "",
            interval: 2
          },
          generated: {
           data: [66]
          }
        }
      }
       else if (item.type == "rectangle" || item.type == "square" || item.type == "ellipse") {
        initData = {
          type: item.type,
          settings: {
            type: item.type
          },
          datacon: {
            type: "raw",
            connectId: "",
            data: {},
            getUrl: "",
            interval: 2
          }
        }
      }else if (item.type == "text-h" || item.type == "text-z") {
          initData = {
            type: item.type,
            settings: {
              type: item.type
            },
            font: {
              fontLeft: '标题',
              fintRight: '数字',
              fontFamily: 'Molengo',
              color: '',
              fontSize: '20',
              bold: false,
              italic: false,
            },
            datacon: {
              type: "raw",
              connectId: "",
              data: {},
              getUrl: "",
              interval: 2
            }
          }
      }else if(item.type=='datamap'){
          initData = {
            type: item.type,
            settings: {
              type: item.type
            },
            datacon: {
              type: "raw",
              connectId: "",
              data: {},
              getUrl: "",
              interval: 2
            }
          }
      }
      else {
        if (item.source=="1") {
          initData = {
            type: "chart",
            settings: {
              type: item.type
            },
            datacon: {
              type: "raw",
              connectId: "",
              data: JSON.parse(item.data),
              getUrl: "",
              interval: 2
            },
            generated: JSON.parse(item.data)
          }
        } else {
          initData = {
            type: "chart",
            settings: {
              type: item.type
            },
            datacon: {
              type: "raw",
              connectId: "",
              data: {
                columns: ["日期", "访问用户"],
                rows: [
                  { 日期: "1月1日", 访问用户: 1523 },
                  { 日期: "1月2日", 访问用户: 1223 },
                  { 日期: "1月3日", 访问用户: 2123 },
                  { 日期: "1月4日", 访问用户: 4123 }
                ]
              },
              getUrl: "",
              interval: 2
            },
            generated: {
              columns: ["日期", "访问用户"],
              rows: [
                { 日期: "1月1日", 访问用户: 1523 },
                { 日期: "1月2日", 访问用户: 1223 },
                { 日期: "1月3日", 访问用户: 2123 },
                { 日期: "1月4日", 访问用户: 4123 }
              ]
            }
          }
        }
      };

      // 饼图
       let pieDate ={}
       let ringDate = {}
       let gaugeDate = {}
      if(initData.settings){
        pieDate= {
          chartSettings: {
            radius: initData.settings.type === 'pie' ? 80 : 0
          }
        }
        ringDate = {
          chartSettings: {
            radius: initData.settings.type === 'ring' ? [80, 60] : [0, 0]
          }
        }
        gaugeDate = {
          chartSettings: {
            seriesMap: {
              axisLine: {
                lineStyle: {
                  color: [[0.8, 'red'],[0.82, '#1e90ff'],[1, '#ff4500']],
                  shadowColor: '#fff',
                  shadowBlur: 10
                }
              },
            }
          }
        }
      }
      // 图表名称
        let componentData = {
          extend: {
            title: {
              text: item.name,
              //调整样式
              textStyle: {
                fontSize: 20,
                fontWeight: 'normal',
                color: '#fff'
              }
            },
            'xAxis.0.axisLabel.rotate': 45, // x轴文本倾斜
            'xAxis.0.axisLabel.color': 'white', // x轴文本颜色
            'yAxis.0.axisLabel.color': 'white', // y轴文本改变颜色
            legend: {
              textStyle: {
                color: 'white'
              }
            }
          }
        }


     let component = {
          name: "新建图层" + (this.chartData.elements.length + 1),
          x: 10,
          y: 10,
          w: 400,
          h: 200,
          guide: false,
          bgcolor: "rgba(0, 0, 0, 0)",
          shadoeTop: 0,
          shadoeRight: 0,
          shadoeBottom: 0,
          shadoeLeft: 0,
          shadoeColor: '',
          borderRadius: 0,
          active: false,
          data: initData,
          pieRadio: pieDate,
          ringRadio: ringDate,
          // gaugeDates: gaugeDate,
          componentId: item.id,
          componentData: componentData,
          tableName: item.tableName ? item.tableName : '',
          componentType: item.componentType
        };
      // 正方形的尺寸
      // if (initData.settings.type === 'pie') {
      //   component.chartSettings.radius = 50;
      // }
      if (initData.type == "square" || initData.type == "ellipse") {
        component.w = 300;
        component.h = 300;
        component.bgcolor = "#3355df";
        // 椭圆形
        if (initData.type == "ellipse") {
          component.pieRadio = 50;
          component.borderRadius = 50;
        }
      }
      if (initData.type == "rectangle") {
        component.bgcolor = "#3355df";
      }
      if (initData.type == "text-h" || initData.type == "text-z") {
        component.w = 200;
        component.h = 70;
        component.bgcolor = 'rgba(116, 131, 235, 1)'
      }
      console.log(component)
      this.$parent.$parent.addComponent(component);

      let data = JSON.parse(localStorage.getItem('dataRevoke'));
        data.push(this.$parent.chartData);
        localStorage.setItem('dataRevoke', JSON.stringify(data))
    },
    handleDeleteComponent(index) {
      this.$parent.$parent.deleteComponent(index);
    }
  }
}
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

.panel {
  // height: 80%;
  width: 265px;
  display: flex;
  flex-direction: column;
  // background: #ffffffe9;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 4px 0 4px #00000005;
}
.title {
  color: #393838;
  padding: 10px 16px 10px;
  background: #e1e1e1;
  font-size: 18px;
}
.component-list {
  // flex: 1;
  background: #d3d5da;
  // padding: 0 10px 0 16px;
  // overflow: scroll;  // 滚动条
  .zheDei{
    height: 635px;
    overflow: auto;
  }
  //  搜索
  .component-search{
    padding: 3% 3%;
    display: block;
    ::v-deep .el-input__inner, .vue-treeselect__input{
      border-color: #d3d5da !important;
      height: 30px !important;
      line-height: 30px !important;
      background: #e1e1e1;
    }
    ::v-deep .el-input{
      width: 210px;
    }
    ::v-deep .el-button{
      height: 30px !important;
      width: 30px;
      line-height: 30px !important;
      margin-left: 8px;
      background: #e1e1e1;
      padding: 0;
    }
  }

  // 折叠面板
  ::v-deep .ivu-collapse{
    background: #d3d5da;
    border: none;
  }
  ::v-deep .ivu-collapse-content{
    background: #d3d5da;
  }
  ::v-deep .ivu-collapse>.ivu-collapse-item{
    border: none;
  }
  ::v-deep .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header{
    border: none;
  }
  ::v-deep .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
    border: none;
  }

  .list-item {
    display: inline-block;
    width: 72px;
    background: rgba(64, 160, 255, 0.06);
    border: 1px solid rgba(64, 160, 255, 0.1);
    margin-right: 3px;
    margin-bottom: 4px;
    opacity: 0.6;
    transition: opacity, background 0.3s ease;
    text-align: center;
    padding: 3px 0;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background: rgba(64, 160, 255, 0.1);
      border: 1px solid #409eff;
      .name {
        color: #666666;
      }
    }

    .img-wrapper {
      display: flex;
      width: 100%;
      height: 80px;
      align-items: center;
      justify-content: center;
      img {
        height: 54px;
        width: 100%;
      }
    }

    .name {
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: #777777;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}

.layer-list {
  flex: 1;
  padding: 0;
  overflow: scroll;

  .list-item {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    transition: background 0.3s ease;
    border-top: 1px solid rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    border-right: 6px solid transparent;
    margin-bottom: -1px;
    padding: 0 16px;
    box-sizing: border-box;

    &.active {
      background: rgba(64, 160, 255, 0.06);
      border-right: 6px solid #409eff7d;
    }

    &:hover {
      opacity: 1;
      background: rgba(64, 160, 255, 0.06);

      .icon {
        opacity: 1;
      }
    }

    .name {
      flex: 1;
      color: #777777;
    }

    .icon {
      float: right;
      color: #999999;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.3s ease;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
.pic-img{
  position: absolute;
  right: 2px;
  top: 20px;
}

// 组件模板
.tempList{
  width: 200px;
  height: 120px;
  margin: 25px auto;
  position: relative;
  cursor: pointer;
  img{
    width: 100%;
    height: 100%;
  }
  .post{
    position: absolute;
    top:0;
    left: 0;
  }
  span{
    position: relative;
    top: 50px;
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 20px;
    color: #fff;
    font-size: 16px;
    z-index: 6666;
  }
}
.add{
  text-align: center;
  display: block;
  padding-bottom: 15px;
  cursor: pointer;
  img{
    width: 35px;
    height: 35px;
  }
}
.zheDei{
  height: 635px;
  overflow: auto;
}
.ivu-btn:hover {
  color:cadetblue
}
.ivu-btn-primary {
  color:cadetblue
}
</style>
