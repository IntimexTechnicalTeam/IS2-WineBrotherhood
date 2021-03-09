<template>
  <div>
    <div class="coupon_warpper" v-if="promotionCode === ''">
                <div v-if="checkouting">
                    <CheckboxGroup size="mini" v-model="delete1">
                        <Checkbox v-for="(item,index) in coupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="item.canCheck" @change="checkChange(item)">
                          <div class="coupon_item">
                            <div class="coupon_title">{{item.Title}}</div>
                            <div class="coupon_remark">{{item.Remark}}</div>
                            <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                            <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                            <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                            <div class="coupon_is_valid">
                              <span class="valid_content">valid</span>
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
                        <div class="coupon_remark">{{item.Remark}}</div>
                        <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                        <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                        <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                        <div class="coupon_is_valid">
                          <span class="valid_content">valid</span>
                        </div>
                      </div>
                    </Checkbox>
                 </CheckboxGroup>
                </div>
    </div>
    <div v-else class="candp">{{this.$t('CheckOut.CandP')}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import Coupon from '@/model/coupon';
import { CheckboxGroup, Checkbox } from 'element-ui';
@Component({ components: { CheckboxGroup, Checkbox } })
export default class InsCoupon extends Vue {
  private coupon:Coupon[] = [];
  private delete1: any = [];
  private selectedCoupon:Coupon[] = [];
  private multiple:Coupon[] = [];
  private single:Coupon[] = [];
  private all = {};
  private totalAmount:number = 0;
  private currentPrice: number = 0;
  private ll: boolean = false;
  private exp: number = 0;
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
}
</script>
<style lang="less" scoped>
</style>
