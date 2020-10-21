<template>
  <div class="toolbar">
    <div class="toolbox">
      <div class="tool-list">
        <div
          class="btn"
          :class="{active: panelKey === 'chart'}"
          @click="showPanel('chart')">
          <img src="@/assets/img/icon/type.png" style="margin-top: 15px">
        </div>
        <div
          class="btn"
          :class="{active: panelKey === 'my'}"
          @click="showPanel('my')">
          <img src="@/assets/img/icon/my.png" style="margin-top: 15px">
        </div>
        <div
          class="btn"
          :class="{active: panelKey === 'text'}"
          @click="showPanel('text')">
          <img src="@/assets/img/icon/txt.png" style="margin-top: 15px">
        </div>
        <!-- <div class="btn" :class="{active: panelKey === 'layers'}" @click="showPanel('layers')">
          <i class="iconfont icon-layer"></i>
        </div> -->
        <!-- 自定义大屏 -->
        <div
          class="btn"
          :class="{active: panelKey === 'bigSeek'}"
          @click="showPanel('bigSeek')">
          <img src="@/assets/img/icon/chart.png" style="margin-top: 15px">
        </div>
      </div>

      <!-- 按钮  -->
      <div class="tool-list-1">
        <span class="btn0 iconfont" style="color:#2187fb;" :class="{active: $parent.preview}" @click="initChartData">初始化</span>
        <span class="btn0 iconfont" style="color:#2187fb;" :class="{active: $parent.preview}" @click="revoke">撤销</span>
        <span class="btn0 iconfont" style="color:#23eec0;" :class="{active: $parent.preview}" @click="cancel">取消</span>
        <span class="btn0 iconfont" style="color:pink;" :class="{active: $parent.preview}"  @click="releaseChartData">保存</span>
        <span class="btn0 iconfont" style="color:#fa9810;" :class="{active: $parent.preview}"  @click="saveChartData">发布</span>
        <!-- 发布/预览 -->
        <!-- <i class="btn iconfont icon-preview"  :class="{active: $parent.preview}"  @click="$parent.preview = !$parent.preview"></i> -->
        <!-- <i class="btn iconfont el-icon-position" :class="{active: $parent.preview}"  @click="saveChartData"></i> -->
      </div>
    </div>
    <!-- 组件类型弹窗模块 -->
    <div class="collapse-panel" v-show="panelKey">
      <SidePanel :panelKey="panelKey" ref="headerChild"></SidePanel>
    </div>

    <!-- 组件类型弹窗模块 -->
    <!-- <div class="collapse-panel" v-show="panelKey">
      <SidePanel :panelKey="panelKey"></SidePanel>
    </div> -->
  </div>
</template>

<script>
import SidePanel from './SidePanel.vue'
import { getComponents } from '@/api/chart/chart'

export default {
  components: {
    SidePanel
  },
  data () {
    return {
      panelKey: "",
      compentId: '',
      btnList: [
        {
          key: "chart",
          name: "内置组件"
        },
        {
          key: "my",
          name: "我的"
        },
        {
          key: "text",
          name: "文字"
        },
        {
          key: "bigSeek",
          name: "自定义模板"
        }
      ],
      showCollapsePanel: false
    }
  },
  computed: {
    chartData () {
      return this.$parent.chartData
    }
  },
  created () {
    this.compentId = this.$refs.headerChild.compentId
  },
  methods: {
    showPanel (key) {
      if (this.panelKey === key) {
        this.panelKey = ''
      } else {
        this.panelKey = key
      }
    },
    // 发布模板
    saveChartData () {
      // 发布之后更新当前撤销的记忆缓存
      let data = this.$parent.chartData
      let dataRevoke = [];
      dataRevoke.push(data)
      // 取消
      localStorage.setItem('dataRevoke', JSON.stringify(dataRevoke))
      localStorage.setItem('dataCancel', JSON.stringify(data))
      this.$parent.saveChartData()
    },
    // 保存模板（不会发布）
    releaseChartData () {
      // 发布之后更新当前撤销的记忆缓存
      let data = this.$parent.chartData
      let dataRevoke = [];
      dataRevoke.push(data)
      // 取消
      localStorage.setItem('dataRevoke', JSON.stringify(dataRevoke))
      localStorage.setItem('dataCancel', JSON.stringify(data))
      this.$parent.releaseChartData()
    },
    // 初始化大屏
    initChartData(){
        let data = this.$parent.chartData
        data.elements=[]
    },
    // 撤销
    revoke () {
      let data = JSON.parse(localStorage.getItem('dataRevoke'))
      if (data.length > 1) {
        this.$parent.chartData = data[data.length-2]
        let datas = data.splice(0, data.length-1)
        localStorage.setItem('dataRevoke', JSON.stringify(datas));
      }
    },
    cancel () {
      let data = JSON.parse(localStorage.getItem('dataCancel'))
      this.$parent.chartData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  height: 100%;
}

.toolbox {
  height: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: #0b122c;
  background: #0a1231;
  border-right: 1px solid rgba(0, 0, 0, 0.02);

  .tool-list {
    margin-top: 25px;
    width: 50px;
    height: 200px !important;
    background: #0a2c4b;
  }
  .tool-list-1{
    margin-top: 25px;
    width: 50px;
    height: 120px !important;
    background: #0a2c4b;
    span{
      font-size: 12px;
    }
  }

  .btn {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: all 0.3s ease;
    color: #fff;
    background: #0a2c4b;
    &:hover {
      cursor: pointer;
      background-color: #1d777d;
      color: #fff !important;
    }
    &.active {
      background-color: #1d777d;
      color: #fff !important;
    }
    .iconfont {
      font-size: 24px;
    }
  }
  .btn0{
    display: inline-block;
    width: 50px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    transition: all 0.3s ease;
    color: #fff;
    background: #0a2c4b;
    &:hover {
      cursor: pointer;
      background-color: #1d777d;
      color: #fff !important;
    }
    &.active {
      background-color: #1d777d;
      color: #fff !important;
    }
  }
}

.collapse-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 80px;
  width: 265px;
  z-index: 10;
}
</style>
