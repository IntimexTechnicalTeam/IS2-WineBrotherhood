import { WSAPI } from './WSApi';
import Axios from 'axios';
import storage from '../common/storage';
import Cookie from 'js-cookie';
import store from '@/store';
import { BannerResult, PromotionResult, AllCouponList } from '../../model/promotionResult';
import Proxy from '@/sdk/common/Proxy';
export class PromotionApi extends WSAPI {
  getHeaderBanner (
    page: string
  ): Promise<BannerResult[]> {
    let _this = this;

    let r = new Promise<BannerResult[]>((resolve, reject) => {
      this.instance.get(_this.apiPath + '/Banner/GetHeaderBanner', {
        params: {
          page: page
        }
      }).then(
        function (response) {
          let result:BannerResult[] = response.data;
          // response.data.forEach(element => {
          //   result.push(element);
          // });
          var sucess = response.data.Succeed;
          if (result) {
            resolve(result);
          } else {
            reject(new Error('获取banner失败!'));
          }
        },
        function () {
          reject(new Error('请求banner接口失败！'));
        }
      );
    });
    return r;
  }

  getPromotionList (
    page: string
  ): Promise<PromotionResult[]> {
    let _this = this;

    let r = new Promise<PromotionResult[]>((resolve, reject) => {
      this.instance.get(_this.apiPath + '/Banner/getPromotionList', {
        params: {
          page: page
        }
      }).then(
        function (response) {
          // let result:PromotionResult[] = response.data;
          let result:PromotionResult[] = [];
          response.data.forEach(element => {
            result.push(new PromotionResult(element));
          });
          var sucess = response.data.Succeed;
          if (result) {
            resolve(result);
          } else {
            reject(new Error('获取PromotionList失败!'));
          }
        },
        function () {
          reject(new Error('请求PromotionList接口失败！'));
        }
      );
    });
    return r;
  }
  @Proxy('[Promotion]')
  getPromotionListV2 (page: string) {
    return this.instance.get(
      this.apiPath + '/Banner/GetPromotionList',
      {
        params: {
          page: page
        }
      }
    ).then((result) => {
      return result.data;
    });
  }
  @Proxy('Promotion')
  getPromotion (page: string, position: number) {
    return this.instance.get(
      this.apiPath + '/Banner/GetPromotion',
      {
        params: {
          page: page,
          position: position
        }
      }
    ).then((result) => {
      return result.data;
    });
  }
  getAllCoupon (cond: any) {
    return this.instance.post(this.apiPath + '/Member/GetAllCoupon', cond).then((result) => {
      return result.data;
    });
  };

  @Proxy('[YouWouldLike]')
  getLatestProduct () {
    return this.instance.get(this.apiPath + '/Product/GetLatest').then((result) => {
      return result.data;
    });
  };

  // 获取首页的SEO信息
  GetHomeSeoData () {
    return this.instance.get(this.apiPath + '/seo/GetHomeSeoData').then((result) => {
      return result.data;
    });
  };

  getMenu () {
    return this.instance.get(this.apiPath + '/Menu').then((result) => {
      return result.data;
    });
  };
  getSeo (list) {
    return this.instance.post(this.apiPath + '/seo/GetCMSSeoList', list).then((result) => {
      return result.data;
    });
  };
  private static instance: PromotionApi;
  //* * 单例 */
  public static getInstance (): PromotionApi {
    if (PromotionApi.instance) { return PromotionApi.instance; } else {
      PromotionApi.instance = new PromotionApi();
      return PromotionApi.instance;
    }
  }
}
