<template>
 <div class="BranchMain">
   <div class="InnerSide">
      <div class="MapInfo">
          <p v-html="MapInfo"></p>
      </div>
      <div class="IndexShopMain">
          <p class="OurStores">{{$t('Cms.OurStores')}}</p>
          <p class="BusinessHours">{{$t('Cms.BusinessHours')}}: 07:30 - 19:00</p>
          <div class="IndexShopList">
            <div class="perList" v-for="(val,index) in ShopList" :key="index" v-on:click="showContent(val.Id,index)" :class="{'activeColor':cindex==index}">
              <div class="icon"><i></i></div>
              <div class="content">
                <p>{{val.Title}}</p>
                <p>{{val.DescOne}}</p>
                <p>{{val.DescTwo}}</p>
              </div>
            </div>
          </div>
      </div>
      <div class="IndexIconImg">
            <a href="javascript:;" v-for="(val,index) in IndexShopAds" :key="index">{{val.Title}}</a>
      </div>
   </div>
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class PkNews extends Vue {
  lastestContents: any[] = [];
  MapInfo:string='';
  ShopList:any[]=[];
  cindex:number=0;
  IndexShopAds:any[]=[];
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
  // 获取广告标语
  getShopADS () {
    var _this = this;
    this.$Api.cms.getContentsByCatId(40111, 1, 12).then(result => {
      this.IndexShopAds = result.Data;
    });
  }
  showContent (val, index) {
    this.$Api.cms.getContentByDevice({ ContentId: val, IsMobile: true }).then(result => {
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
  .MapInfo{
      width: 100%;
      img{
        width: 100%;
      }
      iframe{
        width: 100%;
        height: 30rem;
      }
 }
.BranchMain .activeColor .content p:nth-child(1){
    color: #333333!important;
    text-decoration: underline;
    font-weight: 700;
}
</style>
<style scoped lang="less">
.clear{
  clear: both;
}
.BranchMain{
  background: url('/images/mobile/MobileIndex_03.jpg') no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  padding-bottom: 2rem;
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
  .InnerSide{
    width: 90%;
    margin: 0 auto;
    margin-top: 5%;
    .IndexIconImg{
      width: 100%;
      margin: 0 auto;
      a{
        background:#4d4d4d;
        border:2px solid #999999;
        background-size: 100% 100%;
        display: inline-block;
        height: 4rem;
        text-align: center;
        line-height: 4rem;
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        width: 100%;
        color:#fff;
        font-weight: 500;
      }
      p{
        margin-bottom: 1rem;
        img{
          width: 100%;
        }
      }

    }
    .IndexShopMain{
      width: 100%;
      display: inline-block;
      margin-top: 2rem;
        .Etitle{
            text-align: right;
            width: 100%;
            margin-bottom: 1rem;
            img{
              width: 80%;
            }
          }
        .IndexShopTime{
          width: 30%;
          float: left;
          img{
            width: 100%;
            float:right;
            display: block;
          }
        }
        .IndexShopList{
          width: 100%;
          float: left;
          .perList{
            color:#FFF;
            padding-bottom: 2rem;
            display: inline-block;
            .content{
              float:left;
              width: calc(100% - 3rem);
              margin-left:1rem;
              p{
                font-size: 1.3rem;
                color:#333333;
              }
            }
            .icon{
              width: 2rem;
              float:left;
              i{
                background: url('/images/mobile/Mobile-Contact-05.png') no-repeat center center;
                width: 2rem;
                height: 2rem;
                display: block;
                background-size: contain;
              }
            }
          }
        }
        .MapInfo{
          width: 100%;
          img{
            width: 100%;
          }
        }
    }
  }
}
</style>
