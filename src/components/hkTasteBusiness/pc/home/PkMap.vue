<template>
  <div class="map-main" style="text-align: center;">
    <div class="mapbox">
      <div v-html="MapContent.Body"></div>
    </div>
    <div class="contact">
      <div class="title"><h2>{{$t('home.WineBrotherhood')}}</h2></div>
          <div class="contactBox">
              <div class="w50">
                <div class="contactlist">
                  <div class="left">
                    <img src="/images/mobile/index_50.png" alt="">
                  </div>
                  <div class="right">
                    <p>{{$t('home.TEL')}}</p>
                    <p><a href="tel:85228989211">+852 2898 9900</a></p>
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
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkMap extends Vue {
  MapContent:string='';
  getMapContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20294, IsMobile: false }).then(result => {
      this.MapContent = result.CMS;
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  created () {
    this.getMapContent();
  }
}
</script>

<style scoped lang="less">
.map-main {
  width: 100%;
  margin: 0 auto;
  .mapbox{
    width: 600px;
    float: left;
    /deep/ iframe{
      border: none;
    }
  }
  .contact{
    width: 550px;
    float: right;
  }
}
.contact{
      width: 100%;
      background-size: cover;
      .title{
        position: relative;
        border-bottom: 3px solid #ffffff;
        width: 94%;
        margin: 0 auto;
        // padding-top: 48px;
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
          font-size: 30px;
          color: #ffffff;
          font-weight: bold;
          text-align: left;
        }
      }
      .contactBox{
    width: 94%;
    margin: 0 auto;
    margin-top: 20px;
      .contactlist{
        margin-bottom: 15px;
        display: flex;
        .left{
          margin-right: 12px;
        }
        .right{
          padding-top: 6px;
          >p:nth-child(1){
            font-size: 16px;
            text-align: left;
            color: #FFF;
            padding-bottom: 10px;
            font-weight: bold;
            padding-top: 3px;
          }
          >p:nth-child(2){
            font-size:16px;
            text-align: left;
            color: #FFF;
            line-height: 24px;
          }
          a{
            color: #fff;
            font-size:16px;
            line-height: 24px;
          }
        }
      }
    }
    }
</style>
