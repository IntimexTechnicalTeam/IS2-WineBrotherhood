<template>
    <div class="product_warrper">
        <div class="products_container">
            <inProductWindow v-for="item in allItems" :key="item.productCode" :item="item" class="product_item" ></inProductWindow>
        </div>
        <div class="no_more" v-show="allItems.length === 0"><div class="no_more_box"></div>{{$t('product.none')}}</div>
        <div ref="load" class="loading" @touchstart="loading" v-show="allItems.length !== 0">{{tips?$t('product.moreTips'):$t('product.none')}}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inProductWindow from '@/components/business/mobile/product/InsProductWindow.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
@Component({ components: { inProductWindow } })
export default class InsProductSearch extends Vue {
    private ShowItems: YouWouldLike[] = [];
    private LoadingInstance!: any;
    private tips:boolean = true;
    private allItems: YouWouldLike[] = [];
    @Prop() private readonly pageNum!: number;
    private CurrentPage: number = 1;
    private TotalPage: number = 1;
    private TotalRecord: number = 0;
    created () {
      this.$Api.product.search({
        Key: this.storeSearchKey,
        PageInfo: {
          Page: this.CurrentPage, PageSize: this.pageNum
        },
        CatIdS: [],
        Attrs: this.attrs,
        Type: 1
      }).then((result) => {
        this.allItems = this.allItems.concat(result.YouWouldLike);
        this.TotalPage = result.TotalPage;
        this.TotalRecord = result.TotalRecord;
      });
    }
    get attrs () {
      return this.$store.state.attrs;
    }

    get searchCatalogs () {
      return this.$store.state.searchCatalogs;
    }
    get storeSearchKey () {
      return this.$store.state.searchKey;
    }
    // @Watch('$route', { deep: true })
    // onRouteChange (n, o) {
    //   this.allItems = [];
    //   if (this.$route.params.id) {
    //     this.$Api.product.getCatProduct(
    //       {
    //         CatId: this.$route.params.id,
    //         Page: this.CurrentPage,
    //         PageSize: this.pageNum
    //       }).then((result) => {
    //       this.allItems = this.allItems.concat(result.YouWouldLike);
    //       this.TotalPage = result.TotalPage;
    //       this.TotalRecord = result.TotalRecord;
    //     });
    //   } else {
    //     this.$Api.product.search({
    //       Key: this.storeSearchKey,
    //       PageInfo: {
    //         Page: this.CurrentPage, PageSize: this.pageNum
    //       },
    //       CatIdS: [],
    //       Attrs: [],
    //       Type: 1
    //     }).then((result) => {
    //       this.allItems = this.allItems.concat(result.YouWouldLike);
    //       this.TotalPage = result.TotalPage;
    //       this.TotalRecord = result.TotalRecord;
    //     });
    //   }
    // }
    mounted () {
      // document.body.addEventListener('touchend', this.loading);
    }
    loading (e) {
      if (this.tips) {
        this.LoadingInstance = Loading.service({
          target: this.$refs.load as any,
          fullscreen: false,
          spinner: 'el-icon-loading'
        });
        setTimeout(() => {
          this.load();
          this.LoadingInstance.close();
        }, 2000);
      }
    }
    load () {
      if (this.TotalRecord !== this.allItems.length) { this.CurrentPage++; } else { this.tips = false; }
    }
    @Watch('CurrentPage')
    onCurrentPage () {
      setTimeout(() => {
        this.$Api.product.search({
          Key: this.storeSearchKey,
          PageInfo: {
            Page: this.CurrentPage, PageSize: this.pageNum
          },
          CatIdS: [],
          Attrs: this.attrs,
          Type: 1
        }).then((result) => {
          this.allItems = this.allItems.concat(result.YouWouldLike);
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
        });
      }, 50);
    }
    @Watch('storeSearchKey')
    onStoreSearchKey () {
      this.CurrentPage = 1;
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.$Api.product.search({
          Key: this.storeSearchKey,
          PageInfo: {
            Page: this.CurrentPage, PageSize: this.pageNum
          },
          CatIdS: [],
          Attrs: this.attrs,
          Type: 1
        }).then((result) => {
          this.allItems = this.allItems.concat(result.YouWouldLike);
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
          this.CurrentPage = 1;
          this.tips = true;
        }).catch((error) => {
          Vue.prototype.$Confirm('some error occur', error);
        });
      }, 50);
    }

    @Watch('attrs', { deep: true })
    onAttrs () {
      this.productSearch();
    }

    @Watch('searchCatalogs', { deep: true })
    onSearchCatalogs () {
      this.productSearch();
    }

    // 产品高级搜索
    productSearch () {
      this.$Api.product.search({
        Key: this.storeSearchKey,
        PageInfo: {
          Page: this.CurrentPage, PageSize: this.pageNum
        },
        CatIdS: this.searchCatalogs,
        Attrs: this.attrs,
        Type: 1
      }).then((result) => {
        this.allItems = result.YouWouldLike;
        this.TotalPage = result.TotalPage;
        this.TotalRecord = result.TotalRecord;
      });
    }
}
</script>
<style scoped>
.products_container{
    display: flex;
    flex-wrap: wrap;
}
.product_item{
    width: 50%;
    padding:4rem 1rem 0;
    box-sizing:border-box;
}
.loading{
    text-align: center;
    line-height: 3rem;
}
</style>
