<template>
  <div class="MemberPc">
    <div class="MemberInfoMain">
        <!-- 用户账号 -->
          <ElForm
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <FormItem :label="$t('Register.UserEmail')" prop="Email">
              <ElInput
                 v-model="ruleForm.Email"
                prefix-icon="el-icon-message"
                :placeholder="$t('Register.UserEmail')"
                disabled
              ></ElInput>
            </FormItem>
            <FormItem :label="$t('Register.UserFirstName')" prop="FirstName">
              <ElInput
                v-model="ruleForm.FirstName"
                prefix-icon="el-icon-user"
                :placeholder="$t('Register.UserFirstName')"
                clearable
              ></ElInput>
            </FormItem>
            <FormItem :label="$t('Register.UserLastName')" prop="LastName">
              <ElInput
                v-model="ruleForm.LastName"
                :placeholder="$t('Register.UserLastName')"
                prefix-icon="el-icon-collection-tag"
                clearable
              ></ElInput>
            </FormItem>
            <FormItem prop="Mobile" :label="$t('DeliveryAddress.Mobile')">
              <ElInput
                v-model="ruleForm.Mobile"
                prefix-icon="el-icon-phone"
                :placeholder="$t('DeliveryAddress.Mobile')"
                clearable
              ></ElInput>
            </FormItem>
               <FormItem prop="BirthDateString" :label="$t('Register.UserBirthDate')">
                <ElInput
                v-model="ruleForm.BirthDateString"
                prefix-icon="el-icon-date"
                :placeholder="$t('MemberInfo.DDMM')"
                clearable
              ></ElInput>
                </FormItem>
            <FormItem :label="$t('Register.UserGender')" prop="Gender">
              <RadioGroup v-model="ruleForm.Gender">
                <Radio label="1">{{$t('Register.UserMale')}}</Radio>
                <Radio label="0">{{$t('Register.UserFemale')}}</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem :label="$t('Register.UserLanguage')" prop="Language">
              <Select
                v-model="ruleForm.Language"
                :placeholder="$t('Register.UserLanguage')"
                style="width: 100%;"
              >
                <Option :value="1" :label="$t('Register.UserLanguageT')">{{$t('Register.UserLanguageT')}}</Option>
                <Option :value="0" :label="$t('Register.UserLanguageE')">{{$t('Register.UserLanguageE')}}</Option>
              </Select>
            </FormItem>
            <FormItem>
              <ElButton
                type="primary"
                @click="SubmitForm('ruleForm')"
              >{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
            </FormItem>
          </ElForm>
    </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, Message, FormItem, Radio, RadioGroup, Option, Select, Button } from 'element-ui';
import { MemberResult } from '@/model/memberResult';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    Form,
    Input,
    FormItem,
    Radio,
    RadioGroup,
    Option,
    Select,
    Button
  }
})
export default class InsMemberInfo extends Vue {
  activeName: string = 'first';
  private member: MemberResult = new MemberResult();
  // 验证规则
  ruleForm: any = {
    FirstName: '',
    LastName: '',
    ContactNumber: '',
    BirthDateString: '',
    Gender: '',
    Mobile: '',
    Language: ''
  };
  langs:string[] = ['E', 'C', 'S'];
  validatePass (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterUserName') as string));
    } else {
      callback();
    }
  }
  get rules () {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserLastName'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserPhone'),
          trigger: 'blur'
        },
        { validator: function(rule, value, callback) {
          /* eslint-disable */
            var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
            if ( mobile.test(value) === false ) {
              var t = lang.messages[storage.get('locale')].Input['phoneincorrect'];
                callback(new Error(t));
            } else {
                callback();
            }
        },
        trigger: 'blur' }
      ]
    };
  }

  changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
    }).catch((error) => {
      console.log(error);
    });
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  async getProfile () {
    let _this = this;
    await sdk.api.member.getProfile().then(
      function (data) {
        if (data) {
          _this.ruleForm = data;
          if (data.BirthDateString !== '') {
            var newDate = new Date(data.BirthDateString.replace(/-/g, '/'));
            data.BirthDateString = newDate.getDate() + '/' + (newDate.getMonth() + 1);
          }
          _this.$i18n.locale = _this.langs[data.Language];
          _this.$set(_this, 'member', data);
          _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
          _this.$store.dispatch('setLang', _this.langs[data.Language]);
          _this.$Storage.set('locale', _this.langs[data.Language]);
          _this.$HiddenLayer();
          // _this.Reload();
        } else {
          _this.$store.dispatch('Logout');
        }
      },
      function (data) {
        _this.$message({
          message: data,
          type: 'error'
        });
      }
    );
  }
  created () {
    this.getProfile();
  }
  // 提交用户信息表单
  SubmitForm (ruleForm) {
    let that = this;
    that.ruleForm.DateFormat = 'dd/MM';
    if (that.ruleForm.Gender === '') {
      that.ruleForm.Gender = 1;
    }
    // that.$nextTick(function () {
    (that.$refs.ruleForm as Form).validate(valid => {
      if (valid) {
        sdk.api.member.updateProfile(that.ruleForm).then(
          async function (response) {
            that.$message({
              message: response.Message,
              type: 'success', 
              customClass: 'messageboxNoraml'
            });
            await that.getProfile();
            that.Reload();
          },
          function (response) {
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
  }
  // 重置用户信息表单
  ResetForm (ruleForm) {
    (this.$refs.ruleForm as Form).resetFields();
  }
  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
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
    border-color: #14234f;
    background: #14234f;
}
.MemberPc .el-form .el-radio__input.is-checked+.el-radio__label{
  color: #14234f;
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
  background: #14234f;
  color:#fff;
  right: 0px!important;
}
.MemberPc .el-select .el-input .el-select__caret{
  color:#fff!important;
}
.MemberPc .el-form-item__error{
      left: 25%;
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
    background: #8b0b04;
    border: none;
    display: block;
    border-radius: 20px;
    width: 60%;
    float: left;
    margin-left: 25%;
}
</style>
