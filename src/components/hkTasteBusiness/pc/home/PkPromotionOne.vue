<template>
  <div id="screen">
      <div
        class="attach_one"
        v-for="(b,index) in bannerFirstPart"
        :key="index"
        v-bind:style="{'background-image':'url('+b.Image+')'}"
      >
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
<script>

</script>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import {scrollPage} from '@/assets/js/roll.js';
@Component
export default class PkPromotionOne extends Vue {
  bannerFirstPart: any[] = [];
  bannerSecondPart: any[] = [];
  current: boolean = false;
  el: number = 0;
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
  getIndex (index) {
    console.log(index);
  }
  created () {
    this.getHeaderBannerLst();
  }
  mounted () {
    scrollPage();
    // window.addEventListener('scroll', this.scrollEvent, true);

  }
}
</script>
<style lang="less" scoped>
#screen > div {
  width: 100%;
}
#screen .attach_one {
  background-size: 130%;
  height: 50vh;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: background-size 2s ease-out;
  -moz-transition: background-size 2s ease-out;
  -webkit-transition: background-size 2s ease-out;
}
#screen .attach_one:nth-child(n) {
  justify-content: flex-start;
  padding-left: 17%;
}
#screen .attach_one:nth-of-type(2n) {
  justify-content: flex-end;
  padding-right: 10%;
}
.attach_one .attach_one_in {
  height: 310px;
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
  width: 600px;
}
.attach_one_in p {
  width: 100%;
  text-align: center;
}
.attach_one_in p:nth-child(1) {
  font-size: 50px;
  color: #fff;
}
.attach_one_in p:nth-child(2) {
  font-size: 22px;
  color: #fff;
  text-align: center;
}
.attach_one_in a {
  display: block;
  width: 280px;
  height: 60px;
  border: 2px solid #fff;
  text-align: center;
  line-height: 60px;
  font-size: 32px;
  color: #fff;
}
.attach_one_in_wrap {
  height: 340px;
  overflow: hidden;
}
</style>
