// import { page } from '@/api/base/data'

// export default {
//   data () {
//     return {
//       loading: true,
//       data: [],
//       page: 1,
//       size: 20,
//       total: 0,
//       url: '',
//       params: {},
//       query: {},
//       time: 170
//     }
//   },
//   methods: {
//     async init () {
//       if (!await this.beforeInit()) {
//         return
//       }
//       return new Promise((resolve, reject) => {
//         this.loading = true
//         this.params.page = this.page
//         this.params.size = this.size
//         page(this.url, this.params).then(res => {
//           this.total = res.data.total
//           this.data = res.data.data
//           setTimeout(() => {
//             this.loading = false
//           }, this.time)
//           resolve(res)
//         }).catch(err => {
//           this.loading = false
//           reject(err)
//         })
//       })
//     },
//     beforeInit () {
//       return true
//     },
//     pageChange (e) {
//       this.page = e
//       this.init()
//     },
//     sizeChange (e) {
//       this.page = 1
//       this.size = e
//       this.init()
//     }
//   }
// }

// import { page } from '@/api/base/data'

// export default {
//   data () {
//     return {
//       loading: true,
//       method: 'get',
//       data: [],
//       current: 1,
//       size: 20,
//       total: 0,
//       url: '',
//       params: {},
//       query: {},
//       time: 170
//     }
//   },
//   methods: {
//     async init () {
//       if (!await this.beforeInit()) {
//         return
//       }
//       return new Promise((resolve, reject) => {
//         this.loading = true
//         this.params.current = this.current
//         this.params.size = this.size
//         page(this.url, this.params, this.method).then(res => {
//           this.total = res.data.total
//           this.data = res.data.data

//           console.log(this.data)
//           console.log(this.total)
//           // eslint-disable-next-line no-debugger
//           debugger
//           setTimeout(() => {
//             this.loading = false
//           }, this.time)
//           resolve(res)
//         }).catch(err => {
//           this.loading = false
//           reject(err)
//         })
//       })
//     },
//     beforeInit () {
//       return true
//     },
//     pageChange (e) {
//       this.current = e
//       this.init()
//     },
//     sizeChange (e) {
//       this.current = 1
//       this.size = e
//       this.init()
//     }
//   }
// }

import { page, pageStr } from '@/api/base/data'
import qs from 'qs'

export default {
  data () {
    return {
      loading: true,
      method: 'get',
      data: [],
      page: 1,
      size: 20,
      total: 0,
      url: '',
      params: {},
      paramsType: 1,
      query: {},
      time: 170
    }
  },
  methods: {
    async init () {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        this.loading = true
        this.params.page = this.page
        this.params.size = this.size
        if (this.paramsType === 1) {
          page(this.url, this.params).then(res => {
            this.total = res.data.total
            this.data = res.data.data
            setTimeout(() => {
              this.loading = false
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
        } else {
          pageStr(this.url, qs.stringify(this.params)).then(res => {
            this.total = res.data.total
            this.data = res.data.data
            setTimeout(() => {
              this.loading = false
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
        }
      })
    },
    beforeInit () {
      return true
    },
    pageChange (e) {
      this.page = e
      this.init()
    },
    sizeChange (e) {
      this.page = 1
      this.size = e
      this.init()
    }
  }
}
