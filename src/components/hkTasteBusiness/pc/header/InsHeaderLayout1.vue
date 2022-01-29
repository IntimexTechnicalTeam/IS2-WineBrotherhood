<template>
<div class="header-layout"  v-cloak>
  <!-- 正常菜单 -->
  <div class="headerBg" v-if="$route.path == '/'">
      <div class="headerTop fix">
        <div class="logoBox">
            <a href="/"><img src="/images/pc/pcindex_09.png"></a>
        </div>
          <div class="inner">
              <!-- 搜索框开始 -->
              <!-- <div class="search-box">
                <input type="text" v-model="key" class="inputBox" />
                <span class="searchBtn" @click="searchFun(key)"></span>
              </div> -->
              <!--搜索框结束  -->
              <!-- 会员登陆开始 -->
              <InsLogin class="memberLogin"></InsLogin>

              <!-- 购物车开始 -->
              <Shopcart class="memberLogin"></Shopcart>
              <!-- 购物车结束 -->
              <!-- 我的喜爱开始 -->
              <div class="cartTop">
                  <router-link to="/account/MyFavorite">
                          <i class="handle-icon fav-icon"></i>
                  </router-link>
              </div>
              <!-- 我的喜爱结束 -->
              <!-- 切换语言开始 -->

              <div class="langBox">
                  <InsLangSwitch></InsLangSwitch>
              </div>
              <CodeSelect/>
              <!-- 切换语言结束 -->
          </div>
      </div>
      <!-- logo开始 -->

      <!-- logo结束 -->
      <!-- 导航栏开始 -->
      <Menu />
      <!-- 导航栏结束 -->
  </div>
  <div class="headernohome" v-else>
      <div class="headerTop fix">
        <div class="logoBox">
            <a href="/"><img src="/images/pc/pcindex_09.png"></a>
        </div>
        <!-- 导航栏开始 -->
      <Menu />
      <!-- 导航栏结束 -->
          <div class="inner">
              <!-- 搜索框开始 -->
              <!-- <div class="search-box">
                <input type="text" v-model="key" class="inputBox" />
                <span class="searchBtn" @click="searchFun(key)"></span>
              </div> -->
              <!--搜索框结束  -->
              <!-- 会员登陆开始 -->
              <InsLogin class="memberLogin"></InsLogin>

              <!-- 购物车开始 -->
              <Shopcart class="memberLogin"></Shopcart>
              <!-- 购物车结束 -->
              <!-- 我的喜爱开始 -->
              <div class="cartTop">
                  <router-link to="/account/MyFavorite">
                          <i class="handle-icon fav-icon"></i>
                  </router-link>
              </div>
              <!-- 我的喜爱结束 -->
              <!-- 切换语言开始 -->

              <div class="langBox">
                  <InsLangSwitch></InsLangSwitch>
              </div>
              <CodeSelect/>
              <!-- 切换语言结束 -->
          </div>
      </div>

      <!-- logo结束 -->

  </div>
  <!-- 正常菜单结束 -->

  <!-- 固定菜单 -->
  <div class="header-default">
      <div class="headerTop fix">
        <div class="logoBox">
            <a href="/"><img src="/images/pc/pcindex_09.png"></a>
        </div>
        <!-- 导航栏开始 -->
      <Menu />
      <!-- 导航栏结束 -->
          <div class="inner">
              <!-- 搜索框开始 -->
              <!-- <div class="search-box">
                <input type="text" v-model="key" class="inputBox" />
                <span class="searchBtn" @click="searchFun(key)"></span>
              </div> -->
              <!--搜索框结束  -->
              <!-- 会员登陆开始 -->
              <InsLogin class="memberLogin"></InsLogin>

              <!-- 购物车开始 -->
              <Shopcart class="memberLogin"></Shopcart>
              <!-- 购物车结束 -->
              <!-- 我的喜爱开始 -->
              <div class="cartTop">
                  <router-link to="/account/MyFavorite">
                          <i class="handle-icon fav-icon"></i>
                  </router-link>
              </div>
              <!-- 我的喜爱结束 -->
              <!-- 切换语言开始 -->

              <div class="langBox">
                  <InsLangSwitch></InsLangSwitch>
              </div>
              <CodeSelect/>
              <!-- 切换语言结束 -->
          </div>
      </div>

      <!-- logo结束 -->

  </div>
  <!-- 固定菜单结束 -->
  <div class="clear"></div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import $ from 'jquery';
