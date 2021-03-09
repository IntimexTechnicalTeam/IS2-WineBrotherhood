<template>
  <div id="footer">
    <!-- <footerLayout1 /> -->
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    footerLayout1: () => import('@/components/hkTasteBusiness/mobile/footer/InsFooterLayout1.vue')
  }
})
export default class InsFooter extends Vue {
  layout: string = 'footerLayout1';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
