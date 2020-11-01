export default {
    data() {
        return {
            innerVisible: false,
            width: '0',
            top:'0',
        }
    },
    mounted() { 
        window.addEventListener('resize', this.winshowLookDig)
    },
    methods: {
        // 显示弹窗
        showLookDig() {
            this.winshowLookDig();
            this.innerVisible = true;
        },
        // 隐藏弹窗
        hideLookDig() {
            this.winshowLookDig();
            this.innerVisible = false;
        },

        winshowLookDig () {
            let that = this;
            that.$nextTick(() => {
                setTimeout(function() {
                    let param = that.$refs.appContainer
                    if (param) {
                        let offsetTop = param.offsetTop ? param.offsetTop : 104;
                        that.width = param.clientWidth + 'px';
                        that.top = offsetTop + 'px';
                    }
                }, 10)
            })
        },
    },
    watch: {
        $route() {
            this.innerVisible = false;
        }
    }
}