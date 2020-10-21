import { resOk } from '@/settings'
import {  queryPesScaleList} from '@/api/tasteTest'

export default {
    data(){
        return{
            conditions:{
                current:1,
                size:9,
                labelId:''
            },
            carouselList:'',
            total: 0,
            hotList:[],
        }
    },
    methods:{
        getList(){
            queryPesScaleList(this.conditions).then((res)=>{
                if(res.code == resOk){
                    this.carouselList = res.data.records
                    this.total = res.data.total
                }
            })
        },
        gotoDetial(val){
            if (val.id == this.$route.params.id) {
                return
            }
            this.$router.push('/tasteTest/' + val.id)
        }
    }
}