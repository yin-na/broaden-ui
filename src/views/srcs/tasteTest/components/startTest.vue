/*
 * @Author: 孟如月 
 * @Date: 2019-08-21 08:42:39 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-25 11:44:52
 */
<template>
    <!-- 测试详情页 -->
    <div class="test-detial">
        <div v-if="!isResult" class="test-content">
            <h3>{{content.name}}</h3>
            <p class="performance clearfix"><span class="fl">您正在做测试，已完成 {{ percentage }} %</span> <span class="fr"> {{sum + 1}} / {{scaleList.length}} 题 </span></p>
            <Progress :percent="percentage" :stroke-width="5" hide-info />
            <div class="answer" v-for="(items, index) in scaleList" :key="index" v-show="index + 1 == curId">
                <p class="title">{{items.questionNumber + '&nbsp;.&nbsp;&nbsp;' + items.content}}</p>
                <div class="selection" >
                    <RadioGroup size="large" vertical @on-change="gotoResult" v-model="resultStr[index]">
                        <Radio v-for="(item, index) in items.ownOption" :key='index' :label="index + 1">
                            <Icon type="social-apple"></Icon>
                            <span>{{item}}</span>
                            <!-- <Input hidden v-model="resultStr[index]" type="textarea" :value="item"/> -->
                        </Radio>
                    </RadioGroup>
                </div>
                <img :src="items.base64Content" alt="">
            </div>
        </div>
        <div v-if="isResult">
            <div class="con-header">
                <h3>{{content.name}}</h3>
                <p class="tabs">
                    <span> {{content.testNum}} 人测试过</span>
                </p>
            </div>
            <div class="result">
                <p class="result-title color-base">『你的测试结果』</p>
                <h3>{{resultMsg.result}}</h3>
                <p class="result-info">
                    {{resultMsg.analyse}}
                </p>
                <div class="again-btn">
                    <Button long class="bg-dgray" @click="againTest">再测一次</Button>
                </div>
            </div>
        </div>
    </div>
</template> 
<script>
import mixin from './mixin'
import { resOk } from '@/settings'
import { queryScaleSubject,subjectToSubmit } from '@/api/tasteTest'

