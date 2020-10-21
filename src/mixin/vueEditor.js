
import { resOk } from '@/settings'
import vueEditor from 'vue-wangeditor'
import Config from '@/config/'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            actionApiBig: Config.baseUrl.prod + '/resource/uploadFile/',
            headers: {},
            actionApi: Config.baseUrl.prod+ '/resource/uploadFile/',
            config: Config,
            menus: [
                'source',	// 源码模式
                '|',
                'bold',	// 粗体
                'underline',	// 下划线
                'italic',	// 斜体
                'strikethrough',	// 中线
                '|',
                'eraser',	// 清空格式
                'forecolor',	// 文字颜色
                'bgcolor',	// 背景颜色
                '|',
                'quote',	// 引用
                'fontfamily',	// 字体
                'fontsize',	// 字号
                'head',	// 标题
                '|',
                'unorderlist',	// 无序列表
                'orderlist',	// 有序列表
                'alignleft',	// 左对齐
                'aligncenter',	// 居中
                'alignright',	// 右对齐
                '|',
                'link',	// 链接
                'unlink',	// 取消链接
                'table',	// 表格
                'emotion',	// 表情
                '|',
                'img',	// 图片
                // 'video',	// 视频
                // 'location',	// 位置
                'insertcode',	// 插入代码
                '|',
                'undo',	// 撤销
                'redo',	// 重做
                // 'fullscreen'	// 全屏
            ],
        }
    },

    computed: {
        ...mapGetters([
            'token'
        ])
    },


    created() {
        // 上传图片Api
        let path = this.$route.path

        if (path.indexOf('/publication/publish') >= 0 || path.indexOf('/publication/changePublish') >= 0) {
            this.actionApi = config.host + '/tasknotice/bulletin/fileUploadBulletin'
        }else if (path.indexOf('/policy/addPolicy') >=0 ) {
            this.actionApi = config.host + '/policy/PolicySysPolicy/fileUpload'
        }


        this.headers = {
            Authorization: 'Bearer ' + this.token,
            "Access-Control-Allow-Credentials": true
        }
    },

    components: {
        vueEditor
    },

    methods: {
        loadFun(originalName, resultText) {
            if (resultText) {
                let res = JSON.parse(resultText);
                if (res.code == resOk) {
                    let data = res.data, that = this;
                    that.$refs.myEditor.insertImg(data.url)
                    // data.forEach((item) => {
                    //     that.$refs.myEditor.insertImg(item)
                    // })
                }
            }
        },
        errorFun() {
            this.$message.error('上传失败')
        }
    }

}