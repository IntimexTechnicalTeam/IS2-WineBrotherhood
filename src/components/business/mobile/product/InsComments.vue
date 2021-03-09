<template>
    <div class="comments_warrper mobileComments">
        <!-- <div class="comments_title">{{$t('product.comments.title')}}</div> -->
        <div class="comments_container" ref="comments"  v-if="showItems.length>0">
            <div class="percomments">
                <!-- <div class="comments_item" :class="{comments_item_border:index !== showItems.length-1}" v-for="(item,index) in showItems" :key="index"> -->
                <div class="comments_item" v-for="(item,index) in showItems" :key="index">
                        <div class="comments_sender">
                            <div class="sender_container">
                                <!-- <img :src="item.icon" > -->
                                <div class="sender_name">
                                    <div class="ShopperName">{{item.ShopperName}}
                                    <Rate
                                    disabled
                                    v-model="item.Sorce"
                                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                    </Rate>
                                    </div>
                                    <div class="CommentDate">{{item.CommentDate}}</div>
                                </div>
                            </div>
                        </div>
                        <!-- 评论 -->
                        <div class="comments_content">{{item.Content}}</div>
                        <div class="comments_many" v-if="item.CommentImages && item.CommentImages.length">
                          <div class="comments_imgs" v-for="(img,index) in item.CommentImages" :key="index">
                            <img :src="img.BigImagePath" :data-key="img.BigImagePath"  @click="showCommentsImage"/>
                          </div>
                        </div>
                        <!-- 回复 -->
                        <div class="reply" v-if="item.ReplyContent!=''">
                          <div class="owner">{{$t('product.OwnerReply')}}:</div>
                          <div class="comments_content" style="color:#999;">{{item.ReplyContent}}</div>
                        </div>
                        <div class="comments_many" v-if="item.ReplyImages && item.ReplyImages.length">
                          <div class="comments_imgs" v-for="(img,index) in item.ReplyImages" :key="index">
                            <img :src="img.BigImagePath" :data-key="img.BigImagePath"  @click="showCommentsImage"/>
                          </div>
                        </div>
                </div>
                <inPage v-model="CurrentPage" :total="TotalRecord" :pageNum="pageNumber" styla="margin-top:20px;" v-show="TotalRecord>0"></inPage>
            </div>
        </div>
        <div class="comments_container"  v-if="showItems.length==0">
            <div class="NocontentTips">{{$t('messageTips.NoComments')}}</div>
        </div>
        <div class="show_comment_img" @click="showImage = false" v-show="showImage"><img :src="currentImage" /></div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import Comments from '@/model/Comments';
import inPage from '@/components/base/mobile/InsPage.vue';
import { Loading, Rate } from 'element-ui';
@Component({ components: { Rate, inPage } })
export default class InsComments extends Vue {
    @Prop() ProductSku!: string;
    // private items: Comments[] = [];
    private showItems: Comments[] = [];
    private LoadingInstance!: any;
    private tips:boolean = true;
    private CurrentPage: number = 1;
    private TotalRecord: number = 0;
    private pageNumber: number = 10;
    private currentImage: string = '';
    private showImage: boolean = false;

