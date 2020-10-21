/*
 * @Author: 李素素 
 * @Date: 2019-08-21 13:52:15 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-24 15:05:36
 */
// 音乐列表
<template>
    <div>
        <Card dis-hover :bordered="false" class="mental-xl">
            <Row :gutter="60" class="mgb20">
                <Col span="8" v-for="(item, index) in carouselList" :key="index" class="base-content-list"
                    @click.native="goToUrl(2, item)">
                    <list-card :src="item.thumbnail"
                                :height="'180px'"
                                :width="'315px'">
                        <!-- 图片定位 -->
                        <div class="show-video-time" slot="img">
                            <Icon class="fs16" type="md-arrow-dropright-circle" />
                            <span>
                                {{ item.videoTime | sToTime }}
                            </span>
                        </div>
                        <!-- 内容 -->
                        <p class="title overflow-hidden h25">
                            {{ item.title }}
                        </p>
                        <p class="info overflow-hidden h18">
                            来源：{{ item.source }} 阅读量：{{ item.readNumber ?  item.readNumber : '0'}}
                        </p>
                        <p class="mgt10 clearfix h26 hide">
                            <template v-if="item.featureList">
                                <Tag class="my-m-tag" v-for="(itemed, indexed) in item.featureList" :key="indexed">
                                    {{ itemed.name }}
                                </Tag>
                            </template>
                        </p>

                    </list-card>
                </Col>
            </Row>
            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
        </Card>
        <div class="text-center mgt20">
            <base-page @change="changeCurrent"
                        :size="param.size"
                        :current="param.current"
                        :total="total"></base-page>
        </div>
    </div>
</template>

<script>
import listCard from '@/components/listCard'
import mixin from './mixin'
import videoFilter from '@/mixins/videoFilter'
import basePage from '@/components/basePage'

export default {
    mixins: [ mixin, videoFilter ],

    components: { listCard,basePage },

    data() {
        return {
        }
    },
    created(){
        this.inited()
    },
    methods: {
    }
}
</script>
