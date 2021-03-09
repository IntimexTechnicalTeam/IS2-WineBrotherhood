<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    Header: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/header/InsHeader.vue'),
    Footer: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/footer/InsFooter.vue'),
    Sidebar: () => import(/* webpackChunkName: "main" */ '@/components/business/pc/header/InsSidebar.vue')
  }
})
export default class pcIndex extends Vue {
  mounted () {
  }
}
</script>

<style lang="less" scoped>
</style>
