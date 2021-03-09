<template>
  <div class="handle-one" v-click-outside="closeDialog">
    <!-- <div style="display:none;">{{ shopCarts.then((result) => {this.shopCart = result.ShopCart;}) }}</div> -->
    <a
      href="javascript:;"
      class="handle-icon cart-icon handle-icon-window"
      @click="toggleDialog"
      v-show="hiddenClick"
    >
      <b v-if="shopCart.Qty">{{ shopCart.Qty }}</b>
    </a>
    <a
      href="javascript:;"
      class="handle-icon cart-icon handle-icon-window"
      v-show="!hiddenClick"
    >
      <b v-if="shopCart.Qty">{{ shopCart.Qty }}</b>
    </a>
    <!-- <a
      href="javascript:;"
      class="handle-icon cart-icon-hover handle-icon-window"
      v-if="showHomePage!=='/'"
      @click="toggleDialog"
    >
      <b v-if="shopCart.Qty">{{shopCart.Qty}}22333333</b>
    </a> -->
    <div class="top-cart-detail top-window" :class="{ showCart: isShow }">
      <div class="window-detail-title">
        <span>{{ $t("Shoppingcart.ShoppingcartTitle") }}</span>
      </div>
      <div class="cart-window-content" v-if="shopCart.Qty">
        <table>
          <tr>
            <th>{{ $t("Shoppingcart.Product") }}</th>
            <th>{{ $t("Shoppingcart.Quantity") }}</th>
            <th>{{ $t("Shoppingcart.Price") }}</th>
            <th></th>
          </tr>
          <tr v-for="(one, index) in shopCart.Items" :key="index">
            <td class="window-cart-pic"  style="display: block;text-align: center;">
              <a href="/">
                <img :src="one.Product.Img_M" />
              </a>
              <p style="font-size:16px;">{{ one.Product.Name }}</p>
              <p v-if="one.AttrName1" class="attrList">
                {{ one.AttrTypeName1 }}：{{ one.AttrName1 }}
              </p>
              <p v-if="one.AttrName2" class="attrList">
                {{ one.AttrTypeName2 }}：{{ one.AttrName2 }}
              </p>
              <p v-if="one.AttrName3" class="attrList">
                {{ one.AttrTypeName3 }}：{{ one.AttrName3 }}
              </p>
            </td>
            <td width="60" class="window-cart-num">{{ one.Qty }}</td>
            <td width="120" class="window-cart-price">
              {{ one.Product.Currency.Code }}
              {{ one.Product.SalePrice | PriceFormat }}
            </td>
            <td>
              <b class="cart-delete" @click="removeItem(one.Id)">X</b>
            </td>
          </tr>
        </table>

        <p class="cartSubtotal">
          {{ $t("Shoppingcart.Total") }}:
          <b
            >{{ shopCart.DefaultCurrency.Code }}
            {{ shopCart.TotalAmount | PriceFormat }}</b
          >
        </p>
        <p class="goToCart" @click="closeDialog">
          <router-link to="/account/shoppingcart">{{
            $t("Shoppingcart.Checkout")
          }}</router-link>
        </p>
      </div>
      <div class="void-cart" v-else>
        <img src="@/assets/Images/void-cart.png" />
        <p>{{ $t("Shoppingcart.None") }}</p>
      </div>
      <div class="cart-close" @click="closeDialog()"><span>+</span></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Message } from 'element-ui';
import ShopCart from '@/model/ShopCart';
@Component
export default class InsShoppingCart extends Vue {
  isShow: boolean = false;
  shopCart: ShopCart = new ShopCart();
  hiddenClick: boolean = true;
  toggleDialog() {
    this.isShow = !this.isShow;
  }

  closeDialog() {
    this.isShow = false;
  }

  get showHomePage() {
    return this.$route.path;
  }
  // 获取购物车商品信息
  getShopCart() {
    this.$store.dispatch(
      'setShopCart',
      this.$Api.shoppingCart.getShoppingCart()
    );
  }

