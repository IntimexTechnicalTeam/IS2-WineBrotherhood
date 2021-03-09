<template>
    <div>
        <div class="drawer-bg" v-if="showMenu" @click="handleClickOutside"/>

        <div class="sidebar-container" :class="{'hiddenMenu': !showMenu,'left': direction == 'left','top': direction == 'top', 'right': direction == 'right'}">
            <Scrollbar wrap-class="scrollbar-wrapper">
                <slot />
            </Scrollbar>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Scrollbar from 'element-ui/lib/scrollbar';
@Component
export default class InsSlideMenu extends Vue {
  @Prop({ default: 'left' }) private direction !: string;

  get showMenu () {
    return this.$store.state.isShowMenu;
  }

  handleClickOutside () {
    this.$store.dispatch('isShowMenu', false);
  }
}
</script>
<style scoped lang="less">
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  -webkit-transition: -webkit-transform .28s;
  transition: -webkit-transform .28s;
  transition: transform .28s;
  transition: transform .28s,-webkit-transform .28s;
  // width: 100%;
  position: fixed;
  background-color: #8fc21e;
  z-index: 1000;

  &.left {
    top: 0;
    left: 0;
    height: 100%;
    width: 55%;

    &.hiddenMenu {
        transform: translate3d(-100%, 0, 0);
    }
  }

  &.top {
    top: 0;
    height: auto;
    width: 100%;
    &.hiddenMenu {
        transform: translate3d(0, -100%, 0);
    }
  }

  &.right {
    top: 0;
    right: 0;
    height: 100%;
    width: 55%;
    z-index: 999999;
    &.hiddenMenu {
        transform: translate3d(100%, 0, 0);
    }
  }
}

.hiddenMenu {
  pointer-events: none;
  transition-duration: 0.3s;
}

.el-drawer__title {
    display: none;
}

span {
    padding: 20px;
}
</style>
