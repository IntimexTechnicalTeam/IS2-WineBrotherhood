<template>
  <div class="in_panel_warpper mobileWarper" :style="warpperStyle">
    <div class="in_panel_content">
      <inSelect
        v-for="(item,index) in panelDetail.AttrList"
        :items="item"
        :key="index"
        placeholder="请选择"
        v-model="ProductInfor['Attr'+(index+1)]"
        @input="changeAttr"
        @changePrice="AdditionalPrice"
      ></inSelect>
      <inNum :label="$i18n.t('product.countTitle')" v-model="ProductInfor.Qty" :v="ProductInfor.Qty" :min="panelDetail.MinPurQty" :max="panelDetail.MaxPurQty" disabled  styla="text-align:center;"></inNum>
      <div class="in_panel_iconList">
        <div v-for="item in panelDetail.icons" :key="item.id" class="in_panel_icon_warpper">
          <img :src="item.src" />
        </div>
      </div>
    </div>
    <!-- <div class="in_panel_footer">
      <ElButton @click="click('addToCart')" class="actionBtn addToCart" :loading="Loading">{{$t('product.addToCart')}}</ElButton>
      <ElButton @click="click('buy')" class="actionBtn buyNow" :loading="buyLoading">{{$t('product.buy')}}</ElButton>
    </div> -->
    <div class="in_panel_footer" v-show="panelDetail.ProductStatus!==-1">
      <inButton
        v-for="item in panelDetail.button"
        :nama="$i18n.t('product.'+item.nama)"
        :key="item.nama"
        :loading="(item.action === 'addToCart')?Loading:buyLoading"
        width="100%"
        :type="(item.action === 'addToCart' || item.action === 'favorite' || item.action === 'buy') ? 'primary' : 'error'"
        :action="item.action"
        @click="click"
      ></inButton>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inNum from '@/components/base/mobile/InsNum.vue';
