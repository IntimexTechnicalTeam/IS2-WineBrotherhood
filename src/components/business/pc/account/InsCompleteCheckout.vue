<template>

    <div class="cco_warpper" id="container">
        <div class="maincontent">
          <div class="title">{{$t('CheckOut.OrderSent')}}</div>
          <div class="title">{{$t('CheckOut.PaymentProcess')}}</div>
          <div class="container">
              <div> <span>{{$t('Order.OrderNumber')}}:</span>  {{Order.InvoiceNO}}</div>
              <div> <span>{{$t('Order.OrderDateTime')}}:</span> {{Order.CreateAt}}</div>
              <div> <span>{{$t('Order.TotalPrice')}}:</span> {{currentCode}}&nbsp;{{(Order.TotalAmount) | PriceFormat}}</div>
              <div> <span>{{$t('Order.OrderStatus')}}:</span>{{Order.StatusName}}</div>
              <div v-if="Order.OffLinePay">
                  <a href="javascript:;"  class="evidenceBtn" v-on:click="evidence()">{{$t('Message.Evidence')}}</a>
              </div>
              <div v-else>
                  <div class="payBtn" v-if="Order.PaymentMethod==='PayMe'">
                    <a @click="pay" v-show="currentlang==='E'"><img src="/images/pc/PayMeButton Round.png"></a>
                    <a @click="pay" v-show="currentlang==='C'"><img src="/images/pc/PayMeButton Round.png"></a>
                    <a @click="pay" v-show="currentlang==='S'"><img src="/images/pc/PayMeButton Round.png"></a>
                  </div>
                  <div  v-else><ins-button :nama="$t('CheckOut.pay')" action="pay" type="primary" @click="pay" size="huge" style="margin-top: 3.3rem;width:60%;margin:0 auto;cursor: pointer;"/></div>
              </div>
          </div>
        </div>
   </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Order from '@/model/order';
import InsButton from '@/components/base/mobile/InsButton.vue';
@Component({ components: { InsButton } })
export default class InsCompleteCheckout extends Vue {
    private Order:Order =new Order();
    private currentCode:string='HKD';
    // @Prop() private orderId!: number;
    get orderId () {
      return this.$route.params.id;
    }
    get currentlang () {
      return this.$i18n.locale;
    }
    LoadData () {
      this.$Api.shoppingCart.LoadData().then((result) => {
        this.currentCode = result.DefaultCurrency.Code;
      });
    }
    evidence () {
      this.$router.push('/order/evidence/' + this.orderId);
    }
    created () {
    //   if (!this.orderId && !this.$route.params.id) throw new Error('need order ID');
      if (this.orderId) {
        this.$Api.order.getOrder(this.orderId).then((result) => {
          this.Order = result.Order;
          this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
        });
      }
    }
    mounted () {
      this.LoadData();
    }
    @Watch('orderId')
    onOrderId () {
      this.$Api.order.getOrder(this.orderId).then((result) => {
        this.Order = result.Order;
        this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      });
    }
    pay (pay) {
      window.open('/PG/pay/' + this.Order.PaymentMethod + '/IS/' + this.orderId, '_self');
    }
    // get paymentCode () {
    //   return this.$store.state.paymentMethod.Code;
    // }
}
</script>
<style lang="less" scoped>
.evidenceBtn{
  background: @base_color;
  color: #fff;
  display: block;
  text-align: center;
  width: 60%;
  margin: 1rem auto;
  cursor: pointer;
  padding-top: .5rem;
  padding-bottom: .5rem;
}
.payBtn{
  text-align: center;
  a{
    cursor: pointer;
  }
}
.cco_warpper{
  min-height: 12rem;
  background-color: white;
  padding: 2rem 1rem;
  border-radius: .5rem;
  .title{
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    padding: .5rem 0 .5rem 0;
  }
  .container{
    div{
        font-size: 1.6rem;
        padding: 0.5rem;
        width: 50%;
        margin: 0 auto;
      span{
        width: 50%;
        display: inline-block;
        text-align: right;
      }
    }
  }
}
</style>
