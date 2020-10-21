export default {
  data () {
    return {
      rules: {
        bloodType: [
          {
            required: true,
            message: '请选择血型',
            trigger: 'change'
          }
        ],
        nativePlace: [
          {
            required: true,
            message: '籍贯不能为空',
            trigger: 'blur'
          }, {
            max: 20,
            message: '不能超过20个字符',
            trigger: 'blur'
          }
        ],
        healthStatus: [
          {
            required: true,
            message: '请选择健康状况',
            trigger: 'change'
          }
        ],
        homeAddress: [
          {
            required: true,
            message: '家庭住址不能为空',
            trigger: 'blur'
          }, {
            max: 50,
            message: '不能超过50个字符',
            trigger: 'blur'
          }
        ],
        presentAddress: [
          {
            required: true,
            message: '寄住住址不能为空',
            trigger: 'blur'
          }, {
            max: 50,
            message: '不能超过50个字符',
            trigger: 'blur'
          }
        ],
        physicalDefect: [ // 生理缺陷
          {
            required: true,
            message: '不能为空,若没有请填‘无’',
            trigger: 'blur'
          }, {
            max: 50,
            message: '不能超过50个字符',
            trigger: 'blur'
          }
        ],
        medicalHistory: [ // 个人病史
          {
            required: true,
            message: '不能为空,若没有请填‘无’',
            trigger: 'blur'
          }, {
            max: 50,
            message: '不能超过50个字符',
            trigger: 'blur'
          }
        ],
        interest: [ // 兴趣与特长
          {
            required: true,
            message: '不能为空,若没有请填‘无’',
            trigger: 'blur'
          }, {
            max: 50,
            message: '不能超过50个字符',
            trigger: 'blur'
          }
        ],
        livingCondition: [
          {
            required: true,
            message: '请选择',
            trigger: 'change'
          }
        ],
        familyAtmo: [
          {
            required: true,
            message: '请填写或选择',
            trigger: 'change'
          }
        ],
        contactPeople: [
          {
            required: true,
            message: '请填写联系人',
            trigger: 'change'
          }
        ],
        phone: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号'
          }
        ]
      }
    }
  }
}
