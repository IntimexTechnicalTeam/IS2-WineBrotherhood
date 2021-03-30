<template>
  <div class="checkoutn_warpper mobileV">
    <div class="shoppingcart_header" >{{$t('Action.Checkout')}}</div>
    <div class="main_warpper">
        <div class="checkoutl checkoutr">
            <div class="shopCart_warpper">
              <div class="shopcartTitle">{{$t('CheckOut.Product')}}</div>
              <div :style="{ height: items*144 + 'px'}" class="item_change">
                  <ShoppingCartItem v-for="(item,index) in Shoppcart.Items" :key="index" :index="index" :ShopcartItem="item" :lock="true" ></ShoppingCartItem>
              </div>
              <div class="shopcartItem_border">
                  <div class="show_all" @click="allShopCart=!allShopCart">{{allShopCart ? $t('Shoppingcart.hide')  : $t('Shoppingcart.more')}}</div>
              </div>
            </div>
            <InsExpressWay
            @expressError="express=false" @express="express=true" @PickAddressError="PickAddress = false" @PickAddress="PickAddress = true"
            :checkouting="checkouting"
             @getAdditionlCost="showAdditionlCost"
             @getDeliveryDate="showDeliveryDate"
             @getRemark="showRemark"
            @expressChange="(value)=>{this.express = value;}"
            :lockFare="!checkouting" />
            <div class="coupon_warpper" v-if="promotionCode === '' && coupon.length > 0">
                  <div class="coupon_alltitle">{{$t('MyCoupon.Coupon')}}</div>
                  <div class="coupon_main">
                    <div v-if="checkouting">
                        <CheckboxGroup size="mini" v-model="delete1">
                            <Checkbox v-for="(item,index) in coupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="item.canCheck" @change="checkChange(item)">
                              <div class="coupon_item">
                                <div class="coupon_title">{{item.Title}}</div>
                                <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                                <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                                <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                                <div class="coupon_is_valid">
                                  <span class="valid_content">{{ !item.canCheck ? $t('MyCoupon.Used') : $t('MyCoupon.NotUse') }}</span>
                                </div>
                              </div>
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div v-else>
                      <CheckboxGroup size="mini" v-model="delete1">
                          <Checkbox v-for="(item,index) in selectedCoupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="true" >
                            <div class="coupon_item">
                              <div class="coupon_title">{{item.Title}}</div>
                              <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                              <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                              <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                              <div class="coupon_is_valid">
                                <span class="valid_content">{{ !item.canCheck ? $t('MyCoupon.Used') : $t('MyCoupon.NotUse') }}</span>
                              </div>
                            </div>
                          </Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
            </div>
            <div v-else-if="promotionCode !== '' && coupon.length > 0" >
              <!-- <div class="coupon_alltitle">{{$t('MyCoupon.Coupon')}}</div>
              <div class="coupon_main">
                <CheckboxGroup size="mini" v-model="delete1">
                    <Checkbox v-for="(item,index) in coupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="true">
                      <div class="coupon_item">
                        <div class="coupon_title">{{item.Title}}</div>
                        <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                        <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                        <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                        <div class="coupon_is_valid">
                          <span class="valid_content">{{ $t('MyCoupon.NotUse') }}</span>
                        </div>
                      </div>
                    </Checkbox>
                </CheckboxGroup>
              </div> -->
              <div class="candp">
                {{this.$t('CheckOut.CandP')}}
              </div>
            </div>
            <div class="payment_warpper" v-else-if='coupon.length === 0'>
                <div class="payment_main">
                  <div class="payment_title">{{$t('CheckOut.PayBy')}}</div>
                  <div class="payment_item" v-for="(pay, index) in payments" :key="index">
                    <Radio v-model="payment" :label="pay"><img v-bind:src="pay.Img" /><span v-show="pay.Code==='FPS'">{{pay.Desc}}</span></Radio>
                  </div>
                </div>
            </div>
        </div>
        <div class="checkoutr">
            <div class="shopCart_warpper">
              <div class="shopcartTitle">{{$t('CheckOut.Ordersummary')}}</div>
              <div class="price">
                <div class="price_item">
                  <span>{{$t('Order.DeliveryCharge')}}:</span>
                  <span>{{Shoppcart.DefaultCurrency.Code}} {{($store.state.express.DiscountPrice + AdditionlCost) | PriceFormat}}</span>
                </div>
                <div class="price_item">
                  <span>{{$t('Order.CommodityPrice')}}:</span>
                  <span>{{Shoppcart.DefaultCurrency.Code}} {{(totalAmount) | PriceFormat}}</span>
                </div>
              </div>
              <div class="discount discount_price">
                <p class="price_item price_Couponcode" v-show="checkouting">
                  <span>{{$t('CheckOut.Couponcode')}}</span>
                  <span style="flex-shrink:0;">
                    <ElInput :placeholder="$t('CheckOut.Couponcode')" class="input-text promotion_code" v-bind:disabled="orderSure" v-model="promotionCode" clearable></ElInput>
                    <a
                      href="javascript:;"
                      class="promotion-code-btn"
                      v-on:click="searchCoupon"
                    >{{$t('CheckOut.confirm')}}</a>
                  </span>
                </p>
                <p v-if="promotionCode===''" class="promotionCodeTips">{{$t('Action.PromotionCodeTips')}}</p>
                <div class="price_item">
                  <span class="Discountbox">{{$t('Order.Discount')}}:</span>
                <p v-show="showDistcount" class="Discount_promotion">
                    <span class="promotionA">
                      <!-- <i>{{promotionCode}};</i><br/> -->
                      {{$t('Message.AdditionalDiscount')}}
                      </span>
                    <span class="promotionB">-{{Shoppcart.DefaultCurrency.Code}} {{(totalAmount - (parseFloat(cp))) | PriceFormat}}</span>
                    <span class="promotionC" @click="promotionCodeCancel">{{$t('Message.Delete')}}</span>
                  </p>
                  <span v-show="!showDistcount">{{Shoppcart.DefaultCurrency.Code}} {{(totalAmount - (parseFloat(cp))) | PriceFormat}}</span>
                </div>
              </div>
              <div class="price">
                <div class="priceTotal">
                  <span class="TotalFont">{{$t('CheckOut.Total')}}:</span>
                  <span class="DefaultCurrency">{{Shoppcart.DefaultCurrency.Code}}  {{parseFloat((parseFloat(cp))+ $store.state.express.DiscountPrice + AdditionlCost).toFixed(2)}}</span>
                   <p v-show="Shoppcart.DefaultCurrency.Code!=Shoppcart.Currency.Code" class="Currency">
                      <span>≈{{Shoppcart.Currency.Code}} {{parseFloat(((parseFloat(cp))+ $store.state.express.DiscountPrice + AdditionlCost)*Shoppcart.ExchangeRate).toFixed(2)}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div v-if="coupon.length > 0" class="payment_warpper">
                <div class="payment_main">
                  <div class="payment_title">{{$t('CheckOut.PayBy')}}</div>
                  <div class="payment_item" v-for="(pay, index) in payments" :key="index">
                    <Radio v-model="payment" :label="pay"><img v-bind:src="pay.Img" /><span v-show="pay.Code==='FPS'">{{pay.Desc}}</span></Radio>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div class="btn_warpper">
      <InsButton style="display:inline-block;margin-top:20px" class="btnStyle" width="100%" size="middle" :nama="$t('CheckOut.Checkout')" @click="checkOut" :loading="COloading"/>
      <InsButton v-show="checkouting" style="display:inline-block;" class="btnStyle" width="100%" size="middle" :nama="$t('CheckOut.BacktoShoppingCart')" @click="Hyperlink"  />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ShoppingCartItem from '@/components/business/mobile/account/InsSCIforCheckout.vue';
import ShopCart from '@/model/ShopCart';
import Collaspe from '@/components/service/Collapse.vue';
import PaymentM from '@/model/payment';
import InsExpressWay from '@/components/temp/InsExpressWayM.vue';
import Order, { CreateOrder } from '@/model/order';
import PickupAddress from '@/model/pickupAddress';
import PromotionDiscount from '@/model/PromotionDiscount';
import Express from '@/model/express';
import Coupon from '@/model/coupon';
import InsCoupon from '@/components/temp/InsCoupon.vue';
import InsButton from '@/components/base/pc/InsButton.vue';
import { CheckboxGroup, Checkbox, Radio, Input as ElInput } from 'element-ui';
@Component({ components: { ShoppingCartItem, Collaspe, InsExpressWay, InsCoupon, InsButton, CheckboxGroup, Checkbox, Radio, ElInput } })
export default class InsCheckoutN extends Vue {
    private Shoppcart:ShopCart = new ShopCart();
    private totalAmount:number = 0;
    private allShopCart:boolean = false;
    private payment: PaymentM = new PaymentM();
    private payments:PaymentM[] = [new PaymentM()];
    private orderId:number = 0;
    private delete1: any = [];
    private promotionCode:string = '';
    private checkouting = true;
    private express:boolean = false;
    private PickAddress: boolean = false;
    // 優惠券相關
    private coupon:Coupon[] = [];
    private selectedCoupon:Coupon[] = [];
    private multiple:Coupon[] = [];
    private single:Coupon[] = [];
    private all = {};
    private currentPrice: number = 0;
    private ll: boolean = false;
    private exp: number = 0;
    private showDistcount :boolean = false;
    private AdditionlCost:number = 0;
    private TimeRangeId:string='';
    private DeliveryDate:string='';
    private Remark:string='';
    private CurrentPage: number = 1;
    private pageNumber: number = 10;

    // 點擊創建訂單后loading
    COloading = false;
    data () {
      return {
        orderSure: false
      };
    }
    showAdditionlCost (valA, valB) {
      this.AdditionlCost = valA;
      this.TimeRangeId = valB;
    }
    showDeliveryDate (val) {
      this.DeliveryDate = val;
    }
    showRemark (val) {
      this.Remark = val;
    }
    Hyperlink () {
      this.$router.push('/account/shoppingcart');
    }
    created () {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      this.$store.dispatch('setAddress', this.$Api.checkout.getAddress2());
      let pm = this.$Api.checkout.getPaymentMethod().then(result => {
        this.payments = result.Payment;
      });
      Promise.all([this.$store.state.shopCart, this.$store.state.address, pm]).then((result) => {
        let sc = result[0];
        this.totalAmount = sc.ShopCart.TotalAmount;
        this.currentPrice = this.totalP;
        this.Shoppcart = sc.ShopCart;

        this.$Api.member.getActiveCoupon({ Page: this.CurrentPage, PageSize: this.pageNumber }).then((result) => {
          this.coupon = result.Coupon;
          this.coupon.forEach((element) => {
            if (element.MeetAmount >= this.totalP) return;
            element.canCheck = false;
            this.$set(this.all, element.Id, element);
            if (element.IsAdditional === true) this.multiple.push(element);
            else this.single.push(element);
          });
        });
      });
    }
    get items () {
      if (this.allShopCart) return this.Shoppcart.Items.length;
      else return this.Shoppcart.Items.length > 3 ? 3 : this.Shoppcart.Items.length;
    }
    checkOut () {
      // （新）順豐自提點判斷處理
      if (this.$store.state.newSF) {
        if (this.$store.state.expressPoint.Id === '-1') {
            this.$Confirm(
            this.$t('Message.Message'),
            this.$t('Message.PlsAddPiUpAddr')
          );
          return;
        } else {
          this.$store.dispatch('setDeliveryType', 'P');
        }
      }

      if (this.$store.state.DeliveryType === 'D' && !this.express) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.expressError')); return; }
      if (this.$store.state.DeliveryType === 'P' && !this.PickAddress && this.$store.state.PickupInfoRequire) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.PickAddressError')); return; } else if (this.$store.state.DeliveryType === 'P' && this.PickAddress) {
        this.$Api.delivery.savePickupInfo(this.$store.state.pickupAddress.Id, this.$store.state.pickupAddress.CompanyAddress);
      }
      if (this.$store.state.DeliveryType === 'D' && !this.PickAddress && this.$store.state.pickUpExpress) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.PickAddressError')); return; }

      if (this.payment !== undefined) {
        this.$Api.paymentApi.savePayMethod(this.payment.Id).then((result) => {
          this.pay();
          this.$store.dispatch('setPaymentMethod', this.payment);
        });
      } else {
        this.$Confirm(this.$t('Message.Message'));
      }
    }
    pay () {
      let order;
      let profile = this.$store.state.memberInfo;
      if (this.$store.state.DeliveryType === 'D') order = new CreateOrder(this.$store.state.pickUpExpress ? -1 : this.$store.state.selectAddress.DeliveryId, this.$store.state.express.Id, this.payment.Id, 'D', '', '', this.$store.state.DPickPhone, this.$store.state.DPickName, this.promotionCode, this.TimeRangeId, this.DeliveryDate, this.Remark, this.$store.state.expressPoint.Id, '', '', '', this.delete1);
      else if (this.$store.state.DeliveryType === 'P') order = new CreateOrder(this.$store.state.pickupAddress.Id, '', this.payment.Id, 'P', this.$store.state.pickupAddress.PickupDate, this.$store.state.pickupAddress.PickupTime, this.$store.state.pickupAddress.Phone, this.$store.state.pickupAddress.Name, this.promotionCode, '', '', '', this.$store.state.pickupAddress.ExpressPointId, this.$store.state.pickupAddress.PickupAddress, this.$store.state.pickupAddress.PickupAddressPhone, this.$store.state.pickupAddress.PickupCompanyName, this.delete1);
      if (this.$store.state.pickUpExpress && !this.$store.state.PickupInfoRequire) {
        this.createOrder(order);
      } else {
        if ((!order.PickupName && !profile.FirstName) && (!order.Mobile && !profile.PickupPhone)) { // 若無姓名與電話， 則updateprofile
          this.$Confirm(
            this.$t('Message.Message'),
            this.$t('CheckOut.Use') + ' ' + order.PickupName + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Name') + '</br>' +
          this.$t('CheckOut.Use') + ' ' + order.PickupPhone + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Phone'),
            () => {
              let pn = order.PickupName.split(' ');
              if (pn.length > 1) {
                profile.FirstName = pn[0];
                profile.LastName = pn[1];
              } else {
                profile.FirstName = order.PickupName;
                profile.LastName = order.PickupName;
              }
              profile.Mobile = order.PickupPhone;
              this.updateProfile(profile).then(() => { this.createOrder(order); });
            },
            () => { this.createOrder(order); }
          );
        } else if ((!order.PickupName && !profile.FirstName) && (!order.PickupPhone && profile.Mobile)) { // 若無姓名， 則updateprofile
          this.$Confirm(
            this.$t('Message.Message'),
            this.$t('CheckOut.Use') + ' ' + order.PickupName + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Name'),
            () => {
              let pn = order.PickupName.split(' ');
              if (pn.length > 1) {
                profile.FirstName = pn[0];
                profile.LastName = pn[1];
              } else {
                profile.FirstName = order.PickupName;
                profile.LastName = order.PickupName;
              }
              this.updateProfile(profile).then(() => { this.createOrder(order); });
            },
            () => { this.createOrder(order); }
          );
        } else if ((!order.PickupName && profile.FirstName) && (!order.PickupPhone && !profile.Mobile)) { // 若無電話， 則updateprofile
          this.$Confirm(
            this.$t('Message.Message'),
            this.$t('CheckOut.Use') + ' ' + order.PickupPhone + ' ' + this.$t('CheckOut.As') + ' ' + this.$t('CheckOut.Phone'),
            () => { profile.Mobile = order.PickupPhone; this.updateProfile(profile).then(() => { this.createOrder(order); }); },
            () => { this.createOrder(order); }
          );
        } else {
          this.createOrder(order);
        }
      }
    }
    updateProfile (profile) {
      if (profile.Gender === '') profile.Gender = '0';
      return this.$Api.member.updateProfile(profile);
    }
    createOrder (order) {
      // （新）順豐自提點判斷處理
      if (this.$store.state.newSF) {
        // order.DeliveryType = 'P';
        order.ComeFrom = 1;
        order.AddressId = -1;
        order.ExpressId = this.$store.state.express.Id;
        order.ExpressPointId = this.$store.state.expressPoint.Id;
      }

      this.COloading = true;
      this.$Api.order.createOrder(
        order
      ).then((result) => {
        if (result.Succeeded) {
          this.orderId = result.ReturnValue;
          this.$store.dispatch('setDeliveryType', 'D');
          this.$store.dispatch('setExpress', new Express());
          this.$store.dispatch('setPickupAddress', new PickupAddress());
          this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
          this.$router.push({ name: 'completeCheckout', params: { id: result.ReturnValue } });
          this.COloading = false;
        } else { Vue.prototype.$Confirm('error', result.Message, () => { this.COloading = false; }, () => { this.COloading = false; }); }
      });
    }
    setPromotionCode (code) {
      this.promotionCode = code;
    }
    checkChange (item) {
      let canPush = true;
      this.selectedCoupon.forEach((e, index) => {
        if (e.Id === item.Id) {
          canPush = false;
          this.selectedCoupon.splice(index, 1);
        }
      });
      if (canPush) this.selectedCoupon.push(item);
    }
  @Watch('delete1', { deep: true })
    onSelectedChange (n, old) {
      if (n.length === 0) {
        this.single.forEach(element => {
          element.canCheck = false;
        });
        this.multiple.forEach(element => {
          element.canCheck = false;
        });
        if (this.ll) { this.ll = false; return; }
      }
      let current = this.delete1[this.delete1.length - 1];
      if (old.length === 0 && n.length === 1) {
        if (this.all[current].IsAdditional === true) {
          this.single.forEach(element => {
            if (this.all[current].Id !== element.Id) { element.canCheck = true; }
          });
        } else {
          this.single.forEach(element => {
            if (this.all[current].Id !== element.Id) { element.canCheck = true; }
          });
          this.multiple.forEach(element => {
            element.canCheck = true;
          });
        }
      }
      // 計算多個優惠
      let mult:any[] = [];
      let temp = this.totalP;
      this.currentPrice = this.totalP;
      this.delete1.forEach(element => {
        if (this.all[element].IsDiscount) mult.push(this.all[element]);
        else {
          temp = this.currentPrice - this.all[element].DiscountAmount;
        }
      });
      mult.forEach((element) => {
        temp -= this.currentPrice * (element.DiscountAmount / 100);
      });
      this.currentPrice = temp;
    }
  get totalP () {
    this.currentPrice = this.totalAmount;
    return this.totalAmount;
  }
  get exdp () {
    this.exp = this.$store.state.express.DiscountPrice;
    return Number(this.$store.state.express.DiscountPrice as string);
  }
  @Watch('exp')
  onExpChange () {
    // this.ll = true;
    if (this.delete1.length !== 0) { this.delete1 = []; };
    if (this.selectedCoupon.length !== 0) { this.selectedCoupon = []; };
  }
  @Watch('payments')
  onPaymentMethodsChange (o, n) {
    if (this.payments.length > 0) this.payment = this.payments[0];
  }
  get discount () {
    return this.$store.state.discount;
  }
  get cp () {
    return this.discount.Id === '-1'
      ? this.currentPrice
      : (this.discount.IsDiscount ? ((this.currentPrice) * (1 - this.discount.Favorable / 100)).toFixed(2) : (this.currentPrice) - this.discount.Favorable);
  }
  get currentCode () {
    return this.$store.state.currency.Code;
  }
  searchCoupon () {
    if (this.totalAmount !== this.currentPrice) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.CandP')); return; }
    this.$Api.order.getPromotionCodeFrontView(this.promotionCode).then((result) => {
      this.$store.dispatch('setPromotionDiscount', result.PromotionDiscount);
      this.$emit('promotionCode', this.promotionCode);
      this.showDistcount = true;
    }).catch((error) => {
      console.log(this.$t('Message.Message'), error);
      this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.promotionCodeError'));
      this.promotionCode = '';
    });
  }
  promotionCodeCancel () {
      this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
      this.$emit('promotionCode', '');
      this.promotionCode = '';
      this.showDistcount = false;
      this.$message({
        message: this.$t('Message.SuccessfullyDeleted') as string,
        type: 'success',
        customClass: 'messageBoxMobile'
      });
  }
  @Watch('promotionCode')
  onPromotionCode () {
    if (!this.promotionCode) {
      this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
      this.$emit('promotionCode', '');
      this.showDistcount = false;
    }
  }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
.mobileV{
  .payment_item{
    .el-radio__label{
      display: flex;
      align-items: center;
    }
  }
}
.mobileWarper{
  .el-radio, .el-radio--medium.is-bordered .el-radio__label{
    display: flex;
    align-items: center;
  }
}
.coupon_warpper{
  margin-bottom: 2rem;
  border: 1px solid rgb(229 229 229);
  .el-checkbox__input{
      display: none;
    }
  .el-checkbox{
    width: 100%;
    padding: 0 .5rem;
    box-sizing: border-box;
    margin: .5rem 0;
    display: grid;
    .el-checkbox__label{
      width: 100%;
      padding: 0;
      .coupon_title{
        font-size: 1.4rem;
        background-color: #14234f;
        display: inline-block;
        padding: 0 2rem;
        color: white;
        margin-bottom: 1rem;
      }
    }
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #F6A139 !important;
      border: solid 1px #F6A139 !important;
      box-sizing: border-box;
      border-radius: 0.5rem;
      .coupon_item {
        border: none !important;
        border-radius: 0.2rem;
      }
      .coupon_title{
        background-color: #F6A139 !important;
      }
      .coupon_is_valid{
        background-color: #F6A139 !important;
      }
      .coupon_remark, .coupon_expiryDate{
        color: #F6A139 !important;
      }

  }
  .el-checkbox__label{
      // color: @primary_color2;
      // border: solid 1px transparent;
  }
  .is-disabled {
    // border: 1px solid #e5e5e5 !important;
    .coupon_title {
      // background-color: #c0c4cc !important;
    }
    .coupon_is_valid {
      background-color: #c0c4cc !important;
    }
    .coupon_title{
      background-color: #c0c4cc !important;
    }
    .coupon_remark, .coupon_expiryDate{
      color: #c0c4cc !important;
    }
  }
}
.btnStyle span{
    font-size: 1.4rem;
  }
.payment_item .el-radio{
  display: flex;
  align-items: center;
}
</style>
<style lang="less" scoped>
    // min-height: calc(100vh - 402px);
    .shoppingcart_header{
        font-size: 2rem;
        line-height: 5rem;
        text-align: center;
        font-weight: 700;
        background-color: white;
        padding: 2rem 0;
        border-radius: .5rem;
    }

.checkoutn_warpper{
  // margin: 100px auto;
  width: 100vw;
  padding: 0 0.8rem;
  box-sizing: border-box;
  .main_warpper{
    display: flex;
    // width: 100vw;
    margin: 0 auto;
    flex-wrap: wrap;
    .checkoutl{
        // .payment_warpper{
        //     border: solid 1px rgba(0,0,0,.1);
        //     margin-top:20px ;
        //     .payment_main{
        //       .payment_title{
        //         background-color: rgba(0, 0, 0, 0.2);
        //         padding: 20px;
        //         color: white;
        //       }
        //     }
        //     .payment_item{
        //         padding: 10px 20px;
        //         img{
        //             height: 80px;
        //         }
        //     }
        // }
        .payment_warpper{
          width: 100vw;
          background-color: white;
          border-radius: .5rem;
          // margin-top: 1rem;
          .title{
            font-size: 1.5rem;
          }
          .payment_item{
          // display: flex;
          // flex-wrap: nowrap;
          margin: 1rem;
          }
          .payment_item_name{
              // width: 60%;
              line-height: 3rem;
              height: 3rem;
              word-wrap: break-word;
              display: inline-block;
              vertical-align: middle;
          }
          .payment_item_img{
              // width: 40%;
              display: inline-block;
              vertical-align: middle;
          }
          .payment_item_img img{
              height: 40px;
          }
      }
    }
    .checkoutr{
          width: 100%;
        .shopCart_warpper{
          border: solid 1px rgba(0,0,0,.1);
          margin-bottom: 2rem;
          .shopcartTitle{
            font-size: 1.6rem;
            background-color:@base_color;
            padding: 1rem;
            color: white;
          }
          .item_change{
            overflow: hidden;
            transition: 1s height ease-in-out;
          }
          .shopcartItem_border{
              margin: 20px;
              border-top: solid 1px rgba(0, 0, 0, 0.5);
              position: relative;
              .show_all{
                  cursor: pointer;
                  padding: 0 6px;
                  background-color: white;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-size: 1.6rem;
              }
          }
          .price_item{
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            span{
              font-size: 1.4rem;
            }
            .Discountbox{
              display: inline-block;
              width: 36%;
              font-size: 1.4rem;
            }
            .Discount_promotion{
              display: inline-block;
              width: 64%;
            }
          }
          .discount,.price{
            margin: 1rem;
            border-bottom: solid 1px rgba(0,0,0,.1);
          }
          .discount_price{
            .price_Couponcode{
              padding-bottom: 10px;
              /deep/ .el-input__inner{
                padding-right: 20px;
              }
              >span{
                line-height: 40px;
              }
            }
            .price_item{
              padding-top: 0;
            }
          }
        }
        .payment_warpper{
            border: solid 1px rgba(0,0,0,.1);
            margin-top:20px ;
            .payment_main{
              .payment_title{
                font-size: 1.6rem;
                background-color: @base_color;
                padding: 1rem;
                color: white;
              }
            }
            .payment_item{
                padding: 10px 20px;
                display: flex;
                align-items: flex-start;
                img{
                    height:40px;
                }
            }
        }
    }
  }
  .btn_warpper{
    text-align: center;
    /deep/ .middle{
      margin: 5px 0;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: height .5s;
}
.coupon_warpper{
  margin-bottom: 2rem;
  .coupon_alltitle{
    font-size: 1.6rem;
    background-color: @base_color;
    padding: 1rem;
    color: white;
  }
  .coupon_item{
    .coupon_expiryDate,.coupon_remark,.coupon_title{
      font-size: 1.4rem;
      line-height: 3rem;
    }
    position: relative;
    padding: 1.4rem 1rem;
    // border: 1px solid rgba(0,0,0,.1);
    border-radius: .5rem;
    overflow: hidden;
    .coupon_is_valid{
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 80%;
      background-color: #14234f;
      color: white;
      transform:translate(50%, -50%) rotateZ(45deg);
      .valid_content{
        font-size: 1.4rem;
        position:absolute;
        top: 85%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .coupon_remark, .coupon_expiryDate{
      color: #14234f;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
}
.candp{
  text-align: center;
  font-size: 1.6rem;
  color: red;
  margin-bottom: 2rem;
}
.input-text {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  box-sizing: border-box;
}
.promotion_code {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  background-color: #f4f4f4;
  // border: 1px solid #e8e8e8;
  height: 40px !important;
  line-height: 40px !important;
  outline: none;
  // padding: 0 5px;
  width: 140px !important;
  box-sizing: border-box;
  vertical-align: top;
}
.promotion-code-btn {
  background-color: #074493;
  display: inline-block;
  vertical-align: top;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  color: #fff;
  font-size: 12px;
  z-index: 10;
  position: relative;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-left: -4px;
}
.promotionCodeTips{
  text-align: right;
  color:#8b0b04;
  padding-bottom: 10px;
  font-size: 1.2rem;
}
.DefaultCurrency {
  float: right;
  font-size: 1.4rem;
  font-weight: bold;
  color: #8b0b04;
}
.Currency {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
  span{
    font-size: 1.4rem;
  }
}
.priceTotal{
  padding: 20px 0;
  .TotalFont{
   font-size: 1.4rem;
  }
}
.promotionA {
  display: block;
  color: green;
  text-decoration: underline;
  margin-bottom: 10px;
  width: 50%;
  float: left;
  font-size: 1.2rem !important;
  i{
    font-style: normal;
    color: green;
    text-decoration: underline;
    font-size: 1.4rem;
  }
}
.promotionB {
    display: block;
    margin-bottom: 10px;
    text-align: right;
    color: #c62828;
    width: 50%;
    float: left;
    font-size: 1.2rem !important;
}
.promotionC {
  display: block;
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
  color: green;
  font-size: 1.2rem !important;
}
@media screen and (max-width: 375px){
  .price_Couponcode > span{
    line-height: initial !important;
  }
}
</style>
