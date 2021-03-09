<template>
  <div class="shoppingcart-handle split-total-handle">
    <div class="split-handle-left">
      <p>
        <span class="payment_title">{{$t('CheckOut.PayBy')}} :</span>
        <span class="pay-select-method" v-show="checkouting">
          <label v-for="(pay, index) in paymentMethods" :key="index">
            <Radio v-model="radio" :label="pay"><img v-bind:src="pay.Img" /></Radio>
          </label>
        </span>
        <span class="pay-select-method" v-show="!checkouting">
          <label>
            <img v-bind:src="radio.Img" />
          </label>
        </span>
      </p>
    </div>
    <div class="split-handle-right">
      <p v-show="checkouting">
        <span>{{$t('CheckOut.Couponcode')}}</span>
        <span>
          <ElInput :placeholder="$t('CheckOut.Input')" class="input-text promotion_code" v-bind:disabled="orderSure" v-model="promotionCode" clearable></ElInput>
          <a
            href="javascript:;"
            class="promotion-code-btn"
            v-on:click="searchCoupon"
          >{{$t('CheckOut.confirm')}}</a>
        </span>
      </p>
      <p>
      </p>
      <p>
        <span>{{$t('Order.CommodityPrice')}}</span>
        <span>{{currentCode}} $ {{totalAmount + $store.state.express.DiscountPrice}}</span>
      </p>
      <p v-show="showDistcount">
        <span>{{$t('Order.Discount')}}</span>
        <span>{{$store.state.currency.Name}} $ {{Math.round((totalAmount - cp) * 100)/100}}</span>
      </p>
      <p>
        <span>{{$t('CheckOut.Total')}}</span>
        <span>{{currentCode}} $ {{Math.round((cp)* 100)/100 + $store.state.express.DiscountPrice}}</span>
      </p>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Payment from '@/model/payment';
