/**
*王冬冬 
*/
//  基础折线图
<template>
	<div id="echartsLine" ref="echartsLine" class="container"></div>
</template>

<script>
// 引入基本模板
import echarts from "echarts";
export default {
	name: "echarts-line",
	props:{
		//接受父组件传递来的数据
		dataLineColor:{
			type:String,
			default:()=> '#eb6100'
		},
		isYaxisLine:{
			type:Boolean,
			default:()=> true
		},
		textTitle:{
			type:String,
			default:()=> ''
		},
		isCurve:{//是否为平滑曲线
			type:Boolean,
			default:()=> false
		},
		ysplitLine:{
			type:Boolean,
			default:()=> true
		},
		Xitems: {
			type: Array,
			default() {
				//x坐标数据
				return [];
			}
		},
		data:{
			type:Array,
			default(){
				return []
			}
		},
		series:{
			type:Array,
			default(){
				return []
			}
		},
		legend:{
			type:Array,
			default(){
				return []
			}
		},
		
  },
  data() {
    return {
      //option:{}
    };
  },
	mounted() {
		let that = this
		this.$nextTick(function(){
			that.initPie();
		});
  },
  methods:{
	initPie(){
		//this.option = this.dataObj;
		var dom = this.$refs.echartsLine;
		var myChart = echarts.init(dom);
		var option ={
			color:['#ff0000','#0e9cff'],
			legend: {
				left: 'right',
				icon: 'circle',  
				itemWidth: 8,  // 设置宽度
				itemHeight: 8, // 设置高度
				data: this.legend
			},
			title : {
				text: this.textTitle,
				x: 'center',
				top: 20,
				textStyle:{
					color:'#252a2e',
					fontSize:16,
					fontWeight:'normal'
				}
			},
			tooltip: {
				trigger: 'axis'
			},
			grid:{
				//图表的位置
				top: "16%",
				left: "3%",
				right: "10%",
				bottom: "5%",
				containLabel: true
			},
			xAxis:{
				axisTick:{
					show:false,
				},
				axisLine:{
					lineStyle: {
						color: '#eaedf2',
						width: 1
					}
				},
				boundaryGap: false,
				axisLabel: {
					textStyle: {
						color: '#80878e',//坐标值得具体的颜色

					}
				},
				type: "category",
				data: this.Xitems,
				splitLine: { show : false}
			},
			yAxis:{
				axisTick:{
					show:false,
				},
				axisLine:{
					show:false,
				},
				axisLabel: {
					textStyle: {
						color: '#80878e',//坐标值得具体的颜色
						width: 1
					}
				},
				type: "value",
				splitLine: {
					show: this.ysplitLine,       //显示网格线
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: ['#e3e4e6'],
						width: 1,
						type: 'dashed'
					}
				}
			},
			series: this.series.length > 0 ? this.series : [
				{
					symbol: this.isCurve ? 'none' : '', //去掉折线图中的节点
					smooth: this.isCurve,  //true 为平滑曲线，false为直线
					data: this.data,
					type: "line",
					itemStyle: {
						normal: {
							color: this.dataLineColor,
							lineStyle: {
								color: this.dataLineColor,
							}
						}
					},
					areaStyle: {
						normal: {
							opacity: 0.3,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //关键在这里, 设置面积渐变
								offset: 0,
								color: this.dataLineColor //这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
							}, {
								offset: 1,
								color: '#fff'
							}])
						}
					}
				}
			]
		};
		if (option && typeof option === "object"){
			myChart.setOption(option, true);
		}
		window.addEventListener("resize", function () {
			myChart.resize();
		});
	}
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  width:100%;
  margin: 0 auto;
  vertical-align: middle;
}
</style>
