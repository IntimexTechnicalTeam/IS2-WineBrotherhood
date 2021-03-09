<template>
    <div class="product_warrper">
        <transition name="slide">
        <div key="1" v-if="!waiting">
            <div class="products_container">
                <inProductWindow v-for="item in allItems" :key="item.productCode" :item="item"
                class="product_item" ></inProductWindow>
            </div>
        </div>
        </transition>
        <transition name="slide">
          <div class="faker" key="2" v-if="waiting" v-loading="true">
          </div>
        </transition>
        <div class="no_more" v-show="allItems.length === 0"><div class="no_more_box"></div>{{$t('product.noneInCat')}}</div>
        <div ref="load" class="loading" @touchstart="loading" v-show="allItems.length !== 0">{{tips?$t('product.moreTips'):$t('product.none')}}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
@Component({ components: { inProductWindow } })
export default class InsProductCat extends Vue {
    private LoadingInstance!: any;
    private tips:boolean = true;
    private allItems: YouWouldLike[] = [];
    @Prop() private readonly pageNum!: number;
    @Prop() private readonly call!: Promise<any>;
    private CurrentPage: number = 1;
    private TotalPage: number = 1;
    private TotalRecord: number = 0;
    private waiting: boolean = true;
    get catId () {
      return this.$store.state.catId | this.$route.params.catId as any;
    }
    created () {
      this.call.then(() => {
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
        });
      });
    }
    @Watch('catId')
    onStoreSearchKey () {
      this.CurrentPage = 1;
      this.tips = true;
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
        });
      }, 50);
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
        this.$Api.product.getCatProduct(
          {
            CatId: this.catId,
            Page: this.CurrentPage,
            PageSize: this.pageNum
          }).then((result) => {
          this.allItems = this.allItems.concat(result.YouWouldLike);
          this.TotalPage = result.TotalPage;
          this.TotalRecord = result.TotalRecord;
        });
      }, 50);
    }
}
</script>
<style scoped lang=less>
.products_container{
    display: flex;
    flex-wrap: wrap;
    position: relative;
}
.no_more{
      vertical-align: middle;
      text-align: center;
      font-size: 1.5rem;
      min-height: calc(100vh - 216px - 10rem);
      background-color: rgba(255, 255, 255, 0.5);
      .no_more_box{
        display: inline-block;
        width: 1px;
        height: 50vw;
        vertical-align: middle;
      }
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
.faker{
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
</style>
