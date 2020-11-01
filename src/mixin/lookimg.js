
import lookImg from '@/components/lookImg'

export default {
    data() {
        return {
            isVideo: false,
            centerDialogVisible: false,
            imgSrc: '',
        }
    },
    
    components: {
        lookImg
    },
    
    methods: {
        showImg(img, flag) {
            if (flag == '1') {
                this.isVideo = true
            } else {
                this.isVideo = false
            }
            this.imgSrc = img
            this.$refs.lookImg.centerDialogVisible = true
        }
    }
}