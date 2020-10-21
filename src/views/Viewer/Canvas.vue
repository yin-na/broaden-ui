<template>
  <div>
    <!-- <div class="enter-fullscreen" @click="toggleFullscreen(document)">
      切换全屏状态
    </div> -->
    <div class="main-view">
      <div class="operation">
        <!-- <i @click="operation('/monitor')" class="el-icon-video-camera" style="margin-right: 10px;"></i>
        <i @click="operation('/editDetail')" class="el-icon-s-tools"></i> -->
        <!-- 点击全屏按钮 -->
        <img src="@/assets/img/icon/big.png" alt="" @click="toggleFullscreen(document)">
        <!-- <img src="@/assets/img/icon/setUp.png" @click="operation('/editDetail')" alt=""> -->
      </div>
    <!-- <div class="mian-tit">
        <img src="@/assets/logo/logo-tit.png">
      </div> -->
    <div class="screen" :style="screenStyle" @click.self="handleActivated(-1)" ref="screen">
      <div class="component"
        v-for="(item, index) in chartData.elements"
        :key="index"
        :style="{width: item.w + 'px', height: item.h + 'px', left: item.x + 'px', top: item.y + 'px', zIndex: chartData.elements.length - index}">

        <!-- 图表 -->
        <div class="filler" v-if="item.data.type == 'chart'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
          <dv-border-box-7 :color="['#1d2d52', '#41accb']" style="padding:10px" :style="{width: item.w + 'px', height: item.h + 'px'}">
          <!-- 地图 -->
          <ve-map v-if="item.data.settings.type=='map'"
            :width="(item.w-20) + 'px'"
            :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            :settings="item.data.settings"
            @ready-once="generateData(item)"
            >
          </ve-map>
          <!-- 雷达 -->
          <ve-radar v-else-if="item.data.settings.type=='radar'"
            :width="(item.w-20) + 'px'"
            :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            @ready-once="generateData(item)">
            </ve-radar>
            <!-- 水球 -->
          <ve-liquidfill v-else-if="item.data.settings.type=='liquidfill'"
            :width="(item.w-20) + 'px'"
              :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            @ready-once="generateData(item)">
          </ve-liquidfill>
          <!-- 散点 -->
          <ve-scatter v-else-if="item.data.settings.type=='scatter'"
            :width="(item.w-20) + 'px'"
            :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            @ready-once="generateData(item)"
            >
          </ve-scatter>
          <!-- 地图 -->
           <ve-wordcloud v-else-if="item.data.settings.type=='wordcloud'"
            :width="(item.w-20) + 'px'"
            :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            @ready-once="generateData(item)">
          </ve-wordcloud>
          <!-- 仪表盘 -->
          <ve-gauge v-else-if="item.data.settings.type=='gauge'"
            :width="(item.w-20) + 'px'"
            :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            @ready-once="generateData(item)"
            >
          </ve-gauge>
             <!-- 饼图 -->
                <ve-pie v-else-if="item.data.settings.type=='pie'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :top="(item.y+80) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  :settings="item.pieRadio.chartSettings"
                  @ready-once="generateData(item)">
                </ve-pie>
                <!-- 环形图 :extend="chartExtend" -->
                <ve-ring v-else-if="item.data.settings.type=='ring'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :top="(item.y+80) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  :settings="item.ringRadio.chartSettings"
                  @ready-once="generateData(item)">
                </ve-ring>
                 <!--  动态环形图 20201013 duziqiang  add -->
                <dv-active-ring-chart v-else-if="item.data.settings.type=='active_ring'" :config="item.data.generated"  :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}"/>
                <!--  胶囊柱图  -->
                <dv-capsule-chart  v-else-if="item.data.settings.type=='capsule_chart'" :config="item.data.generated" :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}" />
                <!-- 水位图 -->
                <dv-water-level-pond  v-else-if="item.data.settings.type=='water_level'" :config="item.data.generated"  :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}" />
                <!-- 排名轮播表 -->
                <dv-scroll-ranking-board  v-else-if="item.data.settings.type=='scroll_chart'" :config="item.data.generated" :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}" />
                 <div v-else-if="item.data.settings.type=='datamap'" >
                    <div :style="{width:(item.w)+ 'px',height:(item.h)+ 'px'}">
                        <sctterMap/>
                    </div>
                </div>
          <ve-chart v-else
            :width="(item.w-20) + 'px'"
            :height="(item.h-20) + 'px'"
            :data="item.data.generated"
            :extend="item.componentData.extend"
            :settings="item.data.settings"
            @ready-once="generateData(item)">
          </ve-chart>
          </dv-border-box-7>
        </div>

        <!-- 图形 -->
        <div class="rectangle" v-if="item.data.type == 'rectangle' || item.data.type == 'square' || item.data.type == 'ellipse'"
          :style="{width: item.w + 'px', height: item.h + 'px', borderRadius: item.borderRadius + '%', backgroundColor: item.bgcolor, boxShadow: item.shadoeTop + 'PX ' + item.shadoeRight + 'PX ' + item.shadoeBottom + 'PX ' + item.shadoeLeft + 'PX ' + item.shadoeColor}">
        </div>

        <!-- 文本组合横向 -->
        <div v-if="item.data.type == 'text-h'"
          :style="{width: item.w + 'px', height: item.h + 'px', backgroundColor: item.bgcolor}"
          class="rectangle">
          <input readonly="value" class="textcontainer" v-model="item.data.font.fontLeft"  style="border:none" 
          :style="{width: '50%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
            fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}" />
          <input readonly="value" class="textcontainer" v-model="item.data.font.fontLeft" style="border:none" 
          :style="{width: '50%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
            fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}"
            />
        </div>

        <!-- 文本组合纵向 -->
        <div v-if="item.data.type == 'text-z'"
          :style="{width: item.w + 'px', height: item.h + 'px', backgroundColor: item.bgcolor}"
          class="rectangle">
          <div>
            <input readonly="value" class="textcontainer" v-model="item.data.font.fontLeft" style="border: none" 
          :style="{width: '100%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
            fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}" />
          </div>
          <div>
            <input readonly="value" class="textcontainer" v-model="item.data.font.fintRight" style="border: none" 
          :style="{width: '100%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
            fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}"
            />
          </div>
        </div>

        <!-- 文字 -->
        <div class="filler" v-if="item.data.type == 'text'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
          <div class="textcontainer" :style="{fontFamily: item.data.datacon.fontFamily, fontWeight: item.data.datacon.bold ? 'bold' : 'normal', fontStyle: item.data.datacon.italic ? 'italic' : 'normal', color: item.data.datacon.color, fontSize: item.data.datacon.fontSize + 'px', textStroke: item.data.datacon.stroke ? item.data.datacon.strokeSize+'px '+item.data.datacon.strokeColor : '0', textShadow: item.data.datacon.shadow ? '5px 5px '+item.data.datacon.shadowBlur+'px '+item.data.datacon.shadowColor : 'none'}"
            v-text="item.data.datacon.text">
          </div>
        </div>

        <!-- 图片 -->
        <div class="filler" v-if="item.data.type == 'image'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
          <div class="imagecontainer" :style="{backgroundSize: item.data.datacon.imgSize, opacity: item.data.datacon.opacity,border: '2px solid #0a2c4b'}">
                  <img :src="item.data.datacon.img"  class="imagecontainer bg-border"/>
            <!-- <div class="placeholder" v-show="!item.data.datacon.img">
            </div> -->
          </div>
        </div>

        <!-- 视频 -->
        <div class="filler" v-if="item.data.type == 'video'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
          <div class="imagecontainer" :style="{backgroundSize: item.data.datacon.imgSize, opacity: item.data.datacon.opacity,border: '2px solid #0a2c4b'}">
            <video :src="item.data.datacon.video"  controls="controls" class="imagecontainer bg-border"/>
            <!-- <div class="placeholder" v-show="!item.data.datacon.img">
            </div> -->
          </div>
        </div>

        <!-- 表格 -->
        <div
          class="filler"
          v-if="item.data.type == 'table'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
          <div class="tablecontainer"
            :style="{opacity: item.data.datacon.opacity}">
              <dv-border-box-8 style="padding:10px" :style="{width: item.w + 'px', height: item.h + 'px'}">
                <dv-scroll-board :config="item.data.datacon.data" :style="{height: (item.h -20) + 'px'}" style="width:100%;"/>
              </dv-border-box-8>
          </div>

        </div>

        <!-- 边框 -->
        <div class="filler" v-if="item.data.type == 'border'"
          :style="{width: '100%', height: '100%'}">
              <div v-if='item.data.datacon.type== "1"'>
                <dv-decoration-1 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "2"'>
                <dv-decoration-2 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "2(reverse)"'>
                <dv-decoration-2 :reverse="true" :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "3"'>
                <dv-decoration-3 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "4"'>
                <dv-decoration-4 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "4(reverse)"'>
                <dv-decoration-4 :reverse="true" :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "5"'>
                <dv-decoration-5 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "6"'>
                <dv-decoration-6 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "7"'>
                <dv-decoration-7 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "8"'>
                <dv-decoration-8 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "8(reverse)"'>
                <dv-decoration-8 :reverse="true" :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "9"'>
                <dv-decoration-9 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "10"'>
                <dv-decoration-10 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "11"'>
                <dv-decoration-11 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "12"'>
                <dv-border-box-1 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "13"'>
                <dv-border-box-2 :style="{width: item.w + 'px', height: item.h + 'px'}" />
             </div>
              <div v-if='item.data.datacon.type== "14"'>
                  <dv-border-box-3 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "15"'>
                <dv-border-box-8 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "16"'>
                <dv-border-box-10 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "17"'>
                <dv-border-box-11 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "18"'>
                <dv-border-box-12 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
              <div v-if='item.data.datacon.type== "19"'>
                <dv-border-box-13 :style="{width: item.w + 'px', height: item.h + 'px'}" />
              </div>
        </div>
      </div>
    </div>
  </div>
  <videoSurveillance :monitorData="monitorData" ref="form"></videoSurveillance>
        </div>
