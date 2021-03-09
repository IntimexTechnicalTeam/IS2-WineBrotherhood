<template>
  <div class="in_panel_warpper PcVersion" :style="warpperStyle">
    <div class="in_panel_header">
      <div class="in_panel_title">{{panelDetail.Name}}<img :src="panelDetail.IsFavorite ? '/static/collect-icon-red-f.png': '/static/collect-icon-red.png'" @click="addFavorite"/></div>
      <div class="in_panel_subTitle" v-html="panelDetail.OverView"></div>
    </div>
    <div class="in_panel_content">
      <div class="productDetail_price_warpper">
        <div class="productDetail_price">
          <div class="productDetail_price_lable">{{$i18n.t('product.priceTitle')}}：</div>
          <inPrices :primePrices="panelDetail.LisPrice" :currentPrices="panelDetail.SalePrice" :currency="panelDetail.Currency" size="middle" styla="margin-left:50px;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices>
        </div>
        <div class="productDetail_productCode">Product Code:{{panelDetail.Code}}</div>
      </div>
      <inSelect
        v-for="(item,index) in panelDetail.AttrList"
        :items="item"
        :key="index"
        placeholder="请选择"
        v-model="ProductInfor['Attr'+(index+1)]"
        styla="padding: 0 10px;"
        @input="changeAttr"
      ></inSelect>
      <inNum :label="$i18n.t('product.countTitle')" v-model="ProductInfor.Qty" :v="ProductInfor.Qty" :min="panelDetail.MinPurQty" :max="panelDetail.MaxPurQty" styla="padding: 0 10px;"></inNum>
      <div class="in_panel_iconList">
        <div v-for="item in panelDetail.icons" :key="item.id" class="in_panel_icon_warpper">
          <img :src="item.src" />
        </div>
      </div>
    </div>
    <div class="in_panel_footer" v-show="panelDetail.ProductStatus!==-1">
      <inButton
        v-for="item in panelDetail.button"
        :nama="$i18n.t('product.'+item.nama)"
        :key="item.nama"
        width="49%"
        :type="item.type"
        :action="item.action"
        @click="click"
      ></inButton>
    </div>
    <inRecommend :Skus="ProductSku"></inRecommend>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import ProductAttr from '@/model/ProductAttr';
import Button from '@/model/Button';
import inNum from '@/components/base/pc/InsNum.vue';
import inSelect from '@/components/base/pc/InsSelect.vue';
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/pc/InsPrices.vue';
import inRecommend from '@/components/business/pc/product/InsRecommend.vue';
import ShopCartItem from '@/model/shopCartItem';
@Component({ components: { inNum, inSelect, inButton, inPrices, inRecommend } })
export default class Panel extends Vue {
  @Prop() private panelDetail!: PanelDetail;
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly ProductSku!: string;
  private delay = 0;
  private ProductInfor: ShopCartItem = new ShopCartItem();
  get warpperStyle (): string {
    return 'width:' + this.width + ';height:' + this.height + ';';
  }
  click (action: string) {
    if (action) {
      if (action === 'addToCart') {
        this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3)
          .then(
            (result) => {
              Vue.prototype.$Confirm('Message', result.Message.Message);
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
          }).catch();
      } else if (action === 'buy') {
        this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3)
          .then(
            (result) => {
              this.$router.push({ name: 'shoppingcart' });
            }).catch();
      }
    } else {
      Vue.prototype.$Confirm('action', Object.create(this.ProductInfor));
    }
  }
  created () {
  }
  addFavorite () {
    if (this.panelDetail.IsFavorite) {
      this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) { Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving')); this.panelDetail.IsFavorite = false; } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) { Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding')); this.panelDetail.IsFavorite = true; } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
  }
  // Shake (fn) {
  //   if (!(fn instanceof Function)) return;
  //   let timeout = 1000;
  //   if (this.delay === 0) { this.delay = setTimeout(fn, timeout); } else { clearTimeout(this.delay); this.delay = setTimeout(fn, timeout); }
  // }
  changeAttr () {
    this.Shake(() => {
      this.$Api.product.checkProductStatus(this.ProductSku, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3).then((result) => {
        this.panelDetail.ProductStatus = result.object0.ReturnValue;
      });
    });
  }
  @Watch('panelDetail.AttrList', { deep: true })
  onPAChange () {
    if (this.panelDetail.AttrList.length > 0 && this.panelDetail.AttrList[0].length === 0) this.changeAttr();
  }
}
</script>
<style lang="less">
.PcVersion .in_panel_footer .addToCart {
    border: 1px solid #f8ae57;
    background: #fff;
    color: #f8ae57;
}
.PcVersion .in_panel_footer .buyNow{
    border: 1px solid #262626;
    background: #262626;
    background-size: contain;
    color: #fff;
}
.PcVersion .in_panel_footer .el-button+.el-button{
  margin-left: 0px!important;
}
.PcVersion .in_panel_footer .actionBtn span{
  font-size: 1.6rem;
}
.PcVersion  .in_num_label{
  display: inline-block;
  width: auto!important;
  margin-right: 1rem;
}
.PcVersion  .el-input-number{
  border:none!important;
  box-sizing: border-box;
}
.PcVersion  .el-input__inner{
  border:none!important;
  box-sizing: border-box;
  width: 4rem;
}
.PcVersion  .el-input-number__decrease,.PcVersion .el-input-number__increase{
    width: 2.5rem!important;
    border: 1px solid #000;
    border-radius: 5px;
    height: 2.5rem;
    line-height: 2.5rem;
}
.PcVersion .el-input-number__decrease i, .el-input-number__increase i{
  color:#000;
}
.PcVersion  .el-input-number{
  width: auto!important;
}
.PcVersion .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  line-height: 2.5rem!important;
  height: 2.5rem!important;
  color:#000!important;
  font-weight: 500;
  font-size: 1.4rem;
}
</style>
<style scoped>
@media screen and (min-width: 800px)  {
  .in_panel_warpper {
    min-height: 460px;
    min-width: 368px;
  }
}
@media screen and (max-width: 800px)  {
  .in_panel_warpper {
    padding: 0 2rem;
  }
}
.Recommend{
  margin-top:12px;
}
.in_panel_header {
  text-align: left;
}
.in_panel_title {
  position: relative;
  font-size: 25px;
}
.in_panel_title img{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0,-50%);
  cursor: pointer;
}
.in_panel_content {
  min-height: 70%;
}
.in_panel_footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
  font-size: 16px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 16px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 16px;
  text-decoration: line-through;
}
.in_panel_iconList {
  margin-top: 40px;
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}
.in_panel_icon_warpper {
  margin-right: 10px;
}
</style>
