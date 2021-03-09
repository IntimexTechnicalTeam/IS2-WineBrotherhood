<template>
<div class="product mobile">
  <div class="category-product-bg">
    <!-- <div class="title" >
      <h2>產品</h2>
      <router-link to="/product/search?key=+" class="more"></router-link>
    </div> -->
    <div class="title">
      <img src="/static/Image/home/hot.jpg">
    </div>
    <div class="latesProduct_warpper">
      <InsProductWindow :item="item" v-for="(item,index) in latestProduct" :key="index" />
    </div>
    <!-- <div class="index_more">
      <a href="/product/search?key=+">
        <div class="btn">MORE</div>
      </a>
    </div> -->
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
import InsProductWindow from '@/components/business/mobile/product/InsProductWindow.vue';
import YouWouldLike from '@/model/youWouldLike';
@Component({ components: { InsProductWindow } })
export default class InsLatesProduct extends Vue {
  latestProduct: YouWouldLike[] = [];

  AddToCart (sku) {
    this.$Api.shoppingCart.addItem(sku, '1', '1', '1', 1).then((result) => {
      console.log(result.Message);
      this.getShopCart();
    }).catch();
  }

  getShopCart () {
    this.$Api.shoppingCart.LoadData().then((result) => {
      console.log(result, '购物车信息');
      this.$store.dispatch('setShopCart', result);
      Message({
        message: '成功加入购物车',
        type: 'success', 
        customClass: 'messageboxNoraml'
      });
    }).catch((err: any) => {
      console.log(err);
      Message({
        message: '加入购物车失败！',
        type: 'error', 
        customClass: 'messageboxNoraml'
      });
    });
  }

  getLatestProduct () {
    this.$Api.promotion.getLatestProduct().then((result) => {
      this.latestProduct = result.YouWouldLike;
    });
  }

  mounted () {
    this.getLatestProduct();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less" scoped>
.product {
  &.mobile {
    .category-product-bg {
      width: 100%;
      margin: 0 auto;
      position: relative;
      margin-top: 20px;

      .title{
        img{
          width: 100%;
        }
      }
      .latesProduct_warpper{
        display: flex;
        flex-wrap: wrap;
        >div{
          width: 50%;
          padding: 4rem 1rem 0;
          box-sizing: border-box;
        }
      }
    }

    .index_more {
      background: url(../../../../assets/Images/more_bg.png) top right no-repeat;
      width: 100%;
      background-size: 86%;
      -webkit-background-size: 86%;
      height: 4rem;

      .btn {
        appearance: none;
        -webkit-appearance: none;
        display: block;
        border-radius: 3px;
        text-align: center;
        color: #fff;
        padding: 0;
        cursor: pointer;
        width: 8.5rem;
        height: 2.4rem;
        line-height: 2.4rem;
        background: #000;
        margin: 0 auto;
        font-size: 1.1rem;
        position: relative;
        top: 5px;
      }
    }
  }
}

</style>
