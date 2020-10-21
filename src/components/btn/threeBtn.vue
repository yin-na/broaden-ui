/*
 * @Author: 李素素 
 * @Date: 2019-08-05 13:45:56 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-24 10:29:54
 */
// 统一搜索重置刷新按钮
<template>
    <div style="display: inline-block">
        <search-btn v-if="search" @click="handleFilter" :size="size"></search-btn>
        <reset-btn v-if="reset" @click="getData" :text="resetText" :size="size"></reset-btn>
        <!-- <reset-btn v-if="reset" @click="handleReset"></reset-btn>
        <refresh-btn v-if="refresh" @click="getData"></refresh-btn>  -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        search: {
            type: Boolean,
            default: true
        },
        reset: {
            type: Boolean,
            default: true
        },
        refresh: {
            type: Boolean,
            default: true
        },
        resetText: {
            type: String,
            default: '重置'
        },
        isSearch: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleFilter() {
            this.$emit('search')
        },
        handleReset() {
            this.$emit('reset')
        },
        getData() {
            this.handleReset();
            if (this.isSearch) {
                this.handleFilter()
            }
        }
    }
}
</script>

<style>

</style>
