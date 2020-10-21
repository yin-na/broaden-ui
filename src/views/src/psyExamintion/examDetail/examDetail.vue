/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 心理体检详情
 */
<template>
    <div class="exam-warp" :style="{minHeight: clientHeight  + 'px'}">
        <div class="inner">
            <div class="card_warp">
                <el-card class="box-card" v-for="item in scaleDeil" :key="item.id">
                    <div class="card_tit">
                        <div class="le_cont fl">
                            <img :src="item.image2" class="pic">
                        </div>
                        <div class="ri_cont fr">
                            <h3>{{item.name}}</h3>
                            <p>{{item.introduce}}</p>
                            <div class="cp-btn">
                              <el-button round @click="answerBtn(item.id, item.name)">开始测评</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { scaleDeil } from '@/api/user/psyExamintion'

export default {
  components: {},
  data () {
    return {
      clientHeight: 0,
      id: '',
      name: '',
      scaleDeil: ''
    }
  },

  computed: {
  },

  created () {
    this.getParams()
    scaleDeil(this.id).then(res => {
      this.scaleDeil = res.data
    }).catch(e => {
    })
  },

  watch: {
    '$route': 'getParams'
  },

  mounted () {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight
    this.clientHeight = clientHeight - 169
    window.addEventListener('scroll', this.handleScroll)
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
    getParams () {
      const id = this.$route.query.id
      this.id = id
    },

    answerBtn: function (id, name) {
      if (id == '3aac8b5de5ca93eddd57b2d536b5d9ff') {
        this.$router.push({
          path: '/psyExamintion/answer-1',
          query: {
            id: id,
            name: name
          }
        })
      } else {
        this.$router.push({
          path: '/psyExamintion/answer',
          query: {
            id: id,
            name: name
          }
        })
      }
    }

  }
}
</script>

<style lang="less" scoped>
    .card_warp{
        padding-top: 4%;
        .card_tit{
        height: 100%;
          .le_cont{
              width: 40%;
              padding: 5% 3%;
              .pic{
                width: 500px;
                height: 479px;
              }
          }
          .ri_cont{
              width: 54%;
              height: 540px;
              padding: 5% 3% 0 3%;
              position: relative;
              h3{
                  color: #f29953;
                  margin-bottom: 8%;
                  font-size: 20px;
              }
              p{
                  margin: 4% 0;
                  line-height: 26px;
                  font-size: 16px;
              }
              .cp-btn{
                  position: absolute;
                  bottom: 0;
              }
          }
      }
      .el-button--mini, .el-button--mini.is-round{
          width: 190px;
        line-height: 28px;
        margin-top: 20%;
          font-size: 16px;
        background: linear-gradient(90deg,  #FF9844 0%, #FE632F 50%, #F1511B 100%);
        color: #fff;
        outline: none;
        border: none;
      }
    }
</style>
