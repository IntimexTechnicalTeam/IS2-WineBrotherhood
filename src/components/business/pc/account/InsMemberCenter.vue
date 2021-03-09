<template>
  <div class="MemberPc">
    <accountHeader />
    <div class="MemberInfoNavPC">
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
    accountHeader: () =>
      import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
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
<style lang="less">
#container .el-form-item__content {
  text-align: left !important;
}
.MemberPc {
  background: #ffffff;
  display: inline-block;
  background-size: 100% 100%;
  width: 100%;
}
.MemberPc .MemberInfoNavPC {
  width: 100%;
  display: inline-block;
  background: #e6e6e6;
  margin-top: 20px;
  ul {
    width: 1200px;
    margin: 0 auto;
  }
}
.MemberPc .MemberInfoNavPC li {
  float: left;
  list-style: none;
  cursor: pointer;
  width: 33.3%;
}
.MemberPc .MemberInfoNavPC li a {
  text-align: center;
  text-decoration: none;
  display: block;
  line-height: 3.5rem;
  color: #333333;
  font-size: 22px;
}
.MemberPc .activeInfo a {
  color: #fff !important;
  background: #666666 !important;
}
</style>
