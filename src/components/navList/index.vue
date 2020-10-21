/*
 * @Author: 李素素 
 * @Date: 2019-08-21 13:30:03 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-22 14:04:20
 */
<template>
    <Card class="card-pd0 hide bread-nav clearfix" dis-hover :bordered="false">
        <div class="title bg-base fl" style="background-color:#eb6100">
            {{ title }}
        </div>
        <div class='fl article-title'>
            <slot></slot>
        </div>
        <div class="fr point">
            <span v-for="(item, index) in navList" :key="index">
                <router-link :to="item.path"
                :class="path == item.path ? 'color-base' : ''">
                    {{item.meta.title}}
                </router-link>
            </span>
        </div>
    </Card>
</template>

<script>
import { constantRoutes } from '@/router/portalSite'
export default {
    name:"NavList",

    data() {
        return {
            navList: [],
            title: '',
            path: ''
        }
    },
    created(){
    },
    mounted(){
        this.getDetail()
    },
    methods:{
        getDetail(){
        let route = this.$route
        let name = route.matched[1].name
        let list = constantRoutes.children.filter(item => item.name == name)
        let typeNum = route.params.typeNum
        let flag = route.meta.flag
        this.title = this.$route.meta.title
        if (typeNum) {
            this.path = flag + '/' + typeNum
        } else {
            this.path = route.path
        }
        
        this.navList = list[0].children
        },
        getList(id){
            this.$emit('getListData', id)
        }
    },
    watch: {
    }
}
</script>

<style lang='less' scoped>
.article-title{
    margin-left: 36px;
}
.point{
    span{
        cursor: pointer;
        a:hover{
            color:#eb6100
        }
    }
}
.bread-nav{
    height: 48px;
    line-height: 48px;
    overflow: hidden;
    margin: 10px 0;
    .title{
        min-width: 140px;
        text-align: center;
        line-height: 48px;
        color: #eff2f7
    }
    span{
        padding:0 10px;
        border-right: 2px solid #80878e
    }
    span:last-child{
        border-right: none
    }

}
</style>
