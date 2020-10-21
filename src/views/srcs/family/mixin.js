import { resOk } from '@/settings'
import { queryFamilyGuideList } from '@/api/family'
import navBar from '@/components/navBar'
import headerBg from '@/components/headerBg'

export default {
    data() {
        return {
            title:'家庭指南',
            navList:[{name:'心理文章',path:'/psychological/0', id:'1',active:true},{name:'家庭指南',id:'1',active:true}],
            cardList:[]
        }
    },
    components:{
        navBar,
        headerBg
    },
    activated() {
        this.init()
    },
    methods: {
        gotoDetial(id){
            if (id == this.$route.params.id) {
                return
            }
            this.$router.push('/family/' + id)
        },
        // 获取数据
        init() {
            queryFamilyGuideList(this.param).then((res) => {
                if (res.code == resOk) {
                    let data = res.data
                    this.cardList = data.records
                    this.total = data.total
                }
            })
        },
    }
}