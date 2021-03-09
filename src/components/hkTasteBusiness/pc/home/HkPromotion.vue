<template>
  <!-- 商品推荐开始 -->
    <div class="indexMiddle">
    <div class="indexRecommend">
      <div class="indexRecommendInner">
        <div class="RecommendText">{{Title1}}</div>
        <div class="RecommendBg">
            <swiper :options="swiperOptionT1">
              <!-- slides -->
                <swiperSlide v-for="(slide, index1) in banner1" :key="index1" >
                  <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
                </swiperSlide>
            </swiper>
        </div>
        <p>{{content1}}</p>
      </div>
      <div class="indexRecommendInner">
           <div class="RecommendText">{{Title2}}</div>
          <div class="RecommendBg">
            <swiper :options="swiperOptionT1">
              <!-- slides -->
              <swiperSlide v-for="(slide, index2) in banner2" :key="index2">
                <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
              </swiperSlide>
            </swiper>
        </div>
        <p>{{content2}}</p>
      </div>
      <div class="indexRecommendInner">
         <div class="RecommendText">{{Title3}}</div>
        <div class="RecommendBg">
            <swiper :options="swiperOptionT1">
              <!-- slides -->
              <swiperSlide v-for="(slide, index3) in banner3" :key="index3">
                <router-link :to="slide.Url"><img :src="slide.Image" /></router-link>
              </swiperSlide>
            </swiper>
        </div>
        <p>{{content3}}</p>
      </div>
    <!-- 商品推荐结束 -->
    <div class="clear"></div>
    <!-- 限时平卖开始 -->
    <HkHotProduct />
    <!-- 限时平卖结束 -->
  </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    HkHotProduct: () => import(/* webpackChunkName: "home" */ '@/components/hkTasteBusiness/pc/home/HkHotProduct.vue'),
    swiper,
    swiperSlide
  }
})
export default class HkPromotion extends Vue {
  banner1: any[] = [];
  banner2: any[] = [];
  banner3: any[] = [];
  content1:string='';
  content2:string='';
  content3:string='';
  Title1:string='';
  Title2:string='';
  Title3:string='';
  current:boolean=false;
  swiperOptionT1: object = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s1-next',
      prevEl: '.s1-prev'
    }
  };
  swiperOptionT2: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s2-next',
      prevEl: '.s2-next'
    }
  };
  swiperOptionT3: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.s3-next',
      prevEl: '.s3-next'
    }
  };
  el:number=0;
  getHeaderBannerLst () {
    var _this = this;
    this.$Api.promotion.getPromotion('Home', 1).then(result => {
      _this.banner1 = result.Promotion._BannerList;
      _this.Title1 = result.Promotion.Name;
      _this.content1 = result.Promotion._BannerList[0].Content;
    });
    this.$Api.promotion.getPromotion('Home', 2).then(result => {
      _this.banner2 = result.Promotion._BannerList;
      _this.Title2 = result.Promotion.Name;
      _this.content2 = result.Promotion._BannerList[0].Content;
    });
    this.$Api.promotion.getPromotion('Home', 3).then(result => {
      _this.banner3 = result.Promotion._BannerList;
      _this.Title3 = result.Promotion.Name;
      _this.content3 = result.Promotion._BannerList[0].Content;
    });
  }
  created () {
    this.getHeaderBannerLst();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
}
</script>
<style>
.indexMiddle  .swiperInner{
  padding: 10px;
}
</style>
<style lang="less" scoped>
.RecommendText{
  background: #4d4d4d;
  color:#fff;
  border:2px solid #999999;
  display: block;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
.indexMiddle{
    min-height: 1122px;
    width: 100%;
    background: url('/images/pc/pcindex_01.jpg') no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    padding-top: 125px;
    padding-bottom: 160px;
    position: relative;
    margin-top: -5px;
}
.indexRecommend{
    width: 1200px;
    margin: 0 auto;
}
.indexRecommendInner{
    width: 30%;
    float: left;
    margin-right: 5%;
}
.indexRecommendInner:nth-child(3){
    margin-right: 0%!important;
}
.RecommendTitle1{
    width: 100%;
    background: url('/images/pc/index_18.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle1_E{
    width: 100%;
    background: url('/images/pc/hotpotE.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle2{
    width: 100%;
    background: url('/images/pc/index_19.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle2_E{
    width: 100%;
    background: url('/images/pc/BBQE.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle3{
    width: 100%;
    background: url('/images/pc/index_21.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendTitle3_E{
    width: 100%;
    background: url('/images/pc/dishE.png') no-repeat center center;
    height: 83px;
    background-size: 100%;
}
.RecommendBg{
    width: 100%;
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border:1px solid #4d4d4d;
}
.RecommendBg img{
  width: 100%;
}

.indexRecommendInner p{
    text-align: center;
    color: #806339;
    font-size: 36px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: block;
}
</style>
