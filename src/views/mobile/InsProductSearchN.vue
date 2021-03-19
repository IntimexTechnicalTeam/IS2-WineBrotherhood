<template>
  <div id="container" class="ProductSearch">
        <div class="ProducBanner">
            <ProductListSwiper :TitleName="$t('product.Producttitle')"/>
        </div>
        <div class="SearchSlide">
          <div class="drawer-bg" v-if="showSearchSlide"  @click="handleClickOutside"/>
          <div class="leftSide">
            <advancedSearch @advancedChange="advancedChange" v-if="isAdvanced"  @closeSub="closeSub" @resetAll="resetAll" />
          </div>
        </div>
      <div class="selectBar">
        <div class="searchBox">
          <span class="search_btn"  @click="searchFun(searchKey)"><img src="/images/mobile/searchbtn.png"></span>
          <input type="text" v-model="searchKey" />
        </div>
          <ul>
            <li @click="showSearchSlide"><span class="el-icon-s-operation"></span><b>{{$t('product.Screening')}}</b></li>
            <li>
              <select v-model="PriceItem" @change="getselect(PriceItem)">
                <option value="desc">{{$t('product.PriceHL')}}</option>
                <option value="asc">{{$t('product.PriceLH')}}</option>
              </select>
            </li>
          </ul>
        </div>
    <!-- <advancedSearch :attrType="2"  @advancedChange="advancedChange" /> -->

    <div class="prolist-box">
      <div class="products_container" v-if="proList.length>0">
        <InsProductList v-for="item in proList" :key="item.productCode" :item="item" :needCode="false" class="product_item" ></InsProductList>
      </div>
      <div class="products_container" v-else>
            <h3 class="nocontentTips">{{$t('messageTips.NoContent')}}</h3>
      </div>
          <!-- <div ref="load" class="loading" @touchstart="loading" v-if="totalRecord>pageSize"><p>{{tips?$t('Action.LoadMore'):$t('home.Thatsall')}}</p></div>
          <div class="loading" v-else>{{$t('home.Thatsall')}}</div> -->
      <div class="clear"></div>
      <div class="pager" v-if="totalRecord > pageSize">
        <ins-page v-model="currentPage" :total="totalRecord" :pageNum="pageSize" ></ins-page>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import YouWouldLike from '@/model/youWouldLike';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
@Component({
  components: {
    InsProductList: () => import('@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue'),
    advancedSearch: () => import('@/components/hkTasteBusiness/mobile/product/InsAdvancedSearch.vue'),
    ProductListSwiper: () => import('@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue'),
    InsPage: () => import('@/components/base/mobile/InsPage.vue')
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 20; // 每页显示条目个数
  totalRecord: number = 0;// 总条目数
  private tips:boolean = true;
  private LoadingInstance!: any;

  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: number[] = []; // 选中的产品目录数组
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  PriceItem: string='desc';
  isAdvanced: boolean = true;
  searchKey: string = '';

  searchFun (key) {
    this.$store.dispatch('setSearchKey', key);
    if (key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: key
        }
      });
      // this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    } else {
      this.$router.push({
        path: '/product/search/-'
      });
      // this.$store.dispatch('isShowMenu', !this.$store.state.isShowMenu);
    }
  }

  // 搜索关键词
  // get searchKey () {
  //   let a = this.$store.state.searchKey;
  //   if (a === '-' || a === '') {
  //     return '';
  //   } else {
  //     return a;
  //   }
  // }
  // 价格传值
  getselect (val) {
    this.PriceItem = val;
    this.productSearch();
  }
  // 产品高级搜索
  // flag: string = ''
  productSearch () {
    this.tips = true;
    this.$Api.product.search({
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
    }).then((result) => {
      // if (flag === 'loadpage') {
      //   this.proList = this.proList.concat(result.YouWouldLike);
      //   this.totalRecord = result.TotalRecord;
      // } else {
      //   this.proList = result.YouWouldLike;
      //   this.totalRecord = result.TotalRecord;
      // }
      this.proList = result.YouWouldLike;
      this.totalRecord = result.TotalRecord;
      this.$HiddenLayer();
    });
  }

  advancedChange (Attrs, Catalogs) {
    this.attrs = Attrs;
    this.searchCatalogs = Catalogs;
    this.productSearch();
  }
  // 重置搜索
  resetAll () {
    window.location.href = '/product/search/-';
    this.closeSub();
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
  get showProductmenu () {
    return this.$store.state.isShowProduct;
  }
  handleClickOutside () {
    // this.showProductmenu = false;
    // this.$store.dispatch('isShowProduct', false);
    this.closeSub();
  }
  @Watch('showProductmenu', { deep: true })
  loading (e) {
    if (this.tips) {
      this.LoadingInstance = Loading.service({
        target: this.$refs.load as any,
        fullscreen: false,
        // spinner: 'el-icon-loading',
        text: 'Loading...'
      });
      setTimeout(() => {
        this.load();
        this.LoadingInstance.close();
      }, 2000);
    }
  }
  load () {
    console.log(this.totalRecord, this.proList.length);
    if (this.totalRecord !== this.proList.length) { this.currentPage++; } else { this.tips = false; }
  }

  mounted () {

  }

  @Watch('searchKey', { deep: true })
  onSearchKeyChange () {
    this.productSearch();
  }

  @Watch('currentPage', { deep: true })
  onCurrentPage () {
    // this.productSearch('loadpage');
    this.productSearch();
  }
}
</script>

