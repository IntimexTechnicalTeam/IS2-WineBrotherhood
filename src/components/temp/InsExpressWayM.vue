<template>
  <div class="expressWay_Warpper mobile">
     <div class="expressWay_title">
       {{$t('CheckOut.ShippingMethod')}}
     </div>
     <div class="expressWay_main" v-loading="loading">
      <div class="fare2_express">
                <InsSelect @input="ExpressSelect" :disabled="lockFare" styla="width:100%" name="ExpressCompanyName" :Placeholder="$t('CheckOut.ShippingMethod')" :items="Express" :label="$t('CheckOut.ShippingMethod')" v-model="ChosenExpress" />
      </div>

      <!-- （新）順豐自提 -->
      <div style="padding: 0 20px;" v-if="newSF">
        <InsSelect styla="width:100%"  :Placeholder="$t('CheckOut.CountryName')" :items="SFCountry" :label="$t('CheckOut.CountryName')" v-model="SFScreen.Country"/>
        <InsSelect styla="width:100%" :Placeholder="$t('CheckOut.ProvinceName')" :items="SFProvince" :label="$t('CheckOut.ProvinceName')" v-model="SFScreen.Province"/>
        <InsSelect styla="width:100%"  :Placeholder="$t('CheckOut.CityName')" :items="SFCity" :label="$t('CheckOut.CityName')" v-model="SFScreen.City"/>
        <InsSelect styla="width:100%" :Placeholder="$t('CheckOut.SFPointType')" name="Text" :items="SFPointType" :label="$t('CheckOut.SFPointType')" v-model="SFScreen.PointType"/>
      </div>

      <div class="searchSF" v-if="newSF">
        <el-button type="primary" icon="el-icon-search" @click="GetPickUpPointCharge">{{$t('Action.SearchPiUpAddr')}}</el-button>
      </div>

      <!-- 快递自提 -->
      <div class="express_pickup" v-show="$store.state.pickUpExpress && ChosenExpress.ExpressCompanyId !== 'P'  && !newSF">
          <InsSelect v-if="!newSF" :disabled="lockFare" :Placeholder="$t('CheckOut.Address')" :items="ChosenExpress.ExpressPointList" :label="$t('CheckOut.Address')" v-model="ChosenExpressPoint" />
          <InsInput2 :label="$t('CheckOut.Name')" :needLabel="true" :must="PickupInfoRequire" v-model="PickName"  :disabled="lockFare"/>
          <InsInput2 :label="$t('CheckOut.Phone')" :needLabel="true" :must="PickupInfoRequire" v-model="PickPhone"  :disabled="lockFare"  type="phone"/>
      </div>
      <!-- 快递上门 -->
      <div class="express" v-show="!$store.state.pickUpExpress">
          <div class="address_item_warpper">
            <div v-for="(item,index) in addressList" :key="index" class="address_item" :class="{selected_item: item.DeliveryId === SelectedAddress.DeliveryId, address_item_bottomBorderNone: item.DeliveryId !== SelectedAddress.DeliveryId && index === 0, address_item_topBorderNone: item.DeliveryId !== SelectedAddress.DeliveryId && index === (addressList.length -1)}">
                <div class="address_selected" v-show="item.DeliveryId === SelectedAddress.DeliveryId">{{ $t('CheckOut.Selected') }}</div>
                  <div class="address_selected_other">
                  <div class="address_operate">
                      <span class="update_address" @click="selectAddr(index)" v-show="item.DeliveryId !== SelectedAddress.DeliveryId">{{$t('CheckOut.Select')}}</span>
                      <span class="select_address" :class="{ heightLine: item.DeliveryId === SelectedAddress.DeliveryId }" @click="editAddr(index)" >{{$t('CheckOut.Edit')}}</span>
                  </div>
                  <div class="address_item itemPadding">{{item.FullName}}
                  </div>
                  <div class="address_item itemPadding">{{item.Phone}}</div>
                  <!-- <div class="address_item itemPadding">{{item.Country.Name + '  ' + item.ProvinceName + ' ' + item.Address}}</div> -->
                  <div class="address_item itemPadding">{{item.Country.Name}} {{item.ProvinceName}} {{item.City==null?'':item.City}} {{item.Address}}</div>
                </div>
            </div>
            <div class="address_footer">
                <div class="address_operate">
                      <span class="select_address" @click="addAddr" >{{$t('DeliveryAddress.AddAddress')}}</span>
                  </div>
            </div>
          </div>
          <!-- <div class="address_item_warpper" v-show="lockFare">
            <div class="address_item selected_item" >
                <div class="address_selected">{{ $t('CheckOut.Selected') }}</div>
                  <div class="address_selected_other">
                  <div>{{SelectedAddress.FullName}}
                  </div>
                  <div>{{SelectedAddress.Phone}}</div>
                  <div>{{SelectedAddress.Country.Name + '  ' + SelectedAddress.ProvinceName + ' ' + SelectedAddress.Address}}</div>
                </div>
            </div>
          </div> -->
          <Collaspe>
          <div class="none" v-show="showEdit && !lockFare">
            <InsForm ref="adderform" v-model="editAddress">
              <InsInput2 :label="$t('CheckOut.Name')" :needLabel="true" v-model="editAddress.FullName" />
              <Collaspe>
              <InsInput2 :label="$t('DeliveryAddress.PostalCode')" v-show="editAddress.Country.Code !== 'HKG'" :needLabel="true" v-model="editAddress.PostalCode" :must="false"  />
              </Collaspe>
              <InsInput2 :label="$t('DeliveryAddress.UserContactNumber')" :needLabel="true" v-model="editAddress.Phone"  type="phone" />
              <!-- <InsInput2 :label="$t('DeliveryAddress.Mobile')" :needLabel="true" v-model="editAddress.Mobile"  /> -->
              <!-- <InsSelect class="SelectArea" styla="display:inline-flex;vertical-align:middle;width:100%" :must="true"  :Placeholder="$t('DeliveryAddress.Area')" :items="countryList" :label="$t('DeliveryAddress.Address')" v-model="editAddress.Country" />
              <InsSelect class="SelectProvince" styla="display:inline-flex;vertical-align:middle;width:100%;" :Placeholder="$t('DeliveryAddress.Province')" :items="provinceList" :label="' '" v-model="editAddress.Provinceo"/> -->
              <div class="input_warpper"><label>{{$t('DeliveryAddress.Address')}}</label>
                  <div class="select_main">
                      <el-select v-model="editAddress.Country" value-key="Id" :placeholder="$t('CheckOut.PleaseSelect')">
                          <el-option
                            v-for="(item,index) in countryList"
                            :key="index"
                            :label="item.Name"
                            :value="item">
                          </el-option>
                        </el-select>
                  </div>
              </div>
              <div class="input_warpper"><label></label>
                  <div class="select_main">
                        <el-select v-model="editAddress.Provinceo" value-key="Id" :placeholder="$t('CheckOut.PleaseSelect')" v-show="provinceList.length">
                          <el-option
                            v-for="(item,index) in provinceList"
                            :key="index"
                            :label="item.Name"
                            :value="item">
                          </el-option>
                        </el-select>
                  </div>
              </div>
              <InsInput2 :label="$t('DeliveryAddress.Area')" v-show="editAddress.Country.Code !== 'HKG'" :needLabel="true" v-model="editAddress.City" :must="false" type="City"/>
              <InsInput2 class="textArea" :placeholder="$t('DeliveryAddress.Detail')"  :label="$t('DeliveryAddress.Address')" v-model="editAddress.Address" :needLabel="true"  type="textarea"/>
              <InsButton :nama="$t('Action.Confirm')" @click="save ('adderform')" class="SaveBtn" />
            </InsForm>
          </div>
          </Collaspe>
      </div>
     <!-- 门店自提（地址、門店信息） -->
      <div class="store_pickup" v-show="$store.state.pickUpExpress && ChosenExpress.ExpressCompanyId === 'P'">
          <InsSelect  :items="PickupAddressList" :label="$t('CheckOut.CompanyName')" v-model="CurrentPickupAddress" @input="(v)=>{ this.PickAddress.Id = this.PickAddress.ExpressPointId = v.Id;this.PickAddress.PickupCompanyName=v.Name; }" :disabled="lockFare"/>
          <div>
              <InsInput2 :label="$t('CheckOut.CompanyPhone')" :needLabel="true"   v-model="CurrentPickupAddress.Phone" @input="(v)=>{ this.PickAddress.PickupAddressPhone = v; }" :disabled="true"/>
              <InsInput2 :label="$t('CheckOut.CompanyAddress')" :needLabel="true"   v-model="CurrentPickupAddress.Address"  @input="(v)=>{ this.PickAddress.PickupAddress = v; }" :disabled="true" />

              <!-- <InsInput2 :label="$t('CheckOut.Name')" :needLabel="true"   v-model="PickAddress.Name" :disabled="lockFare"/>
              <InsInput2 :label="$t('CheckOut.Phone')" :needLabel="true"  v-model="PickAddress.Phone" :disabled="lockFare" type="phone"/>
              <InsInput2 :label="$t('CheckOut.PickupDate')" :needLabel="true"  v-model="PickAddress.PD" type="date" :disabled="lockFare"/>
              <InsSelect  :items="pickupTimeList" :label="$t('CheckOut.PickupTime')" :value="PickAddress.PickupTime" @input="(v)=>{ this.PickAddress.PickupTime = v.Id }"  :disabled="lockFare"/> -->
          </div>
      </div>
      <!-- 自提時間 -->
      <div class="pickup_info" v-show="$store.state.pickUpExpress && ((newSF && PiUpPointList.length) || !newSF)">
        <InsSelect v-if="newSF" :disabled="lockFare" :Placeholder="$t('CheckOut.Address')" :items="PiUpPointList" name="Address" :label="$t('CheckOut.Address')" v-model="ChosenExpressPoint"/>

        <template v-if="ChosenExpress.ExpressCompanyId === 'P' || newSF">
          <InsInput2 :label="$t('CheckOut.Name')" :needLabel="true" :must="PickupInfoRequire"  v-model="PickAddress.Name" :disabled="lockFare"/>
          <InsInput2 :label="$t('CheckOut.Phone')" :needLabel="true" :must="PickupInfoRequire" v-model="PickAddress.Phone" :disabled="lockFare"  type="phone"/>
        </template>

        <!-- 非新順豐自提點和門店自提不顯示，正確邏輯為 自提點皆顯示 ，舊邏輯未處理好 -->
        <template v-if="ChosenExpress.ExpressCompanyId === 'P' || newSF">
          <InsInput2 :label="$t('CheckOut.PickupDate')" :needLabel="true" :must="PickupDateRequire" v-model="PickAddress.PD" type="date" :disabled="lockFare"/>
          <InsSelect :needLabel="true" :must="PickupDateRequire" :items="pickupTimeList" :label="$t('CheckOut.PickupTime')" :value="PickAddress.PickupTime" @input="(v)=>{ this.PickAddress.PickupTime = v.Id }"  :disabled="lockFare"/>
        </template>
      </div>
      <div style="clear:both;"></div>
     <div class="TimeRangMain" v-show="IsSelfDefineDeliveryDate">
      <div class="TimeRangItem">
          <p class="date">{{$t('Message.DeliveryDate')}}</p>
          <div class="inputMain">
            <el-date-picker
              v-model="DateSelect"
              type="date"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              width="300"
              @change="DateSelectAct"
              :placeholder="$t('Message.DeliveryDate')">
            </el-date-picker>
          </div>
      </div>
       <div class="TimeRangItem">
          <p class="time">{{$t('Message.DeliveryTime')}}</p>
          <div class="inputMain">
            <select id="TimeRange" class="form-control" @change="selectTime()" v-model="selectExpressTimeOne" disabled>
              <option v-for="(p,index) in TimeRangeData" v-bind:value="p" v-bind:id="p.Id" :key="index">{{p.DateRange}}</option>
            </select>
          </div>
      </div>
       <div class="TimeRangItem">
          <p class="note">{{$t('Message.DeliveryInstructions')}}</p>
          <div class="inputMain">
            <textarea id="TimeNote" v-model="TimeNote" @change="TimeNoteChange" disabled></textarea>
          </div>
      </div>
     </div>
     </div>

  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import ExpressAndOutlets from '@/model/ExpressAndOutlets';
