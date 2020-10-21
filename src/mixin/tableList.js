/*
 * @Author: 李素素 
 * @Date: 2019-10-07 14:05:23 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-03-16 10:17:33
 */
// 删除编辑查询
import { resOk } from '@/settings'
import {editeinternestGuide} from '@/api/gateway/internet'
export default {
    data() {
        return {
            table: {
                data: [],
                query: {
                    size: 10,
                    current: 1,
                },
                successMessage:"添加成功",
                total: 0,
                loading: false
            },
            delId:[],
        }
    },

    computed: {
        // successMessage() { // 提示
        //     if (this.dialog.title.indexOf('添加') > -1) {
        //         return '添加成功！'
        //     } else {
        //         return '修改成功！'
        //     }
        // }
    },
    created(){
        this.getData();
        this.aaa()
    },
    async activated() {
        // 加载心理自助查询--查询条件资源分类查询
        await this.initData ? this.initData() : ''
        this.getData();
    },

    methods: {
        aaa() {
            // 加载心理自助查询--查询条件资源分类查询
            this.initData ? this.initData() : ''
            this.getData();
        },
        // 选择赋值
		handleSelectionChange(val) {
			//获取选中数据
			this.delId = val
        },
        // 点击搜索赋值
        searchData() {
            let { ...list } = this.query
			this.table.query = Object.assign(this.table.query, list)
            this.table.query.current = 1
            this.getData()
        },
        // 重置 
        resetSearch(formName) {
            this.$refs[formName].resetFields();
            this.table.query.current = 1;
            if (this.$refs.pickerTime) {
                this.$refs.pickerTime.resetForm()
            }
        }, 
        // 查询
        async getData() {
            // 计算判断是不是最后一页&&本页数据条数是不是小于1
            if (!this.notPage) {
                let currentNum = this.table.query.current
                let inTotalList = this.table.data
                let current = inTotalList.length < 1 &&  Math.ceil(this.table.total / this.table.query.size) ==  currentNum ? 
                        currentNum - 1 : currentNum
                this.table.query.current = current ? current : 1
            }
            if (this.firstKind) {
                this.table.query.firstKind=this.firstKind
            }
            this.table.loading = true  
            this.listApi(this.table.query).then((res) => {
                if (res.code === resOk) {
                    let data = res.data;
                    if (this.setGetData) {
                        data = this.setGetData(data)
                    }
                    // 不分页和分页
                    if (this.notPage) {
                        this.table.data = data ? data : []
                    } else {
                        this.table.data = data.records ? data.records : []
                        this.table.total = data.total ? data.total : 0
                    }
                }
                this.table.loading = false
            }).catch(() => {
                this.table.loading = false
            })
        },
        // 删除
        // text : 提示语
        deleteHandle(id, index, text) {
            text = text ? text : `此操作将永久删除, 是否继续?`
            this.$confirm(text, '操作提示', {
                closeOnClickModal: false,
                type: 'warning',
                customClass: 'my-base-confirm'
            }).then(async() => {
                var data1 = {"ids":id};
                this.delApi(data1).then(res => {
                    if (res.code === resOk) {
                        this.$message.success('删除成功！')
                        // 重新刷新表格
                        this.table.data.splice(index, 1)
                        this.getData()
                    } else {
                        let msg = res.message || '删除失败！'
                        this.$message.error(msg)
                    }
                })
            }).catch(()=>{});
        },

        deleteHandleNew(id, index, text) {
            text = text ? text : `此操作将永久删除, 是否继续?`
            this.$confirm(text, '操作提示', {
                closeOnClickModal: false,
                type: 'warning',
                customClass: 'my-base-confirm'
            }).then(async() => {
                var data1 = [];
                data1.push(id)
                this.delApi(data1).then(res => {
                    if (res.code === resOk) {
                        this.$message.success('删除成功！')
                        // 重新刷新表格
                        this.table.data.splice(index, 1)
                        this.getData()
                    } else {
                        let msg = res.message || '删除失败！'
                        this.$message.error(msg)
                    }
                })
            }).catch(()=>{});
        },

        
        // 批量删除
        // flag
        delAll(flag, id) {
            console.log(flag, id)
            let that = this, arr = [];
            id = id ? id : 'id';
            that.delId.forEach(item => {
                arr.push(item[id]);
            });

            if (arr.length < 1) {
                that.$confirm("请选择需要删除的信息", '操作提示',{
                    type: "warning",
                    closeOnClickModal: false,
                    customClass: 'my-base-confirm',
                    callback: () => { }
                });

                return
            }

            that.$confirm("此操作将永久删除, 是否继续?", '操作提示', {
                type: "warning",
                customClass: 'my-base-confirm',
                closeOnClickModal: false
            }).then(() => {
                let param = {};
                // 参数 
                // @param {key: value}
                if (flag == '1') {
                    param.id = arr.join(",")
                }
                // @param {key: value}
                if (flag == '2') {
                    param[id] = arr.join(",")
                }
                // @param [value]
                if( flag == '3'){
                    param = arr
                }   
                if (flag == '4') {
                    param.ids = arr.join(",")
                }
                console.log('param', param)
                that.delAllApi(param).then((res) => {
                    if (res.code == resOk) {
                        that.$message.success("删除成功")
                        that.delId.forEach((itemList) => {
                            var indexs = that.table.data.map(function (item) { return item.buildingId }).indexOf(itemList.buildingId);
                            that.table.data.splice(indexs, 1);
                        })

                        that.getData()
                    } else {
                        let msg = res.message ? res.message : '失败'
                        that.$message.error(msg)
                    }
                })
            }).catch(()=>{});
            
        },

        // 分页
        handleSizeChange(val) {
            this.table.query.size = val.limit;//每页显示总条数
            this.table.query.current = val.page

            this.getData()
        },

        // 展示图片
        showImg(url, flag) {
            let that = this.$refs.multipleTable
            if (flag == '1') {
                that.isVideo = true
            } else {
                that.isVideo = false
            }
            that.imgSrc = url
            that.$refs.lookImg.centerDialogVisible = true
        },


        // 弹窗新增------ 20191111 lss
        // 点击添加 f
        // @param falg true/false 执行setOpenDialogHandle函数
        openDialogHandle(id, falg, item) {
            id = id ? id : 'id'
            this.dialog.title = '添加' + this.dialog.diaText
            this.successMessage="添加成功"
            this.dialog.show = true
            this.getOn=true
            // this.dialog.data = ""
            this.dialog.data[id] = ''
            this.clearDialogData()
            if (falg) {
                this.$nextTick(() => {
                    this.setOpenDialogHandle(item)
                })
            }
        },
        // 点击编辑
        editDialogHandle(row, item) {
            this.dialog.title = '编辑' + this.dialog.diaText  // 设置弹窗表题目
            this.dialog.show = true
            this.successMessage="修改成功"
            this.getOn=false
            let { ...param } = row // 直接设置设置信息
            this.$nextTick(() => {
                this.setEditData(param, item) // 自定义设置信息
                
                if (!this.$refs.myEditor) {  // 设置弹窗编辑器内容（设置1个）
                    return
                }

                let { ...content } = this.dialog.data
                this.$refs.myEditor.setHtml(content.content)
            })
        },

        // editDialogHandles(row, item) {
        //     this.dialog.title = '编辑' + this.dialog.diaText  // 设置弹窗表题目
        //     this.dialog.show = true
        //     this.getOn=false
        //     this.dialog.data=row
        //     let { ...param } = row // 直接设置设置信息
        //     this.$nextTick(() => {
        //         this.setEditData(param, item) // 自定义设置信息
                
        //         if (!this.$refs.myEditor) {  // 设置弹窗编辑器内容（设置1个）
        //             return
        //         }

        //         let { ...content } = this.dialog.data
        //         this.$refs.myEditor.setHtml(content.content)
        //     })
        // },

        // 表单提交 // falg 参数设置 notReset 设置成功之后是不是需要重置表单
        submitHandle(falg, notReset, number) {
            // 编辑器取值
            if (this.$refs.myEditor) {
                let text = this.$refs.myEditor.getText().trim();
                let html = this.$refs.myEditor.getHtml();
                if (!text && html.indexOf('<img') == -1) {
                    this.dialog.data.content = text;
                } else {
                    this.dialog.data.content = html
                }
            }
            this.$refs['roleForm'].validate(async valid => {
                if (valid) {
                    if (falg && this.setParam) { this.setParam() }
                    this.dialog.loading = true
                    let { ...param } = this.dialog.data
                    if (number === '1') {
                        param.deptId = param.deptId[param.deptId.length - 1]
                    }
                    // 更新
                    console.log(param,'param')
                    this.updateApi(param).then((res) => {
                        if (res.code === resOk) {
                            if (number != 2) {
                                this.$message.success(this.successMessage)
                                this.dialog.show = false
                                // 获取数据
                                this.getData()
                                if (!notReset) {
                                    this.clearDialogData()
                                }
                            } else if (this.setSubmitHandle) {
                                this.setSubmitHandle()
                            }
                        } else {
                            let msg = res.message ? res.message : '创建失败'
                            this.$message.error(msg);
                        }
                        this.dialog.loading = false
                    }).catch(() => {
                        this.dialog.loading = false
                    })
                }
            })
        },

        submitHandles(id){
            // editeinternestGuide(this.dialog.data).then(res=>{
            //     if(res.code=='0'){
            //         // this.dialog.show=false
            //     }
            //     console.log(res.data,'000')
            // })
            this.$refs['roleForm'].validate(async valid => {
                if (valid) {
                    this.dialog.loading = true
                    let { ...param } = this.dialog.data
                    editeinternestGuide(param).then((res) => {
                        if (res.code === resOk) {
                            this.$message.success("修改成功")
                            this.dialog.show=false
                            this.getData()
                        } else {
                            let msg = res.message ? res.message : '创建失败'
                            this.$message.error(msg);
                        }
                        this.dialog.loading = false
                    }).catch(() => {
                        this.dialog.loading = false
                    })
                }
            })
        },

        dealEditor() {
            if (this.$refs.myEditor) {
                let text = this.$refs.myEditor.getText().trim();
                let html = this.$refs.myEditor.getHtml();
                if (!text && html.indexOf('<img') == -1) {
                    this.dialog.data.content = text;
                } else {
                    this.dialog.data.content = html
                }
            }

        },
        onEditorBlur() {
            this.dealEditor()
            this.$refs["roleForm"].validate((valid) => {
            })
        },


        // 隐藏弹窗
        hideDialogData() {
            this.dialog.show = false
        },
        // 弹窗重置表单
        clearDialogData() {
            this.$nextTick(() => {
                this.$refs['roleForm'].resetFields()
                // 编辑器重置
                if (this.$refs.myEditor) {
                    this.$refs.myEditor.setHtml('')
                }

                // 上传重置
                if (this.$refs.upload) {
                    this.$refs.upload.clearFiles()
                }

                // 上传重置
                if (this.$refs.uploadPic) {
                    this.$refs.uploadPic.clearFiles()
                }
            })

            // 网站数据维护模块
            if (this.moduleType) {
                this.moduleType = ''
            }
        },

        // 重置表单隐藏
        submitHandleHide() {
            this.$refs['roleForm'].resetFields()
            this.dialog.show = false
            
            if (this.moduleType) {
                this.moduleType = ''
            }
        },
        

        // 单个操作
        setOneHandle(text, api, param, index) {
            this.$confirm(text, '操作提示', {
                closeOnClickModal: false,
                customClass: 'my-base-confirm',
                type: 'warning',
            }).then(async () => {
                api(param).then(res => {
                    if (res.code === resOk) {
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        })
                        // 重新刷新表格
                        this.table.data.splice(index, 1)
                        this.getData()
                    } else {
                        let msg = res.message || '操作失败！'
                        this.$message.error(msg)
                    }
                })
            }).catch(() => { });
        },
        // 批量操作 errorVert// true/false
        setAllList(text, api, flag, id, status, errorVert) {
            let that = this, arr = [], isError = false;
            id = id ? id : 'id';
            that.delId.forEach(item => {
                arr.push(item[id]);
            });

            if (arr.length < 1) {
                that.$confirm("请选择要" + text + "的信息", '操作提示', {
                    type: "warning",
                    closeOnClickModal: false,
                    customClass: 'my-base-confirm',
                    callback: () => { }
                });

                return
            }

            if (errorVert) {
                isError = this.errorVert()

                if (isError) {
                    return
                }
            }

            that.$confirm("此操作将"+ text +", 是否继续?", '操作提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                customClass: 'my-base-confirm',
                type: "warning",
                closeOnClickModal: false
            }).then(() => {
                // 参数 
                let param;
                // @param {key: value}
                if (flag == '1') {
                    param.id = arr.join(",")
                }
                // @param {key: value}
                if (flag == '2') {
                    param[id] = arr.join(",")
                }
                // @param [value]
                if (flag == '3') {
                    param = arr
                }

                if (flag == '4') {
                    param = {
                        ids: arr.join(",")
                    }
                }
                if (flag == '5') {
                    param = {
                        userIds: arr.join(","),
                        status: status
                    }
                }
                
                api(param).then((res) => {
                    if (res.code == resOk) {
                        that.$message.success("批量操作成功")
                        that.delId.forEach((itemList) => {
                            var indexs = that.table.data.map(function (item) { return item.buildingId }).indexOf(itemList.buildingId);
                            that.table.data.splice(indexs, 1);
                        })

                        that.getData()
                    } else {
                        let msg = res.message ? res.message : '批量操作失败'
                        that.$message.error(msg)
                    }
                })
            }).catch(() => { });

        },
    }
}