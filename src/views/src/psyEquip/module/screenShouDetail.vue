<template>
    <div class="Detail_warpp">
        <div class="reportTile w100 bgf br10">
            <div class="centertitle fwb">
                {{this.infos.theme}}
            </div>
            <div class="userInfos">
                <table bordercolor="#ddd"  border="1" cellspacing="0">
                    <tr>
                        <th>姓名</th>
                        <th>心理呵护</th>
                        <th>报告有效性</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>放松设备</th>
                        <th>联系电话</th>
                    </tr>
                    <tr>
                        <td>{{this.infos.userName}}</td>
                        <td>{{this.infos.days}}</td>
                        <td>{{this.infos.level}}</td>
                        <td>{{this.infos.sex}}</td>
                        <td>{{this.infos.age}}</td>
                        <td>{{this.infos.source}}</td>
                        <td>{{this.infos.mobilePhone}}</td>
                    </tr>
                </table>
            </div>
            <div class="Catharsis">
                <span  class="dpb">宣泄得分：<span class="color3 fwb" style="font-size:30px">{{this.infos.score}}</span>分</span>
                <span class="dpb" style="margin:27px 0 12px">宣泄程度：<span>{{this.infos.shoutLevel}}</span></span>
                <span class="dpb">宣泄结果：<span>{{this.infos.shoutResult}}</span></span>
            </div>
            <div class="xylLogo">
                <img src="@/assets/user/xylLogo.png" alt="">
            </div>
            <div class="xylew">
                <div style="border: 1px solid #f3f3f3;padding-left:10px">
                    <img src="@/assets/user/QRCode.png" alt="">
                </div>
                <span>关注公众号查看报告</span>
            </div>
        </div>

        <!-- 报告建议 -->
        <div class="reportRecommendations  w100 bgf br10">
            <div class="reporTile fwb color3">
                呐喊宣泄报告建议
            </div>
            <div class="Suggest color9 fs16" v-html="infos.advice">

            </div>
        </div>
        <!-- 宣泄方式 -->
        <div class="MethodCatharsis bgf br10 w100">
            <div class="reporTile fwb color3">
                释放压力的6种宣泄法
            </div>
            <div class="picture">
                <img src="@/assets/user/pic.png" alt="">
            </div>
            <div class="release fs16">{{release}}</div>

            <div class="sixways">
                <!-- 方法一 -->
                <div class="waysTitle" style="margin-top: 64px;">
                    <img src="@/assets/user/Number.png" alt="">
                    <div style="margin-left: 20px;">沟通宣泄方式</div>
                </div>
                <div class="detailWarp">
                    <div class="wayDetail color9 fs16">
                        {{waysOne}}
                    </div>
                    <div class="picture marg">
                        <img src="@/assets/cryOut/gtdrain.png" alt="">
                    </div>
                </div>
<!-- 方法二 -->
                <div class="waysTitle">
                    <img src="@/assets/user/Number2.png" alt="">
                    <div style="margin-left: 20px;">哭泣宣泄方式</div>
                </div>
                <div class="detailWarp">
                    <div class="wayDetail color9 fs16">
                        {{waystwo}}
                    </div>
                    <div class="picture marg">
                        <img src="@/assets/cryOut/kqdrain.png" alt="">
                    </div>
                </div>
