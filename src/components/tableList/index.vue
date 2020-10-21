/*
 * @Author: 李素素 
 * @Date: 2019-10-07 15:57:25 
 * @Last Modified by: 李素素
 * @Last Modified time: 2020-08-15 15:35:44
 */
//  pop: 气泡提示
//  img：图片
    content: 内容
//  video： 视频
//  filter: 过滤，需要filterList（过滤内容Array）
    tag01： 过滤之后展示标签
    tag02： 过滤之后展示标签
    tag03： 过滤之后展示标签
//  text：后面是不是加文字 需要textMain（文字详情String）
<template>
    <div>
        <el-table v-loading="loading" 
                ref="multipleTable"
                :data="dataList" 
                :class="[noBorder && !border ? 'no-border' : '', border ? 'base-my-table' : '']"
                :border="!noBorder || border"
                :row-class-name="tableRowClassName"
                :show-summary="showSummary"
                @selection-change="handleSelectionChange"
                :row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                highlight-current-row fit>
            <!-- 选择框 -->
            <el-table-column v-if="selection" :selectable="setSelectable" type="selection" align="center" width="80"></el-table-column>
            <!-- 排序 -->
            <el-table-column v-if="needSort" align="center" type="index" width="80" label="序号"></el-table-column>
            <template v-for="(item, index) in tableList">
                <!-- 气泡展示 -->
                <el-table-column v-if="item.pop" :key="index"
                    :label="item.title"
                    :min-width="item.width"
                    align="center">
                    <template slot-scope="{ row }">
                        <el-tooltip  class="item" effect="dark" placement="top">
                             <div slot="content" style="max-width: 450px" v-html="row[item.name]"></div>
                            <span class="hide-ellipsis-one span-hover">{{ row[item.name] }}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!-- 图片放大 -->
                <el-table-column :key="index" v-else-if="item.img" 
                    :label="item.title"
                    :min-width="item.width"
                    align="center" class-name="has-img">
                    <template slot-scope="{ row }"> 
                        <div v-if='item.content'>
                            <div v-if="row[item.name] == '1'" class="has-img">
                                <img class="cursor-pointer" @click="showImg(row.coverImage)" :src="row.coverImage" alt="">
                            </div>
                            <div v-else>
                                {{row[item.contentName]}}
                            </div>
                        </div>
                        <img v-else class="cursor-pointer" @click="showImg(row[item.name])" :src="row[item.name]" alt="">
                    </template>
                </el-table-column>
                <!-- 视频展示 -->
                <el-table-column 
                    :key="index"
                    align="center"
                    v-else-if="item.video"
                    :prop="item.name"
                    :label="item.title"
                    :min-width="item.width">
                        <template slot-scope="{row}">
                            <div class="has-img cursor-pointer" @click="showImg(row[item.name], '1')">
                                <video class="video" v-if="row[item.name]" controls name="media">
                                    <source :src="row[item.name]" type="video/mp4">
                                    您的浏览器不支持播放该视频！
                                </video>
                            </div>
                        </template>
                </el-table-column>
                <!-- 过滤 -->
                <el-table-column :key="index" v-else-if="item.filter"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                    <template slot-scope="{ row }">
                        <!-- 第一种标签ui  2种颜色（主题色/成功色）-->
                        <el-tag v-if="item.tag01"  size="mini"
                            :type="row[item.name] === '0' || row[item.name] === false ? 'primary' : 'success'"
                            effect="dark"
                            disable-transitions>{{row[item.name] | findCompanyType(item.filterList)}}</el-tag>

                        <!-- 第一种标签ui  2种颜色（主题色/危险色）-->
                        <el-tag v-else-if="item.tag02"  size="mini"
                            :type="row[item.name] === '0' || row[item.name] === false ? 'primary' : 'danger'"
                            effect="dark"
                            disable-transitions>{{row[item.name] | findCompanyType(item.filterList)}}</el-tag>

                        <!-- 第三种标签ui  3种颜色（主题色/危险色/警告色）-->
                        <el-tag  v-else-if="item.tag03"  size="mini" :type="row[item.name] === '0' ? 'primary' : row[item.name] === '1' ? 'warning' : 'danger'"
                            effect="dark"
                            disable-transitions>
                            {{ row[item.name] | findCompanyType(item.filterList) }}
                        </el-tag>

                        <!-- 自定义过滤展示 -->
                        <slot v-else-if="item.solt" name="filter" :scope="row"></slot>
                        
                        <!-- 正常过滤 -->
                        <template v-else>{{ row[item.name] | findCompanyType(item.filterList) }}</template>
                    </template>
                </el-table-column>
                <!-- 后面加文字 -->
                <el-table-column :key="index" v-else-if="item.text"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                        <template slot-scope="{ row }">
                            {{ row[item.name] ? row[item.name] + item.textMain : '' }}
                        </template>
                </el-table-column>
                <!-- 自定义唯一 -->
                <el-table-column :key="index" align="center" v-else-if="item.slot" 
                        :label="item.title"
                        :min-width="item.width">
                        <template slot-scope="scope">
                            <slot name="tableSlot" :scope="scope"></slot>
                        </template>
                </el-table-column>
                <!-- 时间格式 -->
                <el-table-column :key="index" v-else-if="item.time"
                                align="center"
                                :prop="item.name"
                                :label="item.title"
                                :min-width="item.width"
                                :formatter="dateFormat"/>
                <!-- 没有展示自定义文字 -->
                <el-table-column :key="index" v-else-if="item.isNull"
                                align="center"
                                :prop="item.name"
                                :label="item.title"
                                :min-width="item.width"
                                :formatter="dateFormat">
                        <template slot-scope="{ row }">
                            {{ row[item.name] ? row[item.name] : item.nullTest }}
                        </template>
                </el-table-column>
                <!-- 时间转换为时分秒的形式 -->
                <el-table-column :key="index" v-else-if="item.toTime"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                        <template slot-scope="{ row }">
                            {{ row[item.name] | filtersTimeChange }}
                        </template>
                </el-table-column>
                <!-- 直接是标签的 -->
                <el-table-column :key="index" v-else-if="item.tags"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                    <template slot-scope="{ row }">
                        <!-- 第一种标签-->
                        <el-tooltip  class="item" effect="dark" placement="top" :content="row[item.name]">
                            <el-tag v-if="row[item.name]"
                                :type="'primary'"
                                effect="dark"
                                size="mini"
                                disable-transitions>{{row[item.name]}}</el-tag>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!--  需要前端排序 -->
                <el-table-column :key="index" v-else-if="item.sortMethod"
                        :label="item.title"
                        :min-width="item.width"
                        align="center" sortable
                        :sort-method="(a, b)=>sortMethod(a, b, item.sortMethodName1, item.sortMethodName2)">
                    <template slot-scope="{ row }">
                        <span>{{row[[item.name]]}}</span>
                    </template>
                </el-table-column>
                <!-- 任务中心所属部门的ui -->
                <el-table-column :key="index" v-else-if="item.tagList"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                    <template slot-scope="{ row }">
                        <el-tooltip  class="item" effect="dark" placement="top">
                            <div slot="content" style="max-width: 300px">
                                <template v-for="(tag, index) in row[item.name]">
                                    {{tag.label}}<template v-if="index < row[item.name].length - 1">、</template>
                                </template>    
                            </div>
                            <div class="no-line-feed">
                                <el-tag  size="mini" style="margin: 0 3px" :type="'primary'" v-for="(tag, tagIn) in row[item.name]" :key="tagIn" effect="dark">
                                    {{tag.label}}
                                </el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <!-- 任务中心预警因子 -->
                <el-table-column :key="index" v-else-if="item.warning"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                        <template slot-scope="{ row }">
                            <el-tooltip  class="item" effect="dark" placement="top" v-if="row[item.name].length > 0">
                                <div slot="content" style="max-width: 300px">
                                    <span v-for="(warn, warnI) in row[item.name]"  :key="warnI">
                                        <svg-icon class="fs16" 
                                        :style="{color: warn == '0' ?  '#f7bb1a' : warn == '1' ? '#eb6100' : '#d82d03',marginRight:'2px'}" 
                                        icon-class="warning"/>
                                        {{ row[item.name1][warnI] }}
                                        <template v-if="warnI < row[item.name].length - 1">、</template>
                                    </span> 
                                </div>
                                <div class="no-line-feed">
                                    <span v-for="(warn, warnI) in row[item.name]"  :key="warnI">
                                        <svg-icon class="fs16" 
                                        :style="{color: warn == '0' ?  '#f7bb1a' : warn == '1' ? '#eb6100' : '#d82d03', marginRight:'2px'}" 
                                        icon-class="warning"/>
                                        {{ row[item.name1][warnI] }}
                                        <template v-if="warnI < row[item.name].length - 1">、</template>
                                    </span>
                                </div>
                            </el-tooltip>
                            <span v-else>
                                暂无
                            </span>
                        </template>
                </el-table-column>
                <!-- 任务单个预警 -->
                <el-table-column :key="index" v-else-if="item.warningOne"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                        <template slot-scope="{ row }">
                            <div class="no-line-feed">
                                <svg-icon v-if="row[item.name] != '4'" class="fs16" 
                                :style="{color: row[item.name] == '0' ? '#f7bb1a' : row[item.name] == '1' ? '#eb6100' : '#d82d03'}" 
                                icon-class="warning"/>
                                {{ row[item.name] | findCompanyType(levels) }}
                            </div>
                        </template>
                </el-table-column>
                <!-- 任务中心测评记录相关量表多个一列 -->
                 <el-table-column :key="index" v-else-if="item.record"
                        :label="item.title"
                        :min-width="item.width"
                        align="center">
                    <template slot-scope="{ row }">
                        <!-- 第一种标签-->
                            <div style="margin-top:4px" v-for="(tag, tagIndex) in row[item.name]" :key='tagIndex'>
                                <el-tag  size="mini" :type="'primary'" effect="dark">{{tag.label}}</el-tag>
                            </div>
                    </template>
                 </el-table-column>
                <!-- 测试状态 -->
                <el-table-column v-else-if="item.state" :key="index" 
                    :label="item.title"
                    :min-width="item.width"
                    align="center"> 
                    <template slot-scope="{ row }">
                        <div v-if="row[item.name] == '1'" class="ycText">{{row[item.name] | findCompanyType(testList) }}</div>
                        <div v-else style="background:#7ddda4"  class="ycText">{{row[item.name] | findCompanyType(testList) }}</div>
                    </template>
                </el-table-column>
                <!-- 进度条 -->
                <el-table-column v-else-if="item.progress" :key="index" 
                    :label="item.title"
                    :min-width="item.width"
                    align="center">
                    <template slot-scope="{ row }">
                        <div class="table-color-blue">
                            <el-progress style="margin:8px 0" :stroke-width="8" 
                                :percentage="parseFloat((row[item.name] * 100).toFixed(2))"></el-progress>
                        </div>
                    </template>
                </el-table-column>
                <!-- 正常 -->
                <el-table-column v-else :key="index"
                                align="center"
                                :prop="item.name"
                                :label="item.title"
                                :min-width="item.width"></el-table-column>
            </template>
            <!-- 操作 -->
            <el-table-column align="center" v-if="showBtn" label="操作" :min-width="width"
                    :fixed="fixed">
                    <template slot-scope="scope">
                        <slot name="scope01" :scope="scope"></slot>
                        <edit-btn v-if="resourceUpdate && updateBtn" @click="editDia(scope.row)"/>
                        <slot name="scope02" :scope="scope"></slot>
                        <delete-btn v-if="resourceDelete && deleteBtn" @click="deleteDia(scope)"/>
                        <slot name="scope03" :scope="scope"></slot>
                    </template>
            </el-table-column>
        </el-table>
        <!-- 图片放大 -->
		<look-img ref="lookImg" :imgSrc="imgSrc" :isVideo='isVideo' :centerDialogVisible="centerDialogVisible"></look-img>
    </div>
