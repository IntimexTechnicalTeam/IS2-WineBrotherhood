<template>
  <div id="container">
    <!--main-content-->

    <div id="main-content">
      <div id="login-register-box" class="login_container">
       <div class="login_box">
        <div class="login-register-top">
          <div class="login-register-title">{{$t('Login.LoginTitle')}}</div>
          <div class="clear"></div>
        </div>
        <ElForm class="login-form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <div class="login-register-content">
            <!-- <p id="loginFailMsg"></p> -->

              <FormItem :label="$t('Register.UserEmail')" prop="username">
                <ElInput
                 v-model="ruleForm.username"
                 prefix-icon="el-icon-message"
                 autocomplete="off"
                 :placeholder="$t('Register.UserEmail')"
                 style="width:65%!important"
                 ></ElInput>
              </FormItem>
              <div class="devide"></div>
              <FormItem :label="$t('Register.UserRegPassword')" prop="password">
                <ElInput
                type="password"
                prefix-icon="el-icon-view"
                v-model="ruleForm.password"
                autocomplete="off"
                :placeholder="$t('Register.UserRegPassword')"
                style="width:65%!important"
                ></ElInput>
              </FormItem>

          </div>

          <div class="login-register-handle">
            <div class="remember">
              <!-- <input
                type="checkbox"
                class="remember-btn"
                name="remember-btn"
                id="remember-btn"
                value
                v-model="remember"
              />
              <label for="remember-btn">{{$t('Login.RememberMe')}}</label> -->
            </div>
            <a class="forget"  @click="onForgetPassword()">{{$t('Login.ForgetPwd')}}<i>?</i></a>
            <div class="clear"></div>
            <div class="btn-box">
              <!-- <a class="btn login-btn" v-on:click="signIn">{{$t('Login.LoginTitle')}}</a>   -->
              <ElButton type="primary" @click="submitForm('ruleForm')" >{{$t('Login.LoginTitle')}}</ElButton>

            </div>
            <!-- <div class="btn-box">
               <fb:login-button
                scope="public_profile,email"
                onlogin="checkLoginState();"
              >{{$t('Login.FaceBookUse')}}</fb:login-button>
            </div> -->
          </div>
          <div class="clear"></div>
            <div class="login-register-tip">
         <a @click="onCancle()">
            <span class="member_new">{{$t('Login.NewUser')}} <i>?</i>&nbsp;</span>
            <span class="member_join_strong">{{$t('Login.RegNow')}}</span>
            </a>
          </div>
        </ElForm>
       </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Form as ElForm, Input as ElInput, Button as ElButton, FormItem } from 'element-ui';
import sdk from '@/sdk/InstoreSdk';
@Component({
  name: 'Login',
  components: {
    ElForm,
    ElInput,
    ElButton,
    FormItem
  }
})
export default class InsLogin extends Vue {
  targetUrl: string = '';
  username: string = '';
  password: string = '';
  remember: boolean = false;
  // created () {
  //   this.$Confirm('info', 'error');
  // }
  checkEmail (rule, value, callback) {
    const mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
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
  // validatePassword (rule, value, callback: Function) {
  //   if (value === '') {
  //     callback(new Error(this.$t('Login.LoginPwd')as string));
  //   } else if (this.ruleForm.password !== '123456') {
  //     callback(new Error(this.$t('Login.LoginoldPwd')as string));
  //   } else {
  //     callback();
  //   }
  // }
       private ruleForm = {
         username: '',
         password: ''
       }

       get rules () {
         return {
           username: [{ required: true, validator: this.checkEmail, trigger: 'blur' }],
           // password: [{ validator: this.validatePassword, trigger: 'blur' }]
           password: [
             { required: true, message: this.$t('Login.LoginPwd'), trigger: 'blur' }
           ]

         };
       }
       private submitForm (formName) {
         let _this = this;
         (this.$refs.ruleForm as ElForm).validate((valid) => {
           if (valid) {
             sdk.api.member.login(this.ruleForm.username, this.ruleForm.password, true).then(
               function (response) {
                 _this.$store.dispatch('doLogin');
                 _this.$emit('succeed');
                 _this.$LoginClose();
                 //  _this.$message({
                 //    message: '登陆成功！',
                 //    type: 'success'
                 //  });
               },
               function (response) {
                 _this.$message({
                   message: _this.$t('Register.RegisterTips') as string,
                   type: 'error'
                 });
               }
             );
             // if (this.ruleForm.username !== 'admin@qq.com' || this.ruleForm.password !== '123456') {
             //   // 只是为了做登录效果，所以账号密码写的固定的。
             //   this.$message.error(this.$t('Login.Loginerror')as string);
             //   return false;
             // } else {
             //   // 真正项目中登录成功之后，就可以用路由跳转页面
             //   this.$message({
             //     message: '登陆成功',
             //     type: 'success'
             //   });
             // }
           } else {
             // this.$message.error('登录失败');
             console.log('error submit!!');
             return false;
           }
         });
       }
       onCancle () {
         this.$emit('close');
         Vue.prototype.root.$router.push('/account/register');
       }
       onForgetPassword () {
         this.$emit('close');
         Vue.prototype.root.$router.push('/account/forgetPassword');
       }
}
</script>
<style lang="less">
#container{
  .el-form-item__content{
    text-align: right;
  }
  .el-form-item__error{
    left: 0%;
    position: relative;
    text-align:left;
  }
}
.btn-box .el-button span{
  font-size: 1.6rem;
}

