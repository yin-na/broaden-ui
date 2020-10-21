/*
 * @Author: 孟如月 
 * @Date: 2019-08-20 09:20:25 
 * @Last Modified by:孟如月 
 * @Last Modified time: 2019-08-20 09:20:25 列表页组件
 */

<template>
    <div>
        <!-- 列表 -->
        <Row :gutter="10">
            <Col :span="lspan">
                <Card class="hide" dis-hover :bordered="false">
                    <slot name="list-item"></slot>
                </Card>
                <div v-if="page" class="pages  names">
                    <slot name='pages'></slot>
                </div>
            </Col>
            <!-- 右侧列表 -->
            <Col :span="rspan">
                <Card class="card-pd0 base-right-card" dis-hover :bordered="false"
                        :class="hide ? 'hide' : ''">
                    <slot name="right-list"></slot>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'ListPage',
    props:{
        lspan:{
            type:Number,
            default: 16
        },
        rspan:{
            type:Number,
            default: 8
        },
        page:{
            type:Boolean,
            default: true
        },
        hide:{
            type:Boolean,
            default: true
        },

    }
}
</script>

<style lang="less" scoped>
// .left-card{
//     padding: 20px;
//     // background-color: #fff
// }
.right-card{
    border-radius: 8px;
    background: #fff;
    overflow: hidden;
}
</style>