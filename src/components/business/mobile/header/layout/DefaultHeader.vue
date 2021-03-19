<template>
    <div class="header-box">
      <!-- <div class="headerTop">

          <CodeSelect class="header-code" />
          <ins-lang-switch class="headerLang" />
      </div> -->
      <div class="banner-bg"></div>
        <div class="flex-box">
          <div class="left">
            <ins-logo />
          </div>
          <div class="right">
            <ins-login />
            <shopcart class="shoppingcart" />
            <ins-fav  />
            <img class="slide-menu" src="/images/mobile/Mobile-index_05.png" @click="showSlideMenu" />
          </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/mobile/InsLogo.vue'),
    InsLangSwitch: () => import('@/components/business/mobile/header/InsLangSwitch.vue'),
    InsLogin: () => import('@/components/business/mobile/header/InsLogin.vue'),
    InsFav: () => import('@/components/business/mobile/header/InsFav.vue'),
    shopcart: () => import('@/components/business/mobile/header/InsShoppingCart.vue'),
    InsMenu: () => import('@/components/business/mobile/header/InsMenu.vue'),
    CodeSelect: () =>
      import('@/components/business/mobile/header/InsCodeSelect.vue')
  }
})
export default class DefaultHeader extends Vue {
  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }

  get menuShow () {
    return this.$store.state.isShowMenu;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get ShopCart () {
    return this.$store.state.shopCart;
  }
  created() {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
  }
}
</script>

<style scoped lang="less">
    .header-box {
      position: relative;
      .flex-box {
        height: 5rem;
        // background-color: @positive_color;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;

        .logo {
          width: 15rem;
          margin: 0 auto;
        }

        .slide-menu {
          cursor: pointer;
          height: 2.4rem;
          padding: 0 0.5rem;
        }
        .close-meun {
          cursor: pointer;
          width: 2.4rem;
        }
        .left{
          float: left;
        }
        .right{
          float: right;
          display: flex;
        }
      }
    }
.headerTop{
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 999;
}
.shoppingcart{
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      float: left;
      height: 2.5rem;
      // border-right: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .headerLang{
    width:20%;
    // border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 0px;
    height: 2.5rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-code{
    width:20%;
    border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 25%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
