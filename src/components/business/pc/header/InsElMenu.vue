<template>
    <Menu :default-active="defaultActive ? MenuList[0].Name : ''" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :mode="mode" :background-color="backColor" :text-color="textColor" :active-text-color="activeTextColor" :unique-opened="uniqueOpened">
      <!-- <menuItem v-for="item in MenuList" :key="item.id" :item = "item" /> -->

      <!-- 递归子组件 -->
      <template v-for="(item,index) in MenuList">
        <Submenu :index="item.Name" v-if="item.Childs && item.Childs.length" :key="index">
          <template slot="title">
              <span>{{item.Name}}</span>
          </template>
          <menu-item v-for="(child,index2) in item.Childs" :key="index2" :item="child" />
        </Submenu>

        <ElMenuItem :index="item.Name" v-else :key="index">
            <router-link :to="item.Type === 0 ? item.Url : item.Type === 1 ? '/cms/catDetail/' + item.Value.Id : item.Type === 2 ? '/CMS/content/' + item.Value.Id : item.Type === 3 ? '/RegNPay/Form/' + item.Value.Id : item.Type === 4 ? '/product/cat/' + item.Value.Id : item.Type === 5 ? '/product/search/-' : '/product/search/-'" slot="title">
                {{item.Name}} (无子集)
            </router-link>
        </ElMenuItem>
      </template>
    </Menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MenuItem as ElMenuItem, Submenu, Menu } from 'element-ui';
@Component({
  components: {
    menuItem: () => import('@/components/base/pc/InsMenuItem.vue'),
    ElMenuItem,
    Submenu,
    Menu
  }
})
export default class InsElMenu extends Vue {
  @Prop({ default: 'vertical' }) private mode!: string; // 菜单模式（vertical：纵向；horizontal：横向）
  @Prop({ default: '#ffffff' }) private backColor!: string; // 菜单的背景色
  @Prop({ default: '#303133' }) private textColor!: string; // 菜单的文字颜色
  @Prop({ default: '#409EFF' }) private activeTextColor!: string; // 当前激活菜单的文字颜色
  @Prop({ default: false }) private defaultActive!: boolean; // 当前激活菜单的 index
  @Prop({ default: false }) private uniqueOpened!: boolean; // 是否只保持一个子菜单的展开
  @Prop({ default: 'header' }) private type!: string; // 菜单数据类型（头部/脚部）

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
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
