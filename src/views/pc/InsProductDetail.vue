<template>
<div class="productDetailWarper PcVersion">
  <div class="productDetail_container">
    <div class="productDetail_main">
      <inPreview style="width:50%" :imgList="ImgList" :pageNum="userAgent === 'mobile' ?  1 : 4" :ProductTitleName="ProductTitleName"></inPreview>
      <div style="width:45%;margin-left:5%;float:right;">
          <PkProductInfo :panelDetail.sync="PanelDetail"  :ProductSku="ProductCode" width="100%" :AddPrice="getNewsPrice" style="margin-top:4rem;margin-bottom: 2rem;"></PkProductInfo>
          <div class="ProductRate"><Rate  v-model="Score" disabled  disabled-void-color="#5f6548" disabled-void-icon-class="el-icon-star-off"></Rate></div>
          <PkProductDetailCate :source="ExtAttrList" :cateTree="CatalogTree"  width="100%" style="margin-top:2rem;"></PkProductDetailCate>
          <inPanel :panelDetail.sync="PanelDetail" :ProductSku="ProductCode" @getPrice="showPrice" width="100%"></inPanel>
      </div>
    </div>
    <div class="tab_warpper">
      <div class="tab_header">
        <div class="detail_title" @click="IsDetail=true" v-bind:class="{isActive:IsDetail}">{{$t('product.ProductIntroduction')}}</div>
        <div class="comment_title" @click="IsDetail=false" v-bind:class="{isActive:!IsDetail}">{{$t('product.comments.title')}}</div>
      </div>
      <div class="product_detail" v-html="Tabs.Detail" v-show="IsDetail" v-if="Tabs.Detail!==''"></div>
      <div class="product_detail"  v-show="IsDetail" v-if="Tabs.Detail==''">{{$t('messageTips.NoContent')}}</div>
      <inComments :ProductSku="ProductCode" v-show="!IsDetail" style="background:#FFF;min-height: 300px;"></inComments>
    </div>
  </div>
    <div class="commentsLine"></div>
    <div class="maincontent">
    <inYouWouldLike
      styla="margin-bottom:50px;"
      :pageNum="4"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductCode"
    ></inYouWouldLike>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/pc/product/InsTab.vue';
import inYouWouldLike from '@/components/business/pc/product/InsYouWouldLike.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/hkTasteBusiness/pc/product/InsPanel.vue';
import inPreview from '@/components/business/pc/product/InsPreviewN.vue';
import inProductUpOrDown from '@/components/business/pc/product/InsProductUpOrDown.vue';
import ProductAttr from '@/model/ProductAttr';
import Tab from '@/model/Tab';
import inComments from '@/components/business/pc/product/InsComments.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/pc/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/pc/product/PkProductInfo.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue';
import { Rate } from 'element-ui';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inComments,
  inProductUpOrDown,
  PkProductDetailCate,
  PkProductInfo,
  ProductListSwiper,
  Rate
} })
export default class InsProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab[] = [new Tab('none')];
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', 0, 0, 0, 0, '');
  private Src: string = '';
  private IsDetail:boolean = true;
  private ImgList: string[] = [];
  private ProductCode:string = '0';
  private ExtAttrList: any[] = [];
  private ProductSku:string = '0';
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  private ProductTitleName:string = '';
  get pc () {
    return this.$route.params.id;
  }
  showPrice (val) {
    if (val[0]) {
      this.PriceA = val[0].AdditionalPrice;
    }
    if (val[1]) {
      this.PriceB = val[1].AdditionalPrice;
    }
    if (val[2]) {
      this.PriceC = val[2].AdditionalPrice;
    }
    this.getNewsPrice = this.PriceA + this.PriceB + this.PriceC;
  }
  created () {
    this.getProduct();
  }
  getProduct () {
    var that = this;
    that.ProductCode = that.$route.params.id ? that.$route.params.id : '0';
    // 获取产品详情数据
    that.$Api.product.GetProduct(that.pc).then((result) => {
      that.$nextTick(() => {
        document.title = result.PanelDetail.Name;
      });
      that.PanelDetail = result.PanelDetail;
      that.ExtAttrList = result.PanelDetail.ExtAttrList;
      that.CatalogTree = result.PanelDetail.CatalogTree;
      that.Score = result.PanelDetail.Score;
      that.ImgList = result.AdditionalImage;
      that.Tabs = result.Tab;
      this.ProductTitleName = result.PanelDetail.Name;
      that.$HiddenLayer();
    });
  }
  mounted () {

  }
  @Watch('pc', { deep: true })
  onWatchRoute (o, n) {
    this.$store.dispatch('setProductDetailSku', this.pc);
    this.getProduct();
  }
  gotoSlider () {
    this.$nextTick(() => {
      let target = document.getElementById('tab') as HTMLElement;
      target.scrollIntoView();
    });
  }
}
</script>
<style  lang="less">
.PcVersion .product_detail p,.product_detail h3{
  padding:2rem;
}
.PcVersion .product_detail h3{
  font-size:1.4rem;
  font-weight:100;
}
.PcVersion .el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.PcVersion .productDetail_container .in_pdWindow_item_description{
    .currentPricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .primePricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
.PcVersion .productDetail_container {
  .currentPricesMain{
    display: flex;
    float: right;
    align-items: baseline;
    height: 3rem;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1.6rem;
      }
      &:nth-child(2){
        font-size:2rem;
        color:#b40606;
        font-weight: 700;
      }
    }
  }
  .primePricesMain{
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1rem;
        color: #999;
        text-decoration: line-through;
      }
      &:nth-child(2){
        font-size: 1rem;
        color: #999;
        text-decoration: line-through;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    .innerBanner{
      width: 100%;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
  }
.productDetailWarper{
  width: 100%;
  display: inline-block;
  background: #fff;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.commentsLine{
    width: 100%;
    height: 1px;
    background: #000;
    margin-top: 100px;
}
.isActive{
  color:#FFF!important;
  background: #262626 !important;
  border:1px solid #262626;
}
.productDetail_container {
  margin:0 auto;
  width:1200px;
  display: block;
  .tab_warpper{
    margin: 5rem 0 0 0;
    .tab_header{
      display: inline-block;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 10px;
      .comment_title,.detail_title{
        width: 20%;
        text-align: center;
        font-size: 20px;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border:1px solid #000;
        float: left;
        margin-right:24px;
        cursor: pointer;
        background: #FFF;
        border-radius: 5px;
        color:#000;
      }
      .comment_title{
        border:1px solid #000;
        color:#000;
        cursor: pointer;
      }
    }
    .product_detail{
      background-color: white;
      padding: 1rem;
      display: block;
      clear: both;
      min-height: 300px;
      border:1px solid #000;
      border-radius: 5px;
      p{
        font-size: 1.6rem;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
}
.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 10px;
  margin: 10px 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 24px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 24px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 24px;
  text-decoration: line-through;
}
</style>
