<template>
  <div id="container" class="MembercenterMobile"  v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div class=" order-box">
        <div class="delivery-address member-delivery-address">
          <div class="select-delivery-address">
            <div class="select-delivery-box">
             <Row
             v-for="(one,index) in addressList"
             :key="index"
             class="select-delivery-one"
             >
                  <!-- 列表循环开始 -->
                    <Card shadow="hover" class="OrderCard">
                      <Row :gutter="10" >
                        <ElCol :xs="24" :md="24" class="left-part">
                          <p>
                              <span>{{$t('Register.UserFirstName')}}:</span>
                              <span>{{one.FirstName}}&nbsp;{{one.LastName}}</span>
                            </p>
                          <p>
                              <span>{{$t('DeliveryAddress.Mobile')}} :</span>
                              <span>{{one.Mobile}}</span>
                            </p>
                            <p>
                              <span>{{$t('DeliveryAddress.Address')}} :</span>
                              <span>{{one.Address}}</span>
                            </p>
                        </ElCol>
                      </Row>
                      <Row :gutter="10" class="deliver_btn">
                      <ElCol :xs="12" :md="12" class="right-part">
                        <ElButton
                          type="warning"
                          round
                          icon="el-icon-document"
                          class="OrderBtn"
                           v-on:click="editAddr(index,'#addressPos')"
                           style="width:100%!important;"
                        >{{$t('DeliveryAddress.EditBtn')}}</ElButton>
                       </ElCol>
                        <ElCol :xs="12" :md="12" class="right-part">
                        <ElButton
                          type="info"
                          round
                          icon="el-icon-delete"
                           class="red-btn"
                           v-on:click="removeAddr(one.DeliveryId)"
                           style="width:100%!important;background:#ccc;border:1px solid #ccc;"
                        >{{$t('DeliveryAddress.DeleteBtn')}}</ElButton>
                      </ElCol>
                      </Row>
                    </Card>
             </Row>

            </div>
          </div>
          <div class="new-address">
            <a name="addressPos" id="addressPos"></a>
            <p class="common-title">{{$t('DeliveryAddress.AddDeliveryAddress')}}</p>
            <div class="clear"></div>
            <div class="new-address-content">
                <ElForm
                  :model="AddForm"
                  status-icon
                  :rules="newaddress"
                  ref="AddForm"
                  class="login-form"
                >
                <input type="hidden" id="editDeliveryId" runat="server" />
                <FormItem :label="$t('DeliveryAddress.AddFirstName')" prop="FirstName">
                  <ElInput
                    v-model="AddForm.FirstName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('DeliveryAddress.AddFirstName')"
                    clearable
                  ></ElInput>
                </FormItem>

                 <FormItem :label="$t('DeliveryAddress.AddLastName')" prop="LastName">
                  <ElInput
                    v-model="AddForm.LastName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('DeliveryAddress.AddLastName')"
                    clearable
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('DeliveryAddress.PostalCode')" prop="PostalCode">
                  <ElInput
                    v-model="AddForm.PostalCode"
                    prefix-icon="el-icon-tickets"
                    :placeholder="$t('DeliveryAddress.PostalCode')"
                    clearable
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('DeliveryAddress.Mobile')" prop="Mobile">
                  <ElInput
                    v-model="AddForm.Mobile"
                    prefix-icon="el-icon-phone"
                    :placeholder="$t('DeliveryAddress.Mobile')"
                    clearable
                  ></ElInput>
                </FormItem>
                <FormItem :label="$t('DeliveryAddress.Area')" prop="CountryId">
                  <Select
                    v-model="AddForm.CountryId"
                     value-key="Id"
                    :placeholder="$t('DeliveryAddress.Area')"
                    style="width: 100%;"
                    v-on:change="selectCountry($event)"
                  >
                    <Option
                    :label="country.Name"
                    v-for="(country,index) in countryList"
                    :key="index"
                     v-bind:value="(country.Id).toString()"
                    ></Option>

                  </Select>
                </FormItem>
                <div v-show="provinceList.length>0">
                      <FormItem :label="$t('DeliveryAddress.Province')" prop="Province">
                        <Select
                          v-model="AddForm.Province"
                          :placeholder="$t('DeliveryAddress.Province')"
                          style="width: 100%;"
                          value-key="Id"
                        >
                          <Option
                          v-bind:value="(province.Id).toString()"
                          v-for="(province,index) in provinceList"
                          :label="province.Name"
                          :key="index"
                          ></Option>

                        </Select>
                      </FormItem>
                  </div>
                  <FormItem :label="$t('DeliveryAddress.Address')" prop="Address">
                  <ElInput
                    v-model="AddForm.Address"
                    prefix-icon="el-icon-location-outline"
                    :placeholder="$t('DeliveryAddress.Address')"
                    clearable
                  ></ElInput>
                </FormItem>

                <FormItem :label="$t('DeliveryAddress.DefaultAddress')" >
                  <Select
                    :placeholder="$t('DeliveryAddress.DefaultAddress')"
                    style="width: 100%;"
                    v-model="AddForm.Default"
                  >
                  <Option :label="$t('DeliveryAddress.YesBtn')" :value="true"></Option>
                  <Option :label="$t('DeliveryAddress.NoBtn')" :value="false"></Option>
                  </Select>
                </FormItem>

                 <FormItem class="btn-box">
                    <ElButton
                      class="green-btn"
                      type="primary"
                      @click="saveAddress('AddForm')"
                    >{{$t('DeliveryAddress.SaveBtn')}}</ElButton>
                  </FormItem>

               </ElForm>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Form, Input, Button, FormItem, Option, Select, Row, Col, Card } from 'element-ui';
