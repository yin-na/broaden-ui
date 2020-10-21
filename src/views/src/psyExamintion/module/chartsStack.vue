/*
 * @Author: 孟如月 
 * @Date: 2019-07-31 16:51:43 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-05-22 21:43:36
 *量表折线
 */
<template>
  <div id="coordin" class="container"></div>
</template>

<script>
// 引入基本模板
import echarts from "echarts";
export default {
  name: "echarts-stack",
  props: {
    //接受父组件传递来的数据
    items: {
      type: Array,
      default() {
        //x坐标数据
        return [];
      }
    }
  },
  mounted() {
    var score = this.items;
    var score1 = score[0];
    var score2 = score[2];
    var dataAll = [[[score1, score2]]];
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      },
    //   toolbox: {
    //     feature: {
    //       dataView: { show: true, readOnly: false },
    //       magicType: { show: true, type: ["line", "bar"] },
    //       restore: { show: true },
    //       saveAsImage: { show: true }
    //     }
    //   },
      grid: {},
      legend: {
        data: ["分数", "分数", "分数", "分数", "得分"]
      },
      xAxis: [
        {
          name:'N',
          nameTextStyle:{
              fontSize:20, 
          },
          type: "value",
          splitLine: {
            show: false
          },
          min: 120,
          max: 0,
          interval: 10,
          axisPointer: {
            formatter: "{value}"
          },
          offset: -160
        }
      ],
      yAxis: [
        {
          name:'E',
          nameTextStyle:{
              fontSize:20, 
          },
          type: "value",
          splitLine: {
            show: false
          },
          min: 120,
          max: 0,
          interval: 10,
          axisLabel: {
            formatter: "{value}"
          },
          offset: -265
        }
      ],

      series: [
        {
          name: "得分",
          type: "scatter",

          data: dataAll[0]
        },
        {
          name: "分数",
          type: "line",
          markLine: {
            symbol: "none",
            data: [{ type: "average", name: "平均值" }],
            label: {
              formatter: ""
            }
          },
          data: [38.5]
        },
        {
          name: "分数",
          type: "line",
          //data:[0],
          markLine: {
            name: "aa",
            symbol: "none",
            data: [
              [
                { coord: ["38.5", 0] },
                { coord: ["38.5", 120] } //如何获取grid上侧最大值，目前是写死的
              ]
            ],
            label: {
              formatter: ""
            }
          }
        },
        {
          name: "分数",
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
            data: [{ type: "average", nme: "平均值" }],
            label: {
              formatter: ""
            }
          },
          data: [43.3]
        },
        {
          name: "分数",
          type: "line",
          //data:[0],
          markLine: {
            name: "aa",
            symbol: "none",
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
            data: [
              [
                { coord: ["43.3", 0] },
                { coord: ["43.3", 120] } //如何获取grid上侧最大值，目前是写死的
              ]
            ],
            label: {
              formatter: ""
            }
          }
        },
        {
          name: "分数",

          type: "line",
          markLine: {
            smooth: false,
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: "solid", //'dotted'虚线 'solid'实线
                  color: "#A7C0DC"
                }
              }
            },
            data: [{ type: "average", name: "平均值" }],
            label: {
              formatter: ""
            }
          },
          data: [56.7]
        },
        {
          name: "分数",
          type: "line",
          //data:[0],
          markLine: {
            name: "aa",
            smooth: false,
            symbol: "none",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  type: "solid", //'dotted'虚线 'solid'实线
                  color: "#A7C0DC"
                }
              }
            },
            data: [
              [
                { coord: ["56.7", 0] },
                { coord: ["56.7", 120] } //如何获取grid上侧最大值，目前是写死的
              ]
            ],
            label: {
              formatter: ""
            }
          }
        },
        {
          name: "分数",
          type: "line",
          markLine: {
            symbol: "none",
            data: [{ type: "average", name: "平均值" }],
            label: {
              formatter: ""
            }
          },
          data: [61.5]
        },
        {
          name: "分数",
          type: "line",
          //data:[0],
          markLine: {
            name: "aa",
            symbol: "none",
            data: [
              [
                { coord: ["61.5", 0] },
                { coord: ["61.5", 120] } //如何获取grid上侧最大值，目前是写死的
              ]
            ],
            label: {
              formatter: ""
            }
          }
        }
      ]
    };
    //初始化
    const chartObj = echarts.init(document.getElementById("coordin"));
    chartObj.setOption(option);
    window.addEventListener("resize", function() {
      chartObj.resize();
    });
  }
};
</script>
<style scoped>
.container {
  height: 500px;
  width: 800px;
  margin: 0 auto;
  vertical-align: middle
}
</style>
