<template>
  <div class="in_preview_warpper pkswiper">
      <div>
        <swiper :options="swiperOption" ref="mySwiper" v-if="imgList.length>0">
            <!-- slides -->
            <swiperSlide v-for="(slide, index) in imgList" :key="index">
            <img :src="slide[0]" class="BannerImg">
            </swiperSlide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({ components: { swiper, swiperSlide } })
export default class PkProductSwiper extends Vue {
  @Prop() private readonly imgList!: string[];
      swiperOption: object = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      };
}
</script>
<style lang="less">
.pkswiper{
    .swiper-pagination-bullet {
        width: 1rem!important;
        height: 1rem!important;
        margin-left: 1.5rem;
    }
    .swiper-pagination-bullet{
      background: #fff!important;
      opacity: 1!important;
    }
    .swiper-pagination-bullet-active{
        background: @base_color!important;
    }
    .swiper-pagination{
        margin-top: -1rem;
        transform: translateX(-50%) translateY(-50%);
        left: 50%;
    }
}
</style>
<style scoped lang="less">
.in_preview_warpper{
    width: 100%;
}
.in_preview_warpper .BannerImg{
    width: 100%;
    display: block;
}
.in_preview_warpper .swiper-container {
  height: 30rem;
}
.in_preview_warpper .swiper-wrapper {
  height:28rem;
}
</style>
