<template>
<router-link to="/" class="logo">
  <img src="/images/mobile/logo.png" />
</router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLogo extends Vue {

}
</script>
<style scoped lang="less">
.logo {
  img {
    width: 4rem;
  }
}
</style>
