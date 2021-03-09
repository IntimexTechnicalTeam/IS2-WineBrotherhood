<template>
  <div id="container" class="payFail">
    <div class="payment-box">
        <div class="logo">
            <img src="@/assets/Images/forweb/logo.png" />
        </div>
        <p class="tips">
            {{$t('payment.PaymentFailTips')}}
        </p>
        <div class="payment-btn">
            <a href="javascript:;" @click="returnHomePage">{{$t('Action.ReturnHomePage')}}</a>
            <a href="javascript:;" @click="viewOrderDetails">{{$t('Action.OrderDetails')}}</a>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class payFail extends Vue {
  returnHomePage () {
    this.$router.push('/');
  }

  viewOrderDetails () {
    let rnpId = this.id;
    this.$router.push({ name: 'regNPayResult', params: { rnpId } });
  }

  get id () {
    return this.$route.params.id;
  }

  mounted () {}
}
</script>

<style scoped lang="less">
.pc {
    .payFail {
        .payment-box {
            width: 1200px;
            margin: 0 auto;
            padding: 100px 0;
            text-align: center;

            .logo {
                img {
                    max-width: 35%;
                }
            }

            .tips {
                font-size: 20px;
                margin: 50px 0;
            }

            .payment-btn {
                a {
                    display: inline-block;
                    padding: 10px 35px;
                    margin: 0 20px;
                    background-color: @base_color;
                    color: #fff;
                    border-radius: 5px;
                    font-size: 16px;
                }
            }
        }
    }
}

.mobile {
    .payFail {
        .payment-box {
            padding: 6rem 1rem;
            text-align: center;

            .logo {
                img {
                    max-width: 45%;
                }
            }

            .tips {
                font-size: 1.5rem;
                margin: 3rem 0;
            }

            .payment-btn {
                a {
                    display: inline-block;
                    padding: 0.8rem 1.2rem;
                    margin: 0 1rem;
                    background-color: @base_color;
                    color: #fff;
                    border-radius: 5px;
                    font-size: 1.2rem;
                }
            }
        }
    }
}
</style>
