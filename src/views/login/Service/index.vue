<template>
  <div class='serviceWarp'>
     <div class='TitLogo'>
        <img src="@/assets/cultivate/banner01.png" alt="">
    </div>
    <div class='serveItem'>
      <div class="leftItem" style='cursor: default;'>
        <div>
          <div class='fs24 color3 fwb'>心理服务</div>
          <div class='fs14 color9 mt10'>psychological services</div>
        </div>
        <div class='comIdea'>
          <div class='fs20 colorFF fwb mb35'>企业理念</div>
          <div class='mb42'>
             <div class='fs14 colorFF'>愿景：</div>
             <div class='fs14 colorf'>国民心理健康先行者</div>
          </div>
           <div class='mb42'>
             <div class='fs14 colorFF'>使命：</div>
             <div class='fs14 colorf'>让心理健康提升更【融】易</div>
          </div>
           <div class='mb42'>
             <div class='fs14 colorFF'>价值观：</div>
             <div class='fs14 colorf'>奋进、创新、自律、共赢</div>
          </div>
           <div class='mb42'>
             <div class='fs14 colorFF'>5融服务：</div>
             <div class='fs14 colorf'>融研究、融科技、融智造、融平台融生态</div>
          </div>
        </div>
      </div>
      <div class="rightItem">
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name">
              <div class='tabItem'>
                <div class="fs24 fwb colorFF mb35">{{item.tit}}</div>
                <div class='fs14 color9 mb35' v-for="(data,index) in item.content" :key="index">{{data.introduce}}</div>
              </div>
              <div class='disflex spacebetween tabimage'>
                  <div class='posit'>
                     <img src="@/assets/cultivate/room1.png" alt="">
                     <div class='room'>心理咨询室</div>
                  </div>
                  <div class='posit'>
                     <img src="@/assets/cultivate/room2.png" alt="">
                     <div class='room'>心理咨询室</div>
                  </div>
              </div>
            </el-tab-pane>
          </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeName:'1',
      tabList:[
        {
          label:'服务规划',
          name:'1',
          tit:'01  服务规划',
          content:[
            {
              introduce:'心悦灵旗下拥有五大融服务中心：战略研究中心、运营科技中心、智造发展中心、生态服务中心、平台指挥中心，搭建了整套融服务体系。通过提供产学研及自主研发的心理软硬件产品、“心理5【融】服务”、心理健康整体实施解决方案，推动“社会心理健康体系建设”“健康中国2030”等国家政策的全面落实，致力于让心理健康提升更【融】易。'
            },{
              introduce:'心悦灵凭借自身雄厚、研发智造、销售服务等实力不断开拓与创新，已将服务网络有效的辐射到全国地区，能够更好更快捷的为合作伙伴及客户提供更快捷、更有效、更好的服务。心悦灵在各省均设有办事处，并在部分省份设立分公司。国家政策的全面落实，致力于让心理健康提升更【融】易。'
            }
          ]
        },{
          label:'心理体检',
          name:'2',
          tit:'02 心理体检',
          content:[
            {
              introduce:'评估是针对性开展心理服务的基础。心理体检中心旨在帮助人们从成长和发展角度认识自我，成长自我，如果受检者的心理状态严重地偏离心理健康标准，就要及时地求医，以便早期诊断与早期治疗。'
            },{
              introduce:'心理中心中心下设有儿童发展评估中心、青少年发展评估中心、成人发展评估中心、临床心理评估中心四个心理评估业务模块。'
            },{
              introduce:'内容涵盖200套单项评估面向各类团体用户及个体用户开展服务，能够有效评估体检者的情绪状态、人格特征、行为倾向、智力及能力倾向，可以为调整心理状态、缓解工作压力提供客观、可靠、科学的依据，也可以为升学、就业、咨询提供参考。'
            }
          ]
        },{
          label:'科普培训',
          name:'3',
          tit:'03 科普培训',
          content:[
            {
              introduce:'科普训练是一种自我心理干预方法，通过自我调节能够有意识地、适当的对自己的情感表达方式、情绪反应强度、动机的趋向和水平、思维的方向和过程、行动的指向和方式等进行控制。'
            },{
              introduce:' 科普训练通过均等放松呼吸、478呼吸训练、中级立体放松和高级立体放松进行心理调节。'
            },{
              introduce:'调节呼吸放松法是指一种通过呼吸调节能缓解紧张情绪的方法。呼气要自然而然地，漫漫地把肺底的空气呼出来。此时，肩膀、胸，直至隔肌等都感到轻松舒适。在呼吸时还要想象着将紧张徐徐地被驱除了出来。同时加强对来访者的心理常识宣传和普及，让来防者自己去意识到心理健康的重要性。'
            }
          ]
        },{
          label:'心理咨询',
          name:'4',
          tit:'04 心理咨询',
          content:[
            {
              introduce:'心理咨询是来访者和咨询师双向互动的一个持续过程，通过探索、分析，从多维度、多视角去看待问题、善待事物，从而化解来访者内心的冲突或矛盾点，提升来访者的身心自由度。'
            },{
              introduce:'通过咨询对心理适应方面出现问题并企求解决问题的求询者提供心理援助的过程。'
            },{
              introduce:'需要解决问题并前来寻求帮助者称为来访者或者咨客，提供帮助的咨询专家称为咨询者。来访者就自身存在的心理不适或心理障碍，通过语言文字等交流媒介，向咨询者进行述说、询问与商讨，在其支持和帮助下，通过共同的讨论找出引起心理问题的原因，分析问题的症结，进而寻求摆脱困境解决问题的条件和对策，以便恢复心理平衡、提高对环境的适应能力、增进身心健康。'
            }
          ]
        },{
          label:'危机干预',
          name:'5',
          tit:'05 危机干预',
          content:[
            {
              introduce:'心理危机干预通过建立科学的心理危机干预体系，能有效预防心理危机事件发生，预防危机与创伤的扩散。'}
            ,{
              introduce:'通过多轮筛查评估，将可能出现危机事件的人群进行分级指导和管理，可及时进行干预处理和追踪，降低危机事件发生的风险，预防危机与创伤的扩散，提高危机干预工作效率。'
            },{
              introduce:' 平台通过心理援助热线、干预方案、干预视频和在线疏导四位一体的干预方式将有效的建立心理危机干预体系，保障群众心理健康。'
            }
          ]
        },{
          label:'心理培训',
          name:'6',
          tit:'06 心理培训',
          content:[
            {
              introduce:'我国心理学人才队伍现状是理论研究者多，应用型专业力量相对薄弱。一方面，公众对于心理学的认识不够清晰，导致应用型心理服务在我国的开展相对较为困难；另一方面，也是由于我国心理学对于应用心理学专业人才的培养力度以及模式存在问题，从而导致的相关的专业从事人员较少。但无论哪个原因，都需要我国心理学不断重视与加强对应用心理学专业人才的培养。'
            },{
              introduce:'打造的“4+1”心理健康服务体系，帮助各行业组织系统完成心理健康服务：从没有到拥有，从拥有到使用，从建设到落地，从培养到实践的一体化服务最大程度的提高心理工作效率，解决心理工作开展中的具体问题，助力心理服务体系建设与落地。'
            }
          ]
        }
      ]
    }
  },
  methods:{
    handleClick(){

    }
  }

}
</script>

