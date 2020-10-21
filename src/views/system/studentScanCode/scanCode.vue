// 扫码注册普查
<template>
    <div class="app-container">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card class="box-card" style="border: none;box-shadow: none">
                    <div class="contain-tit">
                        <span>扫码注册普查</span>
                        <div class="fr">
                            <el-button size="mini" type="primary" @click="exportBtn()">保存海报</el-button>
                        </div>
                    </div>

                    <!-- 扫码部分 -->
                    <div class="ma-content">
                        <div id="capture" ref="imageTofile">
                            <div class="warp">
                                <!-- <img class="pic" src="@/assets/scanCode/bg.png"> -->
                                <!-- <img class="ewm" src="@/assets/scanCode/ewm.png"> -->
                                <div class="ewm">
                                    <div id="qrcode"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import html2canvas from 'html2canvas' // 图标部分截图
import QRCode from 'qrcodejs2' // 生成二维码
import Config from '@/config'

export default {
  components: {
    html2canvas
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
data() {
    return {
        imgUrl: '', // 截图下载海报存放路径
    }
  },
  created() {
      this.ewmBtn()
  },
  methods: {
    // 下载海报
    exportBtn () {
      html2canvas(document.querySelector('#capture')).then(canvas => {
        this.imgUrl = canvas.toDataURL('png') // 获取生成的图片的url
        if (this.imgUrl != '') {
            this.downloadImg()
        }
      })
    },
    // 下载图片
    downloadImg(){
        const url = this.imgUrl
        let xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",url,true);
        xmlhttp.responseType = "blob";
        xmlhttp.onload = function(){
            if (this.status == 200) {
                const blob = this.response;
                var fileName = '心理健康普查' + '.png'
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName

                //此写法兼容可火狐浏览器
                document.body.appendChild(link);

                const evt = document.createEvent("MouseEvents");
                evt.initEvent("click", false, false);
                link.dispatchEvent(evt);
                window.URL.revokeObjectURL(link.href)
                document.body.removeChild(link);
            };
        }
        xmlhttp.send();
    },
    // 生成二维码插件
    ewmBtn () {
      this.$nextTick(function () {
        document.getElementById('qrcode').innerHTML = ''
        let qrcode = new QRCode('qrcode', {
          width: 124,
          height: 124,
          text: Config.scanUrl + 'code/register/' + this.user.deptId, // 二维码内容 也可以放url
          colorDark: '#000',
          colorLight: '#fff'
        })
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.contain-tit {
  line-height: 59px;
  height: 59px;
  color: #333;
  font-size: 18px;
  border-bottom: 2px solid #d5e1ff;
  font-weight: bold;
}
.ma-content{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 680px;
    padding-top: 30px;
    .warp{
        width: 380px;
        height: 650px;
        background: url('../../../assets/scanCode/bg.png') no-repeat;
        background-position: 0 0;
        background-size: 100% 100%;
        position: relative;
        .pic{
            width: 100%;
            height: 100%;
        }
        .ewm{
            width: 142px;
            height: 142px;
            position: absolute;
            bottom: 63px;
            left: 119px;
            background: #fff;
            padding: 10px;
            // 生成二维码
            #qrcode {
                display: block;
                img {
                    width: 124px !important;
                    height: 124px !important;
                    background-color: #fff !important; //设置白色背景色
                    padding: 6px !important; // 利用padding的特性，挤出白边
                }
            }
        }
    }
}
</style>