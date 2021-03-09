<template>
  <div id="app">
    <div ref="layer" id="layer"></div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Layer from '@/components/service/InsLayer.vue';
import { FrontE } from '@/sdk/common/SysConst';
@Component({
  components: {
    Layer
  }
})
export default class App extends Vue {
  mounted() {
    Vue.prototype.$ShowLayer();
    setTimeout(() => {
      Vue.prototype.$HiddenLayer();
    }, 2000);
  }
  beforeUpdate() {
    if (this.$route.name !== 'home') {
      return;
    }
    if (this.$route.query.returnUrl) {
      let url = this.$route.query.returnUrl + '?';
      Object.keys(this.$route.query).forEach(e => {
        if (e !== 'returnUrl') url += e + '=' + this.$route.query[e] + '&';
      });
      this.$router.push(url);
    } else {
      this.$nextTick(() => {
        this.$Api.promotion.GetHomeSeoData().then(result => {
          document.title = result.Data.Title;
        });
      });
    }
  }
  beforeCreate() {
    if (
      ((Vue.prototype.userAgent === 'mobile' && FrontE.mobileBuilding) ||
        (Vue.prototype.userAgent === 'pc' && FrontE.pcBuilding)) &&
      this.$route.name !== 'building'
    ) {
      this.$router.push('/building');
    }
    if (!window['MemberApi']) window['MemberApi'] = this.$Api.member;
  }
}
</script>

<style lang="less">
@variable: red;
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-message {
  top: 5rem !important;
}
</style>