<style lang="less" scoped>
.serviceWarp{
  .TitLogo{
    img{
      width:100%;
      height:450px;
    }
  }
  .serveItem{
    width: 1200px;
    margin: 0 auto;
    padding: 60px 0 160px;
    display: flex;
    justify-content: space-between;
    .leftItem{
      width:260px;
      .comIdea{
        margin-top:70px;
        height:658px;
        padding:44px 25px 0 28px;
        background-color: #11224E;
      }
    }
    .rightItem{
      width:860px;
      ::v-deep .el-tabs__nav{
        width: 100%;
      }
      ::v-deep .el-tabs__active-bar{
       height:3px !important;
      }
      ::v-deep .el-tabs__item{
        text-align: center  ;
        padding-right:67px;
      }
      ::v-deep .el-tabs__nav-wrap::after{
        display: none;
      }
      .tabItem{
        height:380px;
        background-color: #FAFAFA;
        padding:46px 62px 0 57px;
        margin:80px 0 30px;
      }
      .tabimage{
        .room{
          position:absolute;
          left:20px;
          bottom:20px;
          width:135px;
          height:35px;
          background:#fff;
          line-height:35px;
          font-size:16px;
          color:#333;
          text-align:center;
          border-radius: 16px;
          cursor: default;
        }
        img{
          width:415px;
          height:250px;
        }
      }
    }
  }
}

</style>
