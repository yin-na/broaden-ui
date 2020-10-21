<template>
   <div class='internet' v-if="showtab=='5'">
        <div class="textCet">
            <img src="@/assets/cultivate/mode01.png" alt="" style='margin:20px 0 50px'>
        </div>
        <div class="textCet">
            <img src="@/assets/cultivate/mode02.png" alt="" style='margin:20px 0 50px'>
        </div>
        <div class="textCet">
            <img src="@/assets/cultivate/mode05.png" alt="" style='margin:20px 0 50px'>
        </div>
        <div class="textCet">
            <img src="@/assets/cultivate/mode04.png" alt="" style='margin:20px 0 50px'>
        </div>
        <div class='righTop'>
            <div class='fs24 fwb color31 textCet' style="color:#FF6631">服务主要功能</div>
            <div class='fs14 color9 contents'>在政法委和卫健委社会心理服务整体规划纲要的指导下，易普斯辅助建立三级社会心理服务,网络，以涉及社会各个方面、各类人群，铺设一张覆盖全社会的心理服务网络。</div>
        </div>
        <div>
        </div>
        <div class='RightTable'>
            <div class='tableItem' v-for="(item,index) in dataItem" :key="index" @mouseenter="enters(index)" @mouseleave="leave(index)">
                <img :src="item.image" alt="" style="width:32px;height:33px">
                 <div class='fs18 color3 tt'>{{item.title}}</div>
                 <div class='fs14 color9 aa'>{{item.content}}</div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
 props:['showtab'],
 data(){
     return{
         dataItem:[
             {
                 title:'档案管理',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule01.png")
             },{
                 title:'服务中心',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule02.png")
             },{
                 title:'志愿者信息库',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule03.png")
             },{
                 title:'数据指挥中心',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule04.png")
             },{
                 title:'移动服务',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule05.png")
             },{
                 title:'心理网站',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule06.png")
             },{
                 title:'智享物联',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule07.png")
             },{
                 title:'心理热线',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule08.png")
             },{
                 title:'心服务',
                 content:'从建档开始到每一次的心理体检的 记录都会有完善的档案管理。',
                 image:require("@/assets/cultivate/bule09.png")
             },
         ],
         whiteData:[
             {img:require('@/assets/cultivate/white01.png')},
             {img:require('@/assets/cultivate/white02.png')},
             {img:require('@/assets/cultivate/white03.png')},
             {img:require('@/assets/cultivate/white04.png')},
             {img:require('@/assets/cultivate/white05.png')},
             {img:require('@/assets/cultivate/white06.png')},
             {img:require('@/assets/cultivate/white07.png')},
             {img:require('@/assets/cultivate/white08.png')},
             {img:require('@/assets/cultivate/white09.png')}
         ],
          buleData:[
             {img:require('@/assets/cultivate/bule01.png')},
             {img:require('@/assets/cultivate/bule02.png')},
             {img:require('@/assets/cultivate/bule03.png')},
             {img:require('@/assets/cultivate/bule04.png')},
             {img:require('@/assets/cultivate/bule05.png')},
             {img:require('@/assets/cultivate/bule06.png')},
             {img:require('@/assets/cultivate/bule07.png')},
             {img:require('@/assets/cultivate/bule08.png')},
             {img:require('@/assets/cultivate/bule09.png')}
         ]
     }
 },
 methods:{
     enters(index){
         this.dataItem[index].image=this.whiteData[index].img
     },
     leave(index){
        this.dataItem[index].image=this.buleData[index].img
     }
 }
}
</script>

<style lang="less" scoped>
.internet{
     width:877px;
     .righTop{
         margin-bottom:50px;
         .contents{
            margin-top:27px;
        }
     }
     .RightTable{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .tableItem{
            width:273px;
            height:165px;
            position: relative;
            border:1px solid #E7E7E7;
            padding:47px 29px 35px 27px;
            margin-bottom: 36px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
            cursor: default;
            img{
                position: absolute;
                left: 33px;
                top:42px;
            }
       }
       .tableItem:hover{
           background-color:#014F97;
           
       }
       .tableItem:hover .tt{
           color:#fff !important
       }
        .tableItem:hover .aa{
           color:#fff !important
       }
     }

}

</style>