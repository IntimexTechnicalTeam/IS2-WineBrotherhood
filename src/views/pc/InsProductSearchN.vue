<template>
  <div id="container">
    <div class="ProducBanner">
      <ProductListSwiper
        class="innerBanner"
        :TitleName="$t('product.Producttitle')"
      />
    </div>
    <div class="ProductSearch">
      <div class="SearchSlide">
        <div class="leftSide">
          <advancedSearch
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
            ><b>{{ $t("product.Screening") }}</b>
          </li>
          <li style="width: 810px;border: none;">
            {{ $t("product.Total") }} {{ totalRecord }}
            {{ $t("product.Product") }}
          </li>
          <li style="width: 140px;">
            <select v-model="PriceItem" @change="getselect(PriceItem)">
              <option value="">{{ $t("product.Paixu") }}</option>
              <option value="desc">{{ $t("product.PriceHL") }}</option>
              <option value="asc">{{ $t("product.PriceLH") }}</option>
            </select>
          </li>
        </ul>
      </div>
      <!-- <advancedSearch :attrType="2"  @advancedChange="advancedChange" /> -->
      <transition name="slide">
        <div key="1" v-if="!waiting">
          <div class="prolist-box" v-if="proList.length > 0">
            <ins-productList :column="4" :allItems="proList" />
            <div class="pager" v-if="totalRecord > pageSize">
              <InsPage
                :total="totalRecord"
                v-model="currentPage"
                :pageNum="pageSize"
              ></InsPage>
            </div>
          </div>
          <div class="prolist-box" v-else>
            <h3 class="nocontentTips">{{ $t("messageTips.NoContent") }}</h3>
          </div>
        </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import YouWouldLike from '@/model/youWouldLike';
import $ from 'jquery';
@Component({
  components: {
    InsProductList: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/business/pc/product/InsProductList.vue'
      ),
    advancedSearch: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/hkTasteBusiness/pc/product/InsAdvancedSearch.vue'
      ),
    InsPage: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/base/pc/InsPage.vue'
      ),
    ProductListSwiper: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue'
      )
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 16; // 每页显示条目个数
  totalRecord: number = 0; // 总条目数
  private tips: boolean = true;
  private LoadingInstance!: any;

  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: number[] = []; // 选中的产品目录数组
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  isAdvanced: boolean = true;
  PriceItem: string = '';
  private waiting: boolean = true;
  // 搜索关键词
  get searchKey() {
    let a = this.$route.params.key;
    if (a === '-') {
      return '';
    } else {
      return a;
    }
  }
  // 重置搜索
  resetAll() {
    // this.$router.push('/product/search/-');
    window.location.href = '/product/search/-';
    this.closeSub();
  }
  // 关闭筛选弹窗
  closeSub() {
    $('.SearchSlide').fadeOut();
    $('.leftSide').removeClass('closeBar');
    document.body.style.overflow = 'auto';
  }
  // 打开筛选弹窗
  showSearchSlide() {
    $('.SearchSlide').fadeIn();
    $('.leftSide').addClass('closeBar');
    document.body.style.overflow = 'hidden';
  }
  // 价格传值
  getselect(val) {
    this.PriceItem = val;
    this.productSearch();
  }
  // 产品高级搜索
  productSearch() {
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
          Type: this.searchType,
          Reflesh: 1
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
  TShake(fn, d) {
    if (!(fn instanceof Function)) return;
    let timeout = d || 200;
    if (this.delay === 0) {
      this.delay = setTimeout(fn, timeout);
    } else {
      clearTimeout(this.delay);
      this.delay = setTimeout(fn, timeout);
    }
  }
  advancedChange(Attrs, Catalogs) {
    this.currentPage = 1;
    this.attrs = Attrs;
    this.searchCatalogs = Catalogs;
    this.productSearch();
  }

  mounted() {
    // this.productSearch();
  }

  @Watch('searchKey', { deep: true })
  onSearchKeyChange() {
    this.productSearch();
  }

  @Watch('currentPage', { deep: true })
  onCurrentPage() {
    this.productSearch();
  }
}
</script>

<style lang="less">
.prolist-box {
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
.nocontentTips {
  width: 95%;
  margin: 0 auto;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: left;
  display: block;
  padding: 1rem;
  color: #666;
}
.faker {
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
.ProducBanner {
  width: 100%;
  background-size: 100% 100%;
  display: inline-block;
  box-sizing: border-box;
  .innerBanner {
    width: 100%;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
.ProductSearch {
  .InsAdvancedSearch {
    background: #fff;
    height: 100vh;
    overflow-y: scroll;
  }
}
.SearchSlide {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.6);
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
.ProductSearch {
  width: 1200px;
  margin: 50px auto 150px;

  .prolist-box {
    .pager {
      text-align: center;
      margin: 60px 0;
    }
  }
}
.banner {
  position: relative;
  img {
    width: 100%;
  }
  .titlename {
    position: absolute;
    top: 40%;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    span {
      width: 1200px;
      margin: 0 auto;
      display: block;
      color: #fff;
      font-size: 28px;
      letter-spacing: 10px;
    }
  }
}
.closeBar {
  left: 0% !important;
}
.selectBar {
  width: 100%;
  margin: 0 auto;
  display: inline-block;
  margin-top: 2rem;
  ul {
    width: 100%;
    margin: 0 auto;
  }
  li {
    float: left;
    margin-right: 4%;
    border: 1px solid #eee;
    height: 40px;
    line-height: 40px;
    list-style: none;
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    span {
      width: 20%;
      display: inline-block;
      font-size: 20px;
      text-align: center;
      color: #909399;
    }
    b {
      width: 60%;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }
    select {
      width: 100%;
      border: none;
      padding-left: 0.5rem;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background: url(/images/mobile/arrow-down-back.png) 90% 17px no-repeat;
      background-size: auto;
      outline: none;
      cursor: pointer;
    }
    &:last-child {
      margin-right: 0px !important;
      background: #fff !important;
      color: #333333;
      cursor: pointer;
    }
    &:first-child {
      width: 140px;
      cursor: pointer;
    }
  }
}
</style>
