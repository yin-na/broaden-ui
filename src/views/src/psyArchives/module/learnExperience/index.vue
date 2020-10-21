<template>
    <el-row>
          <div class="position-r">
            <el-table class="gary"
              :header-cell-style="{background:'#fff',fontSize:'14px',height:'40px',borderBottom:'1px solid #999'}"
              :row-style="{height:'40px',}"
              :data="list"
              style="width: 100%;border-color: #999"
            >
              <el-table-column label="起止时间" align="center" width="300">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.startDate"
                    align="right"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="开始时间"
                    style="width:125px;border-color: #E0E0E0;border:1px solid #E0E0E0;"
                  ></el-date-picker>--
                  <el-date-picker
                    v-model="scope.row.endDate"
                    align="right"
                    type="date"
                    format="yyyy-MM-dd"
                     :picker-options="pickerOptions0"
                    value-format="yyyy-MM-dd"
                    style="width:125px;border-color: #E0E0E0;border:1px solid #E0E0E0;"
                    placeholder="结束时间"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="school" label="所在学校" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.school"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="position" label="担任职务" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.position"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="对当时所处集体的喜爱程度" align="center" style='border-bottom:1px solid #666 !important'>
                <el-table-column label="喜欢" align="center">
                  <template slot-scope="scope">
                    <el-radio label="0" v-model="scope.row.likeLevel"><i class="radio-i" :style="{background: theme}" style="padding-right: 10%;"></i>&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="较喜欢" align="center">
                  <template slot-scope="scope">
                    <el-radio label="1" v-model="scope.row.likeLevel"><i class="radio-i" :style="{background: theme}" style="padding-right: 10%;"></i>&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="一般" align="center">
                  <template slot-scope="scope">
                    <el-radio label="2" v-model="scope.row.likeLevel"><i class="radio-i" :style="{background: theme}" style="padding-right: 10%;"></i>&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="不太喜欢" align="center">
                  <template slot-scope="scope">
                    <el-radio label="3" v-model="scope.row.likeLevel"><i class="radio-i" :style="{background: theme}" style="padding-right: 10%;"></i>&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column label="不喜欢" align="center">
                  <template slot-scope="scope">
                    <el-radio label="4" v-model="scope.row.likeLevel"><i class="radio-i" :style="{background: theme}" style="padding-right: 10%;"></i>&nbsp;</el-radio>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <div class="delete-1" v-if="educationList.length > 1">
              <el-button type="text" class="el-icon-circle-close fs18" @click="deleteExperience"></el-button>
            </div>
          </div>
          <div class="add-btn">
            <el-button
              class="el-icon-plus"
              :style="{borderColor:theme,color:theme}"
              @click="addExperience"
            >新增学习经历</el-button>
          </div>
    </el-row>
</template>

<script>
// import ui form '@/mixins/ui'
import { mapGetters } from 'vuex'
export default {
  // mixins: [ui],
  // computed: {
  //   ...mapGetters(['theme'])
  // },
  props: {
    educationList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    educationList (val) {
      this.list = val
      this.getData()
    }
  },
  data () {
    return {
       pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      list: [],
      theme:'#fc994a',
    }
  },
  created () {
    this.list = this.educationList
  },
  methods: {
    getData () {
      this.$emit('learnData', this.list)
    },
    // 添加学习经历
    addExperience () {
      let obj = {
        startDate: '',
        endDate: '',
        position: '',
        school: '',
        likeLevel: ''
      }
      this.list.push(obj)
    },
    // 删除学习经历
    deleteExperience () {
      this.list.pop()
    }
  }
}
</script>

<style lang="less" scope>
.add-btn {
  text-align: center;
  margin-top: 30px;
  ::v-deep .el-table--border th{
    border-bottom: 1px solid #666 !important;
  }
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
.delete-1 {
  position: absolute;
  bottom: 45px;
  right: -20px;
}
.delete-1 .el-icon-circle-close {
  color: #babdc2;
}
.position-r{
  .el-input--mini .el-input__inner{
    border: none;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
  }
  /deep/ .el-table tbody tr:hover>td { background-color: #fff;}
  /deep/ .el-input--prefix .el-input__inner{
    padding-left: 2px;
    padding-right: 0;
  }
  /* 表格边框颜色 */
  /deep/ .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #999;
  }
  /deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #999;
  }
}
</style>
