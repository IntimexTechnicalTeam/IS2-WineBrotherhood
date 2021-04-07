<template>
  <div class="indexSale">
    <div class="TitleBg">
      <div class="innerBox">{{ $t("product.HotProducts") }}</div>
    </div>
    <transition name="slide">
      <div key="1" v-if="!waiting">
        <div class="swiper-container swiper-container-hot">
          <swiper :options="swiperOptionproduc" ref="mySwiper">
            <!-- slides -->
            <swiperSlide v-for="(slide, index) in HotSales" :key="index">
              <inProductWindow
                :item="slide"
                style="width:100%;"
                class="insProductHot"
              ></inProductWindow>
            </swiperSlide>
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
          </swiper>
        </div>
        <div class="swiper-button-next swiperProduct-button-next"></div>
        <div class="swiper-button-prev swiperProduct-button-prev"></div>
      </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import inProductWindow from '@/components/hkTasteBusiness/pc/product/HkProductWindow.vue';
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
  private waiting: boolean = true;
  HotSales: any[] = [];
  swiperOptionproduc: object = {
    slidesPerView: 4,
    slidesPerColumn: 2,
    spaceBetween: 32,
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
        this.HotSales = result.Promotion.PrmtProductList;
        this.waiting = false;
      }
    });
  }
  get lang() {
    return this.$Storage.get('locale');
  }
  mounted() {
    this.loadHotProducts();
  }
}
</script>
<style lang="less" scoped>
.TitleBg {
  text-align: center;
  margin-bottom: 70px;
  .innerBox {
    width: 100%;
    height: 100%;
    color: #8b0b04;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: 700;
    font-family: "Arial";
  }
}
.indexSale {
  width: 1200px;
  margin: 0 auto;
  padding-top: 0;
  position: relative;
}
.indexSaleTitle {
  background: url("/images/pc/index_27.png") no-repeat center center;
  width: 544px;
  height: 114px;
  background-size: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
}
.indexSaleTitleE {
  background: url("/images/pc/bigsales.png") no-repeat center center !important;
  width: 544px;
  height: 114px;
  background-size: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
}
.indexHotSale {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.perSale {
  box-sizing: border-box;
  width: 22%;
  float: left;
  margin-right: 4%;
  padding: 1.5%;
}
.perSale:nth-child(4n) {
  margin-right: 0% !important;
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
  left: -100px;
}
.swiper-button-next {
  background-image: url("/Images/mobile/hotright.png");
  right: -100px;
}
.swiper-button-prev,
.swiper-button-next {
  width: 74px;
  height: 72px;
  margin-top: 0;
  transform: translateY(-50%);
  outline: none;
  background-size: cover !important;
  z-index: 1;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
@media screen and (max-width: 1366px){
  .indexSale {
    width: 1100px;
    margin: 0 auto;
    padding-top: 0;
    position: relative;
  }
  .swiper-button-prev {
    background-image: url("/Images/mobile/hotleft.png");
    left: -70px;
  }
  .swiper-button-next {
    background-image: url("/Images/mobile/hotright.png");
    right: -70px;
  }
}
</style>
