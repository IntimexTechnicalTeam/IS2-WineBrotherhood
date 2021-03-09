<template>
 <div class="default">
    <!--main-content-->
    <div class="RegNPay-Result">
      <div id="rnp-main-content">
        <div class="print">
          <div class="link-top">{{$t('RegNPay.SubRecord')}}</div>
          <div class="clearfloat">
            <div class="left-part">
                <p><b>{{$t('RegNPay.ReferenceNum')}} : </b>{{result.No}}</p>
                <p><b>{{$t('RegNPay.SubmissionDate')}} : </b>{{result.CreateDate.split(' ')[0]}}</p>
                <p v-if="result.Amount>0"><b>{{$t('Order.TotalPrice')}} : </b>{{result.Currency}}{{result.Amount}}</p>
                <p v-if="result.Amount>0">
                  <b>{{$t('Order.OrderStatus')}} :</b>
                  <span v-if="result.IsPayed">{{$t('Order.Paid')}}</span>
                  <span v-if="!result.IsPayed">{{$t('Order.Unpaid')}}</span>
                </p>

                <div class="paymentItems" v-if="result.Amount>0&&!result.IsPayed">
                    <span class="pay-select-method clearfloat">
                        <label v-for="(pay,index) in paymentMethods" :key="index" :class="{'checked': pay.Id === paymentMethod.Id}">
                          <img v-bind:src="pay.Img" />
                          <p><input type="radio" v-bind:value="pay" name="pay" v-model="paymentMethod" />{{pay.Name}}</p>
                        </label>
                    </span>
                    <div class="btn-box">
                      <a href="javascript:;" class="btn green-btn" v-on:click="pay()">{{$t('Order.PayNow')}}</a>
                    </div>
                </div>
            </div>
            <div class="right-part">
              <img v-bind:src="result.QrCode" />
              <p class="tips">
                {{result.ResultPageTips}}
              </p>
            </div>
          </div>
          <div class="clear"></div>

          <div class="info-form">
            <div class="link-top">
              <!-- {{$t('regnpay.DetailedInfo')}} -->
              <input type="button" :value="$t('RegNPay.Print')" @click="printThis();"/>
            </div>

            <div id="myprintarea">
              <div class="title">{{result.Title}}</div>
              <div class="question" v-for="(q,index2) in result.QuestionList" :key="index2">
                  Q:{{q.Question}}<br>
                  A:
                  <div>
                      <span v-for="(a,index3) in q.AnswerList" :key="index3" class="answer">
                          <a href="a.Url" v-if="a.Url!=null">{{a.AnswerDisplay}}</a>
                          <span v-if="a.Url==null">{{a.AnswerDisplay}}</span>
                          <span v-if="a.UnitPrice>0">{{result.Currency}}{{a.UnitPrice}}</span>
                          <span v-if="a.Quantity>0">X{{a.Quantity}}</span>
                          <span v-if="a.Subtotal>0" class="subtotal">{{result.Currency}}{{a.Subtotal}}</span>
                      </span>
                  </div>
              </div>
              <div class="subtotal" v-if="result.Amount>0"><p>{{$t('Order.TotalPrice')}} : </p><p>{{result.Currency}}{{result.Amount}}</p></div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="noPay" v-else>
        <div class="successSubmit">
          <img src="/cmx4/int-logo.png"/>
          <p>{{result.ResultPageTips}}</p>
          <img v-bind:src="result.QrCode" />
        </div>
      </div> -->
    </div>
    <!--main-content-->
</div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Result extends Vue {
    result:any={
      Id: '',
      No: '',
      Title: '',
      Amount: 0,
      IsPayed: false
    };
    isShowpay:boolean=false;
    paymentMethod:any= {};
    paymentMethods:any[]=[];

    getSubmitComplete (id) {
      this.$Api.regAndPay.getSubmitComplete(id).then(result => {
        this.result = result.data.ReturnValue;
        if (result.data.ReturnValue.Amount > 0 && !result.data.ReturnValue.IsPayed) {
          this.loadPaymentMethod();
        } else if (this.result.NextFormKey) {
          let NextFormKey = this.result.NextFormKey;
          setTimeout(() => {
            this.$router.push({ path: `/regnpay/form/${NextFormKey}` });
          }, 3000);
        }
      });
    }

    // 付款方式
    loadPaymentMethod () {
      this.$Api.checkout.getPaymentMethod().then(result => {
        this.paymentMethods = result.Payment;
        if (result.Payment.length > 0) {
          this.paymentMethod = result.Payment[0];
        }
      });
    }

    // 立即支付
    pay () {
      if (!this.paymentMethod.Id || this.paymentMethod.Id === '') {
        alert('请选择付款方式');
      } else {
        this.$Api.regAndPay.savePayMethod(this.paymentMethod.Id, this.result.Id).then(result => {
          if (result.data.Succeeded) {
            // this.$router.push({ path: '/payment/' + this.paymentMethod.Code + '/' + this.result.Id });
            window.open('/PG/pay/' + this.paymentMethod.Code + '/ISRNP/' + this.result.Id);
          } else {
            // alert(result.data.Message);
            // this.$Confirm('', '支付失败，请稍后再试！');
            this.$Confirm('', result.data.Message);
          }
        });
      }
    }

    printThis () {
      alert('print!');
    }

    mounted () {
      this.getSubmitComplete(this.$route.params.id);
    }
}
</script>
<style scoped lang="less">
@import '../../../../assets/css/regnpay_m.less';
.Banner {
  width: 100%;
  height:500px;
}
.Banner img {
  width: 100%;
  height:500px;
}
</style>
