<template>
  <div class="userEcharts">
    <div v-show='xdays!=null'  id="myChart" style="width:800px;height:300px;"></div>
    <div v-show='xdays==null' style="width:800px;height:300px;text-align:center;font-size:20px;padding-top:30px ">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  props: ["xdays", "shoutNums"],
  data() {
    return {};
  },
  computed: {},
  watch: {
    xdays: {
      handler(value) {
        this.drawLine(value, this.shoutNums);
      },
      deep: true
    }
  },
  methods: {
    drawLine(value, shoutNums) {
      var colors = ["#5793f3", "#d14a61", "#675bba"];
      let myChart = this.$echarts.init(document.getElementById("myChart"));

 myChart.setOption({
                    color: colors,
                    title: {text: '使用数据:'},
                    tooltip: {
                        trigger: 'none',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data: ['呐喊']
                    },
                    grid: {
                        top: 70,
                        bottom: 50
                    }, 
                    xAxis: [{
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true 
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '宣泄次数  ' + params.value +
                                            (params.seriesData.length ? '：' + params.seriesData[0]
                                                .data : '');
                                    }
                                }
                            },
                            data: value
                        },
                        {
                            type: 'category',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisPointer: {
                                label: {
                                    formatter: function (params) {
                                        return '宣泄次数  ' + params.value +
                                            (params.seriesData.length ? '：' + params.seriesData[0]
                                                .data : '');
                                    }
                                }
                            },
                        }
                    ],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                            name: '呐喊',
                            type: 'line',
                            xAxisIndex: 1,
                            smooth: true,
                            data:shoutNums
                        },
                        // {
                        //     name: '压力评估',
                        //     type: 'line',
                        //     smooth: true,
                        //     data: [3.9, 5.9, 11.1, 18.7, 48.3]
                        // }
                    ]
                });
    }
  }
};
</script>

<style lang="less">
.userEcharts {
  width: 815px;
  height: 320px;
  padding: 20px 0 0 20px;
  background-color: #fff;
  border-radius: 10px;
}
</style>