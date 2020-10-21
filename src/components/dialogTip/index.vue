<template>
    <div class="dialog">
        <van-dialog v-model="show"
                :showConfirmButton='false'>
            <div slot="title" class="pdb30">
                <div class="dialog-title">
                    {{title}}
                </div>
            </div>
            <div slot="default" class="phone-info mgt20">
                <slot></slot>
                <p class="inner prompt-content" v-if="content">{{content}}</p>
                <div class="phone-button">
                    <van-button class="gray-bg mgr10" type="default" v-if="showLeft" @click="cancleClick">{{btnLeft}}</van-button>
                    <van-button type="primary" class="base-bg" v-if="showRight" @click="handleConfirm">{{btnRight}}</van-button>
                    <slot name="button"></slot>
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
export default {
    name:'Dialog',
    props:{
        title:{
            type:String,
            default:'操作提示'
        },
        content:{
            type:String,
            default:''
        },
        btnRight:{
            type:String,
            default:'确定'
        },
        showLeft:{
            type:Boolean,
            default: true
        },
        showRight:{
            type:Boolean,
            default: true
        },
        btnLeft:{
            type:String,
            default:'取消'
        },
        show:{
            type:Boolean,
            default: false
        }
    },
    methods:{
        cancleClick(){
            this.$emit('cancle',false)
        },
        handleConfirm(){
            this.$emit('handleConfirm',true)
        }
    }
}
</script>
<style lang='less'>
.dialog{
    .van-dialog__header{
        padding-top: 0;
    }
    .dialog-title{
        text-indent: 15px;
        line-height: 44px;
        color:#999;
        text-align: left;
        border-bottom: 1px solid #ebebeb;
    }
    .prompt-content{
        text-align: left;
        line-height: 20px;
        margin-bottom: 35px;
    }
}

</style>