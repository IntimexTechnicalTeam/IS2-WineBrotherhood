<template>
  <!-- 商品推荐开始 -->
  <div class="indexMiddle">
    <div class="SalesMain">
      <!-- 限时平卖开始 -->
      <HkHotProduct />
      <!-- 限时平卖结束 -->
    </div>
    <!-- <div class="Category">
      <div class="main fix">
        <div v-for="(item, index) in catalogs" :key="index">
          <div class="catalogstitle">{{ item.Name }}</div>
          <div class="catalogsleft fix">
            <div
              class="Categorylist"
              v-for="(slide, index1) in item.Children"
              :key="index1"
            >
              <div class="Categorybox">
                <router-link
                  :to="
                    '/product/search/-?catalogs=[' +
                      slide.Id +
                      ',' +
                      slide.Id +
                      ']&type=1'
                  "
                >
                  <img :src="slide.ImgB" alt="" />
                  <div class="title">
                    <h2>{{ slide.Name }}</h2>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
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
    HkHotProduct: () =>
      import(
        /* webpackChunkName: "home" */ '@/components/hkTasteBusiness/pc/home/HkHotProduct.vue'
      ),
    swiper,
    swiperSlide
  }
})
export default class HkPromotion extends Vue {
  banner1: any[] = [];
  banner2: any[] = [];
  banner3: any[] = [];
  content1: string = '';
  content2: string = '';
  content3: string = '';
  Title1: string = '';
  Title2: string = '';
  Title3: string = '';
  current: boolean = false;
  private catalogs: Catalogs[] = [];

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
  el: number = 0;
  getHeaderBannerLst() {
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
  getAttrList() {
    this.$Api.product.getAttrList2().then(result => {
      this.catalogs = this.catalogs.concat(result.Catalogs);
      console.log(this.catalogs, 'result产品根目录');
    });
  }
  created() {
    // this.getHeaderBannerLst();
    this.getAttrList();
  }
  get lang() {
    return this.$Storage.get('locale');
  }
}
</script>
<style>
.indexMiddle .swiperInner {
  padding: 10px;
}
</style>
<style lang="less" scoped>
.RecommendText {
  background: #4d4d4d;
  color: #fff;
  border: 2px solid #999999;
  display: block;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
.indexMiddle {
  min-height: 1122px;
  width: 100%;
  // background: url('/images/pc/pcindex_01.jpg') no-repeat center center;
  background-color: #fff;
  background-size: 100% 100%;
  display: inline-block;
  padding-top: 58px;
  padding-bottom: 0;
  position: relative;
}
.indexRecommend {
  width: 1200px;
  margin: 0 auto;
}
.indexRecommendInner {
  width: 30%;
  float: left;
  margin-right: 5%;
}
.indexRecommendInner:nth-child(3) {
  margin-right: 0% !important;
}
.RecommendTitle1 {
  width: 100%;
  background: url("/images/pc/index_18.png") no-repeat center center;
  height: 83px;
  background-size: 100%;
}
.RecommendTitle1_E {
  width: 100%;
  background: url("/images/pc/hotpotE.png") no-repeat center center;
  height: 83px;
  background-size: 100%;
}
.RecommendTitle2 {
  width: 100%;
  background: url("/images/pc/index_19.png") no-repeat center center;
  height: 83px;
  background-size: 100%;
}
.RecommendTitle2_E {
  width: 100%;
  background: url("/images/pc/BBQE.png") no-repeat center center;
  height: 83px;
  background-size: 100%;
}
.RecommendTitle3 {
  width: 100%;
  background: url("/images/pc/index_21.png") no-repeat center center;
  height: 83px;
  background-size: 100%;
}
.RecommendTitle3_E {
  width: 100%;
  background: url("/images/pc/dishE.png") no-repeat center center;
  height: 83px;
  background-size: 100%;
}
.RecommendBg {
  width: 100%;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #4d4d4d;
}
.RecommendBg img {
  width: 100%;
}

.indexRecommendInner p {
  text-align: center;
  color: #806339;
  font-size: 36px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: block;
}
.Category {
  padding-top: 50px;
  .main {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 70px;
    .catalogstitle {
      width: 100%;
      height: 100%;
      color: #8b0b04;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 700;
      font-family: "Arial";
      margin-bottom: 68px;
    }
    .catalogsleft {
      .Categorylist {
        float: left;
        width: 270px;
        margin-right: 40px;
        margin-bottom: 40px;
        position: relative;
        &:nth-child(4n) {
          margin-right: 0;
        }
        .Categorybox {
          transition: all 0.3s;
          overflow: hidden;
          width: 100%;
          .title {
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(20, 35, 79, 0.5);
            width: 100%;
            height: 100%;
            text-align: center;
            transition: all 0.3s;
            h2 {
              color: #fff;
              font-size: 16px;
              position: absolute;
              top: 50%;
              transform: translate(-50%, -50%);
              left: 50%;
              width: 100%;
              transition: all 0.3s;
            }
          }
          img {
            width: 100%;
            display: block;
            object-fit: cover;
            object-position: 50% 50%;
            transition: all 0.3s;
          }
          &:hover {
            box-shadow: 0 0 15px #302f2f;
            border-radius: 15px;
            a {
              .title {
                background-color: transparent;
                border-radius: 15px;
                h2 {
                  font-size: 20px;
                }
              }
              img {
                transform: scale(1.2);

              }

            }
          }
        }
      }
    }
  }
}
</style>
