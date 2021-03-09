
import Axios, { AxiosInstance } from 'axios';
import storage from '../common/Storage';
import Cookie from 'js-cookie';
import Auth from '@/sdk/common/Auth';
import Vue from 'vue';
import { ApiVersion, ApiServer } from '../common/SysConst';
import { FrontE } from '@/sdk/common/SysConst';
import lang from '@/lang/index';
let defaultLang = storage.get('locale') || FrontE.defaultLang;
class WSAPI {
  debug: boolean = true;
  apiPath: string = ApiServer + '/' + ApiVersion;
  controller: Object[];
  qs = require('qs');
  get instance (): AxiosInstance {
    let ins = Axios.create({
      //  baseURL: this.apiPath,
      timeout: 30000,
      headers: { 'Authorization': 'bearer ' + Cookie.get('access_token') }// storage.get('access_token')
    });
    ins.interceptors.request.use(config => {
      let contentType = config.headers.contentType;
      config.method === 'post'
        ? config.data = !contentType || contentType === 'application/x-www-form-urlencoded' ? this.qs.stringify({ ...config.data }) : config.data
        : config.params = { ...config.params };
      if (!contentType) config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      if (storage.get('timeout') < new Date().getTime()) throw new TimeoutError('timeout'); // 如已超時則在請求前打斷
      return config;
    }, error => { // 请求错误处理
      console.log(error);
    }
    );
    ins.interceptors.response.use(
      response => {
        storage.set(
          'timeout',
          storage.get('expires') * 1000 + new Date().getTime()
        );
        return Promise.resolve(response);
      },
      error => {
        Vue.prototype.$HiddenLayer();
        if (!error.response && error instanceof TimeoutError) {
          storage.set('locale', defaultLang);
          if (storage.get('isLogin') === 1) {
            Vue.prototype.Shake(() => {
              Cookie.remove('access_token');
              Auth.GetToken().then(
                () => {
                  storage.set('isLogin', 0);
                  window.location.href = ('/account/login?returnurl=' + window.location.pathname);
                });
            });
          } else { Vue.prototype.Shake(() => { storage.set('isLogin', 0); Auth.GetToken().then(() => Vue.prototype.Reload()); }); }
          return Promise.reject(error);
        };
        let status = error.response.status;
        if (status === 403) {
          storage.set('locale', defaultLang);
          if (storage.get('isLogin') === 1) {
            Vue.prototype.Shake(() => {
              Cookie.remove('access_token');
              Auth.GetToken().then(
                () => {
                  storage.set('isLogin', 0);
                  window.location.href = ('/account/login?returnurl=' + window.location.pathname);
                });
            });
          } else { Vue.prototype.Shake(() => { storage.set('isLogin', 0); Auth.GetToken().then(() => Vue.prototype.Reload()); }); }
        } else if (status === 401) Vue.prototype.$SingtonConfirm((lang.messages[defaultLang].Message as any).Message, (lang.messages[defaultLang].Message as any).msg401);
        else if (status === 400) Vue.prototype.$SingtonConfirm((lang.messages[defaultLang].Message as any).Message, (lang.messages[defaultLang].Message as any).msg400);
        else if (status === 404) Vue.prototype.$SingtonConfirm((lang.messages[defaultLang].Message as any).Message, (lang.messages[defaultLang].Message as any).msg404);
        else if (status === 500) Vue.prototype.$SingtonConfirm((lang.messages[defaultLang].Message as any).Message, (lang.messages[defaultLang].Message as any).msg500);
        else if (status === 502) Vue.prototype.$SingtonConfirm((lang.messages[defaultLang].Message as any).Message, (lang.messages[defaultLang].Message as any).msg502);
        else if (status === 503) Vue.prototype.$SingtonConfirm((lang.messages[defaultLang].Message as any).Message, (lang.messages[defaultLang].Message as any).msg503);
        // return Promise.reject(error);
      }
    );
    return ins;
  }
  constructor () {
    this.controller = Object[2];
  }
  log (arg1: any, arg2?: any) {
    // if (this.debug) {
    //   console.log(arg1);
    //   if (arg2 !== undefined) {
    //     console.log(arg2);
    //   }
    // }
  }
}
class TimeoutError extends Error {

}
export { WSAPI };
