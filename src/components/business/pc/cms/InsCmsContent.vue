<template>
  <div id="container" class="PcContact">
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
        <div class="MapInfo">
          <!-- <p class="OurStores">{{$t('Cms.OurStores')}}</p> -->
          <!-- <p class="BusinessHours">{{$t('Cms.BusinessHours')}}: 07:30 - 19:00</p> -->
          <p v-html="content.Body"></p>
         <div class="clear"></div>
        </div>
          <!-- <div class="CmsMap">
            <p v-html="content.Body" class="cmsbody"></p>
            <p class="addressIcon"><i></i>{{$t('home.Address')}}：</p>
            <div class="addressBox">
            <div class="perList" v-for="(val,index) in ShopList" :key="index" v-on:click="showContent(val.Id,index)" :class="{'activeColor':cindex==index}">
                <div class="icon"><i></i></div>
                <div class="content">
                  <p>{{val.Title}}</p>
                  <p>{{val.DescOne}}</p>
                  <p>{{val.DescTwo}}</p>
                </div>
              </div>
            </div>
          </div> -->
         <div class="clear"></div>
      </div>
      <!-- <div class="borderline"></div> -->
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
            <div class="DetailTitle"><img :src="OtherPageImg" v-if="OtherPageImg"><div class="TitleBg"><div class="innerBoxText">{{TitleName}}</div></div></div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
      <div class="CmsContent">
        <!-- <p class="TitleName">{{TitleName}}</p> -->
        <div v-html="content.Body"></div>
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
    PkcmsBanner: () => import('@/components/hkTasteBusiness/pc/cms/PkcmsBanner.vue')
  }
})
export default class InsCmsContent extends Vue {
  NewsNav: string = 'NewsNav';
  CateName: string = '';
  CateDesc: string = '';
  content: any[] = [];
  private ImgList: string[] = [];
  private ispic:boolean=false;
  IsMobile:boolean=false;
  MapInfo:string='';
  ShopList:any[]=[];
  FormContent:any='';
  IsPay:boolean= false;
  IsLogin:boolean=false;
  cindex:number=0;
  private htmlString: string = '';
  Signer: any = null;
  FormTitle:string='';
  NewcateId:string='';
  private waiting: boolean = true;
  OtherPageImg:string='';
  TitleName:string='';

