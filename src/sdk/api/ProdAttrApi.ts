import { WSAPI } from './WSApi';

export class ProdAttrApi extends WSAPI {
  /**
     * 根据id、lang，获取属性内容
     * @param ps {id: string, lang: string}
     * @param callback
     */
  getById (ps:object) {
    return this.instance.post(this.apiPath + '/ProdAttr/GetAttribtueById', ps).then((result) => {
      return result.data.ReturnValue;
    });
  };

  /**
     * 获取所有的产品属性
     * @param ps {type: 0（所有产品属性）/ 1（产品库存属性）/ 2（产品非库存属性）, lang: string}
     * @param callback
     */
  getAttrList (ps:object) {
    return this.instance.post(this.apiPath + '/ProdAttr/GetAttrs', ps).then((result) => {
      return result.data.ReturnValue;
    });
  };
}
