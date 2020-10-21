/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 心理体检
 */
<template>
    <div class="exam-warp-3" :style="{minHeight: clientHeight  + 'px'}">
        <div class="inner">
            <div class="padding">
                <el-row>
                    <el-col :span="5" v-for="(item,index) in list" :key="index" style="margin:1.2% 2%" class="aaa" >
                        <div :body-style="{ padding: '0px', color:'#4cb08d'}" shadow="hover" class="list_warp" @click="goDetail(item.id)">
                            <img :src="item.coverImage" class="image" >
                            <div class="list-font">
                                <span style="cursor:default">{{item.label}}</span>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { relaxList } from '@/api/base/relax'
export default {
  mixins: [],
  components: {},
  data () {
    return {
      clientHeight: 0,
      list: []
    }
  },

  computed: {
  },

  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)
    relaxList().then(res => {
      this.list = res.data
    })
  },
  methods: {
    goDetail(id){
      this.$router.push({path:'psyRelax/detail',query: {id: id}})
    },
    changePlay (flag) {
      this.autoplay = flag
    },
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

<style lang="less">
    .exam-warp-3{
        width: 100%;
        background: #eff8f7;
        display: flex;
        align-items: center;
        .list_warp{
          width:230px;
          height: 300px;
          padding:5px;
          border-radius:10px;
          background-color: #fff;
          img{
            width:220px;
            height:245px;
          }
        }
        .list_warp:hover{
           transform:scale(1.05)
        }
    }
    .padding{
        padding: 2% 0;
        .aaa{
          margin:0
        }
    }
    .list-font{
        padding: 3% 0;
        text-align: center;
        font-size: 19px;
        color: #4b4948;
    }
    .list-font:hover{
        color: #4cb08d !important;
    }
</style>
