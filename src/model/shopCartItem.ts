import PanelDetail from './PanelDetail';

export default class ShopCartItem {
    private _Attr1 : number;
    public get Attr1 () : number {
      return this._Attr1;
    }
    public set Attr1 (v : number) {
      this._Attr1 = v;
    }

    private _Attr2 : number;
    public get Attr2 () : number {
      return this._Attr2;
    }
    public set Attr2 (v : number) {
      this._Attr2 = v;
    }

    private _Attr3 : number;
    public get Attr3 () : number {
      return this._Attr3;
    }
    public set Attr3 (v : number) {
      this._Attr3 = v;
    }

    private _AttrName1 : string;
    public get AttrName1 () : string {
      return this._AttrName1;
    }
    public set AttrName1 (v : string) {
      this._AttrName1 = v;
    }

    private _AttrName2 : string;
    public get AttrName2 () : string {
      return this._AttrName2;
    }
    public set AttrName2 (v : string) {
      this._AttrName2 = v;
    }

    private _AttrName3 : string;
    public get AttrName3 () : string {
      return this._AttrName3;
    }
    public set AttrName3 (v : string) {
      this._AttrName3 = v;
    }

    private _AttrTypeName1 : string;
    public get AttrTypeName1 () : string {
      return this._AttrTypeName1;
    }
    public set AttrTypeName1 (v : string) {
      this._AttrTypeName1 = v;
    }

    private _AttrTypeName2 : string;
    public get AttrTypeName2 () : string {
      return this._AttrTypeName2;
    }
    public set AttrTypeName2 (v : string) {
      this._AttrTypeName2 = v;
    }

    private _AttrTypeName3 : string;
    public get AttrTypeName3 () : string {
      return this._AttrTypeName3;
    }
    public set AttrTypeName3 (v : string) {
      this._AttrTypeName3 = v;
    }

    private _CreateAt : string;
    public get CreateAt () : string {
      return this._CreateAt;
    }
    public set CreateAt (v : string) {
      this._CreateAt = v;
    }

    private _GrossWeight : number;
    public get GrossWeight () : number {
      return this._GrossWeight;
    }
    public set GrossWeight (v : number) {
      this._GrossWeight = v;
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _Product : PanelDetail;
    public get Product () : PanelDetail {
      return this._Product;
    }
    public set Product (v : PanelDetail) {
      this._Product = v;
    }

    private _PromotionRule : string;
    public get PromotionRule () : string {
      return this._PromotionRule;
    }
    public set PromotionRule (v : string) {
      this._PromotionRule = v;
    }

    private _Qty : number;
    public get Qty () : number {
      return this._Qty;
    }
    public set Qty (v : number) {
      this._Qty = v;
    }
    constructor (_Attr1 = 1, _Attr2 = 1, _Attr3 = 1, _AttrName1 = '', _AttrName2 = '', _AttrName3 = '', _AttrTypeName1 = '', _AttrTypeName2 = '', _AttrTypeName3 = '', _CreateAt = '',
      _GrossWeight = 0,
      _Id = '',
      _Product = new PanelDetail('', '', '', 0, 0, 0, 0, ''),
      _PromotionRule = '',
      _Qty = 0) {
      this._Attr1 = _Attr1;
      this._Attr2 = _Attr2;
      this._Attr3 = _Attr3;
      this._AttrName1 = _AttrName1;
      this._AttrName2 = _AttrName2;
      this._AttrName3 = _AttrName3;
      this._AttrTypeName1 = _AttrTypeName1;
      this._AttrTypeName2 = _AttrTypeName2;
      this._AttrTypeName3 = _AttrTypeName3;
      this._CreateAt = _CreateAt;
      this._GrossWeight = _GrossWeight;
      this._Id = _Id;
      this._Product = _Product;
      this._PromotionRule = _PromotionRule;
      this._Qty = _Qty;
    }
}
