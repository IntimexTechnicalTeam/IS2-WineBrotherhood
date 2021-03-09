<template>
  <div class="map-main" style="text-align: center;">
    <img src="/static/Image/home/map.jpg" />
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkMap extends Vue {}
</script>

<style scoped lang="less">
.map-main {
  width: 100%;
  margin: 0 auto;
  display: flex;
}
.map-main img {
  width: 100%;
}
</style>
