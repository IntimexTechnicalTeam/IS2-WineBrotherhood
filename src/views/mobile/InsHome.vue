<template>
  <div class="home" v-cloak>
    <HomeBanner :page="'Home'" :initSwiper="true" class="banner" />
    <HkPromotion />
    <PkCate />
    <HkNews />
    <HkLiveBox />
    <HkMap/>
    <div class="footer_top">
        <div class="title"><h2>{{$t('home.WineBrotherhood')}}</h2></div>
          <div class="contactBox">
              <div class="w50">
                <div class="contactlist">
                  <div class="left">
                    <img src="/images/mobile/index_50.png" alt="">
                  </div>
                  <div class="right">
                    <p>{{$t('home.TEL')}}</p>
                    <p><a href="tel:85228989211">+852 2898 9211</a></p>
                  </div>
                </div>
                <div class="contactlist">
                  <div class="left">
                    <img src="/images/mobile/index_53.png" alt="">
                  </div>
                  <div class="right">
                    <p>{{$t('home.Fax')}}</p>
                    <p>+852 2898 9103</p>
                  </div>
                </div>
                <div class="contactlist">
                  <div class="left">
                    <img src="/images/mobile/index_55.png" alt="">
                  </div>
                  <div class="right">
                    <p>{{$t('home.Email')}}</p>
                    <p><a href="mailto:info@winebrotherhood.com.hk">info@winebrotherhood.com.hk</a></p>
                  </div>
                </div>
                <div class="contactlist">
                  <div class="left">
                    <img src="/images/mobile/index_57.png" alt="">
                  </div>
                  <div class="right">
                    <p>{{$t('home.Address')}}</p>
                    <p>{{$t('home.Detailedaddress')}}</p>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    HomeBanner: () => import('@/components/base/mobile/InsBanner.vue'),
    HkPromotion: () => import('@/components/hkTasteBusiness/mobile/home/HkPromotion.vue'),
    HkBranch: () => import('@/components/hkTasteBusiness/mobile/home/HkBranch.vue'),
    HkLiveBox: () => import('@/components/hkTasteBusiness/mobile/home/HkLiveBox.vue'),
    HkNews: () => import('@/components/hkTasteBusiness/mobile/home/PkNews.vue'),
    HkMap: () => import('@/components/hkTasteBusiness/mobile/home/PkMap.vue'),
    PkCate: () => import('@/components/hkTasteBusiness/mobile/home/PkCate.vue')
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
}
</script>

<style lang="less" scoped>
.banner {
  // min-height: 100vh;
  background-color: white;
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
</style>
