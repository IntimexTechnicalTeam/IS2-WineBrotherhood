<template>
  <div class="productSearchSwiper">
    <p class="gradient"></p>
    <div class="swiper-container swiper-container-hot">
        <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(slide, index) in hotProducts" :key="index">
          <img :src="slide.Image" class="BannerImg">
        </swiperSlide>
        </swiper>
        <div class="TitleBg"><div class="innerBoxText">{{TitleName}}</div></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({ components: { swiper, swiperSlide } })
export default class PkProductListSwiper extends Vue {
    hotProducts:any[]=[];
    bannerImg: string = '';
    @Prop() private TitleName!: string;
    swiperOption: object = {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    };
    loadHotProducts () {
      this.$Api.promotion.getPromotion('PromProductList', 0).then((result) => {
        if (result.Promotion.BannerList.length > 0) {
          this.hotProducts = result.Promotion.BannerList;
        }
      });
    }
    mounted () {
      this.loadHotProducts();
    }
}
</script>
<style lang="less">
.productSearchSwiper  .swiper-pagination-bullet {
    width: 1rem!important;
    height: 1rem!important;
    margin-left: 5px;
}
.productSearchSwiper  .swiper-pagination-bullet-active{
    background: #f7a13a !important;
}
.productSearchSwiper   .swiper-pagination{
    margin-top: -4rem;
    transform: translateX(-50%) translateY(-50%);
    left: 50%;
}
</style>
<style lang="less" scoped>
.BannerImg{
    width: 100%;
    display: block;
}
.swiper-container-hot{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.TitleBg{
  width: auto;
  height: auto;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  // left:50%;
  z-index: 999;
  transform: translateY(-50%);
  .innerBoxText{
    background: rgba(139, 11, 4, 0.5);
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 500;
    font-family: 'Century Gothic';
    padding: 2rem 2rem;
    width: auto;
    height: auto;
  }
}
</style>
