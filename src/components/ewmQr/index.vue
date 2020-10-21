<template>
    <vue-qr class="QRCode" :logoSrc="QRCode.url" :margin="0" :text="QRCode.text + text" :logoScale="50" :size="150"
        colorDark="#000" colorLight="#fff"></vue-qr>
</template>

<script>
import { codeText } from '@/settings'
import VueQr from 'vue-qr'
import Config from '@/config'

export default {
    props: {
        text: {
            type: String,
            default: ''
        },
    },

    data() {
        return {
            QRCode: {
                text: Config.scanUrl,  //生成的二维码为URL地址
                // url: require('@/assets/logo/logo-small.png'), //生成的二维码的logo
            }
        }
    },
    components: {
      VueQr
    },
}
</script>

<style lang="scss" scoped>
    .QRCode {
        margin: 0 auto;
        background: url('../../assets/login/qcode-bg.png') no-repeat center center;
        background-size: contain;
        padding: 16px;
        font-size: 0;
        img {
            display: inline-block!important;
        }
    }
</style>