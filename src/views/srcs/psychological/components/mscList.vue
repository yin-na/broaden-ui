/*
 * @Author: 李素素 
 * @Date: 2019-08-21 13:52:15 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 14:22:13
 */
// 音乐列表
<template>
    <div>
        <Card dis-hover :bordered="false" class="mental-xl">
            <Row :gutter="50">
                <Col span="12" v-for="(item, index) in carouselList" :key="index" class="base-content-list cursor-p"
                        @click.native="showMic(item, index)">
                    <!-- 列表 -->
                    <list-item :src='item.thumbnail'
                                width="240px" height="150px"
                                class="mgt20">
                        <p class="pdt10"></p>
                        <p class="title overflow-hidden h25">
                            {{ item.title }}
                        </p>
                        <p class="info color-t mgt10 h50">
                            <span class="mgr5">来源：{{ item.source }} </span>
                            <span>阅读量：{{ item.readNumber ? item.readNumber : '0' }}</span>
                        </p>
                        <p class="mgb10 maxh26 time-read hide">
                            <template v-if="item.featureList">
                                <Tag class="my-m-tag" v-for="(itemed, indexed) in item.featureList" :key="indexed">
                                    {{ itemed.name }}
                                </Tag>
                            </template>
                        </p>
                    </list-item>
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
        
        <Modal v-model="modalMsc"
            :closable="true"
            :footer-hide="true"
            class-name="vertical-center-msc"
            :width="712">
            <div class="vertical-msc">
                <div class="content">
                    <p class="fs20">{{ musicItem.title }}</p>
                    <p class="fs13">主播：{{  musicItem.source}}</p>
                    <p class="mgt15 fs13">{{ musicItem.resourceContent | replaceHtml }}</p>
                    <div class="mgt30 vertical-msc-slider">
                        <div class="slider-pos">
                            <span class="border-play mg cursor-p  mgr10"
                                @click="nextMusic(-1)">
                                <Icon type="md-skip-backward" />
                            </span>
                            <span class="border-play cursor-p w30 mgr10"
                                :class="music.isPlay ? '' : 'mg'"
                                @click="play">
                                <Icon v-if="music.isPlay" type="md-pause"/> 
                                <Icon v-else type="md-play" />
                            </span>
                            <span class="border-play mg cursor-p mgr10"
                                    @click="nextMusic(1)">
                                <Icon type="md-skip-forward" />
                            </span>
                        </div>
                        <div class="time fs13">
                            {{ parseInt(music.maxTime) == parseInt(music.currentTime) ? '' : '- ' }}
                            {{ formatTime(music.maxTime-music.currentTime) }}
                        </div>
                        <div class="pdt30 slider-par">
                            <Slider @on-change="changeTime" 
                                    :max="music.maxTime"
                                    :tip-format="formatTime"
                                    v-model="music.currentTime"></Slider>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
        
        <!-- 音乐 -->
        <audio ref="music" loop v-show="false"> 
            <source :src="musicSrc" type="audio/mpeg">
        </audio>
    </div>
</template>


<script>
import listItem from '@/components/listItem'
import music from '@/mixins/music'
import mixin from './mixin'
import replaceFilter from '@/mixins/replaceFilter'
import { resOk } from '@/settings'
import { buildingListTable } from '@/api/psychological'
import basePage from '@/components/basePage'

export default {
    name: 'MscList',
    mixins: [ music, mixin, replaceFilter ],
    components: { listItem,basePage },

    data() {
        return {
            modalMsc: false,
            param: {
                firstResourceId: '',  // 1级分类id
                secondResourceId: '', // 2级分类id
                fileType: '1',
                current: 1,
                size: 10
            },
        }
    },

    mounted() {
        this.listenMusic()
        this.init()
    },

    methods: {
        init() {
            // buildingListTable(this.param).then((res) => {
                
            //     if (res.code == resOk) {
            //         let data = res.data;
            //         this.carouselList = data.records;
            //         this.$nextTick(() => {
            //             let leftH = this.$refs.left.$el.clientHeight;
            //             let rightH = this.$refs.right.$el.clientHeight;
            //             this.height = leftH > rightH ? leftH + 'px' : rightH + 'px';
            //         })
            //     }
            // })
                buildingListTable(this.param).then((res) => {
                if (res.code == resOk) {
                    let data = res.data;
                    // 心理图片
                    if (this.id == 3) {
                        this.isLoad = false
                        this.carouselList = this.carouselList.concat(data.records);
                        if (data.records.length < size) {
                            this.loadMore = false
                            return
                        }
                        this.param.current++
                    } else {
                        this.carouselList = []
                        this.carouselList = data.records;
                        this.total = data.total;
                    }
                }
            })
        },
        showMic(item, index) {
            this.musicSrc = item.fileUploadUrl
            this.musicItem = item
            
            if (!this.musicSrc) {
                this.$Message.error('音乐出错了');
                return
            }

            this.modalMsc = true;
            this.modalIndex = index
            this.listenMusic()
        },
    }
}
</script>
<style lang="less">
::v-deep .ivu-modal{
    top:300px!important
}
.vertical-center-msc {
    margin-top: 150px;
    .ivu-modal-close{
        top: 16px;
        right: 16px;
    }
    .ivu-modal-content {
        background: transparent;
        box-shadow: 0 0 0;
    }
    .vertical-msc {
        border-radius: 4px;
        padding: 65px;
        background: url('../../../../assets/list/micng.png') no-repeat center center;
        background-size: cover;
        .ivu-tooltip-popper {
            top: -45px!important;
            transform: translateX(-34%);
        }
    }
    .content {
        padding: 30px;
        background: rgba(0, 0, 0, .3);
        color: #ffffff;
    }
}

// 音乐播放进度
.vertical-msc-slider {
    position: relative;
    padding-left: 130px;
    height: 30px;
    .slider-pos {
        position: absolute;
        left: 0;
        top: 0;
    }
    .time {
        position: absolute;
        right: 0;
        top: -10px;
    }
}
.slider-par {
    padding-top: 1px;
    .ivu-slider-button-wrap {
        top: -6px;
    }
    .ivu-slider-wrap {
        margin: 13px 0;
    }
    .ivu-slider-bar {
        background: #ffffff;
    }
    .ivu-slider-wrap {
        background: rgba(255, 255, 255, .5)
    }
    .ivu-slider-button {
        border-color: #ffffff
    }
}
</style>