@Component({
  components: {
    Menu: () =>
      import('@/components/business/pc/header/InsMenu.vue'),
    Shopcart: () =>
      import('@/components/business/pc/header/InsShoppingCart.vue'),
    InsLogin: () =>
      import('@/components/business/pc/header/InsLogin.vue'),
    InsLangSwitch: () =>
      import('@/components/business/pc/header/InsLangSwitch.vue'),
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
  private fixedBar:boolean = false;
  private logoHide:boolean = true;
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
    return this.$i18n.locale;
  }
  private changLange (lang) {
    this.$Api.member
      .setUILanguage(lang)
      .then(result => {
        this.$i18n.locale = lang;
        localStorage.setItem('locale', lang);
        this.Reload();
      })
      .catch(error => {
        console.log(error);
      });
  }
  created () {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    addEventListener('scroll', () => {
      var _this = this;
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop >= 100) {
        $('.header-default').slideDown(300);
      } else {
        $('.header-default').fadeOut(300);
      }
    }, false);
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.showMenberCentral = false;
    this.search = false;
  }
  @Watch('ShopCart')
  onShopCartChange () {
    this.ShopCart.then((result) => {
      this.count = result.ShopCart.Qty;
    });
  }
  mounted () {
    this.getMenu();
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header-default {
  position: relative;
  width: 100%;
  background-color: #8b0b04;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  box-shadow: 0 0 10px 0 #d4d5d1;
  display:none;
   width: 100%;
   background-size: cover;
   padding-bottom: 10px;
   .logoBox{
      float: left;
      display: inline-block;
      width: auto;
   }
   .headerTop {
     padding-top: 5px;
     /deep/.header_menu{
      width: auto;
      float: left;
      margin-top: 20px;
      margin-left: 20px;
      >ul>li{
        a{
          font-weight: 500;
          padding: 10px 30px;
        }
      }
    }
    .inner{
      float: right;
      position: initial;
      margin-top: 20px;
      .memberLogin{
        margin-right: 40px;
      }
      .cartTop{
        margin-right: 40px;
      }
    }
   }

}
.headernohome{
  position: relative;
  width: 100%;
  background-color: #8b0b04;
  z-index: 9999;
  box-shadow: 0 0 10px 0 #d4d5d1;
   width: 100%;
   background-size: cover;
   padding-bottom: 10px;
   .logoBox{
      float: left;
      display: inline-block;
      width: auto;
   }
   .headerTop {
     padding-top: 5px;
     /deep/.header_menu{
      width: auto;
      float: left;
      margin-top: 20px;
      margin-left: 20px;
      >ul>li{
        a{
          font-weight: 500;
          padding: 10px 30px;
        }
      }
    }
    .inner{
      float: right;
      position: initial;
      margin-top: 20px;
      .memberLogin{
        margin-right: 40px;
      }
      .cartTop{
        margin-right: 40px;
      }
    }
   }
}
.showMenuYes{
  height:151px;
  transition:all 1s;
}
#header{
  z-index: 9999;
  top:0px;
  width: 100%;
  display: flex;
}
.headerBg{
   width: 100%;
  //  background:#fff;
   display: inline-block;
  //  box-shadow: 0 0 10px 0 #d4d5d1;
   min-height: 253px;
   position: relative;
}
.headerTop{
    width: 1200px;
    margin: 0 auto;
    padding-top: 30px;
    // height: 34px;
    position: relative;
}
.headerTop .inner{
    // float: right;
    position: absolute;
    right: 0;
    top: 36px;
}
.search-box {
    border: 1px solid #808080;
    width: 340px;
    display: flex;
    float: left;
    align-items: center;
    margin-right: 20px;
}
.searchBtn{
    width: 25px;
    height: 25px;
    display: inline-block;
    background: url('/images/pc/pcindex_03.png') no-repeat center center;
    background-size: 100%;
    cursor: pointer;
}
.search-box .inputBox {
    width: 305px;
    float: left;
    border:none;
    background: transparent;
    line-height: 30px;
    text-indent: 10px;
}
.search-box  .btn-send {
    position: absolute;
    right: 10px;
    top: 6px;
    line-height: 1;
    background: none;
    border: none;
    color: #555;
}
.search-box form {
    position: relative;
    font-size: 12px;
}
.search-box input {
    font-family: inherit;
    font-size: inherit;
    font-style: inherit;
    font-weight: inherit;
    outline: 0;
}
.memberLogin{
    display: flex;
    float: left;
    align-items: center;
    position: relative;
    margin-right: 65px;
    padding-top: 5px;
}
.cartTop{
    display: flex;
    float: left;
    align-items: center;
    position: relative;
    margin-right: 65px;
    padding-top: 5px;
}
.langBox{
    display: flex;
    float: left;
    align-items: center;
    position: relative;
    justify-content: center;
    // margin-left: 20px;
    /deep/ .langSwitch select{
      text-align: left;
      font-weight: bold;
    }
}
.langBox a{
   color:#323232;
   font-size: 14px;
    line-height: 32px;
    margin-right: 10px;
    width: 40px;
    display: inline-block;
    text-align: center;
}
.langBox a:nth-child(2){
    margin-right: 0px!important;
}
.langActive{
    background: #808080;
    color:#FFF!important;
}
.logoBox{
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logoBox a{
    display: flex;
}
.logoBox a img{
   width: 116px;
}
.header-default, .headernohome{
  .logoBox a img{
    width: 78px;
  }
}
.fav-icon {
    background: url('/images/pc/pcindex_08.png') no-repeat center center;
    display: inline-block;
    width: 25px;
    height: 25px;
    background-size: contain;
}

// new css
.header-layout {
 /deep/ .header_menu {
   width: 1200px;
   margin: 30px auto 10px;
   > ul {
     > li {
      // float: left;
      display: flex;
      align-items: center;
      position: relative;
      width: auto;

      > a {
        width: 100%;
        font-size: 16px;
        color: #fff;
        display: block;
        text-align: center;
        font-weight: bold;
        // text-transform:
        padding: 10px 38px;
      }

      &:hover{
        > a  {
          background: @base_color;
          color: #fff;
        }
      }

      ul {
        box-shadow: 0 0 5px #ccc;

        li {
          border: 0;
          > a {
            font-size: 18px;
            color: #666666;
            display: block;
            text-align: center;
            font-weight: 500;
            text-transform: uppercase;
            padding: 10px 5px;
          }

          &:hover{
             > a {
              background: @base_color;
              color: #fff;
            }
          }
        }
      }
     }
   }
 }
}
</style>
