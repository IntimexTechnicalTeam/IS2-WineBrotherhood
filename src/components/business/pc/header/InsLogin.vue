<template>
  <div class="handle-one" v-click-outside="closeDialog">
    <a href="javascript:;" class="handle-icon member-icon handle-icon-window" @click="toggleDialog"></a>
    <div class="top-member-detail top-window" v-if="isShow && !isLogin">
      <p class="window-top"></p>
      <div class="window-detail-title">
        <b></b>
        <span>{{$t('Login.LoginTitle')}}</span>
        <b></b>
      </div>
      <ElForm :model="loginForm" status-icon :rules="rules" ref="loginForm" class="loginForm">
        <FormItem prop="user">
          <ElInput v-model="loginForm.user" autocomplete="off" :placeholder="$t('Login.EnterEmail')" @keyup.enter.native="submitForm"></ElInput>
        </FormItem>
        <FormItem prop="password">
          <ElInput type="password" v-model="loginForm.password" autocomplete="off" :placeholder="$t('Register.UserRegPassword')" @keyup.enter.native="submitForm"></ElInput>
        </FormItem>
        <FormItem>
          <ElButton class="loginBtn" @click="submitForm">{{$t('Login.doLogin')}}</ElButton>
          <a to="/account/forgetPassword" @click="ToUrl('/account/forgetPassword')"><ElButton>{{$t('Login.ForgetPwd')}}</ElButton></a>
          <a to="/account/login" @click="ToUrl('/account/login')"><ElButton>{{$t('Register.RegisterBtn')}}</ElButton></a>
        </FormItem>
      </ElForm>
      <div class="facebook_login" @click="fbLogin" v-if="!isIe">
        <img src="/static/facebook.png" />
        <span>{{$t('Login.FaceBookUse')}}</span>
      </div>
    </div>

    <div class="top-member-detail top-window top-window-after" v-if="isShow && isLogin">
      <p class="window-top"></p>
      <div class="window-detail-title">
        <span>{{$t('Account.Welcome')}} {{user}}</span>
      </div>
      <div class="login-after-select">
        <p>
          <router-link to="/account/memberInfo" @click.native="closeDialog">{{$t('Account.MemberInformation')}}</router-link>
        </p>
        <p>
          <router-link to="/account/notification" @click.native="closeDialog">{{$t('Account.MyMessages')}}</router-link>
        </p>
        <p>
          <router-link to="/account/myFavorite" @click.native="closeDialog">{{$t('Account.MyFavorite')}}</router-link>
        </p>
        <p>
         <router-link to="/order/List" @click.native="closeDialog">{{$t('Account.MyOrder')}}</router-link>
        </p>
        <!--<p><a href="/account/MyCoupon">我的優惠券 My E-Coupon</a></p>-->
        <p>
           <router-link to="/account/deliveryAddress" @click.native="closeDialog">{{$t('Account.DeliveryAddress')}}</router-link>
        </p>
        <p>
           <router-link to="/account/mycoupon" @click.native="closeDialog">{{$t('MyCoupon.MyCoupon')}}</router-link>
        </p>
        <p class="logout">
          <a href="javascript:;" @click="Logout()">{{$t('Account.Logout')}}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Form as ElForm, Input as ElInput, Message, FormItem, Button as ElButton } from 'element-ui';
import Auth from '@/sdk/common/Auth';
import sdk from '@/sdk/InstoreSdk';
import 'element-ui/lib/theme-chalk/index.css';

