<template>
<div class="tabsright" v-if="showtab=='1'">
    <div class='righTop'>
        <div class='fs24 fwb color31'><img src="@/assets/cultivate/title.png" alt="" style='margin-right:15px'>社会心理服务体系整体解决方案</div>
        <div class='fs14 color9 contents'>社会心理服务体系根据已有的需求和挑战，为建立有效的社会心理服务体系制定了一套解决方案，即三级网络、三类服务和三项建设。（辅助建立三级网络、积极提供三项服务和三项建设）</div>
    </div>
    <div class="rightBottom">
        <div class="fs20" style="color:#11224e;margin-bottom:25px">顶层建设   系统规划     划重点群体   区别服务</div>
        <div class='disflex spacebetween' >
        <div v-for='(item,index) in dataList' :key='index' style="width:265px">
                <div class='Header' :style="{background:item.bgcolor}">{{item.tit}}</div>
                <div class="Contents">
                    <div v-for="(data,index) in item.content" :key='index'>
                        <div class='fs18 color3 fwb'>{{data.name}}</div>
                        <div class='fs14 color9'>{{data.adress}}</div>
                    </div>
                </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:['showtab'],
    data(){
        return{
            dataList:[
                {
                tit:'三级网络',
                bgcolor:'#ff7738',
                content:[
                    {
                    name:'市、区、县',
                    adress:'心理服务指导中心'
                    },{
                    name:'乡镇、街道',
                    adress:'心理服务中心'
                    },{
                    name:'社区、村',
                    adress:'心理咨询室'
                    },
                ]
                },{
                tit:'三项服务',
                bgcolor:'#0bccfd',
                content:[
                    {
                    name:'检测',
                    adress:'社会心态、心理健康'
                    },{
                    name:'预防',
                    adress:'宣传教育、心理训练'
                    },{
                    name:'干预',
                    adress:'心理咨询危机干预'
                    },
                ]
                },{
                tit:'三项建设',
                bgcolor:'#3ad6c1',
                content:[
                    {
                    name:'场室建设',
                    adress:'心理驿站'
                    },{
                    name:'队伍建设',
                    adress:'专兼职队伍、社会力量'
                    },{
                    name:'网络平台',
                    adress:'智慧心理'
                    },
                ]
                }
            ],
        }
    }

}
</script>

<style lang="less" scoped>
  .tabsright{
    width:877px;
    .righTop{
      .contents{
        margin-top:27px;
      }
    }
    .rightBottom{
    margin-top:80px;
    .Header{
      height:53px;
      line-height: 53px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      border-radius: 20px 20px 0 0;
    }
    .Contents{
      height:280px;
      background-color:#fafafa;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding:33px 0 38px;
      text-align: center;
    }
  }
  }
</style>