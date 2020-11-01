let oldTop = 0; //旧数据，初始为0
import { scrollTo } from '@/utils/scroll-to'
export default {
    data() {
        return {
            pospdt: '84px',
            fixedMsgIndex: 0, // 固定菜单当前索引
        }
    },
    
    mounted() {
        let that = this

        window.addEventListener('scroll', that.onScroll)
    },
    methods: {
        scrollToTop() {
            scrollTo(0, 300)
        },
        /**
        * 锚点连接平滑滚动
        **/
        jump(index){
            let that = this;
            if (that.fixedMsgIndex == index) {
                return
            }
            // 点击暂时失效加载
            if (this.$options.name == 'SelfHelp') {
                that.isLoad = true;
                setTimeout(function() {
                    that.isLoad = false;
                }, 1000)
            }

            that.fixedMsgIndex = index;
            // 用 class="instance-title" 添加锚点
            let jump = document.querySelectorAll('.instance-title');
            let total = jump[index].offsetTop - parseInt(that.pospdt);
            let distance = document.documentElement.scrollTop || document.body.scrollTop;
            // 平滑滚动，时长500ms，每10ms一跳，共50跳
            let step = total / 50;
            if (total > distance) {
                smoothDown();
            } else {
                let newTotal = distance - total;
                step = newTotal / 10;
                
                smoothUp();
            }
            function smoothDown () {
                if (distance < total) {
                    distance += step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothDown, 10);
                } else {
                    document.body.scrollTop = total;
                    document.documentElement.scrollTop = total;
                }
            }
            function smoothUp () {
                if (distance > total) {
                    distance -= step;
                    document.body.scrollTop = distance;
                    document.documentElement.scrollTop = distance;
                    setTimeout(smoothUp, 10);
                } else {
                    document.body.scrollTop = total;
                    document.documentElement.scrollTop = total;
                }
            }
        },
        // 修改锚点状态
        changeChooserListId() {
            let heightNum = document.documentElement.clientHeight || document.body.clientHeight, that = this;
            let jump = document.querySelectorAll('.instance-title');
            if (jump) {
                let distance = (document.documentElement.scrollTop || document.body.scrollTop) + parseInt(that.pospdt);
                for (let i = 0; i < jump.length; i++) {
                    let nowTop = i == 0 ? 0 : jump[i].offsetTop;
                    let nextTop = i == jump.length - 1 ? jump[i].offsetTop : jump[i + 1].offsetTop;
                    if (nextTop) {
                        if (distance >= nowTop && distance < nextTop) {
                            this.fixedMsgIndex = i;
                            //旧数据小于当前位置，表示滚动条top向下滚动
                            if (this.$options.name == 'SelfHelp') {
                                if (oldTop < distance) {
                                    // 加载
                                    if (nextTop - distance < heightNum) {
                                        that.loadList()
                                    }
                                }
                            }
                        } 
                    }
                }
                // 滚动到底部的时候还未加载完的情况下
                var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
                var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
                //滚动条到底部的条件
                if(scrollHeight - (scrollTop + windowHeight) < (heightNum/2) && oldTop < distance){
                    let index;
                    for(let i = this.fixedMsgIndex; i < this.selfHelpList.length; i++) {
                        if (this.selfHelpList[i].load) {
                            index = i
                            break
                        }
                    }

                    if (index > -1) {
                        return
                    }
                    if (this.$options.name == 'SelfHelp') {
                        that.loadList(index)
                    }
                }
                oldTop = distance;//更新旧的位置
            }
        },
    }
}