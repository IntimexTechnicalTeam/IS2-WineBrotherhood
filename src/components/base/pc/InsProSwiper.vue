<template>
    <swiper :options="swiperOption" ref="mySwiper">
      <swiperSlide v-for="(p, index) in ProductList" :key="index">
        <!-- <div class="pro_one" @click="toProDetail(p.Sku)">
          <div class="pro_img">
            <img :src="p.Img" />
          </div>
          <div class="pro_desc">
            <p class="pro_name">{{p.Name}}</p>
            <p>HKD {{p.SalePrice}}</p>
          </div>
        </div> -->
        <inProductWindow :item="p" />
      </swiperSlide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inProductWindow: () => import('@/components/business/mobile/product/InsProductWindow.vue'),
    swiper,
    swiperSlide
  }
})
export default class InsProSwiper extends Vue {
  @Prop() private ProductList!: object[];
  @Prop({ default: 1 }) private slidesPerView!: number;
  @Prop({ default: 0 }) private spaceBetween!: number;

  swiperOption: object = {};

  toProDetail (Sku) {
    this.$router.push({ name: 'ProductsDetail', params: { id: Sku } });
  }

  created () {
    this.swiperOption = {
      // autoplay: {
      //   disableOnInteraction: false
      // },
      slidesPerView: this.slidesPerView,
      spaceBetween: this.spaceBetween,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    };
  }
}
</script>

<style scoped lang="less">
.in_slider_page_item {
  width:auto !important;
}

.swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
  pointer-events: auto;
}

.swiper-slide {
  .pro_one {
    border: 1px solid #ccc;

    .pro_img {
      padding: 10px;

      img {
        max-width: 100%;
      }
    }

    .pro_desc {
      padding: 10px;
      text-align: center;

      .pro_name {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
