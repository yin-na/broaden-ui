
<template>
    <!-- 测试详情页 -->
    <div class="test-answer">
        <div class="inner pdt16">
            <p class="performance clearfix"><span>您正在做测试，已完成 {{ percentage }} %</span></p>
            <div class="test-progress">
                <van-progress :show-pivot='false' color='#eb6100' :percentage="percentage" />
                <span class="test-num"> {{sum + 1}} <span style="color:#999999"> / {{ scaleList.length }}</span></span> 
            </div>
        </div>
        <!-- 描述 -->
        <div v-if="needTitle">
            <slot name="needTitle"></slot>
        </div>
        <div class="inner box-height mgt10">
            <div v-for="(items, index) in scaleListData" :key="index" v-show="index + 1 == curId">
                <p class="aswer-title">{{items.questionNumber + '&nbsp;.&nbsp;&nbsp;' + items.content}}</p>
                <div class="selection" >
                    <van-radio-group v-model="resultStr[index]" @change="gotoResult">
                        <van-radio v-for="(item, index) in items.ownOption" :key='index'
                                :name="index + 1">
                            <img slot="icon"
                                slot-scope="props"
                                :src="props.checked ? require('@/assets/icon00/choose-n.png') : require('@/assets/icon00/choose-o.png')"
                            >
                            <span>{{item}}</span>
                        </van-radio>
                    </van-radio-group>
                </div>
                <img class="test-img" :src="items.base64Content" alt="">
            </div>
        </div>
        <!-- 最后一道题提示 -->
        <dialog-tip :show='showTip' 
            :content='"您已测试完成，是否确定提交？"'
            @cancle='cancle'
            @handleConfirm='handleConfirm'>
        </dialog-tip>
    </div>
</template> 
<script>
// import mixin from './mixin'
// import { resOk } from '@/setting'
// import { queryScaleSubject } from '@/api/tasteTest'

import dialogTip from '@/components/dialogTip'
let timers;

export default {
    name:'TestDetial',
    components:{dialogTip}, 
    // mixins:[mixin],
    props: {
        needTitle: {  
            type: Boolean,
            default: false
        }, 
        scaleList: {
            type: Array,
            default: () => []
        },
        showDia: {  
            type: Boolean,
            default: false
        },
        content: {
            type: Object,
            default: () => {}
        }
    },
    computed:{
        // 题目重新赋值
        scaleListData() {
            let [ ...param ] = this.scaleList
            param.forEach((item) => {
                let option = item.ownOption
                let ownValue = item.ownValue
                item.ownOption = typeof(option) == 'string' ? option.split('#') : option
                item.ownValue = typeof(ownValue) == 'string' ? ownValue.split('#') : ownValue
                
                if(item.base64Content){
                    let commonContent ='data:image/png;base64,' + item.base64Content
                    item.base64Content = commonContent
                }
            })

            return param
        }
    },
    data(){
        return {
            showTip: false,
            show:true,
            id:'',
            isResult:false,
            resultMsg:{},
            scoreStr: [],
            resultStr:[],   
            curId: 1,
            sum: 0,
            percentage: 0 ,
            listQuery:{
                resultStr:'',
                scoreStr: '',
                scaleId:'',
                testTime: ''
            },
            scaleType: '', // 0 普通量表  1 题目跳转量表 2 题目带图量表 3  无题目量表
        }
    },
    created(){
        this.id = this.$route.params.id
        this.scaleType =  this.content.scaleType
        this.init()

        // 获取题目数据
        // this.getAnswer()
    },
    methods: {
        init() {
            let that = this;
            that.listQuery.testTime = 0
            
            timers = setInterval(function() {
                that.listQuery.testTime++
            }, 1000)
        },
        againTest(){
            this.isResult = false
            this.resultStr = []
            this.scoreStr = []
            this.curId = 1
            this.percentage = 0
            this.sum = 0
            this.$emit('setResult', this.isResult)
        },
        // 选择题目 index选择的第几个答案
        gotoResult(index){
            let that = this;
            setTimeout(function() {
                // 不算分之间跳题
                let indexed = index - 1
                let ownValue = that.scaleListData[that.curId - 1].ownValue
                let value = ownValue[indexed];
                /**
                 * @param scaleType
                 *  0 普通量表 一题一题的跳转  根据isOption(true: 算分)
                 *  1 题目跳转量表  根据ownValue跳题  最后传A/B/C/D等
                 *  2 题目带图量表 与0类型相同
                 *  3  无题目量表 只展示一句话  结果相同
                 */
                if (that.scaleType == '1') {
                    if(isNaN(value)){
                        that.isResult = true
                        that.resultMsg = {}
                        that.listQuery.resultStr = index
                        that.listQuery.scoreStr = value
                    } else {
                        that.curId = parseInt(value)
                    }
                } else {
                    that.scoreStr.push(value)
                    if (that.curId == that.scaleListData.length) {
                        that.isResult = true
                        that.listQuery.resultStr = that.resultStr.join('#')
                        that.listQuery.scoreStr = that.scoreStr.join('#')
                    } else {
                        that.curId++
                    }
                }
                
                // 用于告诉父组件是不是已经测完
                that.$emit('setResult', that.isResult)
                // 计算百分比
                that.sum = that.curId - 1
                that.percentage = parseInt( that.sum / that.scaleListData.length * 100)
                // 提交
                if (that.isResult) {
                    that.submit()
                }
            }, 100)
        },
        // 提交题目，得出结果
        submit() {
            this.listQuery.scaleId = this.id
            // 计算百分比
            this.percentage = parseInt((this.sum + 1) / this.scaleListData.length * 100)
            if (this.showDia) {
                // 最后一道题提示
                this.showTip = true
            } else {
                this.handleConfirm()
            }
            this.resultMsg = {}
            // console.log('222', this.listQuery)
            // subjectToSubmit(this.listQuery).then((res)=>{
            //     if(res.code == resOk){
            //         this.resultMsg = res.data
            //     }
            // })
        },

        // 最后一题提示弹窗
        cancle(val){
            this.showTip = val
        },
        handleConfirm(){
            clearInterval(timers)
            this.showTip = false
            this.$emit('submit',this.listQuery)
        }
    },
    
    watch: {
        $route: {
            handler() {
                clearInterval(timers)
                this.showTip = false
            },
            // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
            immediate: true
        }
    }
}
</script>
<style lang='less'>
.test-answer{
    height: 100%;
    .pdt16{
        padding-top: 16px;
    }
    .box-height{
        height: calc(100% - 75px);
        .van-radio {
            img {
                height: 100%;
            }
        }
    }
    .test-progress{
        position: relative;
        padding-right: 60px;
        height: 28px;
        vertical-align: middle;
        .van-progress{
            margin-top: 10px;
        }
        .test-num{
            position: absolute;
            right: 0;
            top: -8px;
        }
    }
    .aswer-title{
        line-height: 24px;
        padding: 13px 0;
        font-size: 16px;
    }
    .selection{
        .van-radio{
            height: 49px;
            border: 1px solid #ebebeb;
            border-radius: 3px;
            margin-bottom: 10px;
            padding-left: 15px;
        }
        .van-radio__label{
            margin-left: 15px;
        }
    }
    .test-img{
        max-width: 100%
    }
}
</style>