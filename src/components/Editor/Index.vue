<template>
  <div class="editor-view">
    <!-- <div class="topbar-view">
      <Topbar />
    </div> -->
    <div class="toolbar-view" v-show="!preview">
      <Toolbar ref="headerChild"/>
    </div>
    <!-- <div class="config-view" v-show="!preview">
      <Config />
    </div> -->
    <!-- <div class="scale-view" :class="{preview: preview}">
      <ScaleBar @update:scale="changeScale" />
    </div> -->
    <div class="main-view">
      <!-- <div class="mian-tit">
        <img src="@/assets/logo/logo-tit.png">
      </div> -->
        <router-view :scale="scale" ref="screenContainer"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import Topbar from "./Topbar.vue";
import Toolbar from "./Toolbar.vue";
// import Config from "./Config.vue";
// import ScaleBar from "./ScaleBar.vue";
import html2canvas from "html2canvas";
import { getChart, renameChart, getConnects, getSingleChart, saveChart } from "@/api/chart/chart.js";
var interval;

export default {
  components: {
    // Topbar,
    Toolbar,
    // Config,
    // ScaleBar
  },
  data() {
    return {
      clientHeight: 0,
      title: "",
      scale: 0.7,
      preview: false,
      chartId:"",
      chartData: {
        largeScreen: '',
        elements: []
      },
      compentId: '', // 请求模板数据的id
      publishPopVisible: false,
      currentElementIndex: -1
    };
  },
  computed: {
    currentElement() {
      if (this.currentElementIndex >= 0) {
        return this.chartData.elements[this.currentElementIndex];
      }
      return {};
    }
  },
  mounted() {
    // 高度问题
    // var clientHeight = window.innerHeight || document.documentElement.clientHeight
    // this.clientHeight = clientHeight
    this.initData()
  },
  beforeDestroy() {
    clearInterval(interval);
  },
  methods: {
    initData (compentId) {
      if (compentId != undefined) {
        getChart(compentId).then(res => {
          console.log('切换成功')
          const { errno, data } = res;
          if (errno === 0) {
            this.title = data.title;
            this.chartData = data.chartData;
            this.chartId=data.id;
          }
        })
      } else {
        if(this.$route.params.id){
          getChart(this.$route.params.id).then(res => {
            console.log('没切换')
            const { errno, data } = res;
            if (errno === 0) {
              this.title = data.title;
              this.chartData = data.chartData;
              this.chartId=data.id;
            }
          })
        } else{
          getSingleChart().then(res => {
            const { errno, data } = res;
            if (errno === 0) {
              this.title = data.title;
              this.chartData = data.chartData;
              this.chartId=data.id;
            }
          })
        }
      }
    },
    changeScale(scale) {
      this.scale = scale;
    },
    setActiveComponentByIndex(index) {
      this.currentElementIndex = index;
      for (let i = 0; i < this.chartData.elements.length; i += 1) {
        const element = this.chartData.elements[i];
        if (index === i) {
          element.active = true;
        } else {
          element.active = false;
        }
      }
    },
    addComponent(data) {
      this.chartData.elements.unshift(data);
    },
    deleteComponent(index) {
      this.chartData.elements.splice(index, 1);
    },
    deleteComponentUpdate(index,data){
        this.chartData.elements.splice(index, 1,data);
    },
    // 发布模板
    saveChartData() {
      const screenshot = this.generateScreenShot().then(url => {
        renameChart(this.chartId, {
          img: url,
          chartData: this.chartData
        })
          .then(res => {
            const { errno, data } = res;
            if (errno === 0) {
              this.publishPopVisible = true;
              this.$message({
                type: "success",
                message: "发布成功"
              });
            }
          })
          .catch(() => {});
      });
    },
    // 保存模板数据（不会发布）
    releaseChartData() {
      const screenshot = this.generateScreenShot().then(url => {
        saveChart(this.chartId, {
          img: url,
          chartData: this.chartData
        })
          .then(res => {
            const { errno, data } = res;
            if (errno === 0) {
              this.$refs.headerChild.$refs.headerChild.initData()
              this.$message({
                type: "success",
                message: "保存成功"
              });
            }
          })
          .catch(() => {});
      });
    },
    // 生成数据
    generateData(item) {
      if (item.data.datacon.type == "raw") {
        item.data.generated = item.data.datacon.data;
      } else if (item.data.datacon.type == "get") {
        clearInterval(interval);
        let time = item.data.datacon.interval ? item.data.datacon.interval : 1;
        interval = setInterval(() => {
          this.$http
            .get(item.data.datacon.getUrl)
            .then(res => {
              item.data.generated = res.data;
            })
            .catch(() => {});0
        }, time * 1000);
      }
    },
    // 到屏幕
    generateScreenShot() {
      let that = this;
      return new Promise(function(resolve, reject) {
        let screenRef = that.$refs["screenContainer"].$refs["screen"];
        html2canvas(screenRef, {
          backgroundColor: "#142E48"
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.topbar-view {
  position: absolute;
  height: 60px;
  width: 100%;
  z-index: 1000;
}

.toolbar-view {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  bottom: 0;
  z-index: 1000;
}

.config-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  bottom: 0;
  z-index: 1000;
}

.scale-view {
  position: absolute;
  right: 316px;
  bottom: 16px;
  z-index: 1000;
  &.preview {
    right: 40px;
  }
}

.main-view {
  // background: #eeeeee;
  // padding: 0 80px 0 0;
  overflow: hidden;
  height: 100%;
  .mian-tit{
    background: #07122d;
    img{
      width: 100%;
      height: 80px;
    }
  }
}
</style>
