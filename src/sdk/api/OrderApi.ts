import { WSAPI } from './WSApi';
import { CreateOrder } from '@/model/order';
import Proxy from '../common/Proxy';
export class OrderApi extends WSAPI {
  // @Proxy('Message')
  // createOrder (order: CreateOrder) {
  //   return this.instance.post(
  //     this.apiPath + '/order',
  //     order).then((result) => {
  //     // console.log(result.data);
  //     return result.data;
  //   });
  // }
  createOrder (order: CreateOrder) {
    return this.instance.post(
      this.apiPath + '/DefaultOrder/CreateDefaultOrder',
      order).then((result) => {
      // console.log(result.data);
      return result.data;
    });
  }
  UploadFile (param) {
    return Promise.resolve(this.apiPath + '/FileUpload/UploadFile');
  }
  SaveOffLinePay (pas: object) {
    return this.instance.post(this.apiPath + '/Pay/SaveOffLinePay',
      pas).then((result) => {
      return result.data;
    });
  };
  @Proxy('Order')
  getOrder (id: string) {
    return this.instance.get(this.apiPath + '/Order/GetOrder', { params: { id: id } }).then((result) => {
      // check success
      return result.data;
    });
  };
  @Proxy('PromotionDiscount')
  getPromotionCodeFrontView (code) {
    return this.instance.get(this.apiPath + '/Order/GetPromotionCodeFrontView', { params: { code: code } }).then((result) => {
      if (result.data.Code === 0) { return result.data.ReturnValue; } else { throw new Error(result.data.Message); };
    });
  }
  getOrderDetail (id: string) {
    return this.instance.get(this.apiPath + '/Order/GetOrder', { params: { id: id } }).then((result) => {
      // check success
      return result.data;
    });
  };

  getPaymentType () {
    return this.instance.get(this.apiPath + '/pay/GetPaymentMethod').then((result) => {
      // check success
      return result.data;
    });
  };

  getPageOrder (pageSize: number, page: number) {
    return this.instance.get(this.apiPath + '/Order/GetOrder', { params: { page: page, pageSize: pageSize } }).then((result) => {
      // check success
      return result.data;
    });
  };

  cancel (id: string) {
    return this.instance.get(this.apiPath + '/Order/Cancel', { params: { id: id } }).then((result) => {
      // check success
      return result.data;
    });
  };

  getDeliveryTimeRange () {
    return this.instance.get(this.apiPath + '/Order/GetDeliveryTimeRange').then((result) => {
      // check success
      return result.data;
    });
  };

  private static instance: OrderApi;
  //* * 单例 */
  public static getInstance (): OrderApi {
    if (OrderApi.instance) { return OrderApi.instance; } else {
      OrderApi.instance = new OrderApi();
      return OrderApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
