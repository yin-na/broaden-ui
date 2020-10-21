/*
 * @Author: 李素素 
 * @Date: 2019-08-21 09:00:55 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-27 15:35:39
 */
 <template>
    <div class="go-top">
        <ul>
            <li>
                <a :href="qq">
                    <img src="@/assets/gotop/quest1.png" alt="" class="img">
                    <img src="@/assets/gotop/quest2.png" alt="" class="hover-img">
                </a>
            </li>
            <li class="phone">
                <!-- <Poptip trigger="hover" placement="left">
                    <div slot="content" class="text-center">
                        <p class="fs20 color-base"> {{ dynamicModuleDat[14] ? dynamicModuleDat[14][0] : '' }} </p>
                        <p class="fs16 text-center">24小时服务热线</p>
                    </div>
                    <img src="@/assets/gotop/phone.png" alt="">
                </Poptip> -->
                <Tooltip theme="light" trigger="hover" placement="left">
                    <div slot="content" class="text-center">
                        <p class="fs20 color-base"> {{ dynamicModuleDat[14] ? dynamicModuleDat[14][0] : '' }} </p>
                        <p class="fs16 text-center">24小时服务热线</p>
                    </div>
                    <img src="@/assets/gotop/phone1.png" alt="" class="img">
                    <img src="@/assets/gotop/phone2.png" alt="" class="hover-img">
                </Tooltip>
            </li>
            <li class="weixin">
                <Tooltip theme="light" trigger="hover" placement="left">
                    <div slot="content" class="text-center">
                        <img :src="dynamicModuleDat[3] ? dynamicModuleDat[3][0] : ''" alt="">
                    </div>
                    <img src="@/assets/gotop/weixin1.png" alt="" class="img">
                    <img src="@/assets/gotop/weixin2.png" alt="" class="hover-img">
                </Tooltip>
            </li>
            <li>
                <BackTop style="display: block">
                    <img src="@/assets/gotop/gotop1.png" alt="" class="img">
                    <img src="@/assets/gotop/gotop2.png" alt="" class="hover-img">
                </BackTop>
            </li>
        </ul>
    </div>
 </template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'BaseToTop',
    
    computed: {
        ...mapGetters([
            'dynamicModuleDat',
            'qq'
        ]),
    },
}
</script>

<style lang="less">
    .go-top {
        position: fixed;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 76px;
        img {
            width: 100%;
        }
        li {
            cursor: pointer;
            line-height:0;
            outline: none;
            margin-top:-1px;//遮住切图的边线重合问题
        }
        .phone {
            .ivu-tooltip-light.ivu-tooltip-popper {
                left: auto!important;
                bottom: auto!important;
                right: 80px!important;
                top: 35%!important;
                transform: translateY(-47%);
                img {
                    max-width: 100%;
                }
            }
        }
        .weixin{
            .ivu-tooltip-light.ivu-tooltip-popper {
                left: auto!important;
                bottom: auto!important;
                right: 80px!important;
                top: 60%!important;
                transform: translateY(-47%);
                .ivu-tooltip-content{
                    .ivu-tooltip-inner{
                        padding: 8px!important;
                        img{
                            width:120px;
                            height:120px;
                        }
                    }
            }
            }
             
        }
    }
    .go-top .ivu-back-top {
        position: static;
    }
    .go-top li .hover-img{
        display: none;
    }
    .go-top li:hover .hover-img{
        display: inline-block;
    }
    .go-top li:hover .img{
        display: none;
    }
</style>