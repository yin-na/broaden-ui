/*
 * @Author: 李素素 
 * @Date: 2019-08-22 18:32:45 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-16 15:22:27
 */
import { resOk, size } from '@/settings'
import { buildingListTable } from '@/api/psychological'
import basePage from '@/components/basePage'

export default {
    props: {
        id: {
            type: String,
            default: '',
        }
    },

    data() {
        return {
            carouselList: [], // 列表数据
            total: 0,
            param: {
                firstResourceId: '',  // 1级分类id
                secondResourceId: '', // 2级分类id
                current: 1,
                size: size
            },
        }
    },

    components: {basePage},

    activated() {
        if (this.id == 2) {
            this.param.size = size - 1
        }
        this.inited()
    },

    methods: {
        goToUrl(type, item) {
            this.$router.push('/psychological/detial/' + type + '/' + item.buildingId)
        },
        
        inited() {
            let { ...param } = this.param
            param.fileType = this.id
            if (this.id == 3) {
                this.isLoad = true
            }
            buildingListTable(param).then((res) => {
                if (res.code == resOk) {
                    let data = res.data;
                    // 心理图片
                    if (this.id == 3) {
                        this.isLoad = false
                        this.carouselList = this.carouselList.concat(data.records);
                        if (data.records.length < size) {
                            this.loadMore = false
                            return
                        }
                        this.param.current++
                    } else {
                        this.carouselList = []
                        this.carouselList = data.records;
                        this.total = data.total;
                    }
                }
            })
        },

        // 分页
        changeCurrent(current) {
            this.param.current = current
            this.inited()
        }
    },
}