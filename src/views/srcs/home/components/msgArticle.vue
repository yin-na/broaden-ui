/*
 * @Author: 李素素 
 * @Date: 2019-08-20 13:35:13 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-11-12 10:03:49
 */
// 心理文章
<template>
    <div class="inner">
        <Row :gutter="10">
            <Col span="14" ref="left">
                <Card dis-hover :bordered="false" :style="{minHeight: height}">
                    <!-- 头部 -->
                    <header-top :list="listNews"></header-top>
                    <!-- 小标题 -->
                    <ul class="art-title mgb10">
                        <li v-for="(item, index) in title"
                            class="li mgb10" :key="index"
                            :class="param.firstResourceId == item.id ? 'color-base' : ''"
                            @click="changeFirstResourceId(item.id)">
                            {{ item.name }}
                        </li>
                    </ul>
                    <!-- 列表 -->
                    <list-item v-for="(item, index) in carouselListed" :key="index"
                                :src='item.thumbnail'
                                width="98px" height="98px"
                                :class="index > 0 ? 'mgt20' : ''"
                                class="cursor-p"
                                @click.native="goToUrl(0, item)">
                            <p class="title overflow-hidden">{{ item.title }}</p>
                            <p class="info hide-ellipsis mgt5 hideImg">
                                {{ item.resourceContent | replaceHtml }}
                            </p>
                            <p class="info time-read"><span class="mgr10">{{ item.source }}</span><span>{{ item.fileUploadDate }}</span></p>
                    </list-item>
                    <p class="text-center mgt20 mgb20" v-if="carouselListed.length < 1">暂无数据</p>
                </Card>
            </Col>
            <Col span="10" class="msg-article-r"  ref="right">
                <Card dis-hover :bordered="false" class="hide" :style="{minHeight: height}">
                    <div class="top">
                        <div class="img algin-center">
                            <img :src="musicItem.thumbnail"/>
                        </div>
                        <div class="play fs20 text-center mgt15 color80878e">
                            <Icon type="md-skip-backward cursor-p"
                                    @click="nextMusic(-1)"/>
                            <span class="border-play cursor-p w36 color-base"
                                :class="music.isPlay ? '' : 'mg'"
                                @click="play">
                                <Icon v-if="music.isPlay" type="md-pause" class="mgt2"/> 
                                <Icon v-else type="md-play" class="mgt2"/>
                            </span>
                            <Icon type="md-skip-forward cursor-p" 
                                    @click="nextMusic(1)"/>
                        </div>
                        <div class="pdrl16 mgb8d">
                            <p class="text-right mgb6d">
                                {{ parseInt(music.maxTime) == parseInt(music.currentTime) ? '' : '- ' }}
                                {{ formatTime(music.maxTime-music.currentTime) }}
                            </p>
                            <Slider @on-change="changeTime" 
                                    :max="music.maxTime"
                                    :tip-format="formatTime"
                                    v-model="music.currentTime"
                                    :disabled="parseInt(music.maxTime) == 0"></Slider>
                        </div>
                    </div>
                    <!-- 音乐 -->
                    <audio ref="music" loop v-show="false"> 
                        <source :src="musicSrc" type="audio/mpeg">
                    </audio>
                    <!-- 表格 -->
                    <div class="pd16">
                        <Table class="msg-table overflow-table-one" :size="'small'" :border="false" 
                                :columns="columns" :data="carouselList">'
                            <!-- 标题 -->
                            <template slot-scope="{ row }" slot="title">
                                <div class="ivu-tooltip-rel">
                                    {{ row.title }}
                                </div>
                            </template>
                            <!-- 播放 -->
                            <template slot-scope="{ row, index }" slot="play">
                                <span @click="showMic(row, index)" class="border-play fs14 cursor-p color80878e"
                                        :class="[index == modalIndex ? 'color-base' : '', music.isPlay && index == modalIndex ? '' : 'mg']">
                                    <Icon :type="(music.isPlay && index == modalIndex) ? 'md-pause' : 'md-play'" />
                                </span>
                                <!-- <span @click="showMic(row, index)" v-else class="border-play fs14 cursor-p color-base">
                                    <Icon type="md-pause"/> 
                                </span> -->
                            </template>
                            <!-- 时长 -->
                            <template slot-scope="{ row }" slot="videoTime">
                                {{ row.videoTime | sToTime }}
                            </template>
                            <!-- 类型 -->
                            <template slot-scope="{ row }" slot="featureList">
                                <Tooltip max-width="200" :content="row.featureName" placement="top">
                                    <template>
                                        {{ row.featureName }}
                                    </template>
                                </Tooltip>
                            </template>
                        </Table>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import headerTop from '@/components/headerTop'
