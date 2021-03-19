<template>
    <div>
        <div class="drawer-bg" v-show="showMenu" @click="handleClickOutside"/>

        <div class="sidebar-container" :class="{'hiddenMenu': !showMenu,'left': direction == 'left','top': direction == 'top', 'right': direction == 'right'}" :style="{width: width, height: height}">

            <el-scrollbar wrap-class="scrollbar-wrapper">
                <slot />

            </el-scrollbar>

        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class InsSlideMenu extends Vue {
  // @Prop({ default: 'left' }) private direction !: string;
  private direction: string = ''; // 菜單滑出方向: 'top', 'left', 'right'
  private width: string = ''; // 菜單寬度：'top'默認'100%'，僅在position值非'top'的情況生效
  private height: string = ''; // 菜單最大高度：僅在position值'top'的情況生效，其餘值默認'100%'
  private Embedded: boolean = this.FrontE.slideMenu.Embedded || false; // 菜單是否內嵌 => 默認值 false ，僅在position值為非'top'的情況生效

  // 是否處於顯示固定頭部狀態
  get showFixedHeader () {
    return this.$store.state.showFixedHeader;
  }

  // 是否顯示滑動側欄菜單
  get showMenu () {
    return this.$store.state.isShowMenu;
  }

  handleClickOutside () {
    this.$store.dispatch('isShowMenu', false);
  }

  created () {
    // 設置菜單參數值
    this.direction = this.FrontE.slideMenu.direction || 'top';
    this.width = this.direction !== 'top' && this.FrontE.slideMenu.width ? this.FrontE.slideMenu.width : '100%';
    if (!this.Embedded) {
      this.height = this.direction === 'top' && this.FrontE.slideMenu.height ? this.FrontE.slideMenu.height : '100%';
    } else {
      // console.log((document.getElementById('header') as HTMLElement).clientHeight, '頭部高度id');
      // console.log((document.querySelector('.header-box') as HTMLElement).clientHeight, '頭部高度querySelector');

      // let top = (document.getElementById('header') as HTMLElement).clientHeight;
      // let bodyHeight = document.body.clientHeight;

      // this.height = (bodyHeight - top) + 'px';
    }
  }

  mounted () {

  }

  @Watch('showMenu', { deep: true })
  onShowMenu (val) {
    if (val) {
      document.body.style.overflow = 'hidden';

      if (this.Embedded) {
        let top = 0;
        if (!this.showFixedHeader) {
          top = (document.getElementById('header') as HTMLElement).clientHeight;
        } else {
          top = (document.querySelector('.FixedHeader') as HTMLElement).clientHeight;
        }

        let bodyHeight = document.documentElement.clientHeight;

        console.log(bodyHeight, 'bodyHeight', top, 'top');

        this.height = (bodyHeight - top) + 'px';
        (document.querySelector('.sidebar-container') as HTMLElement).style.top = top + 'px';
        (document.querySelector('.drawer-bg') as HTMLElement).style.height = (bodyHeight - top) + 'px';
        (document.querySelector('.drawer-bg') as HTMLElement).style.top = top + 'px';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
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
  position: fixed;
  z-index: 999;
}

.sidebar-container {
  -webkit-transition: -webkit-transform .28s;
  transition: -webkit-transform .28s;
  transition: transform .28s;
  transition: transform .28s,-webkit-transform .28s;
  position: fixed;
  background-color: #fff;
  z-index: 1000;

  &.left {
    top: 0;
    left: 0;

    &.hiddenMenu {
      transform: translate3d(-100%, 0, 0);
    }
  }

  &.top {
    top: 0;

    &.hiddenMenu {
        transform: translate3d(0, -100%, 0);
    }
  }

  &.right {
    top: 0 !important;
    right: 0;
    height: 100% !important;
    z-index: 10000;

    &.hiddenMenu {
        transform: translate3d(100%, 0, 0);
    }
  }

  .el-scrollbar {
    height: 100%;
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
