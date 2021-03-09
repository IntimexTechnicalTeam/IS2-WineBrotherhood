<template>
    <div class="InsAdvancedSearch" :class="{'column': direction === 'column'}" :style="{ width: direction === 'column' ? width : '100%' }">
      <ins-product-attrs-tree title="产品属性" :direction="direction" @changeSelect="getSelectedAttrs" :showCheckbox="true" :expandAll="true" />
      <ins-product-cat-tree title="产品目录" :direction="direction" @changeSelect="getSelectedCatalogs" :showCheckbox="true" :expandAll="true" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    InsProductAttrsTree: () => import('@/components/business/pc/product/InsProductAttrsTree.vue'),
    InsProductCatTree: () => import('@/components/business/pc/product/InsProductCatTree.vue')
  }
})
export default class InsAdvancedSearch extends Vue {
  @Prop({ default: '20%' }) private width!: string;
  @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择

  direction: string = 'row'; // 高级搜索组件方向  column/row

  selectedAttrs: object[] = []; // 选中的产品属性值
  selectedCatalogs: number[] = []; // 选中的产品目录值

  getSelectedAttrs (val, flag) {
    console.log(val, flag, 'getSelectedAttrs');
    this.selectedAttrs = val;
    if (!flag) {
      // this.$router.push({ path: '/product/search', query: { attrs: JSON.stringify(val), catalogs: JSON.stringify(this.selectedCatalogs), type: 1 } });
      this.$router.push(`${this.$route.path}?attrs=${JSON.stringify(val)}&catalogs=${JSON.stringify(this.selectedCatalogs)}&type=1`);
    }
    this.$emit('changeAttrs', val);
  }

  getSelectedCatalogs (val) {
    console.log(val, 'getSelectedCatalogs');
    this.selectedCatalogs = val;
    // this.$router.push({ path: '/product/search', query: { attrs: JSON.stringify(this.selectedAttrs), catalogs: JSON.stringify(val), type: 1 } });
    this.$router.push(`${this.$route.path}?attrs=${JSON.stringify(this.selectedAttrs)}&catalogs=${JSON.stringify(val)}&type=1`);
    this.$emit('changeCatalogs', val);
  }
}
</script>
<style scoped lang="less">
.InsAdvancedSearch {
  &.column {
    float: left;
  }
}
</style>
