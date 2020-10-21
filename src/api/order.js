import request from '@/utils/request'

//来访者查询当前用户预约记录
export function appointmentRecord(data) {
    return request({
        url:  '/intervention/appointment/getAppointmentRecord',
        method: 'post',
        data
  })
}

//查询心理咨询师分页
export function ConsultantPagination(data) {
    return request({
        url:  '/intervention/counselor/counselorListPage',
        method: 'post',
        data
  })
}

//获取咨询师咨询方式
export function ConsultingApproach(params) {
    return request({
        url: '/intervention/counselor/getAllCounselorConsultType',
        method: 'get',
        params
    })
}

//获取咨询师擅长领域
export function expertiseAreas(params) {
    return request({
        url: '/intervention/counselor/getAllCounselorSpecializeTerritory',
        method: 'get',
        params
    })
}

// 根据id查询咨询师
export function getdoctorDetail(id) {
    return request({
        url: '/intervention/counselor/getCounselorById/'+id,
        method: 'get'
    })
}   

//修改状态  
export function changestatus(data) {
    return request({
        url:  '/intervention/appointment/updateStatusById',
        method: 'post',
        data
  })
}

//查询咨询师中未来一周可以预约的时间段
export function getweekTime(id) {
    return request({
        url:  '/intervention/appointment/getAppointmentTime/'+id,
        method: 'post'
  })
}


// 添加一条预约记录
export function addSubscribe(data) {
    return request({
        url:  '/intervention/appointment/addAppointment',
        method: 'post',
        data
  })
}


// 消息通知
export function getnews(data) {
    return request({
        url:  '/visitorInform/getVisitorInformByUserId',
        method: 'post',
        data
  })
}

//展示所有倾诉 
export function getPouroutList(data){
    return request({
        url:  '/relaxTalk/relax-talk/getDeptList',
        method: 'post',
        data
  })
}

//添加放飞记录
export function addPouroutList(data){
    return request({
        url:  '/relaxTalk/relax-talk/sava',
        method: 'post',
        data
  })
}


//历史放飞记录
export function getPourhistory(data){
    return request({
        url:  '/relaxTalk/relax-talk/oldList',
        method: 'post',
        data
  })
}

//推荐问答  
export function getRecommendation(data) {
    return request({
        url: '/problem/getRecommendProblem',
        method: 'post',
        data
    })
} 

//最新回答  
export function getLatestanswer(data) {
    return request({
        url: '/problem/getNewProblem',
        method: 'post',
        data
    })
} 

//获取30天内的精华问题
export function Essenceproblem(data) {
    return request({
        url: '/problem/getEssenceProblem',
        method: 'post',
        data
    })
} 

//精选分类
export function getSelectedchoice(){
    return request({
        url:  '/problem/getDictValueProblem',
        method: 'get',
  })
}

//获赞数
export function complimentsNum(){
    return request({
        url:  '/problem/getPersonageVOByUser',
        method: 'get'
  })
}

//提问或修改问题
export function addquestion(data){
    return request({
        url:  '/problem/saveProblem',
        method: 'post',
        data
  })
}

//我的回答  
export function getMyAnswer(data){
    return request({
        url:  '/answer/getMyAnswer',
        method: 'post',
        data
  })
}

//我的提问
export function getMyProblem(data){
    return request({
        url:  '/problem/getMyProblem',
        method: 'post',
        data
  })
}

//添加或修改一个回答
export function saveMyAnswer(data){
    return request({
        url:  '/answer/saveAnswer',
        method: 'post',
        data
  })
}

//删除一个问题
export function deleteProblem(id){
    return request({
        url:  '/problem/deleteProblem/'+id,
        method: 'delete'
  })
}

//删除一个回答
export function deleteanswer(id){
    return request({
        url:  '/answer/deleteAnswer/'+id,
        method: 'delete'
  })
}

//查看问题详情
export function getproblemItem(pid){
    return request({
        url:  '/problem/getProblemDetail/'+pid,
        method: 'get'
  })
}

//查看回答详情
export function getanswerItem(id){
    return request({
        url:  '/answer/getAnswerDetail/'+id,
        method: 'get'
  })
}

//添加一个评论 
export function addyoucomment(data){
    return request({
        url:  '/comment/saveComment',
        method: 'post',
        data
  })
}

//举报回答  
export function reportsomeone(data){
    return request({
        url:  '/inform/informProblem',
        method: 'post',
        data
  })
}

//举报标签
export function addreport(){
    return request({
        url:'/inform/getInformDictValue',
        method:'get'
    })
}

//给某个回答点赞
export function addthumbsup(aid){
    return request({
        url:  '/giveLike/giveLikeToAnswer/'+aid,
        method: 'post'
  })
}


//给某个回答取消点赞 
export function delethumbsup(aid){
    return request({
        url:  '/giveLike/delGiveLikeToAnswer/'+aid,
        method: 'post'
  })
}