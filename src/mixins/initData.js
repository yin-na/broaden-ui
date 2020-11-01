import { page } from '@/api/base/data'

export default {
  data () {
    return {
      loading: true,
      data: [],
      page: 1,
      size: 10,
      total: 0,
      url: '',
      params: {},
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
