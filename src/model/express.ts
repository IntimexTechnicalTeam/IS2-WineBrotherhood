export default class Express {
    private _CountryCode : string;
    public get CountryCode () : string {
      return this._CountryCode;
    }
    public set CountryCode (v : string) {
      this._CountryCode = v;
    }

    private _Discount : number;
    public get Discount () : number {
      return this._Discount;
    }
    public set Discount (v : number) {
      this._Discount = v;
    }

    private _DiscountPrice : number;
    public get DiscountPrice () : number {
      return this._DiscountPrice;
    }
    public set DiscountPrice (v : number) {
      this._DiscountPrice = v;
    }

    private _ExpressCompanyId : string;
    public get ExpressCompanyId () : string {
      return this._ExpressCompanyId;
    }
    public set ExpressCompanyId (v : string) {
      this._ExpressCompanyId = v;
    }

    private _ExpressCompanyName : string;
    public get ExpressCompanyName () : string {
      return this._ExpressCompanyName;
    }
    public set ExpressCompanyName (v : string) {
      this._ExpressCompanyName = v;
    }

    private _ExpressPointId : string;
    public get ExpressPointId () : string {
      return this._ExpressPointId;
    }
    public set ExpressPointId (v : string) {
      this._ExpressPointId = v;
    }

    private _Id : string;
    public get Id () : string {
      return this._Id;
    }
    public set Id (v : string) {
      this._Id = v;
    }

    private _IsExpressPoint : boolean;
    public get IsExpressPoint () : boolean {
      return this._IsExpressPoint;
    }
    public set IsExpressPoint (v : boolean) {
      this._IsExpressPoint = v;
    }

    private _IsSelfDefineDeliveryDate : boolean;
    public get IsSelfDefineDeliveryDate () : boolean {
      return this._IsSelfDefineDeliveryDate;
    }
    public set IsSelfDefineDeliveryDate (v : boolean) {
      this._IsSelfDefineDeliveryDate = v;
    }

    private _Price : number;
    public get Price () : number {
      return this._Price;
    }
    public set Price (v : number) {
      this._Price = v;
    }

    private _ServiceType : string;
    public get ServiceType () : string {
      return this._ServiceType;
    }
    public set ServiceType (v : string) {
      this._ServiceType = v;
    }
    constructor (_CountryCode:string = '',
      _Discount:number = 0,
      _DiscountPrice:number = 0,
      _ExpressCompanyId:string = '',
      _ExpressCompanyName:string = '',
      _ExpressPointId:string = '',
      _Id:string = '',
      _IsExpressPoint:boolean = false,
      _IsSelfDefineDeliveryDate:boolean = true,
      _Price:number = 0,
      _ServiceType = '') {
      this._CountryCode = _CountryCode;
      this._Discount = _Discount;
      this._DiscountPrice = _DiscountPrice;
      this._ExpressCompanyId = _ExpressCompanyId;
      this._ExpressCompanyName = _ExpressCompanyName;
      this._ExpressPointId = _ExpressPointId;
      this._Id = _Id;
      this._IsExpressPoint = _IsExpressPoint;
      this._IsSelfDefineDeliveryDate = _IsSelfDefineDeliveryDate;
      this._Price = _Price;
      this._ServiceType = _ServiceType;
    }
}
