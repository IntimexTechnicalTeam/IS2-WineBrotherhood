<template>
 <div id="footer">
    <div class="footer-box">
          <p><img src="/images/mobile/logo_white.png"></p>
          <div class="contactBox">
              <div class="w50">
                  <p>whatsapp&nbsp;{{$t('home.Order')}}</p>
                  <p>6289 1789</p>
              </div>
              <div class="w50">
                  <p>{{$t('home.TelSearch')}}</p>
                  <p>6289 1789</p>
              </div>
          </div>
          <div class="footerNav">
                  <ul>
                      <li v-for="(item,index) in footerMenus" :key="index" class="indexMeun">
                          <a href="javascript:;">{{item.Name}}<i class="downIcon" @click="showMeun(item,index)"></i></a>
                          <ul v-if="item.Childs && item.Childs.length"  class="submeunMain" :class="'sub'+index">
                              <li v-for="(child,index2) in item.Childs" :key="index2">
                                  <router-link :to="To(child)">{{child.Name}}</router-link>
                                  <!-- <router-link  @click.native="closeSlideMenu(item.Childs)" :to="To(item.Childs)" slot="title">
                                      <b>{{child.Name}}</b>
                                  </router-link> -->
                              </li>
                          </ul>
                      </li>
                  </ul>
              </div>
          <div class="footerAccept">
            <p>{{$t('home.Weaccept')}}<img src="/images/mobile/pcindex_15.png"></p>
          </div>
          <div class="footerCpy">
            <p>Copyright {{currentYear}} © Style3<br>powered by intimex
            <a href="https://www.intimex.hk/" target="_blank">
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
  showMeun (item, index) {
    $('.sub' + index).slideToggle();
  }
  closeSlideMenu (n) {
    this.$store.dispatch('isShowMenu', false);
  }
  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.footerMenus = result.ReturnValue.FooterMenus;
    });
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getMenu();
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    $('.submeunMain').hide();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.submeunMain{
  display: none;
}
.SubMeun0{
  display: none;
}
.SubMeun1{
  display: none;
}
#footer{
  width: 100%;
  background: url('/images/mobile/MobileIndex_04.jpg') no-repeat center center;
  background-size: cover;
  display: inline-block;
  .footer-box{
    width: 90%;
    margin: 0 auto;
    padding-top: 3rem;
    padding-bottom: 1rem;
    .footerCpy{
      width: 100%;
      display: inline-block;
      margin-top: 2rem;
      >p{
        color:#FFF;
        font-size: 1.2rem;
        text-align: center;
        img{
          width: 1.5rem;
          display: inline-block;
          margin-left: 1rem;
          vertical-align: middle;
        }
      }
    }
    .footerAccept{
      width: 100%;
      >p{
        font-size: 1.4rem;
        color:#fff;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          display: block;
          margin-left: 1rem;
        }
      }
    }
    .footerNav{
      width: 80%;
      margin: 0 auto;
      margin-top: 2rem;
      margin-bottom: 2rem;
      >ul>li{
        width: 100%;
        display: inline-block;
        line-height: 4rem;
        text-align: center;
        margin-bottom: 1rem;
        position: relative;
        >ul{
          position: relative;
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
            color:#fff;
            font-weight: 500;
            text-decoration: none;
          }
        }
        >a{
          font-size: 1.8rem;
          color:#333333;
          font-weight: 500;
          text-decoration: none;
          position: relative;
          display: block;
          background: #ffffff;
          border-radius: 5px;
          margin-bottom: .5rem;
          i{
               background: url('/Images/mobile/downicon.png') no-repeat center center;
               background-size: contain;
               width: 1.2rem;
               height: 1.2rem;
               display: inline-block;
               position: absolute;
               right: 1rem;
               top: 1.4rem;
          }
        }
      }
    }
    .contactBox{
    width: 100%;
    display: inline-block;
    margin-top: 2rem;
      .w50{
        width: 50%;
        float: left;
        >p:nth-child(1){
          font-size: 1.4rem;
          text-align: center;
          color: #FFF;
          padding-bottom: .5rem;
        }
        >p:nth-child(2){
            font-size:2.2rem;
            text-align: center;
            color: #FFF;
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
  }
}
</style>
