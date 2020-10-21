/*
 * @Author: 李素素 
 * @Date: 2019-08-23 16:51:13 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-24 15:06:57
 */
export default {
    filters: {
        sToTime: function (s) {
            s = parseInt(s)
            if (!s) {
                return '00:00'
            }
            var h;
            s = parseInt(s);
            h = Math.floor(s/60);
            s = s%60;
            h +=  '';
            s += '';
            h = (h.length==1) ? '0'+ h:h;
            s = (s.length==1) ? '0'+ s:s;
            return h +':'+ s;
        }
    },
}