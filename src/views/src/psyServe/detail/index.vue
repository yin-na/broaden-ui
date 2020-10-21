<template>
  <div class="detailWarp">
              <baseheader></baseheader>
      <div class="content">
          <div class="detailTitle">
              <div class="detailTitleLeft">
                  <img src="@/assets/user/detailbanner.png" alt="">
                  <div style="height:180px;border-bottom:1px dashed #ddd">
                      <div style="text-align:center;padding:65px 0 30px">
                          <h4 class="color3 fs20" style="margin-bottom:10px">{{detailData.name}}</h4>
                          <span class="color9">2020-04-24 09:56:00
                              <span>
                                  来源：心悦灵
                              </span>
                            </span>
                      </div>
                  </div>
              </div>
              <div class="detailTitleRig">
                  <img src="@/assets/user/detailpic.png" alt="">
              </div>
                      <div class="postion-top">
            <span style="display:block">当前位置：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/psyServe' }">心理培训服务</el-breadcrumb-item>
                <el-breadcrumb-item>文章详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
          </div>
         <div  v-if="this.detailData.veido==null" style="display:flex;justify-content:space-between; margin-top: 42px;">
               <!-- <div class="articleDetail color9 fs16" v-html="articleDetail"></div> -->
               <div  class="articleDetail color9 fs16" v-html="detailData.text" ></div>
               <curriculum :curriy=this.curriy></curriculum>
         </div>
          <div v-else style="margin: 42px 0 0 18%;">
              <video :src="this.detailData.veido" controls="controls"></video>
          </div>
          <div class="Previous">
                  <div  class="Previousone coloreb" v-if="detailData.lastArticle!=null" @click="getlastDetail(detailData.lastArticle.id,type,dictId)">
                        上一篇：{{detailData.lastArticle.name}}
                  </div>
                  <div  class="Previoustwo color9" v-if="detailData.nextArticle!=null" @click="getlastDetail(detailData.nextArticle.id,type,dictId)">
                        下一篇：{{detailData.nextArticle.name}}
                  </div>
           </div>
           <div class="bottom_list">
            <div class="inner">
                <div class="width35 fl">
                    <div class="ewm-btn" style="">
                        <img src="@/assets/home/btm-gzh.png" class="wem-hidden">
                        <img src="@/assets/home/btm-gzh-1.png" class="wem-show">
                        <div class="ewm-btn-1">
                            <img src="@/assets/home/ewm.png">
                        </div>
                    </div>
                    <div class="xcx-btn">
                        <img src="@/assets/home/btm-xcx.png" class="xcx-hidden">
                        <img src="@/assets/home/btm-xcx-1.png" class="xcx-show">
                        <div class="xcx-btn-1">
                            <img src="@/assets/home/xcx.png">
                        </div>
                    </div>
                </div>
                <div class="width65 fr">
                    <div class="width33 fl">
                        <p>企业服务</p>
                        <ul>
                            <li><el-link :underline="false" href="http://www.soulhappy.cn/Helps/xyljs.html" target="_blank">关于我们</el-link></li>
                            <li><el-link :underline="false" href="http://www.soulhappy.cn/xlrj.html" target="_blank">心理软件</el-link></li>
                            <li><el-link :underline="false" href="http://www.soulhappy.cn/xlsb.html" target="_blank">心理硬件</el-link></li>
                            <li><router-link to="/psyServe"><el-link :underline="false">心理培训</el-link></router-link></li>
                        </ul>
                    </div>
                    <div class="width33 fl">
                        <p>用户帮助</p>
                        <ul>
                            <li><el-link :underline="false" href="http://www.soulhappy.cn/Helps/lxfs.html" target="_blank">帮助中心</el-link></li>
                            <li><el-link :underline="false">用户服务协议</el-link></li>
                            <li><el-link :underline="false">隐私政策</el-link></li>
                            <li><router-link to="/psyIntervent"><el-link :underline="false">在线提问</el-link></router-link></li>
                        </ul>
                    </div>
                    <div class="width33 fl">
                        <p>联系方式</p>
                        <ul>
                            <li>24小时服务热线：400-998-0708</li>
                            <li>固定电话：0531—67878238</li>
                            <li>公司地址:</li>
                            <li> 山东济南市高新区新泺大街1666号齐盛广场5号楼11层</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
              <pagefooter></pagefooter>

  </div>
</template>

