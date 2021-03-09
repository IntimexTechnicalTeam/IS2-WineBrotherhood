<template>
  <div class="liveBox mobileVersion" style="text-align: center;">
    <div class="liveBox_in">
        <div class="TitleBg"><div class="innerBox">{{$t('Cms.WhatNews')}}</div></div>
        <div class="videoBg">
            <p v-html="videoContent.Body"></p>
        </div>
        <div class="mapBg">
           <p v-html="fbContent.Body"></p>
        </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  videoContent:string='';
  fbContent:string='';
  getVideoContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20294, IsMobile: true }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  getFbContent () {
    this.$Api.cms.getContentByDevice({ ContentId: 20299, IsMobile: true }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  created () {
    this.getVideoContent();
    this.getFbContent();
  }
  get lang () {
    return this.$Storage.get('locale');
  }
}
</script>
<style  lang="less">
.mobileVersion{
  .videoBg{
    iframe{
      width: 100%;
      height: 20rem;
    }
    img{
      width: 100%;
    }
  }
  .mapBg{
    img{
      width: 100%;
    }
  }
}
</style>
<style scoped lang="less">
/*live*/
.TitleBg{
  width: 90%;
  height: 5rem;
  border:1px solid #4d4d4d;
  margin: 0 auto;
  padding: .5rem;
  margin-bottom: 2rem;
  .innerBox{
    width: 100%;
    height: 100%;
    background:#4d4d4d;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.liveBox {
    width: 100%;
    padding-bottom: 4.5rem;
    background: url('/images/mobile/Mobile-index_04.jpg') no-repeat center center;
    background-size: 100% 100%;
    .liveBox_in{
    width: 90%;
    margin: 0 auto;
    padding-top:3rem;
      // .mapBg{
        // background: url('/images/mobile/mobileIndex_27.png') center center no-repeat;
        // background-size: 100% 100%;
        // display: inline-block;
        // padding: 2.5rem;
        // box-sizing: border-box;
      // }
      .videoBg{
        margin-top: 2rem;
        margin-bottom: 3rem;
        background-size: 100% 100%;
        display: inline-block;
        padding: 2.5rem;
        box-sizing: border-box;
        img{
          width: 100%;
        }
      }
      .hotTitle{
        width: 100%;
        background: url('/images/mobile/mobileIndex_25.png') center 0 no-repeat;
        height: 6rem;
        margin: 0 auto;
        background-size: contain;
      }
      .hotTitleE{
        width: 100%;
        background: url('/images/pc/whatnews.png') center 0 no-repeat;
        height: 6rem;
        margin: 0 auto;
        background-size: contain;
      }
    }

}
</style>
