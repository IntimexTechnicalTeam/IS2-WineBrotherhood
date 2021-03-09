<template>
  <div id="header">
    <DefaultHeader />

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
</style>
