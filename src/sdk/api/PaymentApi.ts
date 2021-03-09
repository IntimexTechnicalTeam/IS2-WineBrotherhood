import { WSAPI } from './WSApi';
import Proxy from '../common/Proxy';
import Message from '../../model/Message';

export class PaymentApi extends WSAPI {
  // @Proxy(Message)
  savePayMethod (payMethodType:number) {
    return this.instance.get(
      this.apiPath + '/pay/SavePayMethod',
      { params: { payMethodType: payMethodType } }).then((result) => {
      // return result.data;
      return { Message: new Message(result.data.Message, result.data.ReturnValue, result.data.Succeeded) };
    });
  }
  private static instance: PaymentApi;
  //* * 单例 */
  public static getInstance (): PaymentApi {
    if (PaymentApi.instance) { } else {
      PaymentApi.instance = new PaymentApi();
    }
    return PaymentApi.instance;
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
