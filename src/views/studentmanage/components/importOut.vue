<template>
    <el-button icon="el-icon-upload2"  @click="handleExport">导出</el-button>
</template>

<script>
import { download } from '@/api/student/student';
export default {
    data() {
        return {
            loading: false
        }
    },
    props:{
        type: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: 'id'
        },
        data: {
            type: Array,
            default: () => []
        },
        text: {
            type: String,
            default: '机构'
        },
    },
    methods:{
        handleExport(){
            let that = this;
            //导出列表
            this.$confirm(`是否确定导出所选${that.text}信息？(不选默认导出全部)`, '操作提示', {
                closeOnClickModal: false,
                customClass: 'my-base-confirm',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm' &&  !that.loading ) {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '加载中';
                        let [ ...id ] = that.data.map(item => item[this.id]);
                        let param = {
                            type:that.type,
                            ids: id.join(',')
                        }
                        downloadData(param).then((res)=>{
                            if(res.byteLength != 0){
                                const blob = new Blob([res],{type: 'application/vnd.ms-excel'});
                                let  fileName=''
                                if(that.type == 0){
                                    fileName = '直属学校信息.xls';
                                }else if(that.type == 1){
                                    fileName = '学校信息.xls';
                                }else if(that.type == 2){
                                    fileName = '教职工信息.xls';
                                }else if(that.type == 3){
                                    fileName = '学生信息.xls';
                                }else{
                                    fileName = '机构信息.xls';
                                }
                                const elink = document.createElement('a');
                                elink.download = fileName;
                                elink.style.display = 'none';
                                elink.href = URL.createObjectURL(blob);
                                document.body.appendChild(elink);
                                elink.click();
                                URL.revokeObjectURL(elink.href); // 释放URL 对象
                                document.body.removeChild(elink); 
                            }else{
                                let msg = res.message || '导出失败'
                                that.$message.error(msg);
                            }
                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = '确定';
                            done();
                        }).catch(()=>{
                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = '确定';
                            done();
                        })
                    } else {
                        done();
                    }
                }
            })
        },
    }
    
}
</script>

<style>

</style>
