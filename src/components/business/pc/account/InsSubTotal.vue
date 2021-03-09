<template>
  <div class="split-handle-right">
    <p>
      <span>{{$t('CheckOut.DeliveryCharge')}}</span>
      <span>{{currentCode}} $ {{$store.state.express.DiscountPrice}}</span>
    </p>
    <p>
      <span>{{$t('CheckOut.SubTotal')}}</span>
      <span>{{currentCode}} $ {{ItemsAmount}}</span>
    </p>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
@Component
export default class InsSubTotal extends Vue {
  // @Prop() Express!: Express;
  ItemsAmount: number = 0;
  created () {
    this.$store.state.shopCart.then((result) => {
      this.ItemsAmount = result.ShopCart.ItemsAmount;
    });
  }
  get currentCode () {
    return this.$store.state.currency.Code;
  }
}
</script>
<style scoped lang='less'>
.split-handle-left,
.split-handle-right {
  width: 50%;
  float: left;
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
</style>
