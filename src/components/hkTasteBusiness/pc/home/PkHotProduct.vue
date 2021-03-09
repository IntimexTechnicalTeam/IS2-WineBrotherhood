<template>
  <div class="productBox">
    <p class="gradient"></p>
    <p class="productBox_title">{{$t('home.SelectedProduction')}}</p>
    <div class="swiper-container swiper-container-hot">
      <div class="swiper-wrapper productBox_in">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
          <div class="product-one">
            <router-link class="product-img" :to="'/product/detail/'+slide.Sku">
              <img :src="slide.Img_L" />
            </router-link>
            <div class="captn">
              <p class="p-name">{{slide.Name}}</p>
              <div class="p-price-box">
                <!-- <p
                  class="p-price-common"
                  v-if="slide.HasDiscount"
                >{{slide.Currency.Code}} {{slide.ListPrice}}</p> -->
                <p class="p-price-discount">{{slide.Currency.Code}} {{slide.SalePrice}}</p>
              </div>
            </div>
          </div>
        </swiperSlide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({ components: { swiper, swiperSlide } })
export default class PkHotProduct extends Vue {
  hotProducts: any[] = [];
  bannerImg: string = '';
  swiperOption: object = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    scrollbar: {
      el: '.swiper-scrollbar'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 5,
    slidesPerColumn: 2
  };
  loadHotProducts () {
    var page = 'Home';
    this.$Api.promotion.getPromotion('Home', 2).then(result => {
      if (result.Promotion.PrmtProductList.length > 0) {
        this.hotProducts = result.Promotion.PrmtProductList;
      }
    });
  }
  mounted () {
    this.loadHotProducts();
  }
}
</script>
<style>
.swiper-scrollbar {
  border-radius: 0px !important;
  position: relative;
  background: #f2f2f2 !important;
}
.swiper-scrollbar-drag {
  background: #d9d9d9;
}
.swiper-container-horizontal > .swiper-scrollbar {
  height: 10px !important;
}
.productBox .swiper-slide{
  height: auto!important;
}
.swiper-slide img {
    width: 100%;
}
</style>
<style lang="less" scoped>
.swiper-container-hot {
  width: 76.5%;
  margin: 0 auto;
}
.productBox {
  padding-top: 140px;
  padding-bottom: 20px;
}
.productBox_title {
  font-size: 36px;
  text-align: center;
  line-height: 36px;
  margin-bottom: 80px;
}
.productBox_in {
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 50px;
}
.productBox_in .product-one {
  width: 86.6%;
  margin: 0 auto;
  margin-bottom: 60px;
  box-sizing: border-box;
  text-align: center;
}
.productBox_in .product-one > a {
  display: block;
  width: 100%;
  border: 2px solid #f6f6f6;
  transition: all 0.3s ease;
}
.productBox_in .product-one > a:hover {
      border: 2px solid #7accc8;
}
.product-one .p-name{
  margin-bottom: 10px;
}
.productBox_in .product-one > a img {
  max-width: 100%;
  max-height: 100%;
}
.productBox_in .product-one:nth-of-type(5n) {
  margin-right: 0;
}
</style>
