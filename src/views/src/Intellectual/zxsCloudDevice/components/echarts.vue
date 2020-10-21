<template>
    <div class="chartWarp">
        <div class="title">
            图形指标：
        </div>
        <div class="histogram">
            <div style="color:#eb6100;font-size:16px;">
                直方图
            </div>
            <div class="chartsData">
                <div class="charTitle">
                   间期数
                </div>
                <div class="chartsItem" id="myChart" style="width:300px;height:285px;"></div>
            </div>
            <div class="bottomTitle">
               RP间期(ms)
            </div>
        </div>
        <div class="histogram">
            <div style="color:#eb6100;font-size:16px;">
               散点图
            </div>
            <div class="chartsData">
                <div class="charTitle">
                    <!-- RP间期n+1(ms) -->
                 </div>
                <div class="chartsItem" id="Scatter" style="width:300px;height:300px;"></div>
            </div>
            <div class="bottomTitle">
                RP间期(ms)
             </div>
        </div>
        <div class="histogram">
            <div style="color:#eb6100;font-size:16px;">
               平衡图
            </div>
            <div class="chartsData">
                <div class="charTitle">
                    迷失神经兴奋
                 </div>
                <div class="chartsItem" id="Balance" style="width:300px;height:300px;"></div>
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
            scatterGraph:{
                handler(value){
                    this.Scatterline(value)
                },
                deep: true
            },
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
                    xAxis: {
                        type: 'category',
                        data: data.abscissas
                    },
                    yAxis: {
                        type: 'value'
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
            Scatterline(scatterGraph){
                let that=this
                 scatterGraph.forEach(item => {
                        let { abscissa, ordinate } = item
                        let json =[abscissa, ordinate ]
                        that.scatter.push(json)
                    });
                let Scatter = this.$echarts.init(document.getElementById('Scatter'))
                 // 散点图
                 Scatter.setOption({
                    xAxis: {},
                    yAxis: {},
                    series: [{
                        symbolSize: 7,
                        itemStyle: {
                            normal:{color:'#37C9FF' }
                        },
                        data:that.scatter,
                        type: 'scatter'
                    }]
                })
            },
            Balanceline(item){
                let Balance = this.$echarts.init(document.getElementById('Balance'))
                // 平衡图
                Balance.setOption({
                    xAxis: {
                        type: 'category',
                        data: item.names
                    },
                    yAxis: {
                        type: 'value'
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
    padding:32px 0 0 25px;
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
    text-align: center  ;
}
.title{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-bottom: 50px;
}
</style>
