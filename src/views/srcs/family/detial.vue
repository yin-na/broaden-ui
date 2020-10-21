<template>
    <div class="inner mgt10">
        <!-- lisusu 统一主题图 19-08-23 -->
        <header-bg></header-bg>
        <nav-bar class="mgt10" :navList='navList' :title="title"></nav-bar>
        <list-page class="mgt10">
            <div slot="list-item">
                <detial-page :content='content'></detial-page>
            </div>
            <div slot="right-list">
                <div class="right-title bg-base">指南推荐</div>
                <div class="pdlr20 pdtb10">
                    <div class="hide" style="max-height: 450px">
                        <scroll-seam :data='cardList'>
                            <li class="overflow-hidden" v-for="(item,index) in cardList" :key="index"
                                @click="gotoDetial(item.id)">
                                <Icon class="colorbase" style="color:#eb6100" size='20' type="md-arrow-dropright" />
                                {{item.title}}
                            </li>
                        </scroll-seam>
                    </div>
                </div>
            </div>
        </list-page>
    </div>
</template>

<script>
import detialPage from '@/components/detialPage'
import scrollSeam from '@/components/scrollSeam'
import listPage from '@/components/listPage'
import mixin from './mixin'
import { resOk } from '@/settings'
import { queryFamilyGuide } from '@/api/family'

export default {
    name:'FamilyDet',
    mixins: [mixin],
    components:{
        detialPage,
        scrollSeam,
        listPage,
    },
    data(){
        return{
            param: {
                title: '',
                current: 1,
                size: 30
            },
            content:{},
        }
    },
    mounted() {
        this.getDetial()
    },
    methods: {
        getDetial() {
            let id = this.$route.params.id
            queryFamilyGuide(id).then((res) => {
                if (res.code == resOk) {
                    let data = res.data
                    this.content = data
                }
            })
        }
    }
}
</script>