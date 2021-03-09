import axios from 'axios';
import storage from './Storage';
import Cookie from 'js-cookie';
import { ApiVersion, Authorization, ApiServer } from './SysConst';
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: 'bearer ' + Cookie.get('access_token')// storage.get('access_token')
};
axios.defaults.baseURL = ApiServer;

class Auth {
  private GetAuth (): Promise<string> {
    let pms = new Promise<string>((resolve, reject) => {
      let url: string = '/' + ApiVersion + '/token/get';
      axios
        .get(url, {
          params: {},
          headers: {
            Authorization:
              'Basic ' + Authorization // edtoys
          }
        })
        .then(
          function (response) {
            console.log(response.data);
            var data = response.data;
            // storage.set('access_token', data.access_token);
            Cookie.set('access_token', data.access_token);
            storage.set('expires', data.expires_in * 1000);
            storage.set(
              'timeout',
              data.expires_in * 1000 + new Date().getTime()
            );
            resolve(data);
          },
          function () {
            reject(new Error('獲取token失敗'));
            console.log('獲取token失敗');
          }
        );
    });
    return pms;
  }
  GetToken = (): Promise<string> => {
    let pms = new Promise<string>(async (resolve, reject) => {
      // var token = storage.get('access_token');
      var token = Cookie.get('access_token');
      if (token == null || token === '') {
        this.GetAuth().then(
          function (t) {
            resolve(t);
          },
          function () {
            console.log('沒有token返回');
          }
        );
      } else {
        if ((await this.VerifyToken(token)) === true) {
          resolve(token);
        } else {
          this.GetAuth().then(
            function (t) {
              resolve(t);
            },
            function () {
              console.log('沒有token返回');
            }
          );
        }
      }
    });
    return pms;
  };
  /**
   * 檢驗token有效性
   */
  VerifyToken (token: string): Promise<boolean> {
    let pms = new Promise<boolean>((resolve, reject) => {
      let url: string = '/' + ApiVersion + '/token/test';
      axios
        .get(url, {
          params: { token: token },
          headers: {}
        })
        .then(
          function (response) {
            var result = response.data.Succeeded;
            if (!result) {
              // storage.remove('access_token');
              Cookie.remove('access_token');
              storage.set('isLogin', 0);
              resolve(false);
            } else {
              storage.set(
                'timeout',
                storage.get('expires') + new Date().getTime()
              );
              resolve(true);
            }
          },
          function () { }
        );
    });
    return pms;
  }
}

export default new Auth();
