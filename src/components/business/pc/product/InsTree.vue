<template>
  <Tree icon-class="el-icon-arrow-right" :default-expand-all="expandAll" :data="data" :node-key="nodeKey" :show-checkbox="showCheckbox" :props="props" @node-click="handleNodeClick" @check-change="handleCheckChange" @check="check" :check-strictly="!multiSelect" ref="tree"></Tree>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Tree } from 'element-ui';
@Component({ components: { Tree } })
export default class InsTree extends Vue {
    @Prop({ default: '' }) private title!: string;
    @Prop({ default: () => [] }) private data!: object[];
    @Prop({ default: false }) private expandAll!: boolean; // 是否默认展开所有节点
    @Prop({ default: () => [] }) private checkedKeys!: any[]; // 设置选中的节点
    @Prop({ default: () => ({ children: 'AttrValues', label: 'Name' }) }) private props!: object; // 设置树形控件的父子节点的属性值
    @Prop({ default: 0 }) private type!: number; // 树形控件类型区分（1->产品属性，2->cms菜单）
    @Prop({ default: 'Id' }) private nodeKey!: string; // 每个树节点用来作为唯一标识的属性
    @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择
    @Prop({ default: true }) private multiSelect!: boolean; // 是否为多选

    handleNodeClick (data, node) {
      console.log(node, data, '选中node');
      if (!this.showCheckbox) {
        switch (this.type) {
          case 2:
            this.$emit('changeSelectedAttr', data);
            break;
          default:
            this.$emit('changeSelectedAttr', data.Id);
        }
      }
    }

    handleCheckChange () {
      switch (this.type) {
        case 0:
          let a = (this.$refs.tree as any).getCheckedNodes(true);
          // console.log(a, 'getCheckedNodes');
          this.$emit('changeSelectedAttr', a);
          break;
        case 1:
          let b = (this.$refs.tree as any).getCheckedKeys();
          this.$emit('changeSelectedAttr', b);
          break;
      }
    }

    check (key) {
      if (!this.multiSelect) {
        (this.$refs.tree as any).setCheckedKeys([key.Id]);
      }

      switch (this.type) {
        case 1:
          let a = (this.$refs.tree as any).getCheckedNodes(true);
          // console.log(a, 'getCheckedNodes');
          this.$emit('changeSelectedAttr', a);
          break;
        default:
          let b = (this.$refs.tree as any).getCheckedKeys();
          this.$emit('changeSelectedAttr', b);
      }
    }

    setCheckedKeys () {
      (this.$refs.tree as any).setCheckedKeys(this.checkedKeys);
    }

    @Watch('checkedKeys')
    onCheckedkeys () {
      this.setCheckedKeys();
    }

    mounted () {
      this.setCheckedKeys();
    }
}
</script>
<style scoped lang="less">

</style>
