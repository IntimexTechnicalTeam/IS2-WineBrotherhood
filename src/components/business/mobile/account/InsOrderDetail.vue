<template>
  <div id="container">
    <accountHeader/>
    <p class="pageTitle">{{$t('Order.OrderDetail')}}</p>
      <transition name="slide">
      <div key="1" v-if="!waiting">
        <div class="OrderMain">
          <!-- 订单详情列表开始 -->
          <div>
            <Row class="OrderHeadTitle">
              <ElCol :span="24">{{$t('Order.OrderDateTime')}}:{{OrderDetail.CreateAt}}</ElCol>
            </Row>
            <Row class="OrderHeadTitle">
              <ElCol :xs="4" :md="4">{{itemsLenth}}{{$t('Order.Items')}}</ElCol>
              <ElCol :xs="20" :md="20">{{$t('Order.OrderNumber')}}:{{OrderDetail.InvoiceNO}}</ElCol>
            </Row>
            <div>
              <div>
                <Card shadow="hover" class="OrderCard" body-style="padding:10px;">
                  <Row
                    :gutter="15"
                    class="OrderPer"
                    v-for="(item,index) in OrderDetail.OrderItems"
                    :key="index"
                  >
                    <ElCol :xs="8" :md="8">
                      <router-link class="product-img" :to="'/product/detail/'+item.Sku">
                        <img v-bind:src="item.Product.Images[2]" alt />
                      </router-link>
                    </ElCol>
                    <ElCol :xs="16" :md="16" class="OrderListDetail">
                      <p class="product-title">{{item.Product.Name}}</p>
                      <p class="product-code">{{item.Product.Code}}</p>
                      <p class="product-code">
                        {{item.AttrType1.Name}}
                        <span v-if="item.AttrType1.Name!==null">{{item.AttrType1.Name}} : {{item.AttrName1}}</span>
                        <span v-if="item.AttrType2.Name!==null">{{item.AttrType2.Name}} : {{item.AttrName2}}</span>
                        <span v-if="item.AttrType3.Name!==null">{{item.AttrType3.Name}} : {{item.AttrName3}}</span>
                        <span>{{item.Qty}}</span>
                      </p>
                      <p class="product-price">
                        <span  class="p-price-discount">{{CurrencyCode}} {{(item.Product.SalePrice) | PriceFormat}}</span>
                      </p>
                    </ElCol>
                  </Row>
                </Card>
              </div>
            </div>
            <!-- 统计价钱开始 -->
            <Row :gutter="20">
              <ElCol :xs="12" :md="12" class="OrderBottomP1">{{$t('Order.CartSubtotal')}}</ElCol>
              <ElCol :xs="12" :md="12" class="OrderBottomP2">{{CurrencyCode}} {{(OrderDetail.ItemsAmount) | PriceFormat}}</ElCol>
            </Row>
            <Row :gutter="20">
              <ElCol :xs="12" :md="12" class="OrderBottomP1">{{$t('Order.DeliveryCharge')}}</ElCol>
              <ElCol :xs="12" :md="12" class="OrderBottomP2">{{CurrencyCode}} {{(OrderDetail.DeliveryCharge) | PriceFormat}}</ElCol>
            </Row>
            <Row :gutter="20">
              <ElCol :xs="12" :md="12" class="OrderBottomP1">{{$t('Shoppingcart.Total')}}</ElCol>
              <ElCol :xs="12" :md="12" class="OrderBottomP2">{{CurrencyCode}} {{(OrderDetail.TotalAmount) | PriceFormat}}</ElCol>
            </Row>
            <Row :gutter="20">
              <ElCol :xs="12" :md="12" class="OrderBottomP1">{{$t('Order.OrderStatus')}}</ElCol>
              <ElCol :xs="12" :md="12" class="OrderBottomP2">{{OrderDetail.StatusName}}</ElCol>
            </Row>
            <!-- 统计价钱结束 -->
          </div>
          <!-- 订单详情列表结束 -->

          <!-- 支付按钮和关闭开始 -->
          <Row :gutter="20" class="OrderBtnGroup">
            <ElCol :xs="12" :md="12" class="OrderBottomBtn" v-show="OrderDetail.StatusCode=='0'" >
              <ElButton type="success" round @click="PayNow(OrderDetail)" >
                <i class="el-icon-bank-card"></i>
                <span>{{$t('Order.OrderPay')}}</span>
              </ElButton>
            </ElCol>
            <ElCol :xs="12" :md="12"  class="OrderBottomBtn">
              <ElButton type="info" round @click="closePage">
                <i class="el-icon-switch-button"></i>
                <span>{{$t('DeliveryAddress.CloseBtn')}}</span>
              </ElButton>
            </ElCol>
          </Row>
          <!-- 支付按钮和关闭结束 -->
        </div>
    </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Row, Col as ElCol, Card, Button as ElButton } from 'element-ui';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue'),
    Row,
    ElCol,
    Card,
    ElButton
  }
})
export default class InsOrderDetail extends Vue {
  newarry: any[] = [];
  OrderId: any = '';
  OrderDetail: any[] = [];
  CurrencyCode:string='HKD';
  itemsLenth:number=0;
  private waiting: boolean = true;
  // 获取订单传值和显示数据
  getOrderDetail () {
    let that = this;
    let OrderId = that.$route.params.id;
    that.$Api.order.getOrderDetail(OrderId).then(result => {
      that.OrderDetail = result;
      that.CurrencyCode = result.Currency.Code;
      that.itemsLenth = result.OrderItems.length;
      that.waiting = false;
    });
  }
  // 支付打开页面
  PayNow (order) {
    // let routeData = this.$router.resolve({
    //   path: '/payment/' + order.PaymentMethod + '/',
    //   name: 'payment',
    //   params: { id: order.OrderId }
    // });
    // window.open(routeData.href, '_blank');
    let url = '/PG/pay/' + order.PaymentMethod + '/IS/' + order.OrderId;
    window.open(url);
  }

