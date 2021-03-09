<template>
  <div class="contactUs">
    <div class="contact_bg">
      <div class="contactUs_Content">
        <div class="title">{{title}}</div>
        <p v-html="contents"></p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsContactUS extends Vue {
  @Prop() private title!: string;
  contents: string =
    'Address: Intimex Business Solutions Co., Ltd. Rm306, Tins Enterprises Centre, 777 Lai Chi Kok Rd, Cheung Sha Wan<br />Tel: (852) 6289 1789 Fax: (852) 3186 2401 <br />E-mail: sales@ptx.hk';
  mounted () {}
}
</script>

<style lang="less" scoped>
.contactUs {
  width: 724px;
  margin: 70px auto 0;
  border-radius: 20px 20px 0px 0px;
  box-shadow: darkgrey 0px 0px 10px 0px;

  .contact_bg {
    background: url(../../../../assets/Images/map_bg.png) top no-repeat;
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
