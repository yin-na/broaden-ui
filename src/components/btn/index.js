/*
 * @Author: 李素素 
 * @Date: 2019-07-25 16:36:38 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-08-07 14:49:07
 */
import Vue from 'vue'
import basePage from '@/components/basePages'
import threeBtn from "@/components/btn/threeBtn";
import addBtn from "@/components/btn/addBtn";
import deleteBtn from "@/components/btn/deleteBtn";
import editBtn from "@/components/btn/editBtn";
import searchBtn from "@/components/btn/searchBtn";
import refreshBtn from "@/components/btn/refreshBtn";
import lookBtn from "@/components/btn/lookBtn";
import resetBtn from "@/components/btn/resetBtn";
import withdrawBtn from "@/components/btn/withdrawBtn";
import draftBtn from "@/components/btn/draftBtn";


/** 
 *  分页组件 
 * */ 
Vue.component('base-page', basePage)
/**
 * @description 搜索。重置。刷新3个按钮
 * @param props search: true  是否展示搜索按钮
 * @param props reset: true  是否展示重置按钮
 * @param fun search  刷新
 * @param fun reset  重置
 *  */ 
Vue.component('three-btn', threeBtn)
/**
 *  @description 增加按钮
 *  @param icon true则带增加图标
 *  @param text 自定义参数
 */
Vue.component('add-btn', addBtn)
/**
 *  @description 删除按钮
 *  @param icon true则带增加图标
 *  @param  text 自定义文字
 */
Vue.component('delete-btn', deleteBtn)
/**
 *  @description 编辑按钮
 *  @param  text --自定义文字
 */
Vue.component('edit-btn', editBtn)
/**
 *  @description 搜索按钮
 */
Vue.component('search-btn', searchBtn)
/**
 *  @description 刷新按钮
 */
Vue.component('refresh-btn', refreshBtn)
/**
 *  @description 重置按钮
 */
Vue.component('reset-btn', resetBtn)

/**
 *  @description 查看按钮
 *  @param text :自定义内容文字
 */
Vue.component('look-btn', lookBtn)

/**
 *  @description 撤回按钮
 *  @param icon true则带增加图标
 *  @param  text 自定义文字
 */
Vue.component('withdraw-btn', withdrawBtn)

/**
 *  @description 草稿箱
 *  @param icon true则带增加图标
 *  @param  text 自定义文字
 */
Vue.component('draft-btn', draftBtn)

