<template>
   <div class='internet' v-if="showtab=='2'">
        <div class='righTop'>
            <div class='fs24 fwb color31'><img src="@/assets/cultivate/title.png" alt="" style='margin-right:15px'>三级网络，覆盖全社会</div>
            <div class='fs14 color9 contents'>在政法委和卫健委社会心理服务整体规划纲要的指导下，易普斯辅助建立三级社会心理服务,网络，以涉及社会各个方面、各类人群，铺设一张覆盖全社会的心理服务网络。</div>
        </div>
        <div class='RightTable'>
            <img src="@/assets/cultivate/threeLevel.png" alt="" > 
        </div>
   </div>
</template>

<script>
export default {
 props:['showtab'],
 data(){
     return{

     }
 }
}
</script>

<style lang="less" scoped>
.internet{
     width:877px;
     .righTop{
         margin-bottom: 90px;
         .contents{
            margin-top:27px;
        }
     }
}

</style>