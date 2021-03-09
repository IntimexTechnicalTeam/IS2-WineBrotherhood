/* eslint-disable promise/param-names */
import { WSAPI } from './WSApi';
import Proxy from '../common/Proxy';

export class MessageApi extends WSAPI {
  // 獲取未讀消息數量
  getUnreadMsgQty () {
    return this.instance.get(this.apiPath + '/Message/GetMbrUnreadMsgQty').then((result) => {
      return result;
    });
  };

  // 獲取未讀消息列表
  getUnreadMsgList (pager: object, callback: Function) {
    return this.instance.post(this.apiPath + '/Message/GetMemberUnreadMsg', pager).then((result) => {
      return result;
    });
  };

  // 獲取全部消息列表
  getAllMsgList (pager: object, callback: Function) {
    return this.instance.post(this.apiPath + '/Message/GetAllMemberMsg', pager).then((result) => {
      return result;
    });
  };

  // 回復消息（需傳遞被回復記錄的ID）
  replyMsg (message: object, callback: Function) {
    return this.instance.post(this.apiPath + '/Message/MbrReplyMessage', message).then((result) => {
      return result;
    });
  };

  // 發送會員的售前咨詢信息
  sendPreSalesMsg (message: object, callback: Function) {
    return this.instance.post(this.apiPath + '/Message/SendMemberPreSalesMsg', message).then((result) => {
      return result;
    });
  };

  // 發送會員的售後咨詢信息
  sendAfterSalesMsg (message: object, callback: Function) {
    return this.instance.post(this.apiPath + '/Message/SendMemberAfterSalesMsg', message).then((result) => {
      return result;
    });
  };

  // 標記指定的消息為已讀狀態
  markedMessageAsRead (msgIdLst: string) {
    return this.instance.post(this.apiPath + '/Message/MarkedMessageAsRead', { MsgIds: msgIdLst }).then((result) => {
      return result;
    });
  };

  // 標記所有消息為已讀狀態
  markedMbrAllMsgAsRead (callback: Function) {
    return this.instance.get(this.apiPath + '/Message/MarkedMbrAllMsgAsRead').then((result) => {
      return result;
    });
  };

  // 刪除指定的信息
  deleteMsg (msgIdLst: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Message/DeleteMsg', { params: { msgIdLst: msgIdLst } }).then((result) => {
      return result;
    });
  };

  // 刪除所有信息
  deleteAllMsg (callback: Function) {
    return this.instance.get(this.apiPath + '/Message/DeleteAllMsg').then((result) => {
      return result;
    });
  };

  private static instance: MessageApi;
  //* * 单例 */
  public static getInstance (): MessageApi {
    if (MessageApi.instance) { return MessageApi.instance; } else {
      MessageApi.instance = new MessageApi();
      return MessageApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
