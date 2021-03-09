<template>
    <div class="in_pdWindow_page_item" :style="styla"  @mouseenter="Enter=true" @mouseleave="Enter=false" @click="click">
        <div class="top" v-if="index">
            <div class="index">{{index}}</div>
        </div>
        <img :src="(item.Image?item.Image:item.Img)" :class="{'height_line':Enter}" :data-key="item.Sku" />
        <div class="in_pdWindow_item_description">
            <div class="in_pdWindow_item_title">&nbsp;{{item.Name}}</div>
            <div class="in_pdWindow_item_code">&nbsp;{{item.Code}}</div>
            <div class="in_pdWindow_item_price">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" size="small"></inPrices>
            </div>
            <inButton v-if="button" type="primary2" borderRadius="true" :nama="$i18n.t('product.addToCart')" size="small" @click="buttonSubmit(item)"></inButton>
        </div>
    </div>
</template>
<script lang="ts">
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/pc/InsPrices.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: { inButton, inPrices } })
export default class InsProductItem extends Vue {
    private Enter:boolean = false;
    @Prop() private item!:YouWouldLike;
    @Prop() private styla!:string;
    @Prop({ default: 0 }) private index!:number;
    @Prop({ default: true }) private button!:boolean;
    @Prop({ default: false }) private borderRadius!:boolean;
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
}
</script>
<style scoped lang=less>
.in_pdWindow_page_item {
  /* width:20rem; */
  box-sizing: border-box;
  .top{
      width: 36px;
      height: 90px;
      position: absolute;
      background: url("/static/Image/pc/home/top2.png");
      background-size: 100% 100%;
      margin-left: 18px;
      .index{
          position: absolute;
          top: 40%;
          line-height: 36px;
          font-size: 18px;
          width: 100%;
          text-align: center;
          color: @primary_color2;
          font-weight: bold;
      }
  }
}
.in_pdWindow_page_item img {
  box-sizing: border-box;
  /* border: 1px solid rgba(0,0,0,0.2); */
  cursor: pointer;
  width: 100%;
}
.in_pdWindow_item_title {
  margin-top: 1rem;
  font-size: 24px;
  line-height: 26px;
  min-height: 52px;
  text-align: center;
  word-break: break-word;
}
.in_pdWindow_item_code {
  margin-top: 16px;
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
</style>
