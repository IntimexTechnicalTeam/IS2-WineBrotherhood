<template>
  <div id="container"  style="padding-bottom:50px;">
    <accountHeader/>
    <div class="maincontent">
    <p class="pageTitle">{{$t('Message.UploadEvidence')}}</p>
     <div class="uploadMain">
       <div class="ItemOne">
            <p class="leftside">{{$t('Message.OrderNumber')}}：</p>
            <p class="rightside">{{OrderNo}}</p>
       </div>
      <div class="ItemOne">
            <p class="leftside">{{$t('Message.Remark')}}：</p>
            <p class="rightside"><textarea rows="5" v-model="item.Remark"></textarea></p>
       </div>
       <div class="ItemOne">
            <p class="leftside">{{$t('Message.Image')}}：</p>
            <Upload
              :action="uploadUrl"
              list-type="picture-card"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :on-success="handleSuccess"
              :headers="{Authorization: 'bearer ' + token}">
              <i class="el-icon-plus"></i>
            </Upload>
       </div>
        <div style="text-align:left;padding-left:200px;">
            <input type="button" :value="$t('DeliveryAddress.SaveBtn')" v-on:click="save" class="SaveBtn" />
        </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Upload } from 'element-ui';
import Cookie from 'js-cookie';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    Upload
  }
})
export default class InsOrderEvidence extends Vue {
    private ImageName:string='';
    private Remark:string = '';
    private OrderNo:string = '';
    private uploadUrl: string = '';
    private files: any[][] = [];
    private item = {
        OrderId: '',
        Remark: '',
        ImageName: ''
    }
    get orderId () {
      return this.$route.params.id;
    }
    get token () {
      return Cookie.get('access_token');
    }
    getOrder () {
      if (this.orderId) {
          this.$Api.order.getOrder(this.orderId).then((result) => {
            this.OrderNo = result.Order.InvoiceNO;
          });
        }
    }
    handleSuccess(response, file, fileList) {
      if (fileList.length >= 1) {
          response.ReturnValue.forEach((item) => {
            this.item.ImageName = item.Name;
          });
      }
    }
    async beforeAvatarUpload (file) {
      this.uploadUrl = await this.$Api.comments.uploadImage();
      return true;
    }
    save () {
      var _this = this;
      _this.item.OrderId = _this.orderId;
      this.$Api.order.SaveOffLinePay(this.item).then((result) => {
          if (result.Succeeded) {
              this.$message({
                message: this.$t('Message.SubmitSuccess') as string,
                type: 'success',
                customClass: 'messageBoxMobile'
              });
            setTimeout(function () {
              _this.$router.push({ path: '/order/List' });
            }, 1600);
          } else {
              this.$message({
                message: this.$t('Message.SubmitFailed') as string,
                type: 'error',
                customClass: 'messageBoxMobile'
              });
          }
      });
    }
    created() {
      console.log(this.orderId, 'orderIdorderIdorderId');
      this.getOrder();
    }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style lang="less" scoped>
#container {
  width: 100%;
  display: inline-block;
}
.uploadMain{
  width: 100%;
  margin-top: 30px;
  .SaveBtn{
    width: 300px;
    background: @base_color;
    color:#fff;
    font-size: 24px;
    height: 40px;
    line-height: 40px;
    border:none;
    cursor: pointer;
  }
  .ItemOne{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .leftside{
      width: 200px;
      float: left;
    }
    .rightside{
      float: left;
      textarea{
        width: 600px;
        border:1px solid #eee;
        height: 100px;
        outline: 0;
      }
    }
  }
}

</style>