  // 立即关闭按钮
  closePage () {
    this.$router.push({ path: '/order/List' });
  }

  // 页面创建成功时加载数据
  created () {
    this.getOrderDetail();
  }
}
</script>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.OrderMain .el-button--success {
  color: #fff;
  background-color: @base_color;
  border-color: @base_color;
}
.OrderBtnGroup {
  margin-top: 30px;
}
.OrderMain .OrderHeadTitle {
  line-height: 40px;
}
 .OrderMain .OrderHeadTitle div {
  text-align: left;
  font-size: 13px;
  color: #666;
}
.OrderMain {
  width:95%;
  margin: 0 auto;
  margin-top: 1rem;
  padding-bottom: 3rem;
}
.OrderBottomBtn{
  float:right!important;
}
.OrderBottomBtn button {
  width: 100%;
}
.OrderBottomBtn span {
  font-size: 18px;
}
.OrderBottomBtn i {
  font-size: 18px;
}
.OrderQty {
  font-size: 16px;
  color: #666;
}
.OrderBottomP1 {
  text-align: right;
  font-size: 1.4rem;
  line-height: 3.5rem;
}
.OrderBottomP2 {
    text-align: left;
    font-size: 1.4rem;
    color: #d92526;
    display: flex;
    align-items: center;
     line-height: 3.5rem;
}
.product-img {
  width: 100%;
  display: block;
}
.product-img img {
  width: 100%;
  border-radius: 10px;
}
.OrderCard {
  margin-bottom: 20px;
}
.OrderCard p{
  line-height: 35px;
}
.OrderPer {
    margin-bottom: 0px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
    padding-top: 5px;
    padding-bottom: 5px;
}
.OrderPer:last-child{
  border-bottom:0px!important;
}
.OrderListDetail {
  text-align: left;
}
.product-title {
  color: #333;
  font-size: 18px;
}
.product-code {
  color: #b2b2b2;
  font-size: 14px;
}
.product-code span {
  padding-right: 8px;
  font-size: 14px;
}
.p-price-discount {
  font-size: 18px;
  color: #d92526;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
