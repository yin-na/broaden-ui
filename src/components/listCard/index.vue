/*
 * @Author: 李素素 
 * @Date: 2019-08-20 10:39:59 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-27 16:29:13
 */

<template>
    <!-- 横向卡片 -->
    <div class="base-list-heng cursor-p"
        :class="shadow ? 'shadow' : ''"
        :style="{borderRadius: radius + 'px'}">
        <div class="content-img hide algin-center"
            :style="{height: height}">
            <img v-if="src" :src="src" alt="">
            <p v-else :style="{lineHeight: height}" class="text-center bg-gray w100b">暂无数据</p>
            <slot name="img"></slot>
        </div>
        <div class="content-text">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'ListItem',
    props:{
        src: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '136px'
        },
        shadow: {
            type: Boolean,
            default: true
        },
        radius: {
            type: Number,
            default: 4
        },
    },
    data(){
        return{}
    }
}
</script>
<style lang="less" scoped>
.base-list-heng {
    margin-top: 25px;
    background: #ffffff;
    overflow: hidden;
    &.shadow {
        box-shadow: 0 1px 18px rgba(85, 77, 71, .15);
    }
    .content-img {
        position: relative;
        width: 100%;
        img {
            transition: all .3s ease-in;
            width: 100%;
            min-height: 100%;
        }
        .shadow-title{
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            line-height: 33px;
            color: #fff;
            background:rgba(0, 0, 0, .45);
            .title{
                padding: 0 10px;
            }
        }
    }
    .content-text {
        padding: 10px;
    }
    &:hover {
        .content-img img {
            opacity: .8;
        }
    }
}
</style>