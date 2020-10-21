/*
 * @Author: 李素素 
 * @Date: 2019-08-06 17:35:09 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-15 11:28:48
 */
//  分页组件
<template>
    <div class="my-page clearfix" :class="{'hidden':hidden}">
        <div class="fl beizhu">
            共计{{ total }}条记录，每页显示{{ pageSize }}条记录
        </div>
        <div class="fr over-auto">
            <el-pagination background
                small
                layout="prev, pager, next, sizes"
                :page-sizes="[5, 10, 20, 50, 100]"
                :page-size="pageSize"
                :prev-text="'< 上一页'"
                :next-text="'下一页 >'"
                :current-page="current > 0 ? current : currentPage"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChanges"
            />
            <span class="beizhu mar">
                当前页面 {{ current > 0 ? current : currentPage }} / {{ Math.ceil(total / pageSize) || 1 }}
            </span>
            <span class="beizhu mar">
                跳转到第<el-input v-model="nowPage" class="page-input" />页
            </span>
            <el-button type="primary" class="page-btn" plain @click="handleSizeChange">确定</el-button>
        </div>
    </div>
</template>

<script>
    import { scrollTo } from '@/utils/scroll-to'
    export default {
    name: 'Pagination',
    props: {
        total: {//总页码
            required: true,
            type: Number
        },
        current: {//初始化显示第几页
            type: Number,
            default: 0
        },
        autoScroll: {
            type: Boolean,
            default: true
        },
        hidden: {//是不是显示
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            nowPage: 1,
            currentPage: 1,
            pageSize: 10,
            islast: false, // 是不是最后一页
        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        handleSizeChange() {
            let nowPage = parseInt(this.nowPage);
            let num =  Math.ceil(this.total / this.pageSize) 
            
            if (nowPage > 0) {
                this.nowPage = nowPage > num ? num : nowPage  // 不能超过最后一页
            
                this.currentPage =  this.nowPage
                this.$emit('pagination', { page: this.nowPage, limit: this.pageSize})
            }
        },

        handleSizeChanges(val) {
            if (this.autoScroll) {
                scrollTo(0, 100)
            }
            this.pageSize = val;
            this.$emit('pagination', { page: 1, limit: val})
        },

        handleCurrentChange(val) {
            if (this.autoScroll) {
                scrollTo(0, 100)
            }
            this.currentPage = val
            this.$emit('pagination', { page: val, limit: this.pageSize})

            if (this.nowPage != val) {
                this.nowPage = ''
            }
        }
    }
    }
</script>
<style lang="scss">
  @import '@/styles/variables.scss';
  .my-page {
    padding: 20px 0 10px;
    .over-auto {
        max-width: 100%;
    }
    .el-pagination,
    .el-pagination .btn-next, .el-pagination .btn-prev,
    .el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
        color: #80878e
    }
    .el-pagination {
      display: inline-block;
      vertical-align: middle;
      padding-top: 0;
      padding-bottom: 0;
      li, span {
        font-size: 14px!important;
      }
    }
    .beizhu {
      color: #80878e;
      font-size: 14px;
      .page-input {
        display: inline;
      }
    }
    .el-pager li{
        font-weight: 100
    }
    .el-pager li.active {
    //   color: #fff;
      border-radius: 4px;
    }
    .el-pager li:hover, .el-pager li {
    //   color: $color-page;
    }
    .mar {
      margin: 0 6px;
    }
    .page-btn {
      padding: 5px 12px;
    }
    .page-input .el-input__inner {
		width: 34px;
		height: 20px;
		line-height: 18px;
        // border-color: $color-page;
        border-color: #DCDFE6;
        color: #80878e;
        margin: 0 5px;
        padding: 0 2px;
        text-align: center;
	}
    .el-pagination .el-select .el-input {
        height: 26px;
        .el-input__inner {
            height: 22px;
            color: #80878e;
        }
    }
    .el-pagination.is-background.el-pagination--small .btn-next,
    .el-pagination.is-background.el-pagination--small .btn-prev, 
    .el-pagination.is-background.el-pagination--small .el-pager li:not(.active){
        background: #fff;
        color: #80878e;
    }
  }
    // .el-button--primary.is-plain{
    //     background: #fff
    // }
</style>