export default {
    name:'TestDetial',
    components:{}, 
    mixins:[mixin],
    props: {
        content: {
            type: Object,
            default: () => {}
        }
    },
    data(){
        return {
            id:'',
            vertical:'',
            isResult:false,
            resultMsg:{},
            scaleList:[],
            problem:{},
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
            carouselList:[],
            scaleType: '', // 0 普通量表  1 题目跳转量表 2 题目带图量表 3  无题目量表
        }
    },
    created(){
        this.id = this.$route.params.id
        this.scaleType = this.content.scaleType
        // 获取题目数据
        this.getAnswer()
    },
    methods:{
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
            // 不算分之间跳题
            let indexed = index - 1
            let ownValue = this.scaleList[this.curId - 1].ownValue
            let value = ownValue[indexed];
            /**
             * @param scaleType
             *  0 普通量表 一题一题的跳转  根据isOption(true: 算分)
             *  1 题目跳转量表  根据ownValue跳题  最后传A/B/C/D等
             *  2 题目带图量表 与0类型相同
             *  3  无题目量表 只展示一句话  结果相同
             */
            if (this.scaleType == '1') {
                if(isNaN(value)){
                    this.isResult = true
                    this.resultMsg = {}
                    this.listQuery.resultStr = index
                    this.listQuery.scoreStr = value
                } else {
                    this.curId = parseInt(value)
                }
            } else {
                this.scoreStr.push(value)
                if (this.curId == this.scaleList.length) {
                    this.isResult = true
                    this.listQuery.resultStr = this.resultStr.join('#')
                    this.listQuery.scoreStr = this.scoreStr.join('#')
                } else {
                    this.curId++
                }
            }
            
            // 用于告诉父组件是不是已经测完
            this.$emit('setResult', this.isResult)
            // 计算百分比
            this.sum = this.curId - 1
            this.percentage = parseInt( this.sum / this.scaleList.length * 100)
            // 提交
            if (this.isResult) {
                this.submit()
            }
        },
        // 获取答案列表
        getAnswer(){
            // debugger 
            queryScaleSubject({scaleId:this.id}).then((res)=>{
                if(res.code == resOk){
                    this.scaleList = res.data ? res.data : []
                    // this.problem = this.testMsg[0]
                    this.scaleList.forEach((item) => {
                        item.ownOption = item.ownOption.split('#')
                        item.ownValue = item.ownValue.split('#')
                        
                        if(item.base64Content){
                            let commonContent ='data:image/png;base64,' + item.base64Content
                            item.base64Content = commonContent
                        }
                    })
                }
            })
        },

        // getVal(value, index) {
        //     console.log(value, index)
        //     this.resultStr[index] = this.scaleList[index].ownOption.map(item => item).indexOf(value) + 1
        //     let that = this
        //     if (this.curId < this.scaleList.length - 1 ) {
        //         setTimeout(function () {
        //             that.curId++;
        //             that.items[that.curId].islook = true
        //             that.second = 1
        //             clearInterval(that.timer)
        //             // that.setTime()
        //         }, 300)
        //     } 
        //     console.log(this.resultStr)
        //     let haveVal = 0;
        //     this.scoreStr.forEach((item)=>{
        //         if(item.length != 0){
        //             haveVal++
        //         }
        //     })
        //     this.percentage = parseInt(haveVal / this.scaleList.length * 100)

        // },
        // 提交题目，得出结果
        submit() {
            this.resultMsg = {}
            this.listQuery.scaleId = this.id
            subjectToSubmit(this.listQuery).then((res)=>{
                if(res.code == resOk){
                    this.resultMsg = res.data
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
.test-detial{
    padding:36px;
    box-sizing: border-box;
}
.con-header{
    border-bottom:1px solid #eaeaea;
    h3{
        color: #343d4a;
        font-size: 20px;
        margin-bottom: 16px;
    }
    .tabs{
        margin-bottom: 13px;
        span{
            display: inline-block;
            margin-right: 30px;
            color: #80878e;
            i{
                margin-right:4px;
            }
        }
    }
}
.test-content{
    .performance{
        padding: 16px 0 6px;
        color: #80878e;
    }
    .answer{
        margin: 42px 0 30px;
        .title{
            font-size: 18px
        }
        .selection{
            background: #f8f8f8;
            border-radius: 3px;
            margin-top: 30px;
            .option{
                line-height: 50px;
                border-bottom: 1px solid #eaeaea;
            }
            .ivu-radio-group{
                width: 100%
            }
            .ivu-radio-group-vertical{
                 .ivu-radio-wrapper{
                     height: 38px;
                     font-size: 18px;
                    line-height: 38px;
                    padding-left: 16px;
                    margin-right: 0;
                 }
                label{
                    border-bottom: 1px solid #eaeaea;
                }
                label:last-child{
                    border-bottom: none;
                }
            }
        }
        img{
            max-width: 100%;
            display: block;
            margin: 0 auto;
        }
    }
}
.result{
    padding: 25px 36px;
    .result-title{
        text-align: center;
        font-size: 18px;
    }
    h3{
        line-height: 70px;
        font-size: 22px;
        text-align: center;
        color: #343d4a
    }
    .result-info{
        line-height: 28px;
        text-indent: 2em;
        font-size: 16px;
    }
    .again-btn{
        height: 42px;
        width: 416px;
        margin: 50px auto 0;
    }
}
.result-bottom{
    padding: 30px
}

</style>
<style >
.result-bottom .base-title-line .span .pos{
    background: #343d4a
}
.result-bottom .base-title-line .span .text{
    color: #343d4a
}
</style>