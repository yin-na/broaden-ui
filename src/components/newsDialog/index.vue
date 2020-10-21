<template>
<div class='newsWarp' v-if="dialogVisible">
    <div v-if="taskList.length!='0'" class="newses">
        <div class="titles">
            <span class='cursorer' @click="status=!status">全部消息</span>
            <i class='el-icon-arrow-right' v-if="status"></i>
            <i class='el-icon-arrow-down' v-else></i>
        </div>
        <div class='content' v-if="!status">
            <div class="colorD fs14 dataItem cursorer" v-for="(item,index) in taskList" :key="index" @click="lookDetail(item.readReceipt,item.id)" style="line-height:19px">
                <div class='disflex spacebetween mb15' >
                    <span>
                        {{item.title}}
                        <span v-if="item.readReceipt=='0'" style="display: inline-block;width: 5px;height: 5px;background-color: #ff0000;margin-left:4px;margin-bottom:8px;border-radius: 50%;"></span>
                    </span>
                    <span>{{item.crtTime}}</span>
                </div>
                <div>{{item.content}}</div>
            </div>
        </div>
        <div class="footer" v-if="!status">
            <div class='disflex spacebetween'>
                <el-checkbox v-model="checked" @change="getread">标记全部为已读</el-checkbox>
                <span class="cursorer" style="color:#95FFFF" @click="historyNews">历史通知</span>
            </div>
        </div>
    </div>
    <div class='noNews' v-else>
        <div style="text-align:center;font-size:26px">
            <i class='el-icon-message-solid mb10' style="color:#fff"></i>
            <div class='fs14' style='color:#ccc'>近6个月未收到消息</div>
        </div>
        <div style="text-align:right;margin-right:20px">
           <span class="cursorer fs14" style="color:#95FFFF" @click="historyNews">历史通知</span> 
        </div>
    </div>
</div>
</template>
<script>
import { getNoticePage,readNotice,allReadNotice } from '@/api/information'
export default {
 props: {
    dialogVisible: {
      type: Boolean,
      required: false
    },
  },
    data(){
        return{
            status:false,
            checked:false,
            query:{
                current:1,
                type:'',
                size:3
            },
            taskList:[],
        }
    },
    mounted(){
        this.getNoticePage()
    },
    methods:{
        getread(){
            if(this.checked){
                allReadNotice().then((res)=>{
                   if(res.data){
                       this.getNoticePage()
                   }
                })
            }
        },
        lookDetail(readReceipt,id){
            if(readReceipt=='0'){
                readNotice([id]).then((res)=>{
                    // console.log(res.data,778)
                })
            }
            this.$emit('showdia',id)
        },
        historyNews(){
            this.$emit('history')
        },
        getNoticePage(){
            getNoticePage(this.query).then((res)=>{
                if(res.code=='0'){
                    this.taskList=res.data.records
                }
                this.taskList.forEach(element => {
                    if(element.readReceipt=='0'){
                       this.$emit('showinfo') 
                    }
                    element.crtTime=element.crtTime.substring(0,(element.crtTime.indexOf(" ")))
                });
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
.newsWarp{
    position: absolute;
    right: 4px;
    top: 48px;
    z-index: 99;
    width: 338px;
    .newses{
      background:url("~@/assets/user/borderMin.png") no-repeat; 
      background-size: 99% 99%;
      background-color: rgba(0,10,40,0); 
    }
    .noNews{
      background:url("~@/assets/user/minBorder.png") no-repeat; 
      background-size: 99% 99%;
      background-color: rgba(0,10,40,0);
      line-height: 20px;
      padding:20px 0;
    }
    .titles{
        width: 290px;
        height: 56px;
        margin: 0 auto;
        line-height: 78px;
        text-align: right;
        color:#94FFFF
    }
    .content{
       width: 290px;
       margin: 0 auto;
        border-top: 1px solid #57C2D7 ;
       .dataItem{
           margin: 18px 0  30px;
       }  
    }
    .footer{
       width: 290px;
       margin: 0 auto;
       border-top: 1px solid #57C2D7;
       ::v-deep .el-checkbox__label{
           color: #95FFFF!important;
       }
       ::v-deep .el-checkbox__inner{
           background-color: #57C2D7!important;
       }
    }

    .centerDialog{
        width: 1136px;
        height: 609px;
        background-color: #04104A;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -568px;
        margin-top: 304px;
    }
}
</style>