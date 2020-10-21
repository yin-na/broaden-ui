<template>
    <div class="chartWarp">
        <div class="title">
            图形检测报告：
        </div>
        <div class="histogram">
            <div style="color:#eb6100;font-size:16px;border-left:4px solid #eb6100;padding-left:8px">
               精神压力/心脏自主神经
            </div>
            <div class="chartsData">
                <div class="chartsItem" id="Balance" style="width:300px;height:300px;"></div>
            </div>
            <div style="width:300px;margin:0 auto;height:300px;padding-right:25px">
                <div class="floatLeft w50 h45 textCet fs16 color6">
                    1182.3
                    <div class="fs14 colorC3">PR间期均值</div>
                </div>
                <div class="floatLeft w50 h45 textCet">
                        2.3
                    <div class="fs14 colorC3">变异指数</div>
                </div>
                 <div class="floatLeft w50 h45 textCet fs16 color6">
                    1182.3
                    <div class="fs14 colorC3">TINN</div>
                </div>
                <div class="floatLeft w50 h45 textCet">
                        2.3
                    <div class="fs14 colorC3">HRV三角指数</div>
                </div>
                 <div class="floatLeft w50  h45  textCet fs16 color6">
                    1182.3
                    <div class="fs14 colorC3">间期标准差</div>
                </div>
                <div class="floatLeft w50 h45 textCet">
                        2.3
                    <div class="fs14 colorC3">间期极差</div>
                </div>
                 <div class="floatLeft w50 h45 textCet fs16 color6">
                    1182.3
                    <div class="fs14 colorC3">PNN50%</div>
                </div>
                <div class="floatLeft w50 h45 textCet">
                        2.3
                    <div class="fs14 colorC3">HRV差分指数</div>
                </div>
            </div>
        </div>

        <div class="histogram">
            <div style="color:#eb6100;font-size:16px;">
                直方图
            </div>
            <div class="chartsData">
                <!-- <div class="charTitle">
                   间期数
                </div> -->
                <div class="chartsItem" id="myChart" style="width:300px;height:285px;"></div>
            </div>
            <div class="bottomTitle">
                <div class="mb30 fs16 color6">
                    123.8
                    <div class="fs14 colorC3">相邻PR间期差的均方根</div>
                </div>
                <div class="mb30 fs16 color6">
                    123.8
                    <div class="fs14 colorC3">相邻PR间期差的标准差</div>
                </div>
                <div class="mb30 fs16 color6">
                    123.8
                    <div class="fs14 colorC3">PNN50</div>
                </div>
                <div class="mb30 fs16 color6">
                    123.8
                    <div class="fs14 colorC3">HRV对数指数</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:["scatterGraph","histogramGraph","balanceGraph"],
        data(){
            return {
                scatter:[]
            }
        },
        watch:{
            balanceGraph:{
                handler(item){
                    this.Balanceline(item)
                },
                deep: true
            },
            histogramGraph:{
                handler(data){
                    this.drawLine(data)
                },
                deep: true
            }
        },
        mounted() {
            // this.drawLine()
            // this.Balanceline()
        },
        methods: {
            drawLine(data){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 直方图
                myChart.setOption({
                    // backgroundColor:'#f9f9f9',
                    grid: {
                        show:true,
                        borderWidth:'1',
                        borderColor:'#eeeeee'
                    },
                    xAxis: {
                        type: 'category',
                        data: data.abscissas, 
                        axisLine:{
                            show:false
                        },
                        axisTick: {    //刻度线
                                show: false
                          }
                    },
                    yAxis: {
                        type: 'value',
                         axisLine:{
                            show:false
                        },
                        axisLabel : {
                            textStyle: {
                                color: '#eeeeee'
                            }
                        },
                         splitLine: {     //网格线
                             show: false
                         },
                          axisTick: {    //刻度线
                                show: false
                          }
                    },
                    series: [{
                        data:data.ordinates,
                        type: 'bar',
                        barWidth : 15,
                        itemStyle: {
                            normal:{color:'#37C9FF' }
                        }
                    }]
                })
            },
            Balanceline(item){
                let Balance = this.$echarts.init(document.getElementById('Balance'))
                // 平衡图
                Balance.setOption({
                    xAxis: {
                        type: 'category',
                        data: item.names,
                    },
                    yAxis: {
                        type: 'value',
                         axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        data: item.values,
                        type: 'bar',
                        barWidth :88,
                        itemStyle: {
                            normal:{color:'#37C9FF' }
                        }
                    }]
                })
            }
        }
    }

</script>

<style>
.chartWarp{
    padding:32px 0 30px 25px;
    width:355px;
    background-color: #fff;
    border-radius: 10px;
}
.chartsData{
    display: flex;
}
.histogram{
    margin-bottom:20px;
}
.charTitle{
    margin:0 auto;
    width:20px;
    font-size: 14px;
    line-height:24px;
    color:#C3C3C3;
    margin-top: 30%;
    text-align: center;
}
.bottomTitle{
    color:#C3C3C3;
    font-size: 14px;
    padding-left:27px
}
.title{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-bottom: 50px;
}
</style>
