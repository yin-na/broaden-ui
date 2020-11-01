export default {
  data () {
    return {
      tableHeight: document.documentElement.clientHeight * 0.6
    }
  },
  mounted () {
    const that = this
    window.onresize = () =>
      (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
  },
  watch: {
    fullHeight (val) {
      if (!this.timer) {
        this.tableHeight = val * 0.6
        this.timer = true
        const that = this
        setTimeout(() => {
          that.timer = false
        }, 400)
      }
    }
  },
  methods: {
    saveHeaderWidth (newWidth, oldWidth, column) {
      localStorage.setItem(this.componentName + '-' + column.property, newWidth)
    },
    columnWidth (column, defaultWidth) {
      const width = localStorage.getItem(this.componentName + '-' + column)
      if (!width) return defaultWidth
      return width
    }
  }
}
