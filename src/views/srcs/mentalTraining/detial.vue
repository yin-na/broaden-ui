/*
 * @Author: 李素素 
 * @Date: 2019-08-22 10:45:57 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-16 15:14:52
 */
<template>
    <div class="inner mental-d">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar :navList='navList' :title="title" class="mgt10"></nav-bar>
        <list-page class="mgt10" :lspan='18' :rspan='6' 
                :hide="false">
            <template>
                <div class="detial" slot="list-item">
                    <div class="con-header text-center">
                        <h3>{{ content.title }}</h3>
                    </div>
                    <div class="art-list-popper ivu-poptip-popper mgt20">
                        <div class="ivu-poptip-inner">
                            <div class="ivu-poptip-body">
                                <p class="color-base fs16">训练说明：</p>
                                <p class="pdl60 lh25 hideImg">
                                    {{ content.content | replaceHtml }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="content mgt20">
                        <!-- <img :src="content.coverImage" alt=""> -->
                        
                        <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                                id="ManagePlatform" width="100%" height="100%">
                                <param name="movie" value="ManagePlatform.swf" />
                                <param name="quality" value="high" />
                                <param name="bgcolor" value="#ffffff" />
                                <param name="allowScriptAccess" value="sameDomain" />
                                <embed :src="content.gameUrl"
                                    quality="high"
                                    bgcolor="#ffffff"
                                    width="100%"
                                    height="100%"
                                    name="ManagePlatform"
                                    align="middle"
                                    play="true"
                                    loop="false"
                                    allowScriptAccess="sameDomain"
                                    type="application/x-shockwave-flash">
                                </embed>
                        </object>
                    </div>
                    <!-- <div class="mgt20" v-html="content.content">
                    </div> -->
                </div>
            </template>
            <div slot="right-list">
                <div class="taste-test">
                    <div class="circle-bln">
                        <img width="80%" src="@/assets/logo/logo_personal.png" alt="">
                    </div>
                    <div style="height:90px"></div>
                    <!-- 更多 -->
                    <div class="hide mgt10" style="max-height: 420px">
                        <scroll-seam :data="carouselList" :singleHeight="28" >
                            <li class="overflow-hidden h28 pdl20 pdr20" v-for="(item,index) in carouselList" :key="index"
                                @click="goToUrl(item)">
                                <Icon class="color-base" size='20' type="md-arrow-dropright" />
                                {{item.title}}
                            </li>
                        </scroll-seam>
                    </div>
                    <div class="pdb20"></div>
                </div>
            </div>
        </list-page>
    </div>
</template>
<script>
import listPage from '@/components/listPage'
import scrollSeam from '@/components/scrollSeam'
import headerBg from '@/components/headerBg'
import mixin from './mixin'
import replaceFilter from '@/mixins/replaceFilter'
import { resOk } from '@/settings'
import { queryMentalDetail } from '@/api/mentalTraining'

export default {
    name:'TasteTest',
    mixins: [mixin, replaceFilter],
    components:{
        listPage,
        scrollSeam,
        headerBg
    },
    data() {
        return {
            content: {},
            param: {
                title: '',
                gameType: '', // 当前心智训练类型
                current: 1,
                size: 10
            },
        }
    },
    created(){
        // this.hasUsableFlash();
        this.flashChecker()
        this.init()
    },

    methods: {
        init() {
            let id = this.$route.params.id
            queryMentalDetail({
                gameId: id
            }).then((res) => {
                if (res.code == resOk) {
                    this.content = res.data
                }
            })
            // 获取推荐位
            this.getList()
        },
        // hasUsableFlash() {
        //     var flashObj;
        //     if(typeof window.ActiveXObject != "undefined"){
        //         flashObj= new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        //     }else{
        //         flashObj= navigator.plugins['Shockwave Flash'];
        //     }
        //     return flashObj? true : false;
        // },
        
        // 检测开启flash
        flashChecker () {
            let hasFlash = 0; // 是否安装了flash
            let flashVersion = 0; // flash版本
            let swf;
            if(document.all) {
                swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if(swf) {
                    hasFlash = 1;
                    let VSwf = swf.GetVariable("$version");
                    flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
                }
            } else {
                if(navigator.plugins && navigator.plugins.length > 0) {
                swf = navigator.plugins["Shockwave Flash"];
                if(swf) {
                    hasFlash = 1;
                    let words = swf.description.split(" ");
                    for(let i = 0; i < words.length; ++i) {
                    if(isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                    }
                }
                }
            }
            return {
                f: hasFlash,
                v: flashVersion
            };
        },
    }
}
</script>
<style lang='less'>
    .mental-d .content {
        width: 700px;
        height: 600px;
        margin: 0 auto;
        text-align: center;
        max-width: 100%;
        img {
            max-width: 100%;
        }
    }
</style>