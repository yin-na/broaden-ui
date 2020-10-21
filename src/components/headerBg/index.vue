// 主题图
<template>
    <div class="maxh220 list-img hide">
        <img :src="src" alt="">
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HeaderBg',

    data() {
        return {
            list: {
                4: [require('@/assets/list/news_top.png')], // 新闻中心导航图
                5: [require('@/assets/list/psychologicalBg.png')], // 公告通知导航图
                6: [require('@/assets/list/psychologicalBg.png')], // 心理讲堂导航图
                7: [require('@/assets/list/psychologicalBg.png')], // 心理文章导航图
                8: [require('@/assets/list/psychologicalBg.png')], // 音乐放松导航图
                9: [require('@/assets/list/psychologicalBg.png')], // 心理视频导航图
                10: [require('@/assets/list/psychologicalBg.png')], // 心理图库导航图
                11: [require('@/assets/list/psychologicalBg.png')], // 家庭指南导航图
                12: [require('@/assets/list/psychologicalBg.png')], // 趣味测试导航图
                13: [require('@/assets/list/psychologicalBg.png')], // 心智素质训练导航图
            },
            src: ''
        }
    },

    computed: {
        ...mapGetters([
            'dynamicModuleDat'
        ]),
    },

    mounted() {
        let id = this.$route.meta.id
        if (!id) {
            this.src = this.list[4][0]

            return
        }

        let src = this.dynamicModuleDat[id] ? this.dynamicModuleDat[id] : this.list[id]
        this.src = src ? src[0] : this.list[id][0]
    }
}
</script>