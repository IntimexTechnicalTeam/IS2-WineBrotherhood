<template>
  <div :style="styla">
    <div class="in_slider_title">{{title}}</div>
    <swiper :options="SwiperOption" ref="mySwiper">
      <!-- slides -->
      <swiperSlide v-for="(page,idx) in ShowItems" :key="idx">
        <div class="in_slider_page_container" @click="click">
          <div class="in_slider_page_item" v-for="(item,index) in page" :key="index">
            <div class="in_slider_page_item" v-if="!item.virtual">
              <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:100%;"></inProductWindow>
            </div>
          </div>
        </div>
      </swiperSlide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/pc/InsButton.vue';
import inProductWindow from '@/components/business/pc/product/InsProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsPyramidSelling extends Vue {
  // data
  private SwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  private InnerItems: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  @Prop() private readonly pageNum!: number;
  @Prop() private readonly items!: YouWouldLike[];
  @Prop() private readonly url!: string;
  //   method
  click (e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.nodeName === 'IMG') {
      console.log('use the ' + target.dataset.key + ' to do something');
    }
  }
  buttonClick (item: YouWouldLike) {
    console.log(item);
  }
  created () {
    if (!this.url) {
      throw new Error('inPyramidSelling component:param url is aquired!');
    } else { console.log('we used ' + this.url + ' to get source'); };
    if (!this.items) {
      throw new Error('inPyramidSelling component:param items(YouWouldLike Array) is aquired!');
    }
    this.InnerItems = this.items.slice(0);
    while (this.InnerItems.length > 0) {
      this.ShowItems.push(this.InnerItems.splice(0, this.pageNum));
    }
    while (
      this.ShowItems.length > 0 &&
      this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
    ) {
      this.ShowItems[this.ShowItems.length - 1].push(
        new YouWouldLike('-1', '', '', '', '', '', new Currency(), '', '', new Currency(), true)
      );
    }
  }
}
</script>
<style scoped>
.in_slider_title {
  margin: 4rem 0;
  font-size: 2rem;
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 4rem;
  user-select: none;
}
.in_slider_page_item {
  width: 100%;
}
</style>
