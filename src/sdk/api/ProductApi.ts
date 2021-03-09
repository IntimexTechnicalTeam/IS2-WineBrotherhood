import { WSAPI } from './WSApi';
import Proxy from '../common/Proxy';
export class ProductApi extends WSAPI {
  @Proxy('PanelDetail', 'Tab', 'AdditionalImage')
  public GetProduct (sku: string) {
    return this.instance.get(this.apiPath + '/Product', { params: { id: sku } }).then((result) => {
      // do someting about check success
      return result.data;
    });
  }
  /**
   * 搜寻产品
   * @param {object} cond ，
   * Type：0 是疊加
   *       1 是篩選
   * 例子：  {
   *            Key:"name or desc",
   *            PageInfo:{Page:1,PageSize:10},
   *            CatIdS:["产品目录id1"，"产品目录id2"],
   *            Attrs:[{Id:"属性id1",Vals:["属性值id11","属性值id12"]},{Id:"属性id2",Vals:["属性值id21","属性值id22"]}]，
   *            Type：0
   *        }
   * @param {Function} callback （因callback hell,此处不建议用回调函数，而用返回的promise）
   */
  @Proxy('[YouWouldLike]', 'TotalPage', 'TotalRecord')
  public search (cond: object) {
    return this.instance.post(this.apiPath + '/product/SearchV2', cond).then((result) => {
      // do someting about check success
      return result.data;
    });
  }
  /**
    *
    * @param pas var data = {
                        MemberId :this.loginUid,
                        Skus: this.prodId + ',',
                        ToEmail : $("#txtEmail").val(),
                        Remark: $("#txtRemark").val(),
                        IType:1
                    }
    */
  async SaveMemberRecommendProduct (pas:any) {
    let result = await this.instance.post(this.apiPath + '/MemberRecommendProduct/Save', pas);
    return result.data.Message;
  }
  /**
   *
   * @param {object} cond ，
   * sku：产品Id
   * attr1:属性1的值Id
   * attr2:属性2的值Id
   * attr3:属性3的值Id
   * 例子：  {
   *            sku:"123",
   *            attr1:1
   *            attr2:1
   *            attr3:1
   *        }
   * @param {Function} callback
   */
  @Proxy('{ "ReturnValue": 1 }')
  checkProductStatus (
    sku: string,
    attr1: number = 1,
    attr2: number = 1,
    attr3: number = 1
  ) {
    return this.instance.get(
      this.apiPath + '/Product/CheckProductStatus', { params: {
        sku: sku,
        attr1: attr1,
        attr2: attr2,
        attr3: attr3
      }
      }
    ).then((result) => {
      // do someting about check success
      return result.data;
      // return { object0: { ReturnValue: result.data.ReturnValue } };
    });
  }
  /**
    * 获取相关产品
    */
  @Proxy('[YouWouldLike]')
  getRltProduct (sku: string) {
    return this.instance.get(
      this.apiPath + '/Product/GetRelatedProduct',
      { params: { sku: sku } }
    ).then((result) => {
      // do something about check success
      return result.data;
    });
  }
  /**
   *  获取目录的产品分页列表
   * @param pager  data sample: {CatId:10,Page:1,PageSize=10}
   * @param callback
   */
  @Proxy('[YouWouldLike]', 'TotalPage', 'TotalRecord')
  getCatProduct (pager: object) {
    return this.instance.post(
      this.apiPath + '/product/GetCatProdByPage',
      pager
    ).then((result) => {
      // check success
      return result.data;
    });
  }
  /**
     *
     * @param sku
     * @param success
     * @param fail
     */
  addFavorite (sku: string) {
    return this.instance.get(this.apiPath + '/member/AddFavorite', { params: { sku: sku } }).then((result) => {
      // do someting about check success
      return result.data;
    });
  };
  removeFavorite (sku: string) {
    return this.instance.get(this.apiPath + '/member/RemoveFavorite', { params: { sku: sku } }
    ).then((result) => {
      return result.data;
    });
  };
  /**
 * 根据当前sku获取该产品的上下产品
 * @param sku 当前sku
 * @param catId 当前CatId
 * @param state true：获取上一个；false：获取下一个;
 * @param callback
 */
  GetProductUpOrDown (sku:string, catId:string, state:boolean) {
    return this.instance.get(this.apiPath + '/Product/GetProductUpOrDown', { params: { sku: sku, catId: catId, state: state } }).then(
      (result) => {
        if (result.data !== 0) { return result.data; } else { throw new Error('沒有更多了'); };
      });
  }

  /**
     * 获取产品目录列表
     * @param callback
     */
  getAttrList () {
    return this.instance.get(this.apiPath + '/Catalog/getCatalogs').then((result) => {
      return result.data;
    });
  };

  // 獲取產品屬性圖片
  getAttrImage (sku:string, imageType:number = 1, attr1:number = 0, attr2:number = 0, attr3:number = 0) {
    return this.instance.get(this.apiPath + '/product/GetAttrImage', { params: { sku: sku, attrType: imageType, attr1: attr1, attr2: attr2, attr3: attr3 } }).then(
      (result) => {
        if (result.data !== 0) { return result.data; } else { throw new Error('沒有更多了'); };
      });
  }

  @Proxy('[Catalogs]')
  getAttrList2 () {
    return this.instance.get(this.apiPath + '/Catalog/getCatalogs').then((result) => {
      return result.data;
    });
  };
  @Proxy('Catalogs')
  getCatalogs (id) {
    return this.instance.get(this.apiPath + '/Catalog/getCatalog', { params: { id: id } }).then((result) => {
      return result.data;
    });
  };
  private static instance: ProductApi;
  //* * 单例 */
  public static getInstance (): ProductApi {
    if (ProductApi.instance) { } else {
      ProductApi.instance = new ProductApi();
    }
    return ProductApi.instance;
  }
  // eslint-disable-next-line no-useless-constructor
  private constructor () {
    super();
  }
}