<style lang="less">
.ProductSearch {
  .el-loading-spinner .circular {
    display: none;
  }

  .el-loading-text {
    font-size: 1.3rem;
    color: #cccccc;
    font-family: 'Arial';
  }

  .el-loading-parent--relative {
    > p {
      display: none;
    }
  }
}
</style>

<style scoped lang="less">
.nocontentTips{
  width: 95%;
  margin: 0 auto;
  font-size: 1.4rem;
  font-weight: 500;
  display: block;
  padding: 1rem;
  color: #666;
  margin-top: 2rem;
  text-align: center;
}
.product_warpper{
  width: 100%;
  margin:0 auto;
}
.products_container{
  display: flex;
  flex-wrap: wrap;
}

.product_item{
    width: 50% !important;
    padding:2rem 1rem 0;
    box-sizing:border-box;
}

.loading{
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    margin: 1rem 0 2rem;
    font-size: 1.4rem;
}

.ProductSearch {
  .InsAdvancedSearch {
    background: #fff;
    min-height: 100vh;
  }
}
.SearchSlide{
  width: 80%;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  // background: rgba(0,0,0,.6);
  // overflow-x: scroll;
  z-index: 999999;
  display: none;
  .leftSide{
    width: 100%;
    left:-100%;
    height: 100%;
    position: absolute;
    transition: all .5s;
    z-index: 999999;
    overflow-x: scroll;
  }

}
.closeBar{
    left: 0%!important;
  }
.selectBar{
    width: 100%;
    margin: 0 auto;
    display: inline-block;
    margin-top: 2rem;
  ul{
    width: 95%;
    margin: 0 auto;
  }
  li{
    float: left;
    // margin-right: 4%;
    width: 40%;
    border:1px solid #8b0b04;
    font-size: 1.6rem;
    background: #8b0b04;
    color: #FFF;
    height: 3.5rem;
    line-height: 3.5rem;
    list-style: none;
    border-radius: 10px;
    display: flex;
    span{
      width: 30%;
      display: inline-block;
      font-size: 2.4rem;
      text-align: center;
      line-height: 3.6rem;
    }
    b{
      width: 70%;
      display: inline-block;
      text-align: center;
      font-size: 1.4rem;
      font-weight: 500;
      line-height: 3.5rem;
    }
    select{
    width: 100%;
    border: none;
    padding-left: .5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 1.3rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(/images/mobile/Pricedownicon.png) 98% 15px no-repeat;
    background-size: 20px;
    outline: none;
    color: #8b0b04;
    font-weight: bold;
    }
    &:last-child{
      border: 1px solid #8b0b04;
      margin-right: 0px!important;
      background: #FFF!important;
      color:#333333;
      float: right;
      width: 55%;
    }
  }
  /deep/.searchBox{
    margin-top: 0;
    position: relative;
    border: none;
    height: auto;
    overflow: inherit;
    input{
      width: 100%;
      border: none;
      box-shadow: 0 0 5px #c8c8c8;
      border-radius: 20px;
      outline: none;
      text-indent: 5rem;
      font-size: 1.4rem;
    }
    .search_btn{
      left: 0;
      background-color: transparent;
      border-right: 1px solid  #14234f;
      top: 50%;
      transform: translateY(-50%);
      height: 3rem;
    }
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 9999;
}
.pager{
  width: 100%;
  display: flex;
}
</style>
