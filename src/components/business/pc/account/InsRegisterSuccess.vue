<template>
<div id="container">
 <div class="userContent">
  <div class="eidt-success">
   <div class="show-success">
    <i class="el-icon-check"></i>&nbsp;&nbsp;<span>{{$t('Register.RegisterWelcome')}}</span>
   </div>
   <div class="click-login">
    <a href="#" @click="handleCommand()">{{$t('Login.doLogin')}}</a>
   </div>
  </div>
 </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsRegisterSuccess extends Vue {
  handleCommand () {
    this.$router.push('/account/login');
  }
  created () {
    this.$HiddenLayer();
  }
};

</script>
<style lang="less" scoped>
.crumbs {
margin-bottom: 0;
}
.crumbs-register {
background-color: #324157;
height: 50px;
line-height: 50px;
}
.register-title {
line-height: 50px;
margin: 0 auto;
width: 100px;
font-size: 16px;
}
.userContent {
width: 100%;
margin: 0 auto;
background-size: cover;
height: 500px;
}
.select-sex {
width: 320px;
}
.eidt-success {
width: 1120px;
margin: 0 auto;
position: relative;
PADDING: 80PX;
}
.eidt-success .show-success {
TEXT-ALIGN: CENTER;
}
.eidt-success .show-success i{
  font-size: 80px;
  display: block;
}
.click-login {
TEXT-ALIGN: CENTER;
    PADDING-TOP: 30PX;
}
.click-login a {
background: #000;
    padding: 10px 20px;
    color: #fff;
}
.eidt-success i {
color: #67C23A;
}
.eidt-success i,.eidt-success span {
font-size: 30px;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    font-weight: 400;
    color: #FFF;
    cursor: text;
}
</style>
