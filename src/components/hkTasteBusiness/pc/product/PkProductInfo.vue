<template>
<div class="in_panel_header">
    <div class="p-name-box">
      <p style="width: 88%;">{{panelDetail.Name}}</p>
      <div class="in_pannel_addtofav"><img :src="panelDetail.IsFavorite ? '/images/pc/productDetail_01.png': '/images/pc/productDetail_05.png'" @click="addFavorite"/></div>
    </div>
    <div class="in_panel_subTitle"><inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" :DefaultListPrice="panelDetail.DefaultListPrice+AddPrice" :DefaultSalePrice="panelDetail.DefaultSalePrice+AddPrice" :DefaultCurrency="panelDetail.DefaultCurrency" size="huge" :heightLine="true" styla="margin: 1rem 0;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices></div>
    <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div>
    <div class="in_panel_product">
        <div class="ProductCode">
            <div class="leftpart">{{$t("product.ProductCode")}}:{{panelDetail.Code}}</div>
            <div class="rightpart"><HkProductShare></HkProductShare></div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/pc/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/pc/product/HkProductShare.vue';
@Component({ components: { inPrices, HkProductShare } })
export default class PkProductInfo extends Vue {
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  @Prop() private readonly AddPrice!: string;
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
        // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving'));
          this.$message({
            message: this.$t('product.successInRemoving') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message({
            message: this.$t('product.successInAdding') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
          this.panelDetail.IsFavorite = true;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
    return ps;
    // return this.$Api.product.addFavorite(this.ProductSku).then((result) => {
    //   if (result.Succeeded) {
    //     // Vue.prototype.$Confirm('succeed', this.$t('product.successInAdding'));
    //   } else if (result.ReturnValue.Code === 1000) {
    //     Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
    //   }
    // });
  }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style scoped lang="less">
.in_unitInfo{
  font-size: 16px;
  color:@base_color;
  text-align: right;
}
.p-name-box {
    width: 100%;
    position: relative;
    margin-top: 10px;
}
.p-name-box p {
    width: 100%;
    color: #1b1b1b;
    font-size: 26px;
    line-height: 26px;
    overflow: hidden;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    text-align: center;
}
.p-name-box .in_pannel_addtofav{
    position: absolute;
    right: 30px;
    top: 0;
    display: block;
    width: 30px;
    height: 37px;
}
.p-name-box .in_pannel_addtofav img{
    width: 30px;
    cursor: pointer;
}
.in_panel_header{
  width: 100%;
  display: block;
}
.in_panel_product{
    width: 100%;
    padding-bottom: 40px;
    border-bottom: 1px solid #505050;
    padding-top: 30px;
    margin-bottom: 10px;
}

.in_panel_product .ProductCode{
    width: 100%;
    display: block;
}
.in_panel_product .ProductCode .leftpart{
    width: 60%;
    float: left;
    font-size: 14px;
    word-break: break-all;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 0.5rem;
}
.in_panel_product .ProductCode .rightpart{
    width: 40%;
    float:left;
}
.in_panel_subTitle{
    font-size: 16px!important;
    position: relative;
    width: 88%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
</style>
