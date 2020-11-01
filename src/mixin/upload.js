/*
 * @Author: 王世成 
 * @Date: 2020-8-1 9:11:33 
 * @Last Modified by: 王世成
 * @Last Modified time: 2020-8-1 9:11:33
 */
// 统一上传接口
import vueEditor from '@/mixin/vueEditor'
import { resOk } from '@/settings'
import Config from '@/config'

export default {
    mixins: [vueEditor],

    // computed: {
    //     successMessage() { // 提示
    //         if (this.dialog.title.indexOf('添加') > -1) {
    //             return '添加成功'
    //         } else {
    //             return '修改成功！'
    //         }
    //     }
    // },

    mounted() {
        this.actionApi = Config.baseUrl.prod + "/resource/uploadFile";
    
    },

    methods: {
        // 弹窗重置
        // resSetText() {
        //     this.clearDialogData()
        // },
        //上传文件之前的钩子,返回false则停止上传
            onBeforeUpload(file) {
                const isJPG = file.type === "image/jpeg";
                const isPNG = file.type === "image/png";
                const isAudio = file.type === "audio/mp3";
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                this.$message.error("上传文件大小不能超过 2MB!");
                return false;
                }
                if (!isPNG && !isJPG) {
                this.$message.error("请上传格式是PNG或JPG的文件!");
                return false;
                }
            },
            onBeforeUploadAudio(file) {
                // const isAudio = file.type === "audio/mp3";
                const isLt2M = file.size / 1024 / 1024 < 100;
                if (!isLt2M) {
                this.$message.error("上传文件大小不能超过 100MB!");
                return false;
                }
                // if (!isAudio) {
                //   this.$message.error("请上传格式是mp3的文件!");
                //   return false;
                // }
            },
            // 文件上传文件
            onExceed() {
                this.$message.error("上传文件不能超过 1个");
            },
            // 文件列表移除文件时的钩子
            handleRemove(file) {
                this.fileList = file;
                // 移除后清空
                this.fileListTemplate = "";
                this.fileList = "";
                // this.form.image = "";
            },




        // 上传图片
        beforeAvatarUploadPic(file) {
            const isLt10M = file.size / 1024 / 1024  <= 2;
            if (['image/jpeg', 'image/jpg', 'image/png'].indexOf(file.type) == -1) {
                this.$message.error('请上传正确的图片格式');
                return false;
            }
            if (!isLt10M) {
                this.$message.error('上传图片大小不能超过2MB哦!');
                return false;
            }
        },
        
        // 图片上传成功
        handleAvatarSuccessPic(res) {
            if (res.errno == resOk) {
                let data = res.data;
                this.dialog.data.coverImage = data[0];
            } else {
                this.$message.error('上传失败')
            }
        },
        // 上传视频限制
        beforeUploadVideo (file) {
            const isLt20M = file.size / 1024 / 1024 < 500;
            if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                this.$message.error('请上传正确的视频格式');
                return false;
            }
            if (!isLt20M) {
                this.$message.error('上传视频大小不能超过500MB哦!');
                return false;
            }
        },

        // 上传视频成功
        handleSuccessVideo(res){
            this.videoLoading = false
            if (res.errno == resOk) {
                let data = res.data;
                this.dialog.data.movie = data[0];
            } else {
                this.$message.error('上传失败')
            }
        },
        /**
         *上传swf文件限制--只能上传swf格式的文件
        */
        // beforeAvatarUploadMic (file) {
        //     var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        //     const isLt30M = file.size / 1024 / 1024 <= 30;
        //     const extension = testmsg === 'swf'
        //     if(!extension){
        //         this.$message({
        //             message:"请swf格式的游戏！",
        //             type:'error'
        //         })
        //         return false;
        //     }
        //     if (!isLt30M) {
        //         this.$message.error('上传游戏大小不能超过 30MB!');
        //         return false;
        //     }
        // },
        // 编辑器上传游戏成功
        // handleAvatarSuccessMic(res) {
        //     if (res.errno == resOk) {
        //         let data = res.data;
        //         this.$set(this.dialog.data, 'gameUrl', data[0])
        //     } else {
        //         this.$message.error('上传失败')
        //     }
        // },
    }
}