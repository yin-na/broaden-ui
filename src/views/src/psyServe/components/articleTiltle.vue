<template>
    <div class="bgf">
        <div class="curriculum fwb fs18">
            <img src="@/assets/user/book.png" alt="">
            <span style="margin-left:32px">热门课程</span>
        </div>
        <div class="curricontent">
          <vue-scroll :ops="ops" style="width:100%;height: 226px;">
            <ul class="color9">
                <li v-for="(item,index) in curriy" :key="index" @click="classDetail(item.id,item.dictId)">
                    {{item.name}}
                </li>
            </ul>
          </vue-scroll>
        </div>
    </div>

</template>

<script>
    export default{
         props:['curriy'],
        data(){
            return{
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
                    'overflow-x': 'hidden'
                  }
                }
            }
        },
        methods:{
            classDetail(id,dictId){
                // this.$router.push({
                //     path:'/psyServe/detail',
                //     query:{
                //         id:id,
                //         type:4,
                //         dictId:dictId
                //     }
                // })         
            const url = this.$router.resolve({path: '/psyServe/detail',query:{ id:id,type:4,dictId:dictId}})
          window.open(url.href,'_blank')
            }
        }

    }
</script>

<style lang="scss" scoped>
    .curriculum{
        width:258px;
        height:44px;
        line-height: 44px;
        border: 1px solid #ddd;
        padding-left:20px;
        border-top:3px solid #eb6100;
        position: relative;
    }
    .curriculum img{
        position: absolute;
        top:12px;
    }
    .curricontent{
         height:226px;
         border: 1px solid #ddd;
         border-top: none;
         ul{
        height: 100%;
        width: 100%;
            li{
                height:45px;
                line-height: 45px;
                padding-left: 20px;
           }
            li:hover{
                background-color: #F2F9FF;
                color:#eb6100;
                cursor: pointer;
            }
      }
    }
</style>