</template>

<script>
/* eslint-disable */
import {addViewNumber,getConnect} from '@/api/chart/chart.js'
import videoSurveillance from './module/videoSurveillance'
import { getChartEarly, setIsRead } from '@/api/base/monitor'
import sctterMap from '@/components/datamap/sctterMap'

export default {
  data() {
    return {
      chartData: {},
      monitorData: '',
      // width: document.documentElement.clientHeight * 0.72,
      document: document.documentElement,
    };
  },
  components: {
    videoSurveillance,
    sctterMap
  },
  computed: {
    screenStyle() {
      return {
        width: this.chartData.w + 'px',
        height: this.chartData.h + 'px',
        backgroundColor: this.chartData.bgcolor,
        backgroundImage: `url(${this.chartData.bgimage})`,
        backgroundSize: this.chartData.bgimagesize,
      };
    },
  },
  mounted() {
    let id=""
    if(this.$route.params.id){
        id=this.$route.params.id
    }else{
      id="216cc61ec9da53b0306145ff4e7048cb"
    }
   addViewNumber(id)
      .then((res) => {
        const { errno, data } = res;
        if (errno === 0) {
          this.title = data.title;
          document.title = data.title;
          this.chartData = data.chartData;
        }
      })
      .catch(() => {});

    // this.$nextTick(function () {
    //     setInterval(this.curentTime, 30000);
    // })
  },
  methods: {
    // 预警视频
    curentTime() {
      getChartEarly().then(res =>{
        if (res.data.length !== 0 && res.data.length !== undefined) {
          this.monitorData = res.data
          // console.log(this.monitorData)
          if (this.monitorData !== null && this.monitorData !== undefined && this.monitorData.length !== 0) {
            this.$refs.form.dialog = true
          }
          
        }
      })
      // setIsRead({}).then(res => {
      // })
    },
    operation(type) {
        this.$router.push({ path:type})
      },
    generateData(item) {
      if (item.data.datacon.type == 'raw') {
        item.data.generated = item.data.datacon.data
      } else if (item.data.datacon.type == 'connect') {
        getConnect(item.data.datacon.connectId)
          .then((res) => {
            const { errno, data } = res;
            if (errno === 0) {
              item.data.generated = data.data;
            }
          })
          .catch(() => {});
      } else if (item.data.datacon.type == 'get') {
        clearInterval(interval);
        let time = item.data.datacon.interval ? item.data.datacon.interval : 1;
        interval = setInterval(() => {
          this.$http.get(item.data.datacon.getUrl)
            .then((res) => {
              item.data.generated = res.data;
            })
            .catch(() => {});
        }, time * 1000)
      }
    },
    toggleFullscreen (element) {
      let ele = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (ele != null) {
        // 关闭全屏
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if(element.msExitFullscreen) {
          element.msExitFullscreen();
        }
      } else {
        // 打开全屏
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
          element.msRequestFullscreen();
        } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.enter-fullscreen {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, 0.4);
  color: #07122d;
  text-align: center;
  font-size: 24px;
  transition: opacity 0.3s ease;
  opacity: 0;
  z-index: 999;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}
.main-view {
  // background: #eeeeee;
  padding: 0 0 0 0;
  // overflow: auto;
  height: 100%;
  .operation {
    width: 50px;
    height: 20px;
    font-size: 17px;
    position: fixed;
    top: 10px;
    right: 40px;
    z-index: 99;
    color: #4fa59a;
    img {
      width: 20px;
      height: 20px;
    }
    .el-icon-video-camera {
      font-size: 18px;
    }
  }
  .mian-tit{
    background: #07122d;
    img{
      width: 100%;
      height: 80px;
    }
  }
}

.screen {
  position: relative;
  // width: 100%;
  // height: 100%;
  overflow: auto;
  .component {
    position: absolute;
  }
  .rectangle {
      padding: 10px 10px;
      background-color: #3355df;
      z-index: 10;
  }
  .bg-border{
    padding: 10px 10px;
    box-shadow: 0 0 5px 1px #0f1b38;
    border: 2px solid #0f1b38;
    background: #0b122f !important;
  }
  .tablecontainer {
    width: 100%;
    height: 100%;
    td{
      width: 50px;
      height: 40px;
    }
  }
  .filler {
    .textcontainer {
      word-wrap: break-word;
    }
    .imagecontainer {
      width: 100%;
      height: 100%;
      .placeholder {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .bordercontainer {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      &.border1 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/1.png') 50;
      }
      &.border2 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/2.png') 50;
      }
      &.border3 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/3.png') 50;
      }
    }
  }
}
/*滚动条样式*/
::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
}
::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #999;
}
::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: #E0E0E0;
}
</style>
