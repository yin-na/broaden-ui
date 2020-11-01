/*
 * @Author: 孟如月 
 * @Date: 2019-09-05 11:27:22 
 * @Last Modified by: 李素素
 * @Last Modified time: 2019-09-16 14:51:54
 */
export default {
    filters: {
        replaceHtml: function (content) {
            if (!content) {
                return ''
            }
            let newstr = '';
            newstr = content.replace(/<[^>]*>/g,'').replace(/\s/g, '&nbsp;');
            newstr = newstr.replace(" ", '');
            newstr = newstr.replace(/&nbsp;/gi,'');

            
            return newstr.substring(0, 100);
        }
    },
}