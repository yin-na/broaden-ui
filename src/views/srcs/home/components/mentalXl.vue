/*
 * @Author: 李素素 
 * @Date: 2019-08-20 15:47:53 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-11-12 10:03:52
 */
// 心智训练

<template>
    <div class="inner">
        <Card dis-hover :bordered="false" class="mental-xl">
            <header-line text="心智训练"></header-line>
            <!-- 列表 -->
            <Row :gutter="50">
                <Col span="8" v-for="(item, index) in carouselList" :key="index" class="base-content-list cursor-p"
                    @click.native="goToUrl(item)">
                    <!-- 列表 -->
                    <list-item :src='item.coverImage'
                                width="154px" height="154px"
                                class="mgt20 pdt10">
                        <p class="title overflow-hidden normal h25 color-base">
                            {{ item.title }}
                        </p>
                        <p class="info mgt5 hide-ellipsis maxh52">
                            游戏类型：
                            <template v-if="item.gameTypeName">
                                <Tag class="my-m-tag">
                                    {{ item.gameTypeName }}
                                </Tag>
                            </template>
                        </p>
                        <p class="info color-t mgt10 hide-ellipsis h50 hideImg">
                            {{ item.content | replaceHtml }}
                        </p>
                    </list-item>
                </Col>
            </Row>
            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
            <div class="text-center">
                <router-link to="/mentalTraining">
                    <Button class="gray-btn mgt20 mgb20 fs16 gethover" shape="circle" style="color:#eb6100">更多心智训练 >></Button>
                </router-link>
            </div>
        </Card>
    </div>
</template>

<script>
import listItem from '@/components/listItem'
import headerLine from '@/components/headerLine'
import mentalTraining from '../../mentalTraining/mixin'
import replaceFilter from '@/mixins/replaceFilter'

export default {
    mixins: [mentalTraining, replaceFilter],
    components: { listItem, headerLine },

    data() {
        return {
            carouselList: [], // 列表数据
            param: {
                title: '',
                gameType: '',
                current: 1,
                size: 6
            },
        }
    },

    mounted() {
        this.getList()
    }
}
</script>

<style lang="less">
    // @import '../../../styles/variables.less';
      @base-color: #fff;
    @font-color: #343d4a;
    .mental-xl .ivu-card-body {
        padding-left: 30px;
        padding-right: 30px
    }
    .gethover:hover{
    background:#f5f5f5
}
</style>