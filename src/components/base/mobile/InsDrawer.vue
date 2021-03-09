<template>
    <transition name="faded">
        <div class="drawer_warpper"  v-show="show">
            <slot name="header"></slot>
            <slot></slot>
            <slot name="footer"></slot>
            <div style="opacity:0;">{{drawerChange}}</div>
        </div>
    </transition>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class InsDrawer extends Vue {
    @Prop() private show!:boolean;
    @Prop() private drawerChange!:boolean;
    @Watch('show')
    onShowChange () {
      if (this.show === true) { setTimeout(() => { document.body.style.overflowY = 'hidden'; }, 50); } else document.body.style.overflowY = 'auto';
    }
}
</script>
<style lang="less" scoped>
.drawer_warpper{
    position: fixed;
    top: 0;
    width: 90vw;
    height: 100vh;
    right: 0;
    overflow-y: scroll;
    background-color: white;
    z-index: 9999;
}
.faded-enter-active,
.faded-leave-active {
  transition: transform .5s;
}
.faded-leave-to,.faded-enter /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
// height: 0;
}
// .fade-leave-to{

// }
</style>
