/*
 * @Author: 李素素 
 * @Date: 2019-08-20 10:39:59 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-27 16:30:08
 */

<template>
    <!-- 列表li -->
    <div class="base-list-item base-content-list"
            :style="{height: height}">
        <div class="content-img hide algin-center"
            :style="{height: height, width: width}">
            <img v-if="src" :src="src" alt="">
            <p v-else :style="{lineHeight: height}" class="text-center bg-gray w100b">暂无数据</p>
        </div>
        <div class="content-text" :style="{ marginLeft: width }">
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
        width: {
            type: String,
            default: '196px'
        },
        height: {
            type: String,
            default: '115px'
        }
    },
    data(){
        return{}
    }
}
</script>
<style lang="less" scoped>
    .base-list-item{
        position: relative;
        .content-img{
            transition: all .3s ease-in;
            position: absolute;
            left: 0;
            top: 0;
            img{
                width: 100%;
                min-height: 100%;
            }
        }
        .content-text {
            padding-left: 18px;
            min-height: 100%;
        }
        &:hover {
            .content-img{
                opacity: .8;
            }
        }
    }
</style>