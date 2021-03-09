<template>
  <div class="in_preview_warpper" :style="warpperStyle" >
      <transition name="fade">
        <div class="img_scale" v-show="ScaleShow" @touchstart.prevent="ScaleShow=false"  @touchmove.prevent>
          <img :src="CurrentPic" @error="loadError">
        </div>
      </transition>
      <transition name="fade">
        <div class="scaleLayer" v-show="ScaleShow" @touchmove.prevent></div>
      </transition>
      <img :src="CurrentPic" @error="loadError"  @click="scale">
      <div @touchstart.stop>
      <swiper :options="SwiperOption" ref="mySwiper">
        <swiperSlide v-for="(page,idx) in ShowItems" :key="idx">
          <div class="in_slider_page_container" @click="click">
            <div class="in_slider_page_item ii" v-for="(item,index) in page" :key="index" :class="{'last':index+1 === pageNum}">
              <div class="in_slider_page_item" :class="{ 'item':!item.Virtual }" v-if="!item.Virtual">
                <img :src="item.Src[0]" :data-key="item.Src[0]" @error="loadError"/>
              </div>
            </div>
          </div>
        </swiperSlide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
class ImgItem {
  Src:string;
  Virtual:boolean;
  constructor (src:string, virtual:boolean = false) {
    this.Src = src;
    this.Virtual = virtual;
  }
}
@Component({ components: { swiper, swiperSlide } })
export default class InsPreview extends Vue {
  // data
  private InnerItems: ImgItem[] = [];
  private ShowItems: ImgItem[][] = [];
  private SwiperOption = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  private CurrentPic: string = '';
  private ScaleShow: boolean = false;
  private TouchX: number = 0;
  private TouchY: number = 0;
  // props
  @Prop() private readonly imgList!: string[];
  @Prop() private readonly height!: string;
  @Prop() private readonly width!: string;
  @Prop() private readonly styla!: string;
  @Prop() private readonly src!: string;
  @Prop() private readonly pageNum!: number;
  // computed
  get warpperStyle (): string {
    return 'width:' + this.width + ';height:' + this.height + ';' + this.styla;
  }
  // method
  logPoint (e) {
    e = e as TouchEvent;
    this.TouchX = e.touches['0'].clientX;
    this.TouchY = e.touches['0'].clientY;
  }
  scale (e) {
    this.ScaleShow = true;
    // e = e as TouchEvent;
    // if (Math.abs(this.TouchX - e.changedTouches['0'].clientX) < 20) {
    //   let target = e.target as HTMLElement;
    //   if (target.nodeName === 'IMG') {
    //     this.CurrentPic = target.dataset.key as string;
    //     this.ScaleShow = true;
    //   }
    // }
  }
  created () {
    this.CurrentPic = this.src;
    this.imgList.forEach(element => {
      this.InnerItems.push(new ImgItem(element, false));
    });
    while (this.InnerItems.length > 0) {
      this.ShowItems.push(this.InnerItems.splice(0, this.pageNum));
    }
    while (
      this.ShowItems.length > 0 &&
      this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
    ) {
      this.ShowItems[this.ShowItems.length - 1].push(
        new ImgItem('', true)
      );
    }
    document.body.addEventListener('touchstart', () => { this.ScaleShow = false; });
  }
  @Watch('imgList', { deep: true })
  imgListChange () {
    this.CurrentPic = this.imgList[0];
    this.InnerItems = [];
    this.ShowItems = [];
    this.imgList.forEach(element => {
      this.InnerItems.push(new ImgItem(element));
    });
    while (this.InnerItems.length > 0) {
      this.ShowItems.push(this.InnerItems.splice(0, this.pageNum));
    }
    while (
      this.ShowItems.length > 0 &&
      this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
    ) {
      this.ShowItems[this.ShowItems.length - 1].push(
        new ImgItem('', true)
      );
    }
  }
  click (e) {
    let target = e.target as HTMLElement;
    if (target.nodeName === 'IMG') {
      this.CurrentPic = target.dataset.key as string;
    }
  }
  // @Watch('imgList', { deep: true })
  // onImgList () {
  //   this.CurrentPic = this.src;
  //   this.InnerItems = [];
  //   this.ShowItems = [];
  //   this.imgList.forEach(element => {
  //     this.InnerItems.push(new ImgItem(element[0]));
  //   });
  //   while (this.InnerItems.length > 0) {
  //     this.ShowItems.push(this.InnerItems.splice(0, this.pageNum));
  //   }
  //   while (
  //     this.ShowItems.length > 0 &&
  //     this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
  //   ) {
  //     this.ShowItems[this.ShowItems.length - 1].push(
  //       new ImgItem('', true)
  //     );
  //   }
  // }
  mounted () {
  }
  loadError (e) {
    e.target.src = '/static/Image/proddef.jpg';
  }
}
</script>
<style scoped lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.in_preview_warpper {
  width: 100%;
  >img{
    width: 100%;
  }
}
.img_scale{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 2019;
  width: 100vw;
}
.img_scale >img{
  width: 100%;
}
.scaleLayer{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2018;
  background-color: rgba(0, 0, 0, .2);
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  /* padding: 0 50px; */
  user-select: none;
}
.ii{
    margin: 0 .5rem 0 0;
}
.last{
  margin: 0;
}
.in_slider_page_item {
  width: 100%;
  box-sizing: border-box;
  >.item{
    border: solid 1px rgba(0, 0, 0, 0.5);
    padding: 0;
  }
}
.in_slider_page_item img {
  cursor: pointer;
  width: 100%;
}
</style>
