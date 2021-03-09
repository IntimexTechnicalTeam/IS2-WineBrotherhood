<template>
  <div id="header" class="new_header top-header-box" v-cloak>
    <!--首頁大頭部-->
    <div class="header-index"  v-if="showHomePage=='/'">
      <div class="new_logo">
        <router-link to="/">
          <img src="/static/Image/home/logo.png" />
        </router-link>
      </div>
      <div class="header_top">
        <div class="header_top_up">
          <div class="right">
            <div class="main-code">
              <CodeSelect></CodeSelect>
            </div>
            <div class="langbtn">
              <span @click="changLange('E')" :class="{'active':currentlang=='E'}">ENG</span>
              <span @click="changLange('C')" :class="{'active':currentlang=='C'}">繁中</span>
            </div>
            <div class="header-fb-ig">
              <router-link to="/">
                <img src="/static/Image/home/footer01.png" />
              </router-link>
              <router-link to="/">
                <img src="/static/Image/home/footer02.png" />
              </router-link>
            </div>
          </div>
        </div>
        <div class="header_top_down">
          <div id="handle-box" class="handle-box">
                <InsLogin></InsLogin>
                <a href="javascript:void(0);" @click="search = !search" class="handle-icon search-icon"></a>
                <div class="handle-one search-input-box" v-show="search">
                  <input type="text" v-model="key" />
                  <span class="search-btn" @click="searchFun(key)"></span>
                </div>
                <Shopcart></Shopcart>
          </div>
          <div class="header_menu">
            <ul>
              <li v-for="(n,index) in header" :key="index" :class="{showMeunhover:n.Type === 5 && index == activeIndex}" @mouseenter="navShow(index)">
                  <span @click="getRoute(n)" class="nav_a">{{n.Name}}</span>
                <div class="product-nav"  v-if="n.Childs && n.Childs.length>0" ref="showMenu" v-show="index == activeIndex">
                  <div class="navClose" @click="navClose"></div>
                  <ul class="product-nav-up">
                    <li v-for="(citem,cindex) in n.Childs" :key="cindex">
                      <a  href="javascript:;" @click="ShowItems(citem)">{{citem.Name}}{{sis(index)(0)}}</a>
                    </li>
                    <div class="product-nav-down" v-if="NewItem.Childs && NewItem.Childs.length>0">
                            <ul class="attr-one">
                                <li v-for="(ditem,dindex) in NewItem.Childs" :key="dindex">
                                  <!-- <router-link :to="ditem.Type === 0 ? ditem.Url : ditem.Type === 1 ? '/cms/catDetail/' + ditem.Value.Id : ditem.Type === 2 ? '/CMS/content/' + ditem.Value.Id : ditem.Type === 3 ? '/RegNPay/Form/' + ditem.Value.Id : ditem.Type === 4 ? '/product/cat/' + ditem.Value.Id : ditem.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{Id:parseInt(item.Value.Id),Vals:[]}]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{Id:parseInt(ditem.ParentId),Vals:[parseInt(ditem.Value.Id)]}]) + '&type=0'">{{ditem.Name}}</router-link> -->
                                  <span @click="getRoute(ditem)">{{ditem.Name}}</span>
                                </li>
                            </ul>
                      </div>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="header-default header-index-slide header-every" v-show="!showMeunBar" :class="!showMeunBar && showHomePage=='/' ?'showMenuYes':''">
      <div class="header_top">
        <div class="header_top_up">
          <div class="header_top_up_in">
          <div class="right">
            <div class="main-code">
              <CodeSelect></CodeSelect>
            </div>
            <div class="langbtn">
              <span @click="changLange('E')" :class="{'active':currentlang=='E'}">ENG</span>
              <span @click="changLange('C')" :class="{'active':currentlang=='C'}">繁中</span>
            </div>
            <div class="header-fb-ig">
               <router-link to="/">
                <img src="/static/icon/nav03.png" />
               </router-link>
               <router-link to="/">
                <img src="/static/icon/nav04.png" />
              </router-link>
            </div>
          </div>
        </div>
        </div>
        <div class="header_top_down">
          <div class="new_logo">
            <router-link to="/">
              <img src="/static/Image/home/logo.png" />
            </router-link>
          </div>
          <div class="header_menu">
            <ul>
              <li v-for="(n,index) in header" :key="index" :class="{showMeunhover:n.Type === 5 && index == activeIndex}" @mouseenter="navShow(index)">
                <span @click="getRoute(n)" class="nav_a">{{n.Name}}</span>
                <div class="product-nav"  v-if="n.Childs && n.Childs.length>0" ref="showMenu" v-show="index == activeIndex">
                  <div class="navClose" @click="navClose"></div>
                   <ul class="product-nav-up">
                    <li v-for="(citem,cindex) in n.Childs" :key="cindex">
                      <a  href="javascript:;" @click="ShowItems(citem)">{{citem.Name}}{{sis(index)(0)}}</a>
                    </li>
                    <div class="product-nav-down" v-if="NewItem.Childs && NewItem.Childs.length>0">
                            <ul class="attr-one">
                                <li v-for="(ditem,dindex) in NewItem.Childs" :key="dindex">
                                  <span @click="getRoute(ditem)">{{ditem.Name}}</span>
                                </li>
                            </ul>
                      </div>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div id="handle-box" class="handle-box">
                <InsLogin></InsLogin>
                <a href="javascript:void(0);" @click="search = !search" class="handle-icon search-icon"></a>
                <div class="handle-one search-input-box" v-show="search">
                  <input type="text" v-model="key" />
                  <span class="search-btn" @click="searchFun(key)"></span>
                </div>
                <Shopcart></Shopcart>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import api from '@/sdk/api/Api.ts';
