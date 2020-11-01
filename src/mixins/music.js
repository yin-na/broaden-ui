let timer;
export default {
    
    data() {
        return {
            musicSrc: '', // 音乐播放
            music: {
                isPlay: false,
                currentTime: 0,
                maxTime: 0,
                volume: 100
            }, // 音乐进度
            modalIndex: 0,
            musicItem: {},
        }
    },

    methods: {
        
        // 音乐进度
        changeTime(time){
            this.$refs.music.currentTime = time
        },
        //播放音乐
        listenMusic(noPlay){
            let that = this;
            that.$nextTick(() => {
                that.$refs.music.load();

                that.$refs.music.oncanplay = function () {
                    if(that.$refs.music.readyState){
                        that.music.maxTime = that.$refs.music.duration
                    }
                    that.music.isPlay = !that.$refs.music.paused
                    that.music.currentTime = that.$refs.music.currentTime
                    if (!noPlay) {
                        that.$refs.music.play()
                    }
                }
            })
            that.playMusic();
        },
        // 开始暂停
        play(){
            let play = 0
            if(this.$refs.music.paused){
                play = 1
                this.$refs.music.play()
                this.playMusic();
            }else{
                play = 0
                this.$refs.music.pause()
                clearInterval(timer)
            }

            let { ...list } = this.carouselList[this.modalIndex]
            list.play = play
            
            this.$set(this.carouselList, this.modalIndex, list)
            this.music.isPlay = !this.$refs.music.paused
        },
        // 更换音乐
        showMic(item, index) {
            if (index == this.modalIndex) {
                this.play()
                return
            }
            this.musicSrc = item.fileUploadUrl
            this.musicItem = item
            
            if (!this.musicSrc) {
                this.$Message.error('音乐出错了');
                return
            }

            this.modalMsc = true;
            this.modalIndex = index
            this.listenMusic()
            
            let that = this;
            that.carouselList.forEach((item, indexed) => {
                let { ...list } = item
                list.play = index != indexed ? 0 : !list.play

                that.$set(that.carouselList, indexed, list)
            })
        },
        // 计算时间
        formatTime(time){
            let it = parseInt(time)
            let m = parseInt(it / 60)
            let s = parseInt(it % 60)
            return (m<10?"0":"")+parseInt(it/60)+":"+(s<10?"0":"")+parseInt(it%60)
        },
        playMusic() {
            let that = this;
            timer = setInterval(function() {
                if (that.$refs.music) {
                    that.music.currentTime = that.$refs.music.currentTime
                    that.music.isPlay = !that.$refs.music.paused

                    if (!that.music.isPlay) {
                        clearInterval(timer)
                    }
                }
            }, 1000)
        },
        // 停止播放
        stopMic(flag) {
            if (flag) {
                return
            }
            if (!this.$refs.music.paused) {
                this.play()
            }
        },
        
        // 上一首下一首
        nextMusic(val) {
            let index = this.modalIndex + val
            if (index < 0 || index > this.carouselList.length - 1) {
                
                return
            }
            
            this.modalIndex = index
            this.musicItem = this.carouselList[index]
            this.musicSrc = this.musicItem.fileUploadUrl

            
            if (!this.musicSrc) {
                this.$Message.error('视频出错了');
                return
            }

            this.listenMusic()
        }
    }
}