<template>
<div class="mobileVersionCat">
    <div class="product_warpper">
        <div class="ProducBanner">
            <ProductListSwiper />
        </div>
      <!-- <div class="l2cats" @click="selectCatalogs">
        <div class="cat_item" v-for="(item,index) in catalogs" :key="index" :data-keys="item.Id">{{item.Name}}</div>
      </div> -->
      <div style="opacity:0;line-height:0;">{{ catalogs }}</div>
      <inProductCat :pageNum="6" :call="callCatalogs"></inProductCat>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inProductCat from '@/components/business/mobile/product/InsProductCat.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue';
import YouWouldLike from '@/model/youWouldLike';
import Catalogs from '@/model/Catalogs';
@Component({ components: { inProductCat, ProductListSwiper } })
export default class InsProductCat extends Vue {
  // private catalogs: Catalogs[] = [];
  private catalogs = {};
  private callCatalogs!:Promise<any>;
  created () {
    this.$HiddenLayer();
    this.$nextTick(() => {
      document.title = this.$t('Action.Package') as string;
    });
    this.callCatalogs = this.$Api.product.getAttrList2();
    let c = {};
    this.callCatalogs.then((result) => {
      // this.catalogs = this.catalogs.concat(result.Catalogs);
      // result.Catalogs.forEach(element => {
      //   this.catalogs = this.catalogs.concat(element.Children);
      // });
      result.Catalogs.forEach(element => {
        c[element.Id] = element.Name;
        element.Children.forEach(e => {
          c[e.Id] = e.Name;
        });
      });
      this.catalogs = c;
      if (!this.$route.params.catId) this.$store.dispatch('setCatId', this.catalogs[0].Id);
    });
  }
  selectCatalogs (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'cat_item') {
      this.$router.push({
        name: 'productCat',
        path: '/product/cat',
        params: {
          catId: target.dataset.keys as string
        }
      });
    }
  }
  get catId () {
    return String(this.$route.params.catId);
  }
  get cname () {
    return this.catalogs[this.catId];
  }
}
</script>
<style scoped lang="less">
.mobileVersionCat{
  width: 100%;
  background: url('/images/mobile/productbg.jpg') no-repeat center center;
  background-size: 100% 100%;
  display: inline-block;
  box-sizing: border-box;
}
.product_warpper{
  width: 100%;
  margin:0 auto;
  .title{
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
.products_container{
  display: flex;
  flex-wrap: wrap;
}
.product_item{
  width:50%;
  padding:50px 25px 0;
  box-sizing:border-box;
}
</style>
