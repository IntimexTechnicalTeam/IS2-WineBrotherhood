<template>
    <div class="InsAdvancedSearch">
      <!-- <ins-product-attrs-tree title="产品属性" :direction="direction" @changeSelect="getSelectedAttrs" :showCheckbox="true" :expandAll="true" />
      <ins-product-menu-tree title="产品目录" :direction="direction" @changeSelect="getSelectedCatalogs" :showCheckbox="true" :expandAll="true" /> -->

      <InsProductAttrsTree ui="tree" :showCheckbox="true" @changeSelect="getSelectedAttrs" :defaultSelected="defaultAttrs" />
      <InsProductCatTree ui="tree" :showCheckbox="true" @changeSelect="getSelectedCatalogs" :defaultSelected="defaultCatalogs" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    InsProductAttrsTree: () => import('@/components/business/mobile/product/InsProductAttrsTree.vue'),
    InsProductCatTree: () => import('@/components/business/mobile/product/InsProductCatTree.vue')
  }
})
export default class InsAdvancedSearch extends Vue {
  @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择

  selectedAttrs: object[] = []; // 选中的产品属性值
  selectedCatalogs: number[] = []; // 选中的产品目录值

  // 选中的产品属性值对象数组
  defaultAttrs: object[] = [];

  // 选中的产品目录数组
  defaultCatalogs: object[] = [];

  get routerType () {
    return JSON.parse(this.$route.query.type as string || '0');
  }

  getSelectedAttrs (val, flag) {
    console.log('getSelectedAttrs');
    this.selectedAttrs = val;
    this.$router.push(`${this.$route.path}?attrs=${JSON.stringify(val)}&catalogs=${JSON.stringify(this.selectedCatalogs)}&type=1`);
    this.$emit('advancedChange', this.selectedAttrs, this.selectedCatalogs);
  }

  getSelectedCatalogs (val) {
    console.log('getSelectedCatalogs');
    this.selectedCatalogs = val;
    this.$router.push(`${this.$route.path}?attrs=${JSON.stringify(this.selectedAttrs)}&catalogs=${JSON.stringify(val)}&type=1`);
    this.$emit('advancedChange', this.selectedAttrs, this.selectedCatalogs);
  }

  mounted () {
    console.log(this.defaultAttrs, this.defaultCatalogs, 'this.defaultAttrs this.defaultCatalogs');
    this.$emit('advancedChange', this.defaultAttrs, this.defaultCatalogs);
  }

  created () {
    this.defaultAttrs = JSON.parse(this.$route.query.attrs as string || '[]');
    this.selectedAttrs = JSON.parse(JSON.stringify(this.defaultAttrs));
    this.defaultCatalogs = JSON.parse(this.$route.query.catalogs as string || '[]');
    this.selectedCatalogs = JSON.parse(JSON.stringify(this.defaultCatalogs));
  }

  @Watch('$route', { deep: true })
  onRouteChange (n, o) {
    if (!this.routerType) {
      console.log('this.$route.query.attrs && !this.routerType');
      this.defaultAttrs = JSON.parse(this.$route.query.attrs as string || '[]');
      this.selectedAttrs = JSON.parse(JSON.stringify(this.defaultAttrs));
      this.defaultCatalogs = [];
      this.selectedCatalogs = JSON.parse(JSON.stringify(this.defaultCatalogs));
      this.$emit('advancedChange', this.defaultAttrs, this.defaultCatalogs);
    }
  }
}
</script>
<style scoped lang="less">

</style>
