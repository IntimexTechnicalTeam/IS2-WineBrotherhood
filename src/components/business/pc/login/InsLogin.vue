<template>
  <div id="container">
    <!--main-content-->
    <div class="login_logo">
      <img src="/static/Image/login/LOGIN.PNG">
    </div>
    <div>
      <div id="login-register-box" class="login_container">
       <div class="login_box">
        <div class="login-register-top">
          <div class="login-register-title">
            {{$t('Login.LoginTitle')}}
          </div>

          <div class="clear"></div>
        </div>
        <ElForm  class="login-form" :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <div class="login-register-content">
            <!-- <p id="loginFailMsg"></p> -->

              <FormItem :label="$t('Register.UserEmail')" prop="username">
                <ElInput
                 v-model="ruleForm.username"
                 prefix-icon="el-icon-message"
                 autocomplete="off"
                 :placeholder="$t('Register.UserEmail')"
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
                ></ElInput>
              </FormItem>

          </div>

          <div class="login-register-handle">
            <div class="remember">
            </div>
            <a class="forget" @click="onForgetPassword">{{$t('Login.ForgetPwd')}}</a>
            <div class="clear"></div>
            <div class="btn-box">
              <Button type="primary" @click="submitForm('ruleForm')" >{{$t('Login.LoginTitle')}}</Button>

            </div>
          </div>
          <div class="clear"></div>
            <div class="login-register-tip">
           <a @click="onCancle">
            <span class="member_new">{{$t('Login.NewUser')}} ?&nbsp;</span>
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
import { Form as ElForm, Input as ElInput, FormItem, Button } from 'element-ui';
@Component({ components: { ElForm, ElInput, FormItem, Button } })
export default class InsLogin extends Vue {
  targetUrl: string = '';
  username: string = '';
  password: string = '';
  remember: boolean = false;
  UPError: boolean = false;
  @Prop() private rollback!:Function;
  checkEmail (rule, value, callback) {
    const mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (this.UPError) {
      callback(new Error(this.$t('Login.Loginerror')as string));
    }
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
   private ruleForm = {
     username: '',
     password: ''
   }
   get rules () {
     return {
       username: [{ required: true, validator: this.checkEmail, trigger: 'blur' }],
       password: [
         { required: true, message: this.$t('Login.LoginPwd'), trigger: 'blur' }
       ]

     };
   }
   private submitForm (formName) {
     let _this = this;
     (this.$refs.ruleForm as ElForm).validate((valid) => {
       if (valid) {
         this.$Api.member.login(this.ruleForm.username, this.ruleForm.password, true).then(
           function (response) {
             _this.$store.dispatch('doLogin');
             _this.$emit('succeed');
             _this.$LoginClose();
             //  if (_this.$route.query && _this.$route.query.returnurl) { _this.$router.push(_this.$route.query.returnurl as string); } else { _this.$router.push('/account/memberInfo'); }
           },
           function (response) {
             //  _this.$message({
             //    message: response.Message,
             //    type: 'error'
             //  });
             _this.UPError = true;
             (_this.$refs.ruleForm as ElForm).validate(() => { _this.UPError = false; });
           }
         );
       } else {
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
// #login-register-box {
//   font-family: "Arial", "微软雅黑";
//   width: 95%;
//   margin: 0 auto;
//   // margin-top: 60px;
// }
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
    box-sizing: border-box;
}
.login-register-title {
    position: relative;
    font-size: 18px;
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
  background-color: #8CC540;
  border: 1px solid #8CC540;
  transition: all .2s;
}
.btn-box .el-button--primary:hover {
    background-color: #8dc11f;
    border: 1px solid #8dc11f;
}
.btn-box .fb-login-btn {
  background-color: #365899;
  border: 1px solid #365899;
}
</style>
