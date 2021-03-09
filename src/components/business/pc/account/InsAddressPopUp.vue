<template>
  <div class="">
    <div class="pc-body-block"></div>
    <div class="checkout-box-2">
      <div class="favorite-box-top">
        <div class="login-register-title">{{$t('Account.DeliveryAddress')}}</div>
        <b class="cart-delete window-close">X</b>
        <div class="clear"></div>
      </div>
      <div class="address-top-btn">
        <a href="javascript:;">{{$t('CheckOut.Delivery')}}</a>
        <a href="javascript:;">{{$t('CheckOut.Pickup')}}</a>
      </div>
      <div class="delivery-address" style>
        <div class="detail-select-attribute select-mothod" style="display:none;">
          <p class="detail-select-title">Express :</p>
          <div class="normal-select express-select">
            <select name="express" v-on:change="selectExpress()" v-model="selectExpressOne">
              <option
                v-bind:id="'expressId_'+e.ExpressCompanyId"
                v-for="(e, index) in expressList"
                :key="index"
                v-bind:value="e"
              >{{e.ExpressCompanyName}}&nbsp;&nbsp;{{currentCode}}{{e.DiscountPrice}}</option>
            </select>
          </div>
          <div class="clear"></div>
        </div>
        <div class="select-delivery-address">
          <p class="common-title">{{$t('CheckOut.SelectDeliveryAddress')}}</p>
          <div class="select-delivery-box">
            <div
              class="select-delivery-one"
              v-bind:class="{'address-select':one.DeliveryId == selectAddress.DeliveryId}"
              v-for="(one,index) in ExpressPointList"
              :key="index"
            >
              <div class="left-part">
                <p>
                  <span>{{$t('CheckOut.LastName')}} :</span>
                  <span>{{one.FirstName}}&nbsp;{{one.LastName}}</span>
                </p>
                <p>
                  <span>{{$t('CheckOut.Phone')}} :</span>
                  <span>{{one.Phone}}</span>
                </p>
                <p>
                  <span>{{$t('CheckOut.Address')}} :</span>
                  <span>{{one.Address}}</span>
                </p>
              </div>
              <div class="right-part">
                <div class="select-delivery-btn">
                  <a
                    href="#newadd"
                    class="grey-btn"
                    v-on:click="editAddr(index)"
                  >{{$t('CheckOut.Edit')}}</a>
                  <a
                    href="javascript:;"
                    class="red-btn"
                    v-on:click="removeAddr(one)"
                  >{{$t('CheckOut.Delete')}}</a>
                  <a
                    href="javascript:;"
                    class="yellow-btn"
                    v-on:click="selectAddr(one,$event)"
                  >{{$t('CheckOut.Select')}}</a>
                </div>
              </div>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="new-address">
          <a name="newadd"></a>
          <div class="new-address-btn-box">
            <p class="common-title new-address-btn">{{$t('CheckOut.NewAddress')}}</p>
            <p class="common-title pick-up-btn">{{$t('CheckOut.PickUp')}}</p>
            <div class="clear"></div>
          </div>
          <div class="new-address-content">
            <form
              name="new-address-form"
              id="new-address-form"
              actio
              class="login-form register-form"
            >
              <input type="hidden" id="editDeliveryId" runat="server" />
              <div class="login-register-content register-content">
                <div class="form-group">
                  <label>
                    {{$t('CheckOut.FirstName')}}
                    <B>*</B>:
                  </label>
                  <input class="input-text" name="firstName" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <label>
                    {{$t('CheckOut.LastName')}}
                    <B>*</B>:
                  </label>
                  <input class="input-text" name="lastName" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <label>{{$t('CheckOut.ZipCode')}} :</label>
                  <input class="input-text" name="postalCode" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <label>
                    {{$t('CheckOut.Phone')}}
                    <B>*</B>:
                  </label>
                  <input class="input-text" name="phone" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <label>
                    {{$t('CheckOut.Mobile')}}
                    <B>*</B>:
                  </label>
                  <input class="input-text" name="mobile" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group select-group select-parent">
                  <input name="Country" type="hidden" value />
                  <label>
                    {{$t('CheckOut.Country')}}
                    <B>*</B>:
                  </label>
                  <div class="form-input-box select-box">
                    <div class="normal-select">
                      <select value name="country" v-on:change="selectCountry($event)">
                        <option
                          v-bind:value="country.Id"
                          v-for="(country, index) in countryList"
                          :key="index"
                        >{{country.Name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>
                <div class="form-group select-group select-parent">
                  <input name="province" type="hidden" value />
                  <label>
                    {{$t('CheckOut.Province')}}
                    <B>*</B>:
                  </label>
                  <div class="form-input-box select-box">
                    <div class="normal-select">
                      <select value name="province">
                        <option
                          v-bind:value="province.Id"
                          v-for="(province, index) in provinceList"
                          :key="index"
                        >{{province.Name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <label>
                    {{$t('CheckOut.City')}}
                    <B>*</B>:
                  </label>
                  <input class="input-text" name="city" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group">
                  <label>
                    {{$t('CheckOut.Address')}}
                    <B>*</B>:
                  </label>
                  <input class="input-text" name="address" type="text" value placeholder />
                  <div class="clear"></div>
                </div>
                <div class="form-group select-group select-parent">
                  <label>{{$t('DeliveryAddress.DefaultAddress')}}</label>
                  <div class="form-input-box select-box">
                    <div class="normal-select">
                      <select name="defalutSelect">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>
                  <div class="clear"></div>
                </div>
                <div class="btn-box split-btn-box">
                  <a
                    type="submit"
                    class="btn grey-btn"
                    v-on:click="saveAddress()"
                  >{{$t('CheckOut.Save')}}</a>
                  <a
                    class="btn window-close grey-btn"
                    v-on:click="resetAddr()"
                  >{{$t('CheckOut.Close')}}</a>
                </div>
              </div>
            </form>
          </div>
          <!-- <div class="pick-up-content container" >
                    <div class="panel-body pick-up-block pick-up-block-floatL">
                        <p>@Resources.Label.PickupDate</p>
                        <div class="form-group">
                            <div class="input-group date form_date" data-date="" data-date-format="dd/mm/yyyy" data-link-field="dtp_input2"
                                data-link-format="dd/mm/yyyy">
                                <input class="form-control" size="16" type="text" value="" readonly >
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-remove"></span>
                                </span>
                                <span class="input-group-addon">
                                    <span class="glyphicon glyphicon-calendar"></span>
                                </span>
                            </div>
                            <input type="hidden" id="dtp_input2" value="" />
                        </div>
                    </div>
                    <div class="panel-body pick-up-block pick-up-block-floatR">
                        <p>@Resources.Label.PickupTime</p>
                        <select name="pickuptime" value="" class="pickuptime">
                            <option value="1">@Resources.Label.Morning</option>
                            <option value="2">@Resources.Label.Afternoon</option>
                        </select>
                    </div>
                    <div class="clear"></div>
                    <div class="panel-body pick-up-block">
                        <p>@Resources.Label.PickupAddress</p>
                        <div class="select-delivery-box">
                            <div class="select-delivery-one" v-for="(one, index) in ExpressPointList" :key="index">
                                <div class="left-part">
                                    <p>
                                        <span>@Resources.Label.Name :</span>
                                        <span>{{one.Name}}</span>
                                    </p>
                                    <p>
                                        <span>@Resources.Label.Phone :</span>
                                        <span>{{one.Phone}}</span>
                                    </p>
                                    <p>
                                        <span>@Resources.Label.Address :</span>
                                        <span>{{one.Address}}</span>
                                    </p>
                                </div>
                                <div class="right-part">
                                    <div class="select-delivery-btn">
                                        <a href="javascript:;" class="yellow-btn" v-on:click="setPickupAddr(one,$event)">@Resources.Action.Select</a>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-box split-btn-box">

                    </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsAddressPopUp extends Vue {
  currentCode: any = '';
  selectAddress: any = '';
  selectPickupAddress: any = '';
  selectExpressOne: number = 0;
  expressList: any[] = [
    {
      CountryCode: null,
      Discount: 50,
      DiscountPrice: 0,
      ExpressCompanyId: '1046',
      ExpressCompanyName: '郵費（香港）',
      ExpressPointId: '0',
      ExpressPointList: null,
      Id: '1046',
      IsExpressPoint: false,
      IsSelfDefineDeliveryDate: true,
      Price: 50,
      ServiceType: null
    }
  ];
  ExpressPointList: any[] = [
    {
      Address: 'rehjujknbgvchm',
      City: 'hk',
      CityName: 'hk',
      CompanyName: null,
      Country: {
        Code: 'HKG',
        Code2: '  ',
        Code3: '   ',
        CountryItem: null,
        Id: 786,
        Language: null,
        Name: '中國香港',
        Name_c: null,
        Name_e: null,
        Name_j: null,
        Name_s: null,
        Provice: null,
        Selected: false,
        date_changed: null,
        is_Del: null
      },
      CountryCode: null,
      CountryId: '786',
      CountryName: null,
      Default: true,
      DeliveryId: 70367,
      Email: null,
      FirstName: 'cs',
      FullName: 'cs cs',
      Gender: null,
      IsUsable: true,
      LastName: 'cs',
      MemberId: 'e52ad94fecdc4d78876ec0e2ac4d293f',
      Mobile: 'aeraweraw',
      NickName: null,
      Phone: 'aeaweaw',
      PostalCode: 'aaeaw',
      Province: '0',
      ProvinceName: null,
      Remark: null
    }
  ];
  countryList: any = [
    {
      Name: '中國香港'
    }
  ];
  provinceList: any = [
    {
      Name: '中國香港'
    }
  ];
  created () {
    this.$HiddenLayer();
  }
}
</script>
<style scoped lang='less'>
/*checkout第二步*/

.pc-body-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  display: none;
}

.checkout-box-2 {
  font-family: "Arial", "微软雅黑";
  position: fixed;
  top: 0;
  width: 1200px;
  padding: 20px;
  background: #fff;
  height: 400px;
  z-index: 999;
  overflow-x: hidden;
  display: none;
}

.checkout-box-2 .login-register-title {
  margin-left: 0;
}

.checkout-box-2 .cart-delete {
  float: right;
  margin-top: 12px;
}
.cart-delete {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: #d9d9d9;
  color: #fff;
  border-radius: 50%;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
}

/*checkout第三步*/

.select-mothod {
  float: none;
  margin: 36px 0;
}

.select-mothod .detail-select-title {
  float: left;
  line-height: 38px;
  color: #4c4c4c;
  font-size: 16px;
}

.select-mothod .common-select .common-select-btn {
  width: 250px;
  height: 36px;
  line-height: 36px;
  color: #999;
  font-size: 16px;
}

.select-mothod .select-menu a {
  color: #999;
  font-size: 15px;
}

.select-delivery-address .common-title {
  font-size: 22px;
  color: #666;
  margin-bottom: 30px;
}

.select-delivery-one {
  box-sizing: border-box;
  padding: 20px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.select-delivery-one .left-part {
  float: left;
  width: 63%;
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
  width: 15%;
  margin-right: 2%;
  text-align: right;
}

.select-delivery-one .left-part p span:nth-of-type(2) {
  color: #666;
  width: 75%;
}

.select-delivery-btn {
  margin-top: 25px;
  opacity: 1;
  transition: 1s ease;
  -webkit-transition: 1s ease;
  -moz-transition: 1s ease;
  -ms-transition: 1s ease;
}

.select-delivery-btn a {
  display: inline-block;
  padding: 8px 18px;
  color: #fff;
  font-size: 17px;
}

.select-delivery-one:hover .select-delivery-btn {
  opacity: 1;
}

.new-address .common-title {
  float: left;
  color: #fff;
  font-size: 22px;
  background-color: #666;
  padding: 0 45px;
  height: 40px;
  line-height: 40px;
  margin-right: 20px;
  cursor: pointer;
}

.new-address .login-register-content {
  width: 820px;
  margin: 0 auto;
}
.login-register-content .form-group {
  margin-bottom: 20px;
}
.login-register-content .form-group .input-text {
  float: right;
  display: inline-block;
  height: 44px;
  line-height: 44px;
  border: 0;
  font-size: 16px;
  color: #4c4c4c;
  padding-left: 10px;
  width: 700px;
  border-bottom: 1px solid #ccc;
  outline: none;
}
.new-address .login-register-content .form-group .input-text {
  width: 650px;
}

.new-address .form-input-box {
  width: 650px;
}
.form-input-box {
  float: right;
  height: 45px;
}

.pick-up-block {
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  margin-top: 30px;
}
.pick-up-block-floatL {
  float: left;
  width: 48%;
}
.pick-up-block-floatR {
  float: right;
  width: 48%;
}

.pick-up-block .date-select {
  padding: 8.5px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  color: #ccc;
  font-size: 14px;
  outline: none;
}

.pick-up-block .pickuptime {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  color: #333;
  font-size: 14px;
  outline: none;
}

.pick-up-block > p {
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
}

.address-top-btn {
  margin-top: 20px;
  text-align: left;
}

.address-top-btn a {
  display: inline-block;
  padding: 8px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #679926;
  margin-right: 20px;
}

.new-address-p {
  margin-top: 30px;
}

.select-delivery-address {
  margin-top: 30px;
  text-align: left;
}

/*添加地址*/

.member-delivery-address {
  margin-top: 60px;
}

/*订单完成页面*/

.order-complete-box {
  text-align: center;
}

.order-complete-box {
  margin-top: 20px;
}

.order-complete-box p {
  font-size: 20px;
  font-weight: bold;
  margin-top: 15px;
}

.order-complete-box p:nth-of-type(1) {
  margin-top: 30px;
}

.order-complete-box .btn-box {
  text-align: center;
  display: block;
}

.order-complete-box .btn-box .btn {
  display: inline-block;
}
.login-form {
  margin-top: 40px;
}
.login-register-content .form-group label {
  float: left;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  color: #4c4c4c;
  width: 165px;
  text-align: right;
  font-family: "Arial", "微软雅黑";
  display: inline-block;
  margin-bottom: 5px;
  font-weight: bold;
}
.normal-select select {
  width: 100%;
  height: 38px;
  line-height: 38px;
  font-size: 16px;
  outline: none;
  color: #1b1b1b;
  border: 1px solid #ccc;
}
.login-register-content .form-group b {
  color: #f00;
  font-size: 16px;
  font-weight: 900;
  margin-right: 5px;
}
</style>
