<template>
  <div class="default">
   <div class="FormMain">
        <!-- 可以设置横版和竖版,横版类名.to_transverse,竖版类名.to_vertical -->
        <div v-html="content" class="to_vertical" id="content"></div>
        <div id="preview"></div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    PkcmsBanner: () => import('@/components/hkTasteBusiness/pc/cms/PkcmsBanner.vue')
  }
})
export default class HkContact extends Vue {
        content:any='';
        IsPay:boolean= false;
        IsLogin:boolean=false;
        IsMobile:boolean=false;
        getForm () {
          this.$Api.regAndPay.getHtml('ContactUs', this.currentlang, this.IsMobile).then(result => {
            this.content = result.HtmlString;
            this.IsPay = result.IsPay;
            this.IsLogin = result.IsLogin;
            console.log(result, 'resultresultresultresultresultresult');
          });
        }
        get currentlang () {
          return this.$Storage.get('locale');
        }
        beforeMount () {

        }
        created () {
          this.getForm();
        }
        mounted () {
          window['regAndPay'] = this.$Api.regAndPay;
          window['router'] = this.$router;
          window['wid'] = this.$route.params.id;
          // eslint-disable-next-line no-unused-expressions
          window['save'];
          // eslint-disable-next-line no-unused-expressions
          window['checkForm'];
          // eslint-disable-next-line no-unused-expressions
          window['preview'];
          // eslint-disable-next-line no-unused-expressions
        }
}
</script>
<style scoped lang="less">
@import '../../../../assets/css/regnpay_m.less';
.Banner {
  width: 100%;
  height:500px;
}
.Banner img {
  width: 100%;
  height:500px;
}
</style>
