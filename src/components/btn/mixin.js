export default {
    props: {
        size: {
            type: String,
            default: ''
        },
        icon: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        deleteMsg() {
            this.$emit('click')
        }
    }
}