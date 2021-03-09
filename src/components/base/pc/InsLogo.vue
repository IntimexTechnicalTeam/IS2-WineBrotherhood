<template>
  <div class="logo">
    <router-link to="/">
      <img src="@/assets/Images/forweb/logo.png" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLogo extends Vue {
  // @Prop({ default: '' }) private src!: string;
}
</script>
<style scoped lang="less">
.logo {
  img{
    max-width: 100%;
  }
}
</style>
