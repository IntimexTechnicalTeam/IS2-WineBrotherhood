/* eslint-disable promise/param-names */
import { WSAPI } from './WSApi';

export class PointsApi extends WSAPI {
  // 保存会员积分
  Save (pas:any, success: Function, error: Function) {
    return this.instance.post(this.apiPath + '/Points/Save', pas).then((result) => {
      return result;
    });
  };

  // 获取会员总积分信息
  GetMemberTotalPointsInfo (callback: Function) {
    return this.instance.get(this.apiPath + '/Points/GetMemberTotalPoints').then((result) => {
      return result;
    });
  };

  // 获取会员积分明细账单
  GetPointslDetail (objInfo:object, callback: Function) {
    return this.instance.post(this.apiPath + '/Points/PointsDefaultLis', objInfo).then((result) => {
      return result;
    });
  };

  private static instance: PointsApi;
  //* * 单例 */
  public static getInstance (): PointsApi {
    if (PointsApi.instance) { return PointsApi.instance; } else {
      PointsApi.instance = new PointsApi();
      return PointsApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
