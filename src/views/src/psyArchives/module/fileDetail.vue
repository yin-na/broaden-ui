/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 我的档案
 */
<template>
    <div class="file-warp">

        <!-- 1 年度 -->
        <div class="ni-warp">
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane
                            :key="item.name"
                            v-for="item in editableTabs"
                            :label="item.data + '年度'"
                            :name="item.name"
                    >
                        <template>
                            <el-table
                                    :data="tableData"
                                    border
                                    style="width: 100%;font-weight: normal;"
                                    :row-style="{height:'60px',color:'#333'}"
                                    :header-cell-style='headerStyle'>
                                <el-table-column
                                        prop="allCount"
                                        label="数据统计(次)"
                                        width="158">
                                </el-table-column>
                                <el-table-column
                                        prop="type0"
                                        label="心理体检(次)"
                                        width="158">
                                </el-table-column>
                                <el-table-column
                                        prop="type1"
                                        label="身体减压(次)"
                                        width="158">
                                </el-table-column>
                                <el-table-column
                                        prop="type2"
                                        label="呐喊宣泄(次)"
                                        width="158">
                                </el-table-column>
                                <el-table-column
                                        prop="type3"
                                        label="认知训练(次)"
                                        width="158">
                                </el-table-column>
                                <el-table-column
                                        prop="type4"
                                        label="预约咨询(次)"
                                        width="158">
                                </el-table-column>
                                <el-table-column
                                        prop="type5"
                                        label="健康培训(次)"
                                >
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </div>

        <div class="file-tit clearfix">
            <div class="file-tit-le fl">
                <span>心路历程</span>
            </div>
            <div class="file-tit-ri fr">
              <div class="block">
                <el-date-picker
                v-model="value1"
                type="year"
                placeholder="2020"
                prefix-icon='el-icon-arrow-down'>
                </el-date-picker>
              </div>
            </div>
        </div>

        <!-- 折叠面板 -->
        <div class="file-cont" id="cont">
            <el-collapse v-model="activeName0" accordion>
                <el-collapse-item :title="item.month + ' 检测数据'" :name="index + 1" v-for="(item, index) in dataList" :key="index">
                    <div class="sort-list" v-for="(items, index) in (item.minds)" :key="index">
                        <div class="sort-time">
                            <span>{{items.createTime}}</span>
                        </div>
                        <div class="sort-img">
                            <img v-if="items.type == 0" src="@/assets/psyArchives/type-1.jpg">
                            <img v-if="items.type == 1" src="@/assets/psyArchives/type-2.jpg">
                            <img v-if="items.type == 2" src="@/assets/psyArchives/type-3.jpg">
                            <img v-if="items.type == 3" src="@/assets/psyArchives/type-4.jpg">
                            <img v-if="items.type == 4" src="@/assets/psyArchives/type-5.jpg">
                            <img v-if="items.type == 5" src="@/assets/psyArchives/type-6.jpg">
                        </div>
                        <div class="sort-cont">
                            <div v-if="items.type == 0">
                              <h3>心理体检</h3>
                              <p>体检量表：{{items.value}}</p>
                              <span v-if="items.result == null">体检结果：暂无</span>
                              <!-- <span v-else>体检结果：{{items.result | htmlfilter}}</span> -->
                            </div>
                            <div v-if="items.type == 1">
                                <h3>身心减压</h3>
                                <p>心率（次/分）：{{items.value}}</p>
                                <span v-if="items.result == null">体检结果：暂无</span>
                                <span v-else>体检结果：{{items.result | htmlfilter}}</span>
                            </div>
                            <div v-if="items.type == 2">
                                <h3>宣泄呐喊</h3>
                                <p>呐喊得分：{{items.value}}</p>
                                <span v-if="items.result == null">报告建议：暂无</span>
                                <span v-else>报告建议：{{items.result | htmlfilter}}</span>
                            </div>
                            <div v-if="items.type == 3">
                                <h3>认知训练</h3>
                                <p>脑波报告：{{items.value}}</p>
                                <span v-if="items.result == null">报告建议：暂无</span>
                                <span v-else>报告建议：{{items.result | htmlfilter}}</span>
                            </div>
                            <div v-if="items.type == 4">
                                <h3>预约咨询</h3>
                                <p>问题类型：{{items.value}}</p>
                                <span v-if="items.result == null">干预方案：暂无</span>
                                <span v-else>干预方案：{{items.result | htmlfilter}}</span>
                            </div>
                            <div v-if="items.type == 5">
                                <h3>健康培训</h3>
                                <p>培训主题：{{items.value}}</p>
                                <span v-if="items.result == null">培训要点：暂无</span>
                                <span v-else>培训要点：{{items.result | htmlfilter}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="last-btm">
                        <span>心理呵护start</span>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import { getJourneyOfMind,yearQuery} from '@/api/user/manageIndex'

export default {
  mixins: [],
  components: {},
  data () {
    return {
      value1: '',
      activeName: '1',
      activeName0: '',
      nowYear: '',
      dataList: [],
      nowData: '',
      editableTabs: [{
        title: '年度',
        data: '',
        name: '1'
      },
        {
          title: '年度',
          data: '',
          name: '2'
        },
        {
          title: '年度',
          data: '',
          name: '3'
        }],
      tableData: [{
        allCount: '',
        type0: '',
        type1: '',
        type2: '',
        type3: '',
        type4: '',
        type5: ''
      }],
      headerStyle: {
        'font-color': '#F36421',
        'font-size': '16px',
        'height': '50px'
      }
    }
  },
  computed: {
  },
  mounted () {
    this.handleClick()
    this.getYearQueryf()
    this.getYearQuery()
  },
  watch: {
    detaClick: function () {
      this.$nextTick(function () {
        this.handleClick()
      })
    },
    value1: {
      handler () {
        this.getYearQuery()
      },
      deep: true
    }
  },
  filters: {
    // 富文本过滤器
    htmlfilter: function (val) {
      if (val != null) {
        return val.replace(/<[^<>]+>/g,'').replace(/&nbsp;/ig,'')
      }
    }

  },
  methods: {
    handleClick (tab, event) {
      if (tab == undefined) {
        this.nowData = new Date().getFullYear()
      } else {
        // 获取年份
        this.nowData = tab.label.substring(0, 4)
      }
      this.getYearQueryf()
    },
    // 档案接口
    getYearQueryf () {
      // 获取当前年份
      this.editableTabs[0].data = new Date().getFullYear()
      this.editableTabs[1].data = new Date().getFullYear() - 1
      this.editableTabs[2].data = new Date().getFullYear() - 2

      yearQuery(this.nowData)
        .then((res) => {
          this.tableData = res.data
        })
    },
    getYearQuery () {
      if (this.value1 == '') {
        this.nowYear = new Date().getFullYear()
        getJourneyOfMind(this.nowYear)
          .then((res) => {
            this.dataList = res.data
          })
      } else {
        var data = this.value1.getFullYear()
        getJourneyOfMind(data)
          .then((res) => {
            if (res.data.length == 0) {
              this.$message.success('暂无信息')
              this.dataList = res.data
            } else {
              this.dataList = res.data
            }
          })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.file-warp{
    /* 年度 */
    .ni-warp{
        margin: 5% 0;
        .srch_tit{
            text-align: center;
            color: #F36421;
            font-size: 24px;
            margin-bottom: 70px;
        }
        // 底部滑动条
        /deep/ .el-tabs__nav-wrap::after{
            background: #fff !important;
        }
        /deep/ .el-tabs__item.is-active{
            color: #F36421;
        }
        /deep/ .el-tabs__active-bar{
            background: #F36421;
        }
        /deep/ .is-top:hover{
            color: #F36421;
        }
        /deep/ .el-tabs__header{
            margin: 0;
        }
        /deep/ .el-tabs__header .is-top{
            margin-bottom: 10px !important;
            font-size: 16px;
        }
        /deep/ .el-table td, .el-table th {
            text-align: center;
            font-weight: normal;
        }
        /deep/ .el-tabs__item{
            padding: 0 20px;
            height: 35px;
            line-height: 35px;
        }
        /deep/ .el-tabs__item.is-active{
            color: #fff;
            background: linear-gradient(90deg, #FF9443 0%, #FE6932 100%);
            border-radius: 20px;
        }
        /deep/ .el-tabs__active-bar{
            background: none;
        }
    }

    /* 心路历程 */
    .file-tit{
        padding: 2% 0 2% 0;
        font-size: 16px;
        //  切换样式
        .el-tabs__item.is-active{
            color: #F36421 !important;
        }

        // 月份选择
        /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{
            width: 135px;
        }
        /deep/ .el-input--mini .el-input__inner{
            text-align: center !important;
            border-radius: 40px !important;
            height: 35px;
            line-height: 35px;
            padding-left: 10px;
            border-color: #F36421;
        }
        /deep/ .el-input__prefix{
            left: 83px !important;
        }
        .pinkBtn{
          margin-top: 2%;
        }
    }
    .el-collapse{
        border: none !important;
    }
    // 折叠
    /deep/ .el-collapse-item__header{
        border: none;
        background: #ECF9FF;
        margin: 1% 0;
        padding: 0 2%;
        height: 45px;
        color: #666;
        font-size: 16px;
    }
    /deep/ .el-collapse-item__arrow.is-active{
        color: #F36421;
        font-weight: bolder;
        width: 22px;
        height: 12px;
    }
    /deep/ .el-collapse-item__wrap{
        border: none;
        padding: 2% 0;
    }
    .file-cont{
        /deep/ .el-timeline-item__wrapper{
            padding-left: 5%;
        }
        /deep/ .el-timeline-item__content{
            p{
                padding: 0.5% 0;
            }
        }
    }
    /*  折叠面板样式  */
    .sort-list{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        .sort-time{
            width: 20%;
            font-size: 16px;
            color: #999;
        }
        .sort-img{
            position: absolute;
            top: -1%;
            left: 18.7%;
            z-index: 9999;
        }
        .sort-cont{
            border-left: 1px dotted #999;
            padding: 0 2% 4% 4%;
            width: 80%;
            height: 100%;
            font-size: 14px;
            color: #999;
            h3{
                font-size: 16px;
                color: #333;
                padding-bottom: 2%;
            }
            p{
                padding-bottom: 1%;
            }
        }
    }
    .last-btm{
        color: #F36421;
        font-size: 18px;
        padding-left: 15%;
    }
}
</style>
