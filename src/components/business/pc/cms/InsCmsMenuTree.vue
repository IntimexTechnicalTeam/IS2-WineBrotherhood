<template>
    <div class="cmsMenuTree" :style="{ width: width }">
        <p class="Title" v-if="title">{{title}}</p>
        <searchNav :expandAll="true" :data="cmsCatTree" @changeSelectedAttr="changeSelectedAttr" :props="defaultProps" :showCheckbox="type === 0 ? true : false" :type="2" />
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    searchNav: () => import('@/components/business/pc/product/InsTree.vue')
  }
})
export default class InsCmsMenuTree extends Vue {
    @Prop({ default: '30%' }) private width!: string;
    @Prop({ default: '' }) private title!: string;
    @Prop({ default: 0 }) private type!: number; // 类型（ 筛选 0 / 菜单 1 ）

    defaultProps: object = {
      children: 'Children',
      label: 'Name'
    }

    cmsCatTree: object[] = [];

    // 获取cms该id下所有的Category
    getCategoryTree () {
      this.$Api.cms.getCategoryTree({ id: 40101 }).then((result) => {
        this.cmsCatTree = result;
        console.log(result, 'cms该id下所有的Category');
      });
    }

    // 搜寻attr改变
    changeSelectedAttr (item) {
      let id = item.Id;
      let title = item.Name;
      this.$store.dispatch('setIdsFun', { id, title });
      console.log(item, 'cms选择目录改变(菜单)');
    }

    mounted () {
      this.getCategoryTree();
    }
}
</script>

<style lang="less">
.cmsMenuTree {
    .el-tree-node__content {
        height: 45px;
    }

    .is-current > .el-tree-node__content {
        background-color: #606266;
        color: #fff;
    }
}
</style>

<style scoped lang="less">
.cmsMenuTree {
    float: left;
    margin-right: 5%;
    border: 1px solid #eee;

    .Title {
        background: #8dc11f;
        text-align: center;
        font-size: 18px;
        color: #fff;
        padding: 20px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        font-weight: bold;
    }
}
</style>
