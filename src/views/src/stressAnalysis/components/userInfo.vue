<template>
  <div class="userEcharts">
    <div  v-show='xdays!=null' id="myChart" style="width:800px;height:300px;"></div>
     <div v-show='xdays==null' style="width:800px;height:300px;text-align:center;font-size:20px;padding-top:30px ">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  props: ["xdays", "shoutNums"],
  data() {
    return {
    };
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
        title: {
          text: "心理压力分析仪:",
          subtext: "单位：次"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["心率"]
        },
        toolbox: {
          show: false
        },
        // xAxis: {
        //   type: "category",
        //   boundaryGap: false,
        //   data: value,
        //   axisLabel: {
        //     interval: 0,
        //     formatter: function(value) {
        //       var ret = ""; //拼接加\n返回的类目项
        //       var maxLength = 4; //每项显示文字个数
        //       var valLength = value.length; //X轴类目项的文字个数
        //       var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
        //       if (rowN > 1) {
        //         //如果类目项的文字大于3,
        //         for (var i = 0; i < rowN; i++) {
        //           var temp = ""; //每次截取的字符串
        //           var start = i * maxLength; //开始截取的位置
        //           var end = start + maxLength; //结束截取的位置
        //           //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
        //           temp = value.substring(start, end) + "\n";
        //           ret += temp; //凭借最终的字符串
        //         }
        //         return ret;
        //       } else {
        //         return value;
        //       }
        //     }
        //   }
        // },
      xAxis: [
            {
                axisLabel:{
                    interval:0
                },
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
                            return '心率  ' + params.value +
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
                            return '心率  ' + params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0]
                                    .data : '');
                        }
                    }
                },
            }
        ],
        yAxis: {
          type: "value",
          min: 0,
          max: 180,
          interval: 60,
          axisLabel: {
            formatter: "{value}"
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed"
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(0,0,0,0)", "rgba(214,245,255,1)"]
            }
          }
        },
        series: [
          {
            name: "心率",
            type: "line",
            smooth: true,
            data: shoutNums
          },
          {
            name: "心率",
            type: "line",
            markLine: {
              symbol: "none",
              type: "solid",
              data: [{ type: "average", name: "平均值" }],
              label: {
                formatter: "60"
              }
            },
            data: [60]
          },
          {
            name: "心率",
            type: "line",
            markLine: {
              smooth: false,
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    type: "solid", //'dotted'虚线 'solid'实线
                    color: "#A7C0DC"
                  }
                }
              },
              symbol: "none",
              data: [{ type: "average", name: "平均值" }],
              label: {
                formatter: "100"
              }
            },
            data: [100]
          }
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