<template>
  <div id="container">
    <accountHeader/>
    <p class="pageTitle">{{$t('Order.OrderTitle')}}</p>
    <transition name="slide">
      <div key="1" v-if="!waiting">
    <div class="OrderMain OrderMobile">
    <Card shadow="hover" class="OrderCard">
      <Row
        :gutter="20"
        v-for="(d,index) in OrderList"
        :key="index"
        class="OrderListHole"
      >
        <!-- 列表循环开始 -->
          <Row :gutter="0" class="OrderPer">
            <ElCol :xs="12" :md="12" class="CreateTime">{{d.CreateAt}}</ElCol>
            <ElCol :xs="12" :md="12" class="OrderStatus">{{d.StatusName}}</ElCol>
          </Row>
           <Row :gutter="10" >
              <ElCol :xs="8" :md="8">
                <router-link class="product-img" :to="'/product/detail/'+d.OrderItems[0].Sku">
                  <img v-bind:src="d.OrderItems[0].Product.Images[2]" alt />
                </router-link>
              </ElCol>
              <ElCol :xs="16" :md="16" class="OrderListDetail">
              <p class="product-title">{{d.OrderItems[0].Product.Name}}</p>
              <p>
              <span class="order-items" v-if="d.OrderItems[0].AttrName1">{{d.OrderItems[0].AttrType1.Name}}:{{d.OrderItems[0].AttrName1}}</span>
              <span class="order-items" v-if="d.OrderItems[0].AttrName2">{{d.OrderItems[0].AttrType2.Name}}:{{d.OrderItems[0].AttrName2}}</span>
              <span class="order-items" v-if="d.OrderItems[0].AttrName3">{{d.OrderItems[0].AttrType3.Name}}:{{d.OrderItems[0].AttrName3}}</span>
              </p>
              <p class="product-quantity">{{d.OrderItems.length}} {{$t('Order.Items')}}</p>
              <p class="product-price">
                  <span class="p-price-discount">{{$t('CheckOut.Total')}}&nbsp;{{d.Currency.Code}} {{(d.TotalAmount) | PriceFormat}}</span>
                </p>
              </ElCol>
           </Row>
          <Row :gutter="20" class="order_btn">
          <ElCol :xs="12" :md="12">
            <ElButton
              type="success"
              icon="el-icon-money"
              class="OrderBtn"
              @click="Evidence(d)"
              v-show="d.OffLinePay && d.StatusCode=='0'"
            >{{$t('Message.Evidence')}}</ElButton>
            <ElButton
              type="success"
              icon="el-icon-money"
              class="OrderBtn"
              @click="PayNow(d)"
              v-show="!d.OffLinePay && d.StatusCode=='0'"
            >{{$t('Order.OrderPay')}}</ElButton>
            <ElButton
              type="success"
              icon="el-icon-document"
              class="OrderBtn"
             @click="OrderComment(d)"
              v-show="d.StatusCode=='5'"
            >{{$t('Order.OrderComment')}}</ElButton>
          </ElCol>
          <ElCol :xs="12" :md="12" style="float:right;">
            <ElButton
              type="info"
              icon="el-icon-document"
              class="OrderBtn"
              @click="ShowDetail(d)"
            >{{$t('Order.OrderDetail')}}</ElButton>
        </ElCol>
          </Row>
      </Row>
    </Card>
      <!-- 列表循环结束 -->
      <!-- 分页开始 -->
        <inPage v-model="CurrentPage" :total="TotalRecord" :pageNum="pageNumber" styla="margin-top:20px;" v-show="TotalRecord>0"></inPage>
      <!-- 分页结束 -->
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
import { Loading, Row, Card, Col as ElCol, Button as ElButton, Radio } from 'element-ui';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue'),
    inPage: () => import('@/components/base/mobile/InsPage.vue'),
    ElButton,
    Radio,
    Row,
    Card,
    ElCol
  }
})
export default class InsOrderList extends Vue {
  private waiting: boolean = true;
  private CurrentPage: number = 1;
  private pageNumber: number = 12;
  TotalRecord: number = 0;// 总条目数
  OrderListLength: any = '';
  OrderList:any[]=[];
  fullscreenLoading:boolean =false;
  getOrder () {
    let that = this;
    return that.$Api.order.getPageOrder(that.pageNumber, that.CurrentPage).then((result) => {
      that.OrderList = result.Data;
      that.TotalRecord = result.TotalRecord;
      that.waiting = false;
      // eslint-disable-next-line no-unused-expressions
    });
  }
  async created () {
    let that = this;
    this.getOrder();
  }
  ShowDetail (order) {
    // 新窗口打开路由
    let routeData = this.$router.push({
      path: '/order/detail',
      name: 'detail',
      params: { id: order.OrderId }
    });
  }
  Evidence (val) {
    this.$router.push('/order/evidence/' + val.OrderId);
  }
  // 支付打开页面
  PayNow (order) {
    window.open('/PG/pay/' + order.PaymentMethod + '/IS/' + order.OrderId, '_blank');
  }
  OrderComment (order) {
    this.$router.push({
      path: '/account/orderComment',
      name: 'orderComment',
      params: { id: order.OrderId }
    });
  }
  @Watch('CurrentPage')
  onPageChange (o, n) {
    this.getOrder();
  }
}
</script>
<style lang="less">
.OrderMobile .el-button [class*=el-icon-]+span{
      font-size: 1.2rem;
}
</style>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.order-items{
  color:#666;
  font-size: 14px;
  line-height: 25px;
  padding-right: 20px;
}
.searchInput {
  margin-bottom: 20px;
  margin-left: -10px;
  margin-right: -10px;
}
.OrderMain {
  width:95%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
}
.OrderCard {
  padding-bottom: 10px;
}
.OrderMain .el-button + .el-button {
  margin-left: 0px;
}
.OrderMain  .OrderBtn {
  width: 100%;
  margin-top: 20px;
}
.OrderMain .el-button--success {
    color: #fff;
    background-color: @base_color;
    border-color: @base_color;
}
.OrderMain .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: @base_color;
}
.CreateTime {
  text-align: left;
  padding-left: 10px;
  font-size: 13px;
  color: #666;
}
.OrderStatus {
  text-align: center;
  font-size: 13px;
  color: #d92526;
}
.OrderPer {
  line-height: 35px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}
.OrderListHole {
  margin-bottom: 20px;
  padding-top: 20px;
  cursor: pointer;
  transition: 1s ease;
  -webkit-transition: 1s ease;
  -moz-transition: 1s ease;
  -ms-transition: 1s ease;
}

.product-img {
  width: 100%;
  display: block;
}
.product-img img {
  width: 100%;
  border-radius: 10px;
}
.OrderListDetail {
  text-align: left;
}
.OrderListDetail p{
    line-height: 2rem;
    margin: 0px;
}
.product-title {
  color: #333;
  font-size: 18px;
}
.product-quantity{
  font-size: 14px;
  color:#666;
}
.product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.product-code span {
  padding-right: 8px;
  font-size: 14px;
}
.p-price-discount {
  font-size: 1.4rem;
  color: #d92526;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
