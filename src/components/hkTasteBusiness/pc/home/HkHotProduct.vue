<template>
    <div class="indexSale">
        <div class="TitleBg"><div class="innerBox">{{$t('Cms.BigSales')}}</div></div>
        <div class="indexHotSale">
          <div class="perSale" v-for="(val,index) in HotSales" :key="index">
                   <inProductWindow :item="val"  style="width:100%;"></inProductWindow>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import inProductWindow from '@/components/hkTasteBusiness/pc/product/HkProductWindow.vue';
@Component({
  components: {
    inProductWindow
  }
})
export default class PkHotProduct extends Vue {
    HotSales:any[]=[];
    loadHotProducts () {
      var page = 'Home';
      this.$Api.promotion.getPromotion('Home', 4).then((result) => {
        if (result.Promotion.PrmtProductList.length > 0) {
          this.HotSales = result.Promotion.PrmtProductList.slice(0, 8);
        }
      });
    }
    get lang () {
      return this.$Storage.get('locale');
    }
    mounted () {
      this.loadHotProducts();
    }
}
</script>
<style lang="less" scoped>
.TitleBg{
  width: 500px;
  height: 70px;
  border:1px solid #4d4d4d;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  .innerBox{
    width: 100%;
    height: 100%;
    background:#4d4d4d;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.indexSale{
    width: 1200px;
    margin: 0 auto;
    padding-top: 110px;
}
.indexSaleTitle{
    background: url('/images/pc/index_27.png') no-repeat center center;
    width: 544px;
    height: 114px;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
}
.indexSaleTitleE{
    background: url('/images/pc/bigsales.png') no-repeat center center!important;
    width: 544px;
    height: 114px;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
}
.indexHotSale{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
}
.perSale{
    box-sizing: border-box;
    width: 22%;
    float: left;
    margin-right: 4%;
    padding: 1.5%;
}
.perSale:nth-child(4n){
     margin-right: 0%!important;
}
</style>
