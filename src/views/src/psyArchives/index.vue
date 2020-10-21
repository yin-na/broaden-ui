/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 心理档案首页
 */
<template>
    <div class="inner arch_warp" :style="{minHeight: clientHeight  + 'px'}" style='padding-top:45px'>
        <div style="width:100%;padding:0 2% 4% 2%;background: #fff;">
          <!-- <vue-scroll :ops="ops" style="width:100%;height: 645px;"> -->
            <div class="warp">
                <div class="srch_tit">个人中心</div>
                <!-- 我的 -->
                <dataMy></dataMy>
            </div>
        <!-- </vue-scroll> -->
        </div>
    </div>
</template>

<script>
import dataMy from './module/dataMy'

export default {
  mixins: [],
  components: {
    dataMy
  },
  data () {
    return {
      clientHeight: 0,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          keepShow: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, // 是否只有滚动的时候才显示滚动条
          background: '#FFA356', // 滚动条颜色
          opacity: 0.5, // 滚动条透明度
          'overflow-y': 'hidden'
        }
      }
    }
  },
  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)
  },
  created () {
  },
  watch: {
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
    }
  }
}
</script>

<style lang="less" scoped>
    .arch_warp{
        width: 100%;
        height: 100%;
        display: flex;
        // align-items: center;
        .warp{
            .srch_tit{
                text-align: center;
                color: #333;
                line-height: 80px;
                font-size: 24px;
            }
            .el-tabs__item.is-active{
                color: #F36421;
            }
            .el-tabs__active-bar{
                background: #F36421;
            }
            .is-top:hover{
                color: #F36421;
            }
        }
        .el-tabs__header{
          margin: 0;
        }
        .el-tabs__header .is-top{
            font-size: 18px;
        }
        .el-table td, .el-table th {
            text-align: center;
            font-weight: normal;
        }
        // 滚动条位置
        /deep/.__bar-is-vertical {
            right: -1px !important;
        }
        // 隐藏横向滚动条
        /deep/.__bar-is-horizontal {
            display: none !important;
        }
    }
</style>
