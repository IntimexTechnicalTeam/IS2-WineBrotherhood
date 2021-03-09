<template>
  <div class="indexShop">
    <div class="shopMain">
        <div class="leftSide">
            <p v-html="MapInfo"></p>
        </div>
        <div class="rightSide">
          <p class="OurStores">{{$t('Cms.OurStores')}}</p>
          <p class="BusinessHours">{{$t('Cms.BusinessHours')}}: 07:30 - 19:00</p>
           <ul class="listImg">
             <li v-for="(val,index) in IndexShopList" :key="index">
               <a href="javascript:;" v-on:click="showContent(val.Id,index)" :class="{'activeColor':cindex==index}">
                   <i class="iconSide"></i>
                   <div class="contentSide">
                      <span>{{val.Title}}</span>
                      <p>{{val.DescOne}}</p>
                      <p>{{val.DescTwo}}</p>
                  </div>
               </a>
              </li>
           </ul>
        </div>
    </div>
    <div class="clear"></div>
    <div class="shopBottom">
      <a href="javascript:;" v-for="(val,index) in IndexShopAds" :key="index">{{val.Title}}</a>
    </div>

  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class PkNews extends Vue {
  lastestContents: any[] = [];
  MapInfo:string='';
  IndexShopList:any[]=[];
  IndexShopAds:any[]=[];
  cindex:number=0;
  getIndexshop () {
    var _this = this;
    this.$Api.cms.getContentsByCatId(40108, 1, 12).then(result => {
      this.IndexShopList = result.Data;
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
  // 获取广告标语
  getShopADS () {
    var _this = this;
    this.$Api.cms.getContentsByCatId(40111, 1, 12).then(result => {
      this.IndexShopAds = result.Data;
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
  mounted () {
    this.getIndexshop();
    this.getShopADS();
    this.showContent(20288, 0);
  }
}
</script>
<style  lang="less">
.indexShop .leftSide img{
  width: 100%;
}
.indexShop .leftSide iframe{
  height: 450px;
}
.indexShop .activeColor span{
  color: #333333!important;
  text-decoration: underline;
  font-weight: 700;
}
.indexShop .activeColor .contentSide p{
    color: #333333!important;
}
</style>
<style scoped lang="less">
  .OurStores{
    font-size: 40px;
    font-weight: 700;
    color:#333333;
    text-align: right;
  }
  .BusinessHours{
    font-size: 24px;
    color:#333333;
    margin-bottom: 30px;
    text-align: right;
  }
.indexShop{
    width: 100%;
    background: url(/images/pc/pcindex_02.jpg) no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    padding-top: 90px;
    padding-bottom: 90px;
    min-height: 597px;
}
.shopMain{
    width: 1200px;
    margin: 0 auto;
}
.shopMain .leftSide{
    width: 36%;
    float: left;
}
.shopMain .Etitle{
  text-align: right;
  margin-bottom: 2rem;
}
.shopMain .leftSide img{
    width: 100%;
}
.shopMain .leftSide iframe{
    width: 100%;
}
.shopMain .rightSideE{
    width: 50%;
    float: left;
    min-height: 400px;
    margin-left: 4%;
    padding-right: 10%;
}
.shopMain .rightSide{
    width: 50%;
    float: left;
    background:transparent;
    min-height: 400px;
    margin-left: 4%;
    padding-right: 10%;
}
.shopMain  .listImg{
    width: 100%;
    display: inline-block;
 }
 .shopMain  .listImg >li{
     width: 46%;
     margin-right: 8%;
     float: left;
     margin-bottom: 8%;
 }
 .shopMain  .listImg >li a span, .shopMain  .listImg >li a p{
     font-size: 18px;
     color:#333333;
 }
 .shopMain  .listImg > li:nth-child(2n){
     margin-right: 0%!important;
 }
 .shopMain  .onlineTimeTitle{
     font-size: 22px;
     color:#333333;
 }
 .shopMain   .onlineTimeContent{
    font-size: 22px;
    color:#333333;
    font-weight: 100;
    word-break: break-all;
    width: 150px;
    display: block;
    transform: rotate(90deg);
}
 .shopMain  .iconSide{
     width: 30px;
     height: 30px;
     background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
     background-size: 100%;
     display: block;
     float: left;
     margin-right: 10px;

 }
 .shopMain  .contentSide{
    float: left;
    width: calc(100% - 40px);
}
 .shopMain  .contentSide span{
   display: inline-block;
 }
 .shopMain  .contentSide:hover span{
   text-decoration: underline;
   transform: translateY(-3px);
 }
.shopBottom{
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-top: 50px;
}
.shopBottom a{
    background:#4d4d4d;
    border:3px solid #999999;
    background-size: 100% 100%;
    display: inline-block;
    height: 3.5rem;
    text-align: center;
    line-height: 3.5rem;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    width: 20%;
    margin-right: 7rem;
    color:#fff;
    font-weight: 500;
}
.shopBottom a img{
   width: 100%;
}
</style>