  getForm () {
    this.$Api.regAndPay.getHtml('ContactUs', this.lang, false).then(result => {
      console.log(result, 'ContactUs');
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
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
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
    this.$Api.cms.getContentByDevice({ ContentId: val, IsMobile: false }).then(result => {
      this.MapInfo = result.CMS.Body;
      this.cindex = index;
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

  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: false }).then(result => {
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
      this.$Api.cms.getCategoryByDevice({ CatId: cateId, IsMobile: false }).then(async (result) => {
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
  created () {
    this.getContent();
    this.getIndexshop();
    this.showContent(20288, 0);
    this.Regnay();
  }
  mounted () {
    window['regAndPay'] = this.$Api.regAndPay;
    window['router'] = this.$router;
    // window['getPanel'] = this.$Api.getPanel;
    window['Elalert'] = this.$alert;
  }

  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
}
</script>
<style lang="less">
.PcContact .activeColor .content p:nth-child(1){
    color: #333!important;
    text-decoration: underline;
    font-weight: 700;
}
.PcContact .aboutBg{
    width: 80%;
    background-size: 100%;
    min-height: 65rem;
    padding: 10%;
    word-break: break-all;
}
.PcContact .abooutImg{
    width: 70%;
    margin: 0 auto;
    margin-bottom: 1rem;
    img{
      width: 100%;
    }
}
.PcContact .contactBox{
  width: 100%;
  float: left;
  p{
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 18px;
    display: flex;
    align-items: center;
    .icon1{
      background: url('/images/mobile/Mobile-Contact-02.png') no-repeat center center;
      background-size: 100%;
      width: 2rem;
      height: 2rem;
      display: inline-block;
      vertical-align: middle;
      margin-right:.5rem;
    }
    .icon2{
      background: url('/images/mobile/Mobile-Contact-03.png') no-repeat center center;
      background-size: 100%;
      width: 2rem;
      height: 2rem;
      display: inline-block;
      vertical-align: middle;
      margin-right:.5rem;
    }
    .icon3{
      background: url('/images/mobile/Mobile-Contact-04.png') no-repeat center center;
      background-size: 100%;
      width: 2rem;
      height: 2rem;
      display: inline-block;
      vertical-align: middle;
      margin-right:.5rem;
    }

    &:last-child{
      width: 70%;
    }
    &:first-child{
      width: 30%;
      text-align: center;
      img{
        margin-left: auto;
        margin-right: auto;
        display: block;
      }
    }

  }
  .contactone{
    width: 50%;
    float: left;
    margin-bottom: 30px;
    display: flex;
  }
}
.PcContact  .MapInfo{
  width:100%;
  float:left;
  padding-top: 5rem;
  .OurStores{
    font-size: 40px;
    font-weight: 700;
    color:#333333;
  }
  .BusinessHours{
    font-size: 24px;
    color:#333333;
    margin-bottom: 30px;
  }
}
.PcContact .FormMain{
  width:1200px;
  margin:0 auto;
  padding-bottom: 3rem;
  position: relative;
  padding-top: 3rem;
  .FormTitle{
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    color:#333333;
  }
  #preview{
    width: 100%;
    >.title{
      line-height: 30px;
      font-size: 24px;
      color: #000000;
      margin-bottom: 10px;
    }
    .question{
      font-size: 18px;
      color: #333333;
      padding-bottom: 10px;
    }

    .anwer{
      margin-bottom: 20px;
      p{
        font-size: 16px;
        color: #8b0b04;
      }
    }
    .back{
      background: #ccc;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-top: 30px;
    }
    .confirm{
      background: #333;
      color:#FFF;
      padding:10px 20px 10px 20px;
      border:none;
      margin-top: 30px;
      margin-bottom: 30px;
      margin-right: 30px;
    }
  }
  .to_vertical{
    width: 100%;
    display: inline-block;
  }
  .FormImg{
    width: 20%;
    float: left;
    img{
      width: 40%;
    }
  }
  .btn-default{
      width: 300px;
      margin: 0 auto;
      background: #8b0b04;
      height: 50px;
      line-height: 50px;
      color:#fff;
      background-size: 100%;
      border:none;
      margin-top: 30px;
      font-size: 24px;
      border-radius: 8px;
      outline: none;
      display: block;
  }
  #Anwers{
    position: relative;
  .form-group{
    width: 100%;
    display: inline-block;
    margin-bottom: 15px;
    .fieldset{
      border:none;
      padding: 0px;
    }
    h4{
      color: #14234f;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      margin-bottom: .5rem;
    }
    input[type="text"],input[type="email"]{
      border:2px solid #8b0b04;
      height: 38px;
      line-height: 38px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px;
      text-indent: 10px;
      outline: none;
      font-size: 16px;
      margin-bottom: 5px;
    }
    textarea{
      border:2px solid #8b0b04;
      height: 198px;
      width: 100%;
      box-sizing: border-box;
      border-radius: 10px;
      margin-bottom: 0;
      padding-top: 10px;
      text-indent: 10px;
      outline: none;
      font-size: 16px;
      margin-bottom: 5px;
    }
    p[name="error"]{
      color:red;
      margin-bottom:.5rem;
    }
  }
 }
}
.PcContact .CmsContent{
    position: relative;
    width: 1200px;
    margin: 44px auto;
   .aboutUSImg{
     width:10%;
     float:left;
     box-sizing: border-box;
     display: flex;
     justify-content: flex-end;
     margin-left: 3%;
     padding-top: 10%;
     img{
       width: 100%;
     }
   }
   .aboutUSbg{
     width: 83%;
     float: left;
     background: #FFF;
     border-radius: 10px;
     padding: 20px;
     .innerBox{
       border:1px solid #000;
       border-radius: 10px;
       position: relative;
        min-height: 400px;
        padding: 30px;
        word-break: break-all;
        &::before{
            content: '';
            width: 98%;
            height: 20px;
            background-size: 100%;
            position: absolute;
            top: 10px;
            left: 1%;
        }
        &::after{
            content: '';
            width: 98%;
            height: 20px;
            background-size: 100%;
            position: absolute;
            bottom: 10px;
            left: 1%;
        }
     }
   }
  .CmsMapImg{
    width: 30%;
    position: absolute;
    right: 0px;
    top: 3rem;
    text-align: right;
    img{
      width:50%;
    }
  }
  p{
    font-size: 18px;
    line-height: 36px;
    color: #000000;
    margin-bottom: 15px;
    a{
      font-size: 18px;
    line-height: 36px;
    color: #000000;
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
  height: 502px;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
    height: 100%;
    display: block;
    object-position: 50% 50%;
    object-fit: cover;
  }

}

.CmsNormal{
  width: 100%;
  display: inline-block;
  background: #FFF;
  padding-bottom: 5rem;
}
.TitleBg{
    margin: 0 auto;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    .innerBoxText{
      background:rgba(139, 11, 4, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      font-family: 'Century Gothic';
      padding: 45px;
    }
  }
.Cmsbg{
    width:100%;
    display: block;
    box-sizing: border-box;
    display: inline-block;
}
.Banner {
  width: 100%;
  height: 20rem;
  display:flex;
  align-items: center;
  padding-left:2rem;
  .innerBox{
      width: 1200px;
      margin: 0 auto;
  }
}
.Banner img {
  width: 100%;
  height: 20rem;
}
.CmsMap {
    width: 50%;
    float: left;
    margin-left: 5%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 5rem;
    .cmsbody{
      width:100%;
    }
    .addressBox{
      width: 100%;
      float: left;
      display: flex;
      flex-wrap: wrap;
    }
}

.CmsMap
{
  position: relative;
  .addressIcon{
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: 2rem;
    padding-top: 2rem;
    align-items: center;
    display: flex;
    i{
      background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
      background-size: 100% 100%;
      width:2rem;
      height:2rem;
      display: inline-block;
      margin-right:.5rem;
    }
  }
  .perList{
    margin-bottom: 3rem;
    width: 48%;
    margin-right:4%;
    &:nth-child(2n){
      margin-right:0%!important;
    }
    p{
      font-size:1.4rem;
      cursor: pointer;
      &:nth-child(1):hover{
        color:#262626 ;
      }
    }
  }
}
.clear {
  clear: both;
}
/deep/ iframe {
  border: none;
}
</style>
