/*
 * @Author: 李素素 
 * @Date: 2019-08-22 08:36:01 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-11-12 13:51:27
 */
<template>
    <div>
        <div class="base-header">
            <div class="inner">
                <div class="clearfix">
                    <div class="fl lh60">
                        <img :src="dynamicModuleDat[0] ? dynamicModuleDat[0][0] : ''" class="mgr10 maxw58"/>
                        <span class="fs22">
                            <span class="color-base" style="color:#eb6100"> {{ dynamicModuleDat[1] ? dynamicModuleDat[1][0] : '' }} </span>
                            <span class="v-line mgr10 mgl10" style="backgr:#eb6100"></span>
                            <span class="mgr5">主办单位：{{ dynamicModuleDat[2] ? dynamicModuleDat[2][0] : '' }}</span>
                            <!-- <span>济南市未成年人成长指导中心</span> -->
                        </span>
                    </div>
                    <a class="fr h-right" @click="gotoIndex">
                        <!-- <Icon type="md-person" class="color-base fs18" /> -->
                        <i class="color-base ivu-icon my-icon-user">
                            <img src="@/assets/gotop/user.png" alt="">
                        </i>
                        <span class="fs16  getON">登录</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="bg-color base-nav">
            <div class="inner">
                <Menu mode="horizontal" theme="primary" :active-name="activeName">
                    <template v-for="item in list">
                        <template v-if="!item.hidden">
                            <MenuItem v-if="!item.children"
                                        :key="item.path"
                                        :name="item.path"
                                        @click.native="goto(item)">
                                <img class="pos-img" v-if="item.meta.hot" src="@/assets/banner/hot.png">
                                <template v-if="!item.isLook&&!item.isPhone">{{ item.meta.title }}</template>
                                <!-- 二维码 -->
                                <!-- <Poptip v-else trigger="hover">
                                    <div slot="content" class="text-center">
                                        <img :src="dynamicModuleDat[item.meta.id][0]" alt="">
                                        <p class="color-g fs16">扫码关注公众号</p>
                                    </div>
                                    {{ item.meta.title }}
                                </Poptip> -->
                                <Tooltip v-else-if="item.isLook" theme="light" trigger="hover" placement="bottom">
                                    <div slot="content" class="text-center">
                                        <img :src="dynamicModuleDat[item.meta.id][0]" alt="">
                                        <p class="color-g fs16">扫码关注公众号</p>
                                    </div>
                                    {{ item.meta.title }}
                                </Tooltip>
                                    <Tooltip v-else-if="item.isPhone" theme="light" trigger="hover" placement="bottom">
                                        <div slot="content" class="text-center">
                                         <p class="fs20 color-base"> {{ dynamicModuleDat[14] ? dynamicModuleDat[14][0] : '' }} </p>
                                         <p class="fs16 text-center">24小时服务热线</p>
                                         </div>
                                    {{ item.meta.title }}
                                </Tooltip>
                            </MenuItem>
                            <!-- 2级菜单 -->
                            <Submenu v-else :key="item.path"
                                    :name="item.path">
                                <template slot="title">
                                    {{ item.meta.title }}
                                </template>
                                    <template v-for="itemC in item.children">
                                        <MenuItem v-if="!itemC.hidden"
                                        style="background:#fff"
                                                :key="itemC.path"
                                                :name="itemC.path"
                                                @click.native="goto(itemC)">
                                            {{ itemC.meta.title }}
                                        </MenuItem>
                                    </template>
                            </Submenu>
                        </template>
                    </template>
                </Menu>
            </div>
        </div>
        <a :href="href" ref="href" v-show="false" :target="target">111</a>
    </div>
</template>

<script>
import { constantRoutes } from '@/router/portalSite'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            href: '',
            list: constantRoutes.children,
            activeName: '',
            target: ''
        }
    },

    computed: {
        ...mapGetters([
            'dynamicModuleDat',
            'gotoUrl',
            'qq',
            'maintain'
        ]),
    },

    created() {
        if (!this.$store.getters.dynamicModuleDat) {
            this.$store.dispatch('setDynamicModuleDat').then(() => {
                next()
            }).catch(() => {
                next()
            })
        } else {
            next()
        }
    },

    methods: {
        goto(item) {
            let path = item.path
            let pathNow = this.$route.path
            if (item.isLook) {
                return
            }
            if(item.isPhone){
                return
            }
            if (item.isHref || item.isOpenHref) {
                this.target = item.isOpenHref ? '_blank' : ''
                this.href = item.href
                // 在线问答
                if (item.isHref) {
                    this.href = this.qq
                }

                this.$nextTick(() => {
                    this.$refs.href.click()
                })
                return
            }
            if (pathNow == path) { 
                return
            }
            // let text = '/:'
            // let index = path.indexOf(text)
            // if (index > -1) {
            //     path = path.split(text)[0]
            // }
            this.$router.push(path)
        },
        gotoIndex(){
            this.$router.push("/")
        }
    },
    watch: {
        $route(val) {
            let route = this.$route
            let typeNum = route.params.typeNum
            let flag = route.meta.flag

            if (typeNum) {
                this.activeName = flag + '/' + typeNum
            } else {
                this.activeName = val.meta.flag
            }
        }
    }
}
</script>

<style lang="less">
    // @import '../../../../styles/variables.less';
    @base-color: #fff;
    @font-color: #343d4a;

    .ivu-menu-primary{background:#eb6100 !important}
     .ivu-menu-item-selected{
        color:#fff !important
    }
    .ivu-menu-drop-list .ivu-menu-item-selected{
        color:#eb6100 !important;
        background:#fff;
    }
    .ivu-select-dropdown .ivu-menu-item:hover {
     background: #f3f3f3 !important;
}
    .base-header {
        background: #ffffff;
        .inner {
            padding-top: 28px;
            padding-bottom: 28px;
        }
        span, img {
            vertical-align: middle;
            line-height: 22px;
        }
        .h-right {
            margin-top: 24px;
        }
        .my-icon-user {
            width: 24px;
            img {
                width: 100%;
            }
        }
    }
    .getON{
        color:#343d4a
    }
    .getON:hover{
        color:#eb6100
    }
    .ivu-menu-submenu{
        background-color: #eb6100;
    }
    .base-nav {
        &, .inner {
            background: #eb6100;
        }
        .ivu-menu-horizontal {
            height: 40px;
            line-height: 40px;
            display: flex;
            // .ivu-menu-item {
            //     flex: 1;
            //     text-align: center;
            //     background-color: #eb6100;
            //     z-index: 5;
            //     &.ivu-menu-item-active {
            //         z-index: 4;
            //     }
            // }
        }
        .ivu-menu-submenu-title > i, .ivu-menu-submenu-title span > i {
            margin: 0
        }
        .ivu-menu  > .ivu-menu-item-active {
            background: #ef8133;
        }
        .ivu-tooltip-light.ivu-tooltip-popper {
            left: auto!important;
            bottom: auto!important; 
            left: 50%!important;
            transform: translateX(-50%);
            img {
                max-width: 100%;
            }
        }
        .pos-img {
            position: absolute;
            right: -20px;
            top: -17px;
        }
    } 
</style>