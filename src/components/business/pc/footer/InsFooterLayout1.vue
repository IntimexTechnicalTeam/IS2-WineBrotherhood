<template>
  <div class="container">
    <div class="footer-top">
      <div class="footer_in">
        <div class="footer_nav">
          <ul>
            <li v-for="(n,index) in $store.state.footerMenus" :key="index">
              <router-link :to="n.Type === 0 ? n.Url : n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 ? '/product/CatProduct?catId=' + n.Value.Id : n.Type === 5 ? '/product/search?key=&attr=' + n.Value.Id : '/product/search?key=&attr=' + n.ParentId + '&attrId=' + n.Value.Id">{{n.Name}}</router-link>
              <ul>
                <li v-for="(c,index2) in n.Childs" :key="index2">
                  <router-link :to="c.Type === 0 ? c.Url : c.Type === 1 ? '/cms/catDetail/' + c.Value.Id : c.Type === 2 ? '/CMS/content/' + c.Value.Id : c.Type === 3 ? '/RegNPay/Form/' + c.Value.Id : c.Type === 4 ? '/product/CatProduct?catId=' + c.Value.Id : c.Type === 5 ? '/product/search?key=&attr=' + c.Value.Id : '/product/search?key=&attr=' + c.ParentId + '&attrId=' + c.Value.Id">{{c.Name}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        © Intimex {{currentYear}} All rights reserved
        <a href="http://intimex.com" target="_blank">
          <img src="@/assets/Images/footer_logo.png" />
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InsFooterLayout1 extends Vue {
  currentYear: number = 0;

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

  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
  }

  mounted () {
    var a = this.$store.state.MenuData;
  }
}
</script>

<style scoped lang="less">
.container {
  background: #000;
  width: 100%;
  // margin-top: 100px;
}

.footer-top {
  width: 100%;
  margin: 0 auto;
  background-color: #7accc8;
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
  background: #7accc8;
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
