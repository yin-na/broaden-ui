/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 我的资料
 */
<template>
    <div class="info-my">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <!-- 1. 基本信息  -->
              <!-- 只读 -->
              <div v-show="isShow" class='datas'>
                <el-col :span="24" class="base-table-title-msg">
                  <el-card class="table-card basic-info" :data="stuData">
                    <el-row>
                      <el-col :span="24">
                        <div class="hurdle-1 bg-pale-pink">1. 基本信息</div>
                      </el-col>
                    </el-row>
                    <el-form
                      ref="infoForm"
                      :model="stuData"
                      class="personal-form"
                      label-width="110px"
                      hide-required-asterisk
                    >
                      <!-- 1 基本信息 -->
                      <el-row class="margin-btm">
                        <table border="1" cellpadding="0" cellspacing="0" class="table-info">
                          <tr>
                            <td class="gary">姓名</td>
                            <td>{{stuData.userName}}</td>
                            <td class="gary">性别</td>
                            <td>
                              <span v-if="stuData.userSex == 0">男</span>
                              <span v-else-if="stuData.userSex == 1">女</span>
                              <!-- <span v-else-if="stuData.userSex == 2">保密</span> -->
                            </td>
                            <td class="gary">民族</td>
                            <td style="line-height: 23px">{{stuData.nationality}}</td>
                            <td class="gary">出生日期</td>
                            <td>{{stuData.birthday}}</td>
                          </tr>
                          <tr>
                            <td class="gary">健康状况</td>
                            <td>
                              <span v-if="stuData.healthStatus==0">健康</span>
                              <span v-else-if="stuData.healthStatus==1">良好</span>
                              <span v-else-if="stuData.healthStatus==2">欠佳</span>
                            </td>
                            <td class="gary">血型</td>
                            <td>
                              <span v-if="stuData.bloodType == 0">A型</span>
                              <span v-else-if="stuData.bloodType == 1">B型</span>
                              <span v-else-if="stuData.bloodType == 2">AB型</span>
                              <span v-else-if="stuData.bloodType == 3">O型</span>
                              <span v-else-if="stuData.bloodType == 4">保密</span>
                            </td>
                            <td class="gary">紧急联系人</td>
                            <td>{{stuData.contactPeople}}</td>
                            <td class="gary">联系电话</td>
                            <td>{{stuData.phone}}</td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">籍贯</td>
                            <td colspan="6" class="font-ri">{{stuData.nativePlace}}</td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">家庭住址</td>
                            <td colspan="6" class="font-ri">{{stuData.homeAddress}}</td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">寄住地址</td>
                            <td colspan="6" class="font-ri">{{stuData.presentAddress}}</td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">生理缺陷</td>
                            <td colspan="6" class="font-ri">{{stuData.physicalDefect}}</td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">兴趣与特长</td>
                            <td colspan="6" class="font-ri">{{stuData.interest}}</td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">个人病史</td>
                            <td colspan="6" class="font-ri">{{stuData.medicalHistory}}</td>
                          </tr>
                        </table>
                      </el-row>

                      <!-- 2. 学习经历  -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">2. 学习经历</div>
                        </el-col>
                      </el-row>
                      <el-row class="margin-btm">
                        <el-table class="gary"
                          :header-cell-style="{fontSize:'14px',height:'40px',borderColor:'#999'}"
                          :row-style="{height:'40px'}"
                          :data="stuData.educationList"
                          style="width: 100%;border-color: #999;font-size: 14px;"
                        >
                          <el-table-column label="起止时间" align="center" width="200">
                            <template slot-scope="scope">
                              <span style="font-size:13px !important">{{scope.row.startDate}}--{{scope.row.endDate}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="school" label="所在学校" align="center"></el-table-column>
                          <el-table-column prop="position" label="担任职务" align="center"></el-table-column>
                          <el-table-column label="对当时所处集体的喜爱程度" align="center">
                            <el-table-column prop="likeLevel" label="喜欢" align="center" width="100px">
                              <template slot-scope="scope">
                                <span v-if="scope.row.likeLevel == 0" :style="{color:theme}">
                                  <i class="el-icon-check check-style"></i>
                                </span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="likeLevel" label="较喜欢" align="center" width="100px">
                              <template slot-scope="scope">
                                <span v-if="scope.row.likeLevel == 1" :style="{color:theme}">
                                  <i class="el-icon-check check-style"></i>
                                </span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="likeLevel" label="一般" align="center" width="100px">
                              <template slot-scope="scope">
                                <span v-if="scope.row.likeLevel == 2" :style="{color:theme}">
                                  <i class="el-icon-check check-style"></i>
                                </span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="likeLevel" label="不太喜欢" align="center" width="100px">
                              <template slot-scope="scope">
                                <span v-if="scope.row.likeLevel == 3" :style="{color:theme}">
                                  <i class="el-icon-check check-style"></i>
                                </span>
                              </template>
                            </el-table-column>
                            <el-table-column prop="likeLevel" label="不喜欢" align="center" width="100px">
                              <template slot-scope="scope">
                                <span v-if="scope.row.likeLevel == 4" :style="{color:theme}">
                                  <i class="el-icon-check check-style"></i>
                                </span>
                              </template>
                            </el-table-column>

                          </el-table-column>
                        </el-table>
                      </el-row>

                      <!-- 3. 生活重点事 -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">3. 生活事件</div>
                        </el-col>
                      </el-row>
                      <el-row class="margin-btm">
                        <table border="1" cellpadding="0" cellspacing="0" class="table-events">
                          <tr>
                            <td rowspan="7" style="width: 180px;color: #999">影响个人生活的重大事件（有/无）</td>
                          </tr>
                          <tr>
                            <td style="width:400px;color: #999">家庭成员死亡</td>
                            <td colspan="2"><el-radio disabled="disabled" :label="'1'" v-model="stuData.familyDeath">
                              <i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                            <el-radio disabled="disabled" :label="'0'" v-model="stuData.familyDeath">
                              <i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr >
                            <td style="color: #999">父母离异</td>
                            <td colspan="2"><el-radio disabled="disabled" :label="'1'" v-model="stuData.parentDivorce">
                              <i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                            <el-radio disabled="disabled" :label="'0'" v-model="stuData.parentDivorce">
                              <i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">与教师、同学关系紧张</td>
                            <td colspan="2"><el-radio disabled="disabled" :label="'1'"  v-model="stuData.tenseRelation">
                              <i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                            <el-radio disabled="disabled" :label="'0'"  v-model="stuData.tenseRelation">
                              <i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr >
                            <td style="color: #999">生活条件改变</td>
                            <td colspan="2"><el-radio disabled="disabled" :label="'1'"  v-model="stuData.lifeChange">
                              <i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                            <el-radio disabled="disabled" :label="'0'"  v-model="stuData.lifeChange">
                              <i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">影响生活的重大挫折</td>
                            <td colspan="2"><el-radio disabled="disabled" :label="'1'"  v-model="stuData.turningPoint">
                              <i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                            <el-radio disabled="disabled" :label="'0'"  v-model="stuData.turningPoint">
                              <i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">其他</td>
                            <td colspan="2"><el-radio disabled="disabled" :label="'1'"  v-model="stuData.otherEvent">
                              <i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                            <el-radio disabled="disabled" :label="'0'"  v-model="stuData.otherEvent">
                              <i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr style="height:80px;">
                            <td style="color: #999">事件描述</td>
                            <td colspan="3" style="text-align: left;line-height: 23px;padding: 0 1%">{{stuData.eventDesc}}</td>
                          </tr>
                        </table>
                      </el-row>

                      <!-- 4. 困惑与烦恼  -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">4. 困惑与烦恼</div>
                        </el-col>
                      </el-row>
                      <el-row class="margin-btm">
                        <el-table class="gary"
                            border
                            :header-cell-style="{fontSize:'14px',height: '40px',borderColor: '#999'}"
                            :row-style="{height:'70px',fontSize:'14px',}"
                            :data="stuData.problemList"
                            style="width: 100%"
                        >
                            <el-table-column type="index" label="序列" align="center" width="100"></el-table-column>
                            <el-table-column prop="problem" label="描述"></el-table-column>
                            <el-table-column prop="startDate" label="产生时间" align="center"></el-table-column>
                        </el-table>
                      </el-row>

                      <!-- 5. 自我评价  -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">5. 自我评价</div>
                        </el-col>
                      </el-row>
                      <el-table class="margin-btm gary"
                        stripe
                        border
                        :header-cell-style="{fontSize:'14px',height: '40px',borderColor:'#999'}"
                        :row-style="{height:'40px',fontSize:'14px',color:'#999'}"
                        :data="stuData.selfList"
                        style="width: 100%"
                      >
                        <el-table-column prop="name" label align="center"></el-table-column>
                        <el-table-column label="很好" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.value == 0" :style="{color:theme}">
                              <i class="el-icon-check check-style"></i>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="较好" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.value == 1" :style="{color:theme}">
                              <i class="el-icon-check check-style"></i>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="一般" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.value == 2" :style="{color:theme}">
                              <i class="el-icon-check check-style"></i>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="较差" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.value == 3" :style="{color:theme}">
                              <i class="el-icon-check check-style"></i>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column label="很差" align="center">
                          <template slot-scope="scope">
                            <span v-if="scope.row.value == 4" :style="{color:theme}">
                              <i class="el-icon-check check-style"></i>
                            </span>
                          </template>
                        </el-table-column>
                      </el-table>

                      <!-- 按钮 -->
                      <div class="from-btn">
                        <el-button round @click="onShow" class="edit-btn">编辑</el-button>
                      </div>
                    </el-form>
                  </el-card>
                </el-col>
              </div>

              <!-- 可编辑模块 -->
              <div class="edit-warp" v-show="isHidden">
                <el-row class="mechanism-msg  datas">
                  <el-col :span="24" class="base-table-title-msg">
                  <el-card class="table-card basic-info" :data="stuData">

                    <el-row>
                      <el-col :span="24">
                        <div class="hurdle-1 bg-pale-pink">1. 基本信息</div>
                      </el-col>
                    </el-row>

                    <el-form
                      :rules="rules"
                      ref="infoForm"
                      :model="stuData"
                      class="personal-form"
                      label-width="110px"
                      hide-required-asterisk
                    >
                      <!--  1.基本信息  -->
                      <el-row class="margin-btm">
                        <table border="1" cellpadding="0" cellspacing="0" class="table-info">
                          <tr>
                            <td class="gary">姓名</td>
                            <td style="color: #666">{{stuData.userName}}</td>
                            <td class="gary">性别</td>
                            <td style="color: #666">
                              <span v-if="stuData.userSex == 0">男</span>
                              <span v-else-if="stuData.userSex == 1">女</span>
                              <!-- <span v-else-if="stuData.userSex == 2">保密</span> -->
                            </td>
                            <td class="gary">民族</td>
                            <td>
                              <!-- <el-input type="text" v-model.trim="stuData.nationality"></el-input> -->
                              <el-select  v-model.trim="stuData.nationality" placeholder="请选择民族">
                              <el-option
                                v-for="item in nationalitys"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name"
                              />
                            </el-select>
                            </td>
                            <td class="gary">出生日期</td>
                            <!-- <td>{{stuData.birthday}}</td> -->
                            <el-date-picker v-model="stuData.birthday" type="date" :picker-options="pickerOptions0" value-format="yyyy-MM-dd" placeholder="选择日期" ></el-date-picker>
                          </tr>
                          <tr>
                            <td class="gary">健康状况</td>
                            <td class="le-ri">
                              <el-select placeholder="请选择" v-model="stuData.healthStatus">
                                <el-option
                                        v-for="item in status"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key"
                                ></el-option>
                              </el-select>
                            </td>
                            <td class="gary">血型</td>
                            <td class="le-ri">
                              <el-select placeholder="请选择" v-model="stuData.bloodType">
                                <el-option
                                        v-for="item in booleds"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key"
                                ></el-option>
                              </el-select>
                            </td>
                            <td class="gary">紧急联系人</td>
                            <td class="le-ri">
                              <el-input type="text" list="personlist"  @input="e => stuData.contactPeople = validForbid(e)" v-model.trim="stuData.contactPeople"></el-input>
                            </td>
                            <td class="gary">联系电话</td>
                            <td style="padding-left: 1%" class="txt-phone">
                              <el-input v-model.trim="stuData.phone"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">籍贯</td>
                            <td colspan="6" class="le-ri">
                              <el-input v-model.trim="stuData.nativePlace" @input="e => stuData.nativePlace= validForbid(e)"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">家庭住址</td>
                            <td colspan="6" class="le-ri">
                              <el-input v-model.trim="stuData.homeAddress" @input="e => stuData.homeAddress= validForbid(e)"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">寄住地址</td>
                            <td colspan="6" class="le-ri">
                              <el-input v-model.trim="stuData.presentAddress" @input="e => stuData.presentAddress= validForbid(e)"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">生理缺陷</td>
                            <td colspan="6" class="le-ri">
                              <el-input v-model.trim="stuData.physicalDefect" @input="e => stuData.physicalDefect= validForbid(e)"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">兴趣与特长</td>
                            <td colspan="6" class="le-ri">
                              <el-input v-model.trim="stuData.interest" @input="e => stuData.interest= validForbid(e)"></el-input>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" class="gary font-left">个人病史</td>
                            <td colspan="6" class="le-ri">
                              <el-input v-model.trim="stuData.medicalHistory" @input="e => stuData.medicalHistory= validForbid(e)"></el-input>
                            </td>
                          </tr>
                        </table>
                      </el-row>

                      <!--  2. 学习经历  -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">2. 学习经历</div>
                        </el-col>
                      </el-row>
                      <learn-experience @learnData='learnData' :educationList='stuData.educationList ? stuData.educationList : []'></learn-experience>

                      <!--  3.生活事件  -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">3. 生活事件</div>
                        </el-col>
                      </el-row>
                      <el-row class="margin-btm">
                        <table border="1" cellpadding="0" cellspacing="0" class="table-events">
                          <tr>
                            <td rowspan="7" style="width: 180px;color: #999">影响个人生活的重大事件（有/无）</td>
                          </tr>
                          <tr>
                            <td style="width:400px;color: #999">家庭成员死亡</td>
                            <td colspan="2"><el-radio :label="'1'" v-model="stuData.familyDeath"><i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                              <el-radio :label="'0'" v-model="stuData.familyDeath"><i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">父母离异</td>
                            <td colspan="2"><el-radio :label="'1'" v-model="stuData.parentDivorce"><i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                              <el-radio :label="'0'" v-model="stuData.parentDivorce"><i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">与教师、同学关系紧张</td>
                            <td colspan="2"><el-radio  :label="'1'"  v-model="stuData.tenseRelation"><i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                              <el-radio  :label="'0'"  v-model="stuData.tenseRelation"><i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr >
                            <td style="color: #999">生活条件改变</td>
                            <td colspan="2"><el-radio :label="'1'"  v-model="stuData.lifeChange"><i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                              <el-radio  :label="'0'"  v-model="stuData.lifeChange"><i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">影响生活的重大挫折</td>
                            <td colspan="2"><el-radio :label="'1'"  v-model="stuData.turningPoint"><i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                              <el-radio :label="'0'"  v-model="stuData.turningPoint"><i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">其他</td>
                            <td colspan="2"><el-radio :label="'1'"  v-model="stuData.otherEvent"><i class="radio-i" :style="{background: theme}"></i>是</el-radio>
                              <el-radio :label="'0'"  v-model="stuData.otherEvent"><i class="radio-i" :style="{background: theme}"></i>否</el-radio></td>
                          </tr>
                          <tr>
                            <td style="color: #999">事件描述</td>
                            <td colspan="3" class="inputText" style="padding: 0 1%;position: relative">
                              <el-input
                                    style="font-size: 14px;"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="请输入内容"
                                    v-model.trim="stuData.eventDesc">
                            </el-input>
                              <span v-if="stuData.eventDesc == null" style="position: absolute;right: 4%;bottom: -5%;color: #C3C3C3; font-size: 12px"></span>
                              <span v-else style="position: absolute;right: 4%;bottom: -5%;color: #C3C3C3; font-size: 12px">{{stuData.eventDesc.length}} / 100</span>
                            </td>
                          </tr>
                        </table>
                      </el-row>

                      <!-- 4. 生活与烦恼 -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">4. 生活与烦恼</div>
                        </el-col>
                      </el-row>
                      <el-row class="margin-btm">
                        <el-col :span="24">
                          <el-row>
                            <problems @proData='proData' :problemList='stuData.problemList ? stuData.problemList : []'></problems>
                          </el-row>
                        </el-col>
                      </el-row>

                      <!-- 5. 自我评价 -->
                      <el-row>
                        <el-col :span="24">
                          <div class="hurdle-1 bg-pale-pink">5. 自我评价</div>
                        </el-col>
                      </el-row>
                      <el-row class="margin-btm">
                        <self-assess @assessData='assessData' :selfList='stuData.selfList'></self-assess>
                      </el-row>

                      <!-- 按钮 -->
                      <div class="from-btn">
                        <el-button class="edit-btn" round @click="goBack">返回</el-button>
                        <el-button class="submit-btn" round style="margin-left: 10%" @click="submit">提交</el-button>
                      </div>
                    </el-form>
                  </el-card>
                  </el-col>
                </el-row>
              </div>

            </el-tabs>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { studentDetail, updateArchive } from '@/api/user/manageIndex'
import learnExperience from './learnExperience'
import problems from './problems'
import selfAssess from './selfAssess'
import rules from '../mixins/rules'
import nationalitys from "@/mixin/baseData/nationalitys"
export default {
  mixins: [ rules,nationalitys ],
  data () {
    return {
         pickerOptions0: {
            disabledDate(time) {
            return time.getTime() > Date.now();//如果没有后面的-8.64e6就是不可以选择今天的
            }
        },
      isShow: true,
      isHidden: false,
      activeName: '1',
      theme:'#fc994a',
      userId: '',
      stuData: {},
      likeLevel: '',
      booleds: [
        { key: '0', value: 'A型' },
        { key: '1', value: 'B型' },
        { key: '2', value: 'AB型' },
        { key: '3', value: 'O型' },
        { key: '4', value: '未知' }
      ],
      status: [
        { key: '0', value: '健康' },
        { key: '1', value: '良好' },
        { key: '2', value: '欠佳' }
      ],
      stuData1: {
        archiveId: '',
        userName: '',
        userSex: '',
        nationality: '',
        birthday: '',
        bloodType: null,
        healthStatus: null,
        contactPeople: null,
        phone: '',
        nativePlace: '',
        homeAddress: '',
        presentAddress: '',
        physicalDefect: '',
        interest: '',
        medicalHistory: '',
        livingCondition: null,
        familyAtmo: null,
        educationList: [],
        familyDesc: '',
        parentDivorce: '',
        tenseRelation: '',
        lifeChange: '',
        turningPoint: '',
        otherEvent: '',
        eventDesc: '',
        problemList: [],
        selfList: []
      }
    }
  },
  components: {
    learnExperience,
    problems,
    selfAssess
  },
  computed: {
    ...mapGetters([
      'user', 'isSchool', 'isStudent'
    ])
  },
  watch: {
    stuData: {
      handler () {
        this.stuData.problemList.forEach(item => {
          if (item.problem.length > 50) {
            this.Submit = false
          } else {
            this.Submit = true
          }
        })
      },
      deep:true
    }
  },
  created () {
    this.getInfo()
  },

  methods: {
    handleClick (tab, event) {},
    // 档案接口
    getInfo () {
      studentDetail(this.user.userId).then((res) => {
        this.stuData = res.data
        this.stuData1 = res.data
      })
    },
    // 学习经历
    learnData (data) {
      this.stuData1.educationList = data
    },
    // 生活与烦恼
    proData (data) {
      this.stuData1.problemList = data
    },
    // 自我评价
    assessData (data) {
      this.stuData1.selfList = data
    },

    // 提交
    submit () {
      let that=this
      let arr=[]
      let educationList=that.stuData.educationList
      educationList.forEach(element => {
        // console.log(element.endDate==null|| element.startDate==null|| new Date(element.startDate).getTime()>new Date(element.endDate).getTime())
        if(element.endDate=='' || element.endDate==null|| element.startDate=='' || element.startDate==null|| new Date(element.startDate).getTime()>new Date(element.endDate).getTime()){
         arr.push('1')
        }else{
          arr.push('0')
        }
      })
      setTimeout(() => {
        if (arr.indexOf('1')>-1) {
         that.$message.error('请输入正确的学习经历时间！')
         arr=[]
			  }else{
         that.getNewStatus(educationList)
        }
      },400);
    },
    getNewStatus(educationList){
            var reg = /^1[3456789]\d{9}$/
      if (reg.test(this.stuData.phone) == false) {
        this.$message.error('请输入正确的手机号！')
      } else if (this.stuData.nativePlace != null && this.stuData.nativePlace.length > 20) {
        this.$message.error('不能超过20个字符')
      } else if (this.stuData.nationality != null && this.stuData.nationality.length > 10) {
        this.$message.error('不能超过10个字符')
      } else if ((this.stuData.homeAddress != null && this.stuData.homeAddress.length > 50) || (this.stuData.presentAddress != null && this.stuData.presentAddress.length > 50) ||
              (this.stuData.physicalDefect != null && this.stuData.physicalDefect.length > 50) ||
              (this.stuData.medicalHistory != null && this.stuData.medicalHistory.length > 50) || (this.stuData.interest != null && this.stuData.interest.length > 50)) {
        this.$message.error('不能超过50个字符')
      } else if (this.stuData.eventDesc != null && this.stuData.eventDesc.length > 100) {
        this.$message.error('不能超过100个字符')
      }else if (this.stuData.problemList != 0) {
        this.stuData.problemList.forEach(item => {
          if (item.problem.length > 50) {
            this.$message.error('不能超过50个字符')
            this.Submit = false
          }
        })
        if (this.Submit && !educationStatus) {
          this.stuData1.archiveId = this.stuData.archiveId
          updateArchive(this.stuData).then((res) => {
            if (res.data == true) {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.isHidden = !this.isHidden
              this.isShow = !this.isShow
            } else {
              let msg = res.message ? res.message : '修改失败'
              this.$message.error(msg)
            }
          })
        }
      } else {
        this.stuData1.archiveId = this.stuData.archiveId
        updateArchive(this.stuData).then((res) => {
          if (res.data == true) {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.isHidden = !this.isHidden
            this.isShow = !this.isShow
          } else {
            let msg = res.message ? res.message : '修改失败'
            this.$message.error(msg)
          }
        })
      }
    },
    onShow () {
      this.isShow = !this.isShow
      this.isHidden = !this.isHidden
    },
    goBack () {
      this.isHidden = !this.isHidden
      this.isShow = !this.isShow
    }
  }

}
</script>

<style lang="less" scoped>
.info-my{
  //个人档案基本样式
  ::v-deep .el-form{
    margin-left: 0;
  }
  .datas{
    ::v-deep .el-card__body{
      padding:5px 20px;
    }
  }
  .basic-info {
    border: none !important;
    padding: 0 !important;
    tbody{
      font-size: 14px
    }
    .info_warp{
       .el-form-item__content{
        border: 1px solid #999; // 只展示状态下展示边框
        height: 35px;
        line-height: 35px;
        padding-left: 15px;
      }
    }
    .hurdle-1 {
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      color: #333;
      font-weight: bold;
    }
    .el-row .el-col {
      line-height: 50px;
      font-size: 14px;
    }
    .table-events {
      // border-color: #999;
      border:1px solid rgb(135,153,153);
      border-collapse: collapse;
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
    }
    .table-info{
      border-color: #999;
      border-collapse: collapse;
      width: 100%;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      td{
        width: 12.5%;
      }
      .gary{
        color: #999 !important;
      }
      .font-left{
        text-align: left;
        padding-left: 3.8%;
      }
      .font-ri{
        text-align: left;
        padding-left: 5%;
      }
      .le-ri{
        padding: 0 1% !important;
      }
    }
    .margin-btm{
      margin-bottom: 4%;
    }
    .check-style{
      font-size: 20px;
      font-weight: 700!important;
    }
    .clear-mg{
        margin: 0
    }

    .el-popover {
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.25)!important;
    }
    .personal-form label{
        font-weight: 500;
        font-size: 16px
    }
    .from-btn{
      width: 100%;
      text-align: center;
      margin-top: 5%;
      .el-button--mini, .el-button--mini.is-round{
        padding: 1% 5%;
      }
      .el-button--mini, .el-button--small{
        font-size: 16px;
      }
    }
  }
  .edit-warp{
    .el-input--mini .el-input__inner{
      border-color: #E0E0E0;
      height: 35px;
      line-height: 35px;
    }
    .el-select{
      width: 100%;
    }
  }
  /* 生活重大事件 单选按钮 */
  /deep/ .el-radio {
    width: 110px !important;
  }
  /deep/ .el-table_2_column_11{
    text-align: left !important;
  }
  /deep/ .el-radio__input.is-checked .el-radio__inner{
    background: #F36421;
    border-color: #F36421;
  }
  /deep/ .el-radio__input.is-checked+.el-radio__label{
    color: #F36421;
  }
  /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner::after{
    background: #fff;
  }
  /*表头背景颜色*/
  /deep/.el-table thead.is-group th{
    background: none !important;
  }
  /* 表格鼠标悬停背景色 */
  /deep/ .el-table tbody tr:hover>td{
    background: none;
  }
  /* 表格边框颜色 */
  /deep/ .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #999;
  }
  /deep/ .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #999;
  }
  /deep/ .el-input--mini .el-input__inner{
    border: none;
    font-size: 14px !important;
    text-align: center;
  }
  /deep/ .el-textarea__inner{
    border: none;
  }
  .edit-btn{
    background: #ffeddd;
    color: #F36421;
    border: none;
    outline: none;
  }
  .submit-btn{
    background: #F36421;
    color: #fff;
    border: none;
    outline: none;
  }
}
</style>
