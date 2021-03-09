<template>
  <ul v-if="navData && navData.length">
    <li v-for="(n,index) in navData" :key="index" :level="level">
      <!-- <a href="javascript:;" v-if="n.Type === 0" @click="toUrl(n.Url)">{{n.Name}}</a>
      <router-link v-else :to="n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 ? '/product/cat/' + n.Value.Id : n.Type === 5 ? '/product/search/+?attrs=' + JSON.stringify([{Id:parseInt(n.Value.Id),Vals:[]}]) + '&type=0' : '/product/search/+?attrs=' + JSON.stringify([{Id:parseInt(n.ParentId),Vals:[parseInt(n.Value.Id)]}]) + '&type=0'" class="nav_a">{{n.Name}}</router-link> -->
      <a href="javascript:;" v-if="n.Type === 0" @click="toUrl(n)">{{n.Name}}</a>
      <router-link :to="{path: To(n)}" class="nav_a" v-else>{{n.Name}}</router-link>
      <navLayout :navData="n.Childs" :level="level+1"/>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'navLayout'
})
export default class InsNavLayout extends Vue {
  @Prop() private navData!: object;
  @Prop({ default: 1 }) private level!: number;

  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }

  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/cms/content/' + n.Value.Id : n.Type === 3 ? '/regnpay/form/' + n.Value.Id : '/';
  }
}
</script>

<style scoped lang="less">
.nav_menu {
    >ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        > li {
            width: 20%;
            text-align: center;
            position: relative;

            > a {
                display: block;
                width: 100%;
                padding: 15px 10px;
                box-sizing: border-box;
                color: #000;
            }

            > ul {
                display: none;
                position: absolute;
                z-index: 2;
                width: 200px;
                top: 100%;
                left: calc(50% - 100px);
                border: 1px solid @base_color;
                li {
                    background-color: #fff;
                    position: relative;
                    border-bottom: 1px solid @base_color;
                    > a {
                        display: block;
                        width: 100%;
                        padding: 10px;
                        color: #000;
                        box-sizing: border-box;
                    }

                    &:hover {
                        > a {
                            color:@base_color;
                        }
                    }

                    ul {
                        display: none;
                        position: absolute;
                        left: 100%;
                        top: 0;
                        width: 200px;
                        border: 1px solid @base_color;
                        z-index: 2;
                    }

                    &:last-child {
                        border-bottom: 0;
                    }

                    &:hover {
                        > ul {
                            display: block;
                        }
                    }
                }
            }

            &:hover {
                > a {
                    color:@base_color;
                }

                > ul {
                    display: block;
                }
            }
        }
    }
}
</style>