import Address from '@/model/address';
import { Country } from '@/model/country';
import { Province } from '@/model/province';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue'),
    Form,
    Input,
    Button,
    Col,
    FormItem,
    Option,
    Select,
    Row,
    Card
  }
})
export default class InsDeliveryAddress extends Vue {
  CountryId: number = 786;
  countryList: any[] = [];
  private province!:Province;
  provinceList: any[] = [];
  validator: any = '';
  addr: any = {};
  value: any = '';
  private addressList:Address[] = [];
  addListlength:any='';
  private AddForm = {
    FirstName: '',
    LastName: '',
    Mobile: '',
    Phone: '',
    PostalCode: '',
    CountryId: '',
    Province: '',
    Address: '',
    Default: ''
  }
  get newaddress() {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserLastName'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserPhone'),
          trigger: 'blur'
        },
        { validator: function(rule, value, callback) {
          /* eslint-disable */
            var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
            if ( mobile.test(value) === false ) {
              var t = lang.messages[storage.get('locale')].Input['phoneincorrect'];
                callback(new Error(t));
            } else {
                callback();
            }
        },
        trigger: 'blur' }
      ],
      CountryId: [
        {
          required: true,
          message: this.$t('Address.Country'),
          trigger: ['blur', 'change']
        }
      ],
      Address: [
        {
          required: true,
          message: this.$t('Address.Address'),
          trigger: 'blur'
        }
      ]
    };
  }

  goAnchor (selector) {
    var anchor = this.$el.querySelector(selector); // 参数为要跳转到的元素id
    document.body.scrollTop = anchor.offsetTop - 150; // chrome
    document.documentElement.scrollTop = anchor.offsetTop - 150; // firefox
  }

  //   加载国家列表
  getCountry () {
    let _this = this;
    this.$Api.delivery.getCountry().then((result) => {
      _this.countryList = result.data;
    });
  }

  //   加载对应省列表
  getProvince (num) {
    let _this = this;
    var cid = num;
    if (cid && cid !== '') {
      this.$Api.delivery.getProvince(cid).then((result) => {
        _this.provinceList = result.data;
      });
    } else {
      _this.AddForm.Province = '';
    }
  }

  selectCountry (event) {
    var cid = event;
    let _this = this;
    if (cid && cid !== '') {
      _this.AddForm.Province = '';
      _this.getProvince(cid);
    } else {
      _this.AddForm.Province = '';
    }
  }

  // 加载地址列表
  getAddress () {
    let _this = this;
    this.$Api.delivery.getAddress().then((result) => {
      _this.addressList = result.data;
    });
  }

  // 删除对应的地址
  removeAddr (cid) {
    let _this = this;
    var addId = cid;
    this.$Api.delivery.removeAddress(addId).then((result) => {
      _this.$message({
        message: this.$t('MyFavorite.RemoveSuccess') as string,
        type: 'success',
        customClass: 'messageBoxMobile'
      });
      this.getAddress();
    });
  }

  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }

  // 重置
  reset () {
    this.provinceList = [];
    this.addr = {};
  }
  // 编辑地址
  editAddr (index, val) {
    this.goAnchor(val);
    let _this = this;
    Object.keys(this.AddForm).forEach((element) => {
      this.AddForm[element] = this.addressList[index][element];
    });
    this.AddForm['DeliveryId'] = this.addressList[index].DeliveryId;
    this.$Api.delivery.getProvince(this.addressList[index].CountryId).then((result) => {
      _this.provinceList = result.data;
    });
  }
  //   保存地址
  private saveAddress (formName) {
    let _this = this;
    this.AddForm.Phone = this.AddForm.Mobile;
    if (!this.AddForm.Province) {
      this.AddForm.Province = '0';
    }
    (this.$refs.AddForm as Form).validate(valid => {
      if (valid) {
        this.$Api.delivery.saveAddress(this.AddForm).then((result) => {
          this.getAddress();
          this.AddForm = {
            FirstName: '',
            LastName: '',
            Mobile: '',
            Phone: '',
            PostalCode: '',
            CountryId: '',
            Province: '',
            Address: '',
            Default: ''
          };
          _this.$message({
            message: this.$t('Message.SavedSuccessfully') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  mounted () {
    this.getAddress();
    this.getCountry();
  }
@Watch('this.addListlength')
  onCountryChange (n, o) {

  }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
.MembercenterMobile .el-card__body{
  background: #FFF;

}
#container .el-form-item__content{
  text-align: left!important;
}
.MembercenterMobile .MemberInfoBg{
    width:100%;
    background:#fff;
    background-size: 100%;
    display: inline-block;
    box-sizing: border-box;
}
.MembercenterMobile .MemberInfoMain .el-button--primary span{
  font-size: 20px!important;
}
.MembercenterMobile .MemberInfoMain .el-form-item__label{
    width: 25%;
    float: left;
    color: #161616 !important;
    padding: 0px;
    padding-right: 10px;
    line-height: inherit;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
.MembercenterMobile .MemberInfoMain .el-input{
  width: 75%!important;
}
.MembercenterMobile .MemberInfoMain .el-checkbox__label{
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    width: 91%;
    word-break: break-all;
    vertical-align: text-top;
}
.MembercenterMobile .MemberInfoMain .el-checkbox, .el-checkbox__input{
  white-space: unset;
}
.MembercenterMobile .MemberInfoMain {
    width: 90%;
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
}
.MembercenterMobile .MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MembercenterMobile .MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MembercenterMobile .MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MembercenterMobile .MemberInfoMain .el-form-item__content,.MemberInfoMain .el-form-item__label-wrap{
  margin-left: 0px!important;
}
.MembercenterMobile .MemberInfoMain .el-button{
    width: 100%;
    display: block;
    background: #333333;
    background-size: 100%;
    height: 4rem;
    border:0px!important;
}
.MembercenterMobile .MemberInfoMain .el-input.is-disabled .el-input__inner{
      border: 1px solid #535353!important;
      background-color: transparent!important;
      color:#161616!important;
      border: none;
      border-radius: 0px;
}
.MembercenterMobile .MemberInfoMain  .el-input__inner{
      border: 1px solid #535353!important;
      background-color: transparent!important;
      color:#161616!important;
      border: none;
      border-radius: 0px;
}
.MembercenterMobile .MemberInfoMain .el-radio__input.is-checked .el-radio__inner{
    border-color: #333333;
    background: #333333;
}
.MembercenterMobile .MemberInfoMain .el-radio__input.is-checked+.el-radio__label{
  color: #606266;
}
.MembercenterMobile .MemberInfoMain .el-select{
  width: 75%!important;
}
.MembercenterMobile .MemberInfoMain .el-select >.el-input{
  width: 100%!important;
  border: 1px solid #000;
}
.MembercenterMobile .MemberInfoMain .el-select >.el-input .el-input__inner{
  border: 0px!important;
}
.MembercenterMobile .MemberInfoMain .el-select .el-input__suffix{
  background: #333333;
  color:#fff;
  right: 0px!important;
}
.MembercenterMobile .MemberInfoMain .el-select .el-input .el-select__caret{
  color:#fff!important;
}
.MembercenterMobile .MemberInfoMain input::-webkit-input-placeholder {
        color:#999!important;
}
</style>
<style lang="less">
.MembercenterMobile .delivery-address .el-form-item__label-wrap,.MembercenterMobile .delivery-address .el-form-item__content{
  margin-left: 0px!important;
  width: 100%;
}
.MembercenterMobile .delivery-address  .btn-box .el-button span{
  font-size: 20px;
}

.MembercenterMobile .delivery-address .el-card__body{
  padding: 10px!important;
}
.MembercenterMobile .delivery-address .deliver_btn .el-button span{
  font-size: 14px;
}

</style>
<style  lang="less" scoped>
/*我的最爱*/
#main-content {
  width:95%;
  margin: 0 auto;
  margin-top: 30px;
}
/*checkout第三步*/
.new-address {
  margin-top: 40px;
}
.new-address-content {
    width: 95%;
    margin: 0 auto;
    padding-bottom: 2rem;
}

.login-register-title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 23px;
    background-color: @primary_color;
}

.login-form {
  margin-top: 40px;
}

.login-register-content .form-group .input-text:focus {
  border-bottom: 1px solid @primary_color;
}

.btn-box {
  margin-top: 55px;
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  display: -mz-flex;
  justify-content: space-between;
}

.btn-box .login-btn {
  background-color: #000;
  border: 1px solid #000;
}

.btn-box .fb-login-btn {
  background-color: #365899;
  border: 1px solid #365899;
}

.new-address .common-title {
    color: #fff;
    font-size: 22px;
    background-color: #666;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    width: 100%;
    display: inline-block;
    text-indent: 20px;
}

.select-delivery-address .common-title {
  font-size: 22px;
  color: #666;
  margin-bottom: 30px;
}

.select-delivery-one {
  box-sizing: border-box;
  padding: 10px;

}
.delivery-address .OrderCard {
    display: inline-block;
    width: 100%;
    padding-top: 20px;
}

.el-button.is-round {
  width: 100%;
  margin-bottom: 10px;
  margin-left: 0px;
}
.select-delivery-one .left-part {
  float: left;
  width: 63%;
  text-align: left;
}

.select-delivery-one .right-part {
  float: right;
}

.select-delivery-one .left-part p {
  margin-top: 15px;
}

.select-delivery-one .left-part p:nth-of-type(1) {
  margin-top: 0;
}

.select-delivery-one .left-part p span {
  display: inline-block;
  font-size: 14px;
  color: #999;
}

.pickupName,
.pickupPhone {
  line-height: 30px;
  text-indent: 10px;
  width: 100%;
}

.green-btn {
  background-color: @base_color;
  border:1px solid @base_color;
}
.green-btn:hover {
  background-color: #2e2e2e;
  border:1px solid #2e2e2e;
}

.delivery-address .btn-box{
  margin-top: 20px;
}
.delivery-address .deliver_btn{
  margin-top: 20px;
}
.delivery-address .el-button{
    width: 100%;
    margin: 0 auto;
    display: block;
    background: #333;
    background-size: cover;
    border:0px!important;
}
.delivery-address .el-button > span{
  font-size: 20px!important;
}
</style>
