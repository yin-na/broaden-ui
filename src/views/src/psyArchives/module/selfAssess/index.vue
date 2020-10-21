<template>
    <el-table class="gary"
      stripe
      border
      :header-cell-style="{fontSize:'14px',borderColor:'#999',height: '40px'}"
      :row-style="{height:'40px',fontSize:'14px',color:'#999'}"
      :data="data"
      style="width: 100%;font-size:16px;margin-bottom:30px;"
    >
      <el-table-column prop="name" label align="center"></el-table-column>
      <el-table-column prop="value" label="很好" align="center">
        <template slot-scope="scope" >
          <el-radio class="mgl10" label="0" v-model="scope.row.value"><i class="radio-i" :style="{background: theme}"></i></el-radio>
        </template>
      </el-table-column>
      <el-table-column  prop="value" label="较好" align="center">
        <template slot-scope="scope">
          <el-radio class="mgl10" label="1" v-model="scope.row.value"><i class="radio-i" :style="{background: theme}"></i></el-radio>
        </template>
      </el-table-column>
      <el-table-column  prop="value" label="一般" align="center">
        <template slot-scope="scope">
          <el-radio class="mgl10" label="2" v-model="scope.row.value"><i class="radio-i" :style="{background: theme}"></i></el-radio>
        </template>
      </el-table-column>
      <el-table-column  prop="value" label="较差" align="center">
        <template slot-scope="scope">
          <el-radio class="mgl10" label="3" v-model="scope.row.value"><i class="radio-i" :style="{background: theme}"></i></el-radio>
        </template>
      </el-table-column>
      <el-table-column  prop="value" label="很差" align="center">
        <template slot-scope="scope">
          <el-radio class="mgl10" label="4" v-model="scope.row.value"><i class="radio-i" :style="{background: theme}"></i></el-radio>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SelfAssess',
  props: {
    selfList: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      data: [],
      theme:'#fc994a',
    }
  },
  created () {
    this.data = this.selfList
    this.setData()
  },
  watch: {
    selfList (val) {
      this.data = val
      this.setData()
    }
  },
  methods: {
    setData () {
      this.$emit('assessData', this.data)
    }
  }
}
</script>

<style lang="less" scoped>
  .add-btn {
    text-align: center;
    margin-top: 30px;
    /deep/ .el-button{
      height: 35px;
      border-color: #e6a23c;
      color: #e6a23c;
      border-radius: 20px;
      padding: 0 1.2%;
    }
    /deep/ .el-button:hover{
      background: #fff;
    }
  }
</style>
