<template>
    <div ref="outer" class="comments_warrper" >
        <div class="comments_container 000" v-if="showItems.length>0">
            <div class="comments_item" :class="{comments_item_border:index !== showItems.length}" v-for="(item,index) in showItems" :key="index">
                    <div class="leftside">
                        <p class="commentsUser">{{item.ShopperName}}</p>
                        <div class="comments_date">{{item.CommentDate}}</div>
                    </div>
                    <div class="rightside">
                        <Rate disabled v-model="item.Sorce" :colors="['#ccc', '#F7BA2A', '#FF9900']"></Rate>
                    </div>
                <div class="clear"></div>
                <div class="bottomside">
                    <!-- 评论 -->
                    <div class="comments_content">{{item.Content}}</div>
                    <div class="comments_many" v-if="item.CommentImages && item.CommentImages.length">
                        <div class="comments_imgs" v-for="(img,index) in item.CommentImages" :key="index">
                        <img :src="img.BigImagePath" :data-key="img.BigImagePath" @click="showCommentsImage"/>
                        </div>
                    </div>
                    <!-- 回复 -->
                    <div class="reply" v-if="item.ReplyContent!=''">
                        <div class="owner">{{$t('product.OwnerReply')}}:</div>
                        <div class="comments_content owner_content">{{item.ReplyContent}}</div>
                    </div>
                    <div class="comments_many" v-if="item.ReplyImages && item.ReplyImages.length">
                        <div class="comments_imgs" v-for="(img,index) in item.ReplyImages" :key="index">
                        <img :src="img.BigImagePath" :data-key="img.BigImagePath"  @click="showCommentsImage"/>
                        </div>
                    </div>
                </div>
            </div>
            <inPage v-model="CurrentPage" :total="TotalRecord" :pageNum="pageNumber"  v-show="TotalRecord>0"></inPage>
        </div>
        <div class="comments_container" v-if="showItems.length==0">{{$t('messageTips.NoComments')}}</div>
        <div class="show_comment_img" @click="showImage = false" v-show="showImage"><img :src="currentImage" /></div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
// import Comments from '@/model/Comments';
import inPage from '@/components/base/pc/InsPage.vue';
import { Rate } from 'element-ui';
@Component({ components: { inPage, Rate } })
export default class InsComments extends Vue {
    @Prop() ProductSku!: string;
    private CurrentPage: number = 1;
    private showItems: Object[] = [];
    private pageNumber: number = 10;
    private currentImage: string = '';
    private showImage: boolean = false;
    private TotalRecord: number = 0;

    getProductComments () {
      this.$Api.comments.getProductComments({
        Sku: this.ProductSku,
        Page: this.CurrentPage,
        PageSize: this.pageNumber
      }).then((result) => {
        console.log(result, '0000評論');
        if (result.Comments && result.Comments.length) {
          this.showItems = result.Comments;
          this.showItems.forEach(function (i) {
            var newDate = new Date(i['CommentDate'].replace(/-/g, '/'));
            i['CommentDate'] = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();
          });
        }
        this.TotalRecord = result.TotalRecord;
      });
    }
    showCommentsImage (e) {
      let targetE = e.target as HTMLElement;
      if (targetE.nodeName === 'IMG') {
        this.currentImage = targetE.dataset.key as string;
        this.showImage = true;
      }
    }
    agree (e) {
    //   let target = e.target as HTMLElement;
    //   if (target.className === 'agree') {
    //     this.showItems[target.dataset.key as string].agree++;
    //   }
    }
    mounted () {
      this.getProductComments();
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
      this.showItems = [];
      this.getProductComments();
    }
    @Watch('ProductSku')
    onProductSkuChange (o, n) {
      this.currentImage = '';
      this.showImage = false;
      this.CurrentPage = 1;
      this.TotalRecord = 0;
      this.showItems = [];
      this.getProductComments();
    }
};
</script>
<style lang="less" scoped>
.comments_warrper .el-rate__icon{
    font-size:26px;
}
.comments_warrper .topside{
    width:100%;
    overflow: hidden;
}
.comments_warrper .leftside{
    width: 75%;
    float: left;
    margin-right: 10%;
}
.comments_warrper .rightside{
    width: 15%;
    float: left;
}
.comments_warrper .bottomside{
    width: 100%;
}
.comments_warrper .comments_date{
    font-size: 14px;
    color:#999999;
    margin-bottom:10px;
}
.comments_warrper .commentsText{
    font-size: 14px;
    color:#1f1f1f;
    word-break: break-all;
}
.comments_warrper .commentsUser{
    font-size: 20px;
    color:#333;
}
.comments_warrper{
    margin-bottom: 50px;
    transition: height 2s;
    clear: both;
    padding:20px 20px 0 20px;
    border-radius: 5px;
    min-height: 20rem;
    border:1px solid #000;
    >.show_comment_img{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.1);
        img{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
}
.comments_title{
    font-size: 18px;
    line-height: 36px;
    text-align: left;
    padding-left: 12px;
    background-color: @primary_color;
}
.comments_item{
    text-align: left;
    margin-bottom: 12px;
    line-height: 24px;
    padding-bottom:20px;
}
.comments_item_border{
    border-bottom: 1px solid #e0e0e0;
}
.comments_sender{
    width: 20%;
}
.comments_sender img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 12px;
}
.sender_container span{
    vertical-align: middle;
}
.comments_content{
    font-size: 16px;
    color: #333333;
    word-break: break-word;
}
.owner_content{
    color:#999999!important;
    font-size:16px;
}
.footer{
    margin-top: 6px;
    display: flex;
    justify-content: space-between;
}
.comments_many{
    width:100%;
    overflow: hidden;
    .comments_imgs{
        width: 160px;
        box-sizing: border-box;
        height: 9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        margin-right:17px;
        margin-top:1rem;
        border:1px solid #f0f0f0;
        img{
        max-width: 100%;
        max-height: 100%;
        }
        &:nth-of-type(7n) {
        margin-right:0;
        }
    }
}

.comments_action{
    display: flex;
}
.agree{
    background-image: url('/static/__sprite.png');
    background-position: -32px -34px;
    height: 16px;
    width: 16px;
    cursor: pointer;
}
.reply{
  margin-top:20px;
  .owner{
    font-size: 16px;
    margin-bottom:5px;
    color:#333333;
    font-weight: 700;
  }
}
</style>
