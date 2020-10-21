<template>
  <div class="tableDetail">
    <div class="tableTitle">
      生理数据：
    </div>
    <el-table :data="tableData" border stripe style="width:725px;margin: 0 auto;">
      <el-table-column prop="name" label="参数名称(单位)">
      </el-table-column>
      <el-table-column prop="status" label="检测状态">
      </el-table-column>
      <el-table-column prop="range" label="参考范围">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    props:['physiologyData'],
    watch:{
      physiologyData:{
                handler(value){
                this.tableData=value
                },
                deep: true
            }
        },
    data() {
      return {
        tableData:[]
      }
    }
  }
</script>

<style>
  .tableDetail{
    width:815px;
    height:480px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  .tableTitle{
    height:70px;
    font-size:18px;
    line-height: 70px;
    font-weight: bold;
    margin-left: 6%;
    color:#333;
  }
</style>
