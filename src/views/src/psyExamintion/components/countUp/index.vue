<template>
    <span ref="time">{{ hourString +':'+minuteString+':'+secondString }}</span>
</template>

<script>// 正计时
  export default {
    data () {
      return {
        hour: 0,
        minute: 0,
        second: 0,
        promiseTimer:null,
        allTime:0
      }
    },
    props: {
      remainTime: { // 正计时总时间
        default: ''
      }
    },
    mounted () {
        this.hour = Math.floor((this.allTime / 3600) % 24)
        this.minute = Math.floor((this.allTime / 60) % 60)
        this.second = Math.floor(this.allTime % 60)
        this.countDowm()
    },
    methods: {
      countDowm () {
        var self = this
        clearInterval(this.promiseTimer)
        self.promiseTimer = setInterval(function () {
          self.second ++
          self.allTime++
          if (self.second >= 60) {
              self.second = 0
              self.minute ++
            if (self.minute >= 60) {
              self.minute = 0
              self.hour ++
            }
          }
          self.$emit('countUpEnd', self.allTime)
        }, 1000)
      },

    // 补齐两位数
      formatNum (num) {
          if (num < 10) {
            return '0' + num
        } else {
            return '' + num
        }
      }
    },
    destroyed() {
         clearTimeout(this.promiseTimer)
    },
    computed: {
      hourString () {
        return this.formatNum(this.hour)
      },
      minuteString () {
        return this.formatNum(this.minute)
      },
      secondString () {
        return this.formatNum(this.second)
      }
    }
  }
</script>
