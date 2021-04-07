<template>
  <div id="container" v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div class="favorite-box order-box">
        <div class="favorite-box-top">
          <div class="login-register-title">{{$t('Shoppingcart.ShoppingcartTitle')}}</div>
          <div class="clear"></div>
        </div>
        <div class="favorite-box-content">
          <div class="order-one shoppingcart-one">
            <div class="order-one-title shoppingcart-one-title">
              <!-- <span class="order-merchant">{{$t('Shoppingcart.Merchant')}}</span> -->
              <span class="order-product-name">{{$t('Shoppingcart.Product')}}</span>
              <span class="order-quantity">{{$t('Shoppingcart.Quantity')}}</span>
              <span class="order-price">{{$t('Shoppingcart.Price')}}</span>
              <div class="clear"></div>
            </div>
            <div class="favorite-one merchant-one" v-for="(one,index) in items" :key="index">
              <router-link class="product-img" :to="'/product/detail/'+one.Product.Sku">
                <img v-bind:src="one.Product.Img_M" alt />
              </router-link>
              <div class="favorite-one-messge">
                <p class="product-title">{{one.Product.Name}}</p>
                <p class="product-code">{{one.Product.Code}}</p>
                <p class="product-code">
                  <span v-if="one.AttrName1">{{one.AttrTypeName1}}：{{one.AttrName1}}</span>&nbsp;
                  <span v-if="one.AttrName2">{{one.AttrTypeName2}}：{{one.AttrName2}}</span>&nbsp;
                  <span v-if="one.AttrName3">{{one.AttrTypeName3}}：{{one.AttrName3}}</span>&nbsp;
                </p>
                <p class="product-price">
                  <span
                    class="p-price-discount"
                  >{{Currency.Code}} {{(one.Product.SalePrice) | PriceFormat}}</span>
                </p>
              </div>
              <div class="merchant-one-calc">
                <div class="common-num">
                  <a
                    class="reduce-num"
                    href="javascript:;"
                    v-on:click=" minusQty(one,one.Id,$event);"
                  >-</a>
                  <div class="num-content">
                    <input
                      class="input-text"
                      type="text"
                      data-num="1"
                      disabled
                      v-model="one.Qty"
                      v-on:change="updateQty(one,one.Id,$event)"
                    />
                  </div>
                  <a class="add-num" href="javascript:;" v-on:click="plusQty(one,one.Id,$event);">+</a>
                  <div class="clear"></div>
                </div>
              </div>
              <div class="merchant-total-price">
                <p>{{Currency.Code}} {{(one.Product.SalePrice * one.Qty) | PriceFormat}}</p>
              </div>
              <div class="merchant-del-box">
                <b class="cart-delete" v-on:click="removeItem(index)">X</b>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="shoppingcart-handle">
          <p>
            <span>{{$t('Shoppingcart.Total')}}</span>
            <span class="total-price">{{Currency.Code}} {{(totalAmount) | PriceFormat}}</span>
          </p>
          <a href="javascript:;" class="btn" @click="submit">{{$t('Shoppingcart.CheckoutList')}}</a>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ShopCart from '../../model/ShopCart';
