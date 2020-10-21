import request from '@/utils/request'

// // 查询门户网站动态数据
// export function dynamicModuleDat(params) {
//     return request({
//         url: '/dynamicModule/queryDynamicModuleData',
//         method: 'get',
//         params
//     })
// }

//沙盘预约基本信息列表
export function sandrecordlist(data) {
    return request({
        url: '/sand/body/sandList',
        method: 'post',
        data
      })
  }

//体验群体
export function getSandPeople(data) {
    return request({
        url: '/sand/body/getSandPeople',
        method: 'post',
        data
      })
  }

  //获取省份
  export function getProvince(data) {
    return request({
        url: '/city/getProvince',
        method: 'post',
        data
      })
  }

  //获取市或区
  export function getCityByPid(id) {
    return request({
        url: '/city/getCityByPid/'+id,
        method: 'post'
      })
  }

  //查看机构详情
  export function selectInto(id) {
    return request({
        url: '/sand/body/selectInto?deptId='+id,
        method: 'post'
      })
  }

  
//获取城市及其上级
export function getPCity(id) {
    return request({
        url: '/city/getPCity/'+id,
        method: 'post'
      })
  }

  //最新动态  
  export function getInformationVOById(id) {
    return request({
        url: '/information/getInformationVOById/'+id,
        method: 'post'
      })
  }

  //添加沙盘预约 
  export function recordsave(data) {
    return request({
        url: '/sand/record/save',
        method: 'post',
        data
      })
    }

  //沙盘预约记录  
  export function getRecordList() {
    return request({
        url: '/sand/record/getRecordList',
        method: 'get'
    })
}





//沙盘咨询师端


//沙盘预约列表
export function recordlist(data) {
  return request({
      url: '/sand/record/list',
      method: 'post',
      data
    })
  }

  //沙盘预约列表导出
export function recordallExcel(data) {
  return request({
      url: '/sand/record/allExcel',
      method: 'post',
      responseType: 'arraybuffer',
      data
    })
  }

  //沙盘体验记录列表
export function recorDetaillist(data) {
  return request({
      url: '/sand/record-detail/list',
      method: 'post',
      data
    })
  }

  //沙盘新增预约
export function sandrecordsave(data) {
  return request({
      url: '/sand/record/save',
      method: 'post',
      data
    })
  }

  //沙盘体验记录导出
 export function recorDetailexportOrg(data) {
  return request({
      url: '/sand/record-detail/exportOrg',
      method: 'post',
      responseType: 'arraybuffer',
      data
    })
  }
  
  
// 沙盘预约删除
export function sandrecorddelete(data) {
  return request({
      url: '/sand/record/delete',
      method: 'delete',
      data
    })
  }


//沙盘预约单个详情
export function getOneById(id) {
  return request({
      url: '/sand/record/getOneById/'+id,
      method: 'post'
    })
  }

  
//沙盘预约团体详情
export function recordTearmDetail(id) {
  return request({
      url: '/sand/record-detail/getOneById/'+id,
      method: 'post'
    })
  }

  //获取婚姻状况
  export function getMarriage(data) {
    return request({
        url: '/advisory/getMarriage',
        method: 'post',
        data
      })
    }

 //沙盘预约个体添加 
 export function getnewSand(data) {
  return request({
      url: '/sand/record-detail/save',
      method: 'post',
      data
    })
  }

//沙盘预约单个详情根据预约记录id
export function sanDetailgetOneByRid(id) {
  return request({
      url: '/sand/record-detail/getOneByRid/'+id,
      method: 'post',
    })
  }

 
// //体验记录删除
export function delectList(data) {
  return request({
      url: '/sand/record-detail/delectList',
      method: 'post',
      data
    })
  }