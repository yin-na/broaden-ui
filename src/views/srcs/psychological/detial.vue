/*
 * @Author: 李素素 
 * @Date: 2019-08-22 18:32:31 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-23 11:13:31
 */
<template>
    <div>
        <div class="inner">
            <header-bg></header-bg>
            <nav-list></nav-list>
        </div>
        <!-- 加载组件 -->
        <div class="inner">
            <art-list v-if="id == '0'" :id="id"></art-list>
            <msc-list v-if="id == '1'" :id="id"></msc-list>
            <vid-list v-if="id == '2'" :id="id"></vid-list>
            <pic-list v-if="id == '3'" :id="id"></pic-list>
        </div>
    </div>
</template>

<script>
import navList from '@/components/navList'
import headerBg from '@/components/headerBg'
import artList from './components/artList' // 文章列表
import mscList from './components/mscList' // 音乐列表
import vidList from './components/vidList' // 视频列表
import picList from './components/picList' // 图片列表

export default {
    data() {
        return{
            id: ''
        }
    },
    components: {
        headerBg,
        navList,
        artList,
        mscList,
        vidList,
        picList
    },
    mounted() {
        // 获取id
        let params = this.$route.path.split('/')
        let id = params[params.length - 1];

        this.id = id
    },

    watch: {
    }
}
</script>