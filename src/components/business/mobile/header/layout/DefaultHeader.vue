<template>
    <div class="header-box">
      <div class="headerTop">
          <ins-login />
          <ins-fav  />
          <shopcart class="shoppingcart" />
          <CodeSelect class="header-code" />
          <ins-lang-switch class="headerLang" />
      </div>
        <div class="flex-box">
        <ins-logo />
        <!-- <ins-menu /> -->
        <!-- <ins-menu :layout="1" /> -->
          <img class="slide-menu" src="/images/mobile/Mobile-index_05.png" @click="showSlideMenu" v-show="!this.$store.state.isShowMenu" />
          <img class="close-meun" src="/images/mobile/out.png" @click="showSlideMenu" v-show="this.$store.state.isShowMenu"  />
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
      .flex-box {
        height: 7rem;
        background-color: @positive_color;
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
          width: 3rem;
        }
        .close-meun {
          cursor: pointer;
          width: 2.5rem;
        }
      }
    }
.headerTop{
  width: 100%;
  display: flex;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  flex-wrap: wrap;
  .shoppingcart{
      padding-left: 1rem;
      padding-right: 1rem;
      float: left;
      height: 3.5rem;
      border-right: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .headerLang{
    width:20%;
    border-left: 1px solid #e6e6e6;
    position: absolute;
    right: 0px;
    height: 3.5rem;
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
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
