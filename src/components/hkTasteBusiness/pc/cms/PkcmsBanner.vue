<template>
  <div class="Banner">
    <img :src="imgList"  v-show="this.imgList.length>32"/>
    <img src="/static/Image/home/page01.jpg"  v-show="this.imgList.length<=32"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkcmsBanner extends Vue {
  @Prop() private readonly imgList!: string[];
}
</script>

<style scoped lang="less">
.Banner {
  width: 100%;
  height:500px;
}
.Banner img {
  width: 100%;
  height:500px;
}
</style>
