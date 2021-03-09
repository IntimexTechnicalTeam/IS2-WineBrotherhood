<template>
  <div :style="styla" v-if="ShowItems.length>0">
    <div class="in_slider_title">{{title}}</div>
    <swiper :options="SwiperOption" ref="mySwiper">
      <!-- slides -->
      <swiperSlide v-for="(page,idx) in ShowItems" :key="idx">
        <div class="in_slider_page_container" @click="click">
          <div class="in_slider_page_item" v-for="(item,index) in page" :key="index">
            <div class="in_slider_page_item" v-if="!item.virtual">
              <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:100%;"></inProductWindow>
            </div>
          </div>
        </div>
      </swiperSlide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/mobile/InsButton.vue';
import inProductWindow from '@/components/business/mobile/product/InsProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike extends Vue {
  // data
  private SwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  private InnerItems: YouWouldLike[] = [];
  private InnerItemsCopy: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  private Layer: boolean = false;
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  @Prop() private readonly pageNum!: number;
  // @Prop() private readonly items!: YouWouldLike[];
  @Prop() private readonly ProductSku!: string;
  //   method
  click (e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.nodeName === 'IMG') {
    }
  }
  buttonClick (item: YouWouldLike) {
    console.log(item);
  }
  created () {
    this.$Api.product.getRltProduct(this.ProductSku).then((result) => { this.InnerItems = result.YouWouldLike; });
  }
  @Watch('InnerItems')
  onInnerItemsChange (o, n) {
    this.InnerItemsCopy = this.InnerItems.slice();
    this.ShowItems.splice(0, this.ShowItems.length);
    while (this.InnerItemsCopy.length > 0) {
      this.ShowItems.push(this.InnerItemsCopy.splice(0, this.pageNum));
    }
    while (
      this.ShowItems.length > 0 &&
      this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
    ) {
      this.ShowItems[this.ShowItems.length - 1].push(
        new YouWouldLike('-1', '', '', '', '', '', new Currency(), '', '', new Currency(), true)
      );
    }
  }
  @Watch('productSku')
  onProductSkuChange (o, n) {
    Vue.prototype.$Api.product.getRltProduct(this.ProductSku).then(result => {
      if (Array.isArray(result.data) && result.data.length > 0) {
        result.data.foreach((element) => {
          let list:YouWouldLike[] = [];
          list.push(new YouWouldLike(element.Sku, element.Img, element.Code, element.ListPrice, element.SalePrice));
          this.InnerItems = list;
        });
      }
    });
  }
}
</script>
<style scoped>
.in_slider_title {
  text-align: center;
  margin: 4rem 0;
  font-size: 2rem;
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 4rem;
  user-select: none;
}
.in_slider_page_item {
  width: 100%;
}
</style>