</template>

<script>
import ui from '@/mixin/ui'
import lookimg from '@/mixin/lookimg'
import timeTranform from '@/mixin/timeTranform'
import { sortMethod } from '@/utils/setName.js'
import { levels, testList } from '@/settings'
import moment from 'moment'
export default {
    mixins: [lookimg, timeTranform, ui],
    props: {
        // treeProps: { // 子集合
        //     type: Object,
        //     default: () => {
        //         return {children: 'children', hasChildren: 'hasChildren'}
        //     }
        // },
        showSummary: { // 是否在表尾显示合计行	
            type: Boolean,
            default: false
        },
        border: { // 是不是需要border
            type: Boolean,
            default: false
        },
        showBtn: { // 是不是需要操作列
            type: Boolean,
            default: true
        },
        width: { // 操作列的最小宽度
            type: String,
            default: '200px'
        },
        updateBtn: { // 是不是需要更新按钮
            type: Boolean,
            default: false
        },
        deleteBtn: { // 是不是需要删除按钮
            type: Boolean,
            default: false
        },
        selection: {// 是不是需要多选框
            type: Boolean,
            default: false
        },
        needSort: { // 是不是需要排序
            type: Boolean,
            default: true
        },
        loading: { // 加载中
            type: Boolean,
            default: false
        },
        data: { // 列表数据内容
            type: Array,
            default: () => []
        },
        tableList: { // 列表数据
            type: Array,
            default: () => []
        },
        id: { // id
            type: String,
            default: 'id'
        }
    },
    data() {
        return {
            levels: levels,
            testList: testList
        }
    },
    computed: {
        dataList() {
            let that = this, [ ...param ] = that.data;
            param.forEach(element => {
                element.id = element[that.id]
            });

            return param
        }
    },
 mounted(){
 },
    methods: {
        // 多选框禁止选中
        setSelectable(row) {
            //  超过3个禁止选中
            return !row.disabled
        },
        // 时间格式化
        dateFormat(row, column) {
            const date = row[column.property]
            if (!date) {
                return ''
            }
            return moment(date).format('YYYY-MM-DD HH:mm:ss')
        },
        // 高度更新
        // updateElsHeight() {
        //     this.$nextTick(() => {
        //         // this.$refs.multipleTable.layout.updateElsHeight();
        //     })
        // },

        // 取消选中
        toggleRowSelection(row, flag) {
            this.$refs.multipleTable.toggleRowSelection(row, flag)
        },
        
        // 编辑
        editDia(val) {
            this.$emit('editDia', val)
        },

        // 删除
        deleteDia(val) {
            this.$emit('deleteDia', val)
        },

        // 多选框发生变化
        handleSelectionChange(val) {
            this.$emit('selection-change', val)
        },
        // 排序
        sortMethod(a, b, name, flag) {
            return sortMethod(a, b, name, flag) 
        },
    }
}
</script>
<style scoped> 
.poptipExplain-c {
    max-width: 500px;
}
.ycText{
    width: 60px;
    height: 24px;;
    line-height:24px;
    border-radius:15px;
    background:#f0ab7c;
    text-align:center;
    color:#fff;
    font-size:14px;
    margin:0 auto;
}
.no-line-feed {
    box-sizing: border-box;
    white-space: nowrap!important;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
<style>
.table-color-blue {
    max-width: 300px;
    margin: 0 auto
}
.table-color-blue .el-progress-bar__inner {
    background: linear-gradient(to left, #2baeef, #57defd)!important;
}
.table-color-blue .el-progress__text {
    font-size: 13px!important;
}
</style>