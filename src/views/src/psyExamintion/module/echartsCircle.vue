/*
 * @Author: 李素素
 * @Date: 2019-07-04 18:51:09
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-02-17 09:10:30
 */
<template>
<div :ref="refId" class="chart"></div>
</template>

<script>
import echarts from "echarts";
export default {
    props: {
        refId: {
            type: String,
            default: 'chart'
        },
        // legend 形状
        legendShap:{
            type: String,
            default: "circle"
        },
        color:{
            type: Array,
            default: () => ['#ff4500',"#e9843d", "#fabe00", "#8378ea", "#ff345a", "#f1a6e9", "#78d9ea", "#9fe6b8", "#babdc2"]
        },
        hxPosition: {
            type: Array,
            default: () => ["28%", "50%"]
		},
		otherLegend: { // 首页legend
            type: Boolean,
            default: false
		},
        hasLegend: {
            type: Boolean,
            default: false
        },
        // labelLineColor:{
        //     type: String,
        //     default: '#ff8b02'
        // },
        labelLineColor:{
            type: Array,
            default: ()=>['#ff4500',"#eb6100", "#fabe00"]
        },
        labelLine: { //饼图是否展示线
            type: Boolean,
            default: false
        },
        labelPos: { // 饼图上文字展示在里面还是外面
            type: String,
            default: 'outer'
        },

        titleTop: { // title在左上方向
            type: Boolean,
            default: false
        },
        titleLeft: { // title距离左侧位置
            type: String,
            default: '60%'
        },
        needValue: { // 图例上是不是需要添加value
            type: Boolean,
            default: false
        },
        seriesRadius: { // 扇形的大小
            type: Array,
            default: () => ["43%", "58%"]
        },
        // 扇形区域数据
        opinionData: {
            type: Object,
            default: () => {}
        },
        num: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            // color: ["#eb6100", "#fabe00", "#8378ea", "#ff345a", "#f1a6e9", "#78d9ea", "#9fe6b8", "#babdc2"],
            top: '34%'
        };
    },
    mounted() {
        this.$nextTick(function () {
            // 添加颜色
            // 添加固定位置
            let children = this.opinionData.children;
            if (children) {
                let num = 37 - (children.length - 1) * 4
                this.top = num > 0 ? num + '%' : 0

                // if (children.length > 3) {
                //   this.color = ["#eb6100", "#fabe00", "#8378ea", "#ff345a", "#f1a6e9", "#78d9ea", "#9fe6b8", "#babdc2"]
                // }
			}

            this.initPie();
        })
    },
    methods: {
        // 监听扇形图点击
        // 向父组件传值 看需求
        // eConsole(param) {
        //   this.$emit("currentEchartData", param.name);
        // },
        // 饼状图
        initPie() {
            let that = this;
            that.charts = echarts.init(that.$refs[that.refId]);
            that.charts.setOption({
                capType: "round",
                title: {
                    left: that.titleTop ? 'center' : that.titleLeft,
                    top: that.titleTop ? '2.5%' : that.top,
                    // 标题文本
                    text: that.opinionData.titleText,
                    textStyle: {
                        fontWeight: "600",
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{b}: {c} <br/>占比: {d}%" //c:人数 d:比例
                },
                legend: that.hasLegend ? false : that.otherLegend ? { // legend在下面
                    padding: [0, 23, 0, 23],
                    itemGap: 8,
                    bottom: 40, //数值越小距离越大(颜色代表的含义距离饼图说明的位置)
                    icon: that.legendShap,
                    itemWidth: 10,
                    itemHeight: 10,
                    selected: {
                        '累计测评人数' : false
                    },
                    // 扇形区域名称
                    data: that.opinionData.children,
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 15,
                                width: 200,
                                height: 21,
                                padding: [0, 0, 0, 1]
                            },
                        }
                    },
                    formatter: function (name) {
                        let index = that.opinionData.children.map(item => item.name).indexOf(name)
                        let text = name;
                        if (that.needValue) {
                            text += ' ' + that.opinionData.children[index].value
                        }

                            return text
                        }
                } : {
                    orient: 'vertical',
                    selectedMode: false, //取消图例上的点击事件
                    left: that.titleLeft,
                    top: that.opinionData.titleText ? that.titleTop ? '35%' : (parseInt(that.top) + 11 + that.num) + '%' : (parseInt(that.top) + 6 + that.num) + '%',
                    itemGap: 11,
                    icon: this.legendShap, //数值越小距离越大(颜色代表的含义距离饼图说明的位置)
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        fontSize: 12,
                        color: '#80878e'
                    },
                    // 扇形区域名称
                    data: that.opinionData.children,
                    formatter: function (name) {
                        let index = that.opinionData.children.map(item => item.name).indexOf(name)
                        // let sum = 0
                        // that.opinionData.children.forEach(element => {
                        //     sum += Number(element.value)
                        // });
                        let text = name;
                        if (that.needValue) {
                            // if (sum > 0) {
                            //     text += ' ' + parseInt(that.opinionData.children[index].value / sum * 100) + '%'
                            // } else {
                            //     let length = that.opinionData.children.length
                            //     text += ' ' + parseInt(100 / length) + '%'
                            // }
                            text += ' ' + that.opinionData.children[index].value

                        }

                        return text
                    }
                },
                series: [{
                    hoverAnimation: false,
                    type: "pie",
                    color: that.color,
                    center: that.hxPosition, // ["28%", "50%"]饼图相对画布位置
                    radius: that.seriesRadius, //饼图大小[x代表圆环的粗细，y代表整体饼图大小]
                    avoidLabelOverlap: false, // 默认防止标签重叠
                    startAngle: 10,
                    itemStyle: {
                        normal: {
                            label: {
                                textStyle: {
                                    color:'#80878e',
                                    fontSize: 14,
                                }
                            },
                            labelLine : {
                                lineStyle:{
                                    color:'#80878e'
                                }
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: that.labelLine,
                            formatter: '{b} \n {d}%',
                            padding: [0, 0],
                            position: that.labelPos,
                            fontSize: "12px",
                            textStyle: {
                                textAlign: 'center',
                                lineHeight: 18,
                                color: that.labelPos == 'inner' ? '#fff' : '#80878e'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: that.labelLine,
                            length: 12,
                            length2: 10,
                            lineStyle: {
                               /*  color: this.labelLineColor */  // 改变标示线的颜色
                            }
                        },


                    },
                    data: this.opinionData.children, // 扇形区域数据
                    formatter: function () {//格式化方法
                        this.labelLineColor.forEach(item=>{
                            this.series.label.normal.textStyle.color = item//字的颜色
                            this.labelLine.normal.lineStyle.color = item//标示线的颜色
                        })
                    }
                }]
            })
            window.addEventListener("resize", function () {
                that.charts.resize();
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
    border: 1px soild #ccc;
    margin: 0 auto;
}
</style>