<script>
import {getArticleDetail,getvideoTeachDetail,HeartServicetextDetail,hotClass,hotClassDetail} from '@/api/user/psyExamintion'
import curriculum from '../components/articleTiltle'
import baseheader from '@/components/pageHeader'
import pagefooter from '@/views/layout-1/components/baseFooter'
export default {
    components:{curriculum,baseheader,pagefooter},
    data(){
        return {
            detailData:'',
            id:'',
            scrollTop:0,
            dictId:'',
            type:'',
            curriy:[]
            }
    },
    created () {
        let id=this.$route.query.id
        this.id=id
        let type=this.$route.query.type
        this.type=type
        let dictId=this.$route.query.dictId
        this.dictId=dictId
        if(type=='1'){
            this.getArticleDetail(this.id,dictId)
        }else if(type=='2'){
            this.getVideoDetail(this.id,dictId)
        }else if(type=='3'){
            this.getexamDetail(this.id,dictId)
        }else{
            this.getclassDetail(this.id,dictId)
        }
        this.gethotClass()
    },
    methods:{
        getlastDetail(id,type,dictId){
         const url = this.$router.resolve({path: '/psyServe/detail',query:{ id:id,type:type,dictId:dictId}})
          window.open(url.href,'_blank')
        //     this.$router.push({
        //         path:'/psyServe/detail',
        //         query:{
        //             id:id,
        //             type:type,
        //             dictId:dictId
        //         }
        // })

        },
        gethotClass(){
            hotClass().then(res=>{
                this.curriy=res.data
            })
        },
        getArticleDetail(id,dictId){
            getArticleDetail(id,dictId).then(res=>{
                this.detailData=res.data
            })
        },
        getVideoDetail(id,dictId){
            getvideoTeachDetail(id,dictId).then(res=>{
                this.detailData=res.data
            })
        },
        getexamDetail(id,dictId){
            HeartServicetextDetail(id,dictId).then(res=>{
                 this.detailData=res.data
            })
        },
        getclassDetail(id,dictId){
            hotClassDetail(id,dictId).then(res=>{
                 this.detailData=res.data
            })
        }
    }

}
</script>

<style lang="scss">
.detailWarp{
    background-color: #fff;
    .content{
        width:1200px;
        margin:0 auto;
        .detailTitle{
            display: flex;
            justify-content: space-between;
                    .postion-top {
            display: flex;
            flex-direction: row;
            font-size: 14px;
            color: #999;
            padding: 25px 0;
            position: absolute;
            top: 24%;
        }
            .detailTitleLeft{
                width:920px
            }
            .detailTitleRig{
                width:258px;
                img{
                    height:100%
                }
            }
        }
        .articleDetail{
            width:912px;
            line-height:30px;
        }
        .Previous{
            padding:104px 0 141px;
            cursor: default;
            border-bottom:1px dashed #ddd;
            div{
                cursor: pointer;
            }
        }
        .bottom_list{
            width: 100%;
            padding: 1.2% 0;
            background: #fff;
            height:266px;
            .width35{
                width: 33%;
                padding-top: 3%;
                .ewm-btn{
                    position: relative;
                    margin-bottom:10px;
                    display: inline-block;
                    cursor: pointer;
                    .wem-show{
                        display: none;
                    }
                }
                .ewm-btn-1{
                    display: none;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    position: absolute;
                    left: 120%;
                    bottom: -200%;
                    z-index: 9999;
                }
                .ewm-btn:hover>.ewm-btn-1{
                    display: block;
                }
                .ewm-btn:hover>.wem-show{
                    display: block;
                }
                .ewm-btn:hover>.wem-hidden{
                    display: none;
                }
                .xcx-btn{
                    position: relative;
                    display: inline-block;
                    cursor: pointer;
                    .xcx-show{
                        display: none;
                    }
                }
                .xcx-btn-1{
                    display: none;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    position: absolute;
                    left: 120%;
                    bottom: -15%;
                    z-index: 9999;
                }
                .xcx-btn:hover>.xcx-btn-1{
                    display: block;
                }
                .xcx-btn:hover>.xcx-show{
                    display: block;
                }
                .xcx-btn:hover>.xcx-hidden{
                    display: none;
                }
            }
            .width65{
                width: 63%;
                .width33{
                    width: 33%;
                    p{
                        font-weight: bold;
                        line-height: 40px;
                        font-size: 18px;
                        color: #333;
                    }
                    li{
                        line-height: 30px;
                        font-size: 16px;
                        color: #999;
                    }
                }
            }
        }
    }

}

</style>
