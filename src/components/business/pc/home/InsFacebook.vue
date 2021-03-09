<template>
  <div class="feedback-main">
    <div class="feedback-message">
      <div class="fb-page_fb">
        <div
          class="fb-page"
          data-href
          data-tabs="timeline"
          data-width="460"
          data-height="502"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote :cite="link" class="fb-xfbml-parse-ignore">
            <a :href="link">{{title}}</a>
          </blockquote>
        </div>
      </div>
      <div class="ico">
        <img class="whole_img" src="@/assets/Images/card-icon.png" />
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsFacebook extends Vue {
  link: string = 'https://www.facebook.com/intimexhk/';
  title: string = '泰美科技 Intimex';
  mounted () {}
}
</script>

<style lang="less" scoped>
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
</style>
