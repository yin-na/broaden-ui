<template>
    <div class="dialog">
        <van-dialog v-model="show"
                :showConfirmButton='false'>
        <!-- <div slot="title" class="pdb30">
            <div class="dialog-title">
                {{title}}
            </div>
        </div> -->
        <div slot="default" class="phone-info mgt20">
            <slot></slot>
            <p class="inner mgb5 base-color">{{content}}</p>
            <p class="fs14 mgb20">{{ time }}秒钟以后{{ text }}....</p>
            <div class="phone-button">
                <van-button type="primary" class="base-bg" @click="handleConfirm">{{btnRight}}</van-button>
            </div>
        </div>
        </van-dialog>
    </div>
</template>
<script>
let setTimer;
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
        show:{
            type:Boolean,
            default: false
        },
        text: {
            type: String,
            default: '将自动跳转到登录页'
        }
    },
    data() {
        return {
            time: 5
        }
    },

    methods:{
        setTime() {
            this.$nextTick(() => {
                let that = this;
                setTimer = setInterval(function() {
                    that.time--
                    if (that.time == 0) {
                        that.handleConfirm()
                    }
                }, 1000)
            })
        },

        handleConfirm(){
            clearInterval(setTimer)
            this.time = 5
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
}

</style>