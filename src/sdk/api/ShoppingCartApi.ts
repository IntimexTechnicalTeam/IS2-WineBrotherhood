import { WSAPI } from './WSApi';
import Message from '@/model/Message';
import Proxy from '@/sdk/common/Proxy';
import ShopCart from '@/model/ShopCart';
import store from '@/store';
export class ShoppingCartApi extends WSAPI {
  // @Proxy(Message)
  async addItem (sku: string, qty: number, attr1: number = 1, attr2: number = 1, attr3: number = 1) {
    let result = await this.instance.post(
      this.apiPath + '/ShoppingCart',
      { Sku: sku, Attr1: attr1, Attr2: attr2, Attr3: attr3, qty: qty }
    );
    // return result.data;
    return { Message: new Message(result.data.Message, result.data.ReturnValue, result.data.Succeeded) };
    // if (result.data.Succeeded) {
    //   Vue.prototype.$Inform(result.data.Message);
    //   return Promise.resolve(result);
    // } else {
    //   Vue.prototype.$Info(result.data.Message);
    //   return Promise.resolve(result);
    // }
  };
  // @Proxy(ShopCart)
  // getShoppingCart () {
  //   let result = this.instance.get(this.apiPath + '/ShoppingCart',
  //     {}).then((result) => {
  //     // do someting about check success
  //     // return result.data;
  //     let shopCart = new ShopCart();
  //     Object.keys(shopCart).forEach((element) => {
  //       element = element.replace('_', '');
  //       shopCart[element] = result.data[element];
  //     });
  //     return { ShopCart: shopCart };
  //   });
  //   // store.dispatch('setShopCart', result);
  //   return result;
  // };
  // @Proxy(ShopCart)
  getShoppingCart () {
    let result = this.instance.get(this.apiPath + '/DefaultShoppingCart/GetDefaultShoppingCarts',
      {}).then((result) => {
      // do someting about check success
      // return result.data;
      let shopCart = new ShopCart();
      Object.keys(shopCart).forEach((element) => {
        element = element.replace('_', '');
        shopCart[element] = result.data[element];
      });
      return { ShopCart: shopCart };
    });
    // store.dispatch('setShopCart', result);
    return result;
  };

  // @Proxy(Message)
  updateItemQty (itemId: string, qty: number) {
    return this.instance.get(this.apiPath + '/ShoppingCart/UpdateItemQty', { params: { id: itemId, qty: qty } }).then((result) => {
      // do someting about check success
      // return result.data;
      return { Message: new Message(result.data.Message, result.data.ReturnValue, result.data.Succeeded) };
    });
  };
  // @Proxy(Message)
  // removeItem (id: string) {
  //   return this.instance.get(
  //     this.apiPath + '/ShoppingCart/RemoveItem',
  //     { params: { id: id } }
  //   ).then((result) => {
  //     // do someting about checking success
  //     return result.data;
  //   });
  // };

  /**
    * 获取购物车相关信息
    */
  @Proxy()
  LoadData () {
    return this.instance.get(
      this.apiPath + '/DefaultShoppingCart/GetDefaultShoppingCarts'
    );
  }
  // @Proxy(Message)
  removeItem (id: string) {
    return this.instance.get(
      this.apiPath + '/ShoppingCart/RemoveItem',
      { params: { id: id } }
    ).then((result) => {
      // do someting about checking success
      // return result.data;
      return { Message: new Message(result.data.Message, result.data.ReturnValue, result.data.Succeeded) };
    });
  }
  /**
    * 删除购物车相关产品信息
    */
  // @Proxy()
  // async removeItem (id: string) {
  //   let result = await this.instance.get(
  //     this.apiPath + '/ShoppingCart/RemoveItem',
  //     { params: { id: id } }
  //   );
  //   if (result.data.Succeeded) {
  //     return Promise.resolve(result);
  //   } else {
  //     return Promise.reject(new Error('Failed'));
  //   }
  // }

   private static instance: ShoppingCartApi;
   //* * 单例 */
   public static getInstance (): ShoppingCartApi {
     if (ShoppingCartApi.instance) { return ShoppingCartApi.instance; } else {
       ShoppingCartApi.instance = new ShoppingCartApi();
       return ShoppingCartApi.instance;
     }
   }
   // eslint-disable-next-line no-useless-constructor
   private constructor () {
     super();
   }
}
