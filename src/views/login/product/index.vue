<template>
  <div class="product">
    <img class="banner" src="@/assets/cultivate/banner02.png">
    <!-- 内容区 -->
    <div class="pro-warp">
      <div class="nav-cont">
        <div class="postion">
          <span class="sp-1">产品功能</span>
          <span class="sp-2">PRODUCT FUNCTION</span>
        </div>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- 1 -->
            <el-tab-pane label="项目背景" name="1">
              <div class="tab-project">
                <img class="aaa" src="@/assets/cultivate/heighimg.png">
                <div class="tab-right">
                  <div class="list-name">
                    <div class="list-01">
                      <img src="@/assets/cultivate/title.png">
                      <h3>社会心理服务体系亟需的15项工作</h3>
                    </div>
                  </div>
                  <span>根据相关文件的要求，社会心理服务体系建设试点城市需要开展3大类15项工作。</span>
                  <div class="jieshao" v-for="item in newsList" :key="item.num">
                    <h3>{{item.num}} {{item.tit}}</h3>
                    <ul>
                      <li v-for="aa in item.list" :key="aa">{{aa}}</li>
                    </ul>
                  </div>
                  <div class="list-name ma-top">
                    <div class="list-01">
                      <img src="@/assets/cultivate/title.png">
                      <h3>社会心理服务体系有效运转的5大挑战</h3>
                    </div>
                  </div>
                  <span>根据目前的政策和背景可以发现，建立有效的社会心理服务体系在面临极大机 遇的同时，又是一项极具挑战的工作。其面临的挑战包括：</span>
                  <img class="last-img" src="@/assets/cultivate/change.png">
                </div>
              </div>
            </el-tab-pane>

            <!-- 2 -->
            <el-tab-pane label="整体规划" name="2">
              <div class="tab-jianj">
                <img src="@/assets/cultivate/guihua1.png">
              </div>
            </el-tab-pane>

            <!-- 3 -->
            <el-tab-pane label="应用融合" name="3">
              <div class="tab-yingy-01">
                <img src="@/assets/cultivate/together.png">
                <div class="righ">
                  <h3>智慧教育</h3>
                  <span>是校园信息化的高级形态</span>
                  <p>全面感知校园物理环境，智能识别师生群体的学习、工作 情景和个体的特征，将学校物理空间和数字空间有机衔接 起来，为师生建立智能开放的教育教学环境和舒适便利的 生活环境。</p>
                  <div class="sp-width">
                    <span v-for="item in nameList" :key="item">{{item}}</span>
                  </div>
                </div>
              </div>

              <p class="tab-yingy-02">综合运用云计算、物联网、移动互联、大数据、智能感知、社交网络等新兴信息技术，全面感知校园物理环境， 智能识别师生群体的学习、工作情景和个体的特征，将学校物理空间和数字空间有机衔接起来， 为师生建立智能开放的教育教学环境和便利舒适的生活环境。 该模块主要是表述跟原系统的对接，方便资源有效利用，避免重复建设，提供方便、易用的平台。</p>

              <div class="tab-yingy-03">
                <h3>构建价值</h3>
                <img src="@/assets/cultivate/shout01.png">
              </div>

              <div class="tab-yingy-04">
                <h3>应用场景</h3>
                <img src="@/assets/cultivate/scene.png">
              </div>
            </el-tab-pane>

            <!-- 4 -->
            <el-tab-pane label="数据融合" name="4">
              <div class="tab-date-01">
                <img class="img-01" src="@/assets/cultivate/data01.png">
                <div class="font-01">
                  <h3>融合全量数据，让教育更智慧</h3>
                  <span>融合线上线下数据，打破数据孤岛，集门户网站、智慧校园、APP、微信 等，汇聚全面的数据分析平台，建立教育数据仓库。推进各类应用数据常 态化采集，深入挖掘数据应用价值，促进教育信息化贯穿到教育、教学与 管理全过程，是教学更加个性化、管理更加精细化、决策更加科学化。</span>
                </div>
              </div>

              <div class="tab-date-02">
                <h3>融合全量数据 释放数据潜能 让教育更智慧</h3>
                <img src="@/assets/cultivate/data02.png">
              </div>
            </el-tab-pane>

            <!-- 5 -->
            <el-tab-pane label="平台优势" name="5">
              <div class="tab-ping-01">
                <img class="img-01" src="@/assets/cultivate/summary01.png">
                <div class="font-01">
                  <h3>社会心理服务网络平台概述</h3>
                  <span>社会心理服务网络平台是运用互联网技术手段“心理测评、心理评估、矫正训练、咨询专家库、在线咨询、危机预警、心理课教学资源整合、行业标准接口、大数据分析教学科研"等云应用集成在一个云平台，实现线上线下互动的心理健康智能化!</span>
                </div>
              </div>

              <div class="tab-ping-02">
                <h3>社会心理服务网络平台目标</h3>
                <img src="@/assets/cultivate/summary02.png">
              </div>

              <!-- <div class="tab-ping-03">
                <h3>社会心理服务网络平台特点</h3>
                <img src="@/assets/cultivate/summary03.png">
              </div> -->

              <div class="tab-ping-04">
                <h3>社会心理服务网络平台服务</h3>
                <img src="@/assets/cultivate/summary04.png">
              </div>

              <div class="tab-ping-05">
                <h3>社会心理服务网络平台优势</h3>
                <div >
                  <img class="img01" src="@/assets/cultivate/summary05.png">
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1',
      nameList: ['云计算', '物联网', '移动互联', '大数据', '智能感知', '人工智能', '知识管理', '社交网络', '...'],
      newsList: [
        { tit: '加强试点工作组织管理和保障措施', num: '01', list: [ '成立试点工作领导小组', '印发试点实施方案', '保障试点工作经费', '成立跨部门专家组', '召开试点启动会议' ] },
        { tit: '建立社会心理服务网络', num: '02', list: [ '基层社会心理服务平台', '学生心理服务网络', '员工心理服务网络', '医疗机构心理健康服务' ] },
        { tit: '开展社会心理服务', num: '03', list: [ '多重形式科普宣传', '心理援助热线和危机干预队伍', '多部门培训', '各行业心理服务工作机制', '开展1-2项重点任务' ] }
      ]
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang="less" scoped>
.product{
  width: 100%;
  .banner{
    width: 100%;
    height: 450px;
  }
  .pro-warp{
    width: 1200px;
    margin: 0 auto;
    padding: 72px 0 100px 0;
    .nav-cont{
      position: relative;
      .postion{
        position: absolute;
        left: 0;
        top: -7px;
        display: flex;
        flex-direction: column;
        .sp-1{
          font-size: 24px;
          color: #333;
          font-weight: bold;
        }
        .sp-2{
          margin-top: 10px;
          font-size: 14px;
          color: #999;
        }
      }
      .tab-jianj{
        width: 100%;
        margin-left: 20%;
        margin-top: 99px;
        img{
          width: 900px;
          height: 600px;
        }
      }
      .tab-ping-01{
        margin-top: 84px;
        width: 100%;
        height: 551px;
        background: #f5f5f6;
        padding: 66px;
        display: flex;
        flex-direction: row;
        .img-01{
          width: 465px;
          height: 418px;
        }
        .font-01{
          margin-top: 114px;
          margin-left: 57px;
          h3{
            font-size: 24px;
            color: #333;
            margin-bottom: 40px;
          }
          span{
            font-size: 14px;
            color: #999;
            line-height: 26px;
          }
        }
      }
      .tab-ping-02{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          font-size: 24px;
          color: #333;
          margin-top: 94px;
          margin-bottom: 41px;
        }
        img{
          width: 1065px;
          height: 482px;
        }
      }
      .tab-ping-03{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          font-size: 24px;
          color: #333;
          margin-top: 124px;
          margin-bottom: 51px;
        }
        img{
          width: 591px;
          height: 394px;
        }
      }
      .tab-ping-04{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          font-size: 24px;
          color: #333;
          margin-top: 161px;
          margin-bottom: 75px;
        }
        img{
          width: 1112px;
          height: 394px;
        }
      }
      .tab-ping-05{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          font-size: 24px;
          color: #333;
          margin-top: 161px;
          margin-bottom: 75px;
        }
        .fle{
          display: flex;
          flex-direction: row;
          .img01{
            width: 361px;
            height: 481px;
            margin-right: 97px;
          }
          .img02{
            width: 553px;
            height: 462px;
            margin-top: 20px;
          }
        }
      }
      .tab-date-01{
        margin-top: 84px;
        width: 100%;
        height: 384px;
        background: #f5f5f6;
        display: flex;
        flex-direction: row;
        .img-01{
          width: 680px;
          height: 384px;
        }
        .font-01{
          padding: 0 26px 0 30px;
          h3{
            font-size: 20px;
            color: #333;
            margin-top: 103px;
            margin-bottom: 49px;
          }
          span{
            font-size: 14px;
            color: #999;
            line-height: 30px;
          }
        }
      }
      .tab-date-02{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          font-size: 24px;
          color: #333;
          margin-top: 94px;
          margin-bottom: 41px;
        }
        img{
          width: 1200px;
          height: 578px;
        }
      }
      .tab-yingy-01{
        background:linear-gradient(0deg,rgba(0,61,174,1),rgba(39,130,223,1));
        width: 1200px;
        height: 598px;
        display: flex;
        flex-direction: row;
        margin-top: 70px;
        img{
          margin-top: 103px;
          margin-left: 53px;
          width: 620px;
          height: 400px;
        }
        .righ{
          margin-top: 85px;
          margin-left: 95px;
          h3{
            font-size: 24px;
            color: #FFB98B;
            font-weight: bold;
            margin-bottom: 14px;
          }
          span{
            display: inline-block;
            font-size: 16px;
            color: #F6F6F6;
            margin-bottom: 34px;
          }
          p{
            width: 362px;
            font-size: 14px;
            color: #fff;
            line-height: 26px;
            margin-bottom: 53px;
          }
          .sp-width{
            width: 365px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            span{
              display: inline-block;
              width: 100px;
              height: 36px;
              font-size: 14px;
              color: #fff;
              text-align: center;
              line-height: 36px;
              margin-bottom: 19px;
              border: 1px solid #fff;
            }
          }
        }
      }
      .tab-yingy-02{
        font-size: 14px;
        color: #999;
        line-height: 26px;
        margin-top: 49px;
      }
      .tab-yingy-03{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          width: 100%;
          display: initial;
          font-size: 24px;
          color: #333;
          margin-top: 119px;
          margin-bottom: 60px;
        }
        img{
          width: 900px;
          height: 570px;
        }
      }
      .tab-yingy-04{
        display: flex;
        flex-direction: column;
        align-items: center;
        h3{
          width: 100%;
          display: initial;
          font-size: 24px;
          color: #333;
          margin-top: 119px;
          margin-bottom: 60px;
        }
        img{
          width: 1050px;
          height: 500px;
        }
      }
      .tab-project{
        width: 1200px;
        display: flex;
        flex-direction: row;
        margin-top: 82px;
        .aaa{
          width: 559px;
          height: 4317px;
          padding-right: 37px;
          border-right: 1px dashed #00C4FF;
        }
        .tab-right{
          display: flex;
          flex-direction: column;
          margin-left: 43px;
          .list-name{
            display: flex;
            flex-direction: column;
            .list-01{
              display: flex;
              flex-direction: row;
              img{
                width: 24px;
                height: 24px;
                margin-right: 13px;
                margin-top: 7px;
              }
              h3{
                font-size: 24px;
                color: #FF6631;
              }
            }
          }
          span{
            font-size: 14px;
            color: #999;
            margin-top: 27px;
          }
          .jieshao{
            h3{
              font-size: 20px;
              color: #11224E;
              margin-top: 66px;
              margin-bottom: 29px;
            }
            li{
              font-size: 14px;
              color: #999;
              line-height: 26px;
              margin-left: 57px;
              list-style-image: url('../../../assets/login/cicle.png');
            }
          }
          .ma-top{
            margin-top: 106px;
          }
          .last-img{
            width: 560px;
            height: 350px;
            margin-top: 80px;
          }
        }
      }
    }
  }
}
::v-deep .el-tabs__header {
  margin-left: 342px;
}
</style>
