import { WSAPI } from './WSApi';
import Proxy, { ProxyV2 } from '../common/Proxy';
import Address from '@/model/address';
import { Province } from '@/model/province';
import Payment from '@/model/payment';
import Express from '@/model/express';
import { Country } from '@/model/country';

export class CheckoutApi extends WSAPI {
  // @Proxy([Address])
  getAddress () {
    return this.instance(
      this.apiPath + '/Address/GetAddresses',
      {}
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
    });
  }
  // @ProxyV2([Address])
  // * ['getAddress2'] () {
  //   let responseData = yield this.instance(this.apiPath + '/Address/GetAddresses', {});
  //   let formatData = yield ((response) => {
  //     // do someting about check success
  //     let validateDate = response.data;
  //     return Promise.resolve(validateDate);
  //   })(responseData);
  //   // do someting else
  //   formatData.Address.forEach(element => {
  //     let province = new Province();
  //     province.Id = element.Province;
  //     province.Name = element.ProvinceName;
  //     element.Provinceo = province;
  //   });
  //   return Promise.resolve(formatData);
  // }
  getAddress2 () {
    return this.getAddress().then((result) => {
      result.Address.forEach(element => {
        let province = new Province();
        province.Id = Number(element.Province);
        province.Name = element.ProvinceName;
        element.Provinceo = province;
      });
      return Promise.resolve(result);
    });
  }
  // @Proxy([Province])
  getProvince (countryId: string) {
    return this.instance.get(this.apiPath + '/Delivery/Province', { params: { countryId: countryId } }).then((result) => {
      // do someting about check success
      // return result.data;
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
  // @Proxy([Payment])
  getPaymentMethod () {
    return this.instance.get(
      this.apiPath + '/pay/GetPaymentMethod',
      {}).then((result) => {
      // do someting about check success
      // return result.data;
      let paymentList = [new Payment()];
      paymentList.length = 0;
      (result.data.Data || result.data).forEach(e => {
        let payment = new Payment();
        Object.keys(payment).forEach((element) => {
          element = element.replace('_', '');
          payment[element] = e[element];
        });
        paymentList.push(payment);
      });
      return { Payment: paymentList };
    });
  }
  // @Proxy([Express])
  getExpressWithDiscount (exCond: any) {
    return this.instance.post(
      this.apiPath + '/Express/GetExpressWithDiscount',
      exCond
    ).then((result) => {
      // do someting about check success
      // return result.data;
      let expressList = [new Express()];
      expressList.length = 0;
      (result.data.Data || result.data).forEach(e => {
        let express = new Express();
        Object.keys(express).forEach((element) => {
          element = element.replace('_', '');
          express[element] = e[element];
        });
        expressList.push(express);
      });
      return { Express: expressList };
    });
  }
  // @Proxy()
  getAccount () {
    return this.instance.get(
      this.apiPath + '/Member/getAccount',
      { params: {} }
    ).then((result) => {
      // do someting about check success
      return result.data;
    });
  };
  // @Proxy([Country])
  getCountry () {
    return this.instance.get(this.apiPath + '/Delivery/Country', {}).then((result) => {
      // do someting about check success
      // return result.data;
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
  // @Proxy()
  getPageOrder (pageSize: number, page: number) {
    return this.instance.get(this.apiPath + '/Order/GetOrder', { params: { page: page, pageSize: pageSize } }).then((result) => {
      // do someting about check success
      return result.data;
    });
  };
  private static instance: CheckoutApi;
  //* * 单例 */
  public static getInstance (): CheckoutApi {
    if (CheckoutApi.instance) { return CheckoutApi.instance; } else {
      CheckoutApi.instance = new CheckoutApi();
      return CheckoutApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
