<template>
<div class="product" :class="{'pc': userAgent === 'pc', 'mobile': userAgent === 'mobile'}">
  <div class="category-product-bg">
    <div class="title" v-if="userAgent === 'pc'">
      <img src="@/assets/Images/PC_pro_title.png" class="title_back" />
      <div class="title_box">
        <div class="title_content">
          <p>产品中心</p>
          <span class="more">
            <router-link to="/product/search?key=+">
              <img src="@/assets/Images/ImagesmorePC_ico_pro.png" />
            </router-link>
          </span>
        </div>
      </div>
    </div>
    <div class="title" v-else>
      <h2>產品</h2>
      <router-link to="/product/search?key=+" class="more"></router-link>
    </div>
    <div class="picimg">
      <div class="product-list-box">
        <div class="product-list-one_1" v-for="(pro,index) in latestProduct" :key="index">
          <!-- <router-link :to="{path:'/product/detail/',query: {ids: pro.id,src:pro.imgUrl}}"> -->
          <router-link :to="{name:'ProductsDetail',params: {id: pro.id}}">
            <div class="ban-setting">
              <img :src="pro.Img_L" />
            </div>
          </router-link>
          <div class="captn">
            <p class="p-name">{{pro.Name}}</p>
            <div class="p-price-box">
              <p class="p-price-discount">{{pro.Currency.Code}} {{pro.SalePrice}}</p>
            </div>
            <a href="javascript:;" class="p-addtocart" @click="AddToCart(pro.Sku)">{{$t('AddToCart')}}</a>
            <div class="clear"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="index_more">
      <a href="/product/search?key=+">
        <div class="btn">MORE</div>
      </a>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Message } from 'element-ui';
@Component
export default class InsLatestProduct extends Vue {
  latestProduct: object[] = [];

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
      console.log(result, '最新产品信息');
      this.latestProduct = result.slice(0, 6);
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
  &.pc {
    .category-product-bg {
      width: 100%;
      margin: 0 auto;
      position: relative;
      margin-top: 30px;

      .title {
        width: 100%;
        height: 100px;
        position: relative;

        .title_back {
          width: 80%;
          height: 100%;
          float: left;
        }

        .title_box {
          height: 100%;
          width: 78%;
          position: absolute;
          top: 0;

          .title_content {
            width: 1080px;
            height: 100%;
            display: flex;
            align-items: center;
            position: relative;
            float: right;
            max-width: 96%;

            p {
              color: #fff;
              font-size: 28px;
              width: 525px;
              height: 65%;
              display: flex;
              align-items: center;
              background-color: #000;
              padding-left: 25px;
              border-radius: 5px 60px 5px 5px;
            }

            .more {
              position: absolute;
              right: 0;
            }
          }
        }
      }

      .picimg {
        width: 1100px;
        margin: 0 auto;

        .product-list-box {
          min-height: unset;
          margin: 45px 0;
          position: relative;

          .product-list-one_1 {
            height: 456px;
            margin-bottom: 35px;
            width: 30%;
            margin-right: 3%;
            box-shadow: #d8d8d8 0px 0px 10px 0px;
            overflow: hidden;
            position: relative;
            float: left;
            margin-left: 5px;

            .ban-setting {
              display: block;
              position: relative;
              overflow: hidden;
            }

            a img {
              display: block;
              border: 1px solid #ededed;
              width: 99%;
              margin: 0 auto;
              -webkit-transition: border 0.5s;
              transition: border 0.5s;
            }

            &:hover a img {
              border: 1px solid #000;
            }

            &:nth-child(3n) {
              margin-right: 0;
            }

            .captn {
              .p-name {
                color: #000000;
                font-size: 14px;
                text-align: center;
                margin-top: 14px;
                line-height: 20px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-wrap: break-word;
              }

              .p-price-box {
                text-align: center;
                margin-top: 12px;

                p {
                  display: inline-block;
                }

                .p-price-discount {
                  color: #ff0000;
                  font-size: 18px;
                  vertical-align: top;
                }
              }

              .p-addtocart {
                display: block;
                margin: 0 auto;
                line-height: 30px;
                text-align: center;
                background-color: #2e2e2e;
                color: #fff;
                width: 50%;
                height: 30px;
                margin-top: 12px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }

    .index_more {
      background: url(../../../../assets/Images/PC_more_bg.png) top right no-repeat;
      width: 100%;
      height: 100px;
      display: flex;
      margin-bottom: 20px;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flexbox;
      justify-content: center;
      align-items: center;
      background-size: 82% 100%;

      .btn {
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flexbox;
        color: #fff;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        font-size: 15px;
        width: 186px;
        height: 55px;
        background: #000;
        border-radius: 10px;
      }
    }
  }

  &.mobile {
    .category-product-bg {
      width: 100%;
      margin: 0 auto;
      position: relative;
      margin-top: 20px;

      .title {
        background: url(../../../../assets/Images/pro_title.png) top left no-repeat;
        background-size: cover;
        width: 100%;
        -webkit-background-size: 86%;
        height: 4rem;

        h2 {
          color: #fff;
          line-height: 3.5rem;
          position: absolute;
          z-index: 999;
          font-size: 1.2rem;
          margin-left: 2%;
        }

        .more {
          display: block;
          /* top: 50%; */
          text-align: center;
          margin: 0 auto;
          position: absolute;
          width: 100%;
          float: right;
          right: 17%;
          /* padding-top: 5px; */
          width: 40px;
          height: 3rem;
          color: #fff;
          background: #000;
          cursor: pointer;
          /* border-radius: 8px; */
          background: url(../../../../assets/Images/more_ico_pro.png) top left no-repeat;
          background-size: 70%;
          margin-top: 4px;
        }
      }

      .picimg {
        width: 100%;
        margin: 0 auto;
        display: inline-block;
        margin-top: 2rem;

        .product-list-box {
          position: relative;
          width: 98%;
          margin: 0 auto;
          text-align: center;

          .product-list-one_1 {
            width: 47%;
            display: inline-block;
            margin-right: 1%;
            margin-left: 1%;
            margin-bottom: 1rem;

            .ban-setting {
              width: 90%;
              margin: 0 auto;

              img {
                width: 100%;
              }
            }

            .captn {
              color: #333;
              padding-top: 5px;
              padding-bottom: 5px;
              background: #fff;
              width: 95%;
              margin: 0 auto;
              margin-bottom: 10px;

              .p-name {
                color: #000000;
                text-align: center;
                font-size: 0.9rem;
                margin-top: 0.7rem;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                -moz-line-clamp: 2;
                box-orient: vertical;
                -webkit-box-orient: vertical;
                -moz-box-orient: vertical;
                overflow: hidden;
              }

              .p-price-box {
                text-align: center;
                margin-top: 0.7rem;

                .p-price-discount {
                  color: #ff0000;
                  font-size: 1.2rem;
                  vertical-align: top;
                  display: inline-block;
                }
              }

              .p-addtocart {
                display: block;
                margin: 0 auto;
                line-height: 2rem;
                /* border-radius: 1rem; */
                text-align: center;
                background-color: #2e2e2e;
                color: #fff;
                width: 70%;
                height: 2rem;
                margin-top: 5px;
                text-decoration: none;
              }
            }
          }
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
