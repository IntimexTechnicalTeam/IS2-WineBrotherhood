<template>
  <div class="mobileVersionSearch">
    <div class="ProductSearch ">
        <div class="ProducBanner">
            <ProductListSwiper />
        </div>
        <div class="SearchSlide">
          <div class="leftSide">
            <AdvancedList @advancedChange="advancedChange" v-if="isAdvanced"  @closeSub="closeSub" @resetAll="resetAll" />
          </div>
        </div>
        <div class="selectBar">
          <ul>
            <li @click="showSearchSlide"><span class="el-icon-s-operation"></span><b>{{$t('home.Screening')}}</b></li>
            <li>
              <select v-model="PriceItem" @change="getselect(PriceItem)">
                <option value="desc">{{$t('home.PriceHL')}}</option>
                <option value="asc">{{$t('home.PriceLH')}}</option>
              </select>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
      <transition name="slide">
       <div key="1" v-if="!waiting">
          <div class="prolist-box">
            <div class="products_container">
                <InsProductList v-for="item in proList" :key="item.productCode" :item="item" class="product_item" ></InsProductList>
              </div>
              <div ref="load" class="loading" @touchstart="loading" v-if="totalRecord>pageSize"><p>{{tips?$t('Action.LoadMore'):$t('home.Thatsall')}}</p></div>
              <div class="loading" v-else>{{$t('home.Thatsall')}}</div>
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
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
@Component({
  components: {
    InsProductList: () => import('@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue'),
    // InsProductAttrsTree: () => import('@/components/business/mobile/product/InsProductAttrsTree.vue'),
    // InsProductCatTree: () => import('@/components/business/mobile/product/InsProductCatTree.vue'),
    AdvancedList: () => import('@/components/hkTasteBusiness/mobile/product/InsAdvancedList.vue'),
    ProductListSwiper: () => import('@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue')
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 6; // 每页显示条目个数
  totalRecord: number = 0;// 总条目数
  private tips:boolean = true;
  private LoadingInstance!: any;
  private showProductBar:boolean=false;
  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: object[] = []; // 选中的产品目录数组
  storeSearchKey: string = ''; // 搜索关键词
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  isAdvanced: boolean = true; // 是否显示高级搜索组件
  PriceItem:string='desc';
  private waiting: boolean = true;
  // 搜索关键词
  get searchKey () {
    let a = this.$store.state.searchKey;
    if (a === '-' || a === '') {
      return '';
    } else {
      return a;
    }
  }
  // 价格传值
  getselect (val) {
    this.PriceItem = val;
    this.productSearch();
  }

  // 产品高级搜索
  productSearch () {
    this.TShake(() => {
      this.currentPage = 1;
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
        Type: this.searchType
      }).then((result) => {
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
    if (this.delay === 0) { this.delay = setTimeout(fn, timeout); } else { clearTimeout(this.delay); this.delay = setTimeout(fn, timeout); }
  }
  advancedChange (Attrs, Catalogs) {
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
    await this.$router.push('/product/list/-?attrs=%5B%5D&catalogs=%5B%5D&type=1');
    this.closeSub();
    this.Reload();
  }
  handleCurrentChange (val) {
    this.currentPage = val;
    this.productSearch();
  }

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
    if (!this.isAdvanced) {
      this.productSearch();
    }
  }

  @Watch('searchKey')
  onSearchKeyChange () {
    if (!this.isAdvanced) {
      this.productSearch();
    }
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.Reload();
  }
  @Watch('currentPage')
  onCurrentPage () {
    this.productSearch();
  }
}
</script>

<style lang="less">
.mobileVersionSearch{
  width: 100%;
  background: url('/images/mobile/productbg.jpg') no-repeat center center;
  background-size: 100% 100%;
  display: inline-block;
  box-sizing: border-box;
  .clearAll{
    width: 100%;
    background: url('/images/mobile/clearall.jpg') no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    height: 5rem;
    display: flex;
    align-items: center;
    position: relative;
    .tp1{
      display: flex;
      align-items: center;
      padding-left: 2rem;
      font-size: 1.4rem;
      color:#fff;
      i{
        background: url('/images/mobile/hotpot.png') no-repeat center center;
        background-size: 100% 100%;
        display: inline-block;
        box-sizing: border-box;
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
      }
    }
    .tp2{
      position: absolute;
      right: 0px;
      top:0px;
      width: 6rem;
      height: 100%;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      color:#b40605;
      font-size: 1.4rem;
    }
  }
 .ProducBanner{
    width: 100%;
    background: url('/images/mobile/productBanner.jpg') no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    padding: 2rem;
  }
   .InsAdvancedSearch {
    background: #FFF;
    min-height: 100vh;
    .productAttrsTree, .productMenuTree {
      border: 0;
    }
 .productAttrsTree
{
  .el-checkbox__inner{
    border:1px solid #000!important;
  }
  .el-tree {
    >div{
      padding-top: 1rem;
      padding-bottom: 1rem;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #000;
      position: relative;
      &::before{
        content: '';
        width: 95%;
        height: 10px;
        background: url(/images/mobile/productList_icon.png) no-repeat center center;
        background-size: contain;
        position: absolute;
        top: 5px;
        left: 2.5%;
      }
       &::after{
        content: '';
        width: 95%;
        height: 10px;
        background: url(/images/mobile/productList_icon.png) no-repeat center center;
        background-size: contain;
        position: absolute;
        bottom: 5px;
        left: 2.5%;
      }
    }
  }
}
.productMenuTree{
  .el-checkbox__inner{
    border:1px solid #000!important;
   }
  .el-tree {
    >div{
      padding-top: 1rem;
      padding-bottom: 1rem;
      background: #FFF;
      border-radius: 5px;
      border: 1px solid #000;
      position: relative;
      &::before{
        content: '';
        width: 95%;
        height: 10px;
        background: url(/images/mobile/productList_icon.png) no-repeat center center;
        background-size: contain;
        position: absolute;
        top: 5px;
        left: 2.5%;
      }
       &::after{
        content: '';
        width: 95%;
        height: 10px;
        background: url(/images/mobile/productList_icon.png) no-repeat center center;
        background-size: contain;
        position: absolute;
        bottom: 5px;
        left: 2.5%;
      }
    }
  }
}
    .el-tree {
      >.el-tree-node {
        margin-bottom: 1rem;
        border: 1px solid #eee;
        >.el-tree-node__content {
          background-color: #232323;
          color: #fff;
          font-size: 1.3rem;
          height: 3rem;
          display: none;
          .el-tree-node__label {
            display: block;
            margin: 0 auto;
          }

          .el-icon-arrow-right, .el-checkbox {
            display: none;
          }
        }

        >.el-tree-node__children {
          padding-left: 3rem;
          padding-right: 3rem;
          padding-top: 1rem;
          padding-bottom: 1rem;
          .el-tree-node__content {
            padding: 0 !important;
            margin: 0 1.5rem 1rem 0;
            span{
              &.is-leaf.el-icon-arrow-right {
                display: none;
              }
            }
          }
        }
      }
    }
  }

    .mobileVersionSearch .el-loading-spinner .circular {
    display: none;
  }

   .mobileVersionSearch .el-loading-text {
    font-size: 1.3rem;
    color: #cccccc;
    font-family: 'Arial';
  }

    .mobileVersionSearch .el-loading-parent--relative {
    > p {
      display: none;
    }
  }
}
</style>

<style scoped lang="less">
.prolist-box{
  position: relative;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
.SearchSlide{
  width: 100%;
  position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  background: rgba(0,0,0,.6);
  overflow-x: scroll;
  z-index: 999999;
  display: none;
  .leftSide{
    width: 80%;
    left:-80%;
    min-height: 100%;
    position: absolute;
    transition: all .5s;
  }

}
.closeBar{
    left: 0%!important;
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
    padding:3rem 1rem 0;
    box-sizing:border-box;
}

.loading{
    text-align: center;
    height: 3rem;
    line-height: 3rem;
    margin: 1rem 0 2rem;
}
.selectBar{
    width: 95%;
    margin: 0 auto;
   display: block;
   margin-top: 2rem;
  li{
    float: left;
    margin-right: 4%;
    width: 47%;
    background: #FFF;
    border:1px solid #eee;
    font-size: 1.6rem;
    background: #666666;
    color: #FFF;
    height: 3.5rem;
    line-height: 3.5rem;
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
    padding-left: .5rem;
    height: 3.5rem;
    line-height: 3.5rem;
    font-size: 1.2rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(/images/mobile/downicon.png) 98% 10px no-repeat;
    background-size: 18px;
    }
    &:last-child{
      margin-right: 0px!important;
      background: #FFF!important;
      color:#333333;
    }
  }
}
</style>
