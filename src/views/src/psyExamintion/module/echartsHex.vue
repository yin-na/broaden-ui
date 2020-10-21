<template>
    <!-- 横向柱状图 -->
    <div class="echartsCity">
        <div :class="className" :id="id" :style="{height:height,width:width}" ref="echart5"></div>
    </div>
</template>

<script>
import echarts from "echarts";


export default {
    name: 'echartsCompany',

    props: {
        className: {
        type: String,
        default: "yourClassName"
        },
        id: {
        type: String,
        default: "yourID"
        },
        width: {
        type: String,
        default: "100%"
        },
        height: {
        type: String,
        default: "100%"
        }
    },
    data() {
        return {
        chart: null
        };
    },
    mounted() {
        this.initChart();
    },
    beforeDestroy() {
        if (!this.chart) {
        return;
        }
        this.chart.dispose();
        this.chart = null;
    },

    methods: {

        // 横向柱状图 
        initChart() {
            this.chart = echarts.init(this.$refs.echart5);
            // 把配置和数据放这里
            this.chart.setOption({
                tooltip: {
                    show: false
                },
                grid: {
                    top: '35%',
                    left: '30%',
                    bottom:'10%'
                },
                xAxis: {
                    min: 0,
                    max: 1000,
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },
                yAxis: {
                    data: ['园林绿化', '公共设施', '广告牌','消防类','环境类'],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#4cb1ff',
                        fontSize: 10
                    }
                },
                series: [{
                    type: 'bar',
                    label: {
                        show: true,
                        zlevel: 10000,
                        position: 'right',
                        padding: 10,
                        color: '#49bcf7',
                        fontSize: 14,
                        formatter: '{c}',
                        
                    },
                    itemStyle: {
                        color:'#49bcf7'
                    },
                    barWidth: '10',
                    data: [500, 600, 800, 600, 500],
                    z: 100,

                    // 柱子渐变
                    itemStyle: {
                        normal: {
                            barBorderRadius:[10, 10, 10, 10],  //柱形图圆角
                            color: new echarts.graphic.LinearGradient(0,0,1,0,[
                                {offset: 0, color: '#03cbfe'},
                                {offset: 1, color: '#2675eb'}
                            ])
                        }
                    }

                }, {
                    type: 'bar',
                    barGap: '-100%',
                    itemStyle: {
                        color:'rgba(13,29,77,0.1)'
                    },
                    barWidth: '15',
                    data: [1000, 1000, 1000, 1000, 1000],
                    z: 5
                }],
    

            });
        }
    }
}
</script>


<style>
    .echartsCity{
        width: 100%;
        height: 100%;
        z-index: 999;
        font-size: 0.7rem;
    }
    .echcity_bg{
        position: absolute;
        width: 50%;
        height: 90%;
        margin-top: 2%;
    }
</style>
