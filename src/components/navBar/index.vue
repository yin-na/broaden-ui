<template>
    <Card class="card-pd0 hide bread-nav clearfix" dis-hover :bordered="false">
        <div class="title bg-base fl" style="background-color:#eb6100" >{{title}}</div>
        <div class='fl article-title'>
            <slot></slot>
        </div>
        <div class="fr point ">
            <span v-for="(item,index) in navList" :key="index" class="huaguo">
                <router-link v-if="item.path" :to="item.path">
                    {{item.name}}
                </router-link>
                <div class="classify" :class="{ 'color-base' : item.active ? true : false}" v-else @click="getList(item.id)">{{item.name}}</div>
            </span>
        </div>
    </Card>
</template>
<script>
export default {
    name:"NavBar",
    props:{
        navList:{
            type: Array,
            default:() => []
        },
        title:{
            type: String,
            default:() => ''
        }
    },
    created() {
    },
    methods:{
        getList(id){
            this.$emit('getListData',id)
        }
    }
}
</script>
<style lang='less' scoped>
.huaguo:hover a{
    color:#eb6100
}
.article-title{
    margin-left: 36px;
}
.point{
    span{
        cursor: pointer;
    }
}

</style>