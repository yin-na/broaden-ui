/*
 * @Author: 李素素 
 * @Date: 2019-08-20 10:40:05 
 * @Last Modified by:李素素 
 * @Last Modified time: 2019-08-20 10:40:05 
 */
<template>
    <div class="clearfix header-top">
        <p class="fl">
            <span class="fs18  top-border" style="color:#eb6100">
                {{ list.title }}
                <span class="h-line" style="background-color:#eb6100"></span>
            </span>
            <span class="fs18"> / </span>
            <span>{{ list.en }}</span>
        </p>
        <router-link class="fr" v-if="list.to" :to="list.to">
            <Button type="primary" ghost shape="circle" size="small" class="header-btn">
                更多 >
            </Button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'HeaderTop',

    props: {
        list: {
            type: Object,
            default:() => {}
        }
    }
}
</script>

<style lang="less">
    .header-top {
        border-bottom: 2px solid #f5f5f5;
        margin-bottom: 20px;
        &.pdrl5 {
            padding: 0 5px;
        }
        .top-border {
            position: relative;
            line-height: 42px;
            display: inline-block;
            .h-line {
                position: absolute;
                left: 0;
                bottom: -2px;
            }
        }
        .header-btn {
            height: 28px;
            width: 66px;
            border-color: #edeff4;
            color:#eb6100;
            margin-top: 7px;
            &.bgW {
                background: #ffffff;
                border-color: #ffffff;
            }
        }
    }
</style>