<template>
    <div v-show='shows' class="phoneDialog">
       <div class="dialogContent">
           <span>400-998-0708</span>
           <span class="fs18 color9">心理健康服务援助热线</span>
           <div class="dialogPic">
               <img src="@/assets/user/xylLogo.png" alt="">
           </div>
           <div class="clocePic" @click="clocePic">
               <img src="@/assets/user/closeIcon.png" alt="">
           </div>
           
       </div>
    </div>
</template>

<script>
export default {
     props:['show'],
     data(){
         return{
             shows:false
        }
     },
      watch: {
	    show(val) {
	      this.shows = val
	    }
	  },
      methods: {
          clocePic(){
            this.$emit('clocePic', false)
          }
        
    }

}
   
</script>

<style lang="scss">
.phoneDialog{
    position: absolute;
    font-family:Microsoft YaHei;
    top: 0;
    left: 0;
    z-index:999;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    .dialogContent{
        position: absolute;
        top: 50%;
        margin-top:-100px;
        left: 50%;
        margin-left:-160px;
        z-index:100;
        width:320px;
        height:200px;
        background:rgba(255,255,255,1);
        border-radius:20px;
        text-align: center;
        span{
            display: block;
        }
        span:nth-child(1){
            margin-top:25%;
            font-size:20px;
            font-weight:600;
            color:#eb6100;
        }
         span:nth-child(2){
             margin-top:10px
         }
    
    }
     .dialogPic{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
        padding-top: 4%;
        position: absolute;
        left: 84px;
        top: -71px;
         img{
             width:68%
         }
     }
     .clocePic{
        position: absolute;
        right:16px;
        top: 8px;
     }
}
</style>