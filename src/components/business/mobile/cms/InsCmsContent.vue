<template>
  <div id="container" class="MobileContact">
    <!-- 联络我们页面 -->
    <div class="Cmsbg" v-if="NewcateId=='20296'">
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
          <div class="DetailTitle"><img :src="OtherPageImg" v-if="OtherPageImg">
          <div class="TitleBg" :class="{ titletop : !OtherPageImg}">
            <div class="innerBoxText">{{TitleName}}</div>
          </div>
        </div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <div class="CmsContent">
          <!-- <p class="OurStores">{{$t('Cms.OurStores')}}</p>
          <p class="BusinessHours">{{$t('Cms.BusinessHours')}}: 07:30 - 19:00</p> -->
          <p v-html="content.Body"></p>
         <div class="clear"></div>
      </div>
      <!-- <div class="CmsMap">
            <p class="addressIcon"><i></i>{{$t('home.Address')}}：</p>
            <div class="perList" v-for="(val,index) in ShopList" :key="index" v-on:click="showContent(val.Id,index)" :class="{'activeColor':cindex==index}">
                <div class="icon"><i></i></div>
                <div class="content">
                  <p>{{val.Title}}</p>
                  <p>{{val.DescOne}}</p>
                  <p>{{val.DescTwo}}</p>
                </div>
            </div>
            <p v-html="MapInfo" class="MapInfo"></p>
      </div> -->
      <!-- 表单信息 -->
        <div class="FormMain">
          <!-- <p class="FormTitle">{{FormTitle}}</p> -->
          <div v-html="htmlString" class="to_vertical" id="content"></div>
          <div id="preview" style="display:none;"></div>
        </div>
    </div>
    <!-- 其他页面 -->
    <div class="CmsNormal" v-else>
      <transition name="slide">
        <div key="1" v-if="!waiting" style="display:flex;">
          <div class="DetailTitle"><img :src="OtherPageImg" v-if="OtherPageImg">
          <div class="TitleBg" :class="{ titletop : !OtherPageImg}">
            <div class="innerBoxText">{{TitleName}}</div>
          </div>
        </div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <div class="CmsContent">
        <!-- <p class="TitleName">{{TitleName}}</p> -->
        <p v-html="content.Body"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { FrontE } from '@/sdk/common/SysConst';
import Cookie from 'js-cookie';
@Component({
  components: {
    PkcmsBanner: () => import('@/components/hkTasteBusiness/mobile/cms/PkcmsBanner.vue')
  }
})
export default class InsCmsContent extends Vue {
  NewsNav: string = 'NewsNav';
  CateName: string = '';
  CateDesc: string = '';
  content: any[] = [];
  FormContent:any='';
  private ImgList: string[] = [];
  private ispic:boolean=false;
  IsPay:boolean= false;
  IsLogin:boolean=false;
  IsMobile:boolean=true;
  MapInfo:string='';
  ShopList:any[]=[];
  cindex:number=0;
  private htmlString: string = '';
  Signer: any = null;
  FormTitle:string='';
  NewcateId:string='';
  private waiting: boolean = true;
  OtherPageImg:string='';
  TitleName:string='';

