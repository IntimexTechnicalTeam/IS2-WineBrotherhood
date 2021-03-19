<template>
  <div class="main-code">
    <select id="code-select" v-model="codeId" @change="changeCurrency(codeId)">
      <option value="1" style="color:#000">HKD</option>
      <option value="2" style="color:#000">USD</option>
      <option value="3" style="color:#000">RMB</option>
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
        type: 'success'
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
  mounted () {
    this.LoadData();
  }
}
</script>
<style scoped lang="less">
.main-code {
  display: inline-block;
  width: 90px;
  height: 32px;
  border: 1px solid #fff;
  border-radius: 8px;
  margin-left: 32px;
  select {
    width: 100%;
    font-size: 18px;
    background: none;
    color: #fff;
    border: none;
    outline: none;
    height: 32px;
    padding-left: 10px;
    font-weight: bold;
    background: transparent url('/images/pc/arrow-down-back.png')  90% 50% no-repeat;
    appearance:none;
  }
}
</style>
