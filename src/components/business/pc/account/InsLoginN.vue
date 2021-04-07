<template>
  <div class="insLogin_warrper">
      <div style="min-height:131px;">
        <div class="insLogin_title" v-if="!isIe">
          <div class="facebook_login" @click="fbLogin">
            <img src="/static/facebook.png" />
            <span>{{$t('Login.FaceBookUse')}}</span>
          </div>
        </div>
        <div class="insLogin_divide" v-if="!isIe">
            <div class="divide"></div>
            <div class="divide_or">{{$t('Register.or')}}</div>
            <div class="divide"></div>
        </div>
      </div>
      <div class="insLogin_main">
          <div class="login">
              <div>
                <div class="login_title">{{$t('Login.doLogin')}}</div>
                <InsForm ref="loginForm" v-model="loginForm">
                    <InsInput2 :placeholder="$t('Register.UserEmail')" width="100%" v-model="loginForm.email" />
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="loginForm.password" type="logopassword" />
                    <div class="remember_warpper">
                        <div class="remember">
                            <input
                                type="checkbox"
                                class="remember-btn"
                                name="remember-btn"
                                id="remember-btn"
                                value
                            />
                            <label for="remember-btn">{{$t('Login.RememberMe')}}</label>
                        </div>
                        <a class="forget" href="/account/forgetPassword">{{$t('Login.ForgetPwd')}}</a>
                    </div>
                </InsForm>
              </div>
              <InsButton :nama="$t('Login.doLogin')" @click="login"  style="margin-top: 199px;"/>
          </div>
          <div class="register">
              <div>
                <div class="register_title">{{$t('Register.RegisterBtn')}}</div>
                <InsForm ref="registerForm" v-model="registerForm">
                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserFirstName')" width="48%" v-model="registerForm.firstName" />
                    <InsInput2 :placeholder="$t('Register.UserLastName')" width="48%" v-model="registerForm.lastName"/>
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="registerForm.password" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="registerForm.confirmPassword" type="confirmpassword" :rule="registerForm.password" />
                </div>
                <InsInput2 :placeholder="$t('DeliveryAddress.Mobile')" width="100%" v-model="registerForm.Mobile" type="phone" :must="false" />
                <InsInput2 :placeholder="$t('Register.UserEmail')" v-model="registerForm.email" width="100%" type="email" />
                </InsForm>
                <!-- <div></div> -->
                <CheckboxGroup v-model="terms" style="margin: 15px 0 0 0">
                    <Checkbox name="type"></Checkbox><span><router-link to="/CMS/content/20298" target="_blank" style="font-size: 14px;padding-left: 14px;color: #666666;
    text-decoration: none;">{{$t('Register.RegisterAgree')}}</router-link></span>
                </CheckboxGroup>
              </div>
              <InsButton :nama="$t('Forgetpassword.NextStep')" @click="register" style="margin-top:.4rem;" />
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import InsButton from '@/components/base/pc/InsButton.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
import { CheckboxGroup, Checkbox } from 'element-ui';
@Component({ components: { InsInput2, InsButton, InsForm, CheckboxGroup, Checkbox } })
export default class InsLoginN extends Vue {
    private terms: boolean = true;
    faceBookLogin:string='';
    lang:string[] = ['E', 'C', 'S'];
    private loginForm = {
      email: '',
      password: ''
    }
    private registerForm = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      Language: '',
      Mobile: ''
    }
    get currentlang () {
      return this.$Storage.get('locale');
    }
    login () {
      let _this = this;
      (this.$refs.loginForm as InsForm).validate((valid) => {
        if (valid) {
          this.$Api.member.login(this.loginForm.email, this.loginForm.password, true).then(
            function (response) {
              _this.$store.dispatch('doLogin');
              return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
            },
            function (response) {
              _this.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
              });
            }
          ).then(
            (url) => {
              this.$Api.member.getProfile().then(
                function (data) {
                  if (data) {
                    _this.loginForm = data;
                    _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                    _this.$i18n.locale = _this.lang[data.Language];
                    _this.$store.dispatch('setLang', _this.lang[data.Language]);
                    _this.$Storage.set('locale', _this.lang[data.Language]);
                    _this.$store.dispatch('setMemberInfo', data);
                    _this.getShopCart();
                    if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
                  } else {
                    _this.$store.dispatch('Logout');
                  }
                },
                function (data) {
                  _this.$message({
                    message: data,
                    type: 'error',
                    customClass: 'messageBoxMobile'
                  });
                }
              );
            }
          );
        } else {
          return false;
        }
      });
    }
    register () {
      let _this = this;
      let l = this.$Storage.get('locale');
      this.lang.forEach((element, index) => {
        if (l === element) this.registerForm.Language = '' + index;
      });
      (this.$refs.registerForm as InsForm).validate((valid) => {
        if (valid && this.terms) {
          this.$Api.member.register(this.registerForm).then((result) => {
            if (result.Succeeded) {
              this.$Api.member.login(this.registerForm.email, this.registerForm.password, true).then(
                function (response) {
                  _this.$store.dispatch('doLogin');
                  return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
                },
                function (response) {
                  _this.$message({
                    message: response.Message,
                    type: 'error',
                    customClass: 'messageBoxMobile'
                  });
                }
              ).then(
                (url) => {
                  this.$Api.member.getProfile().then(
                    function (data) {
                      if (data) {
                      // _this.registerForm = data;
                        _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                        _this.$i18n.locale = _this.lang[data.Language];
                        _this.$store.dispatch('setLang', _this.lang[data.Language]);
                        _this.$Storage.set('locale', _this.lang[data.Language]);
                        _this.$store.dispatch('setMemberInfo', data);
                        if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
                      } else {
                        _this.$store.dispatch('Logout');
                      }
                    },
                    function (data) {
                      _this.$message({
                        message: data,
                        type: 'error',
                        customClass: 'messageBoxMobile'
                      });
                    }
                  );
                }
              );
            } else {
              this.$message({
                message: result.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    getShopCart () {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    }
    isIe = true;
    created () {
      if (window.navigator.userAgent.indexOf('Trident') !== -1) this.isIe = true;
      else this.isIe = false;
    }
    mounted () {
      window.dispatchEvent(new Event('faceBookLoad'));
    }
    fbLogin () {
      window['FB'].login(function (response) {
        window['checkLoginState']();
      }, { scope: 'email' });
    }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style lang="less" scoped>
.insLogin_warrper{
    width: 1200px;
    margin: 100px auto;
    .insLogin_title{
        width: 1060px;
        margin: 0 auto;
        text-align: center;
        border: solid 1px rgba(0, 0, 0, .2);
        padding: 20px;
        box-sizing: border-box;
        .facebook_login{
          display: inline-block;
          background-color: #3975ea;
          color: white;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 8px;
          font-weight: bold;
          user-select: none;
          span{
            vertical-align: middle;
          }
          img{
            height: 32px;
            vertical-align: middle;
            padding-right: 16px;
          }
        }
    }
    .insLogin_divide{
        white-space: nowrap;
        width: 1060px;
        margin: 20px auto;
        .divide{
            display: inline-block;
            width: 500px;
            margin: 20px 0;
            border-top: solid 1px rgba(0, 0, 0, .2);
            vertical-align: bottom;
        }
        .divide_or{
            vertical-align: bottom;
            display: inline-block;
            line-height: 41px;
            margin: 0 20px;
            font-size: 20px;
        }
    }
    .insLogin_main{
        width: 1060px;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 40px;
        border: solid 1px rgba(0, 0, 0, .2);
        .login{
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            width: 489px;
            // height: 350px;
            padding: 0 20px 0 0;
            box-sizing: border-box;
            vertical-align: top;
            .remember_warpper{
                padding: 0 10px;
                margin: 30px 0 0 0;
                display: flex;
                justify-content: space-between;
            }
        }
        .register{
            box-sizing: border-box;
            padding: 0 0 0 20px;
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            width: 489px;
            // height: 350px;
            border-left: solid 1px rgba(0, 0, 0, .2);
            vertical-align: top;
            .register_half{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
    }
}
</style>
