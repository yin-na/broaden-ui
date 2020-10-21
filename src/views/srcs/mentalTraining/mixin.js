
import navBar from '@/components/navBar'
import { resOk } from '@/settings'
import { queryMentalList } from '@/api/mentalTraining'

export default {
    data() {
        return {
            carouselList: [], // 数据列表
            title:'心智训练',
            navList:[{name:'趣味测试',path:'/tasteTest', active:true},{name:'心智训练', active:true}],
        }
    },
    
    components:{
        navBar,
    },

    methods: {
        goToUrl(item) {
            if (item.gameId == this.$route.params.id) {
                return
            }
            this.$router.push('/mentalTraining/detial/' + item.gameId)
        },
        
        // 获取列表数据
        getList() {
            queryMentalList(this.param).then((res) => {
                if (res.code == resOk) {
                    let data = res.data
                    this.carouselList = data.records
                    this.total = data.total
                }
            })
        },
    }
}