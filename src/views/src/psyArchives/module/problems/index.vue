<template>
    <div class="problems">
        <div class="position-r">
            <el-table class="gary"
            border
              :header-cell-style="{fontSize:'14px',height: '40px',borderColor: '#999'}"
              :row-style="{height:'70px',fontSize:'14px',}"
              :data="list"
              style="width: 100%"
            >
              <el-table-column label="序列" align="center" width="100">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column prop="problem" label="描述" align="center" style="position: relative">
                <template slot-scope="scope">
                  <el-input type="textarea" :rows="1" v-model="scope.row.problem"></el-input>
                    <span v-if="scope.row.problem == null" style="position: absolute;right: 4%;bottom: -5%;color: #C3C3C3; font-size: 12px"></span>
                    <span v-else style="position: absolute;right: 4%;bottom: -5%;color: #C3C3C3; font-size: 12px">{{scope.row.problem.length}} / 50</span>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" label="产生时间" width="260" align="center">
                <template slot-scope="scope">
                  <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    v-model="scope.row.startDate"
                    align="right"
                    type="date"
                    placeholder="产生时间"
                  ></el-date-picker>
                </template>
              </el-table-column>
            </el-table>
            <div class="delete" v-if="problemList.length > 1">
              <el-button type="text" class="el-icon-circle-close fs18" @click="deleteProblem"></el-button>
            </div>
          </div>
          <div class="add-btn">
            <el-button
              class="el-icon-plus"
              :style="{borderColor:theme,color:theme}"
              @click="addProblem"
            >添加更多</el-button>
          </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  // computed: {
  //   ...mapGetters(['theme'])
  // },
  name: 'Problems',
  props: {
    problemList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      list: [],
      theme:'#fc994a',
    }
  },

  watch: {
    problemList (val) {
      this.list = val
      this.setData()
    }
  },
  created () {
    this.list = this.problemList
  },
  methods: {
    setData () {
      this.$emit('proData', this.list)
    },
    // 添加烦恼
    addProblem () {
      let obj = {
        problem: '',
        startDate: ''
      }
      this.list.push(obj)
    },
    // 删除烦恼
    deleteProblem () {
      this.list.pop()
    }
  }
}
</script>

<style lang="less" scoped>
    /deep/ .el-textarea__inner{
        height: 55px;
        border-color: #E0E0E0;
        font-size: 14px;
    }
    .delete{
        position: absolute;
        bottom: 80px !important;
        right: -20px !important;
    }
    .delete .el-icon-circle-close {
        color: #babdc2;
    }
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
