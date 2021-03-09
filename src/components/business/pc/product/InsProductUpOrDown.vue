<template>
    <div class="upOrDown_warrper">
        <inButton
        :nama="$i18n.t('product.up')"
        width="100px"
        type="nagative"
        action="up"
        size='small'
        @click="up">
        </inButton>
        <inButton
        :nama="$i18n.t('product.down')"
        width="100px"
        type="nagative"
        action="up"
        size='small'
        @click="down">
        </inButton>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inButton from '@/components/base/pc/InsButton.vue';
@Component({ components: { inButton } })
export default class ProductUpOrDown extends Vue {
  @Prop() private readonly catId!:number;
  @Prop() private readonly sku!:string;
  up () {
    this.$Api.product.GetProductUpOrDown(this.sku, this.catId, true).then((result) => {
      this.$router.push({ name: 'ProductsDetail', params: { id: result } });
    }).catch(error => {
      console.log(error);
      this.$message('沒有更多了');
    });
  }
  down () {
    this.$Api.product.GetProductUpOrDown(this.sku, this.catId, false).then((result) => {
      this.$router.push({ name: 'ProductsDetail', params: { id: result } });
    }).catch(error => {
      console.log(error);
      this.$message('沒有更多了');
    });
  }
}
</script>
<style lang="less" scoped>
.upOrDown_warrper{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 1rem;
}
</style>
