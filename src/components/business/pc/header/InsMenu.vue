<template>
  <div class="header_menu">
    <component :navData="NavData" v-bind:is="CurrentNav"></component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import api from '@/sdk/api/api';
@Component({
  components: {
    'navLayout1': () => import('@/components/business/pc/header/InsNavLayout1.vue'), // 非遞歸組件
    'navLayout2': () => import('@/components/business/pc/header/InsNavLayout2.vue') // 遞歸組件
  }
})
export default class InsMenu extends Vue {
  @Prop({ default: 'header' }) private type!: string;
    CurrentNav: string = 'navLayout2';

    get NavData () {
      if (this.type === 'header') {
        return this.$store.state.headerMenus;
      } else {
        return this.$store.state.footerMenus;
      }
    }

    mounted () {
      var _this = this;
      // api
      //   .getMenuData(2)
      //   .then((res: any) => {
      //     this.NavData = res.data.requestDetail;
      //     this.$store.dispatch('setMenuData', this.NavData);
      //     console.log(res, '请求返回数据');
      //   })
      //   .catch((err: any) => {
      //   // 请求失败后的处理函数
      //     console.log(err);
      //   });

      // this.$store.dispatch('setMenuData', this.NavData);
    }
}
</script>
<style scoped lang="less">
</style>
