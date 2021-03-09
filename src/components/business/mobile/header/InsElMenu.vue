<template>
    <el-menu :default-active="defaultActive ? MenuList[0] ? MenuList[0].Name : '' : ''" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :mode="mode" :background-color="backColor" :text-color="textColor" :active-text-color="activeTextColor"  :unique-opened="uniqueOpened">
      <!-- 递归子组件 -->
      <menuItem v-for="(item,index) in MenuList" :key="index" :item="item" :textColor="textColor" />
    </el-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// import { Menu } from 'element-ui';
@Component({
  components: {
    menuItem: () => import('@/components/base/mobile/InsMenuItem.vue')
    // Menu
  }
})
export default class InsElMenu extends Vue {
  @Prop({ default: 'vertical' }) private mode!: string; // 菜单模式（vertical：纵向；horizontal：横向）
  @Prop({ default: '#ffffff' }) private backColor!: string; // 菜单的背景色
  @Prop({ default: '#303133' }) private textColor!: string; // 菜单的文字颜色
  @Prop({ default: '#FFFFFF' }) private activeTextColor!: string; // 当前激活菜单的文字颜色
  @Prop({ default: false }) private defaultActive!: boolean; // 当前激活菜单的 index
  @Prop({ default: false }) private uniqueOpened!: boolean; // 是否只保持一个子菜单的展开
  @Prop({ default: 'header' }) private type!: string; // 菜单数据类型（头部/脚部）

  handleOpen (key, keyPath) {
  }
  handleClose (key, keyPath) {
  }

  get MenuList () {
    if (this.type === 'header') {
      return this.$store.state.headerMenus;
    } else {
      return this.$store.state.footerMenus;
    }
  }
}
</script>

<style scoped lang="less">
</style>
