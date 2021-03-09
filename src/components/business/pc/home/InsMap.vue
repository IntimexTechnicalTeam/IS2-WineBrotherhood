<template>
  <div class="map-main">
    <iframe :src="src" width="100%" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
export default class InsMap extends Vue {
  src: string =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.524633715289!2d114.15097431550411!3d22.333810985306158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340400ad2b69d883%3A0x7c2d810e7fef31f0!2sIntimex+Business+Solutions+Co.%2C+Ltd.!5e0!3m2!1sen!2shk!4v1476954339617';
  mounted () {}
}
</script>

<style lang="less" scoped>
</style>