import listItem from '@/components/listItem'
import music from '@/mixins/music'
import videoFilter from '@/mixins/videoFilter'
import setArtTitle from '@/mixins/setArtTitle'
import replaceFilter from '@/mixins/replaceFilter'
import { resOk } from '@/settings'
import { buildingListTable } from '@/api/psychological'

export default {
    name: 'HomeNew',
    mixins: [ music, setArtTitle, videoFilter, replaceFilter ],
    components: { headerTop, listItem },

    data() {
        return {
            listNews: { title: '心理文章', en: 'ARTICLES', to: '/psychological/0' },
            carouselListed: [], // 轮播的列表
            height: 0,
            columns: [
                {
                    title: '音乐放松',
                    align: 'center',
                    minWidth: 100,
                    // key: 'title'
                    slot: 'title'
                },
                {
                    title: '时长',
                    align: 'center',
                    minWidth: 90,
                    slot: 'videoTime'
                },
                {
                    title: '类型',
                    align: 'center',
                    minWidth: 100,
                    slot: 'featureList'
                },
                {
                    minWidth: 90,
                    title: '播放',
                    align: 'center',
                    slot: 'play'
                }
            ],
            carouselList: [],
            paramMic: {
                firstResourceId: '',  // 1级分类id
                secondResourceId: '', // 2级分类id
                fileType: '1',
                current: 1,
                size: 7
            },
            param: {
                firstResourceId: '',  // 1级分类id
                secondResourceId: '', // 2级分类id
                fileType: '0',
                current: 1,
                size: 3
            },
        }
    },

    created() {
        this.init()
        this.inited()
    },

    methods: {
        inited() {
            this.setHeight()
            buildingListTable(this.param).then(res => {
                if (res.code == resOk) {
                    let data = res.data;
                    this.carouselListed = data.records;

                    // 请求音乐
                    buildingListTable(this.paramMic).then(res => {
                        if (res.code == resOk) {
                            let records = res.data.records
                            records.forEach((item) => {
                                let featureName = []
                                item.play = 0
                                item.featureList.forEach((itemF) => {
                                    featureName.push(itemF.name)
                                })

                                item.featureName = featureName.join('、')
                            })
                            this.carouselList = records;
                            
                            this.setHeight()
                            // 添加第一天音乐
                            if (this.carouselList.length > 0) {
                                this.musicItem = this.carouselList[0]
                                this.musicSrc = this.musicItem.fisleUploadUrl
                                
                                this.listenMusic(true)
                            }
                        }
                    })
                }
            })
        },
        setHeight() {
            this.$nextTick(() => {
                let leftH = this.$refs.left.$el.clientHeight;
                let rightH = this.$refs.right.$el.clientHeight;
                this.height = leftH > rightH ? leftH + 'px' : rightH + 'px';
            })

        },
        changeFirstResourceId(id) {
            this.param.firstResourceId = id
            this.inited()
        },
        
        goToUrl(type, item) {
            this.$router.push('/psychological/detial/' + type + '/' + item.buildingId)
        },
    }
}
</script>

<style lang="less">
    // 
    .msg-article-r {
        .ivu-card-body {
            padding: 0
        }
        .pd16 {
            padding: 3px 16px;
        }
        .pdrl16 {
            padding: 0 16px;
        }
        .mgb6d {
            margin-bottom: -6px;
        }
        .top {
            .img {
                height: 193px;
                overflow: hidden;
                img {
                    width: 100%;
                    min-height: 100%;
                }
            }
        }
        // 表格
        .msg-table {
            thead {
                font-size: 14px;
            }
            &, tr, th, td {
                border: 0
            }
            .ivu-table:after , .ivu-table:before{
                width: 0;
            }
            .ivu-table-small td {
                height: 30px;
            }
        }
        .ivu-slider-button-wrap {
            top: -8px
        }
        .color80878e {
            color: #80878e
        }
        .mgb8d {
            margin-bottom: -8px;
            margin-top: -20px;
        }
    }
</style>