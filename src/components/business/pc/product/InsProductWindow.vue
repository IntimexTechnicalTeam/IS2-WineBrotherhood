<template>
    <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false" @click="click" v-if="item">
        <img :src="(item.Image?item.Image:item.Img)" :class="{'height_line':Enter}" :style="imgStyla" :data-key="item.Sku" @error="loadError" />
        <div class="in_pdWindow_item_description">
            <p class="in_pdWindow_item_title">{{item.Name}}</p>
            <!-- <div class="in_pdWindow_item_code">&nbsp;{{item.Code}}</div> -->
            <div class="in_pdWindow_item_price">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" size="small"></inPrices>
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
