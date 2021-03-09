<template>
    <div class="menu_warpper">
        <div id="menu">
            <Menu :backColor="'transparent'" :textColor="'rgba(0,0,0,0.8)'" :uniqueOpened="true" defaultActive="true" />
            <div class="menu_footer">
                <div class="img_warpper">
                    <router-link to="/account/myFavorite" ><img src="/static/Image/home/love.png" @click="closeSlideMenu"/></router-link>
                    <router-link to="/account/shoppingcart" ><img src="/static/Image/home/cart.png" @click="closeSlideMenu"/></router-link>
                    <div class="switch_lang" @click="showLang = !showLang">
                        {{$t('lang')}}
                        <div class="lang_flow" v-show="showLang">
                            <div @click="changLange('E')">{{$t('Register.UserLanguageE')}}</div>
                            <div @click="changLange('C')">{{$t('Register.UserLanguageT')}}</div>
                        </div>
                    </div>
                </div>
                <p>© {{currentYear}} EdToys 版权所有 Powered by Eventizer</p>
                <p> Operated and Owned by Eventizer Limited</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component({
  components: {
    Menu: () => import('@/components/business/mobile/header/InsElMenu.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  searchKey: string = '';
  private now:Date = new Date();
  private showLang:boolean = false;
  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }

  private changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      // console.log(this.hhh, this.$t('test'),'test');
      localStorage.setItem('locale', lang);
      // this.$store.dispatch('setLang', lang);
      this.Reload();
      this.closeSlideMenu();
    }).catch((error) => {
      console.log(error);
    });
  }

  search () {
    // this.$store.dispatch('setSearchKey', this.searchKey);
    this.closeSlideMenu();
    this.$router.push({ path: `/product/search/${this.searchKey}` });
    this.searchKey = '';
  }
  get currentYear () {
    return this.now.getFullYear();
  }
}
</script>

<style lang="less">
#menu {
    .el-submenu__icon-arrow {
        display: none;
    }

    .el-submenu__title {
        height: auto;
        line-height: unset;
        padding: 0 !important;
    }

    > .el-menu {
        width: 55%;
        margin: 0 auto;
        background-color: transparent;
        border: 0;

        .el-submenu__icon-arrow {
            display: none;
        }

        > li {
            border: 1px solid #fff;
            // color: rgb(255, 255, 255);
            // background-color: @primary_color;
            height: auto;
            line-height: unset;
            margin-bottom: 10px;
            text-align: center;

            span, a {
                padding: 12px;
                display: block;
                // color: rgb(255, 255, 255);
            }

            a {
                text-decoration: none;
            }
        }

        li {
            line-height: unset;
            padding: 0 !important;
            min-width: unset;
        }
    }
}
</style>

<style scoped lang="less">
.menu_warpper{
    padding-top: 11.5rem;
    min-height: calc(100vh - 115px);
    // position: relative;
    .menu_footer{
        position: fixed;
        bottom: 0;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
        z-index: 999;

        text-align: center;
        line-height: 1.5rem;
        background-color: #ffffff;
        .img_warpper{
            margin: 1.5rem 0;
            img{
                width: 2rem;
                vertical-align: middle;
                margin: 0 1rem;
            }
            .switch_lang{
                font-size: 1rem;
                display: inline-block;
                vertical-align: middle;
                margin: 0 1rem;
                position: relative;
                .lang_flow{
                    position: absolute;
                    background-color: white;
                    white-space:nowrap;
                    font-size: 1rem;
                    line-height: 3rem;
                    margin-top: -1rem;
                    top: 0;
                    transform: translateY(-100%);
                    div{
                        background-color: rgba(230, 230, 230, 1);
                        margin: 2px;
                        border-radius: 1px;
                        min-width: 8rem;
                    }
                }
                .lang_flow::after{
                    content: ' ';
                    position: absolute;
                    border-top: 1rem solid rgba(230, 230, 230, 1);
                    border-bottom: 1rem solid transparent;
                    border-left: 1rem solid transparent;
                    border-right: 1rem solid transparent;
                    bottom: 2px;
                    left: 2px;
                    transform: translateY(100%);
                }
            }
        }
        // padding-bottom: 1rem;
    }
}
.bar {
    height: 10px;
    background: #000;
}

#langSwitch {
    margin: 10px 0;
    text-align: center;

    .btn {
        display: inline-block;
        width: 10rem;
        height: 2.5rem;
        line-height: 2.5rem;
        color: #1b1b1b;
        text-align: center;
        background-color: #ffffff;
        margin-bottom: 5px;
        font-size: 1rem;
        border-radius: 8px;

        a {
            display: inline-block;
            color: #1b1b1b;
            font-weight: 400;
            font-size: 1.1rem;
            line-height: 2.3rem;
            width: 2rem;
            text-decoration: none;
        }
    }
}

#search {
    text-align: center;

    .search-btn {
        height: 33px;
        width: 43px;
        background-image: url(../../../../assets/Images/forweb/searchbtn.png);
        background-repeat: no-repeat;
        background-position: center center;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }

    input {
        -webkit-appearance: none;
        border: none;
        width: 14rem;
        height: 32px;
        line-height: 32px;
        font-size: 1.2rem;
        outline: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 1.5rem;
        color: #333;
        border-radius: 8px;
        vertical-align: middle;
    }
}

#memberHandle {
    text-align: center;
    margin: 20px 0;

    .handle-one {
        position: relative;
        display: inline-block;

        .handle-one-btn {
            display: block;
            color: #e691b4;
            font-size: 1rem;
            text-align: center;
            line-height: 1.5rem;
            font-weight: bold;
            width: 50px;
            height: 25px;

            &.handle-member {
                background: url(../../../../assets/Images/member-icon.png) no-repeat center center;

                .mobile-member-menu {
                    position: absolute;
                    background-color: #fff;
                    z-index: 99;
                    left: -5rem;
                    top: 2.5rem;
                    border-radius: 5px;
                    box-shadow: 0 0 3px #333;

                    a {
                        display: inline-block;
                        color: #000;
                        padding: 0.5rem 0;
                        width: 16rem;
                        height: auto;
                        text-align: center;
                        font-size: 1.1rem;
                        text-decoration: none;
                    }
                }
            }

            &.handle-cart {
                background: url(../../../../assets/Images/cart-icon.png) no-repeat center center;

                b {
                    position: absolute;
                    background-color: #000;
                    font-size: 0.6rem;
                    width: 1.2rem;
                    height: 1.2rem;
                    line-height: 1.2rem;
                    border-radius: 50%;
                    color: #fff;
                    left: 2.9rem;
                    top: -0.7rem;
                }
            }
        }
    }
}
</style>
