<template>
  <div class="about-main" :class="{'pc': userAgent === 'pc', 'mobile': userAgent === 'mobile'}">
    <div class="index-content-box">
      <div class="aboutus">
        <div class="p-message-conct">
           <img :src="contentImg" />
          <div class="title">
            <span>{{$t('Cms.AboutUS')}}</span>
            <div class="clear"></div>
          </div>
          <div class="plconct" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsAboutUS extends Vue {
  content: string = '';
  contentImg:string='';

  // 获取关于我们cms内容
  getContent () {
    this.$Api.cms.getContent(19).then((result) => {
      this.content = result.Body;
      this.contentImg = result.Cover;
    });
  }

  mounted () {
    this.getContent();
    // this.$emit('AboutTitle', this.headtitle);
  }
}
</script>

<style lang="less" scoped>
.p-message-conct  img{
    display: block;
    margin: 0 auto;
    padding-top: 6rem;
    padding-bottom: 2rem;
    width: 40%;
}
.about-main{
  margin-top: -5px;
}
.plconct {
    color: #FFF !important;
    word-break: break-all;

}
.plconct >p{
    font-size:3rem;
    line-height: 2.5rem;
}
.about-main {
  &.pc {
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

      .aboutus {
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

  &.mobile {
    .index-content-box {
      box-sizing: border-box;
      width: 100%;
      margin: 0 auto;
      z-index: 9;
      position: RELATIVE;
      background: #7accc8;
      .aboutus {
        background: #7accc8;
        .p-message-conct {
          width: 100%;
          margin: 0 auto;
          .title {
            color: #000000;
            font-size: 1rem;
            display: inline-block;
            text-align: center;
            padding-top: 1.5rem;
            width: 100%;

            span {
              color: #FFF;
              font-size: 2.5rem;
              padding-bottom: 2rem;
              display: block;
            }

            .more {
              float: right;
              margin-right: 5%;

              img {
                width: 2rem;
              }
            }
          }

          .plconct {
            width: 95%;
            margin: 0 auto;
            padding-bottom: 6rem;
            p {
              font-size: 1.1rem;
              height: 11rem;
              overflow: hidden;
              line-height: 2.5rem;
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
}
</style>
