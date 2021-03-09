<template>
  <div class="header_menu">
      <ul>
        <li v-for="n in navData" :key="n.id">
          <router-link :to="n.link" class="nav_a">{{n.name}}</router-link>
          <ul>
            <li v-for="v in n.sub" :key="v.id">
              <router-link :to="v.link">{{v.name}}</router-link>
              <ul>
                <li v-for="t in v.sub" :key="t.id">
                  <router-link :to="t.link">{{t.name}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div class="clear"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InsNavLayout1 extends Vue {
  @Prop() private navData!: object;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header_menu {
  width: 100%;
  text-transform: uppercase;

  > ul {
    > li {
      float: left;
      font-size: 14px;
      width: 20%;
      text-align: center;
      position: relative;
      line-height: 45px;
      -webkit-transition-duration: 0.1s;
      transition-duration: 0.1s;
      -webkit-transition-property: transform;
      transition-property: transform;
      -webkit-transition-timing-function: ease-out;
      transition-timing-function: ease-out;
      color: #fff;

      > a {
        color: #fff;
        display: block;
        font-size: 14px;
        height: 100%;
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

        > li {
          position: relative;
          width: 174px;
          // height: 40px;
          background-color: #FFFFFF;
          // display: flex;
          border-top: 1px solid @primary_color;

          > a {
            display: block;
            color: #101012;
            font-size: 14px;
            width: 174px;
            height: 40px;
            line-height: 40px;
            z-index: 2;
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
            left: 100%;
            top: 0;

            > li {
              position: relative;
              width: 174px;
              // height: 40px;
              background-color: #FFFFFF;
              // display: flex;
              border-top: 1px solid @primary_color;

              > a {
                display: block;
                color: #101012;
                font-size: 14px;
                width: 174px;
                height: 40px;
                line-height: 40px;
                z-index: 2;
              }
            }
          }
        }
      }
    }
  }
}
</style>
