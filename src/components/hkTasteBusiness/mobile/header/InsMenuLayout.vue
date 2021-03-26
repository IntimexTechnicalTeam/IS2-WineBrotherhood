<template>
    <div>
        <div class="header_logo" v-if="!this.FrontE.slideMenu.Embedded">
            <i class="el-icon-close" @click="closeSlideMenu"></i>
        </div>
        <div class="header_top fix">
            <CodeSelect class="header-code" />
            <img class="close-meun" src="/images/mobile/out.png" @click="showSlideMenu" v-show="this.$store.state.isShowMenu"  />
        </div>
        <!-- <div class="searchBox">
            <input type="text" v-model="searchKey" />
            <span class="search_btn"  @click="searchFun(searchKey)"><img src="/images/mobile/searchbtn.png"></span>
        </div> -->
        <div id="menu">
            <Menu :backColor="'@base_color'" :textColor="'#fff'" :uniqueOpened="true" />
        </div>
        <div class="menu_footer">
            <div class="innerShare">
                <ins-lang-switch class="headerLang" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/mobile/InsLogo.vue'),
    Menu: () => import('@/components/business/mobile/header/InsElMenu.vue'),
    InsLangSwitch: () => import('@/components/business/mobile/header/InsLangSwitch.vue'),
    CodeSelect: () => import('@/components/business/mobile/header/InsCodeSelect.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  searchKey: string = '';

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
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
      this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
      this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    }
  }

  get user () {
    return this.$store.state.user;
  }

  get isLogin () {
    return this.$store.state.isLogin;
  }
  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }
  get menuShow () {
    return this.$store.state.isShowMenu;
  }
}
</script>

<style lang="less">
.sidebar-container {
    background-color: #fff !important;
}
.menu_footer span{
    display: flex;
    float: left;
    border:1px solid #eee;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    font-size: 1.4rem;
}
.innerShare{
    width: 90%;
    margin: 0 auto;
    display: flex;
    margin-top: 2rem;
    padding-bottom: 5rem;
    align-items: left;
    justify-content: left;
}
.innerShare a {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
}
.innerShare a img {
    width: 3rem;
}
.searchBox{
    width: 90%;
    height: 4rem;
    margin: 0 auto;
    margin-top: 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    border:1px solid #666666;
    input{
        width: calc(100% - 10px);
        height: 4rem;
        margin: 0 auto;
        text-indent: 10px;
        border:none;
    }
    .search_btn{
        position: absolute;
        right: 0px;
        top:0rem;
        width: 4rem;
        height: 4rem;
        background: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 50%;
            margin: 0 auto;
            display: block;
        }
    }
}
#menu {
    .el-submenu__icon-arrow {
        display: none;
    }

    .el-submenu__title {
        padding-top: 1rem !important;
        padding-bottom: 1rem !important;
        height: auto!important;
        line-height: unset;
        box-sizing: border-box;
        border-bottom:1px solid #8b0b04;
        text-align: left;
        padding-left: 1rem !important;
        background-color: #fff !important;
        .name{
            font-size: 1.6rem!important;
            color:#8b0b04;
        }
    }

    .el-menu {
        width: 90%;
        margin: 0 auto;
        background-color: transparent;
        border: 0;
        margin-bottom: 1rem;
        margin-top: 1rem;
        .el-submenu__icon-arrow {
            display: block;
            font-size: 1.6rem;
            color: #8b0b04;
        }

        > li {
            height: auto;
            line-height: unset;
            text-align: center;
             >a {
                color:#8b0b04;
                background: #fff;
                background-size: 100% 100%;
                display:block;
                width: 100%;
                padding-top: 1rem;
                padding-bottom: 1rem;
                margin: 0 auto;
                border-bottom:1px solid #8b0b04;
                font-weight: 500;
                box-sizing: border-box;
                padding-left: 1rem;
                text-align: left;
                 b{
                     color:#8b0b04;
                     display: block;
                     width: 100%;
                     font-weight: 500;
                     font-size: 1.4rem;
                 }
            }

            a {
                text-decoration: none;
            }
            &:nth-child(1) a{
                border-top: 1px solid #8b0b04;
            }
        }

        li {
            line-height: unset;
            padding: 0 !important;
            min-width: unset;
        }
    }
}
#menu .is-opened > .el-submenu__title{
    background: #fff!important;
    color:#8b0b04!important;
    .name{
        color:#8b0b04!important;
    }
}
#menu .is-opened > .el-submenu__title .el-submenu__icon-arrow{
    color:#8b0b04!important;
}
</style>

<style scoped lang="less">
.header_logo {
    height: 7rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 1.5rem;
    border-bottom: 4px solid #acbd30;
    background-color: #fff;

    .el-icon-close {
        color: #777777;
        font-size: 2.8rem;
    }

    a {
        width: 12rem;
    }

    .slide-menu {
        cursor: pointer;
    }
}

/deep/ .langSwitch {
    p {
        font-size: 1.5rem;
        display: inline-block;
        color: #8b0b04;
        margin: 0 0.8rem;
        border: 1px solid #8b0b04;
        background: #fff;
        font-size: 1.5rem;
        line-height: 30px;

        &.active {
            color: #fff;
            background-color: #8b0b04;
            border: 1px solid #8b0b04;
            font-weight: bold;
            font-size: 1.5rem;
            line-height: 30px;
        }
    }
}
.header_top{
    width: 90%;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 2rem;
    /deep/ .header-code{
        float: left;
        width: 90px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #8b0b04;
        border-radius: 16px;
        margin-top: 3px;
        position: relative;
        &::before{
            content: '';
            width: 1px;
            height: 24px;
            background-color: #8b0b04;
            position: absolute;
            right: 32px;
            top: 4px;
        }
    }
    .close-meun{
        float: right;
        width: 30px;
        height: 30px;
    }
}
</style>
