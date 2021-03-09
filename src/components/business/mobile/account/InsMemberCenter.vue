<template>
  <div class="MembercenterMobile">
    <accountHeader />
    <div class="MemberInfoNav">
      <ul>
        <div @click="openlink('/account/memberInfo')">
        <li :class="activeClass == 1?'activeInfo':''" >
          <a>{{ $t("MemberInfo.MemberInfoTitle") }}</a>
        </li>
        </div>
        <div @click="openlink('/account/modifyPassword')">
        <li :class="activeClass == 2?'activeInfo':''" >
          <a>{{ $t("MemberInfo.ModifyPassword") }}</a>
        </li>
        </div>
        <div @click="openlink('/account/deliveryAddress')">
        <li :class="activeClass == 3?'activeInfo':''" >
          <a>{{ $t("Account.DeliveryAddress") }}</a>
        </li>
        </div>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MemberResult } from '@/model/memberResult';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue')
  }
})
export default class InsMenberCenter extends Vue {
    activeClass: any = 0;
    openlink(link) {
    this.$router.push({ path: link });
  }
  isActive() {
    var url = this.$route.path;
    var reg = RegExp(/memberInfo/);
    if (reg.test(url)) {
      this.activeClass = 1;
    } else if (url.indexOf('modifyPassword') !== -1) {
      this.activeClass = 2;
    } else if (url.indexOf('deliveryAddress') !== -1) {
      this.activeClass = 3;
    }
    console.log(this.activeClass);
  }
  updated() {
    this.isActive();
  }
  mounted() {
    this.isActive();
  }
}
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.MemberInfoMain {
  width: 1200px;
  margin: 0 auto;
  margin-top: 1rem;
  padding: 2.5%;
}
.MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MemberInfoMain .el-form-item__content,
.MemberInfoMain .el-form-item__label-wrap {
  margin-left: 0px !important;
}
.MemberInfoMain .el-button {
  background: #333333;
  border: none;
  display: block;
  border-radius: 20px;
  width: 60%;
  float: left;
  margin-left: 25%;
}
.MembercenterMobile .MemberInfoNav{
    width: 100%;
    margin-top: 1rem;
    display: inline-block;
    background: #e6e6e6;
}
.MembercenterMobile .MemberInfoNav ul{
  width:100%;
  display: block;
}
.MembercenterMobile .MemberInfoNav li{
  float: left;
  list-style: none;
  width:33.3%;
}
.MembercenterMobile .MemberInfoNav li a{
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 1.6rem;
    padding: 1rem;
    word-break: break-word;
}
.MembercenterMobile .activeInfo{
  background: #666666!important;
}
.MembercenterMobile .activeInfo a{
  color:#fff!important;
}
</style>