<!-- 方法三 -->
                <div class="waysTitle">
                    <img src="@/assets/user/Number3.png" alt="">
                    <div style="margin-left: 20px;">放空宣泄方式</div>
                </div>
                <div class="detailWarp">
                    <div class="wayDetail color9 fs16">
                        {{waysthree}}
                    </div>
                    <div class="picture marg">
                        <img src="@/assets/cryOut/fkdrain.png" alt="">
                    </div>
                </div>

                <!-- 方法四 -->
                <div class="waysTitle">
                    <img src="@/assets/user/Number4.png" alt="">
                    <div style="margin-left: 20px;">写作宣泄方式</div>
                </div>
                <div class="detailWarp">
                    <div class="wayDetail color9 fs16">
                        {{waysfour}}
                    </div>
                    <div class="picture marg">
                        <img src="@/assets/cryOut/xzdrain.png" alt="">
                    </div>
                </div>

                <!-- 方法五 -->
                <div class="waysTitle">
                    <img src="@/assets/user/Number5.png" alt="">
                    <div style="margin-left: 20px;">呐喊宣泄方式</div>
                </div>
                <div class="detailWarp">
                    <div class="wayDetail color9 fs16">
                        {{waysfiv}}
                    </div>
                    <div class="picture marg">
                        <img src="@/assets/cryOut/nhdrain.png" alt="">
                    </div>
                </div>

                <!-- 方法六 -->
                <div class="waysTitle">
                    <img src="@/assets/user/Number6.png" alt="">
                    <div style="margin-left: 20px;">暴力宣泄方式</div>
                </div>
                <div class="detailWarp" style="padding-bottom: 0;">
                    <div class="wayDetail color9  fs16">
                        {{waysix}}
                    </div>
                    <div class="picture marg">
                        <img src="@/assets/cryOut/bldrain.png" alt="">
                    </div>
                </div>
                <div style="color: #999;">
                    END
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import{ShoutDetails} from "@/api/user/psyExamintion"
   export default{
       data(){
           return{
            btnFlag:false,
            infos:{},
            info:[],
            waysix:'可以去一些娱乐场所打打沙袋或者是捏捏橡皮球，通过运动的方式将心理的压力都通过自己的嚎叫声中宣泄出来，不但可以锻炼身体，还可以让压力得到缓解，暂时的释放一些压力。',
            waysfiv:'大声的呼喊、可以一个人爬到没有人的山顶对着大山大声的呼喊，将自己的心里所有的不愉快和所有的压力都随着自己的呐喊声都宣泄出来，让自己的压力得到缓解。',
            waysfour:'写日记，可以将自己每天的心情通过日记的形式写出来，把压力的体验，生理和心理的一切烦恼随着自己的笔迹都写在了日记里，这个也是一种不错的发泄情绪的方式。',
            waysthree:'出去散步，不要将自己整天关在一个狭小的房子里，狭小的空间，每天都面对着电脑，不但减轻不了心里的压力，还会让大脑整天都出在紧张的状态，适当的出去外面散散步，呼吸外面的新鲜空气，可以让大脑得到暂时的放空，也起到释放压力的作用。',
            waystwo:'大哭一场，当自己找不到人来倾诉的时候，可以找一个没有人的角落，自己关紧房门痛痛快快的哭一场，让心里所有的委屈都随着眼泪排泄出来你会发觉哭了一场之后，心里会无比的舒畅，心里压力也减少很多。',
            waysOne:'找一个人倾诉，当一个人心里承受太多的委屈的时候就会想找一个人诉说，不管对方能不能理解自己，但是将心里的压力都说出来，心里也会舒畅很多，压力也得到缓解。',
            release:'心里积累太多的垃圾，如果不及时的清理干净很容易让自己的生活变的迷茫，而且没有任何的动力，就像一个充满氢气的气球一样，如果气太多就会爆炸，气太少就会飞不起来，适当的放出一些气，不但可以飞的更高，还不会爆炸，那么我们应该如何去适当的释放自己心里的压力呢？',
           }
       },
       created () {
           var id=this.$route.query.id
           this.getDetails(id)
       },
       methods: {
           getDetails(id){
                ShoutDetails(id).then(res=>{
                    this.infos=res.data
                     this.info=res.data
                    if( res.data.sex == 0){
                        this.infos.sex='男'
                    }else{
                        this.infos.sex='女'
                    }

                    if(res.data.source==3){
                        this.infos.source='宣泄'
                    }else{
                        this.infos.source='测试'
                    }
                })
           }
       }
   }

</script>

<style  lang="scss">
    .Detail_warpp{
    max-width: 1200px;
    margin: 0 auto;
    padding: 70px 0 30px;
    font-family:Microsoft YaHei;
    .mg50 {margin-right: 50px;}
      .reportTile{
        height:447px;
        padding-top: 45px;
        position: relative;
    }
    .centertitle{
        text-align: center;
        font-size:24px;
        margin-bottom:38px;
        color:rgba(243,100,33,1);
    }
    .userInfos{
        margin-left: 94px;
        table{
            width: 1000px;
            tr{
                height: 51px;
            }
            th{
                text-align: center;
                color:#999;
                font-size: 16px;
                width: 195px;
            }
            td{
                color:#333;
                width: 195px;
                font-size: 16px;
                text-align: center;
            }
        }
    }

    .xylLogo{
        position: absolute;
        left:94px;
        bottom:46px;
    }
    .xylew{
        position: absolute;
        right:128px;
        bottom:42px;
        img{
            width:105px;
            margin-top: 3.5px;
            }
        }
    .xylew span{
        font-size: 14px;
        color:#999;
        text-align: center;
        display: block;
    }
    .Catharsis{
        position: absolute;
        left:247px;
        bottom:56px;
        color:#999
    }
    .dpb{
        display: block;
    }
    .reportRecommendations{
        padding:36px 50px 59px;
        margin: 30px 0;
    }
    .reporTile{
        font-size:20px;
        margin-bottom: 34px;
    }
    .Suggest{
        line-height:30px;
    }
    .MethodCatharsis{
        padding:36px 50px 106px;
        min-height: 600px;
    }
    .picture{
        text-align: center;
    }
    .release{
        margin-top: 46px;
        color:#999;
        line-height:30px;
    }
    .waysTitle{
        display: flex;
        line-height: 32px;
    }
    .wayDetail{
        line-height:30px;
        padding-left:24px;
    }
    .marg{
        margin:89px 0 0;
    }
    .detailWarp{
        border-left: 1px dashed #eb6100;
        margin-left: 17px;
        padding-bottom: 106px;
    }
    .gotop{
        position: fixed;
        right: 4%;
        bottom: 167px;
    }
}
</style>