  getIndexshop () {
    var _this = this;
    this.$Api.cms.getContentsByCatId(40108, 1, 12).then(result => {
      this.ShopList = result.Data;
      result.Data.forEach(function (item) {
        var colon = item.Desc.indexOf('*');
        var a = item.Desc.substring(0, item.Desc.indexOf('*'));
        var b = item.Desc.substr(
          item.Desc.indexOf('*') + 1,
          item.Desc.length
        );
        _this.$set(item, 'DescOne', a);
        _this.$set(item, 'DescTwo', b);
      });
    });
  }
  showContent (val, index) {
    this.$Api.cms.getContentByDevice({ ContentId: val, IsMobile: true }).then(result => {
      this.MapInfo = result.CMS.Body;
      this.cindex = index;
    });
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  getForm () {
    this.$Api.regAndPay.getHtml('ContactUs', this.lang, false).then(result => {
      this.htmlString = result.HtmlString;
      this.FormTitle = result.Title;
      this.$nextTick(() => {
        if (document.querySelectorAll('#Sign').length > 0) {
          this.Signer = new intimex.CanvasSigner('#NewSignCanvas', '#Signature', {
            color: '#58B63A',
            width: 5
          });
          this.Signer.initCanvas();
          window['Signer'] = this.Signer;
        }
      });
    });
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: true }).then(result => {
      console.log(result, 'getContentByDevice');
      this.content = result.CMS;
      this.TitleName = result.CMS.Title;
      this.OtherPageImg = result.CMS.Cover;
      this.NewcateId = result.CMS.Id;
      this.getCategoryByDevice(result.CMS.CatId);
      this.CateDesc = result.CMS.Desc;
      this.waiting = false;
      if (result.CMS.Title) document.title = result.CMS.Title;
    });
  }
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (cateId) {
    this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: true }).then(async (result) => {
      console.log(result, 'getCategoryByDevice');
      this.ImgList = result.ImagePath;
      this.MapInfo = result.Content;
      this.CateName = result.Name;
      this.waiting = false;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  Regnay () {
    window['jsData'] = {
      HasPreview: true,
      UploadButtonText: this.$t('RegNPay.UploadButtonText'),
      UploadingText: this.$t('RegNPay.UploadingText'),
      UploadSuccessfulText: this.$t('RegNPay.UploadSuccessfulText'),
      UploadFailText: this.$t('RegNPay.UploadFailText'),
      NoFileText: this.$t('RegNPay.NoFileText'),
      UploadLengthText: this.$t('RegNPay.UploadLengthText'),
      UploadSizeText: this.$t('RegNPay.UploadSizeText'),
      BackText: this.$t('RegNPay.BackText'),
      ConfirmText: this.$t('RegNPay.ConfirmText'),
      PleaseSelect: this.$t('RegNPay.PleaseSelect'),
      PreviewTitleText: this.$t('RegNPay.PreviewTitleText'),
      RequiredText: this.$t('RegNPay.RequiredText'),
      FormatErrorText: this.$t('RegNPay.FormatErrorText'),
      Version: '2.0',
      HasRNPConfirm: false
    };
    this.$LoadScript('/static/js/CanvasSigner.js');
    this.$LoadScript('/static/js/ajaxFileUpload.js');

    document.dispatchEvent(new Event('rnpFinshed'));

    // RNP Form后台预览跳转语言判断
    if (this.queryLang) {
      this.$Api.member.setUILanguage(this.queryLang).then((result) => {
        this.$i18n.locale = this.queryLang as string;
        localStorage.setItem('locale', this.queryLang as string);
        this.getForm();
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.getForm();
    }
  }
  created () {
    this.getContent();
    this.Regnay();
    this.getIndexshop();
    this.showContent(20288, 0);
  }
  mounted () {
    window['regAndPay'] = this.$Api.regAndPay;
    window['router'] = this.$router;
    window['Elalert'] = this.$alert;
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
}
</script>
<style lang="less">
.MobileContact .FormMain{
  #preview{
    width: 100%;
    // float:right;
    .anwer{
      margin-bottom: 20px;
    }
    .back{
      background: #ccc;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-top: 30px;
      width: 48%;
      float: right;
    }
    .confirm{
      background: #333;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-top: 30px;
      width: 48%;
      float: left;
    }
    .title{
      font-size: 1.4rem;
      color: #000000;
      margin-bottom: 1rem;
    }
    .question{
      font-size: 1.4rem;
      color: #333333;
      padding-bottom: 0.5rem;
    }
    .anwer{
      p{
        font-size: 1.2rem;
        color: #8B0B04;
      }
    }
  }
}
.MobileContact{
    .OurStores{
      font-size: 2.5rem;
      font-weight: 700;
      color:#333333;
      text-align: right;
    }
    .BusinessHours{
      font-size: 1.6rem;
      color:#333333;
      margin-bottom: 30px;
      text-align: right;
    }
    .aboutUSbg{
      width: 100%;
      float: left;
      background: #FFF;
      border-radius: 10px;
      padding: 5px;
     .innerBox{
       border:1px solid #000;
       border-radius: 10px;
       position: relative;
        min-height: 400px;
        padding: 20px;
        p{
          font-size: 1.4rem;
          text-align: justify;
        }
        &::before{
            content: '';
            width: 98%;
            height: 20px;
            background: url(/images/mobile/productList_icon.png) no-repeat center center;
            background-size: 100%;
            position: absolute;
            top: 10px;
            left: 1%;
        }
        &::after{
            content: '';
            width: 98%;
            height: 20px;
            background: url(/images/mobile/productList_icon.png) no-repeat center center;
            background-size: 100%;
            position: absolute;
            bottom: 10px;
            left: 1%;
        }
     }
   }
  }
.MobileContact .activeColor .content p:nth-child(1){
    text-decoration: underline;
    font-weight: 700;
}
.MobileContact .aboutBg{
    width: 80%;
    background-size: 100%;
    min-height: 65rem;
    padding: 10%;
    word-break: break-all;
}
.MobileContact .abooutImg{
    width: 70%;
    margin: 0 auto;
    margin-bottom: 1rem;
    img{
      width: 100%;
    }
}
.MobileContact .contactBox{
  width: 90%;
  margin: 0 auto;
  p{
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    font-size: 1.4rem;
    // display: flex;
    align-items: center;
    // border-top: 1px solid #666;
    width: 30%;
    color: #000000;
    img{
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
    &:last-child{
      // border-bottom: 1px solid #666;
      width: 70%;
      // line-height: 36px;
    }
    .icon1{
      background: url('/images/mobile/Mobile-Contact-02.png') no-repeat center center;
      background-size: 100%;
      width: 35px;
      height: 36px;
      display: inline-block;
      vertical-align: middle;
      margin-right:2rem;
    }
    .icon2{
      background: url('/images/mobile/Mobile-Contact-03.png') no-repeat center center;
      background-size: 100%;
      width: 35px;
      height: 36px;
      display: inline-block;
      vertical-align: middle;
      margin-right:2rem;
    }
    .icon3{
      background: url('/images/mobile/Mobile-Contact-04.png') no-repeat center center;
      background-size: 100%;
      width: 35px;
      height: 36px;
      display: inline-block;
      vertical-align: middle;
      margin-right:2rem;
    }
    .icon4{
      background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
      background-size: 100%;
      width: 35px;
      height: 36px;
      display: inline-block;
      vertical-align: middle;
      margin-right: 2rem;
    }
  }
  .contactone{
    display: flex;
    // /deep/ p{}
  }
}
.MobileContact .CmsMap .MapInfo{
  width:100%;
  margin-bottom: 1rem;
  iframe{
    width:100%;
    height: 30rem;
  }
  img{
    width:100%;
  }
}
.MobileContact .FormMain{
  width:90%;
  margin:0 auto;
  padding-bottom: 3rem;
  position: relative;
  padding-top: 0;
  .FormTitle{
    font-size: 2.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    color:#333333;
  }
  .FormImg{
    position: absolute;
    right: 0px;
    top:3rem;
    width: 20%;
    img{
      width: 100%;
    }
  }
  .form-group{
    margin-bottom: 1rem;
    .fieldset {
      border: none;
    }
    h4{
      background: #fff;
      background-size: 100% 100%;
      display: inline-block;
      // height: 3.5rem;
      text-align: center;
      // line-height: 3.5rem;
      font-size: 1.2rem;
      margin-bottom: .5rem;
      // border:1px solid #808080;
      border-radius: 2px;
      color: #14234f;
    }
    input[type="text"],input[type="email"]{
      border:2px solid #8b0b04;
      height: 3.5rem;
      line-height: 3.5rem;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: .5rem;
      text-indent: 1rem;
      outline: none;
      font-size: 1.4rem;
      border-radius: 15px;
    }
    textarea{
      border:2px solid #8b0b04;
      height: 10rem;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: .5rem;
      outline: none;
      font-size: 1.4rem;
      border-radius: 15px;
      text-indent: 1rem;
    }
    p[name="error"]{
      color:red;
      margin-bottom:.5rem;
    }
    .btn-default{
      width: 50%;
      margin: 0 auto;
      background: #8b0b04;
      height: 3rem;
      line-height: 3rem;
      color:#fff;
      background-size: 100%;
      border:none;
      margin-top: 1rem;
      font-size: 1.4rem;
      border-radius: 10px;
      display: inherit;
      outline: none;
    }
  }
}
</style>
<style scoped lang="less">
.TitleName{
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
  }
  .TitleBg{
    width: auto;
    height: auto;
    // border: 1px solid #ffffff;
    // height: 4.5rem;
    // line-height: 4.5rem;
    margin: 0 auto;
    margin-bottom: 0;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    .innerBoxText{
      background:rgba(139, 11, 4, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 500;
      letter-spacing: 2px;
      font-family: 'Century Gothic';
      padding: 2rem 2rem;
      width: auto;
      height: auto;
    }
  }
  .titletop{
    position: initial;
    margin-top: 2rem;
    top: 0;
    transform: initial;
    margin-bottom: 0;
  }
}
.CmsNormal{
  width: 100%;
  display: inline-block;
  background: #FFF;
}
.TitleBg{
  width: 75%;
  height: 4.5rem;
  margin: 0 auto;
  .innerBoxText{
    width: 100%;
    height: 100%;
    background:#ffffff;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 500;
    letter-spacing: 2px;
    font-family: 'Century Gothic';
  }
}
.cmsTitlebg{
    width: 50%;
    background: url(/images/mobile/contact_02.png) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    box-sizing: border-box;
    height: 6rem;
    align-items: center;
    justify-content: center;
    .p1{
      font-size: 1.5rem;
      width: 100%;
      text-align: center;
      font-weight: 700;
    }
    .p2{
      font-size: 1.2rem;
      text-align: center;
      color: #262626;
      font-weight: 600;
    }
}
.Cmsbg{
    width:100%;
    // background: url('/images/mobile/MobileIndex_03.jpg') no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    // margin-top: -.5rem;
    padding-bottom: 2rem;
    .borderline{
      height:1px;
      width: 100%;
      display: inline-block;
      background: #000;
   }
   .CmsContent{
     width: 100%;
     /deep/ p{
       border: none;
       iframe{
         border: none;
       }
     }
   }
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
.Banner img {
  width: 100%;
  height: 15rem;
}
#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.CmsMap {
    width: 90%;
    margin: 0 auto;
    padding-top: 2rem;
}
.CmsContent{
  position: relative;
    width: 90%;
    margin: 0 auto;
    padding-top: 2rem;
    padding-bottom: 3rem;
  .CmsMapImg{
    width: 20%;
    position: absolute;
    right: 0px;
    top:3rem;
    img{
      width: 100%;
    }
  }
  /deep/ p{
    line-height: 2.2rem;
    font-size: 1.4rem;
    word-break: break-word;
    a{
      color: #000000;
      line-height: 2.2rem;
      font-size: 1.4rem;
      word-break: break-word;
    }
  }
}
.CmsMap
{
  position: relative;
  .addressIcon{
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    align-items: center;
    display: flex;
    i{
      background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
      background-size: 100% 100%;
      width:2.5rem;
      height:2.5rem;
      display: inline-block;
      margin-right:.5rem;
    }
  }
  .perList{
    margin-bottom:3rem;
    width:calc(100% - 3rem);
    padding-left: 3rem;
    p{
      font-size:1.4rem;
    }
  }
}
.clear {
  clear: both;
}
</style>
