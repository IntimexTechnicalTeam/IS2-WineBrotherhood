<template>
  <div class="container">
    <div class="footer-top">
      <div class="footer_in">
        <div class="footer_nav">
          <!-- <ul>
            <li v-for="nav in $store.state.MenuData" :key="nav.id">
              <a :href="nav.link">{{nav.name}}</a>
              <ul>
                <li v-for="s in nav.sub" :key="s.id">
                  <a :href="s.link">{{s.name}}</a>
                </li>
              </ul>
            </li>
          </ul> -->
          <Menu :backColor="'#2e2e2e'" :textColor="'#fff'" :activeTextColor="'#fff'" />
        </div>
      </div>
      <div class="footer_goTop" @click="goToTop">
        <p>TOP</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        © Intimex 2018 All rights reserved
        <a href="http://intimex.com" target="_blank">
          <img src="@/assets/Images/footer_logo.png" />
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Menu: () => import('@/components/business/pc/header/InsElMenu.vue')
  }
})
export default class InsFooterLayout2 extends Vue {
  goToTop () {
    let sTop = document.documentElement.scrollTop;
    let times = setInterval(() => {
      sTop -= 50;
      if (sTop <= 0) {
        document.documentElement.scrollTop = 0;
        clearInterval(times);
      } else {
        document.documentElement.scrollTop = sTop;
      }
    }, 1);
  }

  mounted () {
    var a = this.$store.state.MenuData;
  }
}
</script>

<style lang="less">
.footer_nav {
  .el-submenu__icon-arrow {
    display: none;
  }

  .el-menu {
    .el-submenu__title {
      padding: 0 20px !important;
    }

    li {
      text-align: center;

      a {
        color: #fff;
      }
    }
  }

  > .el-menu {
    display: flex;
    justify-content: space-between;
    border-right: 0;

    > li {
      float: left;

      > .el-submenu__title, &.el-menu-item {
        border-bottom: 1px solid yellow;
      }
    }
  }
}
</style>

<style scoped lang="less">
.container {
  background: #000;
  width: 100%;
  // margin-top: 100px;
}

.footer-top {
  width: 100%;
  margin: 0 auto;
  background-color: #2e2e2e;
  position: relative;
}

.footer_in {
  width: 1100px;
  text-transform: uppercase;
  display: table;
  margin: 0 auto;
}

.footer_nav {
  width: 100%;
  display: inline-block;
  padding: 45px 0;
  box-sizing: border-box;
}

.footer_nav {
  width: 100%;
  display: inline-block;
  padding: 45px 0;
  box-sizing: border-box;
}

.footer_nav > ul > li {
  width: 15%;
  float: left;
  text-align: center;
  margin: 0 2.5%;
}

.footer_nav > ul > li > a {
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid yellow;
  color: #fff;
  width: 100%;
  display: block;
}

.footer_goTop {
  position: absolute;
  width: 100%;
  text-align: center;
  top: -38px;
  height: 40px;
  background: url(../../../../assets/Images/triangle.png) no-repeat center center;
}

.footer_goTop p {
  color: #fff;
  font-size: 15px;
  display: inline-block;
  margin-top: 20px;
  cursor: pointer;
  padding: 0 10px;
}

.footer-bottom {
  width: 100%;
  text-align: center;
  background: #000;
  color: #fff;
}

.footer-bottom p {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
}

.footer-bottom img {
  vertical-align: middle;
  padding-left: 10px;
}

.footer_nav > ul > li > ul > li > a {
    padding-top: 20px;
}

.footer_nav li a {
    color: #fff;
    width: 100%;
    display: block;
}
</style>
