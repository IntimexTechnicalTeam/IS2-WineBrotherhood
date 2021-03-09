<template>
  <div id="screen">
    <div class="attach_box" v-for="(b,index) in bannerFirstPart" :key="index">
      <div class="attach_one pkone"   v-bind:style="{'background-image':'url('+b.Image+')'}"></div>
      <div class="attach_one_in_wrap">
        <div class="attach_one_in">
          <p>{{b.Title}}{{b.check}}</p>
          <p>{{b.Intro}}</p>
          <a :href="b.Url">SHOP</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { MobilescrollPage } from '@/assets/js/roll.js';
@Component
export default class PkPromotionOne extends Vue {
  bannerFirstPart: any[] = [];
  bannerSecondPart: any[] = [];
  current:boolean=false;
  el:number=0;
  getHeaderBannerLst () {
    var _this = this;
    var page = 'Home';
    this.$Api.promotion.getPromotion('Home', 1).then(result => {
      _this.bannerFirstPart = result.Promotion._BannerList.slice(0, 2);
      _this.bannerFirstPart.forEach(function (item) {
        var colon = item.Content.indexOf('*');
        var a = item.Content.substring(0, item.Content.indexOf('*'));
        var b = item.Content.substr(
          item.Content.indexOf('*') + 1,
          item.Content.length
        );
        _this.$set(item, 'Title', a);
        _this.$set(item, 'Intro', b);
      });
    });
  }
  created () {
    this.getHeaderBannerLst();
  }
  mounted () {
    MobilescrollPage();
  }
}
</script>
<style lang="less" scoped>
#screen {
  overflow: hidden;
}
.backface{
  background-size:100%!important;
}
#screen > img {
  width: 100%;
}
#screen .attach_one {
  width: 100%;
  height: 18rem;
  background-size: 130%;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: background-size 2s ease-out;
  -moz-transition: background-size 2s ease-out;
  -webkit-transition: background-size 2s ease-out;
}
#screen .attach_one:nth-of-type(1) {
  justify-content: flex-start;
  width: 100%;
}
#screen .attach_one:nth-of-type(2) {
  justify-content: flex-end;
}

#screen .attach_one:nth-of-type(4) {
  justify-content: flex-end;
}
#screen .attach_one:nth-of-type(5) {
  justify-content: flex-start;
}
#screen .attach_one:nth-of-type(6) {
  justify-content: flex-end;
}
.attach_box {
  width: 100%;
  overflow: hidden;
}
.attach_one .attach_one_in {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  align-content: space-between;
  transition: margin-top 2s ease-out;
  -moz-transition: margin-top 2s ease-out;
  -webkit-transition: margin-top 2s ease-out;
  margin-top: 330px;
}
.attach_one .attach_one_in {
  width: 100%;
}
.attach_one_in p {
  width: 90%;
  margin: 0 auto;
}
.attach_one_in p:nth-child(1) {
  font-size: 2.5rem;
  color: #1b1b1b;
}
.attach_one_in p:nth-child(2) {
  font-size: 1.6rem;
  color: #1b1b1b;
  text-align: justify;
}
.attach_one_in a {
  display: block;
  width: 40%;
  height: 3rem;
  border: 2px solid #fff;
  text-align: center;
  line-height: 3rem;
  font-size: 1.6rem;
  color: #fff;
  background: #f6a139;
  text-decoration: none;
  margin-left: 5%;
  margin-bottom: 2rem;
  margin-top: 1rem;
}
.attach_one_in_wrap {
  overflow: hidden;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
