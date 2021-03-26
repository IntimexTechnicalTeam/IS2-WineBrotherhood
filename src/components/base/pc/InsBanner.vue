<template>
  <div class="banner pcbanner">
    <transition name="slide">
      <div key="1" v-if="!waiting" style="display:flex;">
        <div class="swiperbg">
          <swiper :options="swiperOption" v-if="initSwiper">
            <!-- slides -->
            <swiperSlide
              v-for="(slide, index) in bannerList"
              :key="index"
              class="swiper-container-indexMain"
            >
            <a :href="slide.Url || 'javascript:;'" :target="slide.Url ? '_blank' : '_self'">
              <img :src="slide.Image"/>
            </a>
            </swiperSlide>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination swiper-pagination-banner" slot="pagination"></div> -->
            <!-- <div
              class="swiper-button-prev swiper-button-prev-banner"
              slot="button-prev"
              v-if="swiperOption.navigation && swiperOption.navigation.nextEl"
            ></div> -->
            <!-- <div
              class="swiper-button-next swiper-button-next-banner"
              slot="button-next"
              v-if="swiperOption.navigation && swiperOption.navigation.prevEl"
            ></div> -->
          </swiper>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message, Loading } from 'element-ui';
import animate from 'animate.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
// banner组件通信传值设定：
// initOptions：swiper初始化相关参数
// page：getHeaderBanner的传参
// initSwiper：是否为轮播，默认非轮播
// data：自定义banner数据

@Component({ components: { swiper, swiperSlide } })
export default class InsBanner extends Vue {
  private waiting: boolean = true;
  @Prop() private initOptions!: object;
  @Prop({ default: '' }) private page!: string;
  @Prop({ default: false }) private initSwiper!: boolean;
  @Prop() private data!: any;
  bannerList: object[] = [];
  bannerImg: string = '';
  isload: boolean = false;
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination-banner',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next-banner',
      prevEl: '.swiper-button-prev-banner'
    }
  };

  // get swiper () {
  //   return this.$refs.mySwiper.swiper;
  // }

  getBanner () {
    let _this = this;
    sdk.api.promotion.getHeaderBanner(this.page).then(
      function (data) {
        _this.bannerList = data;
        _this.bannerImg = data[0].Image;
        _this.waiting = false;
      },
      function (data) {
        Message({
          message: data,
          type: 'error'
        });
      }
    );
  }

  created () {
    if (this.initOptions) {
      this.swiperOption = this.initOptions;
    }
  }

  mounted () {
    // if (this.bannerList.length === 1) {
    // 只有1个slide，swiper会失效且隐藏切换按钮
    // this.swiper.destroy(false);
    // }
    if (this.page) {
      this.getBanner();
    } else {
      this.waiting = false;
      if (this.initSwiper) {
        this.bannerList = this.data;
        this.isload = true;
      } else {
        if (typeof this.data === 'object') {
          this.bannerImg = this.data[0].Image;
        } else if (typeof this.data === 'string') {
          this.bannerImg = this.data;
        }
      }
    }
  }
}
</script>
<style lang="less">
.pcbanner .swiper-pagination-bullet{
  width: 12px!important;
  height: 12px!important;
  background: #fff;
  opacity: 1;
}
.pcbanner .swiper-pagination-bullet-active{
  background: #666666!important;
}
</style>
<style scoped lang="less">
.pcbanner{
  min-width: 1200px;
  min-height: 28.7vw;
}
.swiperbg {
  width: 100%;
  background:#FFF;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

}
.swiper-container-indexMain img {
  width: 100%;
  min-height: 28.7vw;
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
}
.faker{
  width: 100vw;
  height: 28.7vw;
  background-color: aliceblue;
}
</style>
