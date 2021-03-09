<template>
<div class="pcVersionCat">
    <div class="ProducBanner">
        <ProductListSwiper class="innerBanner" />
  </div>
      <div class="product_warpper">
        <inProductCat :column="3" :pageNum="16"></inProductCat>
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inPage from '@/components/base/pc/InsPage.vue';
import inProductCat from '@/components/business/pc/product/InsProductCat.vue';
import YouWouldLike from '@/model/youWouldLike';
@Component({
  components: {
    inPage,
    inProductCat,
    productMenuTree: () => import(/* webpackChunkName: "product" */ '@/components/business/pc/product/InsProductCatTree.vue'),
    ProductListSwiper: () => import(/* webpackChunkName: "product" */ '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue')
  }
})
export default class InsProduct extends Vue {
//   private Items: YouWouldLike[] = [];
//   private PageNumber:number = Vue.prototype.userAgent === 'mobile' ? 2 : 4;
  created () {
    this.$HiddenLayer();
    this.$store.dispatch('setCatId', this.$route.query.catId);
    this.$nextTick(() => {
      document.title = this.$t('Action.Package') as string;
    });
  }
  @Watch('$route', { deep: true })
  onRouteChange (n, o) {
    this.$store.dispatch('setCatId', this.$route.query.catId);
  }
}
</script>
<style scoped lang="less">
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    .innerBanner{
      width: 100%;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
  }
.pcVersionCat{
  background: url('/images/pc/productlist_bg.jpg') no-repeat center center;
  background-size: 100% 100%;
  display: inline-block;
  width: 100%;
}
.product_catalogs {
  width: 20%;
  float: left;
}

div{
  text-align: center;
}
.product_warpper{
  width: 1200px;
  margin:50px auto;
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
