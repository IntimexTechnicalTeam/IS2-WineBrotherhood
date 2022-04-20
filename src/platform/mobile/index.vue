<template>
  <div class="main_warpper">
    <ins-header v-show="routerPath!=='/building'"/>
    <router-view></router-view>
    <ins-footer v-show="routerPath!=='/building'" />
    <ins-sidebar />
    <ins-slide-menu :direction="'right'">
      <ins-menu-layout />
    </ins-slide-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '../../rem';
import Cookie from 'js-cookie';
@Component({
  components: {
    InsHeader: () => import('@/components/business/mobile/header/InsHeader.vue'),
    InsFooter: () => import('@/components/business/mobile/footer/InsFooter.vue'),
    InsSlideMenu: () => import('@/components/business/mobile/header/InsSlideMenu.vue'),
    InsMenuLayout: () => import('@/components/hkTasteBusiness/mobile/header/InsMenuLayout.vue'),
    InsSidebar: () => import('@/components/business/pc/header/InsSidebar.vue')
  }
})
export default class mobileIndex extends Vue {
  created () {
    Vue.prototype.vw = window.innerWidth;
    this.changLange(this.$Storage.get('locale') || 'E');
  }
  mounted () {
  }
  get routerPath() {
    return this.$route.path;
  }
  private changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      this.$Storage.set('locale', lang);
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>
<style lang="less" scoped>
.main_warpper{
  background:#FFF;
}
</style>
