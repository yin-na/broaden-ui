<template>
    <div class="audio-wrapper">
      <audio ref="audio"  :loop='loop'>
        <source :src="myAudioUrl" type="audio/mp3" />
      </audio>
      <div class="audio-right">
        <div class="audio-time">

          <div class="progress-bar-bg" ref="progressBarBg" @mousedown="handledown()">
            <span ref="progressDot"></span>
            <div class="progress-bar" ref="progressBar"></div>
          </div>
          <div class="audioBtn">
            <div>
              <span class="audio-length-current" ref="audioCurTime">00:00</span>/<span class="audio-length-total" ref="duration">00:00</span>
            </div>

            <div style="font-size: 18px">
              <span class="loops" ref='loop' @click="loopture">循环&nbsp;&nbsp;&nbsp;<img :src="src" alt=""></span>
               <span style="cursor: pointer" ref='ontime' @click="dialogVisible = true">定时&nbsp;<img ref='ontime2' :src="src2" alt="" style="width: 17px;height: 17px;"></span>
            </div>
          </div>
             <!-- 按钮 -->
             <div class="audio-left">
              <img
                ref="audioPlayer"
                v-if="myPlayTemp"
                @click="myPlay()"
                src="@/assets/user/suspend.png"
              />
              <img
                ref="audioPlayer"
                v-if="!myPlayTemp"
                @click="myPlay()"
                src="@/assets/user/play.png"
              />
            </div>
        </div>
      </div>

        <!--  定时弹窗  -->
        <el-dialog :visible.sync="dialogVisible" align="center">
            <div style="position: relative">
                <img src="@/assets/Psychological/tanc.png">
                <div class="tanc-bg">
                    <img src="@/assets/user/closeIcon.png" style="position: absolute;top: -25px;right: -85px" @click='dialogVisible = false'>
                    <h1 style="color: #333;line-height: 50px">设置</h1>
                    <a @click="Dtime(30)" ref='txt1'>定时30分钟</a>
                    <a @click="Dtime(60)" ref='txt2'>定时60分钟</a>
                    <a @click="Dtime(90)" ref='txt3'>定时90分钟</a>
                    <el-button type="primary" @click="downBtn" align="center">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
  </template>

  <script>
  export default {
    name: "myAudio",
    props: ["myAudioUrl"],
    data() {
      return {
        data0: '',
        ontime: false,
        isdisplay: false,
        timer:'',
        radio: 3,
        dialogVisible: false,
        audio: "",
        myPlayTemp: true,
        loop:false,
        src:require('@/assets/user/loop.png'),
        src2: require('@/assets/user/stoped.png')
      };
    },
    beforeDestroy() {
      // 计时结束清空
      clearTimeout(this.timer);
    },
    mounted() {
      this.init();
    },
    beforeDestroy(){
    },
    watch: {
      audio: function(params) {
        let self = this;
        self.audio.addEventListener(
          "timeupdate",
          function() {
            self.updateProgress();
          },
          false
        );
        self.audio.addEventListener(
          "ended",
          function() {
            self.audioEnded()
          },
          false
        );
      }
    },
    methods: {
       realFormatSecond(second) {
          var secondType = typeof second
          if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)
            var hours = Math.floor(second / 3600)
            second = second - hours * 3600
            var mimute = Math.floor(second / 60)
            second = second - mimute * 60
            if(hours>0){
              return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
            }else{
              return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
            }
          } else {
            return '0:00:00'
          }
        },
      loopture(){
        this.loop=!this.loop
        if(this.loop==true){
          this.$refs.loop.style.color = "#eb6100";
          this.src = require('@/assets/user/loop2.png');
        }else{
          this.$refs.loop.style.color = "#fff";
          this.src = require('@/assets/user/loop.png');
        }
      },
      init() {
        this.audio = this.$refs.audio;
        this.audio.load();
        this.audio.pause();
        this.updateProgress();
      },
      // 点击播放/暂停图片时，控制音乐的播放与暂停
      myPlay() {
        if (this.audio.paused) {
          // 开始播放当前点击的音频
           setTimeout(() => {
            this.audio.play();
            },10);
          this.myPlayTemp = false;
          this.$emit('event1', false)
        } else {
          setTimeout(() => {
            this.audio.pause();
            this.myPlayTemp = true;
          this.$emit('event1', true)
            },200);

        }
        this.updateProgress();
      },
      // 更新进度条与当前播放时间
      updateProgress() {
        let value = this.audio.currentTime / this.audio.duration;
        this.$refs.progressBar.style.width = value * 100 + "%";
        this.$refs.progressDot.style.left = value * 100 + "%";
        // 初始时间
        this.$refs.audioCurTime.innerHTML = this.transTime(this.audio.currentTime);
        // 总共时长
        let audioElement = new Audio(this.myAudioUrl);
        let self = this
        audioElement.addEventListener("loadedmetadata", function () {
          let duration2 = (audioElement.duration / 100).toFixed(2).replace('.',':');
          // self.$refs.duration.innerHTML = self.formatTime(duration2);
          self.$refs.duration.innerHTML = self.realFormatSecond(audioElement.duration);
        });
      },
      // 播放结束时
      audioEnded() {
        this.$refs.progressBar.style.width = 0 + "%";
        this.$refs.progressDot.style.left = 0 + "%";
        this.myPlayTemp = true;
        this.$emit('event1', true)
        this.init();
      },
      // 播放时间换算
      transTime(value) {
        let time = "";
        let h = parseInt(value / 3600);
        value %= 3600;
        let m = parseInt(value / 60);
        let s = parseInt(value % 60);
        if (h > 0) {
          time = this.formatTime(h + ":" + m + ":" + s);
        } else {
          time = this.formatTime(m + ":" + s);
        }
        return time;
      },
      //  * 格式化时间显示，补零对齐
      //  * eg：2:4  -->  02:04
      formatTime(value) {
        let time = "";
        let s = value.split(":");
        let i = 0;
        for (; i < s.length - 1; i++) {
          time += s[i].length == 1 ? "0" + s[i] : s[i];
          time += ":";
        }
        time += s[i].length == 1 ? "0" + s[i] : s[i];
        return time;
      },
      // 点击进度条跳到指定点播放
      handledown() {
        // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
        if (!this.audio.paused || this.audio.currentTime != 0) {
          let pgsWidth = this.$refs.progressBarBg.offsetWidth;
          let rate = event.offsetX / pgsWidth;
          this.audio.currentTime = this.audio.duration * rate;
          this.updateProgress();
        }
      },
      // 定时循环
      loop0 (){
        this.loop=!this.loop
      },
      // 调用定时循环 点击时切换颜色
      Dtime (data) {
         this.data0 = data
        if(this.data0 == 30){
          this.$refs.txt1.style.color = "#eb6100";
          this.$refs.txt2.style.color = "#999";
          this.$refs.txt3.style.color = "#999";
        } else if (this.data0 == 60){
          this.$refs.txt1.style.color = "#999";
          this.$refs.txt2.style.color = "#eb6100";
          this.$refs.txt3.style.color = "#999";
        } else if (this.data0 == 90){
          this.$refs.txt1.style.color = "#999";
          this.$refs.txt2.style.color = "#999";
          this.$refs.txt3.style.color = "#eb6100";
        }
        var data1 = this.data0 * 60
        this.timer = setTimeout(this.loop0, data1)
      },
      //  定时弹窗关闭
      downBtn () {
        this.dialogVisible = false
        if (this.data0 == '') {
          this.$message({
            showClose: true,
            message: '请选择您要定时的时间！',
            type: 'warning'
          });
        } else {
          this.$message({
            showClose: true,
            message: '已定时' + this.data0 + '分钟',
            type: 'success'
          });
          this.ontime=!this.ontime
          if(this.ontime==true){
            this.$refs.ontime.style.color = "#eb6100";
            this.src2 = require('@/assets/user/stoped2.png');
          }
        }
      }
    }
  };
  </script>

  <style lang="scss">
  .audio-wrapper {
    color:#fff;
    margin: 10px auto;
    width: 100%;
    height: 50px;
    border-radius: 50px;
  }
   .audioBtn{
     margin-top: 26px;
     display: flex;
     justify-content: space-between;
   }
  .audio-left {
    float: left;
    text-align: center;
    width:100%;
    height: 100%;
  }

  .audio-left img {
    width: 50px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    cursor: pointer;
  }
  .loops{
    margin-right:50px;
    cursor: pointer;
  }
  .audio-right {
    float: left;
    width:100%;
    height: 100%;
    margin-top:10px
  }

  .progress-bar-bg {
    background-color: #d9d9d9;
    position: relative;
    height: 2px;
    cursor: pointer;
  }

  .progress-bar {
    background-color: #649fec;
    width: 0;
    height: 2px;
  }

  .progress-bar-bg span {
    content: " ";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    background-color: #3e87e8;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -5px;
    margin-left: -5px;
    cursor: pointer;
  }

  .audio-time {
    margin-top:2%;
  }

  .audio-length-total {
    font-size: 18px;
  }

  .audio-length-current {
    float: left;
    font-size: 18px;
  }
  /* 定时弹窗 */
  .audio-wrapper{
      .el-dialog{
          background: none !important;
          box-shadow:none !important;
          margin-top: 18vh !important;
          width: 365px;
      }
      .el-message-box__headerbtn .el-message-box__close{
          color: #FE632F !important;
      }
      .tanc-bg{
          position: absolute;
          top: 32%;
          left: 107.5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          a{
              line-height: 38px;
              font-size: 18px;
              cursor: pointer;
              color: #999;
          }
          a:hover{
              color: #FE632F;
          }
          a:visited{
              color: #FE632F;
          }
          .orange{
              color: #FE632F;
          }
          .el-button{
              width: 150px;
              border: none;
              font-size: 18px;
              line-height: 20px;
              outline: none;
              color: #fff;
              border-radius: 20px;
              margin-top: 15%;
              background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
          }
      }
  }
  </style>
