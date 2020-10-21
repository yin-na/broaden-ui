import {
    resOk
} from '@/settings';
import {
    getGradeList, getClassList, getPeopleType
} from "@/api/hardware/relaxFeedback.js";

export default {
    data() {
        return {
            options: null, // 用户类型
            gradeifies: null, // 年级
            classifies: [], // 班级
        }
    },

    methods: {
        // 获取班级
        setGradeifies() {
            let that = this;
            if (this.gradeifies) {
                return
            }
            return new Promise(function(resolve, rej) {
                getGradeList().then((res) => {
                    if(res.code == resOk) {
                        that.gradeifies = res.data ? res.data : []
                    }
                    resolve(res)
                }).catch((e)=>{rej(e)})
            })
        },
        // 班级切换
        changeGradeID(val) {
            if (!val) {
                true
            }
            getClassList({
                gradeId: val
            }).then((res) => {
                if(res.code == resOk) {
                    this.classifies = res.data ? res.data : []
                }
            })
        },
        // 获取用户类型
        getOptions() {
            if (this.options) {
                return
            }
            let that = this;
            return new Promise(function(resolve, rej) {
                getPeopleType().then((res) => {
                    if(res.code == resOk) {
                        that.options = res.data ? res.data : []
                    }
                    resolve(res)
                }).catch((e)=>{rej(e)})
            })
        }
    }
}