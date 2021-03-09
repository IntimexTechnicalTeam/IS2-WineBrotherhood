<template>
  <div class="MemberPc deliverPc" v-cloak>
    <!--main-content-->
    <div id="main-content">
      <div class="favorite-box order-box">
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

                      <ElCol :xs="18" :md="18" class="left-part">
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
                      <ElCol :xs="3" :md="3" class="right-part">
                        <ElButton
                         type="warning"
                          round
                          icon="el-icon-document"
                          class="OrderBtn"
                          v-on:click="editAddr(index,'#addressPos')"
                        >{{$t('DeliveryAddress.EditBtn')}}</ElButton>

                        <ElButton
                          type="info"
                          round
                          icon="el-icon-delete"
                           class="red-btn"
                           v-on:click="removeAddr(one.DeliveryId)"
                        >{{$t('DeliveryAddress.DeleteBtn')}}</ElButton>
                      </ElCol>
                    </Card>
             </Row>
            </div>
          </div>
          <div class="new-address">
            <a name="addressPos" id="addressPos"></a>
            <p class="common-title">{{$t('DeliveryAddress.AddDeliveryAddress')}}</p>
            <div class="clear"></div>
            <div  class="MemberInfoMain">
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

                 <FormItem>
                    <ElButton
                      type="primary"
                      @click="saveAddress('AddForm')"
                      style="margin-top: 10px;"
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
import { Form, Input, Row, Col, Button, Select, Option, FormItem, Card } from 'element-ui';
import Address from '@/model/address';
import { Country } from '@/model/country';
import { Province } from '@/model/province';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue'),
    Form,
    Input,
    Row,
    Col,
    Button,
    Select,
    Option,
    FormItem,
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
  get newaddress () {
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
        { validator: function (rule, value, callback) {
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
    document.body.scrollTop = anchor.offsetTop - 160; // chrome
    document.documentElement.scrollTop = anchor.offsetTop - 160; // firefox
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
#container .el-form-item__content{
  text-align: left!important;
}
.MemberPc .input_outer{
  padding-top: 0px!important;
}
.MemberPc .MemberInfoMain .el-button--primary span{
  font-size: 20px!important;
}
.MemberPc  .el-checkbox__label{
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    word-break: break-all;
    vertical-align: text-top;
}
.MemberPc .el-checkbox, .el-checkbox__input{
  white-space: unset;
}
.MemberPc .el-form{
  width: 80%;
  margin: 0 auto;
}
.MemberPc .el-form .el-input{
  width: 60%!important;
}
.MemberPc .el-form .el-select{
  width: 60%!important;
}
.MemberPc .el-form .el-select .el-input{
    width: 100%!important;
}
.MemberPc .el-form .el-radio__input.is-checked .el-radio__inner{
    border-color: #333333;
    background: #333333;
}
.MemberPc .el-form .el-form-item__label{
    width: 25%;
    float: left;
    color: #161616 !important;
    padding: 0px;
    padding-right: 10px;
    line-height: inherit;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
}
.MemberPc .el-select .el-input__suffix{
  background: #333333;
  color:#fff;
  right: 0px!important;
}
.MemberPc .el-select .el-input .el-select__caret{
  color:#fff!important;
}
.deliverPc .el-form-item__error{
      left: 25%!important;
}
.deliverPc .el-form-item{
  margin-bottom: 20px;
}
</style>
<style lang="less" scoped>
.OrderBtn{
  background: @base_color!important;
  border:@base_color!important;
}
/*我的最爱*/
#main-content {
  width: 1200px;
  margin: 0 auto;
  margin-top: 60px;
}
/*checkout第三步*/
.new-address {
  margin-top: 40px;
  background: #FFF;
}
.new-address-content {
    width: 100%;
    margin: 0 auto;
    padding-bottom: 50px;
    padding-top: 50px;
}

.login-register-title {
     float: left;
    width: 300px;
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
  border-bottom: 1px solid #88bd43;
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
    text-indent: 15px;
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
.OrderCard {
  display: inline-block;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
}

.el-button.is-round {
  width: 100%;
  margin-bottom: 20px;
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
  font-size: 16px;
  color: #999;
}

.select-delivery-one .left-part p span:nth-of-type(1) {
  width: 20%;
  margin-right: 2%;
  text-align: right;
}
.pickupName,
.pickupPhone {
  line-height: 30px;
  text-indent: 10px;
  width: 100%;
}
.select-delivery-one .left-part p span:nth-of-type(2) {
  color: #666;
  width: 77%;
}

.btn-box .el-button {
    background: #333333;
    border: none;
    display: block;
    border-radius: 20px;
    width: 60%;
    float: left;
    margin-left: 25%;
}
#container {
  width: 100%;
  display: inline-block;
}
.MemberInfoMain {
  width: 1200px;
  margin: 0 auto;
  padding-top: 2.5%;
}
.MemberInfoMain .el-tabs__nav {
  height: 50px;
  line-height: 50px;
}
.MemberInfoMain .el-tabs__content {
  text-align: left;
}
.MemberInfoMain .el-input__icon {
  font-size: 16px;
}
.MemberInfoMain .el-form-item__content,.MemberInfoMain .el-form-item__label-wrap{
  margin-left: 0px!important;
}
.MemberInfoMain .el-button{
    background: #333333;
    border: none;
    display: block;
    border-radius: 20px;
    width: 60%;
    float: right;
    margin-right: 15%;
}
</style>
