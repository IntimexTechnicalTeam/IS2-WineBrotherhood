<template>
  <div id="register_container" v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div id="login-register-box">
        <div id="join_form">
          <div class="login-register-top">
            <div class="join_form-title">{{$t('Register.RegisterTitle')}}</div>
            <div class="clear"></div>
          </div>
          <ElForm
            :model="regForm"
            status-icon
            :rules="rules"
            label-width="auto"
            ref="regForm"
            class="login-form register-form"
          >
            <div class="login-register-content register-content">
              <div class="step_content">
                <FormItem :label="$t('Register.UserEmail')" prop="Email">
                  <ElInput
                    autocomplete="off"
                    prefix-icon="el-icon-message"
                    :placeholder="$t('Register.UserEmail')"
                    v-model="regForm.Email"
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('Register.UserRegPassword')" prop="Password">
                  <ElInput
                    type="password"
                    v-model="regForm.Password"
                    prefix-icon="el-icon-view"
                    autocomplete="off"
                    :placeholder="$t('Register.UserRegTips')"
                  ></ElInput>
                </FormItem>

                <FormItem
                  :label="$t('Register.UserConfirmPassword')"
                  prop="ConfirmPassword"
                >
                  <ElInput
                    type="password"
                    v-model="regForm.ConfirmPassword"
                    :placeholder="$t('Register.UserConfirmPassword')"
                    autocomplete="off"
                    prefix-icon="el-icon-view"
                  ></ElInput>
                </FormItem>
              </div>
              <div class="step_content">
                <FormItem :label="$t('Register.UserFirstName')" prop="FirstName">
                  <ElInput
                    v-model="regForm.FirstName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('Register.UserFirstName')"
                  ></ElInput>
                </FormItem>

                <FormItem :label="$t('Register.UserLastName')" prop="LastName">
                  <ElInput
                    v-model="regForm.LastName"
                    :placeholder="$t('Register.UserLastName')"
                    prefix-icon="el-icon-collection-tag"
                  ></ElInput>
                </FormItem>
                <FormItem prop="Mobile" :label="$t('Register.UserContactNumber')">
                  <ElInput
                    v-model="regForm.Mobile"
                    prefix-icon="el-icon-phone"
                    :placeholder="$t('Register.UserContactNumber')"
                  ></ElInput>
                </FormItem>
                 <FormItem prop="BirthMD" :label="$t('Register.UserBirthDate')">
                  <ElInput
                    v-model="regForm.BirthMD"
                    prefix-icon="el-icon-date"
                    :placeholder="$t('Register.UserBirthDate')"
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('Register.UserGender')" prop="Gender">
                  <RadioGroup v-model="regForm.Gender">
                    <Radio :label="$t('Register.UserMale')"></Radio>
                    <Radio :label="$t('Register.UserFemale')"></Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem :label="$t('Register.UserLanguage')" prop="Language">
                  <Select
                    v-model="regForm.Language"
                    :placeholder="$t('Register.UserLanguage')"
                    style="width: 100%;"
                  >
                    <Select :label="$t('Register.UserLanguageT')" value="1"></Select>
                    <Select :label="$t('Register.UserLanguageE')" value="2"></Select>
                  </Select>
                </FormItem>
              </div>
            </div>
            <div class="login-register-handle">
              <CheckboxGroup v-model="regForm.type">
                  <Checkbox :label="$t('Register.RegisterAgree')" name="type"></Checkbox>
                </CheckboxGroup>
              <div class="clear"></div>
              <div class="btn-box">
                <ElButton
                  type="primary"
                  @click="submitForm('regForm')"
                >{{$t('Register.RegisterBtn')}}</ElButton>
              </div>
            </div>
            <div class="clear"></div>
          </ElForm>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Form as ElForm, Input as ElInput, FormItem, RadioGroup, Radio, Select, Option, CheckboxGroup, Checkbox, Button as ElButton } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