import Cookie from 'js-cookie';
@Component({ components: { ElForm, ElInput, FormItem, ElButton } })
export default class InsLogin extends Vue {
  imgsrc: string = '@/assets/Images/void-cart.png';
  isShow: boolean = false;
  lang:string[] = ['E', 'C', 'S'];
  checkEmail (rule, value, callback) {
    const mailReg = /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w+$/;
    if (!value) {
      callback(new Error(this.$t('Login.EnterEmail')as string));
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error(this.$t('Login.CorrectEmail')as string));
      }
    }, 100);
  }
   private loginForm = {
     user: '',
     password: ''
   }
   get rules () {
     return {
       user: [{ required: true, validator: this.checkEmail, trigger: 'blur' }],
       password: [
         { required: true, message: this.$t('Login.LoginPwd'), trigger: 'blur' }
       ]

     };
   }

   // 显示登录框
   toggleDialog () {
     this.isShow = !this.isShow;
   }

   // 关闭登录框
   closeDialog () {
     this.isShow = false;
   }

   // 跳转地址
   ToUrl (val) {
     window.location.href = val;
     this.closeDialog();
   }
   // 提交表单
   submitForm () {
     (this.$refs.loginForm as ElForm).validate((valid) => {
       if (valid) {
         this.doLogin();
       } else {
         console.log('error submit!!');
         return false;
       }
     });
   }

   // 重置表单
   resetForm () {
     (this.$refs.loginForm as ElForm).resetFields();
   }

   // 登陆
   doLogin () {
     let _this = this;
     this.$Api.member.login(this.loginForm.user, this.loginForm.password, true).then(
       function (data) {
         console.log(_this.loginForm, '_this.loginForm');
         _this.resetForm();
         _this.$store.dispatch('doLogin');
         Message({
           message: _this.$t('Login.LoginSucceeded') as string,
           type: 'success',
           customClass: 'messageboxNoraml'
         });
         _this.isShow = false;
         _this.getShopCart();
         // _this.getProfile();
       },
       function (data) {
         Message({
           message: data.Message,
           type: 'error',
           customClass: 'messageboxNoraml'
         });
       }
     ).then(
       (url) => {
         this.$Api.member.getProfile().then(
           async function (data) {
             if (data) {
               _this.loginForm = data;
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
     ); ;
   }

   // 登出
   Logout () {
     let _this = this;
     sdk.api.member.logout().then(
       function (data) {
         console.log(data, '登出系统');
         _this.$store.dispatch('Logout');
         _this.$router.push('/');
         _this.isShow = false;
         // storage.remove('access_token');
         Cookie.remove('access_token');
         Auth.GetToken();
       },
       function (data) {
         Message({
           message: data,
           type: 'error',
           customClass: 'messageboxNoraml'
         });
       }
     );
   }
   getShopCart () {
     this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
   }
   // 获取会员信息
   getAccount () {
     let _this = this;

     sdk.api.member.getAccount().then(
       function (data) {
         if (data.Logined) {
           _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
           _this.$store.dispatch('doLogin');
         } else {
           _this.$store.dispatch('Logout', true);
         }
       },
       function (data) {
         Message({
           message: data,
           type: 'error',
           customClass: 'messageboxNoraml'
         });
       }
     );
   }

   get isLogin () {
     return this.$store.state.isLogin;
   }

   get user () {
     return this.$store.state.user;
   }

   mounted () {
     this.getAccount();
   }
   fbLogin () {
     console.log(window, 'FB login');
     window['FB'].login(function (response) {
       window['checkLoginState']();
     }, { scope: 'email' });
   }
   isIe = true;
   created () {
     if (window.navigator.userAgent.indexOf('Trident') !== -1) this.isIe = true;
     else this.isIe = false;
   }
}
</script>

<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
.loginForm {
  .el-input {
    .el-input__inner {
      border-radius: 0;
      outline: none;
      border: 0;
      border-bottom: 1px solid #cccccc;
      padding: 0 10px;
      font-size: 17px;
    }
  }

  .el-form-item__error {
    position: relative;
    text-align: left;
  }
}
</style>

<style scoped lang="less">
.facebook_login{
  cursor: pointer;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  background-color: #3975ea;
  color: white;
  img{
    width: 14px;
    margin-right: 14px;
    vertical-align: middle;
  }
  span{
    vertical-align: middle;
  }
}
.el-dropdown-menu {
  padding: 0;
  border: 0;
}

.loginForm {
  margin-top: 20px;

  .el-form-item {
    margin-bottom: 10px;

      .el-button {
        border: 1px solid @base_color;
        margin-top: 20px;
        color: #000000;
        cursor: pointer;
        text-align: center;
        display: block;
        width: 100%;
        border-radius: 0;
        margin: 15px 0 0;
        background-color: @base_color;
        color: #fff;
        &.loginBtn {
          background-color: #fff;
          color: #14234f;
        }
      }
  }
}

/*头部登录弹框 css*/
.handle-icon {
    display: block;
    width:25px;
    height: 25px;
    color: #cccccc;
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}
.member-icon {
    background: url('/images/pc/pcindex_06.png') no-repeat center center;
    background-size: contain;
}

#topLoginMessage {
  color: #ff0000;
  font-size: 12px;
  margin-top: 3px;
}
.top-window {
  // display: none;
  font-family: "Arial";
  position: absolute;
  z-index: 12;
  box-sizing: border-box;
  padding: 14px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
}
.input-text {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  box-sizing: border-box;
}
.window-detail-title {
    background-color:@base_color;
    text-align: center;
    padding: 12px 3px;
    color: #fff;
}
.input-btn {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  box-sizing: border-box;
}

.top-member-detail {
  width: 300px;
  left: -234px;
  top: 50px;
}

.top-member-detail .window-top {
  right: 40px;
  position: absolute;
  top: -18px;
  width: 24px;
  height: 18px;
  background: url(../../../../assets/Images/window-top.png) no-repeat center center;
}

.top-member-detail .window-detail-title span {
  padding: 0 20px;
  font-size: 17px;
}

.window-login-box .input-text {
  display: block;
  color: #cccccc;
  font-size: 17px;
  width: 100%;
  height: 40px;
  margin-top: 10px;
  padding: 0 10px;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
}

.window-login-box .input-btn {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  border: none;
}

.window-login-box .sbtn {
  background: #fff;
  border: 1px solid #000000;
  margin-top: 20px;
  color: #000000;
  cursor: pointer;
  text-align: center;
}

.login-other-btn {
  display: block;
  height: 40px;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}

.login-other-fb {
  background-color: #4e72b6;
}

.login-other-fp {
  background-color: #000000;
}

.login-other-fr {
  background-color: #000000;
}

.login-after-select p a {
    display: block;
    color: #666;
    font-size: 17px;
    padding: 12px 0;
    border-bottom: 1px solid #ccc;
    text-indent: 10px;
    text-align: center;
}

.login-after-select .logout {
  margin-top: 25px;
}

.login-after-select .logout a {
  color: #fff;
  font-size: 17px;
  padding: 10px 0;
  border-bottom: none;
  background-color: #cccccc;
  text-align: center;
  text-indent: 0px;
}

.login-after-select p a:hover {
  color: #000;
}

.login-after-select .logout a:hover {
  color: #fff;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #cccccc;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #cccccc;
  opacity: 1;
}

.input-text:-ms-input-placeholder {
  color: #cccccc;
  opacity: 1;
}

.input-text::-webkit-input-placeholder {
  color: #cccccc;
  opacity: 1;
}
</style>
