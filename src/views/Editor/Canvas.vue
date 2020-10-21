<template>
  <!-- <vue-scroll :ops="ops"> -->
    <div class="scroll-cont">
      <el-dialog title="发布" :visible.sync="$parent.publishPopVisible" width="50%">
        <div style="margin-bottom: 16px;">发布成功，请点击确定前往查看</div>
        <!-- <el-input v-model="publicUrl" readonly></el-input> -->
        <span slot="footer">
          <el-button type="primary" @click="release">确 定</el-button>
          <!-- <el-button type="primary" @click="$parent.publishPopVisible = false">确 定</el-button> -->
        </span>
      </el-dialog>
      <div
        class="edit-view"
        tabindex="0"
        @keydown.space.prevent="handleSpaceDown"
        @keyup.space.prevent="handleSpaceUp"
        @click.self="handleActivated(-1)">
        <vue-draggable-resizable
          :style="wrapStyle"
          :x="100"
          :y="50"
          :w="chartData.w"
          :h="chartData.h"
          class-name="screen-box"
          class-name-draggable="screen-box-draggable"
          :draggable="screenDraggable"
          :resizable="false"
        ></vue-draggable-resizable>
        
        <div class="screen" :style="screenStyle" @click.self="handleActivated(-1)" ref="screen">
          <!-- <div @mouseenter="enterFun(0)" @mouseleave="enterFun(1)" :style="screenStyle"> -->
            <vue-drag-resize
              v-for="(item, index) in chartData.elements"
              :key="index"
              :isActive="item.active && !$parent.preview"
              :parentScaleX="scale"
              :parentScaleY="scale"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :parentLimitation="true"
              :parentW="chartData.w"
              :parentH="chartData.h"
              :aspectRatio="false"
              :minw="20"
              :minh="20"
              :z="chartData.elements.length - index"
              :isDraggable="!$parent.preview"
              :isResizable="!$parent.preview"
              @activated="handleActivated(index)"
              @resizing="handleResize(item, arguments[0])"
              @dragging="handleDrag(item, arguments[0])"
              @dragstop="dragstop(item, arguments[0])"
              @resizestop="resizestop(item, index,arguments[0])"
              >
              <div v-if="item.guide" style="border: 0.5px dashed #c1bebe;width: 1500px;position: absolute;top: 0px;left: -650px;"></div>
              <div v-if="item.guide" style="border: 0.5px dashed #c1bebe;width: 1500px;position: absolute;bottom: 0px;left: -650px;"></div>
              <div v-if="item.guide" style="border: 0.5px dashed #c1bebe;height: 1500px;position: absolute;left: 0px;top: -650px;"></div>
              <div v-if="item.guide" style="border: 0.5px dashed #c1bebe;height: 1500px;position: absolute;right: 0px;top: -650px;"></div>
              
              
              <!-- 图表 -->
              <div
                class="filler"
                v-if="item.data.type == 'chart'"
                :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
                <dv-border-box-7 :color="['#1d2d52', '#41accb']" style="padding:10px" :style="{width: item.w + 'px', height: item.h + 'px'}">
                  <!-- {{item.gaugeDates.chartSettings}} -->
                <!-- 地图 -->
                <ve-map
                  v-if="item.data.settings.type=='map'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  :settings="item.data.settings"
                  @ready-once="generateData(item)"
                  style="color: #fff"
                  >
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-map>

                <!-- 水球图 -->
                <ve-liquidfill
                  v-else-if="item.data.settings.type=='liquidfill'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  @ready-once="generateData(item)"
                  >
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-liquidfill>

                <!-- 散点 -->
                <ve-scatter v-else-if="item.data.settings.type=='scatter'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  @ready-once="generateData(item)"
                  >
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-scatter>

                <!-- 雷达图 -->
                <ve-radar v-else-if="item.data.settings.type=='radar'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :extend="item.componentData.extend"
                  :data="item.data.generated"
                  @ready-once="generateData(item)">
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-radar>

                <!-- 仪表盘 -->
                <ve-gauge v-else-if="item.data.settings.type=='gauge'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  @ready-once="generateData(item)">
                  <!-- :settings="item.gaugeDates.chartSettings" -->

                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-gauge>

                <!-- 词云图 -->
                <ve-wordcloud v-else-if="item.data.settings.type=='wordcloud'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  @ready-once="generateData(item)">
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-wordcloud>

                <!-- 饼图 -->
                <ve-pie v-else-if="item.data.settings.type=='pie'"
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :top="(item.y+80) + 'px'"
                  :data="item.data.generated"
                  :extend="item.componentData.extend"
                  :settings="item.pieRadio.chartSettings"
                  @ready-once="generateData(item)">
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
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
                  <!-- 鼠标悬停  -->
                  <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </ve-ring>
                <!--  动态环形图 20201013 duziqiang  add -->
                <div  v-else-if="item.data.settings.type=='active_ring'">
                    <dv-active-ring-chart :config="item.data.generated"  :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}"></dv-active-ring-chart>
                    <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="datavShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </div>
                 
                <!--  胶囊柱图  -->
                 <div  v-else-if="item.data.settings.type=='capsule_chart'">
                   <dv-capsule-chart :config="item.data.generated" :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}" />
                     <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="datavShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </div>
                <!-- 水位图 -->
                <div  v-else-if="item.data.settings.type=='water_level'">
                     <dv-water-level-pond  :config="item.data.generated"  :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}" />
                     <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="datavShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </div>
                <!-- 排名轮播表 -->
                <div v-else-if="item.data.settings.type=='scroll_chart'" >
                    <dv-scroll-ranking-board  :config="item.data.generated" :style="{width:(item.w-20)+ 'px',height:(item.h-20)+ 'px'}" />
                    <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="datavShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </div>
                <!--  地图 20201016  duziqiang  add  -->
                <div v-else-if="item.data.settings.type=='datamap'" >
                    <div :style="{width:(item.w)+ 'px',height:(item.h)+ 'px'}">
                        <sctterMap ref="dataMap"/>
                    </div>
                    <div class="right-edit-1" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="chartShow(item.data.type,index)">
                      <img src="@/assets/img/icon/edit.png">
                    </div>
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </div>

                <!-- 监控(类型没改chart) -->
                <div class="filler" v-else-if="item.data.settings.type=='monitor'"
                  :style="{width: '100%', height: '100%'}">
                  <div
                    :style="{ backgroundSize: item.data.datacon.imgSize, opacity: item.data.datacon.opacity,}">
                        <!-- 删除 -->
                        <div v-show="editBtn && (n == index)" style="position: absolute; right: -42px; top: -10px;">
                          <div @click="tuDelete(index)" style="width: 30px;height: 30px;background: #08122f;border: 1px solid #0f1b38;">
                            <img src="@/assets/img/icon/del.png" style="width:16px; height:16px;margin-top: 6px;margin-left: 6px;">
                          </div>
                        </div>
                    <div class="placeholder" v-show="!item.data.datacon.img"></div>
                  </div>
                </div>

                <ve-chart
                  v-else
                  :width="(item.w-20) + 'px'"
                  :height="(item.h-20) + 'px'"
                  :data="item.data.generated"
                  :settings="item.data.settings"
                  @ready-once="generateData(item)"
                  :extend="item.componentData.extend"
                  >
                    <!-- 鼠标悬停  -->
                    <div class="right-edit-1" v-show="editBtn && (n == index)">
                      <div class="ri-edit" @click="chartShow(item.data.type,index)">
                        <img src="@/assets/img/icon/edit.png">
                      </div>
                      <div class="ri-edit" @click="tuDelete(index)">
                        <img src="@/assets/img/icon/del.png">
                      </div>
                    </div>
                </ve-chart>
                </dv-border-box-7>
              </div>

              <!-- 图形 -->
              <div v-if="item.data.type == 'rectangle' || item.data.type == 'square' || item.data.type == 'ellipse'"
                :style="{width: item.w + 'px', height: item.h + 'px', borderRadius: item.borderRadius + '%', backgroundColor: item.bgcolor, boxShadow: item.shadoeTop + 'px ' + item.shadoeRight + 'px ' + item.shadoeBottom + 'px ' + item.shadoeLeft + 'px ' + item.shadoeColor}"
                class="rectangle">
                <!-- 鼠标悬停  -->
                <div class="right-edit" v-show="editBtn && (n == index)">
                  <div class="ri-edit" @click="graphicalShow(item.data.type,index)">
                    <img src="@/assets/img/icon/edit.png">
                  </div>
                  <div class="ri-edit" @click="tuDelete(index)">
                    <img src="@/assets/img/icon/del.png">
                  </div>
                </div>
              </div>

              <!-- 文本组合横向 -->
              <div v-if="item.data.type == 'text-h'"
                :style="{width: item.w + 'px', height: item.h + 'px', backgroundColor: item.bgcolor}"
                @mousedown="onSelectElement($event)"
                @touchstart="onSelectElement($event)"
                
                class="rectangle">
                <input class="textcontainer" v-model="item.data.font.fontLeft" style="border: none" 
                :style="{width: '50%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
                 fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                      fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}" />
                <input class="textcontainer" v-model="item.data.font.fintRight" style="border: none" 
                :style="{width: '50%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
                 fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                      fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}"
                 />
                <!-- 鼠标悬停  -->
                <div class="right-edit" v-show="editBtn && (n == index)">
                  <div class="ri-edit" @click="textCombination(item.data.type,index)">
                    <img src="@/assets/img/icon/edit.png">
                  </div>
                  <div class="ri-edit" @click="tuDelete(index)">
                    <img src="@/assets/img/icon/del.png">
                  </div>
                </div>
              </div>

              <!-- 文本组合纵向 -->
              <div v-if="item.data.type == 'text-z'"
                :style="{width: item.w + 'px', height: item.h + 'px', backgroundColor: item.bgcolor}"
                @mousedown="onSelectElement($event)"
                @touchstart="onSelectElement($event)"
                
                class="rectangle">
                <div>
                  <input class="textcontainer" v-model="item.data.font.fontLeft" style="border: none" 
                :style="{width: '100%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
                 fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                      fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}" />
                </div>
                <div>
                  <input class="textcontainer" v-model="item.data.font.fintRight" style="border: none" 
                :style="{width: '100%', fontFamily: item.data.font.fontFamily, color: item.data.font.color, fontSize: item.data.font.fontSize + 'px',  height: '100%',
                 fontWeight: item.data.font.bold ? 'bold' : 'normal', 
                      fontStyle: item.data.font.italic ? 'italic' : 'normal', backgroundColor: item.bgcolor}"
                 />
                </div>
                
                <!-- 鼠标悬停  -->
                <div class="right-edit" v-show="editBtn && (n == index)">
                  <div class="ri-edit" @click="textCombination(item.data.type,index)">
                    <img src="@/assets/img/icon/edit.png">
                  </div>
                  <div class="ri-edit" @click="tuDelete(index)">
                    <img src="@/assets/img/icon/del.png">
                  </div>
                </div>
              </div>

              <!-- 文字 -->
              <div
                class="filler"
                v-if="item.data.type == 'text'"
                @mousedown="onSelectElement($event)"
                @touchstart="onSelectElement($event)"
                :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
                <input
                  class="textcontainer"
                  contenteditable="true"
                  :style="{width: '100%', height: '100%',textAlign:'center',fontFamily: item.data.datacon.fontFamily, fontWeight: item.data.datacon.bold ? 'bold' : 'normal', 
                      fontStyle: item.data.datacon.italic ? 'italic' : 'normal', color: item.data.datacon.color, fontSize: item.data.datacon.fontSize + 'px', 
                      textStroke: item.data.datacon.stroke ? item.data.datacon.strokeSize+'px '+item.data.datacon.strokeColor : '0', 
                      textShadow: item.data.datacon.shadow ? '5px 5px '+item.data.datacon.shadowBlur+'px '+item.data.datacon.shadowColor : 'none', border:'none',backgroundColor:'transparent'}"
                  v-model="item.data.datacon.text"
                />
                <!-- 鼠标悬停  -->
                <div class="right-edit" v-show="editBtn && (n == index)">
                  <div class="ri-edit"  @click="toShow(item.data.type,index)">
                    <img src="@/assets/img/icon/edit.png">
                  </div>
                  <div class="ri-edit" @click="tuDelete(index)">
                    <img src="@/assets/img/icon/del.png">
                  </div>
                </div>
              </div>

              <!-- 图片 -->
              <div
                class="filler"
                v-if="item.data.type == 'image'"
                :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}">
                <div
                  class="imagecontainer"
                  :style="{ backgroundSize: item.data.datacon.imgSize, opacity: item.data.datacon.opacity,}">
                      <img :src="item.data.datacon.img"  class="imagecontainer"/>
                      <!-- 鼠标悬停  -->
                      <div class="right-edit" v-show="editBtn && (n == index)">
                        <div class="ri-edit" @click="tuDelete(index)">
                          <img src="@/assets/img/icon/del.png">
                        </div>
                      </div>
                  <div class="placeholder" v-show="!item.data.datacon.img"></div>
                </div>
              </div>

              <!-- 视频 -->
              <div class="filler"
                v-if="item.data.type == 'video'"
                :style="{width: '100%', height: '100%'}">
                <div
                  class="imagecontainer bg-border"
                  :style="{backgroundSize: item.data.datacon.imgSize, opacity: item.data.datacon.opacity,}">
                  <!-- <dv-border-box-8 style="padding:10px" :style="{width: item.w + 'px', height: item.h + 'px'}">
                    <video :src="item.data.datacon.video"  controls="controls" class="imagecontainer"/>
                  </dv-border-box-8> -->
                  <video :src="item.data.datacon.video"  controls="controls" class="imagecontainer"/>
                  <!-- 鼠标悬停  -->
                  <div class="right-edit" v-show="editBtn && (n == index)">
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
                  </div>
                </div>
              </div>

              <!-- 边框 -->
              <div
                class="filler"
                v-if="item.data.type == 'border'"
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

                  <!-- 鼠标悬停  -->
                  <div class="right-edit" v-show="editBtn && (n == index)" >
                    <div class="ri-edit" @click="tuDelete(index)">
                      <img src="@/assets/img/icon/del.png">
                    </div>
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

                    <!-- 鼠标悬停  -->
                    <div class="right-edit" v-show="editBtn && (n == index)">
                      <div class="ri-edit" @click="tuDelete(index)">
                        <img src="@/assets/img/icon/del.png">
                      </div>
                    </div>
                </div>

              </div>

            </vue-drag-resize>
            
          <!-- </div> -->

          <div class="mock" :class="{front: screenDraggable}"></div>
          <div style="width: 1px;border: 0.5px dashed #c1bebe;height: 100%;margin: 0 auto"></div>
        </div>
      </div>
      <!-- 文字编辑弹窗 -->
      <div class='dialog' v-if="preview">
        <textdialog ref='dialogItem' :indexItem='indexItem'></textdialog>
      </div>
      <!-- 图表编辑弹窗 -->
      <div class='dialog' v-if="echartview">
        <echartdialog ref='dialogEchart' :indexEchart='indexEchart'></echartdialog>
      </div>
      <!-- datav  图表编辑 -->
      <div class='dialog' v-if="dataview">
        <dataVEdit ref='dataVEditChart' :dataEchart='indexEchart'></dataVEdit>
      </div>
      <!-- <div class='dialog' v-if="formView">
        <tabledialog ></tabledialog>
      </div> -->
      <!-- 图形编辑 -->
      <div class='dialog' v-if="graphicalView">
        <graphicaldialog :graphica='graphica'></graphicaldialog>
      </div>
      <!-- 文本组合编辑 -->
      <div class='dialog' v-if="textCombinations">
        <textCombination :graphica='textCom'></textCombination>
      </div>
    </div>
  <!-- </vue-scroll> -->
