<!--孟如月渐变柱形图-->
<template>
    <div ref="chartBar" class="chartBar"></div>
</template>

<script>
import echarts from "echarts";
export default {
    props: {
        //x文字倾斜
        xrotate:{
            type: Number,
            default: 0
        },
        //是否展示柱上方数值
        isShowLable:{
            type: Boolean,
            default: false
        },
        lineFeed:{ // 文字是不是换行
            type: Boolean,
            default: true
        },
        //是否展示y轴
        isShowY:{
            type: Boolean,
            default: true
        },
        //是否展示y轴线
        isYaxisLine:{
            type: Boolean,
            default: true
        },
		minInterval: { // 间期数
            type: Number,
            default: 1
		},
		showYLine: { // y轴线是不是展示
            type: Boolean,
            default: false
		},
        // 柱形条颜色
        color: {
            type: String,
            default: '#eb6100'
        },
        // 柱形条横轴文字颜色
        textXColor: {
            type: String,
            default: '#80878e'
        },
        //柱形条宽度
        barMaxWidth: {
            type: Number,
            default: 40
        },
        //是否是渐变色
        colorType: {
            type: Boolean,
            default: true
        },
        //渐变颜色
        moreColor: {
            type: Array,
            default: ()=>['#ffc233','#EB6100']
        },
        colorList: {
            type: Array,
            default: ()=>[]
        },
        xName: {
            type: String,
            default: ""
        },
        yName: {
            type: String,
            default: ""
        },
        // 标题文本
        titleText: {
            type: String,
            default: ""
        },
        // 柱形图名称
        clumnData: {
            type: Object,
            default: () => {}
        },
        // 柱形图
        legend: {
            type: Array,
            default: () => []
        },
        // 柱形图series
        series: {
            type: Array,
            default: () => []
        },
        legendX: { // legend水平定位
            type: String,
            default: "center"
        },
		toolbox:{
			type: Boolean,
			default:()=> false
		},
    },
    data() {
        return {}
    },
    mounted() {
        this.$nextTick(() =>{
            this.initPie()
        })
    },
    methods: {
        // 柱形图
        initPie() {
            let that = this;
            that.charts = echarts.init(this.$refs.chartBar);
            let opinion = this.clumnData.opinion
            let opinionData = this.clumnData.opinionData
            let barMaxWidth = this.barMaxWidth
            
            let colorType = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: this.moreColor[0]
            }, {
                offset: 1,
                color: this.moreColor[1]
            }])
            // 绘制图表
            var opt = {
                color: that.colorList,
                toolbox: {
                    // orient : 'vertical',
                    show: this.toolbox,
                    left: 0,
                    feature: {
                        mark: { show: true },
                        dataView: {
                            show: true, 
                            readOnly: true,
                            lang: ['数据视图', '关闭', '刷新'],
                            //修改数据视图
                            optionToContent: function (opt) {
                                var axisData = opt.xAxis[0].data;
                                var series = opt.series;
                                var table = '<table style="border: 2px solid #585858; width:100%;text-align:center" cellspacing="0" cellpadding="0" class="table_Qushi"><tbody><tr>'
                                    + '<td style="font-weight:bolder">因子</td>'
                                    // + '<td style="font-weight:bolder">' + series[0].name + '</td>'
                                    // + '<td style="font-weight:bolder">' + series[1].name + '</td>'
                                    for(let k = 0; k < series.length; k ++) {
                                        table += '<td style="font-weight:bolder">' + series[k].name + '</td>'
                                    }
                                    table +=  '</tr>';
                                for (let i = 0, l = axisData.length; i < l; i++) {
                                    table += '<tr>'
                                        + '<td>' + axisData[i] + '</td>'
                                        for(let k = 0; k < series.length; k ++) {
                                            table += '<td style="font-weight:bolder">' + series[k].data[i] + '</td>'
                                        }
                                        // + '<td>' + series[0].data[i] + '</td>'
                                        // + '<td>' + series[1].data[i] + '</td>'
                                        table +=  '</tr>';
                                }
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                title: {
                    y: 'top',
                    x: 'left',
                    text: that.titleText,
                    textStyle: {
                        fontWeight: "normal",
                        fontSize: 14
                    }
                },
                legend: {
                    left: that.legendX,
                    data: that.legend
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                xAxis: {
                    splitLine: {
                        show: false
                    },
                    name: that.xName,
                    data: opinion,
                    axisLine:{
                        show: true,
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: ['#80878e'],
                            width: 1
                        }
                    },
                    axisLabel: {
                        rotate: that.xrotate,
                        textStyle: {
                            color: that.textXColor,
                            lineHeight: 18
                        },
                        interval: 0,
                        formatter: function (value) {
                            var ret = '';
                            var maxLength = 4;
                            var rowNum = Math.ceil(value.length / maxLength);
                            if (rowNum > 1 && that.xrotate < 30 && that.lineFeed) {
                                for (var i = 0; i < rowNum; i++) {
                                    var temp = "";
                                    var start = i * maxLength;
                                    var end = start + maxLength;
                                    temp = value.substring(start, end) + "\n";
                                    ret += temp;
                                }
                                return ret;
                            } else {
                                return value;
                            }
                        }
                    }
                },
                yAxis: {
                    show: this.isShowY,
                    name: that.yName,
                    minInterval: this.minInterval,
                    splitLine: {
                        show: this.showYLine,
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: ['#e3e4e6'],
                            width: 1,
                            type: 'dashed'
                        }
                    },
                    axisLine:{
                        show:this.isYaxisLine,
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: ['#80878e'],
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: this.textXColor,
                            lineHeight: 18
                        }
                    }
                },
                grid: {
                    left: '2%',
                    right: '6%',
                    bottom: '2%',
                    containLabel: true
                },
                series: that.series.length > 0 ? that.series : [
                    {
                        // name: this.yName,
                        type: 'bar',
                        barMaxWidth: barMaxWidth,
                        data: opinionData,
                        itemStyle: {
                            normal: {
                                //颜色渐变
                                color: this.colorType ? colorType : this.color,
                                label: {
                                        show: this.isShowLable, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: '#40e6ff',
                                            fontSize: 14
                                        }
                                    }
                            }
                        }
                    }
                ]
            }
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