import ExpressPoint from '@/model/ExpressPoint';
import InsInput from '@/components/base/pc/InsInput.vue';
import InsInput2 from '@/components/base/pc/InsInput2.vue';
import PickupAddress from '@/model/pickupAddress';
import Address from '@/model/address';
import { Province } from '@/model/province';
import { Country } from '@/model/country';
import InsButton from '@/components/base/pc/InsButton.vue';
import InsSelect from '@/components/base/pc/InsSelect2.vue';
import InsForm from '@/components/base/pc/InsForm.vue';
import { MemberResult } from '@/model/memberResult';
import Collaspe from '@/components/service/Collapse.vue';
class ExpressChargeReq {
  ItemAmount!:number;
  PointId!:string;
  constructor (ItemAmount:number, PointId:string) {
    this.ItemAmount = ItemAmount;
    this.PointId = PointId;
  }
}
@Component({ components: { InsInput, InsButton, InsSelect, InsInput2, InsForm, Collaspe } })
export default class InsExpressWay extends Vue {
    private pickupTimeList;
    // 運輸方式列
    private Express:ExpressAndOutlets[] = [];
    // 選中的運輸方式
    private ChosenExpress:ExpressAndOutlets = new ExpressAndOutlets();
    // 快遞點
    private ChosenExpressPoint:ExpressPoint = new ExpressPoint();
    // 門店自提地址列表
    private PickupAddressList: PickupAddress[] = [];
    // 門店自提地址
    private PickAddress: PickupAddress = new PickupAddress();
    // 當前自提地址
    private CurrentPickupAddress: PickupAddress = new PickupAddress();
    // 加載中
    private loading: boolean = true;
    // 選擇運輸方式為送貨上門后，是否可選快遞的運輸方式
    private chooseCharge: boolean = false;
    // 可選快遞的運輸方式列表
    private chooseChargeList: ExpressAndOutlets[] = [];
    // 選中的送貨上門地址
    private SelectedAddress:Address = new Address();
    // 是否有信息異常
    private expressError: boolean = false;
    // 當前正在編輯的地址
    private editAddress:Address = new Address();
    // 商品總價
    private ItemsAmount:number = 0;
    // 總重量
    private TotalWeight:number = 0;
    // 省份列表
    private provinceList: Province[] = [];
    // 選中快遞方式價格
    private ChosenExpressCharge: ExpressAndOutlets = new ExpressAndOutlets();
    // 地址列表
    private addressList:Address[] = [];
    // 国家地区列表
    private countryList: Country[] = [];
    // 用户信息
    private Profile = new MemberResult();
    // 是否顯示編輯地址
    private showEdit = false;

