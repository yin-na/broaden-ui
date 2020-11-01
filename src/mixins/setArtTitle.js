import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {            
            title: [{name: '全部', id: '', children: []}],
        }
    },

    computed: {
        ...mapGetters([
            'artTitle'
        ]),
    },
    
    methods: {
        ...mapActions('artList', [
            'setArtTitle'
        ]),
        
        async init() {
            if (this.artTitle.length < 1) {
                await this.setArtTitle()
            }
            // 菜单列表
            let data = this.artTitle
            data.forEach(item => {
                let json = {
                    name: '全部',
                    id: ''
                }
                if (item.children[0].id == "") {
                    return 
                }else{
                    item.children.splice(0, 0, json)
                }
            });
            this.title = this.title.concat(data)
        },
    }
}