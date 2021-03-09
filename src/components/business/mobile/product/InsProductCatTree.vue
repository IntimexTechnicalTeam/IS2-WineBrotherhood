<template>
    <div class="productMenuTree" :class="{'noCheckbox': !showCheckbox}">
      <template v-if="ui === 'dropdown'">
        <InsSelectSearch :data="catalogs" :type="1" @changeSelect="changeSelectedAttr" :defaultCats="defaultSelected" :multiple="multiSelect" />
      </template>

      <template v-if="ui === 'tree'">
        <p class="Title" v-if="title">{{title}}</p>
        <Tree icon-class="el-icon-arrow-right" :default-expand-all="expandAll" :data="catalogs" node-key="Id" :show-checkbox="treeType === 1 ? false : showCheckbox" :props="props" @node-click="handleNodeClick" @check="changeCSelect" :check-strictly="!multiSelect" ref="tree"></Tree>
      </template>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Tree } from 'element-ui';
export interface attrItem {
  Id: number,
  Vals: number[]
}
@Component({
  components: {
    InsSelectSearch: () => import('@/components/base/mobile/InsSelectSearch.vue'),
    Tree
  }
})
export default class InsProductCatTree extends Vue {
    @Prop({ default: '' }) private title!: string;
    @Prop({ default: 0 }) private treeType!: number; // 树形控件类型区分（0->产品属性，1->菜单）
    @Prop({ default: true }) private multiSelect!: boolean; // 是否为多选
    @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择
    @Prop({ default: true }) private expandAll!: boolean; // 是否默认展开所有节点
    @Prop({ default: 'dropdown' }) private ui!: string;
    @Prop({ default: () => [] }) private defaultSelected!: attrItem[]; // 默认选中目录

    catalogs: object[] = []; // 产品目录数据
    selectedCats: number[] = [];

    props: object = {
      children: 'Children',
      label: 'Name'
    }

    // 获取产品目录列表
    getCatalogs () {
      this.$Api.product.getAttrList().then((result) => {
        this.catalogs = result;
        console.log(result, '获取产品目录列表');
      });
    }

    // 获取选中目录
    setCheckedKeys () {
      console.log(this.defaultSelected, '获取选中目录');
      (this.$refs.tree as any).setCheckedKeys(this.defaultSelected);
    }

    changeCSelect (key) {
      if (!this.multiSelect) {
        (this.$refs.tree as any).setCheckedKeys([key.Id]);
      }

      let a = (this.$refs.tree as any).getCheckedKeys();
      this.changeSelectedAttr(a);
    }

    handleNodeClick (data, Nodes, c) {
      console.log(data, Nodes, '选中node');

      if (!this.showCheckbox && Nodes.isLeaf) {
        this.changeSelectedAttr([data.Id]);
      }
    }

    // 搜寻attr改变
    changeSelectedAttr (item) {
      if (this.treeType === 0) {
        console.log(item, '搜寻目录改变(checkbox)');
        if (this.multiSelect) {
          this.$emit('changeSelect', item);
        } else {
          this.$emit('changeSelect', [item]);
        }
      } else {
        this.$router.push({ path: `/product/cat/${item}` });
        console.log(item, '搜寻目录改变(菜单)');
      }
    }

    mounted () {
      this.getCatalogs();

      if (this.defaultSelected.length) {
        if (this.ui === 'tree' && this.showCheckbox) {
          this.setCheckedKeys();
        }
      }
    }

    @Watch('defaultSelected', { deep: true })
    onDefaultSelectedChange (n, o) {
      console.log(n, o, 'DefaultSelectedChange');
      if (this.ui === 'tree' && this.showCheckbox) {
        this.setCheckedKeys();
      }
    }
}
</script>

<style lang="less">
.productMenuTree {
  .el-tree-node__children {
    > .el-tree-node {
      float: left;
    }
  }

  &.noCheckbox {
    .el-tree-node__children {
      .el-tree-node__content {
        // padding: 0 20px;
        // border: 1px solid #eee;
        // margin: 0 15px;

        .el-tree-node__expand-icon.is-leaf {
          display: none;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
.productMenuTree {
    border: 1px solid #eee;

    .Title {
        background: @primary_color;
        text-align: center;
        font-size: 18px;
        color: #fff;
        padding: 20px 10px;
    }
}
</style>
