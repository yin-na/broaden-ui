<!--散点图-->
<template>
<div ref="myChart" class="chartBar"></div>
</template>

<script>
import echarts from "echarts";
export default {
    props: {
        data: { // 散点图数据 [[164.3, 59.8],[164.3, 59.8]]
            type: Array,
            default: () => []
        },
        // 散点颜色
        color: {
            type: String,
            default: '#ffb079'
        },
        // 散点border宽度
        borderWidth: {
            type: Number,
            default: 0
        },
        showyAxis: { // y轴线是不是展示
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            charts: {},
        }
    },
    methods: {
        // 柱形图
        initPie() {
            let that = this;
            that.charts = echarts.init(this.$refs.myChart);
            let opt = {
                // backgroundColor: 'rgba(241, 241, 241, 1)',
                title: {
                    // text: '男性女性身高体重分布',
                    // subtext: '抽样调查来自: Heinz  2003'
                },
                tooltip: {
                    // trigger: 'axis',
                    // showDelay: 0,
                    // formatter: function (params) {
                    //     if (params.value.length > 1) {
                    //         return params.seriesName + ' :<br/>' +
                    //             params.value[0] + 'cm ' +
                    //             params.value[1] + 'kg ';
                    //     } else {
                    //         return params.seriesName + ' :<br/>' +
                    //             params.name + ' : ' +
                    //             params.value + 'kg ';
                    //     }
                    // },
                    // axisPointer: {
                    //     show: true,
                    //     type: 'cross',
                    //     lineStyle: {
                    //         type: 'dashed',
                    //         width: 1
                    //     }
                    // }
                },
                // legend: {
                //     data: ['女性']
                // },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataZoom: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                xAxis: [{
                    type: 'value',
                    scale: true,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: this.textXColor
                        }
                    }
                }],
                yAxis: [{
                    type: 'value',
                    scale: true,
                    splitLine: {
                        show: this.showyAxis
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                grid: {
                    x: 70,
                },
                series: [{
                        name: '',
                        type: 'scatter',
                        data: this.data,
                        itemStyle: {
                            normal: {
                                //颜色渐变
                                color: this.color,
                                borderWidth: this.borderWidth,
                                borderColor: '#7c7b7b',
                            }
                        }
                        // markPoint: {
                        //     data: [{
                        //             type: 'max',
                        //             name: '最大值'
                        //         },
                        //         {
                        //             type: 'min',
                        //             name: '最小值'
                        //         }
                        //     ]
                        // },
                        // markLine: {
                        //     data: [{
                        //         type: 'average',
                        //         name: '平均值'
                        //     }]
                        // }
                    }
                ]
            };
            that.charts.setOption(opt);
            window.addEventListener("resize", function () {
                that.charts.resize();
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.chartBar {
    width: 100%;
    height: 100%;
}
</style>