import ShopCartItem from '../../model/shopCartItem';
import Currency from '../../model/currency';
class Update {
  itemId!: string;
  qty!: number;
  constructor (itemId:string, qty:number) {
    this.itemId = itemId;
    this.qty = qty;
  }
}
@Component
export default class InsShoppingcart extends Vue {
  private ShoppingCart:ShopCart = new ShopCart();
  prodcutSrc: string = require('@/assets/Images/270_b.jpg');
  step: number = 1;
  totalAmount: number = 0;
  // itemsAmount: number = 0;
  // ItemsTaxAmount: number = 0;
  Currency: Currency = new Currency();
  MaxQty: number = 20;
  // cartItems: any[] = [];
  // currentCode: any = '';
  items: any[] = [
  ];
  private UpdateQueQue:Update[] = [];
  mounted () {
    // this.loadItems();
  }
  created () {
    this.load().then(() => { this.$HiddenLayer(); });
  }
  load () {
    let load = this.$Api.shoppingCart.getShoppingCart().then((result) => {
      this.ShoppingCart = result.ShopCart;
      this.Currency = result.ShopCart.DefaultCurrency;
      this.items = result.ShopCart.Items;
      if (this.ShoppingCart.Items.length === 0) this.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.None'), () => { this.$router.push('/product/search/-'); }, () => { this.$router.push('/'); });
    });
    this.loadItems();
    return load;
  }
  loadItems () {
    var _this = this;
    var itemsprice = 0;
    var Currencys;
    _this.items.forEach(element => {
      itemsprice += element.Product.SalePrice * element.Qty;
      Currencys = element.Product.Currency.Code;
    });
    // _this.Currency = Currencys;
    _this.totalAmount = itemsprice;
  }
  @Watch('items', { deep: true })
  onItemsChange (o, n) {
    this.loadItems();
  }
  removeItem (one) {
    // this.loadItems();
    let item:ShopCartItem = this.items.splice(one, 1)[0];
    this.$Api.shoppingCart.removeItem(item.Id).then(result => {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      if (this.items.length === 0) this.$Confirm(this.$t('Message.Message'), this.$t('Shoppingcart.None'), () => { this.$router.push('/product/search/-'); }, () => { this.$router.push('/'); });
    });
  }
  next () {
    // if (!this.items || this.items.length === 0) {
    //     showInfo('<%=Resources.Caption.CartEmpty%>');
    //     return false;
    // }
  }
  minusQty (one, id, event) {
    let _this = this;
    one.Qty--;
    if (one.Qty < 1) {
      one.Qty = 1;
    }
    this.Shake(() => {
      this.$Api.shoppingCart.updateItemQty(id, one.Qty).then(() => {
        this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      });
    }, 500);
    // this.UpdateQueQue.push(new Update(id, one.Qty));
    // _this.loadItems();
  }
  plusQty (one, id, event) {
    one.Qty++;
    let _this = this;
    // if (one.Qty >= this.MaxQty) {
    //   one.Qty = this.MaxQty;
    // }
    this.Shake(() => {
      this.$Api.shoppingCart.updateItemQty(id, one.Qty).then(() => {
        this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      });
    }, 500);
    // this.UpdateQueQue.push(new Update(id, one.Qty));
    // _this.loadItems();
  }
  updateQty (one, id, event) {
    let _this = this;
    if (one.Qty < 1) {
      one.Qty = 1;
    }
    // if (one.Qty >= this.MaxQty) {
    //   one.Qty = this.MaxQty;
    // }
  }
  submit () {
    let temp = {};
    let item:Update;
    let waittingList = [Promise.resolve('head')];
    while (this.UpdateQueQue.length !== 0) {
      item = this.UpdateQueQue.shift() as Update;
      temp[item.itemId] = item.qty;
    }
    Object.keys(temp).forEach((element) => {
      waittingList.push(this.$Api.shoppingCart.updateItemQty(element, temp[element]));
    });
    Promise.all(waittingList).then((result) => {
      // this.$router.push('/account/checkout');
      if (this.$Storage.get('isLogin') === 1) this.$router.push('/account/checkout');
      else {
        // this.$Login(() => { this.$ShowLayer(); this.load().then(() => { this.$HiddenLayer(); }); });
        this.$router.push('/account/login?returnurl=/account/checkout');
      }
    });
  }
}
</script>
<style scoped lang='less'>
/*我的最爱*/
#main-content {
  width: 1200px;
  margin: 0 auto;
}
/*购物流程*/
.favorite-box{
  padding-top: 60px;
  padding-bottom: 60px;
}
.favorite-box-content {
  margin-top: 20px;
}
.favorite-one .product-img {
  float: left;
  width: 10%;
  height: auto;
  border: 1px solid #e6e6e6;
}
.num-content .input-text {
  display: inline-block;
  width: 38px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: none;
  color: #999999;
  outline: none;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}
