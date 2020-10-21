<template>
    <div>
        <van-overlay :show="showOverlay"/>
        <div v-if="showOverlay" class="van-toast van-toast--middle" style="z-index: 2021;">
            <van-loading size="24px" type="spinner"></van-loading>
            <div class="van-toast__text">提交中...</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showOverlay: false
        }
    }
}
</script>