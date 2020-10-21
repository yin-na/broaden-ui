import { resOk } from '@/settings'
import { getForumList, queryForumList } from '@/api/classPsy'
import basePage from '@/components/basePage'

export default {
    data(){
        return{
            cardList:[],
            teacherList:[],
            total:0,
            params:{
                forumTypeId:'',
                firstKind: '',
                current: 1,
                size: 10
            },
            telList:[],
            telTitList:[],
            teaList:[]
        }
    },
    components:{
        basePage
    },
    methods:{
        getList(){
            let that = this
            return new Promise(function(resolve) {
                getForumList().then((res)=>{
                    if(res.code == resOk){
                        that.cardList = []
                        that.teacherList = []
                        let [...list] = res.data
                        list.forEach((item)=>{
                            if(item.firstKind == '0'){
                                that.cardList.push(item)
                            }else if(item.firstKind == '1'){
                                that.teacherList.push(item)
                            }
                        })
                        that.cardList.forEach((item)=>{
                            let obj = {
                                name: item.forumTypeName,
                                id: item.forumTypeId,
                                active:false
                            }
                            that.telTitList.push(obj)
                        })
                        that.teacherList.forEach((item)=>{
                            let obj = {
                                name: item.forumTypeName,
                                id: item.forumTypeId,
                                active:false
                            }
                            that.teaList.push(obj)
                        })
                        resolve(list)
                    }
                    
                })
            }).catch(()=>{})
        },
        getTelList(){
            let that = this
            let { ...params } = that.params
            return new Promise(function(resolve) {
                queryForumList(params).then((res)=>{
                    if(res.code == resOk){
                        that.telList = res.data.records
                        that.total = res.data.total
                        resolve(res.data.records)
                    }
                })
            })
        },
        changeCurrent(val) {
            this.params.current = val
            this.getTelList()
        }
    }
}