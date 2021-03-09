<template>
    <div class="login_flow_layer" v-if="show">
        <div class="login_container moblie">
            <div class="login_title">
               <div class="close" @click="hidden">
                <i class="el-icon-circle-close"></i>
              </div>
              <!-- <span @click="hidden">X</span> -->
              </div>
            <Login @succeed="rb" @close="hidden"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Login from '@/components/business/mobile/login/InsLoginN.vue';
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
.moblie .close{
  float: right;
  .el-icon-circle-close{
  font-size: 3rem;
 }
}
</style>
<style lang="less" scoped>
.login_flow_layer{
  z-index: 100000;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  .login_container{
      background-color: aliceblue;
      height: 100%;
      width: 100%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .login_title{
          position: absolute;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 3px;
          right: 10px;
          color: #000;
          z-index: 999;
          top: 30px;
        span { font-size: 18px;
        font-weight: 700;}
      }
  }
}
</style>
