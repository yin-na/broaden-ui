import request from '@/utils/request'

// 心理体检列表
export function scaleList (data) {
  return request({
    url: '/scale/scaleList',
    method: 'post',
    data
  })
}
// 太空舱表格
export function cloudTable (data) {
  return request({
    url: '/DetectionReport/queryAllPage',
    method: 'post',
    data
  })
}

// 呐喊宣泄列表
export function shoutTable (current, date) {
  return request({
    url: '/CatharsisReport/queryReportList?current=' + current + '&date=' + date + '&size=5',
    method: 'get'
  })
}

// 个人检测次数
export function frequency (date,source) {
  return request({
    url: '/DetectionReport/userCheckCount?date=' + date +'&source=' +source,
    method: 'get'
  })
}

// 压力分析个人检测次数
export function stressquency (date) {
  return request({
    url: '/PsychologicalReport/userCheckCount?date=' + date,
    method: 'get'
  })
}

//压力分析曲线图
export function stresscurve () {
  return request({
    url: '/PsychologicalReport/queryCharData',
    method: 'get'
  })
}

//压力分析表格
export function stressTable (data) {
  return request({
    url: '/PsychologicalReport/allPageQuery',
    method: 'post',
    data
  })
}
//压力分析详情
export function stressDetail (id){
  return request({
    url: '/PsychologicalReport/queryReportDetail?psychologicalId=' + id,
    method: 'get'
  })
}

// 呐喊检测次数
export function getShoutData (date) {
  return request({
    url: '/CatharsisReport/queryCardInfo?date=' + date,
    method: 'get'
  })
}

// 呐喊曲线
export function getShoutLine (date) {
  return request({
    url: '/CatharsisReport/queryShoutLine?date=' + date,
    method: 'get'
  })
}

// 呐喊详情
export function ShoutDetails (id) {
  return request({
    url: '/CatharsisReport/queryReportDetail?shoutId=' + id,
    method: 'get'
  })
}

// 心率曲线图
export function HeartRateCurve (source) {
  return request({
    url: '/DetectionReport/queryCharData?source='+source,
    method: 'get'
  })
}

// 心服务标签
export function HeartService () {
  return request({
    url: '/intervention/article/getAllArticleType',
    method: 'get'
  })
}

// 心服务文章
export function HeartServicebook (data) {
  return request({
    url: '/intervention/article/getAllArticleByType',
    method: 'post',
    data
  })
}

//热门课程
export function hotClass() {
  return request({
    url: '/heartService/essay/getEssayByType?type=',
    method: 'get'
  })
}

//热门课程详情
export function hotClassDetail(id,dictId) {
  return request({
    url: '/heartService/essay/getEssayById/'+id +'?dictId='+dictId,
    method: 'get'
  })
}

// 考试与证书
export function HeartServicetext () {
  return request({
    url: '/heartService/examination/getExaminationByType?type=',
    method: 'get'
  })
}

//预约须知详情
export function haveToKnow () {
  return request({
    url: '/intervention/intervene/appointmentNotice',
    method: 'get'
  })
}

//预约须知详情
export function KnowTreaty() {
  return request({
    url: '/intervention/intervene/appointmentAgreement',
    method: 'get'
  })
}

// 考试与证书详情
export function HeartServicetextDetail (id,dictId) {
  return request({
    url: '/heartService/examination/getExaminationById/'+id +'?dictId='+dictId,
    method: 'get'
  })
}

// 讲座视频
export function LectureVideo () {
  return request({
    url: '/heartService/giveType/getGiveTypeType',
    method: 'get'
  })
}

//热门课程详情

export function getArticleDetail (id,dictId) {
  return  request({
    url:'/intervention/article/getArticleById/'+id +'?dictId='+dictId,
    method:'get'
  })
}

//视频讲座详情

export function getvideoTeachDetail (id,dictId) {
  return  request({
    url:'/heartService/giveType/getGiveTypeById/'+id+'?dictId='+dictId,
    method:'get'
  })
}
// 师资力量
export function getFaculty (data) {
  return request({
    url: '/intervention/counselor/counselorList',
    method: 'post',
    data
  })
}

// 视频文章
export function VideoArticles (type) {
  return request({
    url: '/heartService/giveType/getGiveTypeByType?type=' + type,
    method: 'get'
  })
}

// 太空舱详情
export function CapsuleDetails (id) {
  return request({
    url: '/DetectionReport/queryReportDetail?detectionId=' + id,
    method: 'get'
  })
}

// 心理体检列表详情
export function scaleDeil (id) {
  return request({
    url: '/scale/scaleDeil?id=' + id,
    method: 'get'
  })
}

// 心理体检答题页
export function answerList (id) {
  return request({
    url: '/scaleSubject/scaleSubjectList/' + id,
    method: 'post'
  })
}

// 心理体检提交
export function saveSubmit (data) {
  return request({
    url: '/testRecord/saveTestRecord',
    method: 'post',
    data
  })
}

// 心理体检提交
export function recordDetail (id) {
  return request({
    url: '/testRecord/getTestRecordDetail/' + id,
    method: 'post'
  })
}

// 脑波认知 来访者图表信息
export function chartMain () {
  return request({
    url: '/courseReport/chartMain',
  })
}

// 查询脑波的次数曲线
export function getBraveCurve (date) {
  return request({
    url: '/courseReport/queryBrainLine?date=' + date,
    method: 'get'
  })
}

// 来访者 认知列表信息
export function courseReport (data) {
  return request({
    url: '/courseReport/page?date=' + data,
    method: 'get'
  })
}

// 来访者 详情接口
export function reportDetail (id) {
  return request({
    url: '/courseReport/reportDetail?courseId=' + id,
    method: 'get'
  })
}

// 来访者 用户信息卡片
export function queryCardInfo (data) {
  return request({
    url: '/courseReport/queryCardInfo?date=' + data,
    method: 'get'
  })
}

// 脑波详情
export function getBravedetail (id) {
  return request({
    url: '/courseReport/reportDetail?courseId=' + id,
    method: 'get'
  })
}
