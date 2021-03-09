import { WSAPI } from './WSApi';
import Comments from '@/model/Comments';
import Proxy from '@/sdk/common/Proxy';
export class CommentsApi extends WSAPI {
  saveComments (comments, contentType) {
    return this.instance.post(this.apiPath + '/ProductComment/SaveComments', comments, { headers: { contentType: 'application/json' } }).then((result) => {
      if (result.data.Succeeded) { return 'Succeed in saving Comments'; } else { throw new Error(result.data.Message); }
    });
  }
  @Proxy('[Comments]')
  getOrderComments (orderId) {
    return this.instance.get(this.apiPath + '/ProductComment/GetOrderComments', { params: { orderId: orderId } }).then((result) => {
      return result.data;
    });
  }
  /// 获取产品的所有评论
  @Proxy('[Comments]', 'TotalRecord')
  getProductComments (cond: object) {
    return this.instance.post(this.apiPath + '/ProductComment/GetProductComments', cond).then((result) => {
      return result.data;
    });
  }
  uploadImage (param) {
    return Promise.resolve(this.apiPath + '/FileUpload/UploadFile');
  }
  private static instance: CommentsApi;
  //* * 单例 */
  public static getInstance (): CommentsApi {
    if (CommentsApi.instance) { } else {
      CommentsApi.instance = new CommentsApi();
    }
    return CommentsApi.instance;
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
