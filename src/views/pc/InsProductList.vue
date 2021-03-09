<template>
  <div class="pcVersionSearch">
    <div class="ProducBanner">
      <ProductListSwiper class="innerBanner" />
    </div>
    <div class="clear"></div>
    <div class="ProductSearch">
    <div class="SearchSlide">
      <div class="leftSide">
        <AdvancedList
          @advancedChange="advancedChange"
          v-if="isAdvanced"
          @closeSub="closeSub"
          @resetAll="resetAll"
        />
      </div>
    </div>
    <div class="selectBar">
      <ul>
        <li @click="showSearchSlide">
          <span class="el-icon-s-operation"></span
          ><b>{{ $t("home.Screening") }}</b>
        </li>
        <li>{{ $t("Action.Total") }}&nbsp;{{totalRecord}}&nbsp;{{ $t("Action.Products") }}</li>
        <li>
          <select v-model="PriceItem" @change="getselect(PriceItem)">
            <option value="desc">{{ $t("home.PriceHL") }}</option>
            <option value="asc">{{ $t("home.PriceLH") }}</option>
          </select>
        </li>
      </ul>
    </div>
      <transition name="slide">
      <div key="1" v-if="!waiting">
            <div class="prolist-box">
              <ins-productList :column="4" :allItems="proList" />
              <div class="pager" v-if="totalRecord > 12">
                <InsPage
                  :total="totalRecord"
                  v-model="currentPage"
                  :pageNum="pageSize"
                ></InsPage>
              </div>
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
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import YouWouldLike from '@/model/youWouldLike';
@Component({
  components: {
    InsProductList: () =>
      import(/* webpackChunkName: "product" */ '@/components/business/pc/product/InsProductList.vue'),
    AdvancedList: () =>
      import(/* webpackChunkName: "product" */ '@/components/hkTasteBusiness/pc/product/InsAdvancedList.vue'),
    ProductListSwiper: () =>
      import(/* webpackChunkName: "product" */ '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue'),
    InsPage: () => import(/* webpackChunkName: "product" */ '@/components/base/pc/InsPage.vue')
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 12; // 每页显示条目个数
  totalRecord: number = 0; // 总条目数
  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: number[] = []; // 选中的产品目录数组
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  searchBar: boolean = true;
  isAdvanced: boolean = true; // 是否显示高级搜索组件
  PriceItem: string = 'desc';
  private waiting: boolean = true;
  // 搜索关键词
  get searchKey () {
    let a = this.$route.params.key;
    if (a === '-') {
      return '';
    } else {
      return a;
    }
  }
  // 判断是否从搜索框进来
  searchBarshow () {
    var href = window.location.href;
    if (href.indexOf('attrs') === -1) {
      this.searchBar = false;
    }
  }
  // 产品高级搜索
  productSearch () {
    this.TShake(() => {
      this.$Api.product
        .search({
          Key: this.searchKey,
          PageInfo: {
            Page: this.currentPage,
            PageSize: this.pageSize,
            SortName: 'SalePrice',
            SortOrder: this.PriceItem
          },
          CatIdS: this.searchCatalogs,
          Attrs: this.attrs,
          Type: this.searchType
        })
        .then(result => {
          this.proList = result.YouWouldLike;
          this.totalRecord = result.TotalRecord;
          this.waiting = false;
          this.$HiddenLayer();
        });
    }, 500);
  }
  delay = 0;
  TShake (fn, d) {
    if (!(fn instanceof Function)) return;
    let timeout = d || 200;
    if (this.delay === 0) {
      this.delay = setTimeout(fn, timeout);
    } else {
      clearTimeout(this.delay);
      this.delay = setTimeout(fn, timeout);
    }
  }
  // 关闭筛选弹窗
  closeSub () {
    $('.SearchSlide').fadeOut();
    $('.leftSide').removeClass('closeBar');
    document.body.style.overflow = 'auto';
  }
  // 打开筛选弹窗
  showSearchSlide () {
    $('.SearchSlide').fadeIn();
    $('.leftSide').addClass('closeBar');
    document.body.style.overflow = 'hidden';
  }
  // 重置搜索
  async resetAll () {
    await this.$router.push(
      '/product/list/-?attrs=%5B%5D&catalogs=%5B%5D&type=1'
    );
    this.closeSub();
    this.Reload();
  }
  // 价格传值
  getselect (val) {
    this.PriceItem = val;
    this.productSearch();
  }
  // 高级搜索改变
  advancedChange (Attrs, Catalogs) {
    this.currentPage = 1;
    this.attrs = Attrs;
    if (Attrs.length > 0) {
      if (Attrs[0].Vals[0] === 14) {
        this.$nextTick(() => {
          document.title = this.$t('Action.HotPot') as string;
        });
      }
      if (Attrs[0].Vals[0] === 15) {
        this.$nextTick(() => {
          document.title = this.$t('Action.BBQ') as string;
        });
      }
      if (Attrs[0].Vals[0] === 16) {
        this.$nextTick(() => {
          document.title = this.$t('Action.Dishes') as string;
        });
      }
    }
    this.searchCatalogs = Catalogs;
    this.productSearch();
  }
  mounted () {
    this.searchBarshow();
  }

  @Watch('searchKey', { deep: true })
  onSearchKeyChange () {
    this.productSearch();
  }

  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    this.productSearch();
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.Reload();
  }
}
</script>

<style lang="less">
.newProductList {
  width: 100% !important;
}
.pcVersionSearch {
  background: url("/images/pc/productlist_bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  display: inline-block;
  width: 100%;
}
.prolist-box {
  position: relative;
  .pager {
    text-align: center;
    margin: 60px 0;
    button,
    li {
      margin: 0 6px !important;
      // border: 1px solid #e5e5e5;
      width: 50px;
      height: 50px;
      padding: 0 !important;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      min-width: unset;
      border-radius: 5px;
      background-color: #f0f0f0;
    }

    li {
      font-family: "SourceHanSansSC-Regular";
      font-size: 20px;
      color: #333333;
      font-weight: normal;
      border-left: 0;
      &.active {
        background-color: #95d303;
        color: #fff;
      }

      &:last-child {
        border-right: 0;
      }
    }

    .el-pagination button {
      background-color: #95d303;

      .el-icon {
        font-size: 20px;
        color: #fff;
      }

      &:disabled {
        background-color: #f0f0f0;
        .el-icon {
          color: #333333;
        }
      }
    }
  }
}
</style>
<style scoped lang="less">
.SearchSlide {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.6);
  overflow-x: scroll;
  z-index: 999999;
  display: none;
  .leftSide {
    width: 25%;
    left: -25%;
    min-height: 100%;
    position: absolute;
    transition: all 0.5s;
  }
}
.closeBar {
  left: 0% !important;
}
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
.ProductSearch {
  width: 1200px;
  margin: 50px auto 150px;
  .ProductAttrBox {
    width: 20%;
    float: left;
    margin-right: 5%;
  }
  .prolist-box {
    width: 100%;
    display: inline-block;
    .pager {
      text-align: center;
      margin: 60px 0;
    }
  }
}
.selectBar{
    width: 100%;
    margin: 0 auto;
    display: inline-block;
    margin-bottom: 2rem;
  li{
    float: left;
    margin-right: 0%;
    border: 1px solid #eee;
    height: 40px;
    line-height: 40px;
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    &:first-child{
      width: 20%;
      background: #666;
      cursor: pointer;
      color:#fff;
    }
    &:nth-child(2){
      width: calc(60% - 4px);
      border: none;
      font-size: 25px;
    }
    span{
      width: 20%;
      display: inline-block;
      font-size: 1.4rem;
      text-align: center;
    }
    b{
      width: 60%;
      display: inline-block;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 500;
    }
    select{
    width: 100%;
    border: none;
    padding-left: 1rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 1.2rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(/images/mobile/downicon.png) 98% 20px no-repeat;
    background-size: 18px;
    outline:none;
    cursor: pointer;
    }
    &:last-child{
      margin-right: 0px!important;
      background: #FFF!important;
      width: 20%;
      cursor: pointer;
    }
 }
 .selectBar ul{
    width: 100%;
    margin: 0 auto;
 }
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
