<template>
  <div class="nav_menu">
    <component :navData="NavData" v-bind:is="CurrentNav"></component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    'navLayout': () => import('@/components/business/mobile/header/InsNavLayout.vue')
  }
})
export default class InsMenu extends Vue {
  @Prop({ default: 'header' }) private type!: string;
  @Prop({ default: 0 }) private layout!: number;
    CurrentNav: string = 'navLayout';

    get NavData () {
      if (this.type === 'header') {
        return this.$store.state.headerMenus;
      } else {
        return this.$store.state.footerMenus;
      }
    }

    created () {
      if (this.layout) {
        this.CurrentNav = this.CurrentNav + this.layout;
      }
    }
}
</script>
<style scoped lang="less">
</style>
