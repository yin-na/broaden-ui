/*
 * @Author: 李素素 
 * @Date: 2019-08-22 08:36:08 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 13:49:40
 */
<template>
    <div class="base-footer mgt40">
        <div class="inner pdt20 pdb40" style="max-width:100%;background-color:#fff">
            <ul class="footer-list lh16 fs16" style="width:1200px;margin: 0 auto 40px;">
                <li v-for="(item, index) in list" :key="index">
                    <router-link :to="item.to">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
            <div class="clearfix fs14" style="padding: 0 70px;width:1200px;margin: 0 auto;">
                <div class="fl mgt40 lh30">
                    <template v-if="dynamicModuleDat[15]">
                        <p v-for="(item, index) in dynamicModuleDat[15]" :key="index">
                            {{ item }}
                        </p>
                    </template>
                    <!-- <p>Copyright©2015-2019 山东心悦灵科贸有限公司</p>
                    <p>
                        <span>技术支持：心悦灵</span>
                        <span>技术支持电话：0531-67878238</span>
                        <span>鲁ICP备12011523号</span>
                    </p> -->
                </div>
                <div class="fr text-center">
                    <p> <img :src="dynamicModuleDat[3][0]" class="w150" alt=""></p>
                    <Button size="small" type="primary" shape="circle" class="v-base" style="background-color:#eb6100">扫码关注公众号</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Footer',

    data() {
        return {
            list: [{name: '中心新闻', to: '/news'},
                    {name: '心理文章', to: '/psychological/0'},
                    {name: '音乐放松', to: '/psychological/1'},
                    {name: '心理图库', to: '/psychological/3'},
                    {name: '家庭指南', to: '/family'},
                    {name: '心智训练', to: '/mentalTraining'},
                    {name: '趣味测试', to: '/tasteTest'},
                    {name: '心理援助', to: '/'},
                    {name: '手机应用', to: '/'}]
        }
    },
    
    computed: {
        ...mapGetters([
            'dynamicModuleDat'
        ]),
    },

}
</script>

<style lang="less">
    // @import '../../styles/variables.less';
        @base-color: #fff;
        @font-color: #343d4a;
    .base-footer {
        background: #ffffff;
        border-top: 5px solid #eb6100;
        .w150 {
            width: 150px;
        }
        .v-base span {
            vertical-align: baseline;
        }
    }
    .footer-list {
        display: flex;
        justify-content: space-around;
        li {
            flex: 1;
            text-align: center;
            cursor: pointer;
            & + li {
                border-left: 2px solid @font-color;
            }
        }
        li:hover a{
            color:#eb6100
        }
    }
</style>