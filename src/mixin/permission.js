/**
 * 李素素 2019-05-14
 * 页面里按钮权限
 */
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            resourceAdd: true, // 添加
            resourceDelete: true, // 删除
            resourceUpdate: true, // 更新
            resourcSelect: true, // 查询
        }
    },
    computed: {
        ...mapGetters([
            'permissions'
        ])
    },

    mounted() {
        this.initPermission()
    },

    methods: {
        initPermission() {
            if (!this.$route) {
                return
            }
            let router = this.$route.path;
            if (this.$route.params.id) {
                this.resourceAdd = true
                this.resourceDelete = true
                this.resourceUpdate = true
                this.resourcSelect = true
            } else {
                if (this.permissions.indexOf(router + ':add') >= 0) {
                    this.resourceAdd = true
                }
                if (this.permissions.indexOf(router + ':delete') >= 0) {
                    this.resourceDelete = true
                }
                if (this.permissions.indexOf(router + ':update') >= 0) {
                    this.resourceUpdate = true
                }
                if (this.permissions.indexOf(router + ':select') >= 0) {
                    this.resourcSelect = true
                }
            }
        }
    }
}