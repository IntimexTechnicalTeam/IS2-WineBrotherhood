export default class ExpressPoint {
    private _Address : string;
    public get Address () : string {
      return this._Address;
    }
    public set Address (v : string) {
      this._Address = v;
    }

    private _ExpressCompanyId : string;
    public get ExpressCompanyId () : string {
      return this._ExpressCompanyId;
    }
    public set ExpressCompanyId (v : string) {
      this._ExpressCompanyId = v;
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _Name : string;
    public get Name () : string {
      return this._Name;
    }
    public set Name (v : string) {
      this._Name = v;
    }

    private _Price : number;
    public get Price () : number {
      return this._Price;
    }
    public set Price (v : number) {
      this._Price = v;
      this._DiscountPrice = v;
    }
    private _DiscountPrice : number;
    public get DiscountPrice () : number {
      return this._Price;
    }
    public set DiscountPrice (v : number) {
      this._DiscountPrice = this._Price;
    }
    constructor (_Address = '', _ExpressCompanyId = '', _Id = '-1', _Name = '', _Price = 0) {
      this._Address = _Address;
      this._ExpressCompanyId = _ExpressCompanyId;
      this._Id = _Id;
      this._Name = _Name;
      this._Price = _Price;
      this._DiscountPrice = _Price;
    }
}
