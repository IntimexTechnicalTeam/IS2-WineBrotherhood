<template>
  <div id="container" class="MembercenterMobile">
    <div class="MemberInfoMain">
        <!-- 修改密码切换 -->
          <div class="pwdFormMain">
            <InsForm ref="pwdForm" v-model="pwdForm">
              <div class="login-register-content">
                    <InsInput2 :placeholder="$t('Register.UserOldPassword')" width="100%" v-model="pwdForm.Password" type="logopassword"/>
                    <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.NewPassword" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.NewPassword" />
              </div>
              <div class="login-register-handle">
                <div class="btn-box">
                  <ElButton type="primary" @click="CheckPwdSubmit('pwdForm')" class="resetBtn">{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                </div>
              </div>
            </InsForm>
          </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, Message, FormItem, Button } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue'),
    Form,
    Input,
    FormItem,
    Button,
    InsInput2,
    InsForm
  }
})
export default class InsModifyPassword extends Vue {
  validatePass2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.NewPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  }

  pwdForm: any = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  };
  get pwdRules () {
    var that = this;
    return {
      Password: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterOldPwd'),
          trigger: 'blur'
        }
      ],
      NewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ],
      ConfirmNewPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass2
        }
      ]
    };
  }

  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }

  // 提交密码修改表单
  CheckPwdSubmit (pwdForm) {
    let that = this;
    this.$nextTick(function () {
      (that.$refs.pwdForm as InsForm).validate(valid => {
        if (valid) {
          sdk.api.member.updatePassword(this.pwdForm).then(
            function (response) {
              console.log(response.Message, '22222');
              that.$message({
                message: response.Message,
                type: 'success',
                customClass: 'messageBoxMobile'
              });

            // _this.$router.push('/account/registerSuccess');
            },
            function (response) {
              that.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
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
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
.MembercenterMobile .el-card__body{
  background: #FFF;

}
#container .el-form-item__content{
  text-align: left!important;
}
.MembercenterMobile .MemberInfoBg{
    width:100%;
    background:#fff;
    background-size: 100%;
    display: inline-block;
    box-sizing: border-box;
}
.MembercenterMobile .MemberInfoMain .el-button--primary span{
  font-size: 20px!important;
}
.MembercenterMobile .MemberInfoMain .el-form-item__label{
    width: 25%;
    float: left;
    color: #161616 !important;
    padding: 0px;
    padding-right: 10px;
    line-height: inherit;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.MembercenterMobile .MemberInfoMain .el-input{
  width: 75%!important;
}
.MembercenterMobile .MemberInfoMain .el-checkbox__label{
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    width: 91%;
    word-break: break-all;
    vertical-align: text-top;
}
.MembercenterMobile .MemberInfoMain .el-checkbox, .el-checkbox__input{
  white-space: unset;
}
.MembercenterMobile .MemberInfoMain {
    width: 90%;
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
}
.MembercenterMobile .MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MembercenterMobile .MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MembercenterMobile .MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MembercenterMobile .MemberInfoMain .el-form-item__content,.MemberInfoMain .el-form-item__label-wrap{
  margin-left: 0px!important;
}
.MembercenterMobile .MemberInfoMain .el-button{
    width: 100%;
    display: block;
    background: #333333;
    background-size: 100%;
    height: 4rem;
    border:0px!important;
}
.MembercenterMobile .MemberInfoMain .el-input.is-disabled .el-input__inner{
      border: 1px solid #535353!important;
      background-color: transparent!important;
      color:#161616!important;
      border: none;
      border-radius: 0px;
}
.MembercenterMobile .MemberInfoMain  .el-input__inner{
      border: 1px solid #535353!important;
      background-color: transparent!important;
      color:#161616!important;
      border: none;
      border-radius: 0px;
}
.MembercenterMobile .MemberInfoMain .el-radio__input.is-checked .el-radio__inner{
    border-color: #333333;
    background: #333333;
}
.MembercenterMobile .MemberInfoMain .el-radio__input.is-checked+.el-radio__label{
  color: #606266;
}
.MembercenterMobile .MemberInfoMain .el-select{
  width: 75%!important;
}
.MembercenterMobile .MemberInfoMain .el-select >.el-input{
  width: 100%!important;
  border: 1px solid #000;
}
.MembercenterMobile .MemberInfoMain .el-select >.el-input .el-input__inner{
  border: 0px!important;
}
.MembercenterMobile .MemberInfoMain .el-select .el-input__suffix{
  background: #333333;
  color:#fff;
  right: 0px!important;
}
.MembercenterMobile .MemberInfoMain .el-select .el-input .el-select__caret{
  color:#fff!important;
}
.MembercenterMobile .MemberInfoMain input::-webkit-input-placeholder {
        color:#999!important;
}
.MembercenterMobile .pwdFormMain{
  width: 90%;
  margin: 0 auto;
  margin-bottom: 50px;
}
.MembercenterMobile  .input_outer{
  padding-bottom: 30px;
  padding-top: 0px!important;
}
</style>
