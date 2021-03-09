<template>
  <div class="productAttrsTree">
    <template v-if="direction === 'row'">
      <ins-select-search v-for="(attr,index) in attrData" :key="index" :data="attr" :multiple="multiSelect" @changeSelect="changeOSelect" />
    </template>

    <template v-if="direction === 'column'">
      <p class="Title" v-if="title">{{title}}</p>
      <Tree icon-class="el-icon-arrow-right" :default-expand-all="expandAll" :data="attrData" node-key="keyValue" :show-checkbox="showCheckbox" :props="props" @check="changeCSelect" :check-strictly="!multiSelect" ref="tree"></Tree>
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
  name: 'InsPoductAttrsTree',
  components: {
    InsSelectSearch: () => import('@/components/base/pc/InsSelectSearch.vue'),
    Tree
  }
})
export default class InsPoductAttrsTree extends Vue {
    @Prop({ default: '' }) private title!: string; // 标题
    @Prop({ default: 'column' }) private direction!: string; // 高级搜索组件方向  column/row
    @Prop({ default: false }) private expandAll!: boolean; // 是否默认展开所有节点
    @Prop({ default: true }) private multiSelect!: boolean; // 是否为多选
    @Prop({ default: false }) private showCheckbox!: boolean; // 节点是否可被选择

    attrData: object[] = []; // 产品属性数据
    checkedKeys: any[] = []; // 设置选中的节点
    selectedAttr: attrItem[] = []; // 选中的产品属性数组
    // 设置树形控件节点对象属性值
    props: object = {
      children: 'AttrValues',
      label: 'Name'
    };

    // 选中的产品属性值对象数组
    get attrs () {
      return JSON.parse(this.$route.query.attrs as string);
    }

    get routerType () {
      return JSON.parse(this.$route.query.type as string);
    }

    // 获取全部非库存属性
    getAttrList () {
      this.$Api.prodAttrApi.getAttrList({ type: 0 }).then((result) => {
        result.forEach((item) => {
          item.keyValue = 'p' + item.Id;

          this.selectedAttr.push({
            Id: item.Id,
            Vals: []
          });

          item.AttrValues.forEach(element => {
            element.keyValue = 'c' + element.Id;
          });
        });

        this.attrData = result;

        console.log(this.attrData, '处理后的产品属性');
      });
    }

    // 获取选中attr
    getCheckedKeys () {
      this.checkedKeys = [];

      this.attrs.forEach(element => {
        if (element.Vals.length || this.routerType) {
          element.Vals.forEach(v => {
            this.checkedKeys.push('c' + v);
          });
        } else {
          this.checkedKeys.push('p' + element.Id);
        }
      });

      console.log(this.checkedKeys, 'this.checkedKeys');

      (this.$refs.tree as any).setCheckedKeys(this.checkedKeys);

      setTimeout(() => {
        let a = (this.$refs.tree as any).getCheckedNodes(true);
        this.changeSelectedAttr(a, 1);
      }, 300);
    }

    // 选择改变（树形控件）
    changeCSelect (key) {
      if (!this.multiSelect) {
        (this.$refs.tree as any).setCheckedKeys([key.keyValue]);
      }

      let b = (this.$refs.tree as any).getCheckedNodes(true);
      this.changeSelectedAttr(b, 0);
    }

    // 选择改变（下拉框）
    changeOSelect (val, parentId, flag) {
      console.log(parentId, val, 'changeSelect');
      this.selectedAttr.forEach(element => {
        if (element.Id === parentId) {
          if (this.multiSelect) {
            element.Vals = val;
          } else {
            element.Vals = [val];
          }
        }
      });

      console.log(this.selectedAttr, 'searchV2查询参数（下拉框）');
      this.$emit('changeSelect', this.selectedAttr, flag);
    }

    // 搜寻attr改变
    changeSelectedAttr (item, flag) {
      console.log(item, '搜寻attr改变');

      this.selectedAttr.forEach(element => {
        element.Vals = [];
      });

      for (var i = 0; i < item.length; i++) {
        for (var j = 0; j < this.selectedAttr.length; j++) {
          if (item[i].AttrId === this.selectedAttr[j].Id) {
            this.selectedAttr[j].Vals.push(item[i].Id);
          }
        }
      }
      console.log(this.selectedAttr, 'searchV2查询参数（Tree）');
      this.$emit('changeSelect', this.selectedAttr, flag);
    }

    @Watch('$route', { deep: true })
    onRouteChange (n, o) {
      if (this.direction === 'column' && !this.routerType) {
        this.getCheckedKeys();
      }
    }

    mounted () {
      this.getAttrList();
      if (this.direction === 'column') {
        this.getCheckedKeys();
      }
    }
}
</script>

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
