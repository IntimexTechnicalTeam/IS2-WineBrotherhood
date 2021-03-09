<template>
  <div class="home" v-cloak>
    <HomeBanner :initOptions="swiperOption" :page="'Home'" :initSwiper="true" class="banner" />
    <HkPromotion />
    <HkBranch />
    <HkLiveBox />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    HomeBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    HkPromotion: () => import('@/components/hkTasteBusiness/mobile/home/HkPromotion.vue'),
    HkBranch: () => import('@/components/hkTasteBusiness/mobile/home/HkBranch.vue'),
    HkLiveBox: () => import('@/components/hkTasteBusiness/mobile/home/HkLiveBox.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
}
</script>

<style lang="less" scoped>
.banner {
  // min-height: 100vh;
  background-color: white;
}
</style>