import Menu from '@/components/business/pc/header/InsMenu.vue';
import logo from '@/components/base/pc/InsLogo.vue';
@Component({
  components: {
    Menu,
    InsLogo: () => import('@/components/base/pc/InsLogo.vue'),
    Shopcart: () =>
      import('@/components/business/pc/header/InsShoppingCart.vue'),
    InsLogin: () =>
      import('@/components/business/pc/header/InsLogin.vue'),
    CodeSelect: () =>
      import('@/components/business/pc/header/InsCodeSelect.vue'),
    elMenu: () => import('@/components/business/pc/header/InsElMenu.vue')
  }
})
export default class InsHeader extends Vue {
  @Prop() private msg!: string;
  showMeunBar:boolean=true;
  private search: boolean = false;
  private key: string = '';
  private showMenberCentral:boolean = false;
  private count:number = 0;
  private isshow:boolean=false;
  private activeIndex:string= '';
  private NewItem=[];
  private si!:any;
  private complete:boolean = false;
  // private hhh: any = this.$t('test');
  sis (index) {
    if (this.complete) return () => {};
    this.complete = true;
    return (cindex) => {
      this.NewItem = this.header[index].Childs[cindex];
    };
  }
  getMenu () {
    this.$Api.promotion
      .getMenu()
      .then(result => {
        this.$store.dispatch('setHeaderMenus', result.ReturnValue.HeaderMenus);
        this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
      })
      .catch(error => {
        console.log(error);
      });
  }
  getRoute (ditem) {
    if (ditem.Type === 0) {
      this.$router.push(ditem.Url);
      this.activeIndex = '';
    } else if (ditem.Type === 1) {
      this.$router.push('/cms/catDetail/' + ditem.Value.Id);
      this.activeIndex = '';
    } else if (ditem.Type === 2) {
      this.$router.push('/CMS/content/' + ditem.Value.Id);
      this.activeIndex = '';
    } else if (ditem.Type === 3) {
      this.$router.push('/RegNPay/Form/' + ditem.Value.Id);
      this.activeIndex = '';
    } else if (ditem.Type === 4) {
      this.$router.push('/product/cat/' + ditem.Value.Id);
      this.activeIndex = '';
    } else if (ditem.Type === 5) {
      this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(ditem.Value.Id), Vals: [] }]) + '&type=0');
      this.activeIndex = '';
    } else {
      this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(ditem.ParentId), Vals: [parseInt(ditem.Value.Id)] }]) + '&type=0');
      this.activeIndex = '';
    }
  }
  ShowItems (value) {
    this.NewItem = value;
  }
  get showHomePage () {
    return this.$route.path;
  }
  menberCentral () {
    if (!this.$Storage.get('isLogin')) this.$router.push('/account/login');
    else this.showMenberCentral = !this.showMenberCentral;
  }
  get header () {
    return this.$store.state.headerMenus;
  }
  get ShopCart () {
    return this.$store.state.shopCart;
  }
  searchFun (key) {
    this.$store.dispatch('setSearchKey', key);
    if (key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: key
        }
      });
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
    }
  }
  navShow (index) {
    this.activeIndex = index;
    $(function () {
      $('body').css('overflow-y', 'hidden!important');
    });
  }
  navClose () {
    this.activeIndex = '';
    $(function () {
      $('body').css('overflow-y', 'auto!important');
    });
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  private changLange (lang) {
    this.$Api.member
      .setUILanguage(lang)
      .then(result => {
        this.$i18n.locale = lang;
        // console.log(this.hhh, this.$t('test'),'test');
        localStorage.setItem('locale', lang);
        // this.$store.dispatch('setLang', lang);
        this.Reload();
      })
      .catch(error => {
        console.log(error);
      });
  }
  created () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    if (this.$route.name !== 'home') { this.showMeunBar = false; }
    window.onscroll = () => {
      if (this.$route.name !== 'home') return;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop >= window.innerHeight) {
        this.showMeunBar = false;
      } else {
        this.showMeunBar = true;
      }
    };
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.showMenberCentral = false;
    this.search = false;
    if (this.$route.name !== 'home') { this.showMeunBar = false; } else { this.showMeunBar = true; }
  }
  @Watch('ShopCart')
  onShopCartChange () {
    this.ShopCart.then((result) => {
      this.count = result.ShopCart.Qty;
    });
  }
  mounted () {
    this.getMenu();

    // console.log(this.$store.state.headerMenus, 'gdfdfgdfgdfgdfgdfgdfg');
  }
}
</script>
<style>
.header-default .main-code select{
  color: #2c3e50!important;
}
.header-default .member-icon {
  background: url("/static/image/home/member_hover.png") no-repeat center center!important;
  background-size: contain!important;
}
.header-default .cart-icon {
  background: url("/static/image/home/cartFull_hover.png") no-repeat center center!important;
  background-size: contain!important;
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
v-cloak{
  display: none;
}
.w1200 {
  max-width: 1200px;
  min-width: 1200px;
  margin: 0 auto;
}

.new_header {
  width: 100%;
}
/*非首頁header*/
 @keyframes showanimate {
            0%{
              top:-180px;
            }
            100%{
              top:0px;
            }
  }
.showMenuYes{
  animation: showanimate 1s ease-out;
}
.header-default {
  position: relative;
  width: 100%;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  border-bottom: 10px solid #7accc8;
  /*display: none;*/
}
.header-default .header_top {
  width: 100%;
  border-bottom: 1px solid #3c3c3c;
}
.header-default .langbtn a {
  color: #000;
  font-size: 14px;
  cursor: pointer;
}
.header-default  .langbtn span{
  cursor: pointer;
  padding-right: 10px;
}
.header-default > img {
  width: 100%;
  transform: scale(1.2);
  opacity: 0;
  transition: all 2s;
}
.header-default .header_top_up {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #3c3c3c;
}
.header-default .header_top_up_in {
  width: 73%;
  height: 40px;
  margin: 0 auto;
}
.header-default .header_top_up .right {
  /*width:18%;*/
  width: 200px;
  height: 40px;
  float: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
// .header-default
.header-default .header_top_down {
  width: 1200px;
  height: 128px;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  display: -ms-flexbox;
  align-items: center;
}
.header-default #code-select {
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  background: none;
  color: #000;
  border: none;
  outline: none;
}

.header-default .new_logo {
  /*width:5.5%;*/
  width: 150px;
  float: left;
}
.header-default .tutor-title {
  display: block;
  float: left;
  margin-left: 1.2%;
  width: 22%;
}
.header-default .tutor-title img {
  width: 100%;
}

.header-default .header_menu {
  /*width:35%;*/
  margin-left: 9%;
  float: left;
}
.header-default .header_top_up_in{
  width: 1200px;
  margin:0 auto;
}
.header-default .header_menu > ul > li > span {
  color: #000;
  display: block;
  font-size: 18px;
  line-height: 18px;
  cursor: pointer;
}
.header-default .handle-box {
  float: right;
  /*width: 10%;*/
  width: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15%;
}
.header-default .member-icon {
  background: url("/static/image/home/member_hover.png") no-repeat center center;
  background-size: contain;
}

.header-default .cart-icon {
  background: url("/Images/black-cart-icon.png") no-repeat center center;
  position: relative;
}
.header-default .search-icon {
  background: url("/static/image/home/search_hover.png") no-repeat center center;
  background-size: contain;
}
/*首頁header*/
.header-index {
  position: absolute;
  z-index: 999;
  // overflow: hidden;
  width: 100%;
  height: 180px;
}
.header-index-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1.2);
  width: 100vw;
  height: 100vh;
  transition: all 2s linear;
  opacity: 0;
}
.header-index-bg > img {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  min-width: 100%;
  min-height: 100%;
}
.header-index .header_top {
  position: absolute;
  right: 0%;
  top: 0;
  width: 100%;
  z-index: 1;
}
.header-index .header_top_up {
  width: 61.5%;
  height: 73px;
  border-bottom: 1px solid #fff;
  float: right;
  margin-right: 3%;
}
.header-index .header_top_down {
    width: 100%;
    height: 73px;
    padding-top: 12px;
    float: right;
}
.header-index .header_mid {
  position: relative;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  width: 100%;
  height: 270px;
}
.header-index .header_mid .big_text {
  height: 180px;
  margin: 0 auto;
  overflow: hidden;
}
.header-index .header_mid .big_text_in {
  margin: 0 auto;
  margin-top: 200px;
  transition: all 1.5s;
}
.header-index .header_mid .big_text_in p {
  font-size: 72px;
  text-align: center;
  color: #fff;
  line-height: 90px;
  font-family: "Georgia";
}
.header-index .header_mid .tutor-btn {
  margin: 0 auto;
  width: 340px;
  height: 60px;
  margin-top: 30px;
  border: 1px solid #fff;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-index .header_mid .tutor-btn img {
  width: 13%;
}
.header-index .header_mid .tutor-btn a {
  color: #fff;
  line-height: 60px;
  font-size: 27px;
  /*margin-left:10px;*/
}
.header-index .header_mid .tutor-btn:hover {
  cursor: pointer;
}
.header-index .new_logo {
  width: 9%;
  position: absolute;
  left: 23%;
  top: 44px;
}
.new_logo a {
  display: block;
  width: 100%;
  overflow: hidden;
}
.new_logo a img {
  width: 100%;
}
.header_bottom {
  height: 100%;
  display: table;
  /*background:linear-gradient(to right, #074494 50%, #ffffff 50%);*/
  filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#074494',endColorStr='#ffffff',gradientType='0');
  /*background: -moz-linear-gradient(to right,  #074494 50%, #ffffff 50%); */
  /*background: -o-linear-gradient(to right, #074494 50%, #ffffff 50%); */
  display: table-cell;
  vertical-align: middle;
}
.header-index .member-icon {
  background: url("/Images/member-icon.png") no-repeat center center;
}

