<template>
  <div :style="styla" v-if="ShowItemsLength>0">
    <div class="in_slider_title">{{title}}</div>
    <swiper :options="SwiperOption" ref="mySwiper">
      <!-- slides -->
      <swiperSlide v-for="(item,idx) in InnerItems" :key="idx">
        <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:70%;margin:0 auto;padding-bottom:2rem;margin-bottom: 3rem;"></inProductWindow>
      </swiperSlide>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/mobile/InsButton.vue';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike2 extends Vue {
  // data
  private SwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    scrollbar: {
      el: '.swiper-scrollbar'
    },
    slidesPerView: 1
  };
  private InnerItems: YouWouldLike[] = [];
  private InnerItemsCopy: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  private Layer: boolean = false;
  private ShowItemsLength: number = 0;
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  // @Prop() private readonly pageNum!: number;
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
    this.$Api.product.getRltProduct(this.ProductSku).then((result) => { this.InnerItems = result.YouWouldLike; this.ShowItemsLength = result.YouWouldLike.length; });
  }
  @Watch('ProductSku')
  onProductSkuChange (o, n) {
    this.$Api.product.getRltProduct(this.ProductSku).then(result => {
      this.InnerItems = result.YouWouldLike;
      this.ShowItemsLength = result.YouWouldLike.length;
    });
  }
}
</script>
<style>
.swiper-scrollbar {
   border-radius:0px!important;
    position: relative;
    background: #f2f2f2!important;
}
.swiper-scrollbar-drag{
      background: #d9d9d9;
}
.swiper-container-horizontal > .swiper-scrollbar{
      height: 10px!important;
}
</style>
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
