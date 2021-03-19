<template>
  <div id="header">
    <DefaultHeader :class="{headerTop: $route.name == 'home'}" id="headerTop"/>

    <FixedHeader v-if="this.FrontE.fixedHeader" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    DefaultHeader: () => import('@/components/business/mobile/header/layout/DefaultHeader.vue'),
    FixedHeader: () => import('@/components/business/mobile/header/layout/FixedHeader.vue')
  }
})
export default class InsHeader extends Vue {
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.$store.dispatch('setHeaderMenus', result.ReturnValue.HeaderMenus);
      this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
    }).catch((error) => {
      console.log(error);
    });
  }

  created () {
    this.getMenu();
  }
}
</script>

<style lang="less">
  // #header {
  //   .FixedHeader {
  //     .header-box {
  //       width: 100%;
  //     }
  //   }
  // }
  .header-box{
    box-shadow: 0 0 10px 0 #d4d5d1;
    background-color: #8B0B04;
  }
  .headerTop{
    background-color: transparent;
    box-shadow: none;
    .banner-bg{
      width: 100%;
      height: 12rem;
      background-image: linear-gradient(rgba(138,12,7,0.5), rgba(255,255,255,0));
      // opacity: 0.3;
      position: absolute;
      top: 0;
    }
  }

</style>