  // 删除购物车商品
  removeItem(id) {
    this.$Api.shoppingCart
      .removeItem(id)
      .then(result => {
        this.getShopCart();
      })
      .catch(() => {
        Message({
          message: '移除失败！',
          type: 'error'
        });
      });
  }
  get routepath() {
    return this.$route.path;
  }
  mounted() {
    this.$store.dispatch(
      'setShopCart',
      this.$Api.shoppingCart.getShoppingCart()
    );
  }
  get shopCarts() {
    return this.$store.state.shopCart;
  }
  @Watch('shopCarts')
  onShopCartsChange() {
    this.shopCarts
      .then(result => {
        this.shopCart = result.ShopCart;
      })
      .catch(error => {
        console.log(error);
      });
  }
  @Watch('$route', { deep: true })
  onRouteChange() {
    if (this.routepath === '/account/checkout') {
      this.hiddenClick = false;
    } else {
      this.hiddenClick = true;
    }
  }
}
</script>
<style scoped lang="less">
.attrList {
  font-size: 10px;
}
@keyframes showcart {
  0% {
    right: -480px;
  }
  100% {
    right: 0px;
  }
}
.showCart {
  display: block !important;
  right: 0px !important;
  animation: showcart 1s ease-out;
}
.el-dropdown-menu {
  padding: 0;
  border: 0;
}
.cart-close {
  position: absolute;
  right: 0;
  top: 13px;
  width: 60px;
  height: 90px;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 90px;
  cursor: pointer;
}
.cart-close span {
  font-size: 30px;
  color: #191919;
  display: inline-block;
  transform: rotate(45deg);
}
.cart-icon-hover {
  background: url("/static/Image/home/cartFull_hover.png") no-repeat center
    center;
  position: relative;
  background-size: contain;
}
.cart-icon-hover b {
  position: absolute;
  right: -6px;
  top: -2px;
  background-color: #000;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
}
/*头部购物车弹框 css*/
.handle-icon {
  display: block;
  width: 25px;
  height: 25px;
  color: #cccccc;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.cart-icon {
  background: url("/images/pc/pcindex_07.png") no-repeat center center;
  background-size: contain;
  position: relative;
  cursor: pointer;
  b {
    position: absolute;
    right: -6px;
    top: -2px;
    background-color: #000;
    min-width: 18px;
    height: 18px;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
  }
}
.top-window {
  font-family: "Arial";
  position: absolute;
  z-index: 12;
  box-sizing: border-box;
  padding: 14px 14px 30px 14px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  top: 5rem;
}

.top-cart-detail {
  display: none;
  position: fixed;
  top: 0px;
  right: -480px;
  width: 480px;
  background-color: #f6f6f6;
  overflow: auto;
  overflow-x: hidden;
  padding-bottom: 30px;
  border: 1px solid #eee;
  transition: all 1s;
}

.window-top {
  position: absolute;
  // right: 77px;
  top: 2.9rem;
  width: 24px;
  height: 18px;
  background: url(../../../../assets/Images/window-top.png) no-repeat center
    center;
}
.window-detail-title {
  text-align: left;
  border-bottom: 1px solid #eeeeee;
  padding-left: 20px;
}
.top-cart-detail .window-detail-title span {
  font-size: 32px;
}
.window-detail-title span {
  display: inline-block;
  color: #191919;
  vertical-align: middle;
  padding-top: 40px;
  font-weight: bold;
  padding-bottom: 40px;
}

.cart-window-content table {
  width: 100%;
}

.void-cart {
  text-align: center;
  margin-top: 20px;
}

.void-cart img {
  width: 120px;
}

.void-cart p {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}

.cart-window-content table tr {
  border-bottom: 1px solid #d9d9d9;
}

.cart-window-content table td,
.cart-window-content table th {
  box-sizing: border-box;
  padding: 10px;
  font-size: 12px;
  text-align: center;
}

.cart-window-content table td:nth-of-type(2) {
  text-align: center;
}

.cart-window-content table th {
  font-size: 14px;
  color: #666;
  padding: 15px 10px;
  word-break: keep-all;
}

.cart-window-content table th:nth-of-type(1) {
  text-align: center;
}

.cart-delete {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #d9d9d9;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.cart-delete:hover {
  background-color: #fa4343;
}

.window-cart-num,
.window-cart-price {
  color: #dc1010;
}

.window-cart-pic img {
  border: 1px solid #f0f0f0;
  width: 68px;
}

.cartSubtotal {
  text-align: right;
  margin-top: 20px;
  font-size: 16px;
  color: #666;
  line-height: 20px;
}

.cartSubtotal b {
  margin-left: 30px;
  font-size: 18px;
  color: #dc1010;
  line-height: 20px;
  font-weight: normal;
}

.goToCart {
  margin-top: 30px;
}
.goToCart a {
  display: inline-block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  border: @base_color 1px solid;
  text-decoration: none;
  background: @base_color;
}
.cart-window-content {
  overflow-x: hidden;
  max-height: 500px;
  overflow-y: scroll;
}
</style>
