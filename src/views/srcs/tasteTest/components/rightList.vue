<template>
    <div class="taste-test" ref="right">
        <div class="circle-bln">
            <img width="80%" src="@/assets/logo/logo_personal.png" alt="">
        </div>
        <div style="height:90px"></div>
        <div class="qcode">
            <img :src="dynamicModuleDat[3][0]" alt="">
        </div>
        <div class="focus-on">微信扫码关注，发现未知的自己...</div>
        <div class="hot-list">
            <div class="hot-test">热门测试</div>
            <p class="text-center mgt20 mgb20" v-if="hotList.length < 1">暂无数据</p>
            <div v-else v-for="(item,index) in hotList" :key='index'>
                <list-card :radius='0' :shadow='false' :height='"172px"' :src="item.image"
                 @click.native="gotoDetial(item)">
                    <div slot="img" class="shadow-title">
                        <p class="title overflow-hidden">{{item.name}}</p>
                    </div>
                </list-card>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixin from './mixin'
import listCard from '@/components/listCard'
import {  resOk } from '@/settings'
import {  hotTest} from '@/api/tasteTest'
export default {
    components:{
        listCard
    },
    mixins:[mixin],
    computed: {
        ...mapGetters([
            'dynamicModuleDat'
        ]),
    },
    created(){
        this.gethotTest()
    },
    methods:{
        gethotTest(){
            hotTest({labelId:''}).then((res)=>{
                if(res.code == resOk){
                    this.hotList = res.data
                    
                    this.$nextTick(() => {
                        let rightH = this.$refs.right.clientHeight + 7
                        this.$emit('setHeight', rightH)
                    })
                }
            })
        },
    }
}
</script>
<style lang='less'>
</style>