<template>
  <div class="PcVersion">
  <div class="productMain" v-if="item">
    <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false" @click="click">
      <div class="topWindowsImg">
        <img :src="(item.Image?item.Image:item.Img)" :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku" @error="loadError" />
        <inButton type="primary2" :nama="$i18n.t('product.addToCart')" size="middle" @click="buttonSubmit(item)" :class="{'showBtn':Enter}"></inButton>
      </div>
        <div class="in_pdWindow_item_description">
            <p class="in_pdWindow_item_title">{{item.Name}}</p>
            <!-- <div class="in_pdWindow_item_code">&nbsp;{{item.Code}}</div> -->
            <div class="in_pdWindow_item_price">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" size="small"></inPrices>
            </div>
        </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import inButton from '@/components/base/mobile/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: { inButton, inPrices } })
export default class InsProductWindow extends Vue {
    private Enter:boolean = false;
    @Prop() private item!:YouWouldLike;
    @Prop() private imgStyla!:string;
    @Prop() private styla!:string;
    buttonSubmit (item) {
      this.$router.push({
        path: '/product/detail',
        name: 'ProductsDetail',
        params: {
          id: item.Sku
        }
      });
    }
    click (e) {
      let target = e.target as HTMLElement;
      if (target.nodeName === 'IMG') { this.$router.push('/product/detail/' + target.dataset.key); };
    }
    loadError (e) {
      e.target.src = '/static/Image/proddef.jpg';
    }
}
</script>
<style lang="less">
.PcVersion .in_pdWindow_item_price .currentPricesMain ,.in_pdWindow_item_price .primePricesMain{
  width: 100%;
  display: inline-block;
  text-align: center;
}
.PcVersion .in_pdWindow_item_price .currentPricesMain  .small:nth-child(1) {
  font-size: 1.5rem;
  word-break: break-all;
  text-align: center;
  text-shadow: #fff 3px 0 0, #fff 0 3px 0, #fff -3px 0 0, #fff 0 -3px 0;
  color: #0b0b0b;
  display: inline-block;
}
.PcVersion .in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
    font-size: 1.8rem;
    color: #cd0909;
    display: inline-block;
}
.PcVersion .in_pdWindow_item_price .primePricesMain  .small:nth-child(1) {
  font-size: 1.2rem;
  word-break: break-all;
  text-align: center;
  color: #0b0b0b;
  display: inline-block;
  text-decoration:line-through;
}
.PcVersion .in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
    font-size: 1.2rem;
    color:#0b0b0b;
    display:inline-block;
}
</style>
<style scoped>
.productMain{
  width: 100%;
  display: block;
}
.topWindowsImg{
  width: 100%;
  position: relative;
}
.product_item{
  width: 33.3% !important;
  padding: 0rem .6rem 0!important;
  margin-bottom: 2rem;
  float: left;
}
 @keyframes picDraw {
            0%{
                opacity: 0;
                height: 0px;
            }
            100%{
                opacity: 1;
                height: 53px;
            }
  }
  @-moz-keyframes picDraw {
            0%{
                opacity: 0;
                height: 0px;
            }
            100%{
                opacity: 1;
                height: 53px;
            }
  }
.in_pdWindow_page_item .primary2{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 0;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
    line-height: 53px;
    font-size: 18px;
    background-color: #7accc8;
    opacity: 0;
    z-index: 999;
    border:none!important;
    margin: 0px!important;
}
.showBtn{
  opacity: 1!important;
  height: 53px!important;
  animation: picDraw .5s ease-out;
  -moz-animation:picDraw .5s ease-out;
  -webkit-animation:picDraw .5s ease-out;
}
.in_pdWindow_page_item img {
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  z-index: 1;
  position: relative;
}
.height_line {
  border: 1px solid #7accc8 !important;
}
.in_pdWindow_item_title {
    font-size: 18px;
    color: #383838;
    text-align: center;
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    padding: 0 5px;
}
.in_pdWindow_item_code {
  margin-top: 1rem;
  color: #999999;
  text-align: center;
}
.in_pdWindow_item_price {
  margin-top: 1rem;
}
.in_pdWindow_item_price > .salePrice {
  color: #999999;
  text-decoration: line-through;
}
.in_pdWindow_item_price > .listPrice {
  font-size: 1.5rem;
  color: red;
}
.in_pdWindow_item_description{
  margin-top: 10px;
}
</style>
