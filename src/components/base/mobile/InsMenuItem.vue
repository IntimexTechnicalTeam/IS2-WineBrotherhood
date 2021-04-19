<template>
    <el-submenu :index="item.Name" v-if="item.Childs && item.Childs.length">
        <template slot="title">
            <span class="name" @click="toUrl(item)">{{item.Name}}</span>
        </template>
        <menu-item :textColor="textColor" v-for="(child,index) in item.Childs" :key="index" :item="child" :level="level+1" />
    </el-submenu>
    <el-menu-item :index="item.Name" v-else>
      <router-link :style="{color: textColor}" @click.native="closeSlideMenu(item)" :to="To(item)" slot="title" v-if="item.Type > 0">
           <b>{{item.Name}}</b>
      </router-link>
      <a href="javascript:;" @click="toUrl(item)" v-else>
          <b>{{item.Name}}</b>
      </a>
    </el-menu-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import { MenuItem as ElMenuItem, Submenu } from 'element-ui';
@Component({
  name: 'MenuItem',
  components: {
    // ElMenuItem,
    // Submenu
  }
})
export default class InsMenuItem extends Vue {
  @Prop() private item!: object;
  @Prop() private textColor!: string;
  @Prop({ default: 1 }) private level!: number;
  attrId:number[] = [];
  showMemNav: boolean = false;
  attrList: any[] = []; // 产品属性数据
  catalogs: object[] = []; // 产品目录数据
  closeSlideMenu (n) {
    this.$store.dispatch('isShowMenu', false);
  }

  toUrl (n) {
    if (n.Type < 0) {
      return;
    }

    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id
      : n.Type === 2 ? '/CMS/content/' + n.Value.Id
      : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id
      : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id
      : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0'
      : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0'
      : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
}
</script>

<style scoped lang="less">
.name {
  font-size: 1.12rem;
  line-height: 3rem;
  a {
    font-size: 1.12rem;
    line-height: 3rem;
  }
}
</style>
