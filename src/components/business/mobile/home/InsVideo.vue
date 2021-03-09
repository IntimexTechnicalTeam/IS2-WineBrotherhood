<template>
  <div class="about-content">
    <div class="p-message-content">
      <div class="pl">
        <iframe
          width="640"
          height="424"
          :src="link"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="pr">
        <img src="@/assets/Images/card-icon.png" class="whole_img" />
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsVideo extends Vue {
  link: string = 'https://www.youtube.com/embed/640u2er7bMc';
  mounted () {}
}
</script>

<style lang="less" scoped>
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
</style>
