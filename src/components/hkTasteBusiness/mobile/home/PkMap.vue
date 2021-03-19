<template>
  <div class="map-main" style="text-align: center;">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1270224106615!2d114.22059961541552!3d22.311035348142088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34040145f33a1b97%3A0x6a2ae24ebcb1bda7!2sCOS%20Centre!5e0!3m2!1szh-CN!2shk!4v1615433381090!5m2!1szh-CN!2shk" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
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
  margin-bottom: 3rem;
}
.map-main img {
  width: 100%;
}
</style>
