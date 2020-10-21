/*
 * @Author: 孟如月 
 * @Date: 2019-07-23 13:30:27 
 * @Last Modified by: 孟如月
 * @Last Modified time: 2019-07-23 13:31:03
 */
//时间过滤 秒转 时分秒
export default {
    filters:{
        filtersTimeChange: function (seconds) {
            if (seconds || seconds === 0) {
                var sec = Number(seconds);
                var hh = (sec / 3600) >= 1 ? Math.floor(sec / 3600) : 0;
                var mm = ((sec - hh * 3600) / 60) >= 1 ? Math.floor((sec - hh * 3600) / 60) : 0;
                var ss = sec - hh * 3600 - mm * 60;
                if (hh > 0) {
                    return hh + '时' + mm + '分' + ss + '秒';
                }
                if(hh <= 0 && mm > 0){
                    return  mm + '分' + ss + '秒';
                }else{
                    return   ss + '秒';
                }
            } else {
                return '——';
            }
        }
    }
}