<template>
  <div class="productSearchSwiper">
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
<style lang="less" scoped>
.productSearchSwiper{
  position: relative;
}
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
.TitleBg{
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;
  .innerBoxText{
    background:rgba(139, 11, 4, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-family: 'Century Gothic';
    padding: 45px;
  }
}
.swiper-container-hot{
  .swiper-slide{
    height: 502px;
    .BannerImg{
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
}

</style>
