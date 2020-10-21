/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 心理体检
 */
<template>
    <div class="exam-warp0" :style="{minHeight: clientHeight  + 'px'}">
        <div class="inner height">
            <div>
                <el-row>
                    <el-col :span="4" v-for="item in records" :key="item.id" style="margin:2% 2.2%">
                        <el-card :body-style="{ padding: '0px', color:'#4cb08d'}" shadow="hover" class="list_warp">
                            <div>
                              <img :src="item.image" class="image" @click="routerLink(item.id)">
                            </div>
                            <div class="list-font">
                                <span>{{item.name}}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import { scaleList } from '@/api/user/psyExamintion'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  components: {},
  data () {
    return {
      clientHeight: 0,
      codeUrl: '',
      records: ''
    }
  },

  computed: {
    ...mapGetters([
      'dynamicModuleDat',
      'token',
      'user',
      'qq'
    ])
  },

  created () {
    scaleList({}).then(res => {
      this.records = res.data.records
    }).catch(e => {
    })
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

    routerLink: function (id) {
      if (this.token) {
        this.$router.push({
          path: 'psyExamintion/examDetail',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .exam-warp0{
      width: 100%;
      background: #eff8f7;
      display: flex;
      align-items: center;
    }
    .list_warp{
        cursor: pointer;
    }
    .image{
      width: 100%;
      height: 100%;
    }
    .list-font{
        padding-top: 2%;
        padding-bottom: 4%;
        text-align: center;
        font-size: 20px;
        color: #4b4948;
    }
    .list-font:hover{
        color: #4cb08d !important;
    }
    .el-card{
      border: none !important;
      border-radius: 15px;
    }
    .height{
      height: 100%;
    }
    .el-col-4{
      width: 15%;
    }
</style>
