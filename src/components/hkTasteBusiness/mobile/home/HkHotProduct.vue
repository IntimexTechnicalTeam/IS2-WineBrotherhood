<template>
  <div class="productBox">
     <div class="TitleBg"><div class="innerBox">{{$t('Cms.BigSales')}}</div></div>
    <div class="swiper-container swiper-container-hot">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
           <inProductWindow :item="slide"  style="width:100%;" class="insProductHot"></inProductWindow>
        </swiperSlide>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
        </swiper>

    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inProductWindow,
    swiper,
    swiperSlide
  }
})
export default class PkHotProduct extends Vue {
    hotProducts:any[]=[];
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
      slidesPerView: 2
    };
    loadHotProducts () {
      var page = 'Home';
      this.$Api.promotion.getPromotion('Home', 4).then((result) => {
        if (result.Promotion.PrmtProductList.length > 0) {
          this.hotProducts = result.Promotion.PrmtProductList.slice(0, 8);
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
    border-radius:0px!important;
    position: relative;
    background: #fff!important;
}
.swiper-scrollbar-drag{
      background: #666666;
      border-radius: 0px;
}
.swiper-container-horizontal > .swiper-scrollbar{
      height: 8px!important;
}
.productBox  .insProductHot img{
    width: 85%!important;
    margin: 0 auto;
    display: block;
}
</style>
<style lang="less" scoped>
.TitleBg{
  width: 90%;
  height: 5rem;
  border:1px solid #4d4d4d;
  margin: 0 auto;
  padding: .5rem;
  margin-bottom: 2rem;
  .innerBox{
    width: 100%;
    height: 100%;
    background:#4d4d4d;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.productBox {
  margin-top: 3rem;
}
.productBox a{
    text-decoration: none;
    color: #383838;
    display: block;
}
.productBox .ProductName{
    font-size: 1.8rem;
    width: 90%;
    margin: 0 auto;
    word-break: break-all;
    text-align: center;
    padding-bottom: 1rem;
    padding-top: 1rem;
    color:#0b0b0b;
}
.productBox .ProductPrice{
    font-size: 1.5rem;
    width: 90%;
    margin:0 auto;
    word-break: break-all;
    text-align: center;
    color:#0b0b0b;
    span{
      font-size: 1.8rem;
      color:#cd0909;
    }
}
.productBox .swiper-container {
  height: 22rem;
}
.productBox .swiper-wrapper {
  height: 22rem;
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
    border-image: -webkit-gradient(linear, left top, right top, from(#fff), color-stop(#3d3d3d), to(#fff)) 10;
    border-image: linear-gradient(to right, #fff, #3d3d3d, #fff) 10;
}
.BannerImg{
    width: 85%;
    margin: 0 auto;
    display: block;
    border: 1px solid #000;
    border-radius: 10px;
}
</style>
