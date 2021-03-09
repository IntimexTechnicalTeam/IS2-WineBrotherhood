import { WSAPI } from './WSApi';
import ExpressAndOutlets from '@/model/ExpressAndOutlets';
import Address from '@/model/address';
import { Province } from '@/model/province';
import Proxy from '@/sdk/common/Proxy';
import { Country } from '@/model/country';
export class DeliveryApi extends WSAPI {
  getCountry (callback: Function) {
    return this.instance.get(this.apiPath + '/Delivery/Country').then((result) => {
      return result;
    });
  };
  // @Proxy('[Country]')
  getCountyForEx (exId:number) {
    return this.instance.get(
      this.apiPath + '/Delivery/GetCountyForEx',
      { params: { expressId: exId } }).then((result) => {
      let countryList = [new Country()];
      countryList.length = 0;
      (result.data.Data || result.data).forEach(e => {
        let country = new Country();
        Object.keys(country).forEach((element) => {
          element = element.replace('_', '');
          country[element] = e[element];
        });
        countryList.push(country);
      });
      return { Country: countryList };
    });
  }
  getProvince (countryId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Delivery/Province', { params: { countryId: countryId } }).then((result) => {
      return result;
    });
  };
  // @Proxy('[Province]')
  getProvinceForEx (exId: number, countryId: number) {
    return this.instance.get(
      this.apiPath + '/Delivery/GetProvinceForEx',
      { params: { expressId: exId,
        countryId: countryId } }).then((result) => {
      let provinceList = [new Province()];
      provinceList.length = 0;
      (result.data.Data || result.data).forEach(e => {
        let province = new Province();
        Object.keys(province).forEach((element) => {
          element = element.replace('_', '');
          province[element] = e[element];
        });
        provinceList.push(province);
      });
      return { Province: provinceList };
    });
  }
  getAddress (callback: any) {
    return this.instance.get(this.apiPath + '/Address/GetAddresses').then((result) => {
      return result;
    });
  };

  getDefaultAddr (callback: any) {
    return this.instance.get(this.apiPath + '/Address/GetDefaultAddr').then((result) => {
      return result;
    });
  };

  getPickupAddress (callback: any) {
    return this.instance.get(this.apiPath + '/Delivery/GetPickupAddress').then((result) => {
      return result;
    });
  };

  getExpressTimeRange (expressId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Express/GetExpressTimeRange', { params: { expressId: expressId } }).then((result) => {
      return result;
    });
  };

  @Proxy('[PickupAddress]')
  getPickupAddressV2 () {
    return this.instance.get(this.apiPath + '/Delivery/GetPickupAddress').then((result) => {
      return result.data;
    });
  }
  saveAddress (address: any) {
    var action = '/Address/CreateAddress';
    if (address.DeliveryId) {
      action = '/Address/UpdateAddress';
    }
    return this.instance.post(
      this.apiPath + action,
      address
    ).then((result) => {
      // do someting
      return result.data;
    });
  }

  removeAddress (id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/address/RemoveAddress', { params: { deliveryId: id } }).then((result) => {
      return result;
    });
  };

  @Proxy('[ExpressAndOutlets]')
  getExpressAndOutlets () {
    return this.instance.get(
      this.apiPath + '/Express/GetExpressAndOutlets'
    ).then((result) => {
      return result.data;
    });
  }
  @Proxy('Address')
  getDefaultAddrForEx (exId:number) {
    return this.instance.get(
      this.apiPath + '/Address/GetDefaultAddrForEx',
      { params: { expressId: exId } }
    ).then((result) => {
      return result.data;
    });
  }
  getExpressPointWithDiscount (exCond: any) {
    return this.instance.post(
      this.apiPath + '/Express/GetExpressPointWithDiscount',
      exCond
    );
  }
  getExpressPointCharge (exCond: any) {
    return this.instance.post(
      this.apiPath + '/Express/GetExpressPointCharge',
      exCond
    ).then((result) => { return result.data; });
  }
  // @Proxy('[Address]')
  getAddressForEx (exId:string) {
    return this.instance.get(
      this.apiPath + '/Address/GetAddressesForEx',
      { params: { expressId: exId } }
    ).then((result) => {
      // do someting about check success
      // return result.data;
      let addressList = [new Address()];
      addressList.length = 0;
      (result.data.Data || result.data).forEach(e => {
        let address = new Address();
        Object.keys(address).forEach((element) => {
          element = element.replace('_', '');
          address[element] = e[element];
        });
        addressList.push(address);
      });
      return { Address: addressList };
    }).then((result) => {
      result.Address.forEach(element => {
        let province = new Province();
        province.Id = Number(element.Province);
        province.Name = element.ProvinceName;
        element.Provinceo = province;
      });
      return Promise.resolve(result);
    });
  }
  @Proxy('[ExpressAndOutlets]')
  getExpressChargeForEx (exCond: any) {
    return this.instance.post(
      this.apiPath + '/Express/GetDefaultExpressChargeForEx',
      exCond
    ).then((result) => {
      return result.data;
    });
  }
  savePickupInfo (addressId, address) {
    return this.instance.get(
      this.apiPath + '/Pay/SavePickupInfo',
      {
        params: {
          addressId: addressId,
          address: address,
          date: '',
          time: ''
        }
      }
    ).then((result) => {
      return result.data;
    });
  }

  // 順豐自提接口（新）
  // params: { useShunFengData: boolean, useBasicData: boolean }
  // useShunFengData=true表示只取順豐自提數據，useBasicData = true 表示只取原來舊的自提數據
  // 注意，系統還有兩個開關：ShunFengPointSwitch(順豐自提數據開關),DefaultPointSwitch（舊的自提數據開關）
  GetPickUpPointCharge (params: any) {
    return this.instance.post(
      this.apiPath + '/Delivery/GetPickUpPointCharge',
      params
    ).then((result) => {
      return result.data.ReturnValue;
    });
  }

  // 獲取自提點類型
  GetShunFengPointType () {
    return this.instance.get(this.apiPath + '/Delivery/GetShunFengPointType').then((result) => {
      return result.data;
    });
  };

  // 獲取對應送貨方式城市
  // params: pid: int
  GetCityByProvince (pid, callback: Function) {
    return this.instance.get(this.apiPath + '/Delivery/City', { params: { pid: pid } }).then((result) => {
      return result.data;
    });
  };

  private static instance: DeliveryApi;
  //* * 单例 */
  public static getInstance (): DeliveryApi {
    if (DeliveryApi.instance) { return DeliveryApi.instance; } else {
      DeliveryApi.instance = new DeliveryApi();
      return DeliveryApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
