<template>
  <div id="container" style="padding-bottom:50px;">
    <accountHeader/>
    <!--main-content-->
    <div class="maincontent">
    <p class="pageTitle">{{$t('MyFavorite.MyFavorite')}}</p>
    <transition name="slide">
    <div key="1" v-if="!waiting">
          <div class="favorite-box">
            <div class="favorite-box-content">
            <Row
                :gutter="20"
                v-for="(d,index) in favoriteList.slice((currentPage- 1)*pagesize,currentPage*pagesize)"
                :key="index"
                class="Favormain"
              >
                <!-- 列表循环开始 -->
                <Card shadow="hover" class="FavorCard">
                  <ElCol :xs="3" :md="3">
                    <router-link class="product-img" :to="'/product/detail/'+d.Sku">
                      <img v-bind:src="d.Img_M" alt />
                  </router-link>
                  </ElCol>
                  <ElCol :xs="15" :md="15" class="OrderListDetail">
                    <p class="product-title">{{d.Name}}</p>
                    <p class="product-code">{{d.Code}}</p>
                    <p class="product-price">
                      <span class="p-price-discount">{{d.Currency.Code}} {{(d.SalePrice) | PriceFormat}}</span>
                    </p>
                  </ElCol>
                  <ElCol :xs="6" :md="6">
                    <ElButton
                      round
                      icon="el-icon-document"
                      class="OrderBtn  green-btn"
                      @click="ShowDetail(d.Sku)"
                      style="width:180px;float:right;"
                    >{{$t('MyFavorite.LearnMore')}}</ElButton>

                    <ElButton
                      type="info"
                      round
                      icon="el-icon-delete"
                      class="OrderBtn"
                      @click="removeFavorite(d.Sku)"
                      style="width:180px;float:right;"
                    >{{$t('MyFavorite.RemoveProduct')}}</ElButton>
                  </ElCol>
                </Card>
              </Row>
              <!-- 列表循环结束 -->
              <!-- 分页开始 -->
              <Pagination
                layout="prev, pager, next"
                :page-size="pagesize"
                @current-change="currentChange"
                @size-change="handleSizeChange"
                :current-page="currentPage"
                :total="FavoriteLength"
                :pager-count="5"
                v-if="FavoriteLength>1"
                background
              ></Pagination>
              <!-- 分页结束 -->
            </div>
          </div>
    </div>
    </transition>
    <transition name="slide">
      <div class="faker" key="2" v-if="waiting" v-loading="true">
      </div>
    </transition>
    <!--main-content-->
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pagination, Button, Col, Card, Row } from 'element-ui';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    Pagination,
    Button,
    Col,
    Row,
    Card
  }
})
export default class InsMyFavorite extends Vue {
  currentPage: number = 1;
  pagesize: number = 12;
  FavoriteLength: any = '';
  favoriteList:any[]=[];
  private waiting: boolean = true;
  ShowDetail (Sku) {
    // 新窗口打开路由
    let routeData = this.$router.push({
      path: '/product/detail',
      name: 'ProductsDetail',
      params: { id: Sku }
    });
  }
  currentChange (currentPage) {
    // 改变当前页
    this.currentPage = currentPage;
  }
  // 点击上一页和下一页的时事件
  handleSizeChange (psize) {
    this.pagesize = psize;
  }

  getAllFavorite () {
    this.$Api.member.getFavorite().then((result) => {
      this.favoriteList = result;
      this.FavoriteLength = result.length;
      this.waiting = false;
    });
  }

  removeFavorite (sku) {
    let _this = this;
    let skustring = sku;
    this.$Api.member.removeFavorite(skustring).then((result) => {
      _this.$message({
        message: this.$t('MyFavorite.RemoveSuccess') as string,
        type: 'success',
        customClass: 'messageboxNoraml'
      });
      _this.getAllFavorite();
    }).catch((error) => {
      console.log(error);
    });
  }
  created () {
    this.getAllFavorite();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style scoped lang="less">
#main-content {
  width: 1200px;
  margin: 0 auto;
}
.login-register-title {
  float: left;
  width: 300px;
  height: 45px;
  line-height: 45px;
  margin-left: 160px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  background-color: @primary_color;
}
.favorite-box .login-register-title {
  margin-left: 0;
}

.favorite-box {
  font-family: "Arial", "微软雅黑";
  position: relative;
}

.favorite-box-content {
  margin-top: 30px;
  text-align: left;
  /*border-top:1px solid #88bd43;*/
}
.Favormain {
  margin-bottom: 20px;
  padding-top: 20px;
  cursor: pointer;
  transition: 1s ease;
  -webkit-transition: 1s ease;
  -moz-transition: 1s ease;
  -ms-transition: 1s ease;
}
.FavorCard {
  padding-bottom: 10px;
}
.product-img {
  width: 100%;
  display: block;
}
.product-img img {
  width: 100%;
}
.product-title {
  color: #333;
  font-size: 18px;
}
.product-code {
  color: #b2b2b2;
  font-size: 14px;
  margin: 15px 0;
}
.p-price-discount {
  font-size: 18px;
  color: #d92526;
}
.OrderBtn {
  width: 100%;
  margin-bottom: 20px;
}
.green-btn {
    background-color: @base_color;
    border: 1px solid @base_color;
}
.Favormain .el-button{
  color:#FFF;
}
.el-button + .el-button {
  margin-left: 0px;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
