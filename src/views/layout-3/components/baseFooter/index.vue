/*
 * @Author: 张悦
 * @Date: 2020-05-19 09:16:39
 * 公共版权
 */
<template>
    <div class="basefooter" style='background: #eff8f7'>
        <div class="warp_foot inner">
                <div class="width-le">
         @2017 Soulhappy Science and trade co. LTD 版权所有 备案号：鲁ICP备16032300号-3 技术支持：400-680-0708
                </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Footer',

  data () {
    return {
    }
  }
}
</script>

<style lang="less">
    @import '../../../../styles/variables.less';
    .basefooter {
        width: 100%;
        height: 60px;
        position: relative;
        bottom: 0;
        .warp_foot{
            height: 100%;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #999;
            position: relative;
            .width-le{
                    width: 1200px;
                    text-align: center;
                    line-height: 30px;
                }
        }
    }
</style>