    // 自定義送貨時間显示
    private TimeRangeShow = false;

    // 自定義送貨時間列表
    private TimeRangeData:any[]=[];

    // 选择的自定义送货时间的组别
     private selectExpressTimeOne:any = Object.create(null);

    // 自定義送貨時間附加价钱
    private AdditionlCost:number = 0;
    private selectExpressCostID:string = '';
    private IsSelfDefineDeliveryDate:boolean = false;
    // 自定義选择送貨時間
    private DateSelect:string='';
    private TimeNote:string='';

    // 新順豐自提Flag
    private newSF: boolean = false;
    // 自提點類型
    private SFPointType: any[] = [];
    // 新順豐自提篩選條件
    private SFScreen: any = {};
    // 新順豐自提城市列表
    private SFCountry: Country[] = [];
    // 新順豐自提省份列表
    private SFProvince: Province[] = [];
    // 新順豐自提城市列表
    private SFCity: any[] = [];
    // （新）順豐自提地址數據
    private PiUpPointList: any[] = [];
    // 自取日期是否必填
    private PickupDateRequire: boolean = false;
    // 自取(人)信息是否必填
    private PickupInfoRequire: boolean = false;

    @Prop({ default: false }) private lockFare!: boolean;
    pickerOptions : object = {
      disabledDate(time) {
        return time.getTime() < Date.now();
      }
    }
    DateSelectAct () {
      $('#TimeRange').removeAttr('disabled');
      $('#TimeNote').removeAttr('disabled');
      this.$emit('getDeliveryDate', this.DateSelect);
    }
    TimeNoteChange () {
      this.$emit('getRemark', this.TimeNote);
    }
    selectTime () {
      this.AdditionlCost = this.selectExpressTimeOne.AdditionlCost;
      this.selectExpressCostID = this.selectExpressTimeOne.Id;
      this.$emit('getAdditionlCost', this.AdditionlCost, this.selectExpressCostID);
    }
    created () {
      this.pickupTimeList = [{ Id: '0', Name: this.$t('CheckOut.Morning') }, { Id: '1', Name: this.$t('CheckOut.Afternoon') }];
      if (this.lockFare) { this.loading = false; return; }
      this.$store.dispatch('setPickUpExpress', true);
      let profile = this.$Api.member.getProfile2().then((result) => {
        this.Profile = result.MemberResult;
        // this.$store.dispatch('setMemberInfo', result.MemberResult);
        this.PickAddress.Name = this.Profile.LastName ? this.Profile.FirstName + ' ' + this.Profile.LastName : this.Profile.FirstName;
        // this.PickAddress.Phone = this.Profile.Mobile;
        this.PickName = this.PickAddress.Name;
        // this.PickPhone = this.PickAddress.Phone;
        if (this.PickPhone === null || this.PickPhone === undefined || this.PickAddress.Phone === null || this.PickAddress.Phone === undefined) {
          this.PickAddress.Phone = this.Profile.Mobile;
          this.PickPhone = this.PickAddress.Phone;
        }
      });
      let express = this.$Api.delivery.getExpressAndOutlets().then((result) => {
        this.Express = result.ExpressAndOutlets;
        this.ChosenExpress = result.ExpressAndOutlets.length > 0 ? result.ExpressAndOutlets[0] : new ExpressAndOutlets();
        this.IsSelfDefineDeliveryDate = this.ChosenExpress.IsSelfDefineDeliveryDate;
        if (this.ChosenExpress.ExpressPointList === null) {
          this.ChosenExpress.ExpressPointList = [];
        }
        this.ChosenExpressPoint = this.ChosenExpress.ExpressPointList.length > 0 ? this.ChosenExpress.ExpressPointList[0] : new ExpressPoint();
      });
      if (!this.$store.state.shopCart) this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
      let shopcart = this.$store.state.shopCart.then((result) => {
        this.TotalWeight = result.ShopCart.TotalWeight;
        this.ItemsAmount = result.ShopCart.ItemsAmount;
      });
    }
    @Watch('PickAddress', { deep: true })
    onPickAddressChange () {
      this.Shake(() => {
        if (!this.PickAddress.Phone || !this.PickAddress.Name || !this.PickAddress.PD) { this.$emit('PickAddressError'); } else {
          this.$emit('PickAddress');
          this.IsSelfDefineDeliveryDate = this.ChosenExpress.IsSelfDefineDeliveryDate;
          this.$store.dispatch('setPickupAddress', this.PickAddress);
        }
      }, 500);
    }
    @Watch('ChosenExpress')
    onChosenExpressChange () {
      this.loading = true;
      this.chooseCharge = false;
      this.$store.dispatch('setPickUpExpress', this.ChosenExpress.IsExpressPoint);

      // 自取設置信息
      if (this.ChosenExpress.IsExpressPoint) {
        this.PickupDateRequire = this.ChosenExpress.PickupDateRequire;
        this.PickupInfoRequire = this.ChosenExpress.PickupInfoRequire;
        this.$store.dispatch('setPickupInfoRequire', this.PickupInfoRequire);
      }

      // 新順豐自提
      if (this.ChosenExpress.ComeFrom) {
        this.newSF = true;
        this.$store.dispatch('setNewSF', true);
      } else {
        this.newSF = false;
        this.$store.dispatch('setNewSF', false);
        this.PiUpPointList = [];
      }

      if (!this.$store.state.pickUpExpress) {
        // 如果是送貨上門就加載可用地址
        this.loadAddress();
        this.ChosenExpressPoint = new ExpressPoint('', '', '-1');
        this.$store.dispatch('setDeliveryType', 'D');
        this.$Api.delivery.getDefaultAddrForEx(this.ChosenExpress.Id).then((result) => {
          this.editAddress = new Address();
          this.SelectedAddress = result.Address;
          if (this.SelectedAddress.DeliveryId) this.$store.dispatch('setSelectAddress', this.SelectedAddress);
          else throw new Error('no default address');
        }).catch(async (e) => {
          // 这里应该是要处理没有默认地址的，获取当前快递支持的用户地址的第一个
          await this.$Api.delivery.getAddressForEx(this.ChosenExpress.Id).then((result) => {
            this.editAddress = new Address();
            this.SelectedAddress = result.Address.length > 0 ? result.Address[0] : new Address();
            this.$store.dispatch('setSelectAddress', this.SelectedAddress);
            if (result.Address.length === 0) this.showEdit = true;
          });
        }).then(() => {
          this.getExpressChargeForEx();
          this.IsSelfDefineDeliveryDate = this.ChosenExpress.IsSelfDefineDeliveryDate;
          this.$emit('express'); this.expressError = true;
          this.$emit('getAdditionlCost', 0, '');
          this.selectExpressTimeOne = {};
          this.DateSelect = '';
          this.TimeNote = '';
          $('#TimeRange').attr('disabled', 'disabled');
          $('#TimeNote').attr('disabled', 'disabled');
        });
      } else {
        // 快遞自提
        if (this.ChosenExpress.ExpressCompanyId !== 'P') {
          this.ChosenExpressPoint = this.ChosenExpress.ExpressPointList.length ? this.ChosenExpress.ExpressPointList[0] : new ExpressPoint('', '', '-1');
          this.$store.dispatch('setDeliveryType', 'D');
          this.$store.dispatch('setExpress', this.ChosenExpress);
          if (this.ChosenExpress.ExpressPointList.length === 0 || this.PickPhone === null || this.PickPhone === undefined || !this.PickName) { this.$emit('PickAddressError'); this.expressError = false; this.loading = false; } else { this.$emit('express'); this.expressError = true; }
        } else if (this.ChosenExpress.ExpressCompanyId === 'P') {
          this.$store.dispatch('setExpress', this.ChosenExpress);
          this.ChosenExpressPoint = new ExpressPoint();
          this.$store.dispatch('setDeliveryType', 'P');
          this.$Api.delivery.getPickupAddressV2().then((result) => {
            this.$emit('express');
            this.loading = false;
            this.PickupAddressList = result.PickupAddress;
            if (this.PickupAddressList.length > 0) this.CurrentPickupAddress = this.PickupAddressList[0]; else this.CurrentPickupAddress = new PickupAddress();
            this.PickAddress.Id = this.CurrentPickupAddress.Id;
            this.PickAddress.ExpressPointId = this.CurrentPickupAddress.Id;
            this.PickAddress.CompanyAddress = this.CurrentPickupAddress.Address;
          });
        }

        if (this.newSF) {
          // 新順豐自提
          Promise.all([this.getSFCounty(), this.GetShunFengPointType()]).then((result) => {
            this.loading = false;
            // this.$store.dispatch('setDeliveryType', 'P');
          });
        }
      }
    }
    @Watch('ChosenExpressPoint')
    onChosenExpressPoint () {
      // if (this.ChosenExpressPoint.Id === '-1') return;
      if (!this.ChosenExpressPoint || this.ChosenExpressPoint.Id === '-1') return;
      this.loading = true;
      this.$Api.delivery.getExpressPointCharge(new ExpressChargeReq(this.ItemsAmount, this.ChosenExpressPoint.Id)).then(
        (result) => {
          this.ChosenExpressPoint.DiscountPrice = result;
          this.$emit('express');
          this.$store.dispatch('setExpressPoint', this.ChosenExpressPoint);
          this.loading = false;
        }
      );
    }
    @Watch('editAddress.Country')
    onCountryChange (o, n) {
      if (this.editAddress.Country.Id !== '') {
        this.$Api.delivery.getProvinceForEx(this.ChosenExpress.Id, this.editAddress.Country.Id).then((result) => {
          this.provinceList = result.Province;
        });
      } else {
        this.provinceList = [];
      }
      // this.provinceList = this.allProvice[this.editAddress.Country.Id];
      // if (!Array.isArray(this.provinceList)) {
      // if (o.Id === n.Id) return;
      // this.$Api.delivery.getProvinceForEx(this.ChosenExpress.Id, this.editAddress.Country.Id).then((result) => {
      //   this.provinceList = result.Province;
      //   // this.allProvice[this.editAddress.Country.Id] = result.Province;
      // });
      // }
    }
    @Watch('SelectedAddress')
    onSelectedAddressChange () {
      this.Shake(this.getExpressChargeForEx);
    }
    getExpressChargeForEx () {
      if (this.SelectedAddress.DeliveryId === 0) { this.$SingtonConfirm(this.$t('Message.Message'), this.$t('DeliveryAddress.AddDeliveryAddress')); this.$emit('expressError'); this.expressError = false; this.loading = false; return; };
      this.$Api.delivery.getExpressChargeForEx({
        DeliveryAddrId: this.SelectedAddress.DeliveryId,
        TotalWeight: this.TotalWeight,
        ItemAmount: this.ItemsAmount,
        ExpressId: this.ChosenExpress.Id }).then((result) => {
        this.loading = false;
        if (result.ExpressAndOutlets.length === 0) {
          this.$SingtonConfirm(this.$t('Message.Message'), this.$t('CheckOut.expressError')); this.$emit('expressError'); this.expressError = false;
        } else if (result.ExpressAndOutlets.length === 1) {
          this.$store.dispatch('setExpress', result.ExpressAndOutlets[0]);
          this.$emit('express');
          this.expressError = true;
        //  加载后台自定义时间
          var _this = this;
          if (result.ExpressAndOutlets[0].IsSelfDefineDeliveryDate) {
              this.$Api.delivery.getExpressTimeRange(this.ChosenExpress.Id).then((result) => {
                    _this.TimeRangeData = result.data;
                    _this.TimeRangeShow = true;
              });
          } else {
            _this.TimeRangeShow = false;
          }
        } else if (result.ExpressAndOutlets.length > 1) {
          this.$store.dispatch('setExpress', result.ExpressAndOutlets[0]);
          this.$emit('express');
          this.expressError = true;
          this.chooseCharge = true;
          this.chooseChargeList = result.ExpressAndOutlets;
          this.ChosenExpressCharge = result.ExpressAndOutlets[0];
        } else { this.$emit('expressError', this.$t('CheckOut.expressError')); this.expressError = false; }
      });
    }
    @Watch('ChosenExpressCharge')
    onChoseExpressChargeChange () {
      this.$store.dispatch('setExpress', this.ChosenExpressCharge);
    }
    loadAddress () {
      // if (!this.expressError) { this.$SingtonConfirm(this.$t('Message.Message'), this.$t('CheckOut.expressError')); return; }
      this.$Api.delivery.getAddressForEx(this.ChosenExpress.Id).then((result) => {
        this.addressList = result.Address;
        if (this.addressList && this.addressList.length === 0) this.showEdit = true;
      });
      this.$Api.delivery.getCountyForEx(this.ChosenExpress.Id).then((result) => {
        this.countryList = result.Country;
        this.editAddress.Country = result.Country[0];
      }).then(() => {
        this.$Api.delivery.getProvinceForEx(this.ChosenExpress.Id, this.editAddress.Country.Id).then((result) => {
          this.provinceList = result.Province;
        });
      });
    }
    editAddr (index) {
      this.editAddress = Object.assign(new Address(), this.addressList[index]);
      this.showEdit = true;
    }
    removeAddr (index) {
      if (this.addressList[index] && this.addressList[index].DeliveryId === this.SelectedAddress.DeliveryId) {
        // this.$SingtonConfirm(this.$t('Message.Message'), this.$t('CheckOut.AddressLock')); return;
        this.SelectedAddress = new Address();
        this.$store.dispatch('setSelectAddress', this.SelectedAddress);
      }
      let address = this.addressList.splice(index, 1);
      if (address.length) { this.$Api.address.removeAddress(address[0].DeliveryId); }
    }
    selectAddr (index) {
      this.loading = true;
      this.SelectedAddress = this.addressList[index];
      this.$store.dispatch('setSelectAddress', this.SelectedAddress);
      this.$message(this.$t('Message.SucceedInOperating') as string);
    }
    addAddr () {
      this.editAddress = new Address(this.countryList[0], this.provinceList[0]);
      this.showEdit = true;
    }
    save (formName) {
      let names = this.editAddress.FullName.trim().split(/\s+/);
      let fistName;
      let lastName;
      if (names.length > 1) {
        fistName = names[0];
        lastName = names[1];
      } else {
        fistName = names[0];
        lastName = '';
      }
      if (this.provinceList.length === 0) {
        this.editAddress.Provinceo = new Province();
        this.editAddress.Provinceo.Id = -1;
        this.editAddress.Provinceo.Name = '';
      } else {
        // eslint-disable-next-line no-unused-expressions
        this.editAddress.Provinceo.Id;
      }
      let form = {
        Province: this.editAddress.Provinceo.Id,
        CountryId: this.editAddress.Country.Id,
        ProvinceName: this.editAddress.Provinceo.Name,
        DeliveryId: this.editAddress.DeliveryId === 0 ? undefined : this.editAddress.DeliveryId,
        Default: this.editAddress.Default,
        IsUsable: true,
        FirstName: fistName,
        LastName: lastName,
        Phone: this.editAddress.Phone,
        Mobile: this.editAddress.Mobile,
        PostalCode: this.editAddress.PostalCode,
        Address: this.editAddress.Address,
        MemberId: this.Profile.MemberId,
        City: this.editAddress.City
      };
      setTimeout(() => {
        (this.$refs[formName] as InsForm).validate((valid) => {
          if (valid) {
            form.Mobile = form.Phone;
            this.$Api.address.saveAddress(form).then((result) => {
            }).then(() => {
              this.$Api.delivery.getAddressForEx(this.ChosenExpress.Id).then((result) => {
                this.addressList = result.Address;
                this.SelectedAddress = result.Address.length > 0 ? result.Address[0] : new Address();
                this.$store.dispatch('setSelectAddress', this.SelectedAddress);
                this.$message(this.$t('Message.SucceedInOperating') as string);
                (this.$refs.adderform as InsForm).reset();
                this.showEdit = false;
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }, 500);
    }
    get PickName () {
      return this.$store.state.DPickName;
    }
    set PickName (v) {
      this.Shake(() => {
        if (!v) { this.$emit('PickAddressError'); } else {
          this.$emit('PickAddress');
          this.$store.dispatch('setPickupAddress', this.PickAddress);
        }
      }, 100);
      this.$store.dispatch('setDPickName', v);
    }
    get PickPhone () {
      return this.$store.state.DPickPhone;
    }
    set PickPhone (v) {
      this.Shake(() => {
        if (!v) { this.$emit('PickAddressError'); } else {
          this.$emit('PickAddress');
          this.$store.dispatch('setPickupAddress', this.PickAddress);
        }
      }, 100);
      this.$store.dispatch('setDPickPhone', v);
    }
    ExpressSelect () {
      (this.$refs.adderform as InsForm).reset();
      this.showEdit = false;
    }

        // 獲取（新）順豐自提點國家列表
    async getSFCounty () {
      await this.$Api.delivery.getCountyForEx(this.ChosenExpress.Id).then((result) => {
        this.SFCountry = result.Country;
      }).catch((error) => {
        console.log(error, 'error');
        this.$message({
          message: error,
          type: 'error'
        });
      });
    }

    // 獲取（新）順豐自提點省份列表
    getSFProvince () {
      this.$Api.delivery.getProvinceForEx(this.ChosenExpress.Id, this.SFScreen.Country.Id).then((result) => {
        this.SFProvince = result.Province;
      }).catch((error) => {
        console.log(error, 'error');
        this.$message({
          message: error,
          type: 'error'
        });
      });
    }

    // 獲取（新）順豐自提點城市列表
    getSFCity () {
      console.log(this.SFScreen.Province.Id, 'this.SFScreen.Province.Id');
      this.$Api.delivery.GetCityByProvince(this.SFScreen.Province.Id).then((result) => {
        this.SFCity = result;
      }).catch((error) => {
        console.log(error, 'error');
        this.$message({
          message: error,
          type: 'error'
        });
      });
    }

    // 獲取自提點類型
    async GetShunFengPointType() {
      await this.$Api.delivery.GetShunFengPointType().then((result) => {
        console.log(result, '獲取自提點類型');
        this.SFPointType = result;
      });
    }

    // 查詢獲取（新）順豐自提地址數據
    async GetPickUpPointCharge() {
      await this.$Api.delivery.GetPickUpPointCharge({
        countryId: this.SFScreen.Country ? this.SFScreen.Country.Id : 0,
        provinceId: this.SFScreen.Province ? this.SFScreen.Province.Id : 0,
        cityId: this.SFScreen.City ? this.SFScreen.City.Id : 0,
        ponitType: this.SFScreen.PointType ? this.SFScreen.PointType.Id : 0,
        useShunFengData: true,
        Page: 1,
        PageSize: 100
      }).then((result) => {
        console.log(result, '獲取（新）順豐自提數據');
        this.PiUpPointList = result;

        if (!this.PiUpPointList.length) {
          // this.$alert(this.$t('Message.NoneAddPiUpAddr') as string, '', {
          //   confirmButtonText: this.$t('Message.Confirm') as string
          // });
          this.$Confirm(this.$t('Message.Message'), this.$t('Message.NoneAddPiUpAddr') as string);
        }
      });
    }

    @Watch('SFScreen.Country')
    SFCountryChange() {
      this.getSFProvince();
    }

    @Watch('SFScreen.Province')
    SFProvinceChange() {
      this.getSFCity();
    }
}
</script>
<style lang="less">
.mobile{
  .selectArea{
    .in_select_dropdown ul {
      margin: 3px 3px 3px 3px;
      height: 150px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
.mobileEx .my_textarea{
      width: calc(100% - 120px)!important;
      float: right;
}
.mobile .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%!important;
}

.expressWay_Warpper {
    .in_select_dropdown {
      border-top: 1px solid rgba(0,0,0,.2);
      min-width: 100%;
      .in_select_dropdown_content {
        max-height: 30vh;
        overflow-y: auto;

        li {
          height: unset;
          line-height: unset;
          padding: 10px 20px;
          white-space: normal;
        }
      }
    }
  }
</style>
<style lang="less" scoped>
.input_warpper {
  display: flex;
  margin-top: 30px;
  width: 100%;
  label {
    font-size: 16px;
    width: 120px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .select_main {
    flex:1;
    flex-flow: 1;
    /deep/ .el-select {
      width: 100%;
      .el-input__inner {
        width: 100%!important;
      }
    }
  }
}
.DeliveryMark{
  color:red;
  font-size: 1.5rem;
}
.locked_express{
      display: flex;
      .title{
        width: 300px;
        font-size: 16px;
        line-height: 40px;
      }
      .name{
        flex-grow: 1;
        font-size: 16px;
        line-height: 40px;
      }
    }
.fare2_express{
    display: flex;
    padding: 0 10px;
    /deep/ .in_select_label{
      font-size: 1.2rem;
    }
}
.expressWay_Warpper{
  // width: 100vw;
  border: 1px solid rgba(0, 0, 0, .1);
  margin-bottom: 2rem;
  .expressWay_title{
    font-size: 1.5rem;
    background-color:@base_color;
    padding: 1rem;
    color: white;
  }
  .expressWay_main{
    .express{
      .none{
        padding: 1rem;
        /deep/ .input_outer{
          // padding-top: 0;
          // padding-bottom: 2rem;
        }

        /deep/ .in_btn{
          margin-top: 1rem;
          span{
            font-size: 1.2rem;
          }
        }
        /deep/ .SelectArea{
          margin-top: 0;
        }
        /deep/ .SelectProvince{
          margin-top: 0;
        }
        /deep/ .textArea{
          .input_label{
            display: none;
          }
        }
      }
      .address_item_warpper{
        padding: 0 0.8rem;
        .address_footer{
          margin: 20px;
          // border: solid 2px rgba(0, 0, 0, .1);
          border-top: none;
          position: relative;
          // min-height: 32px;
          .address_operate{
                // position: absolute;
                // right: 0;
                text-align: right;
                .select_address{
                  padding: 6px 24px;
                  // margin-left: 24px;
                  color: white;
                  background-color: @base_color;
                  cursor: pointer;
                  font-size: 1.2rem;
                  display: inline-block;
                }
            }
        }
        .address_item{
          // border: solid 2px rgba(0, 0, 0, .1);
          .address_selected{
              display: inline-block;
              color: white;
              background-color: @base_color;
              padding: 6px 24px;
              font-size: 1.2rem;
            }
          .address_selected_other{
            position: relative;
            margin: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            .address_operate{
                position: absolute;
                right: 0;

                .select_address{
                  padding: 6px 24px;
                  margin-left: 24px;
                  color: white;
                  background-color: rgba(0, 0, 0, .5);
                  cursor: pointer;
                  font-size: 1.2rem;
                }
                .update_address{
                  padding: 6px 24px;
                  margin-left: 24px;
                  color: white;
                  background-color: rgba(0, 0, 0, .5);
                  cursor: pointer;
                  font-size: 1.2rem;
                }
                .heightLine{
                  background-color: @base_color;
                  font-size: 1.2rem;
                }
            }
            .itemPadding{
              font-size: 1.2rem;
              margin-bottom: 0.5rem;
              &:last-child{
                margin-bottom: 0;
              }
            }
          }
        }
        .address_item_topBorderNone{
          border-top: none;
        }
        .address_item_bottomBorderNone{
          border-bottom: none;
        }
        .selected_item{
          border: solid 2px @base_color;
        }
        }
    }
    /deep/ .in_select_main{
      box-sizing: border-box;
      font-size: 1.2rem;
    }
  }
  .express_pickup,.store_pickup,.pickup_info{
    padding: 0 20px 20px 20px;
  }
}
.TimeRangMain{
  padding: 1rem;
  .TimeRangItem{
    width: 100%;
    display:flex;
    padding-top: 30px;

    .date,.time,.note{
      width: 120px;
      font-size: 16px;
      padding-top: 10px;
    }
    .note{
      padding-top: 5px;
    }
    .inputMain{
      display: flex;
      flex-grow: 1;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      textarea{
        width: 100%;
        height: 100px;
        border: 1px solid #DCDFE6;
        color: #606266;
        outline: 0;
      }
      select{
        width: 100%;
        border: 1px solid #DCDFE6;
        padding-left: 10px;
        color: #606266;
        height: 40px;
      }
    }
  }
}

.searchSF {
  padding: 10px 20px 20px;
  text-align: center;

  .el-button {
    width: 100%;
    background: @base_color;
    border-color: @base_color;
  }
}
</style>
