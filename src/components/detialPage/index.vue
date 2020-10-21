// 公告左侧组件
<template>
<!-- 详情页 -->
    <div class="detial">
        <div class="con-header">
            <h3>{{content.title}}</h3>
            <!-- 标签 -->
            <div v-if="showBq && content.featureList" class="mgt10 mgb10">
                <Tag class="my-m-tag" v-for="(item, index) in content.featureList" :key="index">
                    {{ item }}
                </Tag>
            </div>
            <p class="tabs mgt10 mgb10">
                <span><Icon type="ios-time" /><span> {{content.createTime}}</span></span>
                <span v-if="!hideP"><Icon type="md-person" /><span> {{content.publisher}}</span> </span>
                <span><Icon type="ios-eye" size="22"/><span> {{content.readNumber ? content.readNumber : '0'}}</span></span>
            </p>
        </div>
        <div class="content wang-editor" v-html="content.content"></div>
    </div>
</template>
<script>
export default {
    name:'Detial',
    props:{
        content:{
            type: Object,
            default: ()=>{}
        },
        hideP: {
            type: Boolean,
            default: false
        },
        showBq: {
            type: Boolean,
            default: false
        },
    }
}
</script>
<style lang='less' scoped>
.detial{
    padding:0 20px;
}
.con-header{
    border-bottom:1px solid #eaeaea;
    line-height: 26px;
    h3{
        color: #343d4a
    }
    .tabs{
        line-height: 32px;
        span{
            display: inline-block;
            margin-right: 15px;
            color: #80878e;
            i{
                margin-right:4px;
            }
        }
        span, i{
            vertical-align: middle
        }
    }
}
.content{
    padding: 20px 0;
    text-indent: 2em;
    color:#343d4a;
    line-height: 24px;
    img{
        display: block;
        margin: 0 auto 26px;
    }
    p{
        margin-top:20px;
    }
}
</style>