    getProductComments () {
      this.$Api.comments.getProductComments({
        Sku: this.ProductSku,
        Page: this.CurrentPage,
        PageSize: this.pageNumber
      }).then((result) => {
        console.log(result, '000comment');
        this.showItems = result.Comments;
        this.showItems.forEach(function (i) {
          var newDate = new Date(i.CommentDate.replace(/-/g, '/'));
          i.CommentDate = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
        });
        this.TotalRecord = result.TotalRecord;
      });
    }
    loadMoreComments () {
      this.$Api.comments.getProductComments({
        Sku: this.ProductSku,
        Page: this.CurrentPage,
        PageSize: this.pageNumber
      }).then((result) => {
        this.showItems = this.showItems.concat(result.Comments);
        this.TotalRecord = result.TotalRecord;
      });
    }
    handleLoad (e) {
      if (!this.tips) return;
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
    load () {
      if (this.CurrentPage * this.pageNumber < this.TotalRecord) this.CurrentPage++; else this.tips = false;
    }
    showCommentsImage (e) {
      let targetE = e.target as HTMLElement;
      if (targetE.nodeName === 'IMG') {
        this.currentImage = targetE.dataset.key as string;
        this.showImage = true;
      }
    }
    created () {
    }
    mounted () {
      this.getProductComments();
      this.$nextTick(() => {
        let comments = this.$refs.comments as HTMLElement;
        // comments.style.height = comments.offsetHeight + 'px';
      });
    }
    updated () {
    }

    @Watch('CurrentPage')
    onPageChange (o, n) {
    //   this.showItems = this.items.slice((this.currentPage - 1) * this.pageNumber, this.currentPage * this.pageNumber);
    //   this.$nextTick(() => { 目前做不到高度变化时动画
    //     let outer = this.$refs.outer as HTMLElement;
    //     outer.style.height = 'auto';
    //     outer.style.height = outer.offsetHeight + 'px';
    //   });
      this.loadMoreComments();
    }
    @Watch('ProductSku')
    onProductSkuChange (o, n) {
      this.currentImage = '';
      this.showImage = false;
      this.tips = true;
      this.TotalRecord = 0;
      this.CurrentPage = 1;
      this.showItems = [];
      this.getProductComments();
    }
};
</script>
<style lang=less>
.mobileComments .el-rate {
    height: 2.5rem;
    line-height: 1;
    vertical-align: middle;
    float: right;
}
/* .el-rate__icon{
  font-size: 2rem;
} */
.el-icon-star-on:before {
    color: #ffbb07;
}
.el-icon-star-off:before{
  color: #ffbb07;
}
.mobileComments .el-rate__icon {
  margin-right: 0px!important;
}
</style>
<style scoped lang=less>
.NocontentTips{
  padding: 2rem;
  padding-top: 0px;
  font-size: 1.4rem;
  font-weight: 100;
}
.sender_name .ShopperName{
  font-size: 1.4rem;
  line-height:1em;
  margin-bottom:0.5rem;
  color:#333;
}
.sender_name .CommentDate{
    font-size: 1.2rem;
    color:#999;
}
.comments_title{
    font-size: 1.5rem;
    line-height: 3rem;
    background-color: @primary_color;
}

.comments_container::-webkit-scrollbar { width: 0 !important }
.comments_container{
    width: 95%;
    margin: 0 auto;
    padding-top: 2rem;
    min-height: 7rem;
    font-size: 1.3rem;
    color: #333;
    border: 1px solid #000;
    border-radius: 5px;
    margin-top: 1rem;
    min-height: 20rem;
}
.comments_sender{
    display: flex;
    justify-content: space-between;
    align-items:center;
    width:100%;
}
.sender_name{
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    width:100%;
}
.percomments{
    width: 100%;
    margin: 0 auto;
    min-height: 20rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding:0 1rem;
    box-sizing: border-box;
}
.comments_item{
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 2rem;
  .comments_many{
        margin-top: 0.5rem;
        width: 100%;
        overflow: hidden;
      .comments_imgs{
          width: 31%;
          box-sizing: border-box;
          height: 9rem;
          display: flex;
          justify-content: center;
          align-items: center;
          float: left;
          margin-right: 3%;
          margin-top:1rem;
          border:1px solid #f0f0f0;
          img{
            max-width: 100%;
            max-height: 100%;
          }
          &:nth-of-type(3n) {
            margin-right:0;
          }
      }
  }
}
.show_comment_img{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.1);
    img{
      width:80%;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
}
.sender_container{
   width:100%;
}
.sender_container img{
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
    border-radius: 50%;
    vertical-align: middle;
}
.comments_content{
  margin-top:0.5rem;
  text-align: left;
  font-size: 1.4rem;
  color: #666666;
  word-break: break-word;
}

.comments_item_border{
    padding-bottom: 2rem;
}
.load_more{
    line-height: 3rem;
    text-align: center;
}
.reply{
  margin-top:2rem;
  .owner{
    font-size: 1.4rem;
    color:#999999;
  }
}
</style>
