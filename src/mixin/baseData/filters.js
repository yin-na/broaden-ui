export default {
    filters: {
		findCompanyType:function (value, list){
			if (!value) {
                return ''
			}

			let index = list.map(item => parseInt(item.value)).indexOf(parseInt(value))
			let result = index >= -1 ? list[index] ? list[index].name || list[index].label : '' : ''
            
            return result
		},
	},
}
