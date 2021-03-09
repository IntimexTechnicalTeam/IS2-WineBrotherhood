<template>
  <div class="home" v-cloak>
    <HomeBanner :initOptions="swiperOption" :page="'Home'" :initSwiper="true" class="banner" />
    <HkPromotion />
    <HkBranch />
    <HkLiveBox />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import api from '@/sdk/api/Api.ts';
@Component({
  components: {
    HomeBanner: () => import(/* webpackChunkName: "home" */ '@/components/base/pc/InsBanner.vue'),
    HkPromotion: () => import(/* webpackChunkName: "home" */ '@/components/hkTasteBusiness/pc/home/HkPromotion.vue'),
    HkBranch: () => import(/* webpackChunkName: "home" */ '@/components/hkTasteBusiness/pc/home/HkBranch.vue'),
    HkLiveBox: () => import(/* webpackChunkName: "home" */ '@/components/hkTasteBusiness/pc/home/HkLiveBox.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };
  mounted () {
    api
      .getData(1, 1)
      .then((res: any) => {
        var _this = this;
        this.$HiddenLayer();
      })
      .catch((err: any) => {
        // 请求失败后的处理函数
        console.log(err);
      });
  }
  created () {
    // let keywords = document.createElement('meta');
    // keywords.setAttribute('name', 'keywords');
    // keywords.setAttribute('content', require('../../sdk/common/SeoData').seoItem['home'].keyword);
    // document.head.appendChild(keywords);
    // let description = document.createElement('meta');
    // description.setAttribute('name', 'description');
    // description.setAttribute('content', require('../../sdk/common/SeoData').seoItem['home'].description);
    // document.head.appendChild(description);
    // document.dispatchEvent(new Event('render-event'));
  }
}
</script>

<style lang="less" scoped>
v-cloak{
  display: none;
}
.mainbanner {
  height: 200px;
}

.about-main {
  width: 100%;
  margin: 0 auto;
  display: inline-block;

  .index-content-box {
    box-sizing: border-box;
    width: 50%;
    margin: 0 auto;
    margin-top: -100px;
    z-index: 3;
    position: relative;

    .pc-aboutus {
      background: #fff;
      border-radius: 20px 20px 0px 0px;
      box-shadow: darkgrey 0px 0px 10px 0px;

      .p-message-conct {
        height: 421px;
        margin: 0 auto;
        padding: 0 5%;

        .title {
          color: #000000;
          font-size: 23px;
          display: block;
          text-align: center;
          padding-top: 23px;

          span {
            color: #000;
            font-size: 35px;
            float: left;
          }

          .more {
            float: right;

            img {
              width: 42px;
            }
          }
        }

        .plconct {
          height: 275px;
          margin: 0 auto;
          padding-top: 30px;
          overflow: hidden;

          p {
            font-size: 16px;
            line-height: 38px;
          }

          span {
            font-size: 14px;
            margin-left: 0px;
          }
        }
      }
    }
  }
}

.category-product-bg {
  width: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: 30px;

  .title {
    width: 100%;
    height: 100px;
    position: relative;

    .title_back {
      width: 80%;
      height: 100%;
      float: left;
    }

    .title_box {
      height: 100%;
      width: 78%;
      position: absolute;
      top: 0;

      .title_content {
        width: 1080px;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        float: right;
        max-width: 96%;

        p {
          color: #fff;
          font-size: 28px;
          width: 525px;
          height: 65%;
          display: flex;
          align-items: center;
          background-color: #000;
          padding-left: 25px;
          border-radius: 5px 60px 5px 5px;
        }

        .more {
          position: absolute;
          right: 0;
        }
      }
    }
  }

  .picimg {
    width: 1100px;
    margin: 0 auto;

    .product-list-box {
      min-height: unset;
      margin: 45px 0;
      position: relative;

      .product-list-one_1 {
        height: 456px;
        margin-bottom: 35px;
        width: 30%;
        margin-right: 3%;
        box-shadow: #d8d8d8 0px 0px 10px 0px;
        overflow: hidden;
        position: relative;
        float: left;
        margin-left: 5px;

        .ban-setting {
          display: block;
          position: relative;
          overflow: hidden;
        }

        a img {
          display: block;
          border: 1px solid #ededed;
          width: 99%;
          margin: 0 auto;
          -webkit-transition: border 0.5s;
          transition: border 0.5s;
        }

        &:hover a img {
          border: 1px solid #000;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }

        .captn {
          .p-name {
            color: #000000;
            font-size: 14px;
            text-align: center;
            margin-top: 14px;
            line-height: 20px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
          }

          .p-price-box {
            text-align: center;
            margin-top: 12px;

            p {
              display: inline-block;
            }

            .p-price-discount {
              color: #ff0000;
              font-size: 18px;
              vertical-align: top;
            }
          }

          .p-addtocart {
            display: block;
            margin: 0 auto;
            line-height: 30px;
            text-align: center;
            background-color: #2e2e2e;
            color: #fff;
            width: 50%;
            height: 30px;
            margin-top: 12px;
            font-size: 14px;
          }
        }
      }
    }
  }
}

.index_more {
  background: url(../../assets/Images/PC_more_bg.png) top right no-repeat;
  width: 100%;
  height: 100px;
  display: flex;
  margin-bottom: 20px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  justify-content: center;
  align-items: center;
  background-size: 82% 100%;

  .btn {
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flexbox;
    color: #fff;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    font-size: 15px;
    width: 186px;
    height: 55px;
    background: #000;
    border-radius: 10px;
  }
}

.about-content {
  background: linear-gradient(to bottom, #f0f0e6 62%, #ffffff 48%);

  .p-message-content {
    margin: 0 auto;
    padding-top: 65px;
    width: 1100px;

    .pl {
      width: 640px;
      float: left;
    }

    .pr {
      float: left;
      margin-left: 10px;
      margin-top: -30px;
      width: 103px;
    }
  }
}

.whole_img {
  width: 100%;
}

.feedback-main {
  width: 100%;
  margin: 0 auto;
  display: inline-block;

  .feedback-message {
    width: 1100px;
    height: 272px;
    margin: 0 auto;
    position: relative;

    .fb-page_fb {
      width: 460px;
      float: right;
      margin-top: -270px;
    }

    .ico {
      width: 106px;
      position: absolute;
      bottom: 0;
      right: 470px;
    }
  }
}

.contactUs {
  width: 724px;
  margin: 70px auto 0;
  border-radius: 20px 20px 0px 0px;
  box-shadow: darkgrey 0px 0px 10px 0px;

  .contact_bg {
    background: url(../../assets/Images/map_bg.png) top no-repeat;
    width: 100%;
    background-size: cover;
    height: 308px;
    text-align: center;

    .contactUs_Content {
      padding: 45px 126px;

      .title {
        height: 40px;
        line-height: 45px;
        font-size: 18px;
      }

      p {
        padding: 30px 0;
        font-size: 15px;
        line-height: 28px;
      }
    }
  }
}
</style>
