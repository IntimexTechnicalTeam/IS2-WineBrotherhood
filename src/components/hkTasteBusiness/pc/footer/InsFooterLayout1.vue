<template>
<div id="footer">
  <div class="footbg">
    <div class="footerMain">
        <div class="footerTop">
            <p>{{$t('home.HongKongLaw')}}</p>
        </div>
        <div class="footerBotttom">
          <div class="footerLeft">
            <img src="/images/pc/pcindex_09.png" alt="">
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
          <div class="footerRight">
            <!-- <div class="title">Follow Us</div>
            <div class="Follow">
              <p><img src="/images/pc/index_60.png" /></p>
              <p><img src="/images/pc/index_62.png" /></p>
              <p><img src="/images/pc/index_64.png" /></p>
            </div> -->
            <div class="title">We Accept</div>
            <div class="Follow">
              <p><img src="/images/pc/index_66.png" /></p>
              <p><img src="/images/pc/index_68.png" /></p>
              <p><img src="/images/pc/index_70.png" /></p>
            </div>
          </div>
          <div class="clear"></div>
           <p class="footercopy">
             <span>Copyright {{currentYear}} © Wine Brotherhood Hong Kong Limited. powered by intimex
               <a href="https://www.intimex.hk/" target="_blank">
               <img src="/images/pc/footerlogo.png">
               </a>
              </span>
            </p>
        </div>
    </div>
  </div>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InsFooterLayout1 extends Vue {
  currentYear: number = 0;
  footerMenus: any[] = [];
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
}
</script>

<style scoped lang="less">
/* 底部文件 */
.footbg{
  background-color: #fff;
  background-size: cover;
  width: 100%;
  display: inline-block;
  padding-bottom: 10px;
}
.footerMain{
    width: 1200px;
    margin: 0 auto;
}
.footerTop{
    text-align: center;
    padding-top: 32px;
    padding-bottom: 32px;
    width: 100%;
}
.footerTop p{
    text-align: center;
    display: inline-block;
    color: #fff;
    width: 1200px;
    margin: 0 auto;
    line-height: 26px;
    background-color: #8b0b04;
}

.footerBotttom{
    width: 100%;
}
.footerLeft{
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      float: left;
      vertical-align: middle;
      margin-right: 76px;
    }
}
.footerLeft > ul{
    float: left;
}
.footerLeft > ul >li{
    width: 100%;
    padding: 10px 0;
}
.footerLeft > ul >li >a{
    font-size:20px;
    color:#000000;
}
.footerLeft > ul >li >ul{
  width: 100%;
}
.footerLeft > ul >li >ul a{
    font-size: 16px;
    color:#000000;
    display: inline-block;
    text-transform: uppercase;
}
.footerLeft > ul >li >ul a:hover{
   transform: translateY(-3px);
}
.footerLeft p{
    width: 100%;
    display: block;
    font-size: 14px;
    color: #fff;
    padding-top: 20px;
}
.footerLeft p img{
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
}
.footerRight{
    float: right;
    width: 384px;
    text-align: center;
    .title{
      color: #8b0b04;
      font-size: 24px;
      position: relative;
      margin-bottom: 35px;
      &::after{
        content: '';
        width: 98px;
        height: 2px;
        background-color: #c68784;
        position: absolute;
        top: 12px;
        left: 0;
      }
      &::before{
        content: '';
        width: 98px;
        height: 2px;
        background-color: #c68784;
        position: absolute;
        top: 12px;
        right: 0;
      }
    }
    .Follow{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 35px;
      img{
        margin: 0 29px;
        display: block;
      }
    }
}
.footercopy{
  width: 100%;
  display: inline-block;
  margin-top: 20px;
  text-align: center;
  border-top: 2px solid #14234f;
  padding-top: 20px;
}
.footercopy span:nth-child(1){
  color:#14234f;
  font-size: 14px;
}
.footercopy span:nth-child(1) img{
  display: inline-block;
  vertical-align:middle;
  padding-left: 10px;
}
.footercopy span:nth-child(2){
  float: right;
  width: 40%;
  text-align: center;
  color:#FFF;
  font-size: 14px;
}
.footercopy span:nth-child(2) img{
  display: inline-block;
  vertical-align:middle;
  padding-left: 10px;
}
</style>
