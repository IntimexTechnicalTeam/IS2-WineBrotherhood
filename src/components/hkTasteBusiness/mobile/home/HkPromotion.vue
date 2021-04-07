<template>
  <div class="PromotionMain">
    <div class="SalesMain">
          <HkHotProduct />
    </div>
    <!-- <div class="Category">
      <div class="main fix">
        <div v-for="(item, index) in catalogs" :key="index">
          <div class="title">{{item.Name}}</div>
          <div class="Categorylist" v-for="(slide, index1) in item.Children" :key="index1">
            <div class="Categorybox">
              <router-link :to="'/product/search/-?catalogs=[' + slide.Id + ',' + slide.Id + ']&type=1'">
                <img :src="slide.ImgB" alt="">
                <div class="title">
                  <h2>{{slide.Name}}</h2>
                </div>
              </router-link>
            </div>
          </div>
          <div class="Categorylist">
            <PkCate />
          </div>
        </div>
      </div>
      <div class="more">
        <router-link to="/product/search/-">{{$t('home.ShopAll')}}</router-link>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
import Catalogs from '@/model/Catalogs';
@Component({
  components: {
    HkHotProduct: () => import('@/components/hkTasteBusiness/mobile/home/HkHotProduct.vue'),
    PkCate: () => import('@/components/hkTasteBusiness/mobile/home/PkCate.vue'),
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
  private catalogs: Catalogs[] = [];
  productCate:any[]=[];

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
      _this.Title1 = result.Promotion.Desc;
      _this.content1 = result.Promotion._BannerList[0].Content;
    });
    this.$Api.promotion.getPromotion('Home', 2).then(result => {
      _this.banner2 = result.Promotion._BannerList;
      _this.Title2 = result.Promotion.Desc;
      _this.content2 = result.Promotion._BannerList[0].Content;
    });
    this.$Api.promotion.getPromotion('Home', 3).then(result => {
      _this.banner3 = result.Promotion._BannerList;
      _this.Title3 = result.Promotion.Desc;
      _this.content3 = result.Promotion._BannerList[0].Content;
    });
  }
  getAttrList() {
    this.$Api.product.getAttrList2().then(result => {
      this.catalogs = this.catalogs.concat(result.Catalogs);
      console.log(this.catalogs, 'result产品根目录');
    });
  }
  getProductCate () {
    this.$Api.product.getAttrList().then(result => {
      this.productCate = result[0].Children;
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  created () {
    // this.getHeaderBannerLst();
    this.getAttrList();
    this.getProductCate();
  }
}
</script>
<style lang="less" scoped>
.RecommendText{
  background: #4d4d4d;
  color:#fff;
  border:2px solid #999999;
  display: block;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:2rem;
  margin-bottom: 1rem;
}
.PromotionMain{
    // background: url(/images/mobile/MobileIndex_02.jpg) no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 2rem;
    margin-top: -.5rem;
    position: relative;
  .SalesMain{
    width: 90%;
    margin: 0 auto;
    .hotTitle{
        width: 100%;
        background: url('/images/mobile/mobileIndex_04.png') center 0 no-repeat;
        height: 6rem;
        margin: 0 auto;
        background-size: contain;
      }
      .hotTitleE{
        width: 100%;
        background: url('/images/pc/bigsales.png') center 0 no-repeat;
        height: 6rem;
        margin: 0 auto;
        background-size: contain;
      }
  }
  .InnerSide{
    width: 85%;
    margin: 0 auto;
    .main{
        margin-bottom: 2rem;
        .content{
          font-size: 2rem;
          text-align: center;
          color:#806339;
        }
        .titilBg{
          width: 100%;
          display: inline-block;
          img{
            width: 100%;
          }
        }
        .swiperBg{
          background-size: 100% 100%;
          display: inline-block;
          box-sizing: border-box;
          width: 100%;
          img{
            width: calc(100% - 2px);
            border:1px solid #4d4d4d;
          }
        }
    }

  }
}
.swiper-container {
  width: 100%;
}
.swiper-pagination {
  text-align: center;
  width: 100%;
  // bottom: 150px;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets.swiper-pagination-bullet {
  margin: 0 8px;
  width: 15px;
  height: 15px;
}

.swiper-slide {
  img {
    width: 100%;
  }
}
.Category{
  width: 90%;
  margin: 0 auto;
  .main{
    div>.title{
      width: 100%;
      height: 100%;
      color: #8b0b04;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      font-family: 'Arial';
      margin-bottom: 2rem;
    }
    .Categorylist{
      float: left;
      width: 47%;
      position: relative;
      margin-bottom: 2rem;
      &:nth-child(2n+1){
        float: right;
      }
      .Categorybox{
        .title{
          position: absolute;
          top: 0;
          left: 0;
          background-color:rgba(20, 35, 79, 0.5);
          width: 100%;
          height: 100%;
          text-align: center;
          h2{
            color: #fff;
            font-size: 1.2rem;
            position: absolute;
            top: 50%;
            transform: translate(-50%,-50%);
            left: 50%;
            width: 100%;
          }
        }
        img{
          width: 100%;
          display: block;
          object-fit: cover;
          object-position: 50% 50%;
        }
      }
    }

  }
  .more{
    width: 80%;
    margin: 0 auto;
    background-color: #8b0b04;
    border-radius: 10px;
    height: 4rem;
    text-align: center;
    a{
      color: #fff;
      font-size: 1.2rem;
      line-height: 4rem;
      font-weight: bold;
    }
  }
}
</style>
