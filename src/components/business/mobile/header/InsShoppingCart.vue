<template>
  <div class="handle-one" v-click-outside="closeDialog">
    <div style="display:none;">{{ shopCarts.then((result) => {this.shopCart = result.ShopCart;}) }}</div>
    <a href="javascript:;" class="handle-icon cart-icon handle-icon-window"  @click="toggleDialog" v-show="hiddenClick">
      <b v-if="shopCart.Qty">{{shopCart.Qty}}</b>
      <p class="window-top" v-show="isShow"></p>
    </a>
    <a href="javascript:;" class="handle-icon cart-icon handle-icon-window" v-show="!hiddenClick">
      <b v-if="shopCart.Qty">{{shopCart.Qty}}</b>
      <p class="window-top" v-show="isShow"></p>
    </a>
    <div class="top-cart-detail top-window" v-show="isShow">

      <div class="window-detail-title">
        <b></b>
        <span>{{$t('Shoppingcart.ShoppingcartTitle')}}</span>
        <b></b>
      </div>
      <div class="cart-window-content" v-if="shopCart.Qty">
        <div class="cartscroll">
          <table>
              <tr>
                  <th width="50%">{{$t('Shoppingcart.Product')}}</th>
                  <th width="20%">{{$t('Shoppingcart.Quantity')}}</th>
                  <th width="30%">{{$t('Shoppingcart.Price')}}</th>
                  <th></th>
              </tr>
              <tr v-for="(one,index) in shopCart.Items" :key="index">
                  <td width="50%" class="window-cart-pic">
                    <div class="left">
                      <a :href="'/product/detail/'+one.Product.Sku" >
                        <img :src="one.Product.Img_M" />
                        <p>{{one.Product.Name}}</p>
                      </a>
                    </div>
                    <div class="right">
                      <p v-if="one.AttrName1" class="attrList" style="text-align:left;">{{one.AttrTypeName1}}：{{one.AttrName1}}</p>
                      <p v-if="one.AttrName2" class="attrList" style="text-align:left;">{{one.AttrTypeName2}}：{{one.AttrName2}}</p>
                      <p v-if="one.AttrName3" class="attrList" style="text-align:left;">{{one.AttrTypeName3}}：{{one.AttrName3}}</p>
                    </div>
                  </td>
                  <td width="20%" class="window-cart-num">{{one.Qty}}</td>
                  <td width="30%" class="window-cart-price">{{one.Product.Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</td>
                  <td><b class="cart-delete" @click="removeItem(one.Id)">X</b></td>
              </tr>
          </table>
        </div>
        <p class="cartSubtotal"><b>{{shopCart.Currency.Code}} {{(shopCart.TotalAmount) | PriceFormat}}</b></p>
        <p class="goToCart" @click="closeDialog"><router-link to="/account/shoppingcart">{{$t('Shoppingcart.Checkout')}}</router-link></p>
      </div>
      <div class="void-cart" v-else>
        <img src="@/assets/Images/void-cart.png" />
        <p class="fix">{{$t('Shoppingcart.None')}}</p>
        <a href="/product/search/-">{{$t('Shoppingcart.Goshoppingnow')}}</a>
      </div>
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
  hiddenClick:boolean=true;
  toggleDialog () {
    this.isShow = !this.isShow;
  }

  closeDialog () {
    this.isShow = false;
  }

  get showHomePage () {
    return this.$route.path;
  }
  // 获取购物车商品信息
  getShopCart () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
  }

  // 删除购物车商品
  removeItem (id) {
    this.$Api.shoppingCart.removeItem(id).then((result) => {
      this.getShopCart();
    }).catch(() => {
      Message({
        message: '移除失败！',
        type: 'error'
      });
    });
  }
  mounted () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
  }
  get shopCarts () {
    return this.$store.state.shopCart;
  }
  get routepath () {
    return this.$route.path;
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    if (this.routepath === '/account/checkout') {
      this.hiddenClick = false;
    } else {
      this.hiddenClick = true;
    }
  }
  created () {
    // this.getShopCart();
  }
}
</script>
<style scoped lang="less">
.attrList{
  font-size: 1rem;
}
.el-dropdown-menu {
  padding: 0;
  border: 0;
}
.cart-icon-hover{
  background: url("/static/Image/home/cartFull_hover.png") no-repeat center center;
  background-size:22.5px 22.5px;
  position: relative;
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
    width: 2rem;
    height: 2rem;
    color: #cccccc;
    transition-duration: 0.1s;
    transition-property: transform;
    transition-timing-function: ease-out;
}
.cart-icon {
  background: url("/images/mobile/Mobile-index_03.png") no-repeat center center;
  background-size: contain;
  position: relative;
  display: block;
  margin: 0 auto;
  b {
    position: absolute;
    right: -6px;
    top: -2px;
    background-color: #14234f;
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
  // top: 50px;
  left: 0;
  width: 100vw;
}

.window-top {
  position: absolute;
  // right: 77px;
  top: 2.5rem;
  width: 30px;
  height: 18px;
  background: url(../../../../assets/Images/window-top.png) no-repeat center center;
}

.window-detail-title {
    text-align: center;
    border-bottom: 1px solid @base_color;
    // padding-left: 20px;
    background: @base_color;

}

.window-detail-title b {
  display: inline-block;
  width: 70px;
  height: 3px;
  border-top: 1px solid #fff;
  margin: 0 10px;
}

.window-detail-title span {
  font-family: "Arial";
  display: inline-block;
  color: #fff;
  vertical-align: middle;
  font-size: 17px;
  line-height: 40px;
}
.cart-window-content{
    // padding: .5rem;
    .cartscroll{
      overflow-x: hidden;
      max-height: 40rem;
      overflow-y: scroll;
    }
}
.cart-window-content table {
  width: 100%;
}

.void-cart {
  text-align: center;
  margin-top: 20px;
  >a{
    padding: 1rem 2rem;
    background: #8b0b04;
    display: inline-block;
    margin-top: 1rem;
    color: #fff;
    font-size: 1.4rem;
  }
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
  display: block;
  &:last-child{
    border-bottom: none;
  }
}

.cart-window-content table td,
.cart-window-content table th {
  box-sizing: border-box;
  padding: 5px;
  font-size: 13px;
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
  text-align: left;
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
  width: 80px;
  display: inline-block;
  box-sizing: border-box;
  object-fit: cover;
  object-position: 50% 50%;
  border-radius: 10px;
  margin-bottom: 5px;
}
.window-cart-pic{
  // display: flex;
  justify-content: center;
  align-items: center;
  .left{
    text-align: center;
    p{
      color: #000;
      font-size: 1.3rem;
    }
  }
  .right{
    p.attrList{
      font-size: 1rem;
      color: #999999;
      margin-top: 5px;
    }
  }
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
    color: @base_color;
    font-size: 22px;
    font-weight: bold;
    border: @base_color 1px solid;
    text-decoration: none;
}
</style>
