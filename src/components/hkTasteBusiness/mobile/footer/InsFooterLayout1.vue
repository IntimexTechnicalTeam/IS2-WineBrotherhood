<template>
 <div id="footer">
    <div class="footer-box">
      <div class="footer_back">
        {{$t('home.HongKongLaw')}}
      </div>

          <div class="footerNav">
            <img src="/images/mobile/logo.png" alt="">
                  <ul>
          <li
            v-for="(item, index) in footerMenus"
            :key="index"
            class="indexMeun"
          >
            <a
              href="javascript:;"
              v-if="item.Type === -1"
              @click="toUrl(item.Url)"
            >
              {{ item.Name }}
            </a>
            <router-link v-else :to="To(item)" slot="title">
              {{ item.Name }}
            </router-link>
            <i
              :class="{ downIcon: item.showSub, upIcon: !item.showSub }"
              class="downIcon"
              @click="showMeun(item, index)"
              v-if="item.Childs && item.Childs.length > 0"
            ></i>
            <transition name="sub-comments">
              <ul
                v-show="item.showSub"
                v-if="item.Childs && item.Childs.length"
                :class="'SubMeun' + index"
              >
                <li v-for="(child, index2) in item.Childs" :key="index2">
                  <router-link :to="To(child)">{{ child.Name }}</router-link>
                  <!-- <router-link  @click.native="closeSlideMenu(item.Childs)" :to="To(item.Childs)" slot="title">
                                        <b>{{child.Name}}</b>
                                    </router-link> -->
                </li>
              </ul>
            </transition>
          </li>
        </ul>
              </div>
          <div class="footerAccept">
            <!-- <p><img src="/images/mobile/index_60.png"></p>
            <p><img src="/images/mobile/index_62.png"></p>
            <p><img src="/images/mobile/index_64.png"></p> -->
            <p><img src="/images/mobile/index_66.png"></p>
            <p><img src="/images/mobile/index_68.png"></p>
            <p><img src="/images/mobile/index_70.png"></p>
          </div>
          <div class="footerCpy">
            <p>Copyright {{currentYear}} © Wine Brotherhood Hong Kong Limited.<br>powered by Eventizer
            <a href="https://eventizer.hk/" target="_blank">
              <img src="/images/mobile/footerlogo.png">
            </a>
            </p>
          </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class InsFooter extends Vue {
  currentYear: number = 0;
  clickIndex: number = 0;
  footerMenus: any[] = [];
  // showMeun (item, index) {
  //   $('.sub' + index).slideToggle();
  // }
  showMeun (item, index) {
    this.clickIndex = index;
    item.showSub = !item.showSub;
    this.footerMenus.forEach((element, index) => {
      if (index !== this.clickIndex) {
        element.showSub = false;
      }
    });
  }
  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }
  closeSlideMenu (n) {
    this.$store.dispatch('isShowMenu', false);
  }
  To (n) {
    let url = '';
    if (n.Type === 0) {
      url = n.Url;
    } else if (n.Type === 1 && n.IsAnchor === false) {
      url = '/cms/catDetail/' + n.Value.Id;
    } else if (n.Type === 1 && n.IsAnchor === true) {
      url = '/CMS/catDetail/' + n.ParentId + '#' + n.Value.Id;
    } else if (n.Type === 2) {
      url = '/CMS/content/' + n.Value.Id;
    } else if (n.Type === 3) {
      url = '/RegNPay/Form/' + n.Value.Id;
    } else if (n.Type === 4 && !this.$store.state.catMenuType) {
      url = '/product/cat/' + n.Value.Id;
    } else if (n.Type === 4 && this.$store.state.catMenuType) {
      url =
        '/product/search/-?catalogs=' +
        JSON.stringify([parseInt(n.Value.Id)]) +
        '&type=0';
    } else if (n.Type === 5) {
      url =
        '/product/search/-?attrs=' +
        JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) +
        '&type=0';
    } else {
      url =
        '/product/search/-?attrs=' +
        JSON.stringify([
          { Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }
        ]) +
        '&type=0';
    }
    return url;

    // return n.Type === 1 && n.IsAnchor === false ? '/cms/catDetail/' + n.Value.Id : n.Type === 1 && n.IsAnchor === true ? '/CMS/catDetail/' + n.ParentId + '#' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
  // getMenu () {
  //   this.$Api.promotion.getMenu().then((result) => {
  //     console.log(result, 'FooterMenus');
  //     this.footerMenus = result.ReturnValue.FooterMenus;
  //   });
  // }
  getMenu () {
    this.$Api.promotion
      .getMenu()
      .then(result => {
        this.$store.dispatch('setFooterMenus', result.ReturnValue.FooterMenus);
        // console.log(result, 'result');
        let menus = JSON.parse(JSON.stringify(result.ReturnValue.FooterMenus));
        menus.forEach((element) => {
          element.showSub = false;
        });
        this.footerMenus = menus;
      })
      .catch(error => {
        console.log(error);
      });
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getMenu();
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    // $('.submeunMain').hide();
    let menus = JSON.parse(JSON.stringify(this.$store.state.footerMenus));
    menus.forEach((element) => {
      element.showSub = false;
    });
    this.footerMenus = menus;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// .submeunMain{
//   display: none;
// }
// .SubMeun0{
//   display: none;
// }
// .SubMeun1{
//   display: none;
// }
.sub-comments-leave-active,
.sub-comments-enter-active {
  transition: max-height 0.3s linear;
}
.sub-comments-enter,
.sub-comments-leave-to {
  max-height: 0;
  // opacity: 0;
}
.sub-comments-enter-to,
.sub-comments-leave {
  max-height: 20rem;
}
#footer{
  width: 100%;
  display: inline-block;
  .footer-box{
    width: 100%;
    margin: 0 auto;
    padding-top: 3rem;
    padding-bottom: 1rem;
    .footerCpy{
      width: 100%;
      display: inline-block;
      padding-top: 2rem;
      border-top: 2px solid #8a91a7;
      margin-top: 2rem;
      >p{
        color:#14234f;
        font-size: 1.2rem;
        text-align: center;
        img{
          width: 4rem;
          display: inline-block;
          margin-left: 1rem;
          vertical-align: middle;
        }
      }
    }
    .footerAccept{
      width: 94%;
      display: flex;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
      >p{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          display: block;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
      }
    }
    .footerNav{
      width: 90%;
      margin: 0 auto;
      margin-top: 4rem;
      margin-bottom: 2rem;
      >img{
        margin-left: auto;
        margin-right: auto;
        display: block;
      }
      >ul{
        margin-top: 2rem;
      }
      >ul>li{
        width: 100%;
        display: inline-block;
        line-height: 4rem;
        text-align: center;
        margin-bottom: 0;
        position: relative;
        overflow: hidden;
        >ul{
          position: relative;
          overflow: hidden;
        }
        >ul>li{
        width: 100%;
        display: inline-block;
        background: transparent;
        border-radius: 10px;
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        margin-bottom: .5rem;
          >a{
            font-size: 1.6rem;
            color:#000000;
            font-weight: 500;
            text-decoration: none;
          }
        }
        >a{
          font-size: 1.8rem;
          color:#000000;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          display: block;
          background: #ffffff;
          border-radius: 5px;
          margin-bottom: .5rem;
        }
        i.downIcon {
          background: url("/Images/mobile/downicon.png") no-repeat center center;
          background-size: contain;
          width: 1.4rem;
          height: 1.4rem;
          display: inline-block;
          position: absolute;
          right: 1rem;
          top: 1.4rem;
          transition: all 0.3s;
        }
        i.upIcon {
          transform: rotate(180deg);
          transition: all 0.3s;
        }
      }
    }
    .contactBox{
    width: 94%;
    margin: 0 auto;
    margin-top: 2rem;
      .contactlist{
        margin-bottom: 2rem;
        display: flex;
        .left{
          margin-right: 2rem;
        }
        .right{
          padding-top: 0.5rem;
          >p:nth-child(1){
            font-size: 1.6rem;
            text-align: left;
            color: #FFF;
            padding-bottom: .5rem;
            font-weight: bold;
          }
          >p:nth-child(2){
            font-size:1.4rem;
            text-align: left;
            color: #FFF;
            line-height: 2rem;
          }
          a{
            color: #fff;
            font-size:1.4rem;
            line-height: 2rem;
          }
        }
      }
    }
    >p{
      width:70%;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
    .footer_top{
      width: 100%;
      background: url('/Images/mobile/footerimg.png') no-repeat center center;
      background-size: cover;
      padding-bottom: 1rem;
      .title{
        position: relative;
        border-bottom: 3px solid #ffffff;
        width: 94%;
        margin: 0 auto;
        padding-top: 3rem;
        padding-left: 5px;
        box-sizing: border-box;
        &::before{
          content: '';
          width: 73px;
          height: 42px;
          background: url('/Images/mobile/footerrighticon.png') no-repeat center center;
          position: absolute;
          right: 5px;
          bottom: -3px;
        }
        h2{
          font-size: 2rem;
          color: #ffffff;
          font-weight: bold;
        }
      }
    }
    .footer_back{
      background-color: #8B0B04;
      color: #fff;
      font-size: 1.2rem;
      line-height: 2rem;
      padding: 0.5rem 1rem;
    }
  }
}
</style>
