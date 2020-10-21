<template>
    <!-- 测评结果  -->
    <div class="echartsStatic">
        <div class="height" style="z-index: 999;">
            <div :class="className" :id="id" :style="{height:height,width:width}" ref="echStatic"></div>
        </div>

    </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'echartsStatic',

  props: {
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    score: '',
    dimension: ''
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  created () {
  },

  methods: {

    // 环形图
    initChart () {
      this.chart = echarts.init(this.$refs.echStatic)
      // 把配置和数据放这里
      this.chart.setOption({
        title: {
          subtext: '单位：分值'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.dimension,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '30',
            data: this.score,
            // 柱子渐变
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#1eb0e6' },
                  { offset: 1, color: '#37c9ff' }
                ])
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style>
    .echartsStatic{
        width: 100%;
        height: 100%;
        margin-top: 3%;
    }
    .static_bg{
        position: absolute;
        width: 100%;
        height: 96%;
    }
    .ststic_text{
        position: absolute;
        display: flex;
        flex-direction: column;
        z-index: 999;
        color: #4cb1ff;
        font-size: 1rem;
        text-align: center;
        top: 24%;
        left: 5%;
    }
</style>
