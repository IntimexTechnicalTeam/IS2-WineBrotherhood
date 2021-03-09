<template>
    <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false" @click="click" v-if="item">
        <img :src="(item.Image?item.Image:item.Img)" :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku" @error="loadError" />
        <div class="in_pdWindow_item_description">
            <div class="in_pdWindow_item_title">&nbsp;{{item.Name}}</div>
            <!-- <div class="in_pdWindow_item_code">&nbsp;{{item.Code}}</div> -->
            <div class="in_pdWindow_item_price">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" size="small"></inPrices>
            </div>
            <inButton type="primary2" :nama="$i18n.t('product.addToCart')" size="middle" @click="buttonSubmit(item)"></inButton>
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
<style scoped>
.in_pdWindow_page_item img {
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
}
.height_line {
  border: 1px solid black !important;
}
.in_pdWindow_item_title {
    margin-top: 1rem;
    font-size: 16px;
    line-height: 20px;
    min-height: 40px;
    text-align: center;
    width: 90%;
    margin: 0 auto;
    word-break: break-word;
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
</style>
