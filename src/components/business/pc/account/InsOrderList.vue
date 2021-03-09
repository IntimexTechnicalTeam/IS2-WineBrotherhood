<template>
  <div id="container">
    <accountHeader/>
      <div class="maincontent">
      <p class="pageTitle">{{$t('Order.OrderTitle')}}</p>
     <transition name="slide">
      <div key="1" v-if="!waiting">
              <div class="OrderMain OrderPc">
                <Card shadow="hover" class="OrderCard">
                  <Row
                    :gutter="20"
                    v-for="(d,index) in OrderList"
                    :key="index"
                    class="OrderListHole"
                    style="padding:10px;"
                  >
                    <!-- 列表循环开始 -->
                      <Row :gutter="0" class="OrderPer">
                        <ElCol :xs="12" :md="12" class="CreateTime">{{d.CreateAt}}</ElCol>
                        <ElCol :xs="12" :md="12" class="OrderStatus">{{d.StatusName}}</ElCol>
                      </Row>
                      <Row :gutter="10" >
                          <ElCol :xs="3" :md="3">
                            <router-link class="product-img" :to="'/product/detail/'+d.OrderItems[0].Sku">
                              <img v-bind:src="d.OrderItems[0].Product.Images[2]" alt />
                            </router-link>
                          </ElCol>
                          <ElCol :xs="18" :md="18" class="OrderListDetail">
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
                          <ElCol :xs="3" :md="3">
                            <ElButton
                              type="info"
                              icon="el-icon-document"
                              class="OrderBtn"
                              @click="ShowDetail(d)"
                            >{{$t('Order.OrderDetail')}}</ElButton>
                            <ElButton
                              type="success"
                              icon="el-icon-money"
                              class="OrderBtn"
                              @click="Evidence(d)"
                              v-show="d.OffLinePay  && d.StatusCode=='0'"
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
                              icon="el-icon-money"
                              class="OrderBtn"
                              @click="OrderComment(d)"
                              v-show="d.StatusCode=='5'"
                            >{{$t('Order.OrderComment')}}</ElButton>
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
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Loading, Card, Row, Col as ElCol, Button as ElButton } from 'element-ui';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    inPage: () => import('@/components/base/pc/InsPage.vue'),
    Card,
    Row,
    ElCol,
    ElButton
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
  Evidence (val) {
    this.$router.push('/order/evidence/' + val.OrderId);
  }
  ShowDetail (order) {
    // 新窗口打开路由
    let routeData = this.$router.push({
      path: '/order/detail',
      name: 'detail',
      params: { id: order.OrderId }
    });
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
.el-pagination{
  margin-top: 20px;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
      background-color: #ffffff!important;
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
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  position: relative;
}
.OrderCard {
  padding-bottom: 10px;
}
.OrderMain .el-button + .el-button {
  margin-left: 0px;
}
.OrderBtn {
  width: 100%;
  margin-bottom: 20px;
}
.OrderMain .el-button--success {
    color: #fff;
    background-color: @base_color;
    border-color: @base_color;
}
.OrderMain .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #8dc11f;
}
.CreateTime {
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
  color: #666;
}
.OrderStatus {
  text-align: right;
  font-size: 16px;
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
  line-height: 30px;
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
  font-size: 18px;
  color: #d92526;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
