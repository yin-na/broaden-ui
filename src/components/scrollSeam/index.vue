<template>
    <vue-seamless-scroll :data="data" :class-option="classOption">
        <ul>
            <slot></slot>
        </ul>
    </vue-seamless-scroll>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        max: {
            type: Number,
            default: 15
        },
        singleHeight: {
            type: Number,
            default: 34
        },
    },
    
    computed: {
        classOption () {
            let autoPlay = this.data.length > this.max ? true : false
            return {
                hoverStop: true, //是否启用鼠标hover控制
                singleHeight: this.singleHeight,
                waitTime: 3000,
                step: 1,
                autoPlay: autoPlay
            }
        }
    },
}
</script>