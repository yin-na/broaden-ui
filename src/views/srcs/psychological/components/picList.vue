/*
 * @Author: 李素素 
 * @Date: 2019-08-21 13:52:15 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-23 08:49:48
 */
// 图片列表
<template>
    <div>
        <Card dis-hover :bordered="false" class="container-water-fall" ref="picList">
            <waterfall :col='col'
                    :data="carouselList"
                    @scroll="scroll">
                <template>
                    <div class="cell-item" v-for="(item, index) in carouselList" :key="index"
                        @click="showImg(index)">
                        <img class="cursor-p mgt5" :src="item.thumbnail">
                    </div>
                </template>
            </waterfall>
            <p class="text-center mgt20 mgb20" v-if="carouselList.length < 1">暂无数据</p>
        </Card>
        <Modal v-model="modalPic"
            :closable="false"
            :footer-hide="true"
            class-name="vertical-center-modal"
            :width="1054">
            <div class="vertical-model">
                <div class="pos left" @click="nextImg(-1)">
                    <Icon type="ios-arrow-back"/>
                </div>
                <div class="pos right" @click="nextImg(1)">
                    <Icon type="ios-arrow-forward" />
                </div>
                <div class="img text-center">
                    <img class="mgt5" :src="modalItem.thumbnail" />
                </div>
                <p class="img text-center fs16 mgt20">
                    {{ modalItem.title }}
                </p>
            </div>
        </Modal>
    </div>
</template>

<script>
let oldTop = 0; //旧数据，初始为0
import mixin from './mixin'

export default {
    mixins: [ mixin ],
    data() {
        return {
            col: 4,
            margin: 10,
            modalPic: false,
            modalItem: '',
            modalIndex: 0,
            loadMore: true,
            isLoad: false,
        }
    },
    computed: {
    },
    created(){
        this.inited()
    },
    methods: {
        // 展示
        showImg(index) {
            let imgItem = this.carouselList[index]
            this.modalItem = imgItem

            this.modalPic = true
            this.modalIndex = index
        },
        // 下一张
        nextImg(val) {
            let index = this.modalIndex + val
            if (index < 0 || index > this.carouselList.length - 1) {
                return
            }
            this.showImg(index)
        },
        // 滚动
        scroll(scrollData) {
            if (!this.loadMore || this.isLoad) {
                return
            }
            if (oldTop < scrollData.scrollTop) {
                let height = scrollData.scrollTop + scrollData.clientHeight;
                if (scrollData.scrollHeight - height < 300) {
                    this.inited()
                    // this.carouselList = this.data.concat(this.data)
                }
            }
            //更新旧的位置
            oldTop = scrollData.scrollTop;
        },
    }
}
</script>

<style lang="less">
    .container-water-fall .vue-waterfall {
        width: auto;
        margin-left: -10px;
        img {
            width: 100%;
        }
        .vue-waterfall-column {
            padding-left: 10px;
        }
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal-body {
            padding: 90px 10px;
        }
        .ivu-modal{
            top: 0;
        }
        .img {
            width: 70%;
            margin: 0 auto;
            max-width: 600px;
            img {
                max-width: 100%;
                min-width: 50%;
            }
        }

        .vertical-model {
            position: relative;
            .pos {
                position: absolute;
                top: 50%;
                color: #fff;    
                font-size: 36px;
                height: 74px;
                line-height: 66px;;
                text-align: center;
                width: 40px;
                background: rgba(0, 0, 0, .5);
                transform: translateY(-50%);
                cursor: pointer;
            }
            .left {
                left: 20px;
            }
            .right {
                right: 20px;
            }
        }
    }
</style>