import PromotionDiscount from '@/model/PromotionDiscount';
import { Radio, Input as ElInput } from 'element-ui';
@Component({ components: { Radio, ElInput } })
export default class InsPayment extends Vue {
  data () {
    return {
      orderSure: false
    };
  }
  @Prop({ default: 0 }) private currentPrice!:number;
  @Prop({ default: 0 }) private realPrice!:number;
  @Prop() private readonly paymentMethods!:Payment[];
  private totalAmount:number = 0;
  @Prop() private readonly checkouting!:boolean;
  private radio: Payment = new Payment();
  private promotionCode :string = '';
  private showDistcount :boolean = false;
  @Watch('promotionCode')
  onPromotionCode () {
    if (!this.promotionCode) {
      this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
      this.$emit('promotionCode', '');
      this.showDistcount = false;
    }
  }
  @Watch('radio')
  onRadioChange (o, n) {
    this.$emit('paymentChange', this.radio);
  }
  @Watch('paymentMethods')
  onPaymentMethodsChange (o, n) {
    if (this.paymentMethods.length > 0) this.radio = this.paymentMethods[0];
  }
  created () {
    this.$store.state.shopCart.then((result) => {
      this.totalAmount = result.ShopCart.TotalAmount;
      // this.$store.state.dispatch('setCurrency', result.ShopCart.Currency);
    });
  }
  searchCoupon () {
    if (this.realPrice !== this.currentPrice) { this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.CandP')); return; }
    this.$Api.order.getPromotionCodeFrontView(this.promotionCode).then((result) => {
      this.$store.dispatch('setPromotionDiscount', result.PromotionDiscount);
      this.$emit('promotionCode', this.promotionCode);
      this.showDistcount = true;
    }).catch((error) => {
      console.log(this.$t('Message.Message'), error);
      this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.promotionCodeError'));
    });
  }
  get discount () {
    return this.$store.state.discount;
  }
  get currentCode () {
    return this.$store.state.currency.Code;
  }
  get cp () {
    return this.discount.Id === '-1'
      ? this.currentPrice
      : (this.discount.IsDiscount ? ((this.currentPrice) * (1 - this.discount.Favorable / 100)).toFixed(2) : (this.currentPrice) - this.discount.Favorable);
  }
}
</script>
<style lang='less'>
.shoppingcart-handle{
  .el-radio__label {
    font-size: 18px;
  }
}
</style>
<style scoped lang='less'>
.payment_title{
  font-size: @main_font_size;
}
.shoppingcart-handle {
  text-align: right;
}
.split-total-handle {
  box-sizing: border-box;
  padding: 0 20px;
}
.split-handle-left p {
  margin-bottom: 5px;
  text-align: left;
}
.split-total-handle .split-handle-left p {
  margin-bottom: 18px;
}
.split-handle-left p .pay-select-method {
  width: 390px;
}
.no_play {
  display: none;
}
label {
  display: inline-block;
  margin-bottom: 5px;
  // font-weight: bold;
}
.split-handle-left p .pay-select-method label {
  display: inline-block;
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-left: 5px;
}
.split-handle-left p .pay-select-method label:first-child {
  margin-left: 0;
}
.split-handle-left p .pay-select-method label img {
  height: 50px;
  border: 1px solid #f0f0f0;
  vertical-align: middle;
}
.split-handle-left,
.split-handle-right {
  width: 50%;
  float: left;
}

.split-handle-left p {
  margin-bottom: 5px;
  text-align: left;
}

.split-handle-left p span {
  display: inline-block;
  font-size: 16px;
  color: #333;
  line-height: 30px;
  width: 280px;
  vertical-align: top;
  margin-left: 30px;
}

.split-handle-left p span:first-child {
  width: 150px;
  text-align: right;
  // color: #999;
  margin-left: 0;
}

.change {
  display: inline-block;
  font-weight: normal;
  height: 28px;
  line-height: 28px;
  border: 1px solid #e72742;
  color: #e72742;
  font-size: 16px;
  padding: 0 20px;
  float: right;
  /*margin-right: 40px;*/
}

.split-handle-right p {
  text-align: right;
  margin-bottom: 15px;
}

.split-handle-right p span {
  display: inline-block;
  width: 250px;
  font-size: @main_font_size;
  color: #000;
  line-height: 35px;
}

.split-handle-right p span:nth-of-type(2) {
  color: #d92526;
  font-size: 24px;
  margin-left: 45px;
}

.split-total-handle {
  box-sizing: border-box;
  padding: 0 20px;
}

.split-handle-left .input-text {
  height: 28px;
  font-size: 16px;
  line-height: 28px;
  border: 1px solid #e6e6e6;
  width: 245px;
  box-sizing: border-box;
  padding: 0 10px;
}

.split-total-handle .split-handle-left p {
  margin-bottom: 18px;
}

.split-handle-left p .pay-select-method {
  width: 400px;
}

.split-handle-left p .pay-select-method label {
  display: inline-block;
  text-align: center;
  font-size: 16px;
  color: #666;
  margin-left: 5px;
}

.split-handle-left p .pay-select-method label:first-child {
  margin-left: 0;
}

.split-handle-left p .pay-select-method label img {
  height: 50px;
  border: 1px solid #f0f0f0;
}

.split-handle-left p .pay-select-method label:hover img {
  border: 1px solid #88bd43;
}
.split-btn-box {
  display: block;
  text-align: right;
}

.split-btn-box .btn {
  display: inline-block;
  margin-left: 10px;
  border: none;
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
  width: 150px !important;
  box-sizing: border-box;
  vertical-align: top;
}
.split-handle-right .input-text {
  height: 33px;
  font-size: 14px;
  line-height: 33px;
  // border: 1px solid #e6e6e6;
  width: 245px;
  box-sizing: border-box;
  // padding: 0 10px;
  margin-right: -1px;
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
}
</style>
