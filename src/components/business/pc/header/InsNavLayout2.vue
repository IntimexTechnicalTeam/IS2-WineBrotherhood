<template>
  <ul>
    <li v-for="(n,index) in navData" :key="index">
      <router-link :to="{path: To(n)}" v-if="n.Type > 0">{{n.Name}}</router-link>
      <a href="javascript:;" @click="toUrl(n)" v-else>{{n.Name}}</a>
      <navLayout :navData="n.Childs" v-if="n.Childs && n.Childs.length" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'navLayout'
})
export default class InsNavLayout2 extends Vue {
  @Prop() private navData!: object;

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
    > li {
      float: left;
      font-size: 14px;
      width: 20%;
      text-align: center;
      position: relative;
      -webkit-transition-duration: 0.1s;
      transition-duration: 0.1s;
      -webkit-transition-property: transform;
      transition-property: transform;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
      // color: #fff;

      > a {
        // color: #fff;
        display: block;
        font-size: 14px;
        width: 100%;
        padding: 15px 10px;
        box-sizing: border-box;
      }

      ul {
        display: none;
      }

      &:hover {
        > ul {
          display: block;
        }
      }

      > ul {
        position: absolute;
        z-index: 2;
        box-shadow: @primary_color 0px 0px 10px 0px;
        width: 100%;
        top: 100%;

        > li {
          position: relative;
          width: 100%;
          background-color: #FFFFFF;
          border-top: 1px solid @primary_color;

          > a {
            display: block;
            color: #101012;
            font-size: 14px;
            width: 100%;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          &:hover {
            background-color: #000;
            > a {
              color: #fff;
            }

            > ul {
              display: block;
            }
          }

          > ul {
            position: absolute;
            z-index: 2;
            box-shadow: @primary_color 0px 0px 10px 0px;
            left: 100%;
            top: 0;
            width: 174px;

            > li {
              position: relative;
              background-color: #FFFFFF;
              border-top: 1px solid @primary_color;

              > a {
                display: block;
                color: #101012;
                font-size: 14px;
                width: 100%;
                z-index: 2;
              }
            }
          }
        }
      }
    }
  }
</style>
