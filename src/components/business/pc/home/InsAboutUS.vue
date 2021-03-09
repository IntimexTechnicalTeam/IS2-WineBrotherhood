<template>
  <div class="about-main" :class="{'pc': userAgent === 'pc', 'mobile': userAgent === 'mobile'}">
    <div class="index-content-box">
      <div class="aboutus">
        <div class="p-message-conct">
          <div class="title">
            <span>{{$t('Cms.AboutUS')}}</span>
            <div class="more">
              <router-link to="/about">
                <img src="@/assets/Images/more_ico.png" />
              </router-link>
            </div>
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

  // 获取关于我们cms内容
  getContent () {
    this.$Api.cms.getContent(10228).then((result) => {
      this.content = result.Body;
    });
  }

  mounted () {
    this.getContent();
    // this.$emit('AboutTitle', this.headtitle);
  }
}
</script>

<style lang="less" scoped>
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
      width: 90%;
      margin: 0 auto;
      margin-top: -30px;
      z-index: 9;
      position: RELATIVE;

      .aboutus {
        background: #fff;
        border-radius: 20px 20px 0px 0px;
        box-shadow: darkgrey 0px 0px 10px 0px;

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
              color: #000;
              font-size: 1.2rem;
              margin-left: 6%;
              float: left;
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
            width: 25rem;
            height: 13rem;
            margin: 0 auto;
            padding-top: 0.5rem;
            padding-bottom: 1rem;

            p {
              font-size: 1.1rem;
              line-height: 2.3rem;
              height: 11rem;
              overflow: hidden;
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
