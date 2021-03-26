<template>
  <div id="Header" :class="{Headertop:$route.path == '/'}">
    <!-- <footerLayout1 /> -->
    <component :is="layout" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    headerLayout1: () => import('@/components/hkTasteBusiness/pc/header/InsHeaderLayout1.vue')
  }
})
export default class InsHeader extends Vue {
  layout: string = 'headerLayout1';
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#Header{
  z-index: 10;
  width: 100%;
}
.Headertop{
  min-height: 270px;
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  background-image: linear-gradient(rgba(138, 12, 7, 0.8), rgba(255, 255, 255, 0));
}
</style>
