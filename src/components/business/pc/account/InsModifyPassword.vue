<template>
  <div class="MemberPc">

    <div class="MemberInfoMain">
          <div class="pwdFormMain">
            <InsForm ref="pwdForm" v-model="pwdForm" style="width:100%;">
              <div class="login-register-content">
                    <InsInput2 :placeholder="$t('Register.UserOldPassword')" width="100%" v-model="pwdForm.Password" type="logopassword"/>
                    <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.NewPassword" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.NewPassword" />
              </div>
              <div class="login-register-handle">
                <div class="btn-box">
                  <ElButton type="primary" @click="CheckPwdSubmit('pwdForm')" class="resetBtn" style="width:100%;margin-left:0%;">{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                </div>
              </div>
            </InsForm>
          </div>
    </div>
   </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, Message, Button, FormItem } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    Form,
    Input,
    Button,
    FormItem,
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
                customClass: 'messageboxNoraml'
              });

            // _this.$router.push('/account/registerSuccess');
            },
            function (response) {
              console.log(response.Message, '3333333333333');
              that.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageboxNoraml'
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
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less">
#container .el-form-item__content{
  text-align: left!important;
}
.MemberPc .MemberInfoMain .el-button--primary span{
  font-size: 20px!important;
}
.MemberPc  .el-checkbox__label{
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    word-break: break-all;
    vertical-align: text-top;
}
.MemberPc .el-checkbox, .el-checkbox__input{
  white-space: unset;
}
.MemberPc .el-form{
  width: 80%;
  margin: 0 auto;
}
.MemberPc .el-form .el-input{
  width: 60%!important;
}
.MemberPc .el-form .el-select{
  width: 60%!important;
}
.MemberPc .el-form .el-select .el-input{
    width: 100%!important;
}
.MemberPc .el-form .el-radio__input.is-checked .el-radio__inner{
    border-color: #333333;
    background: #333333;
}
.MemberPc .el-form .el-form-item__label{
    width: 25%;
    float: left;
    color: #161616 !important;
    padding: 0px;
    padding-right: 10px;
    line-height: inherit;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
}
.MemberPc .el-select .el-input__suffix{
  background: #333333;
  color:#fff;
  right: 0px!important;
}
.MemberPc .el-select .el-input .el-select__caret{
  color:#fff!important;
}
.MemberPc .el-form-item__error{
      left: 25%;
}
.MemberInfoMain .input_warpper .input_main input{
  background: #fff;
  border:1px solid #ddd;
}
</style>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.MemberInfoMain {
  width: 1200px;
  margin: 0 auto;
  margin-top: 1rem;
  padding:2.5%;
}
.pwdFormMain{
  width: 60%;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
}
.MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MemberInfoMain .el-form-item__content,.MemberInfoMain .el-form-item__label-wrap{
  margin-left: 0px!important;
}
.MemberInfoMain .el-button{
    background: #333333;
    border: none;
    display: block;
    border-radius: 20px;
    width: 60%;
    float: left;
    margin-left: 25%;
}
</style>
