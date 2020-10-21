<template>
    <Page :total="total"
        :page-size="size"
        :current="current"
        @on-change="changeCurrent" />
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
import { size } from '@/settings'

export default {
    name: 'Pagination',
    props: {
        total: {//总页码
            required: true,
            type: Number
        },
        current: {//初始化显示第几页
            type: Number,
            default: 1
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        size: { //初始化每页显示几天
            type: Number,
            default: size
        },
    },

    data() {
        return {}
    },

    methods: {
        changeCurrent(val) {
            if (this.autoScroll) {
                scrollTo(0, 300)
            }
            this.$emit('change', val)
        }
    }
    
}
</script>