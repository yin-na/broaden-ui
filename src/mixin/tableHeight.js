/*
 * @Author: 孟如月 
 * @Date: 2019-07-25 15:47:39 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-12-17 13:42:28
 */
//表格高度随屏幕宽度改变
export default {
    data() {
        return {
            screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
            tableHeight: null, // 表格高度 
        }
    },
    mounted() {
		// 监听屏幕高度
		let that = this
		window.onresize = () => {
		return (() => {
			window.screenHeight = document.body.clientHeight;
			that.screenHeight = window.screenHeight;
			})();
		};
		this.initScreen()
	},
    
    methods: {
        initScreen(){
			this.tableHeight = this.screenHeight - 360 + "px";
		},
    },
    watch: {
		// 监听屏幕高度改变表格高度
		screenHeight(val) {
            // page高度
            let pageHeight = this.$refs.pageHeight.offsetHeight
			// 初始化表格高度
			this.tableHeight = val - (this.$refs.header.offsetHeight + 140 + pageHeight) + "px";
		},
    },
}