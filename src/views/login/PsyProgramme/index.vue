<template>
  <div class='solutewarp'>
    <div class='TitLogo'>
      <img src="@/assets/cultivate/banner01.png" alt="">
    </div>
    <div class='solutent'>
         <div class="changetabs">
            <div class='tites fs20 colorf fwb'>社会心理服务体系</div>
            <div style="height:487px">
                <div v-for='(item,index) in pageItem' :key="index" class='pageItem' :class="{choisestyle:bgid==item.id}" @click="changetabs(item.id)">
                {{item.name}}
            </div>
          </div>
        </div>
        <changeSolute :showtab='bgid'></changeSolute>
        <changenetwork :showtab='bgid'></changenetwork>
        <changeservice :showtab='bgid'></changeservice>
        <changebuild  :showtab='bgid'></changebuild>
        <changemode :showtab='bgid'></changemode>
    </div>
  </div>
</template>

<script>
import changeSolute from './components/Solution'
import changenetwork from './components/levelnetwork'
import changeservice from './components/services'
import changebuild from './components/build'
import changemode from './components/servicemode'
export default {
  components:{ changeSolute,changenetwork,changeservice,changebuild,changemode},
  data(){
    return{
      bgid:'1',
        pageItem:[{
            name:'整体解决方案',
            id:'1'
        },{
            name:'三级网络',
            id:'2'
        },{
            name:'三项服务',
            id:'3'
        },{
            name:'三项建设',
            id:'4'
        },{
            name:'3+X心理服务模式',
            id:'5'
        }]
    }
  },
  methods:{
    changetabs(id){
      this.bgid=id
    }
  }
}
</script>

<style lang="less" scoped>
.solutewarp{
  .TitLogo{
    img{
      width:100%;
      height:450px;
    }
  }
  .solutent{
    width:1200px;
    margin:0 auto;
    padding:65px 0 120px;
    display: flex;
    justify-content: space-between;
    .changetabs{
    width:255px;
    background-color: #fbfbfb;
    .choisestyle{
        background-color: #D6F5FF;
        border-left:5px solid #11224E;
        padding-left: 40px !important;
        color:#11224E !important;
        font-weight: bold;
    }
    .tites{
        background-color: #11224e;
        height: 60px;
        text-align: center;
        line-height: 60px;
    }
    .pageItem{
        height:50px;
        line-height: 50px;
        font-size: 16px;
        color:#cacaca;
        border-bottom:1px solid #eee;
        padding-left: 45px;
        cursor:pointer
    }
    .pageItem:last-child{
        border-bottom: none;
    }
}
  }
}
</style>
