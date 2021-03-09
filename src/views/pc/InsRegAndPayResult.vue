<template>
<div>
 <div class="RNPResult default">
    <div id="rnp-main-content">
      <div class="record-title">{{$t('RegNPay.SubRecord')}}</div>
      <div class="SubRecord">
        <div class="left-part">
          <p><b>{{$t('RegNPay.ReferenceNum')}} : </b>{{result.No}}</p>
          <p v-if="result.CreateDate"><b>{{$t('RegNPay.SubmissionDate')}} : </b>{{result.CreateDate.split(' ')[0]}}</p>
          <p v-if="result.Amount>0"><b>{{$t('Order.TotalPrice')}} : </b>{{result.Currency}}{{result.Amount}}</p>
          <p v-if="result.Amount>0">
            <b>{{$t('Order.OrderStatus')}} :</b>
            <span v-if="result.IsPayed">{{$t('Order.Paid')}}</span>
            <span v-if="!result.IsPayed">{{$t('Order.Unpaid')}}</span>
          </p>

          <div class="payment" id="no-print" v-if="result.Amount>0 && !result.IsPayed">
            <span class="pay-select-method">
              <label v-for="(pay,index) in paymentMethods" :key="index" :class="{'checked': pay.Id === paymentMethod.Id}">
                <img v-bind:src="pay.Img" />
                <p><input type="radio" v-bind:value="pay" name="pay" v-model="paymentMethod" />{{pay.Name}}</p>
              </label>
            </span>

            <a href="javascript:;" class="pay-btn" @click="pay">{{$t('Order.OrderPay')}}</a>
          </div>
        </div>

        <div class="right-part">
          <img class="QrCode" v-bind:src="result.QrCode" />
          <p class="msg">
            {{result.ResultPageTips}}
          </p>
        </div>
      </div>

      <div class="info-form">
        <div class="form-top">
          <a href="javascript:;" id="printBtn" @click="printThis">{{$t('RegNPay.Print')}}</a>
        </div>

        <div id="PrintArea">
          <div class="form-title">{{result.Title}}</div>
          <div class="question-one" v-for="(q,index2) in result.QuestionList" :key="index2">
            <p class="question">
              {{q.Question}}
            </p>
            <div class="answer-list">
              <div class="answer-one" v-for="(a,index3) in q.AnswerList" :key="index3">
                <a v-bind:href="a.Url" v-if="a.Url">{{a.AnswerDisplay}}</a>
                <span v-else>{{a.AnswerDisplay}}</span>
                <p class="qty-pay" v-if="a.UnitPrice>0 || a.Quantity>0">
                  <span v-if="a.UnitPrice>0">( {{result.Currency}}{{a.UnitPrice.toFixed(2)}} )</span>
                  <span v-if="a.Quantity>0">X</span>
                  <span v-if="a.Quantity>0">{{a.Quantity}}</span>
                </p>
                <span v-if="a.Subtotal>0" class="subtotal">{{result.Currency}}{{a.Subtotal.toFixed(2)}}</span>
                <span v-if="index3 !== q.AnswerList.length-1"> 、</span>
              </div>
            </div>
          </div>
          <div class="TotalPrice" v-if="result.Amount>0"><p>{{$t('Order.TotalPrice')}} : </p><p>{{result.Currency}}{{result.Amount}}</p></div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="regnpayNopay" v-show="!payed">
      <p class="logo"><span class="el-icon-circle-check"></span></p>
      <p class="text">{{$t('regnpay.successful')}}</p>
      <p class="text">{{$t('regnpay.reply')}}</p>
  </div> -->
</div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
import printJS from 'print-js';
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
    payed:boolean=false;
    keycontent:string='';
    getSubmitComplete (id) {
      this.$Api.regAndPay.getSubmitComplete(id).then(result => {
        this.result = result.data.ReturnValue;
        this.keycontent = result.data.ReturnValue.Key;
        this.$Api.regAndPay.getHtml(this.keycontent, this.lang, false).then(result => {
          this.payed = result.IsPay;
        });
        console.log(this.keycontent, 'this.keycontentthis.keycontent');
        if (result.data.ReturnValue.IsPayed) this.$Confirm(this.$t('Message.Message'), this.$t('Order.Paid'));
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
    get lang () {
      return this.$Storage.get('locale');
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
      printJS('rnp-main-content', 'html');
      printJS({
        printable: 'rnp-main-content',
        type: 'html',
        css: '/static/css/print.css',
        documentTitle: this.result.Title,
        ignoreElements: ['no-print', 'printBtn'],
        scanStyles: false
      });
    }
    created () {
      this.getSubmitComplete(this.$route.params.id);
    }
    mounted () {
    }
}
</script>
<style scoped lang="less">
@import '../../assets/less/regnpay.less';
.Banner {
  width: 100%;
  height:500px;
}
.Banner img {
  width: 100%;
  height:500px;
}
.regnpayNopay{
    width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 60px;
  .logo{
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
    span{
      font-size: 60px;
      color:green;
    }
  }
  .text{
    font-size: 25px;
    text-align: center;
    padding-bottom: 10px;
  }
}
</style>
