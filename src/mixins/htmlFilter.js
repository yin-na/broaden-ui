export default {
    filters: {
        htmlfilter: function (val) {
            if (val != null) {
              return val.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
            }
        },
        htmlfilterwithCut: function (val) {
            if (val != null) {
                let result = val.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
                if (result.length>150) {
                    result=result.substring(0,150)+'......'
                }
                return result
            }
          },
	},
}
