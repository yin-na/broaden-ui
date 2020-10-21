// 带线的题目
<template>
    <div class="base-title-line fs18 text-center color-base">
        <span class="span">
            <div class="pos" style="background-color:#eb6100"></div>
            <div class="text" style="color:#eb6100">{{ text }}</div>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        }
    }
}
</script>