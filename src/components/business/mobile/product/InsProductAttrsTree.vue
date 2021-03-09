<template>
  <div class="productAttrsTree" :class="{'noCheckbox': !showCheckbox}">
    <template v-if="ui === 'dropdown'">
      <InsSelectSearch v-for="(attr,index) in attrData" :key="index" :data="attr" @changeSelect="changeOSelect" :defaultAttrs="defaultSelected" :multiple="multiSelect" />
    </template>

    <template v-if="ui === 'tree'">
      <!-- <p class="Title" v-if="title">{{title}}</p> -->
      <Tree icon-class="el-icon-arrow-right" :default-expand-all="expandAll" :data="attrData" node-key="keyValue" :show-checkbox="showCheckbox" :props="props" @check="changeCSelect" @node-click="handleNodeClick" :check-strictly="!multiSelect" ref="tree"></Tree>
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
export default class InsPoductAttrsTree extends Vue {
    @Prop({ default: '' }) private title!: string; // 标题
    @Prop({ default: true }) private expandAll!: boolean; // 是否默认展开所有节点
    @Prop({ default: true }) private multiSelect!: boolean; // 是否为多选
    @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择
    @Prop({ default: 'dropdown' }) private ui!: string;
    @Prop({ default: () => [] }) private defaultSelected!: attrItem[];

    attrData: object[] = []; // 产品属性数据
    checkedKeys: any[] = []; // 设置选中的节点
    selectedAttr: attrItem[] = []; // 选中的产品属性数组
    // 设置树形控件节点对象属性值
    props: object = {
      children: 'AttrValues',
      label: 'Name'
    };

    // 选择改变（下拉框）
    changeOSelect (item) {
      console.log(item, 'changeSelect');
      let flag = 0;
      this.selectedAttr.forEach((element, index) => {
        console.log(element, index, 'element,index,');
        if (element.Id === item.Id) {
          if (item.Vals.length) {
            element.Vals = item.Vals;
          } else {
            this.selectedAttr.splice(index, 1);
          }

          flag = 1;
        }
      });

      if (!flag) {
        this.selectedAttr.push(item);
      }

      console.log(this.selectedAttr, 'searchV2查询参数（下拉框）');
      this.$emit('changeSelect', this.selectedAttr);
    }

    // @Watch('$route', { deep: true })
    // onRouteChange (n, o) {
    //   this.getCheckedKeys();
    // }

    // 获取全部非库存属性
    getAttrList () {
      this.$Api.prodAttrApi.getAttrList({ type: 0 }).then((result) => {
        result.forEach((item) => {
          item.keyValue = 'p' + item.Id;

          // this.selectedAttr.push({
          //   Id: item.Id,
          //   Vals: []
          // });

          item.AttrValues.forEach(element => {
            element.keyValue = 'c' + element.Id;
          });
        });

        this.attrData = result;

        console.log(this.attrData, '处理后的产品属性');
      });
    }

    // 设置目前勾选的节点
    setTreeChecked () {
      this.checkedKeys = [];
      this.defaultSelected.forEach(element => {
        element.Vals.forEach(v => {
          this.checkedKeys.push('c' + v);
        });
      });

      (this.$refs.tree as any).setCheckedKeys(this.checkedKeys);

      console.log(this.defaultSelected, 'this.defaultSelected');
    }

    // 选择改变（树形控件checkbox）
    changeCSelect (data, checkedDetails) {
      console.log(data, 'checked data');
      console.log(checkedDetails, 'checkedDetails');
      if (!this.multiSelect) {
        (this.$refs.tree as any).setCheckedKeys([data.keyValue]);
      }

      let b = (this.$refs.tree as any).getCheckedNodes(true);
      this.changeSelectedAttr(b);
    }

    // 节点被点击时的回调（树形控件）
    handleNodeClick (data, Nodes, c) {
      if (!this.showCheckbox && Nodes.isLeaf) {
        this.selectedAttr = [];
        this.selectedAttr.push({
          Id: Nodes.parent.data.Id,
          Vals: [data.Id]
        });

        console.log(this.selectedAttr, '节点被点击时的回调 NodeClick');
        this.$emit('changeSelect', this.selectedAttr);
      }
    }

    // 搜寻attr改变
    changeSelectedAttr (item) {
      console.log(item, '搜寻attr改变');
      this.selectedAttr = [];

      item.forEach(element => {
        if (this.selectedAttr.length) {
          let flag = 0;
          this.selectedAttr.forEach(s => {
            if (element.AttrId === s.Id) {
              s.Vals.push(element.Id);
              flag = 1;
            }
          });

          if (!flag && element.AttrId) {
            this.selectedAttr.push({
              Id: element.AttrId,
              Vals: [element.Id]
            });
          }
        } else {
          this.selectedAttr.push({
            Id: element.AttrId,
            Vals: [element.Id]
          });
        }
      });

      console.log(this.selectedAttr, 'searchV2查询参数（Tree）');
      this.$emit('changeSelect', this.selectedAttr);
    }

    mounted () {
      this.getAttrList();

      if (this.defaultSelected.length) {
        this.selectedAttr = JSON.parse(JSON.stringify(this.defaultSelected));

        if (this.ui === 'tree' && this.showCheckbox) {
          this.setTreeChecked();
        }
      }
    }

    @Watch('defaultSelected', { deep: true })
    onDefaultSelectedChange (n, o) {
      console.log(n, o, 'DefaultSelectedChange');
      if (this.ui === 'tree' && this.showCheckbox) {
        this.setTreeChecked();
      } else if (this.ui === 'dropdown' && !this.defaultSelected.length) {
        this.selectedAttr = [];
      }
    }
}
</script>

<style lang="less">
.productAttrsTree {
  .el-tree-node__children {
    > .el-tree-node {
      float: left;
    }
  }

  &.noCheckbox {
    .el-tree-node__children {
      .el-tree-node__content {
        padding: 0 20px;
        border: 1px solid #eee;
        margin: 0 15px;

        .el-tree-node__expand-icon.is-leaf {
          display: none;
        }
      }
    }
  }
}
</style>

<style scoped lang="less">
.productAttrsTree {
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
