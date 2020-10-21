<template>
   <div style='background: rgb(239, 248, 247);'>
      <div class="headwarp">
        <div class="daoh">
            <div class="nav-list" v-for="item in dataItem" :key="item.id" @click="goDetail(item.typePath,item.id)">
                <img :src="item.image">
                <span :class="{active:ischange==item.id}">{{item.name}}</span>
            </div>
        </div>
    </div>
   </div>
</template>

<script>
import { getAllType, testResource } from '@/api/RelaxationCenter/relax'

export default {
  components: {},
  data () {
    return {
      ischange:'',
      dataItem: []
    }
  },

  computed: {
  },

  created () {
    this.initData()
  },

  methods: {
    initData () {
      getAllType().then(res => {
        this.dataItem = res.data
      }).catch(e => {})
    },
    goDetail (url, id) {
      this.ischange=id
      // 统计次数
      testResource(id).then(res => {
        // console.log(res, '统计成功')
      }).catch(e => {})
      this.$router.push({
        path: url,
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.headwarp{
    width: 1200px;
    margin: 0 auto;
    .active{
      color:#00C4FF!important
    }
    .daoh{
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .nav-list{
            width: 16.6%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-bottom: 12px;
            }
            span{
                font-size: 16px;
                color: #666;
            }
        }
    }
}
</style>
