<template>
    <div class="product_warpper">
        <inProductList :column="column" :allItems="allItems"/>
        <inPage :total="TotalRecord" v-model="CurrentPage" :pageNum="pageNum"></inPage>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inProductList from '@/components/business/pc/product/InsProductList.vue';
import inPage from '@/components/base/pc/InsPage.vue';
import YouWouldLike from '@/model/youWouldLike';
@Component({ components: { inProductList, inPage } })
export default class Product extends Vue {
    @Prop() private readonly column!: number;
    private allItems: YouWouldLike[] = [];
    @Prop() private readonly pageNum!: number;
    private CurrentPage: number = 1;
    private TotalPage: number = 1;
    private TotalRecord: number = 0;

    get attrs () {
      return this.$store.state.attrs;
    }

    get searchCatalogs () {
      return this.$store.state.searchCatalogs;
    }

    get storeSearchKey () {
      return this.$store.state.searchKey;
    }
    created () {
      alert('created');
      this.$Api.product.search({
        Key: this.storeSearchKey,
        PageInfo: {
          Page: this.CurrentPage, PageSize: this.pageNum
        },
        CatIdS: [],
        Attrs: this.attrs,
        Type: 1
      }).then((result) => {
        this.allItems = result.YouWouldLike;
        this.TotalPage = result.TotalPage;
        this.TotalRecord = result.TotalRecord;
        this.$HiddenLayer();
      });
    }
    @Watch('CurrentPage')
    onCurrentPage () {
      this.$ShowLayer();
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
          this.allItems = result.YouWouldLike;
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
          this.$HiddenLayer();
        });
      }, 50);
    }
    @Watch('storeSearchKey')
    onStoreSearchKey () {
      this.CurrentPage = 1;
      this.$ShowLayer();
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.$Api.product.search({
          Key: this.storeSearchKey,
          PageInfo: {
            Page: this.CurrentPage, PageSize: this.pageNum
          },
          CatIdS: [],
          Attrs: [],
          Type: 1
        }).then((result) => {
          this.allItems = result.YouWouldLike;
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
          this.$HiddenLayer();
        }).catch((error) => {
          this.$HiddenLayer();
          this.$Confirm('some error occur', error);
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
        this.$HiddenLayer();
      });
    }
}
</script>
<style lang="less">
.product_warpper{
  .el-pagination{
    text-align: center;
  }
}
</style>
<style scoped>
.products_container{
    display: flex;
    flex-wrap: wrap;
}
.product_item{
    padding:50px 25px 0;
    box-sizing:border-box;
}
</style>
