<template>
    <div class="login_flow_layer" v-if="show">
        <div class="login_container pc_login_flow">
            <div class="login_title">
              <div class="close" @click="hidden">
                <i class="el-icon-circle-close"></i>
              </div>
            </div>
            <Login @succeed="rb" @close="hidden"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Login from '@/components/business/pc/login/InsLoginN.vue';
import Auth from '@/sdk/common/Auth';
@Component({ components: { Login } })
export default class InsLoginFlow extends Vue {
  private show:boolean = false;
  private rollback : Function | undefined = undefined;
  private params: [] = [];
  public hidden () {
    this.show = false;
    document.body.style.overflowY = 'auto';
  }
  public showL () {
    Auth.GetToken().then(() => {
      this.show = true;
      setTimeout(() => { window.scrollTo(0, 0); document.body.style.overflowY = 'hidden'; }, 50);
    });
  }
  public setRollback (rollback, params) {
    this.rollback = rollback;
    this.params = params;
  }
  rb () {
    if (this.rollback instanceof Function) this.rollback(...this.params); this.hidden();
  }
}
</script>
<style lang="less">
.login_flow_layer .el-icon-circle-close{
  font-size: 24px;
}
@media screen and (max-width: 1280px){
  .pc_login_flow{
      background-color: aliceblue;
      max-width: 100%;
      min-width: 400px;
      .login-register-title{
        display: none;
      }
      .login-form{
        padding: 24px 12px;
      }
  }
}
@media screen and (min-width: 1280px){
  .pc_login_flow{
      background-color: aliceblue;
      max-width: 100%;
      min-width: 500px;
      padding-bottom: 15px;
      .login-register-title{
        display: block;
        padding: 48px 12px;
      }
      .login-form{
        padding: 12px 60px;
      }
  }
}
@media screen and (min-width: 1600px){
  .login_container{
      background-color: aliceblue;
      max-width: 100%;
      min-width: 550px;
      .login-register-title{
        display: block;
        padding: 48px 12px;
      }
      .login-form{
        padding: 12px 60px;
      }
      .login-register-tip{
        display: block;
      }
  }
}
</style>
<style lang="less" scoped>
.login_flow_layer{
  z-index: 99999;
  min-height: 100vh;
  width: 100vw;
  min-width: 1200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  .login_container{
      background-color: aliceblue;
      max-width: 100%;
      // min-width: 50%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .login_title{
          position: relative;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 3px;
          right: 3px;
          padding: 18px 10px;
          color: #000;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
          float: right;
          z-index: 99;
          cursor: pointer;
      }
  }
}
</style>
