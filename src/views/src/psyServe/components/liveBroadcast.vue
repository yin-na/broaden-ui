<template>
    <div class="liveline bgf">
        <div class="curriculums fwb fs18">
            <img  src="@/assets/user/live.png" alt="">
            <span style="margin-left:32px">线上直播</span>
        </div>
        <div class="onlive">
            <img src="@/assets/user/livepic.png" alt="">
        </div>
       
    </div>
    
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }

</script>

<style lang='scss' scoped>
    .liveline{
        width: 302px;
    }
    .curriculums{
        width:100%;
        height:44px;
        line-height: 44px;
        border: 1px solid #ddd;
        padding-left:20px;
        border-top:3px solid #eb6100;
        position: relative;
    }
    .onlive{
            padding:25px 26px;
        }
    .curriculums img{
        position: absolute;
        top:10px;
    }
</style>