/* eslint-disable promise/param-names */
import { WSAPI } from './WSApi';
import Axios from 'axios';
import storage from '../common/storage';
import Proxy from '../common/Proxy';
import Message from '@/model/Message';
import { CMSPager, CmsResult } from '@/model/cmsResult';

export class CmsApi extends WSAPI {
  getContent (id: string) {
    return this.instance.get(this.apiPath + '/cms/GetContent',
      { params: { cid: id } }).then((result) => {
      return result.data;
    });
  };

  getContentByKey (pas: CMSPager) {
    return this.instance.get(this.apiPath + '/cms/GetContentByKey',
      { params: pas }).then((result) => {
      return result.data;
    });
  };

  getContentsByCatKey (pas: CMSPager) {
    return this.instance.get(this.apiPath + '/cms/GetContentsByCatKey',
      { params: pas }).then((result) => {
      return result.data;
    });
  };

  getContentsByCatKeyEx (pas: CMSPager) {
    return this.instance.post(this.apiPath + '/cms/GetContentsByCatKeyEx',
      pas).then((result) => {
      return result.data;
    });
  };

  getContentsByCatId (catId: string, page:number, pageSize:number) {
    return this.instance.get(this.apiPath + '/cms/GetContentsByCatId',
      { params: { catId: catId, page: page, pageSize: pageSize } }).then((result) => {
      return result.data;
    });
  };
  // getContentByDevice () {
  //   return this.instance.get(this.apiPath + '/cms/GetContentByDevice', {});
  // }
  getCatOtherContent (cond: any) {
    return this.instance.post(this.apiPath + '/cms/GetCategoryRelateContent',
      cond).then((result) => {
      return result.data;
    });
  };

  getSubCatContents (cond: any) {
    return this.instance.post(this.apiPath + '/cms/GetSubCatContents',
      cond).then((result) => {
      return result.data;
    });
  };

  getLastestContents (cond: any) {
    return this.instance.post(this.apiPath + '/cms/GetLastestContents',
      cond).then((result) => {
      return result.data;
    });
  };

  getNews (pas: CMSPager) {
    return this.instance.get(this.apiPath + '/cms/GetContentsByCatKey',
      { params: pas }).then((result) => {
      return result.data;
    });
  };

  getCategoryTree (pas: CMSPager) {
    return this.instance.post(this.apiPath + '/cms/GetCategoryTree',
      pas).then((result) => {
      return result.data;
    });
  };

  getNextCategoryTree (pas: CMSPager) {
    return this.instance.post(this.apiPath + '/cms/GetNextCategoryTree',
      pas).then((result) => {
      return result.data;
    });
  };

  search (pas: any) {
    return this.instance.post(this.apiPath + '/cms/GetContents',
      pas).then((result) => {
      return result.data;
    });
  };

  getCatDetail (id: string) {
    return this.instance.get(this.apiPath + '/cms/GetCategory',
      { params: { id: id } }).then((result) => {
      return result.data;
    });
  };
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice (params) {
    let r = new Promise((resolve, reject) => {
      this.instance.post(this.apiPath + '/cms/getCategoryByDevice', params).then((response) => {
        if (response.data.Succeeded) {
          let result = response.data.ReturnValue;
          resolve(result);
        } else {
          reject(new Error(response.data.Message || '未知错误！'));
        }
      },
      function () {
        reject(new Error('获取CMSCategory信息失败！'));
      });
    });
    return r;
  }
  getCatDetailByKey (pas: CMSPager) {
    return this.instance.get(this.apiPath + '/cms/GetCatByKey',
      { params: pas }).then((result) => {
      return result.data;
    });
  };
  @Proxy('CMS')
  getContentByDevice (params) {
    return this.instance.post(this.apiPath + '/cms/GetContentByDevice', params).then((result) => {
      return result.data;
    });
  }
  private static instance: CmsApi;
  //* * 单例 */
  public static getInstance (): CmsApi {
    if (CmsApi.instance) { return CmsApi.instance; } else {
      CmsApi.instance = new CmsApi();
      return CmsApi.instance;
    }
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
