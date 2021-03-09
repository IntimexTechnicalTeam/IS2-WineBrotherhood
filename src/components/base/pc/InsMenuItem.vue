<template>
    <el-submenu :index="level + '-' + (index+1)" v-if="item.Childs && item.Childs.length">
        <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <span class="name"><img :src="item.Image" v-if="item.Image" /> {{item.Name}}</span>
        </template>
        <menu-item :textColor="textColor" v-for="(child,index) in item.Childs" :key="index" :item="child" :index="index" :level="level+1" />
    </el-submenu>

    <el-menu-item :index="level + '-' + (index+1)" v-else>
      <a href="javascript:;" v-if="item.Type === 0" @click="toUrl(item)"><img :src="item.Image" v-if="item.Image" />{{item.Name}}</a>
      <router-link v-else class="name" :style="{color: textColor}" @click.native="closeSlideMenu" :to="To(item)" slot="title">
        <img :src="item.Image" v-if="item.Image" />  {{item.Name}}
      </router-link>
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
  @Prop() private index!: number;
  @Prop() private textColor!: string;
  @Prop({ default: 1 }) private level!: number;

  showMemNav: boolean = false;

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
}
</script>

<style scoped lang="less">
.name {
  > img {
    width: 35px;
  }
}
</style>