</template>

<script>
import textdialog from '@/components/Editor/text.vue'
import graphicaldialog from '@/components/Editor/graphicalCss.vue'
import textCombination from '@/components/Editor/textCombination.vue'
import echartdialog from '@/components/Editor/chartEdit.vue'
import dataVEdit from '@/components/Editor/dataVEdit.vue'
import sctterMap from '@/components/datamap/sctterMap'
// import tabledialog from '@/components/Editor/table.vue'
/* eslint-disable */
export default {
  props: ["scale"],
  components:{
    textdialog,
    echartdialog,
    // tabledialog,
    graphicaldialog,
    textCombination,
    dataVEdit,
    sctterMap
  },
  data() {
    return {
      largeScreen: 'linear-gradient(to right, #0b122f 30%, #163575 50%, #0b122f 80%)',
      dataRevoke: [],
      dataCancel: [],
      editBtn: false,
      n: '',
      indexItem:0,
      graphica: 0,
      textCom: 0,
      indexEchart: 0,
      dataview:false,
      preview:false,
      textCombinations: false,
      echartview:false,
      graphicalView: false,
      formView:false,
      screenDraggable: false,
      clientHeight: 0,
      currentElementIndex: -1,
    };
  },
  created () {
    let datas = JSON.parse(localStorage.getItem('dataRevoke'))
    // console.log(datas, '见怪非怪')
    if (datas !== undefined || datas !== null) {
        this.$parent.chartData = datas[datas.length-1]
      }
    // localStorage.removeItem("dataRevoke"); // 刷新页面，初始进入清除缓存
  },
  computed: {
    publicUrl() {
      return `http://${window.location.host}/view/${this.chartId}`;
    },
    chartData() {
      if (this.$parent.chartData.elements.length > 0) {
        // 在无撤销记忆缓存时进入该判断
        
        if (localStorage.getItem('dataRevoke') == null) {
          let data = JSON.parse(localStorage.getItem('dataRevoke'))
            this.dataRevoke.push(this.$parent.chartData);
            localStorage.setItem('dataRevoke', JSON.stringify(this.dataRevoke))
        }
        if (localStorage.getItem('dataCancel') == null) {
          localStorage.setItem('dataCancel', JSON.stringify(this.$parent.chartData));
        }
      }
      return this.$parent.chartData;
    },
    chartId() {
      return this.$parent.chartId;
    },
    wrapStyle() {
      return {
        transform: `scale(${1})`
      };
    },
    screenStyle() {
      return {
        // background: this.chartData.largeScreen !== undefined && this.chartData.largeScreen !=='' ? this.chartData.largeScreen : 'linear-gradient(to right, #0b122f 30%, #163575 50%, #0b122f 80%)',
        // backgroundImage: `url(${this.chartData.bgimage})`,
        background: this.chartData.bgcolor,
        width: this.chartData.w + "px",
        height: this.chartData.h + "px",
        backgroundSize: this.chartData.bgimagesize,
        minHeight: this.clientHeight + "px"
      };
    },
    // 子组件取值
    currentElement() {
      if (this.indexEchart >= 0) {
        return this.chartData.elements[this.indexEchart];
      }
      return {};
    },
  },
  mounted() {
    // 高度问题
    var clientHeight = window.innerHeight || document.documentElement.clientHeight;
    this.clientHeight = clientHeight;
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    onSelectElement(event) {
      const tagName = event.target.tagName;
      if (tagName === "DIV" || tagName === "TEXTAREA" || tagName === "INPUT") {
        //event.stopPropagation()
        event.target.focus();
      }
    },
    // 文本组合框编辑
    textCombination(type,index) {
      let that=this
      that.textCombinations= (that.textCombinations== false ? true:false)
      var timer=setTimeout(function(){
         that.textCom=index
      },800)
    },
    // 图形编辑
    graphicalShow(type,index) {
      let that=this
      that.graphicalView= (that.graphicalView== false ? true:false)
      var timer=setTimeout(function(){
         that.graphica=index
      },800)
    },
    // 文字编辑
    toShow(type,index){
      let that=this
      that.preview= (that.preview== false ? true:false)
      var timer=setTimeout(function(){
         that.indexItem=index
      },800)
    },
    // 图表编辑
    chartShow(type,index){
      let that = this
      that.echartview = (that.echartview== false ? true:false)
      var timer = setTimeout(function(){
         that.indexEchart = index
      },800)
    },
    // 特殊图表编辑
     datavShow(type,index){
      let that = this
      that.dataview = (that.dataview== false ? true:false)
      var timer = setTimeout(function(){
         that.indexEchart = index
      },800)
    },
    handleSpaceDown() {
      this.screenDraggable = true;
    },
    handleSpaceUp() {
      this.screenDraggable = false;
    },
    handleActivated(index) {
      if(index==-1){
        this.preview=false
        this.echartview = false
        this.graphicalView = false
        this.dataview=false
        this.textCombinations=false
        for (let i = 0; i < this.$parent.chartData.elements.length; i++) {
          this.$parent.chartData.elements[i].guide = false
        }
        // widget.guide = true
      }
      this.$parent.setActiveComponentByIndex(index);
      // 点击删除/编辑
      this.editBtn = true
      this.n = index
    },
    handleResize(widget, arg) {
      const item = widget;
      item.x = arg.left;
      item.y = arg.top;
      item.w = arg.width;
      item.h = arg.height;

      // 饼图
      item.pieRadio.chartSettings.radius = parseInt((item.w+item.h)/10)
      item.pieRadio.chartSettings.offsetY= parseInt((120))
      // 环形图
      item.ringRadio.chartSettings.radius = [parseInt((item.w+item.h)/10), parseInt(((item.w+item.h)/10)-20)]
      item.ringRadio.chartSettings.offsetY= parseInt((120))

    },
    handleDrag(widget, arg) {
      const item = widget;
      item.x = arg.left;
      item.y = arg.top;
    },
    // 拖拽
    dragstop(widget, arg) {
      this.memory(widget);
    },
    // 拉伸
    resizestop(widget,index, arg) {
      // console.log(widget)
      // if(widget.data.settings.type&&(widget.data.settings.type=='active_ring'||widget.data.settings.type=='capsule_chart')||widget.data.settings.type=='water_level'||widget.data.settings.type=='scroll_chart'){
      //      this.$parent.addComponent(widget)
      // }
      //  高德地图 echarts  自适应
      if(widget.data.settings.type=='datamap'){
          this.$refs.dataMap.forEach(a=>{
            a.resizeMap()
          })
          //this.$refs.dataMap.getMapData()
      }
      this.memory(widget);
    },
    generateData(item) {
      this.$parent.generateData(item);
    },
    // 删除事件
    tuDelete (index) {
      this.preview=false
      this.$parent.deleteComponent(index)

      //this.memory();
    },
    memory(widget) {
      // 显示辅助线
      widget.guide = true

      let data = JSON.parse(localStorage.getItem('dataRevoke'));
      data.push(this.$parent.chartData);
      localStorage.setItem('dataRevoke', JSON.stringify(data))
      // 拖拽文本组合横向  改变字体大小
      if (widget.data.type == 'text-h' || widget.data.type == 'text-z') {
        let hw = widget.h + widget.w
        widget.data.font.fontSize = hw*0.08
      }
    },

    //  发布跳转首页
    release () {
      this.$router.push({
        path: `/viewscreen/${this.chartId}`,
      })
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td{
  background: none !important;
}
.edit-view {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  outline: 0;
  overflow-x: auto;
}

.dialog{
  position: fixed;
  left: 245px;
  top: 0;
  width: 300px;
  bottom: 0;
  z-index: 1000;
}
.screen-box {
  width: 100% !important;
  height: 100% !important;
  position: relative;
  transform-origin: 0 0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease;
  &.screen-box-draggable {
    cursor: grab;
  }
}
.screen {
  position: relative;
  // width: 100vw;
  // height: 116vh;
  overflow: auto;
  .vdr {
    border: 0;
  }
  .rectangle {
      padding: 10px 10px;
      background-color: #3355df;
      z-index: 10;
      // 鼠标悬停
    .right-edit{
      position: absolute;
      right: -31px;
      top: 0;
      .ri-edit{
        width: 30px;
        height: 30px;
        background: #08122f;
        border: 1px solid #0f1b38;
        img{
          margin-top: 6px;
          margin-left: 6px;
          width: 16px;
          height: 16px;
        }
      }
    }
    }
  .filler {
    // 鼠标悬停
    .right-edit{
      position: absolute;
      right: -31px;
      top: 0px;
      .ri-edit{
        width: 30px;
        height: 30px;
        background: #08122f;
        border: 1px solid #0f1b38;
        img{
          margin-top: 6px;
          margin-left: 6px;
          width: 16px;
          height: 16px;
        }
      }
    }
    .right-edit-1{
      position: absolute;
      right: -40px;
      top: -10px;
      .ri-edit{
        width: 30px;
        height: 30px;
        background: #08122f;
        border: 1px solid #0f1b38;
        img{
          margin-top: 6px;
          margin-left: 6px;
          width: 16px;
          height: 16px;
        }
      }
    }
    .bg-border{
      padding: 10px 10px;
      box-shadow: 0 0 5px 1px #0f1b38;
      border: 2px solid #0f1b38;
      background: #0b122f !important;
    }
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
        border-image: url("./../../assets/img/borders/1.png") 50;
      }
      &.border2 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/2.png") 50;
      }
      &.border3 {
        border: 50px solid transparent;
        border-image: url("./../../assets/img/borders/3.png") 50;
      }
    }
    .tablecontainer {
      width: 100%;
      height: 100%;
      td{
        width: 50px;
        height: 40px;
      }
    }
  }
}

.mock {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  z-index: -1;

  &.front {
    z-index: 999;
  }
}

// 图表标题
.name-surface{
  position: absolute;
  top: 20px;
  left: 30px;
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