.favorite-one-messge .product-title {
  color: #333;
  font-size: 18px;
}
.favorite-one-messge .product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.favorite-one-messge .product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.order-one .product-price {
  margin-top: 14px;
}
.order-one .product-price .p-price-discount {
  color: #d92526;
  font-size: 16px;
}
.shoppingcart-one-title .order-product-name {
  width: 48.7%!important;
  margin-left: 1.6%;
  text-indent: 0px!important;
}
.shoppingcart-one-title span {
  font-size: 16px;
}
.order-one-title span {
  color: #1b1b1b;
  font-size: 14px;
  float: left;
  line-height: 35px;
}
.num-content {
  float: left;
}
.favorite-one .product-img img {
  width: 100%;
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
}
.merchant-one .favorite-one-messge {
  width: 38.7%;
}
.favorite-one-messge {
  float: left;
  margin-left: 1.7%;
  width: 51.7%;
  text-align: left;
}
.shoppingcart-one {
  margin-bottom: 60px;
}

.shoppingcart-one-title {
  border-bottom: 1px solid #1b1b1b;
  padding: 0 0 0 20px;
}

.shoppingcart-one-title span {
  font-size: 16px;
}

.shoppingcart-one-title .order-merchant {
  width: 10%;
  color: #1b1b1b;
  font-size: 18px;
}

.shoppingcart-one-title .order-product-name {
  width: 38%;
  margin-left: 1.6%;
  text-indent: 130px;
}

.shoppingcart-one-title .order-quantity {
  width: 11%;
  margin-left: 4.2%;
  text-align: center;
}

.shoppingcart-one-title .order-price {
  margin-left: 5.9%;
  width: 15.2%;
  text-align: center;
}

.merchant-one {
  border-top: 0;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
}

.merchant-one:hover {
  border-bottom: 1px solid #e6e6e6;
  background: #efefef;
}

.merchant-one .favorite-one-messge {
  width: 38.7%;
}

.merchant-one-calc {
  width: 11.2%;
  margin-left: 4.3%;
  float: left;
  text-align: center;
}

.merchant-one-calc .common-num {
  display: inline-block;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
}

.merchant-total-quantity {
  float: left;
  width: 15.5%;
  margin-left: 70px;
}

.merchant-total-quantity p {
  font-size: 20px;
  color: #d92526;
  text-align: center;
}

.merchant-total-price {
  float: left;
  width: 180px;
  margin-left: 6%;
}

.merchant-total-price p {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #d92526;
  line-height: 20px;
}

.merchant-del-box {
  float: right;
}

.shoppingcart-handle {
  text-align: right;
}

.shoppingcart-handle span {
  display: inline-block;
  font-size: 20px;
  color: #333;
  line-height: 25px;
}

.shoppingcart-handle .total-price {
  width: 230px;
  font-size: 24px;
  color: #d92526;
}

.shoppingcart-handle .btn {
  display: inline-block;
  width: 340px;
  height: 45px;
  line-height: 45px;
  color: #fff;
  font-size: 26px;
  text-align: center;
  margin-top: 50px;
  background-color: @primary_color;
  border-radius: 5px;
}
.common-num a {
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #999999;
}
.cart-delete:hover {
  background-color: #fa4343;
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
.favorite-box .login-register-title {
  margin-left: 0;
}
.login-register-title {
  float: left;
  width: 300px;
  height: 45px;
  line-height: 45px;
  margin-left: 160px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  background-color: @primary_color;
  clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -webkit-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -moz-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
  -ms-clip-path: polygon(30px 0, 300px 0, 270px 45px, 0 45px);
}
.merchant-one {
  border-top: 0;
  border-bottom: 1px solid #e6e6e6;
}
.favorite-one {
  box-sizing: border-box;
  padding: 30px 20px;
  border-top: 1px solid #e6e6e6;
  transition: 0.5s ease;
  -webkit-transition: 0.5s ease;
  -moz-transition: 0.5s ease;
  -ms-transition: 0.5s ease;
}
</style>
