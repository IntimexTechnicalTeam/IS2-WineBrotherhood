<template>
  <div>
  <transition name="slide">
    <div key="1" v-if="!waiting">
        <div class="product_warpper">
            <inProductList :column="column" :allItems="allItems"/>
            <inPage :total="TotalRecord" v-model="CurrentPage" :pageNum="pageNum"></inPage>
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
    private waiting: boolean = true;
    get catId () {
      return this.$store.state.catId | this.$route.params.catId as any;
    }
    created () {
      this.$Api.product.getCatProduct(
        {
          CatId: this.catId,
          Page: this.CurrentPage,
          PageSize: this.pageNum
        }).then((result) => {
        this.allItems = result.YouWouldLike;
        this.TotalPage = result.TotalPage;
        this.TotalRecord = result.TotalRecord;
        this.waiting = false;
        this.$HiddenLayer();
      });
    }
    @Watch('CurrentPage')
    onCurrentPage () {
      this.$ShowLayer();
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.$Api.product.getCatProduct(
          {
            CatId: this.catId,
            Page: this.CurrentPage,
            PageSize: this.pageNum
          }).then((result) => {
          this.allItems = result.YouWouldLike;
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
          this.$HiddenLayer();
        });
      }, 50);
    }
    @Watch('catId')
    onStoreSearchKey () {
      this.CurrentPage = 1;
      this.$ShowLayer();
      setTimeout(() => {
        window.scrollTo(0, 0);
        this.$Api.product.getCatProduct(
          {
            CatId: this.catId,
            Page: this.CurrentPage,
            PageSize: this.pageNum
          }).then((result) => {
          this.allItems = result.YouWouldLike;
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
          this.$HiddenLayer();
        });
      }, 50);
    }
}
</script>
<style scoped>
.products_container{
    display: flex;
    flex-wrap: wrap;
}
.product_item{
    padding:50px 25px 0;
    box-sizing:border-box;
}
.product_warpper{
  position: relative;
}
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
