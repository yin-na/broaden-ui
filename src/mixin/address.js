import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
			addressData:[],  //省
			shi1: [], //市
			qu1: [],   //区
			street: [] //街道
        }
    },
	computed: {
        ...mapGetters([
			'addressDataList'
		]),
	},
    methods: {
		...mapActions('user', [
			'getAddressData'
		]),
		// 加载china地点数据，三级
		async getCityData() {
			let data;
			if (this.addressDataList.length > 0) {
				data = this.addressDataList
			} else {
				data = await this.getAddressData()
			}
			this.addressData = data.records
			if(data.deptLevel == 1 || data.deptLevel == 0){
				let arr = data.records[0]
				if(this.query){
					this.query.deptProvince = arr.areaId
				}
				
				for (let i in this.addressData) {
					this.shi1 = this.addressData[i].childrenList
				}
				/* let arr2 = []
				for (let k in this.shi1) {
					for(let q in this.shi1[k].childrenList){
						arr2.push(this.shi1[k].childrenList[q])
					}
				}
				this.qu1 = arr2;
				let arr3 = []
				for (let k in this.qu1) {
					for(let q in this.qu1[k].childrenList){
						arr3.push(this.qu1[k].childrenList[q])
					}
				}
				this.street = arr3; */
			}else if(data.deptLevel == 2){
				let arr = data.records[0]
				this.shi1 = arr.childrenList
				this.qu1 = arr.childrenList[0].childrenList
				//wdd
				if(this.query){
					this.query.deptProvince = arr.areaId
					this.query.deptCity = this.shi1[0].areaId
				/* 	this.query.deptCounty =this.qu1[0].areaId */
				}
				/* let sList = []
				if(this.query){
					this.query.deptProvince = arr.areaId
					this.query.deptCity = this.shi1[0].areaId
				}
				for (let k in this.qu1) {
					for(let q in this.qu1[k].childrenList){
						sList.push(this.qu1[k].childrenList[q])
					}
				}
				this.street = sList; */
			}else if(data.deptLevel == 3 || data.deptLevel == 4){
				let arr = data.records[0]
				this.shi1 = arr.childrenList
				this.qu1 = this.shi1[0].childrenList
				this.street = this.qu1[0].childrenList
				if(this.query){
					this.query.deptProvince = arr.areaId
					this.query.deptCity = this.shi1[0].areaId
					this.query.deptCounty =this.qu1[0].areaId
				}
				
			}
		},
		resetSSQ(){
			if(this.addressDataList.deptLevel == 0 || this.addressDataList.deptLevel == 1){
				if(this.addressDataList.deptLevel == 0){// 管理员 清空省份信息后，市级下拉信息清空
					this.shi1 = [] //市
				}
				this.qu1 = [] //区
				this.street = [] //街道
			}else if(this.addressDataList.deptLevel == 2){
				this.street = [] //街道
			}
		},
		getSSQ(){
			let [...data] = this.addressDataList.records
			data.forEach((item)=>{
				if(item.areaId == this.form.deptProvince){
					this.shi1 = item.childrenList
				}
			})
			
			let [...shi] = this.shi1
			shi.forEach((item)=>{
				if(item.areaId == this.form.deptCity){
					this.qu1 = item.childrenList
				}
			})
			
			let [...qu] = this.qu1
			qu.forEach((item)=>{
				if(item.areaId == this.form.deptCounty){
					this.street = item.childrenList
				}
			})
		},
        // 选省
        choseProvince(e) {
			this.shi1 = []
			this.qu1 = []
			this.street = []
            for (var index2 in this.addressData) {
                if (e === this.addressData[index2].areaId) {
					this.shi1 = this.addressData[index2].childrenList
                    this.query.deptCity = ''
                    this.query.deptCounty = ''
					this.query.deptTowns = ''
					this.form.deptCity = ''
					this.form.deptCounty = ''
					this.form.deptTowns = ''
                }
            }
        },
        // 选市
        choseCity(e) {
			this.qu1 = []
			this.street = []
            for (var index3 in this.shi1) {
                if (e === this.shi1[index3].areaId) {
                    this.qu1 = this.shi1[index3].childrenList
                    this.query.deptCounty = ''
					this.query.deptTowns = ''
					this.form.deptCounty = ''
					this.form.deptTowns = ''
                }
            }
        },
        // 选区
        choseBlock(e) {
			this.street = []
			console.log(this.qu1)
            for (var index4 in this.qu1) {
                if (e === this.qu1[index4].areaId) {
                    this.street = this.qu1[index4].childrenList
                    this.query.deptTowns = ''
                    this.form.deptTowns = ''
                }
            }
        }
    }
}