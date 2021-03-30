<template>
    <div class="add_comments_warpper PcComments">
        <div class="product_and_comments" >
            <Card :body-style="{ padding: '0px' }" shadow="hover" v-for="(item,index) in commentsList" :key="index">
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
                                :colors="['#99A9BF', '#243978', '#14234f']">
                            </Rate>
                            </div>
                        </div>
                        <div class="content_warpper">
                            <ElInput type="textarea" v-model="item.Content" :rows="4"></ElInput>
                        </div>
                    </div>
                </div>
                <div class="btn_warpper"><ElButton type="primary" @click="save(index)">{{$t('product.save')}}</ElButton></div>
            </Card>
            <div class="btn_warpper"><ElButton type="primary" @click="saveAll">{{$t('product.AllSave')}}</ElButton></div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Comments, { CommentImages } from '@/model/Comments';
import Cookie from 'js-cookie';
import { Card, Upload, Rate, Input as ElInput, Button as ElButton } from 'element-ui';
@Component({ components: { Card, Upload, Rate, ElInput, ElButton } })
export default class InsAddComments extends Vue {
    private commentsList: Comments[] = [];
    // private fileList: any[] = [];
    private uploadUrl: string = '';
    private files: any[][] = [];
    private dialogImageUrl: string = '';
    private dialogVisible: boolean = false;
    created () {
      this.$Api.comments.getOrderComments(this.orderId).then((result) => {
        this.$HiddenLayer();
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
.PcComments .el-button--primary{
    background-color: @base_color;
    border-color:  @base_color;
}
.PcComments .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .PcComments .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .PcComments .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .PcComments .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .PcComments{
      .el-card{
          margin: 50px 0;
          padding: 25px;
          .btn_warpper{
              text-align: right;
          }
      }
  }

</style>
<style lang="less" scoped>
.PcComments{
      width: 1200px;
      margin: 0 auto;
    .product_and_comments{
        margin: 50px 50px 100px;
        .rate_warpper{
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .warpper{
            display: flex;
            justify-content: center;
            .product{
            width: 40%;
            div{
                width: 300px;
                margin: 0 auto;
            }
            .product_name{
                  margin-top: 20px;
            }
            .product_img{
                width: 300px;
                height: 300px;
                img{
                    width: 100%;
                    height: 100%;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
            }
            }
            .comments{
                width: 60%;
                /deep/ .el-upload--picture-card{
                  line-height: 154px;
                }
                /deep/ .el-upload-list__item-thumbnail{
                  display: block;
                  object-fit: cover;
                  object-position: 50% 50%;
                }
                /deep/ .content_warpper{
                  margin-bottom: 15px;
                }
            }
        }

    }
}
</style>
