<template>
  <transition name="slide-fade">
    <div class="FixedHeader" v-show="showFixed">
        <DefaultHeader v-if="!$slots.default" />
        <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    DefaultHeader: () => import('@/components/business/mobile/header/layout/DefaultHeader.vue')
  }
})
export default class FixedHeader extends Vue {
  private showFixed: boolean = false;

  created () {
    // 添加滾動判斷顯示
    addEventListener('scroll', () => {
      var _this = this;

      let headerHeight = (document.getElementById('headerTop') as HTMLElement).clientHeight;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

      if (scrollTop >= headerHeight) {
        this.showFixed = true;
        this.$store.dispatch('setShowFixedHeader', true);
      } else {
        this.showFixed = false;
        this.$store.dispatch('setShowFixedHeader', false);
      }
    }, false);
  }
}
</script>

<style scoped lang="less">
.FixedHeader {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  box-shadow: 0 0 10px 0 #d4d5d1;
  background-color: #8B0B04;
  /deep/.header-box .flex-box {
    height: 5rem;
    .logo img{
      width: 4rem;
    }
    .top-window{
      top: 5rem;
    }
    .window-top{
      top: 2.5rem;
    }
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-100%);
}
</style>
