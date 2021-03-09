<template>
    <div class="add_comments_warpper mobileComments">
        <div class="product_and_comments" >
            <Card :body-style="{ padding: '0px',margin:'0px' }" shadow="never" v-for="(item,index) in commentsList" :key="index">
                <div class="warpper">
                    <div class="product">
                        <div class="product_img"><img :src="item.ProductImg"></div>
                        <div class="product_description">
                            <div class="product_name">{{item.ProductName}}</div>
                            <div class="product_code"></div>
                            <div class="product_attr"></div>
                            <div class="all_product_price"></div>
                        </div>
                    </div>
                    <div class="comments">
                        <div class="upload_warpper">
                            <Upload
                            :action="uploadUrl"
                            list-type="picture-card"
                            :file-list="files[index]"
                            :before-upload="beforeAvatarUpload"
                            :on-success="uploadSucceed(index)"
                            :on-remove="remove(index)"
                            :headers="{Authorization: 'bearer ' + token}">
                            <i class="el-icon-plus"></i>
                            </Upload>
                        </div>
                        <div class="rate_warpper">
                            <div class="block">
                            <Rate
                                v-model="item.Sorce"
                                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                            </Rate>
                            </div>
                        </div>
                        <div class="content_warpper">
                            <ElInput type="textarea" v-model="item.Content" :rows="4"></ElInput>
                        </div>
                    </div>
                </div>
                <div class="btn_warpper"><Button type="primary" @click="save(index)">保存</Button></div>
            </Card>
            <div class="btn_warpper"><Button type="primary" @click="saveAll">保存所有</Button></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Comments, { CommentImages } from '@/model/Comments';
import { Card, Upload, Rate, Input as ElInput, Button } from 'element-ui';
import Cookie from 'js-cookie';
@Component({ components: { Card, Upload, Rate, ElInput, Button } })
export default class InsAddComments extends Vue {
    private commentsList: Comments[] = [];
    // private fileList: any[] = [];
    private uploadUrl: string = '';
    private files: any[][] = [];
    private dialogImageUrl: string = '';
    private dialogVisible: boolean = false;
    created () {
      this.$Api.comments.getOrderComments(this.orderId).then((result) => {
        this.commentsList = result.Comments;
        this.files = this.commentsList.map((element) => {
          return element.CommentImages.map((e) => {
            return { url: e.BigImagePath };
          });
        });
      });
    }
    uploadSucceed (index) {
      return (response, file, fileList) => {
        response.ReturnValue.forEach((element) => {
          this.commentsList[index].CommentImages.push(new CommentImages(element.Name));
        });
      };
    }
    remove (index) {
      return (file, fileList) => {
        this.commentsList[index].CommentImages.forEach((element, i) => {
          if (file.url === element.BigImagePath) this.commentsList[index].CommentImages[i].IsDelete = true;
        });
      };
    }
    async beforeAvatarUpload (file) {
      this.uploadUrl = await this.$Api.comments.uploadImage();
      return true;
    }
    get orderId () {
      return this.$route.params.id;
    }
    get token () {
      return Cookie.get('access_token');
    }
    saveAll () {
      // console.log(this.commentsList);
      var _this = this;
      this.$Api.comments.saveComments(this.commentsList).then(() => {
        this.$message({
            message: this.$t('Message.SucceedInOperating') as string,
            type: 'success',
            customClass: 'NormalBg'
        });
        setTimeout(function () {
          _this.$router.push({ path: '/order/List' });
        }, 1600);
      });
    }
    save (index) {
      var _this = this;
      this.$Api.comments.saveComments([this.commentsList[index]]).then(() => {
          this.$message({
            message: this.$t('Message.SucceedInOperating') as string,
            type: 'success',
            customClass: 'NormalBg'
          });
      });
    }
}
</script>
<style lang="less">
.NormalBg{
  z-index: 9999999!important;
}
.mobileComments .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .mobileComments .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .mobileComments .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .mobileComments .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .mobileComments{
      width: 90%;
      margin: 0 auto;
      .el-card{
          padding: 0 0 0rem;
          border:0px!important;
          .btn_warpper{
              text-align: center;
              margin: 0.5rem 0;
              .el-button{
                span{font-size: 1.5rem;}
              }
          }
          .el-upload--picture-card {
          background-color: #fbfdff;
          border: 1px dashed #c0ccda;
          border-radius: 6px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: calc(48% - 2px);
          height: calc(48% - 2px);
          vertical-align: top;
          }
          .el-upload-list__item {
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            float: left;
            width: calc(48% - 2px);
            margin: 0px;
            margin-right: 4%;
            margin-bottom: 4%;
            &:nth-child(2n){
              margin-right: 0px!important;
            }
        }
        .rate_warpper{
          .el-rate__icon {
            font-size: 3rem;
          }
        }
      }
      .btn_warpper{
        text-align: center;
        width: 100%;
        .el-button{
          width: 100%;
          border-radius: 0px;
          background: @base_color;
          border:@base_color;
          span{font-size: 1.5rem;}
        }
      }
  }

</style>
<style lang="less" scoped>
.add_comments_warpper{
    .product_and_comments{
          padding-bottom: 2rem;
        // margin: 50px 50px 100px;
        .warpper{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            .product{
            width: 100%;
            .product_description{
              .product_name{
                font-size: 2rem;
                line-height: 4rem;
              }
            }
            div{
                // width: 100%;
                margin: 0 auto;
            }
            .product_img{
                width: 100vw;
                height: 100vw;
                img{
                    width: 100%;
                    height: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
            }
            }
            .comments{
                width: 100vw;
                .content_warpper{
                  margin: 0 4px;
                }
                .rate_warpper{
                  height: 3rem;
                  width: 100%;
                  display: flex;
                  margin-bottom: 1rem;
                  align-items: center;
                  justify-content: flex-start;
                }
            }
        }

    }
}
</style>