import inSelect from '@/components/base/mobile/InsRadio.vue';
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/mobile/product/HkProductShare.vue';
import ShopCartItem from '@/model/shopCartItem';
import { Button as ElButton } from 'element-ui';
@Component({ components: { inNum, inSelect, inButton, inPrices, HkProductShare, ElButton } })
export default class InsPanel extends Vue {
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  Loading:boolean=false;
  buyLoading:boolean=false;
  private delay = 0;
  private NewPrice:number=0;
  private attrPrices:any[]=[];
  private ProductInfor: ShopCartItem = new ShopCartItem();
  get warpperStyle (): string {
    return 'width:' + this.width + ';height:' + this.height + ';';
  }
  click (item) {
    let action = item;
    if (action) {
      if (action === 'addToCart') {
        this.Loading = true;
        this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3)
          .then(
            (result) => {
              this.$message({
                message: result.Message.Message as string,
                type: 'success',
                customClass: 'messageboxNoraml'
              });
              this.Loading = false;
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
          }).catch();
      } else if (action === 'buy') {
        this.buyLoading = true;
        this.$Api.shoppingCart.addItem(this.ProductSku, this.ProductInfor.Qty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3)
          .then(
            (result) => {
              this.buyLoading = false;
              this.$router.push({ name: 'shoppingcart' });
            }).catch();
      } else if (action === 'favorite') {
        this.addFavorite().then(() => { });
      }
    } else {
      Vue.prototype.$Confirm('action', Object.create(this.ProductInfor));
    }
  }
  created () {

  }
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving'));
          this.$message(this.$t('product.successInRemoving') as string);
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message(this.$t('product.successInAdding') as string);
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
  AdditionalPrice (getval) {
    let flag = false;
   for (var j = 0; j < this.attrPrices.length; j++) {
     if (this.attrPrices[j].TypeId === getval.TypeId) {
          flag = true;
          this.attrPrices[j] = {
            TypeId: getval.TypeId,
            AdditionalPrice: getval.AdditionalPrice
        };
      break;
      }
    }
    if (!flag) {
      this.attrPrices.push({
        TypeId: getval.TypeId,
        AdditionalPrice: getval.AdditionalPrice
      });
    }
    this.$emit('getPrice', this.attrPrices);
  }
  @Watch('panelDetail.AttrList', { deep: true })
  onPAChange () {
    if (this.panelDetail.AttrList.length > 0 && this.panelDetail.AttrList[0].length === 0) this.changeAttr();
    // if (this.panelDetail.AttrList !== null) this.changeAttr();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>

<style lang="less">
.in_panel_footer .el-button+.el-button{
  margin-left: 0px!important;
}
.in_panel_footer .actionBtn span{
  font-size: 1.6rem;
}
.in_panel_warpper .in_num_label{
  display: inline-block;
  width: auto!important;
  margin-right: 1rem;
}
.in_panel_warpper .el-input-number{
  border:none!important;
  box-sizing: border-box;
  background-color: #8b0b04;
}
.in_panel_warpper .el-input__inner{
  border:none!important;
  box-sizing: border-box;
  width: 4rem;
}
.in_panel_warpper .in_num_main .el-input-number__decrease, .in_panel_warpper .in_num_main .el-input-number__increase{
    width: 3.5rem!important;
    border: none;
    background-color: transparent;
    // height: 38px;
    line-height: 38px;
    top: 0;
}
.in_panel_warpper .in_num_main .el-input-number__decrease i, .in_panel_warpper .in_num_main .el-input-number__increase i{
  color:#fff;
  font-size: 1.4rem;
  line-height: inherit;
}
.in_panel_warpper .el-input-number{
  width: 60% !important;
  border-radius: 10px;
}
.in_panel_warpper .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  line-height: 2.5rem!important;
  height: 2.5rem!important;
  color:#fff!important;
  font-weight: 500;
  font-size: 1.4rem;
}
.mobileWarper{
  .in_panel_footer {
    .in_btn {
      height: 50px;
      font-size:1.8rem;
      color: #14234f;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #8b0b04;
      background-color: unset;
      border-radius: 10px;
      margin-bottom: 2rem;
      box-shadow: 0 0 5px #c7c7c7;
      &:last-child{
        margin-bottom: 0;
      }
      span{
        font-size:1.6rem;
        font-weight: bold;
        font-family: 'Microsoft YaHei';
      }
      // &:first-child {
      //   background-color: @base_color;
      //   color: #fff;
      // }
    }
  }
}
</style>
<style lang="less" scoped>
.in_panel_content{
  width: 95%;
  margin: 0 auto;
}
.in_panel_footer{
  width: 95%;
  margin: 0 auto;
}
.in_panel_footer .actionBtn{
  width: 100%;
  font-size: 1.6rem;
  display: block;
  text-align: center;
}
.in_panel_footer .addToCart{
  border:1px solid #262626;
  background: #fff;
  color:#242424;
  margin-bottom: 1rem;
  padding: 15px 20px!important;
}
.in_panel_footer .buyNow{
  border:1px solid #262626;
  background:#262626;
  color:#fff;
  padding: 15px 20px!important;
}

.in_pannel_addtofav {
  width:90%;
  margin: 0 auto;
}
.in_panel_header {
  text-align: left;
}
.in_panel_subTitle{
    font-size: 2rem;
    position: relative;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
.in_panel_footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 1.6rem;
}

.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 5rem;
  line-height: 5rem;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 1rem;
  margin: 1rem 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 1.3rem;
}
.productDetail_precentPrice_content {
  margin-left: 1.6rem;
  font-size: 1.3rem;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 1.6rem;
  font-size: 1.3rem;
  text-decoration: line-through;
}
.in_panel_iconList {
  margin-top: 3.3rem;
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}
.in_panel_icon_warpper {
  margin-right: 1rem;
}

</style>
