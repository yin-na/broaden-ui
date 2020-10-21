<template>
    <span>{{ hourString +':'+minuteString+':'+secondString }}</span>
</template>

<script>
  export default {
    data () {
      return {
        hour: '',
        minute: '',
        second: '',
        promiseTimer: '',
        allTime: 0
      }
    },
    props: {
      remainTime: { // 倒计时间总秒数
        default: ''
      }
    },
    mounted () {
      if (this.remainTime > 0) {
        this.hour = Math.floor((this.remainTime / 3600) % 24)
        this.minute = Math.floor((this.remainTime / 60) % 60)
        this.second = Math.floor(this.remainTime % 60)
        this.countDowm()
      }
    },
    methods: {
      countDowm () {
        var self = this
        clearInterval(this.promiseTimer)
        this.promiseTimer = setInterval(function () {
          self.allTime ++
          if (self.hour === 0) {
            if (self.minute !== 0 && self.second === 0) {
              self.second = 59
              self.minute -= 1
            } else if (self.minute === 0 && self.second === 0) {
              self.second = 0
              self.$confirm("时间到，已结束答题。", '操作提示', {
                showCancelButton: false,
                closeOnClickModal: false,
                customClass: 'my-base-confirm',
                type: "warning",
                callback: () => {
                  self.$router.go(-1)
                },
              })
            } else {
              self.second -= 1
            }
          } else {
            if (self.minute !== 0 && self.second === 0) {
              self.second = 59
              self.minute -= 1
            } else if (self.minute === 0 && self.second === 0) {
              self.hour -= 1
              self.minute = 59
              self.second = 59
            } else {
              self.second -= 1
            }
          }
          self.$emit('countDowmEnd', self.allTime)
        }, 1000)
      },
      formatNum (num) {
        return num < 10 ? '0' + num : '' + num
      }
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
