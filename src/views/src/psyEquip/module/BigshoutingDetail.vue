<template>
    <div class="Detail_warp">
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-row :gutter="20">
                        
                        <!-- 左侧  -->
                        <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6">
                            <div class="grid-content bg-purple-light">
                                <!-- 上 -->
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple-dark">
                                            <div style="background:#ccc">
                                                哈哈
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>

                                <!-- 下 -->
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple-dark">
                                            
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>

                        <!--  右侧 -->
                        <el-col :xs="4" :sm="6" :md="18" :lg="18" :xl="18">
                            <div class="grid-content bg-purple">
                                <!-- 上 -->
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple-dark">
                                            <tableDetail></tableDetail>
                                        </div>
                                    </el-col>
                                </el-row>

                                <!-- 下 -->
                                <el-row>
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple-dark">
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>

                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import tableDetail from './compents/tableDetail'
    export default {
        components: {
            tableDetail
        },
        data() {
        }
    }
</script>

<style lang="less">
    .Detail_warp{
        width: 64%;
        height: 100%;
        margin: 0 auto;
        padding: 1% 0;
    }
</style>
