<template>
    <div class="content" :style="{minHeight: clientHeight  + 'px'}">
       <div class="relaxDetail" style="">
        <div class=detailRight>
            <div v-if="id==5 || id==6">
                <div v-if="id==5" class="musicImg" :class="{enlargeplay:isActive}">
                    <img src="@/assets/user/jdhx.png" alt="">
                </div>
                 <div v-else class="musicImg" :class="{enlargeplay:isActive}">
                    <img src="@/assets/user/478hx.png" alt="">
                </div>
            </div>
            <div v-else>
                <div class="musicImg" :class="{musicImgplay:isActive}">
                    <img :src="spinImage" alt="">
                </div>
                <div class="playerImg" :class="{playerImgplay:isActive}">
                    <img src="@/assets/user/player.png" alt="">
                </div>
            </div>
              <div style="text-align:center;color:#fff;font-size:26px;height:39px">
                  {{remarkdata}}
              </div>
             <div class="musicPlay">
               <myAudio ref="myAudioOne" :myAudioUrl="musicSrc" @event1="changePlay"></myAudio>
             </div>
        </div>
             <div class="fs18" style="font-size:22px;color:#fff;text-align:center;margin-top:7%;height:21px">
                  {{name}}
            </div>
         </div>
    </div>
</template>
<script>
 import { getRelaxDetailInfo  } from '@/api/base/relax'
 import myAudio from '../components/myAudio.vue'
 var timer=null
 var outtime=null
    export default{
        data(){
            return {
                isActive:false,
                textcontent:'',
                apply:'',
                id:'',
                spinImage:'',
                backimg:'',
                musicSrc:'',
                remarklist:[],
                remarkdata:'',
                index:0,
                indexx:0,
                name:'',
                time:[4000,7000,8000],
                clientHeight: 0
            }
        },
        components:{
            myAudio
        },
        created () {
            this.id=this.$route.query.id
            this.getMisic()
        },
        mounted () {
          var clientHeight = window.innerHeight || document.documentElement.clientHeight
          this.clientHeight = clientHeight - 169
          window.addEventListener('scroll', this.handleScroll)
        },
        watch: {
            musicSrc:function (val) {
                const self = this
                self.$refs.myAudioOne.init();
                self.$refs.myAudioOne.audioEnded();
            }
        },
        beforeDestroy(){
        },
        destroyed(){
            if(this.id==6){
                clearTimeout(timer)
            }else{
               clearTimeout(outtime)
            }
        },
        methods: {
          handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 200) {
              if (!this.familyShow) {
                this.clientHeight = this.clientHeight + 500
              }
              this.familyShow = true
            }
            if (scrollTop > 700) {
              if (!this.testShow) {
                this.clientHeight = this.clientHeight + 500
              }
              this.testShow = true
            }
            if (scrollTop > 1000) {
              if (!this.xlShow) {
                this.clientHeight = this.clientHeight + 500
              }
              this.xlShow = true
            }
            if (scrollTop > 1400) {
              this.xzShow = true
            }
          },
            changePlay(val){
                this.isActive=!val
                if((this.isActive) && this.remarklist!=[]){
                    if(this.id==6){
                        this.setTime(this.remarklist,this.time)
                    }
                    if(this.id==5){
                        this.Timeout(this.remarklist)
                    }
                }else{
                    if(this.id==6){
                        clearTimeout(timer)
                    }else{
                       clearTimeout(outtime)
                    }
                }
            },
            getMisic(){
                let id=this.id
                getRelaxDetailInfo(id).then(res=>{
                    this.spinImage=res.data.spinImage
                    this.musicSrc=res.data.resourceUrl
                    this.backimg=res.data.backImage
                    this.apply=res.data.fit
                    this.name=res.data.name
                   if(res.data.remark!=null){
                        this.remarklist=res.data.remark.split('#')
                   }
                    this.textcontent=res.data.introduce
                })
            },
            setTime(remarklist,time){
                let self=this
                self.remarkdata=remarklist[self.index]
                timer=setTimeout(function(){
                    self.index++
                    if(self.index==3){
                    self.index=0}
                    self.setTime(remarklist,self.time)
                },time[self.index])
            },
            Timeout(remarklist){
                let self=this
                self.remarkdata=remarklist[self.indexx]
                outtime=setTimeout(function(){
                    self.indexx++
                    if(self.indexx==2){self.indexx=0}
                    self.Timeout(remarklist)
                },4000)
            }
        }
    }
</script>
<style lang="less">
    audio:not([controls]){
        display: block !important;
    }
    .content{
        width:100%;
        min-height:751px;
        padding-top:20px;
        position: relative;
    }
   .relaxDetail{
       background-image: url('../../../../assets/user/sleepchange.png');
       margin:0 auto;
         width:1200px;
         height:700px;
   }
   .introduction{
       margin-top:45px;
   }
   .musicImg{
       width:300px;;
       height:300px;
       border-radius: 50%;
       padding:36px;
       position:absolute;
       left:255px;
       top:100px;
    //    background-color: #fff;
   }
   .playerImg{
       width: 300px;
       height:300px;
       position:absolute;
       left: 255px;
       top: 100px;
   }
   .musicImg img{
       width: 228px;
   }
   .musicPlay{
       min-height: 40px;
   }
      @keyframes scaleDraw {
            0%{transform: scale(1);}
            25%{transform: scale(1.1);}
            50%{transform: scale(1);}
            75%{transform: scale(1.1);}
        }
    .enlargeplay{
        -webkit-animation-name: scaleDraw;
        -webkit-animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-duration:8s;
        }
   .musicImgplay{
    animation: rotateArround 3.5s linear 1s infinite;
    -webkit-animation: rotateArround 3.5s linear 1s infinite;
	-moz-animation: rotateArround 3.5s linear 1s infinite ;
	-ms-animation: rotateArround 3.5s linear 1s infinite;
	-o-animation: rotateArround 3.5s linear 1s infinite;
    }
    .playerImgplay{
        animation: rotateArround 10.5s linear 1s infinite;
    -webkit-animation: rotateArround 10.5s linear 1s infinite;
	-moz-animation: rotateArround 10.5s linear 1s infinite ;
	-ms-animation: rotateArround 10.5s linear 1s infinite;
	-o-animation: rotateArround 10.5s linear 1s infinite;
    }
@keyframes rotateArround {
	from {transform: rotateZ(0deg);}
	to {transform: rotateZ(360deg);}
}

@-webkit-keyframes rotateArround {
	from {-webkit-transform: rotate(0deg);
	}
	to {-webkit-transform: rotate(360deg);}
}

@-moz-keyframes rotateArround {
	from {-moz-transform: rotate(0deg);}
	to {-moz-transform: rotate(360deg);}
}

@-ms-keyframes rotateArround {
	from {-ms-transform: rotate(0deg);}
	to {-ms-transform: rotate(360deg);}
}

@-o-keyframes rotateArround {
	from {-o-transform: rotate(0deg);}
	to {-o-transform: rotate(360deg);}
}
    .detailRight{
        width: 800px;
        margin: 30px auto 0;
        padding-top: 38%;
        /* padding: 220px 50px 20px; */
        position: relative;
    }
</style>