</style>
<style lang="less" scoped>
#container{
  margin: 3rem 0;
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
  .el-input{
    width: 70%;
  }
  .devide{
    margin: 5rem 0;
  }
}
/*登录页面*/
#login-register-box {
  font-family: "Arial", "微软雅黑";
  width: 95%;
  margin: 0 auto;
  // margin-top: 60px;
}
.login_container {
    position: relative;
    -webkit-display: flex;
    -ms-display: flex;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
    z-index: 1;
}
.login_box {
    position: relative;
    -ms-flex: 0 0 auto;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    border: #eaedf5 solid 1px;
    background-color: #fff;
    text-align: center;
    font-size: 20px;
    letter-spacing: 1px;
    width: 100%;
}
.login-register-title {
    position: relative;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 3px;
    left: 3px;
    padding: 5rem 1rem;
    color: #8CC540;
}

.login-register-tip {
    display: flex;
    border-top: #eaedf5 solid 1px;
    margin-top: 20px;
}

.login-register-tip a {
    flex: 1 1 50%;
    display: block;
    padding: 18px 0;
    font-size: 13px;
    text-decoration: none;
    color: #666;
    text-align: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.member_join_strong {
    color: black;
    font-size: 16px;
    font-weight: bold;
}
.member_new{
  color:#8CC540;
}
.member_new i{
  font-style: normal;
  font-family:Arial, Helvetica, sans-serif;
}
.login-form {
 padding: 0 1rem 5rem;
}

.login-register-content .el-form-item.is-success .el-input__validateIcon {
    color: #67c23a;
}
.login-register-content .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #67c23a;
}

.login-register-content .form-group .input-text:focus {
  border-bottom: 1px solid #88bd43;
}

.login-register-handle .remember {
  float: left;
}

.remember input {
  margin: 0;
  vertical-align: middle;
}

.remember label {
  font-size: 13px;
  color: #808080;
  vertical-align: middle;
}

.forget {
  float: right;
  font-size: 13px;
  color: black;
  line-height: 17px;
}
.forget i{
  font-style: normal;
  font-family:Arial, Helvetica, sans-serif;
}

.btn-box {
  margin-top: 25px;
  width: 100%;
  display: inline-block;
}

.btn-box .el-button {
  appearance: none;
  -webkit-appearance: none;
  width: 30%;
  line-height: 3rem;
  border-radius: 3px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  padding: 0;
  cursor: pointer;
}

.btn-box .el-button--primary {
  background-color: #7accc8;
  border: 1px solid #7accc8;
  transition: all .2s;
}
.btn-box .el-button--primary:hover {
    background-color: #7accc8;
    border: 1px solid #7accc8;
}
.btn-box .fb-login-btn {
  background-color: #365899;
  border: 1px solid #365899;
}
</style>
