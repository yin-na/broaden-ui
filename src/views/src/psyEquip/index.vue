/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 心理档案
 */
<template>
    <div class="EquipWarp" :style="{minHeight: clientHeight  + 'px'}">
        <div class="Equipcontent">
            <img src="@/assets/Psychological/AIbg.png" alt="" style="width: 974px; height: 603px">
            <!-- 太空舱 -->
            <div class="spaceship" @click="gotospace">
                <div>太空舱</div>
                <img src="@/assets/Psychological/spaceship.png" alt="">
            </div>
            <!-- 呐喊宣泄 -->
            <div class="shoutway" @click="gotoshout">
                <div>呐喊宣泄</div>
                <img src="@/assets/Psychological/shoutway.png" alt="">
            </div>
            <!-- 心理健康自助仪 -->
             <div class="brainWaves" @click="ComingSoon" >
                <div>心理健康自助仪</div>
                <img src="@/assets/Psychological/mentalHealth.png" alt="">
            </div>
            <!-- 压力分析仪 -->
             <div class="Pressure" @click="ComingSoon">
                <div>压力分析仪</div>
                <img src="@/assets/Psychological/PressureAnalysis.png" alt="">
            </div>
            <!-- 脑波 -->
             <div class="brainWave" @click="ComingSoon">
                <div>脑波认知训练</div>
                <img src="@/assets/Psychological/brainWaves.png" alt="">
            </div>
            <!--  font  -->
            <div class="font-txt">
                <img src="@/assets/Psychological/font.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
    mixins: [],
    components:{},
    data(){
        return{
          clientHeight:0,
        }
    },
    computed: {
    },
  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)
  },
    methods:{
      handleScroll () {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
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
        gotospace(){
            if(getToken()){
                this.$router.push('/psyEquip/CloudDevice/index')
            }else{
                this.$router.push('/login')
            }

        },
        gotoshout(){
             if(getToken()){
            this.$router.push('/psyEquip/BigShouting/index')
            }else{
                this.$router.push('/login')
            }

        },
        ComingSoon(){
            this.$message({
          message: '敬请期待',
          type: 'success'
        });
        }
    }
}
</script>

<style lang="less" scoped>
.EquipWarp{
    background-color:#1a7bfd;
}
.Equipcontent{
    width:1200px;
    min-height: 759px;
    margin: 0 auto;
    padding-top: 80px;
    text-align: center;
    position: relative;
    cursor: default;
    .spaceship{
        text-align: right;
        color:#fff;
        position:absolute;
        top:33%;
        left:15%;
        cursor: pointer;
        div{
            padding-right: 6px;
            height:40px;
            line-height: 40px;
        }
    }
    .shoutway{
        text-align: center;
        color:#fff;
        position:absolute;
        top:29%;
        right:16%;
        cursor: pointer;
        div{
            height:40px;
            line-height: 40px;
        }
    }
    .brainWaves{
        text-align: center;
        color:#fff;
        position:absolute;
        top:17%;
        right:29%;
        cursor: pointer;
        div{
            height:40px;
            line-height: 40px;
        }
    }
    .Pressure{
        text-align: center;
        color:#fff;
        position:absolute;
        top:10%;
        right:51%;
        cursor: pointer;
        div{
            height:40px;
            line-height: 40px;
        }
    }
    .brainWave{
        text-align: center;
        color:#fff;
        position:absolute;
        top:19%;
        left:27.5%;
        cursor: pointer;
        div{
            height:40px;
            line-height: 40px;
        }
    }
    .font-txt{
        position:absolute;
        top:90%;
        left:37%;
    }
}
</style>
