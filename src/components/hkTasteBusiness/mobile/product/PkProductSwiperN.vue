<template>
  <div class="in_preview_warpper pkswiperN">
      <div>
        <swiper :options="swiperOption" ref="mySwiper" v-if="imgList.length>0">
            <!-- slides -->
            <swiperSlide v-for="(slide, index) in imgList" :key="index">
                <img :src="slide[0]" class="BannerImg"  @click="viewImg(index)">
            </swiperSlide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
       <Viewer :images="imgList"
                class="viewer" ref="viewer"
                @inited="inited"
        >
        <img v-for="(item,index) in imgList" :src="item[0]" :key="index" :alt="ProductTitleName" class="PreViewimage">
        </Viewer>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer/src/component.vue';
@Component({ components: { swiper, swiperSlide, Viewer } })
export default class PkProductSwiper extends Vue {
  @Prop() private readonly imgList!: string[];
  @Prop() private readonly ProductTitleName!: string[];
  private currentIndex = 0;
      swiperOption: object = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      };
  $viewer: any;
  inited(Viewer) {
      this.$viewer = Viewer;
  }
  viewImg (val) {
      this.$viewer.view(val);
  }
}
</script>
<style lang="less">
.PreViewimage {
    display: none;
}
.viewer-container {
  z-index: 9999999!important;
}
.viewer-title{
  font-size: 16px!important;
  opacity: 0.9;
  color: #fff;
}
.pkswiperN{
 .swiper-pagination-bullet {
      width: 1rem!important;
      height: 1rem!important;
      margin-left: 1rem;
      outline: 0;
  }
.swiper-pagination-bullet{
    background: #ccc;
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
.pkswiperN{
    width: 100%;
}
.pkswiperN .BannerImg{
    width: 100%;
    display: block;
}
</style>
