<template>
  <div id="container" class="resetPWD">
      <div class="DetailTitle"><img :src="ImgList" v-show="ImgList!==null"><div class="TitleBg"><div class="innerBoxText">{{$t('Forgetpassword.ResetPwd')}}</div></div></div>
         <div class="resetPwdMain">
          <InsForm ref="pwdForm" v-model="pwdForm">
            <div class="login-register-content">
                  <InsInput2 :placeholder="$t('Register.UserNewPassword')" width="100%" v-model="pwdForm.newPassword" type="password"/>
                  <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="pwdForm.ConfirmNewPassword" type="confirmpassword" :rule="pwdForm.newPassword" />
            </div>
            <div class="login-register-handle">
              <div class="btn-box">
                <ElButton type="primary" @click="submitForm('pwdForm')" class="resetBtn">{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
              </div>
            </div>
          </InsForm>
        </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
import { Input as ElInput, Message, FormItem, Button as ElButton } from 'element-ui';
@Component({
  components: {
    ElInput,
    FormItem,
    ElButton,
    InsForm,
    InsInput2
  }
})
export default class InsResetPwd extends Vue {
  memberMessage:any= {};
  isSentPwd:boolean= false;
  ImgList:string='/images/mobile/MobileNormalBg.jpg';
  // 检查表单
  validatePass (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterNewPwd') as string));
    } else {
      callback();
    }
  }
  validatePass2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.newPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  }
  pwdForm: any = {
    newPassword: '',
    ConfirmNewPassword: ''
  };
  get pwdRules () {
    var that = this;
    return {
      newPassword: [
        {
          required: true,
          message: '',
          trigger: 'blur',
          validator: that.validatePass
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

  get id () {
    return this.$route.params.id;
  }
  get code () {
    return this.$route.params.code;
  }
  // 更改密码
  submitForm (pwdForm) {
    var pwd = this.pwdForm.newPassword;
    var that = this;
    (that.$refs.pwdForm as InsForm).validate(valid => {
      that.$Api.member.updatePwdFM(that.id, that.code, pwd).then((result) => {
        if (result.Succeeded) {
          that.$message({
            message: result.Message,
            type: 'success',
            customClass: 'messageboxNoraml'
          });
          setTimeout(() => {
            that.$router.push('/account/login');
          }, 2000);
        } else {
          that.$message({
            message: result.Message,
            type: 'error',
            customClass: 'messageboxNoraml'
          });
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
<style lang="less" >
.btn-box .el-button span{
  font-size: 20px;
}
.login-register-content .input_warpper .input_main input{
  background: #fff;
  border:1px solid #ddd;
}
</style>
<style lang="less" scoped>
.resetPwdMain{
  width: 90%;
  margin: 0 auto;
}
.login-register-content{
  margin-bottom: 30px;
}
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
    width: 75%;
    border: 1px solid #ffffff;
    height: 4.5rem;
    line-height: 4.5rem;
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
      font-size: 2.5rem;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}
.login-form{
  width: 900px;
  margin: 0 auto;
  margin-bottom: 60px;
  background: #FFF;
  padding: 20px;
  margin-top: 30px;
}
.Banner{
    width: 100%;
    height: 500px;
}
.Banner img{
    width: 100%;
    height: 500px;
}
.resetPWD{
  padding-bottom: 60px;
}
.resetBtn{
    background-color:  @base_color;
    border: 1px solid @base_color;
    width: 100%;
    span{
      font-size: 20px;
    }
}
</style>
