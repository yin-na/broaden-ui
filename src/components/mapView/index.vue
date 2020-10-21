<!--
使用说明:
   v-on:  map-confirm,参数为array数组,传递经纬度值
   v-on   cancel    取消时发出事件
-->
<template>
        <!-- <Modal @on-cancel="cancel" v-model="showMapComponent" width="800" :closable="false" :mask-closable="false"> -->
    <el-dialog append-to-body
            :close-on-click-modal="false"
            :title="'选择地址'"
            :visible.sync="showMapComponent" 
            width="600px" 
            :top="'9vh'"
            @close="cancel">
        <p class="fs16">选择地址：{{ center.keyword }}</p>
        <p class="fs16 mgb10">纬度：{{ center.lat }}  经度：{{ center.lng }}</p>
        <baidu-map v-bind:style="mapStyle" class="bm-view" 
                ak="WSrX4bCfgcjTfhWNCwvfI1ZnQnfZDxFW&amp;ver=1" 
                :center="center"
                :zoom="zoom"
                :scroll-wheel-zoom="true"
                @click="getClickInfo"
                @moving="syncCenterAndZoom"
                @moveend="syncCenterAndZoom"
                @zoomend="syncCenterAndZoom">
            <bm-view style="width: 100%; height:400px;"></bm-view>
            <!-- 添加一个小红点的，并将当前的经纬度写入数据中 -->
            <bm-marker :position="{lng: center.lng, lat: center.lat}" :dragging="false" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
            <bm-control>
                <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">
                    <input type="text" placeholder="请输入搜索关键字" class="serachinput">
                </bm-auto-complete>
            </bm-control>
            <!-- //地理位置的搜索功能 -->
            <bm-local-search :keyword="keyword" :auto-viewport="true" style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
        </baidu-map>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
} from 'vue-baidu-map'
export default {
    components: {
        BaiduMap,
        BmControl,
        BmView,
        BmAutoComplete,
        BmLocalSearch,
        BmMarker
    },
    data: function () {
        return {
            showMapComponent: this.value,
            keyword: '',
            mapStyle: {
                width: '100%',
                height: this.mapHeight + 'px'
            },
            center: {
                keyword: '北京市',
                lng: 116.404,
                lat: 39.915
            },
            zoom: 15
        }
    },
    watch: {
        value: function (currentValue) {
            this.showMapComponent = currentValue
            if (currentValue) {
                this.keyword = ''
            }
        }
    },
    props: {
        value: Boolean,
        mapHeight: {
            type: Number,
            default: 400
        }
    },
    methods: {
        /***
         * 地图点击事件。
         */
        getClickInfo(e) {
            this.center.lng = e.point.lng
            this.center.lat = e.point.lat

            this.getLocationPoint(e.point)
        },
        syncCenterAndZoom(e) {
            const {
                lng,
                lat
            } = e.target.getCenter()
            this.center.lng = lng
            this.center.lat = lat
            this.zoom = e.target.getZoom()

            let point = new window.BMap.Point(lng, lat)
            this.getLocationPoint(point)
        },
        getLocationPoint(point) {
            /* 创建地址解析器的实例 */
            let geoCoder = new window.BMap.Geocoder();
            /* 利用坐标获取地址的详细信息 */
            geoCoder.getLocation(point, res=>{
                let addComp = res.addressComponents;
                let site = addComp.province + addComp.city +  addComp.district + addComp.street + addComp.streetNumber;

                this.center.keyword = site

            })
        },
        /***
         * 确认
         */
        confirm: function () {
            this.showMapComponent = false
            this.$emit('map-confirm', this.center)
            this.keyword = ''
        },
        /***
         * 取消
         */
        cancel: function () {
            this.showMapComponent = false
            this.$emit('cancel', this.showMapComponent)
            this.keyword = ''
        }
    }
}
</script>

<style scoped>
.serachinput {
    width: 300px;
    box-sizing: border-box;
    padding: 4px 9px;
    border: 1px solid #dddee1;
    line-height: 20px;
    font-size: 16px;
    height: 30px;
    color: #333;
    position: relative;
    border-radius: 4px;
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
}
</style>
