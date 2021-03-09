import { WSAPI } from './WSApi';
import Proxy from '../common/Proxy';
import Message from '@/model/Message';
import PickupAddress from '@/model/pickupAddress';

export class AddressApi extends WSAPI {
  // @Proxy(Message)
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
      // return result.data;
      return { Message: new Message(result.data.Message, result.data.ReturnValue, result.data.Succeeded) };
    });
  }
  // @Proxy(Message)
  removeAddress (id: number) {
    return this.instance.get(
      this.apiPath + '/address/RemoveAddress',
      { params: { deliveryId: id } }
    ).then(result => {
      return { Message: new Message(result.data.Message, result.data.ReturnValue, result.data.Succeeded) };
    });
  }
  // @Proxy([PickupAddress])
  getPickupAddress () {
    return this.instance.get(
      this.apiPath + '/Delivery/GetPickupAddress',
      { params: {} }
    ).then((result) => {
      // do someting
      // return result.data;
      let pickupAddressList = [new PickupAddress()];
      pickupAddressList.length = 0;
      (result.data.Data || result.data).forEach(element => {
        let pickupAddress = new PickupAddress(element.Address, element.Id, element.Name, element.Phone, element.Seq);
        pickupAddressList.push(pickupAddress);
      });
      return { PickupAddress: pickupAddressList };
    });
  }
  private static instance: AddressApi;
  //* * 单例 */
  public static getInstance (): AddressApi {
    if (AddressApi.instance) { return AddressApi.instance; } else {
      AddressApi.instance = new AddressApi();
      return AddressApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
