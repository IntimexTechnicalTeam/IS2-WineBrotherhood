<template>
    <div class="concessions_warpper">
        <span style="display:none">{{totalP + exdp}}</span>
        <div>
            <div class="delivery_charge item">
                <div>{{$t('Order.DeliveryCharge')}}:</div>
                <div class="priceColor">{{currentCode}}&nbsp;{{express.DiscountPrice}}</div>
            </div>
            <div class="shoppingcart_total item">
                <div>{{$t('Order.CommodityPrice')}}:</div>
                <div class="priceColor">{{currentCode}}&nbsp;{{totalAmount}}</div>
            </div>
            <div class="shoppingcart_total item" v-show="showDistcount">
                <div>{{$t('Order.Discount')}}:</div>
                <div class="discount_warpper">
                  <div class="discountPrice priceColor">{{currentCode}}&nbsp;{{Math.round((totalAmount - cp) * 100)/100}}<span class="cancel el-icon-error" @click="cancel"></span></div>
                </div>
            </div>
        </div>
        <div class="shoppingcart_total item">
            <div>{{$t('Order.TotalPrice')}}:</div>
            <!-- <div>{{discount.IsDiscount ? ((totalAmount + $store.state.express.DiscountPrice) * (1-discount.Favorable/100)).toFixed(2) : (totalAmount + $store.state.express.DiscountPrice) - discount.Favorable}}&nbsp;{{$store.state.currency.Name}}</div> -->
            <div class="priceColor">{{currentCode}}&nbsp;{{Math.round(cp * 100)/100  + $store.state.express.DiscountPrice}}</div>
        </div>
        <div v-if="!lockConcessions">
            <div class="promotion_code item">
                <div>{{$t('Order.PromotionCode')}}:</div>
                <div>
                    <ElInput :placeholder="$t('Order.PromotionCode')" v-model="promotionCode" class="input-with-select">
                        <ElButton slot="append" @click="searchCoupon" >&nbsp;&nbsp;{{$t('Message.Confirm')}}&nbsp;&nbsp;</ElButton>
                    </ElInput>
                </div>
            </div>
            <div class="coupon_warpper" v-if="$store.state.discount.Id === '-1'">
                <div>
                    <CheckboxGroup size="mini" v-model="delete1">
                        <Checkbox v-for="(item,index) in coupon" :key="index" :min="0" :max="100" :label="item.Id" :disabled="item.canCheck" @change="checkChange">
                          <div class="coupon_item">
                            <div class="coupon_title">{{item.Title}}</div>
                            <div class="coupon_remark">{{item.Remark}}</div>
                            <div class="coupon_remark" v-if="!item.IsDiscount">{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Minus')}} {{item.DiscountAmount}}</div>
                            <div class="coupon_remark" v-else>{{$t('Order.Full')}} {{item.MeetAmount}} {{$t('Order.Hit')}} {{item.DiscountAmount}} {{$t('Order.Precent')}}</div>
                            <div class="coupon_expiryDate">{{$t('CheckOut.expiryDate')}} : {{item.EffectiveDate}}-{{item.ExpiryDate}}</div>
                            <div class="coupon_is_valid">
                              <span class="valid_content">{{$t('MyCoupon.NotUse')}}</span>
                            </div>
                          </div>
                        </Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div v-else class="candp">{{this.$t('CheckOut.CandP')}}</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import Coupon from '@/model/coupon';
import PromotionDiscount from '@/model/PromotionDiscount';
import { Input as ElInput, CheckboxGroup, Checkbox, Button as ElButton } from 'element-ui';
@Component({ components: { ElInput, CheckboxGroup, Checkbox, ElButton } })
export default class InsConcessions extends Vue {
    private totalAmount:number = 0;
    private total:number = 0;
    private promotionCode = '';
    private coupon:Coupon[] = [new Coupon()];
    private multiple:Coupon[] = [];
    private single:Coupon[] = [];
    private selected = {};
    private all = {};
    private current: string = '';
    private currentPrice: number = 0;
    private delete1: any = [];
    private currentCode:string='';
    @Prop() private lockConcessions!:boolean;
    private ll: boolean = false;
    private exp: number = 0;
    private showDistcount :boolean = false;
    created () {
      this.$set(this.selected, 'length', 0);
      this.$store.state.shopCart.then((result) => {
        this.totalAmount = result.ShopCart.TotalAmount;
        this.currentCode = result.ShopCart.Currency.Code;
        this.currentPrice = this.totalP;
      }).then(() => {
        this.$Api.member.getActiveCoupon({ Page: 1, PageSize: 10 }).then((result) => {
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
    @Watch('promotionCode')
    onPromotionCode () {
      if (!this.promotionCode) {
        this.$store.dispatch('setPromotionDiscount', new PromotionDiscount());
        this.$emit('promotionCode', '');
        this.showDistcount = false;
      }
    }
    get express () {
      return this.$store.state.pickUpExpress ? this.$store.state.expressPoint : this.$store.state.express;
    }
    searchCoupon () {
      if (this.delete1.length !== 0) { this.$Confirm(this.$t('Message.Message'), this.$t('Concessions.Cannot')); return; }
      this.$Api.order.getPromotionCodeFrontView(this.promotionCode).then((result) => {
        this.$store.dispatch('setPromotionDiscount', result.PromotionDiscount);
        this.$emit('promotionCode', this.promotionCode);
        this.showDistcount = true;
      }).catch((error) => {
        console.log(error);
        this.$Confirm(this.$t('Message.Message'), this.$t('CheckOut.promotionCodeError'));
      });
    }
    get discount () {
      return this.$store.state.discount;
    }
    checkChange (item) {
    }
    @Watch('delete1', { deep: true })
    onSelectedChange (n, old) {
      this.$emit('coupons', this.delete1);
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
      if (n.length > old.length) {
        let c = this.all[current];
        if (c.IsDiscount) {
          this.currentPrice -= this.totalP * (c.DiscountAmount / 100);
        } else {
          this.currentPrice = this.currentPrice - c.DiscountAmount;
        }
      } else {
        let c = this.all[old[old.length - 1]];
        if (c.IsDiscount) {
          this.currentPrice += this.totalP * (c.DiscountAmount / 100);
        } else {
          this.currentPrice = this.currentPrice + c.DiscountAmount;
        }
      }
      if (old.length === 0 && n.length === 0) this.currentPrice = this.totalP;
    }
    get cp () {
      return (this.discount.Id === '-1'
        ? this.currentPrice
        : (this.discount.IsDiscount ? ((this.currentPrice) * (1 - this.discount.Favorable / 100)).toFixed(2) : (this.currentPrice) - this.discount.Favorable));
    }
    get totalP () {
      // if (this.delete1.length === 1) { this.ll = true; } + Number(this.$store.state.express.DiscountPrice as string) + this.$store.state.express.DiscountPrice
      this.currentPrice = this.totalAmount;
      // if (this.delete1.length !== 0) this.delete1 = []; + Number(this.$store.state.express.DiscountPrice as string)
      return this.totalAmount;
    }
    get exdp () {
      this.exp = this.$store.state.express.DiscountPrice;
      return Number(this.$store.state.express.DiscountPrice as string);
    }
    @Watch('exp')
    onExpChange () {
      this.ll = true;
      if (this.delete1.length !== 0) { this.delete1 = []; };
    }
    cancel () {
      while (this.delete1.length !== 0) { this.ll = true; this.delete1.pop(); }
      if (this.promotionCode) this.promotionCode = '';
    }
}
</script>
<style lang="less">
.concessions_warpper{
  .el-input__inner{
    line-height: 40px;
    height: 40px;
  }
  .el-input-group__append{
    padding: 0.5rem !important;
  }
  .el-checkbox__input{
  display: none;
  }
  .el-checkbox{
    width: 100%;
    .el-checkbox__label{
      width: 100%;
      padding: 0;
    }
  }
}
</style>
<style lang="less" scoped>
.candp{
  padding-top: 1rem;
  color:#7accc8;
  font-size: 1.1rem;
}
.priceColor{
  color:#d92526;
}
.discountPrice{
    position: relative;
    font-size: 1.4rem;
    display: flex;
}
.discountPrice span{
    font-size: 1.6rem;
    color: #1b1b1b;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-top: 1.2rem;
    margin-left: .5rem;
}
.concessions_warpper{
    // border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    background-color: white;
    padding: 1.4rem 1rem;
    border-radius: .5rem;
    // margin-top: 1rem;
}
.item{
    display: flex;
    flex-wrap: nowrap;
}
.item>div{
    width: 50%;
    font-size: 1.4rem;
    line-height: 4rem;
    // height: 4rem;
}
.coupon_warpper{
  .coupon_item{
    .coupon_expiryDate,.coupon_remark,.coupon_title{
      font-size: 1.4rem;
      line-height: 2rem;
    }
    position: relative;
    margin-top: 1.4rem;
    padding: 1.4rem 1rem;
    border: 1px solid rgba(0,0,0,.1);
    border-radius: .5rem;
    overflow: hidden;
    .coupon_is_valid{
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      color: white;
      transform:translate(50%, -50%) rotateZ(45deg);
      .valid_content{
        font-size: 1.4rem;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
