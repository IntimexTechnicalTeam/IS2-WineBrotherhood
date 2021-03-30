<template>
  <div class="productBox">
    <div class="TitleBg">
      <div class="innerBox">{{ $t("product.HotProducts") }}</div>
    </div>
    <transition name="slide">
      <div key="1" v-if="!waiting">
        <div class="swiper-container swiper-container-hot">
          <swiper :options="swiperOptionproduc" ref="mySwiper">
            <!-- slides -->
            <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
              <inProductWindow
                :item="slide"
                style="width:100%;"
                class="insProductHot"
              ></inProductWindow>
            </swiperSlide>
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
          </swiper>
          <div class="swiper-button-next swiperProduct-button-next"></div>
          <div class="swiper-button-prev swiperProduct-button-prev"></div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
import { Loading } from 'element-ui';
@Component({
  components: {
    inProductWindow,
    swiper,
    swiperSlide
  }
})
export default class PkHotProduct extends Vue {
  hotProducts: any[] = [];
  bannerImg: string = '';
  private waiting: boolean = true;
  swiperOptionproduc: object = {
    slidesPerView: 2,
    slidesPerColumn: 2,
    spaceBetween: 40,
    navigation: {
      nextEl: '.swiperProduct-button-next',
      prevEl: '.swiperProduct-button-prev'
    },
    observer: true
  };
  loadHotProducts() {
    var page = 'Home';
    this.$Api.promotion.getPromotion('Home', 4).then(result => {
      if (result.Promotion.PrmtProductList.length > 0) {
        this.hotProducts = result.Promotion.PrmtProductList;
        this.waiting = false;
      }
    });
  }
  mounted() {
    this.loadHotProducts();
  }
}
</script>
<style>
.swiper-scrollbar {
  border-radius: 0px !important;
  position: relative;
  background: #fff !important;
}
.swiper-scrollbar-drag {
  background: #666666;
  border-radius: 0px;
}
.swiper-container-horizontal > .swiper-scrollbar {
  height: 8px !important;
}
.productBox .insProductHot img {
  width: 100% !important;
  margin: 0 auto;
  display: block;
}
</style>
<style lang="less" scoped>
.TitleBg {
  text-align: center;
  margin-bottom: 2rem;
  .innerBox {
    width: 100%;
    height: 100%;
    color: #8b0b04;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    font-family: "Arial";
  }
}
.productBox {
  margin-bottom: 3rem;
}
.productBox a {
  text-decoration: none;
  color: #383838;
  display: block;
}
.productBox .ProductName {
  font-size: 1.8rem;
  width: 90%;
  margin: 0 auto;
  word-break: break-all;
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
  color: #0b0b0b;
}
.productBox .ProductPrice {
  font-size: 1.5rem;
  width: 90%;
  margin: 0 auto;
  word-break: break-all;
  text-align: center;
  color: #0b0b0b;
  span {
    font-size: 1.8rem;
    color: #cd0909;
  }
}
.productBox .swiper-container {
  // height: 22rem;
}
.productBox .swiper-wrapper {
  // height: 22rem;
}
.productBox_title {
  font-size: 2.4rem;
  text-align: center;
  text-transform: uppercase;
  color: #0b0b0b;
  margin-bottom: 5rem;
  margin-top: 5rem;
}
.gradient {
  position: relative;
  border-bottom: 1px transparent solid;
  -o-border-image: linear-gradient(to right, #fff, #3d3d3d, #fff) 10;
  border-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#fff),
      color-stop(#3d3d3d),
      to(#fff)
    )
    10;
  border-image: linear-gradient(to right, #fff, #3d3d3d, #fff) 10;
}
.BannerImg {
  width: 85%;
  margin: 0 auto;
  display: block;
  border: 1px solid #000;
  border-radius: 10px;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  height: calc((100% - 30px) / 2);

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-button-prev {
  background-image: url("/Images/mobile/hotleft.png");
  left: 0;
}
.swiper-button-next {
  background-image: url("/Images/mobile/hotright.png");
  right: 0;
}
.swiper-button-prev,
.swiper-button-next {
  width: 50px;
  height: 48px;
  background-size: initial;
  margin-top: 0;
  transform: translateY(-50%);
  outline: none;
  background-size: cover !important;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
