<template>
  <div class="resetpsw_main">
      <div class="resetpsw">
              <div>
                <div class="login_title">{{$t('Register.ResetPwd')}}</div>
                <InsForm ref="loginForm">
                    <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" type="password" v-model="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%"  type="password" :rule="password" v-model="confirmPassword" />
                </InsForm>
              </div>
              <InsButton :nama="$t('DeliveryAddress.SaveBtn')" @click="s" />
          </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsButton from '@/components/base/pc/InsButton.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({ components: { InsInput2, InsButton, InsForm } })
export default class InsResetPSW extends Vue {
    private password:string = '';
    private confirmPassword:string = '';
    s () {
      this.$Api.member.updatePwdFM(this.id, this.code, this.confirmPassword).then((result) => {
        this.$Confirm(this.$t('Message.Message'), result.Message, () => { this.$router.push('/account/login'); }, () => { this.$router.push('/account/login'); });
      });
    }
    get id () {
      return this.$route.params.id;
    }
    get code () {
      return this.$route.params.code;
    }
}
</script>
<style lang="less" scoped>
.resetpsw_main{
        width: 1060px;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 40px;
        border: solid 1px rgba(0, 0, 0, .2);
        text-align: center;
        .resetpsw{
            text-align: left;
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            width: 489px;
            height: 350px;
            padding: 0 20px 0 0;
            box-sizing: border-box;
            vertical-align: top;
        }
}
</style>