.header-index .cart-icon {
  background: url("/Images/cart-icon.png") no-repeat center center;
  position: relative;
}
.header-index .fav-icon {
  background: url("/Images/collect-icon-white.png") no-repeat center center;
}
.header-index .search-icon {
  background: url("/Images/search-icon.png") no-repeat center center;
}
.category-product-bg .search-box {
  vertical-align: middle;
  float: right;
  width: 500px;
  padding-top: 7px;
}
.header-index .header_menu {
  margin-right: 6%;
  display: inline-block;
  float: right;
}
.header_menu > ul {
  display: flex;
  justify-content: space-between;
}
.header-index .header_menu > ul > li {
  padding: 10px 20px 35px 20px;
}
.header-default .header_menu > ul > li {
  padding: 35px 20px 35px 20px;
}
.header-index .header_menu > ul > li > span {
  color: #fff;
  display: block;
  font-size: 20px;
  line-height: 20px;
  cursor: pointer;
}
.header_menu .lt {
  text-align: left;
}
.header_menu > ul > li > span:hover {
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
}
.header-index .header_top_up .right {
  width: 220px;
  height: 18px;
  float: right;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 3.6%;
}
.header-fb-ig {
  width: 50px;
  height: 18px;
  float: left;
  display: flex;
  justify-content: space-around;
}
.header-fb-ig a {
  display: block;
  width: 18px;
  overflow: hidden;
  text-align: center;
}
.header-fb-ig img {
  height: 100%;
}
.header-index .langbtn span:nth-child(1) {
  margin-right: 7px;
}
.header-index .langbtn a {
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
.header-index .langbtn span{
  cursor: pointer;
  padding-right: 10px;
}
.main-code {
  display: inline-block;
  width: 60px;
  float: left;
}
.header-index #code-select {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  background: none;
  color: #fff;
  border: none;
  outline: none;
}
.header-index .langbtn span {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
}
.header-index .handle-box {
  float: right;
  width: 8%;
  margin-right: 5.2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header_log .handle-box .btn {
  border-radius: 5px;
  float: right;
  width: 120px;
  height: 40px;
  line-height: 40px;
}

.header_log .handle-box .btn span a {
  color: #000;
}

.header_log .handle-one {
  margin-top: 10px;
}

.header_log .handle-icon {
  width: 30px;
}
.product-nav {
  position: absolute;
  top: 135px;
  left: 50%;
  min-height: 600px;
  transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  width: 100%;
  background-color: #eee;
  padding-top: 90px;
  padding-bottom: 120px;
  z-index: 1;
}
.product-nav .product-nav-up {
  width: 94%;
  overflow: hidden;
  margin: 0 auto;
  display: block;
}
.showMeunhover{
      background-color: rgb(238, 238, 238);
}
.showMeunhover span{
      color: rgb(28, 28, 28)!important;
}
.product-nav .product-nav-up > li {
  padding-left: 4.5%;
  padding-right: 4.5%;
  float: left;
}
.product-nav .product-nav-up > li {
  position: relative;
}
.product-nav .product-nav-up > li > a {
  display: block;
  color: #1c1c1c;
  font-size: 21px;
  height: 21px;
  line-height: 21px;
  margin-bottom: 12px;
}
.product-nav .product-nav-down {
    width: 100%;
    margin: 0 auto;
    height: 500px;
    clear: both;
    overflow-y: scroll;
}
.product-nav .product-nav-down .attr-one {
  /*width:12%;*/
  float: left;
  margin-right: 5%;
  margin-top: 10px;
}
.product-nav-down .attr-one li span {
  font-size: 16px;
  color: #3b3b3b;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.product-nav-down .attr-one > li > a:hover,
.product-nav-down .country-one > ul > li > a:hover,
.product-nav-down .country-one .subCountry li a:hover {
  color: #6659b0;
}
.product-nav-down .country-one {
  /*width:12%;*/
  float: left;
  margin-right: 5%;
  margin-top: 10px;
}
.product-nav-down .country-one h2 {
  font-size: 16px;
}
.product-nav-down .country-one ul {
  width: 100%;
}
.product-nav-down .country-one .subCountry {
  margin-left: 10px;
}
.product-nav-down .country-one ul li a {
  font-size: 16px;
  color: #3b3b3b;
  height: 40px;
  line-height: 40px;
}
.product-nav-down .country-one .subCountry li a {
  font-size: 14px;
}
.navClose {
    position: absolute;
    right: 3%;
    top: 40px;
    width: 40px;
    height: 40px;
    background: url(/static/icon/navClose.png) center center no-repeat;
    background-size: contain;
    cursor: pointer;
}
.search-btn {
    width: 50px;
    height: 34px;
    border: 1px solid #e0e0e0;
    border-left: none;
    position: absolute;
    right: -50px;
    top: 20px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    background: url(/static/Image/home/search.png) no-repeat center center #7accc8;
    background-size: 50%;
}
.search-input-box input {
    height: 34px;
    border-radius: 5px 0 0 5px;
    /* border: none; */
    padding: 0 10px;
    font-size: 16px;
    position: absolute;
    top: 20px;
    right: -50px;
    border: 1px solid #e0e0e0;
    outline: none;
}
.header-index .search-icon {
    background: url('/static/Image/home/search.png') no-repeat center center;
    background-size: contain;
}
.handle-icon {
    display: block;
    width: 28px;
    height: 28px;
    color: #cccccc;
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}
.handle-icon:hover {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
}
.handle-one {
    display: inline-block;
    position: relative;
}
</style>
