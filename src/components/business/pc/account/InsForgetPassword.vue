<template>
  <div id="container">
    <div class="DetailTitle"><img :src="ImgList" v-show="ImgList!==null"><div class="TitleBg"><div class="innerBoxText">{{$t('Forgetpassword.ForgetPassword')}}</div></div></div>
    <div class="maincontent forgetMain">
    <div class="ForgetPassMain">
      <div style="margin-top: 15px;" v-if="ResetPwd">
        <h2 class="ResetPwdTips">{{$t('Forgetpassword.ResetPwdTips')}}</h2>
        <ElForm
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <FormItem prop="UserEmail">
            <ElInput
              :placeholder="$t('Forgetpassword.LoginNameEmail')"
              v-model="ruleForm.UserEmail"
              prefix-icon="el-icon-message"
              clearable
            >
              <ElButton
                slot="append"
                icon="el-icon-arrow-right"
                @click="SubmitForm"
              >{{$t('Forgetpassword.NextStep')}}</ElButton>
            </ElInput>
          </FormItem>
        </ElForm>
      </div>
      <!-- 输入正确的Email后，弹窗 -->
      <div class="EmailSuccess" v-if="!ResetPwd">
        <p>
          <i class="el-icon-success"></i>
        </p>
        <p>{{$t('Forgetpassword.ResetPwdSuccess')}}</p>
        <p>{{$t('Forgetpassword.NotEmail')}}?</p>
        <p>
          <a
            @click="ResetReturn"
            :title="$t('Forgetpassword.ToReEnter')"
          >{{$t('Forgetpassword.ToReEnter')}}</a>
        </p>
      </div>
    </div>
  </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Form as ElForm, Input as ElInput, Message, FormItem, Button as ElButton } from 'element-ui';

@Component({
  components: {
    InsBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    ElForm,
    ElInput,
    FormItem,
    ElButton
  }
})
export default class InsForgetPassword extends Vue {
  ResetPwd: boolean = true;
  ImgList:string='/images/pc/pcnormalbg.jpg';
  ruleForm: any = {
    UserEmail: ''
  };
  ResetReturn () {
    this.ResetPwd = !this.ResetPwd;
    this.ruleForm.UserEmail = '';
  }
  get rules () {
    return {
      UserEmail: [
        {
          required: true,
          message: this.$t('Forgetpassword.EnterEmail'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: this.$t('Forgetpassword.CorrectEmail'),
          trigger: ['blur', 'change']
        }
      ]
    };
  }
  // 检查表单
  SubmitForm (ruleForm) {
    let that = this;
    this.$nextTick(function () {
      (that.$refs.ruleForm as HTMLFormElement).validate(valid => {
        if (valid) {
          var that = this;
          sdk.api.member.resetPassword(that.ruleForm.UserEmail).then(
            function (success) {
              if (success) {
                that.ResetPwd = !that.ResetPwd;
              }
            },
            function (success) {
              Message({
                message: success.Message,
                type: 'error'
              });
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
  }
}
</script>
<style lang="less" scoped>
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 500px;
    border: 1px solid #ffffff;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    .innerBoxText{
      background:#ffffff;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}
.forgetMain{
  background: #FFF;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 60px;
  margin-bottom: 20px;
}
#container {
  width: 100%;
  display: inline-block;
  .forgetpsw_title{
    font-size: 2rem;
    line-height: 4rem;
    text-align: center;
    margin-top: 2rem;
  }
}
.ForgetPassMain {
  width: 95%;
  margin: 0 auto;
}
.ResetPwdTips {
    line-height: 2rem;
    text-align: left;
    font-size: 16px;
    margin-bottom: 10px;
}
.EmailSuccess{
  text-align: center;
}
.EmailSuccess p {
  line-height: 35px;
  font-size: 16px;
}
.EmailSuccess p a {
  line-height: 35px;
  font-size: 16px;
  color: crimson;
  text-decoration: underline;
  cursor: pointer;
}
.EmailSuccess p i {
  font-size: 60px;
  color: #8dc11f;
}
.Banner {
  width: 100%;
  height: 20rem;
  display:flex;
  align-items: center;
  padding-left:2rem;
  .innerBox{
      width: 1200px;
      margin: 0 auto;
  }
}
.Banner img {
  width: 100%;
  height: 20rem;
}
</style>