@Component({
  components: {
    ElForm,
    ElInput,
    FormItem,
    RadioGroup,
    Radio,
    Select,
    Option,
    CheckboxGroup,
    Checkbox,
    ElButton
  }
})
export default class InsRegister extends Vue {
  checkEmail (rule, value, callback) {
    const mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (!value) {
      callback(new Error(this.$t('Register.RegisterEmail') as string));
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error(this.$t('Register.RegisterEmail01') as string));
      }
    }, 100);
  }

  validatePassword (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('Register.RegisterPassword') as string));
    } else {
      if (this.regForm.Password !== '') {
        // this.$refs.ruleForm.validateField('UserConfirmPassword');
      }

      callback();
    }
  }

  validatePassword2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('Register.RegisterNewPassword') as string));
    } else if (value !== this.regForm.Password) {
      callback(new Error(this.$t('Register.RegisterNewPassword01') as string));
    } else {
      callback();
    }
  }
  private regForm = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FirstName: '',
    LastName: '',
    Mobile: '',
    BirthMD: '',
    Gender: '',
    Language: '',
    type: ''

  };
  get rules () {
    return {
      Email: [
        { required: true, validator: this.checkEmail, trigger: 'blur' }
      ],
      Password: [
        { required: true, validator: this.validatePassword, trigger: 'blur' }
      ],
      ConfirmPassword: [
        { required: true, validator: this.validatePassword2, trigger: 'blur' }
      ],
      FirstName: [
        {
          required: true,
          message: this.$t('Register.RegisterFirstName'),
          trigger: 'blur'
        }
        //  { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('Register.RegisterLastName'),
          trigger: 'blur'
        }
        //  { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      type: [
        {
          required: true,
          message: this.$t('Register.RegisterAgree_check'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('Register.RegisterMobile'),
          trigger: 'blur'
        }
      ]
    };
  }
  private submitForm (formName) {
    let _this = this;
    (this.$refs.regForm as ElForm).validate(valid => {
      if (valid) {
        sdk.api.member.register(this.regForm).then(
          function (response) {
            _this.$store.dispatch('submitForm');
            _this.$message({
              message: _this.$t('Register.RegisterSuccess') as string,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
            _this.$router.push('/account/registerSuccess');
          },
          function (response) {
            _this.$message({
              message: _this.$t('Register.RegisterFail') as string,
              type: 'error',
              customClass: 'messageboxNoraml'
            });
          }
        );
      } else {
        return false;
      }
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
#register_container{
  .login-register-handle .el-checkbox__label{
      display: inline;
      padding-left: 1rem;
  }
}
.btn-box .el-button span{
  font-size: 1.6rem;
}
</style>
<style lang="less" scoped>
/*注册页面*/
.login-register-top{
  text-align: center;
}
#login-register-box {
  font-family: "Arial", "微软雅黑";
  width: 95%;
  margin: 0 auto;
  margin-top: 60px;
  .login_logo{
    position: absolute;
    z-index: 2;
    right: 2.5%;
    transform: translateY(-50%);
    img{
      width: 6rem;
    }
    // width: 5rem;
  }
}
#join_form {
  width: 100%;
  max-width: 800px;
  margin: 60px auto;
  padding: 5%;
  border: #eaedf5 1px solid;
  letter-spacing: 2px;
  line-height: 1.8em;
  font-size: 14px;
  color: #888;
  box-sizing: border-box;
  background-color: white;
}
.join_form-title {
    position: relative;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 3px;
    left: 3px;
    padding: 1rem 1rem;
    color: #8CC540;
}

.login-register-tip {
  float: right;
  font-size: 20px;
  color: #999999;
  height: 45px;
  line-height: 45px;
}
#join_form .el-radio__input.is-checked .el-radio__inner {
  border-color: #8dc11f;
  background: #8dc11f;
}
#join_form .el-radio__input.is-checked + .el-radio__label {
  color: #303133;
}
.login-register-tip a {
  font-size: 26px;
  color: #1b1b1b;
  line-height: 45px;
}
#join_form .el-form-item__content {
  text-align: left;
}
.login-form {
  margin-top: 40px;
}

.login-register-content .el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #67c23a;
}
.login-register-content .el-form-item.is-success .el-input__validateIcon {
  color: #67c23a;
}

.login-register-content .form-group .input-text:focus {
  border-bottom: 1px solid #88bd43;
}

#join_form .form-checkbox input[type="checkbox"],
#join_form .form-radio input[type="radio"] {
  cursor: pointer;
  vertical-align: text-bottom;
  width: 17px;
  height: 17px;
}

.btn-box .el-button--primary {
    background-color: @primary_color;
    border: 1px solid @primary_color;
    width: 100%;
    color: #fff;
    font-size: 25px;
    line-height: 45px;
}
// .btn-box .el-button--primary:hover {
//   background-color: #8dc11f;
//   border: 1px solid #8dc11f;
//   width: 700px;
//   height: 45px;
//   color: #fff;
//   font-size: 25px;
//   margin-top: 25px;
// }
.el-button{
  padding: 0px!important;
}
.el-button span{
  font-size: 20px;
}
.step_content .el-form-item__label-wrap{
  float:none;
  width: 100%;
  margin-left:0px!important;
}
.step_content .el-form-item__label{
  text-align: left;
}
.step_content .el-form-item__content{
  margin-left: 0px!important;
}
.login-register-handle  .el-form-item__content{
    margin-left: 0px!important;
}
.login-register-handle{
  width: 100%;
}
.login-register-handle .el-checkbox, .el-checkbox__input{
      white-space:normal;
}

</style>
