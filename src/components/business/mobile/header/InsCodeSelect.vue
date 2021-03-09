<template>
  <div class="main-code">
    <select id="code-select" v-model="codeId" @change="changeCurrency(codeId)">
      <option value="1">HKD</option>
      <option value="2">USD</option>
      <option value="3">RMB</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCodeSelect extends Vue {
  codeId:number=1;
  changeCurrency (val) {
    this.$Api.member.setCurrency(val).then((result) => {
      this.$message({
        message: this.$t('changeCurSuccess') as string,
        type: 'success',
        customClass: 'messageboxNoraml'
      });
      this.$store.dispatch('setCurrency', result.ReturnValue);
      this.Reload();
    }).catch((error) => {
      console.log(error);
    });
  }

  LoadData () {
    this.$Api.shoppingCart.LoadData().then((result) => {
      this.codeId = result.Currency.Id;
    });
  }

  // get codeId () {
  //   if (this.$Storage.get('currency')) {
  //     return this.$Storage.get('currency').Id;
  //   } else {
  //     return 1;
  //   }
  // }

  // set codeId (val) {
  //   this.changeCurrency(val);
  // }

  mounted () {
    this.LoadData();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style scoped lang="less">
.main-code {
  display: inline-block;

  select {
      width: 100%;
      background: transparent url('/images/mobile/arrow-down-back.png')  80% 50% no-repeat;
      background-size: 1rem;
      border:none;
      box-sizing: border-box;
      text-align: center;
      color:#666666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      padding-left: .8rem;
      font-size: 1.4rem;
      outline: none;
      option{
        color:#666666;
        outline: none;
      }
  }
}
</style>
