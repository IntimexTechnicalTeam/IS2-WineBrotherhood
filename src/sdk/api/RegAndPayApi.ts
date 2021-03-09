import { WSAPI } from './WSApi';

export default class RegAndPayApi extends WSAPI {
  uploadMultiFile (file:any, callback:Function) {
    // instance 对象继承自WSAPI
    return this.instance.post(/* 这里调用post/get方法，返回的是一个promise对象，promise保存的是当次请求的状态 */
      this.apiPath + '/RegNPay/UploadMultiFile', /* url */
      file, /* 这里传的是参数 */
      { headers: { 'contentType': 'multipart/form-data' } } /* 这里可以追加一些请求头信息如Content-Type，Cache-Control等 { headers: { 'Content-Type': 'multipart/form-data' } } */);
  }
  getHtml (Key, Lang, IsMobile) {
    return this.instance.post(this.apiPath + '/RegNPay/GenForm', { Key: Key, Lang: Lang, IsMobile: IsMobile }).then((result) => {
      return result.data.ReturnValue;
    });
  }
  // 获取表单内容
  getForm (id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/Get', { params: { id: id } }).then((result) => {
      return result;
    });
  }

  // 获取表单html
  getFormHtml (id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/GetHtml', { params: { id: id } }).then((result) => {
      return result;
    });
  }

  // 保存填写信息
  saveSubmit (model: any, callback: Function) {
    return this.instance.post(this.apiPath + '/RegNPay/SaveSubmit', model).then((result) => {
      return result;
    });
  }

  // 获取填写订单基本信息
  getSubmitComplete (id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/GetSubmitComplete', { params: { id: id } }).then((result) => {
      return result;
    });
  }

  // 更新支付状态
  updatePayed (response: string, invoice:string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/UpdatePayedBySystem', { params: { response: response, invoice: invoice } }).then((result) => {
      return result;
    });
  }

  // 获取用户填写记录
  getSubmitList (shopperId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/GetSubmitByShopper', { params: { shopperId: shopperId } }).then((result) => {
      return result;
    });
  }

  // 获取填写信息
  getSubmitInfo (id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/GetSubmitBySubmitId', { params: { id: id } }).then((result) => {
      return result;
    });
  }

  // 保存支付方式
  savePayMethod (paymentMethod: number, id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/UpdatePayMethod', { params: { paymentMethod: paymentMethod, id: id } }).then((result) => {
      return result;
    });
  }

  // 轉碼
  base64StringToImageURL (signature: any, callback: Function) {
    return this.instance.post(this.apiPath + '/RegNPay/Base64StringToImageURL', signature).then((result) => {
      return result;
    });
  }

  checkOptionInventory (oid: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/checkOptionInventory', { params: { oid: oid } }).then((result) => {
      return result;
    });
  }

  checkIdentification (checkStr: string, qId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/RegNPay/checkOptionInventory', { params: { checkStr: checkStr, qId: qId } }).then((result) => {
      return result;
    });
  }

  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
  private static instance: RegAndPayApi;
  //* * 单例 */
  public static getInstance (): RegAndPayApi {
    if (RegAndPayApi.instance) { } else {
      RegAndPayApi.instance = new RegAndPayApi();
    }
    return RegAndPayApi.instance;
  }
}
