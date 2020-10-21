export default {
    methods: {
        // 数字转汉字 1 => 一
        numberToChinese(number) {
            number = JSON.stringify(number)
            let unit = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        
            let sec = '';
            let sec_c = '';
        
            let part = number.split('.')
            if (part[1] * 1 > 0) {
                sec_c = part[1].split('');
                sec = unit[sec_c[0]] + '角' + unit[sec_c[1]] + '分';
            }
        
            if (part[0] * 1 == 0) {
                return '零' + sec;
            }
        
            let i = part[0].length;
            let j = 12 - i;
        
            if (j < 0) {
                return;
            }
        
            let zero = '';
        
            for (j; j > 0; j--) {
                zero = zero + '0';
            }
        
            sec_c = zero + part[0];
        
            sec_c = sec_c.split('');
        
            let sec_1 = '';
            let sec_2 = '';
            let sec_3 = '';
        
            for (j = 0; j < 12; j++) {
                if (j < 4) {
                    sec_1 = sec_1 + sec_c[j];
                }
                if (j < 8 && j > 3) {
                    sec_2 = sec_2 + sec_c[j];
                }
                if (j < 12 && j > 7) {
                    sec_3 = sec_3 + sec_c[j];
                }
            }
            let p_1 = this.convertFour(sec_1);
            let p_2 = this.convertFour(sec_2);
            let p_3 = this.convertFour(sec_3);
        
            if (p_1 > '') {
                if (sec_2 * 1 > 999) {
                    p_1 = p_1 + '亿';
                }
                else {
                    p_1 = p_1 + '亿零';
                }
            }
        
            if (p_2 > '') {
                if (sec_3 * 1 > 999) {
                    return p_1 + p_2 + '万' + p_3 + '' + sec;
                }
                else {
                    return p_1 + p_2 + '万零' + p_3 + '' + sec;
                }
            }
            else {
                return p_1 + p_3 + '' + sec;
            }
        },
        
        convertFour(number) {
            let unit = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            let a = number.split('');
        
            let s = '';
            let r_1 = 0;
            let r_2 = 0;
            if (a[0] * 1 > 0) {
                s = unit[a[0]] + '千';
                r_1 = 1;
            }
        
            if (a[1] * 1 > 0) {
                s = s + unit[a[1]] + '百';
                r_2 = 1;
            }
            else if (r_1 > 0 && (a[2] > 0 || a[3] > 0)) {
                s = s + '零';
            }
        
            if (a[2] * 1 > 0) {
                if (parseInt(number) > 9 && parseInt(number) < 20) {
                    s = '十';
                } else {
                    s = s + unit[a[2]] + '十';
                }
            }
            else if (r_2 > 0 && a[3] > 0) {
                s = s + '零';
            }
        
            if (a[3] * 1 > 0) {
                s = s + unit[a[3]];
            }
        
            return s;
        
        }
    }
}